import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Image } from 'cloudinary-react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';

import { usePatchData } from '../../../hooks/usePatchData';
import UseTranslator from '../../../hooks/UseTranslator';
import { useGetData } from '../../../hooks/useGetData';
import ChosenImage from '../../../component/Admin/ChosenImage';
import SubjectDropdown from '../../../component/Admin/SubjectDropdown';
import ShowImages from '../../../component/Admin/ShowImages';

// postLanguage = the language to post the activity
const AdminPatchActicity = ( { postLanguage } ) => {

    const [ updatedDescription, setUpdatedDescription ] = useState( '' );
    const [ updatedFacts, setUpdatedFacts ] = useState( '' );
    const [ updatedName, setUpdatedName ] = useState( '' );
    const [ updatedPosition, setUpdatedPosition ] = useState( null );
    const [ updatedId, setUpdatedId ] = useState( '' );
    const [ updatedPublicUrl, setUpdatedPublicUrl ] = useState( '' );
    const [ updatedImageId, setUpdatedImageId ] = useState( '' )
    const [ showImages, setShowImages ] = useState( false );


    const [ images, setImages ] = useState( [] );
    const [ message, setMessage ] = useState( {} );

    const { error: errorPatch, loading: loadingPatch, data: dataPatch, patchData } = usePatchData();

    const { error: errorActivity, loading: loadingActivity, data: dataActivity, getData } = useGetData();

    const { error, loading, filteredData } = UseTranslator( 'Activities', true );

    const GetLatLng = () => {

        const map = useMapEvents( {
            click ( e ) {
                setUpdatedPosition( [ e.latlng.lat, e.latlng.lng ] );
            }
        } )

        return <Marker position={ updatedPosition } />
    }

    const ChangeView = () => {
        const map = useMap();

        map.setView( updatedPosition, map.getZoom(), {
            animate: false
        } )
    }

    const loadImages = async () => {
        try {

            const res = await axios.get( '/.netlify/functions/getImages' );
            const data = await res.data;

            const filterImg = await data.filter( img => img.ISO[ 0 ] === postLanguage.ISO )
            setImages( filterImg );

        }
        catch ( error ) {
            console.error( error );
        }
    }

    const handleSubmit = ( e ) => {

        e.preventDefault();

        try {
            console.log( 'updatedImageId: ' + updatedImageId );

            const newActivity = {

                "fields": {
                    "Name": updatedName,
                    "Description": updatedDescription,
                    "Facts": updatedFacts,
                    "Language": [
                        postLanguage.value
                    ],
                    "Latitude": updatedPosition[ 0 ],
                    "Longitude": updatedPosition[ 1 ],
                    "Image": [
                        updatedImageId
                    ]
                }
            }

            patchData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/Activities/' + updatedId, newActivity, {
                'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY,
                'Content-Type': 'application/json'
            } );


            setMessage( {
                msg: 'Aktiviteten er nu blevet gemt',
                class: 'success'
            } );

            setUpdatedDescription('');
            setUpdatedFacts('');
            document.querySelector( '.adminPatchForm' ).reset();

        }
        catch ( error ) {
            console.log( error.name )
            setMessage( {
                msg: error.name + ': ' + error.message,
                class: 'failed'
            } );
        }
    }

    useEffect( () => {

        let timeOut;

        if ( Object.keys( message ).length !== 0 ) {

            timeOut = setTimeout( () => {
                setMessage( {} )
            }, 5000 )
        }

        return () => {
            clearTimeout( timeOut );
        }

    }, [ message ] )

    useEffect( () => {

        loadImages();

    }, [ postLanguage, ] )

    useEffect( () => {

        if ( updatedId ) {
            getData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/Activities/' + updatedId, {
                'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY
            } )
        }

    }, [ updatedId ] )

    useEffect( () => {

        if ( dataActivity ) {

            setUpdatedDescription( dataActivity.fields.Description )
            setUpdatedFacts( dataActivity.fields.Facts )
            setUpdatedName( dataActivity.fields.Name );
            setUpdatedPosition( [ dataActivity.fields.Latitude, dataActivity.fields.Longitude ] );
            setUpdatedImageId( dataActivity.fields.Image[ 0 ] )
            setUpdatedPublicUrl( dataActivity.fields.ImgId_Desktop[ 0 ] );

        }

    }, [ dataActivity ] )

    useEffect( () => {
        if ( filteredData ) {

            document.querySelector( '.activitiesSelect' ).selectedIndex = 0;

            setUpdatedDescription( '' )
            setUpdatedFacts( '' )
            setUpdatedName( '' );
            setUpdatedImageId( '' )
            setUpdatedPublicUrl( '' );

        }
    }, [ filteredData ] )


    return (
        <>
            { error && errorPatch && errorActivity && <div>Error</div> }

            { loading && loadingPatch && loadingActivity && <div>Loading</div> }

            {
                <form className='adminPatchForm' >

                    <Row>
                        <Col lg={ { span: 6, offset: 1 } }>

                            {
                                filteredData &&

                                <>
                                    <Row>
                                        <Col lg={ { span: 12 } } className="pe-5 mb-5">
                                            
                                            <SubjectDropdown
                                                filteredData={filteredData}
                                                filterOption="Image"
                                                selectClass="activitiesSelect"
                                                htmlFor="activities"
                                                labelText="Vælg en aktivitet at rette"
                                                setId={setUpdatedId}
                                                selectData="Name"
                                            />
                                        </Col>

                                    </Row>

                                    {
                                        dataActivity &&
                                        <Row>
                                            <Col lg={ { span: 12 } } className="pe-5 mb-5">
                                                <label className='labels' htmlFor='activities'>Klik for at se alle uploaded billeder</label>
                                                <button className='btn_getImages' onClick={ ( e ) => {
                                                    e.preventDefault();
                                                    setShowImages( true )
                                                } }>Klik her!</button>
                                            </Col>

                                        </Row> }
                                </>

                            }

                            {
                                // form inputs
                                dataActivity && updatedId && filteredData &&
                                <Row>
                                    <Row className='mb-5'>
                                        <Col lg={ 12 }>
                                            <label className='labels' htmlFor='activitiesName'>Navn</label>
                                            <input
                                                onChange={ ( e ) => setUpdatedName( e.target.value ) }
                                                className='inputs'
                                                type="text"
                                                defaultValue={ updatedName }
                                                id="activitiesName"
                                                required
                                            />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={ 12 }>
                                            <label className='labels' htmlFor='activitiesDesc'>Kort beskrivelse af aktiviteten</label>
                                            <ReactQuill
                                                onChange={ value => setUpdatedDescription( value ) }
                                                theme="snow"
                                                className='quillInput'
                                                value={ updatedDescription }
                                                name="Description"
                                            />
                                        </Col>
                                    </Row>

                                    <Row className='mt-5 mb-5'>
                                        <Col lg={ 12 }>
                                            <label className='labels' htmlFor='activitiesDesc'>Korte fakta om aktiviteten</label>
                                            <ReactQuill
                                                onChange={ value => setUpdatedFacts( value ) }
                                                theme="snow"
                                                className='quillInput'
                                                value={ updatedFacts }
                                                name="Description"
                                            />
                                        </Col>
                                    </Row>

                                    {/* Submit knap */ }
                                    <Row>
                                        <Col lg={ { span: 4, offset: 4 } }>
                                            <button
                                                type="submit"
                                                className='btn_post'
                                                disabled={ !updatedId || !updatedDescription || !updatedName || !updatedPosition || !postLanguage.value || !updatedFacts }
                                                onClick={ ( e ) => handleSubmit( e ) }
                                            >
                                                Opdater aktivitet
                                            </button>
                                        </Col>
                                    </Row>

                                    {/* User message */ }
                                    { message &&
                                        <Row>
                                            <Col lg={ { span: 4, offset: 4 } }>
                                                <div
                                                    className={ `admin__message ${ message.class }` }
                                                >
                                                    { message.msg }
                                                </div>
                                            </Col>
                                        </Row>
                                    }
                                </Row> }

                        </Col>

                        {/* react leaflet */ }
                        <Col lg={ 4 }>

                            { updatedPosition && filteredData &&
                                <>
                                    <p className='mainText'>Klik på kortet og sæt en markør ved aktiviteten</p>
                                    {/* 56.50394988823568, 10.816817744557346   */ }
                                    <MapContainer
                                        center={ [ updatedPosition[ 0 ], updatedPosition[ 1 ] ] }
                                        zoom={ 12 }
                                        id="mapContainer__adminactivities"
                                    >
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' />

                                        <GetLatLng />
                                        <ChangeView />

                                    </MapContainer>
                                </>
                            }

                            <Row className='mt-5'>
                                {
                                    dataActivity && filteredData &&
                                    <Col lg={ 12 }>

                                        <ChosenImage
                                            publicImgId={ updatedPublicUrl }
                                            altTag={ dataActivity.fields.Description }
                                            labelText="Det aktuelle billede"
                                        />

                                    </Col> }

                            </Row>
                        </Col>

                        {/* Billeder */ }
                        {
                             showImages &&
                            <Row>
                                <ShowImages
                                    images={images}
                                    setId={setUpdatedImageId}
                                    setChosenImage={setUpdatedPublicUrl}
                                />                                
                            </Row>
                        }

                    </Row>
                </form> }
        </>

    )
}

export default AdminPatchActicity;