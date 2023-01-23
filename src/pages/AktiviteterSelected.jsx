import React, { useEffect, useState, useContext } from 'react';
import 'leaflet/dist/leaflet.css';
import '../sass/Leaflet.scss';

import UseTranslator from '../hooks/UseTranslator';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useNavigate, useLocation } from "react-router-dom";

import '../sass/AktivitetSelected.scss';

// import { cleanUpMap, initMapAllActivites } from '../leaflet';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';

import { ImagePathContext } from '../Context/ImagePathContext';
import { Image } from 'cloudinary-react';


const AktiviteterSelected = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { cloudinaryImagePath } = useContext( ImagePathContext );

    // Navigate the user back to Overview of Activities
    const returnOverV = () => navigate( '/activities' )

    // Navigate user to current selected activity homepage
    const GoToPage = () => navigate( '/' )

    const { filteredData, error, loading } = UseTranslator( 'ActivitySelect', true )

    const [ coordinates, setCoordinates ] = useState( [] )

    useEffect( () => {
        if ( coordinates.length <= 0 && filteredData ) {

            filteredData.forEach( coordinate => {

                if ( coordinate.fields.hasOwnProperty( 'Latitude' ) && coordinate.fields.hasOwnProperty( 'Longitude' ) ) {

                    setCoordinates( prev => [ ...prev, { lat: coordinate.fields.Latitude, long: coordinate.fields.Longitude, name: coordinate.fields.Name } ] )
                }

            } );
        }

    }, [ filteredData, coordinates ] )

    useEffect( () => {
        if ( location.state.data ) {
            console.log( location.state.data )
        }
        document.querySelector( '#root' ).style.backgroundColor = '#FAFAFF';
    }, [] )

    return (

        <Container fluid='lg' className='aktivSelectContainer'>

            { error && <div>Error</div> }

            { loading && <div>Loading</div> }

            {
                location.state.data && filteredData &&
                <>
                    <h1 className='HeadlineSelected'>{ location.state.data.fields.Image_Text }</h1>
                    <h2>{ filteredData[ 0 ].fields.Header_Undertitle }</h2>
                    <button onClick={ returnOverV } className='BackToOverviewBtn'>{ filteredData[ 0 ].fields.OverviewBtn }</button>

                    <Container fluid='lg' className='MainContent'>
                        <Row>
                            <Col lg={ { span: 12 } }
                                md={ { span: 6 } }
                                sm={ { span: 4 } }>
                                <figure className='Thumbnail'>
                                    <picture>
                                        <source
                                            media="(max-width: 575px)"
                                            srcSet={ cloudinaryImagePath + location.state.data.fields.ImgId_Mobile[ 0 ] }
                                        />

                                        <source
                                            media="(max-width: 991px)"
                                            srcSet={ cloudinaryImagePath + location.state.data.fields.ImgId_Tablet[ 0 ] }
                                        />

                                        <source
                                            media="(min-width: 992px)"
                                            srcSet={ cloudinaryImagePath + location.state.data.fields.ImgId_Desktop[ 0 ] }
                                        />

                                        <Image
                                            cloudName={ import.meta.env.VITE_CLOUDINARY_CLOUD_NAME }
                                            public_id={ location.state.data.fields.ImgId_Desktop[ 0 ] }
                                            alt={ location.state.data.fields.Image_Description } />

                                    </picture>
                                </figure>
                                <section className='Apetizer'>
                                    <p className='ApetizerText'>{ location.state.data.fields.Description.slice( 0, 1200 ) }</p>
                                    <button onClick={ GoToPage } className='hostWebpageBtn'>{ filteredData[ 0 ].fields.WebsiteBtn }</button>
                                </section>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={ { span: 12 } }
                                md={ { span: 6 } }
                                sm={ { span: 4 } }>
                                {
                                    <MapContainer center={ [ location.state.data.fields.Latitude, location.state.data.fields.Longitude ] } zoom={ 10 } id="mapContainer">
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' />

                                        {
                                            <Marker position={ [ location.state.data.fields.Latitude, location.state.data.fields.Longitude ] }>

                                                <Popup>
                                                    { location.state.data.fields.Name }
                                                </Popup>
                                            </Marker>

                                        }

                                    </MapContainer>

                                }

                                <section className='Facts'>
                                    <h2>{ filteredData[ 0 ].fields.Facts }</h2>
                                    <p className='FactsText'>{ location.state.data.fields.Description.slice( 0, 600 ) }</p>
                                </section>
                            </Col>
                        </Row>
                    </Container>
                </>
            }
        </Container>

    )
}

export default AktiviteterSelected;