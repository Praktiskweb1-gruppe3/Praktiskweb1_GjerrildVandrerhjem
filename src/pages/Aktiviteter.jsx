import React, { useRef, useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import '../sass/Aktiviteter.scss';
import '../sass/Leaflet.scss';

import UseTranslator from '../hooks/UseTranslator';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


// import { cleanUpMap, initMapAllActivites } from '../leaflet';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'

import GetLatLng from '../component/GetLatLng';


const Aktiviteter = () => {

  const { filteredData, error, loading } = UseTranslator( 'Activities', true )

  const largeImgPath = './assets/images/desktop/';
  const mediumImgPath = './assets/images/tablet/';
  const smallImgPath = './assets/images/mobile/';

  const [ coordinates, setCoordinates ] = useState( [] )

  const handleClick = ( e ) => {

    const { lat, lng } = e.latlng;
    console.log( lat, lng );

  }


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

    document.querySelector( '#root' ).style.backgroundColor = '#FAFAFF';
  }, [] )


  return (
    <Container fluid className='aktiviteter'>

      {
        filteredData && <>
          <Row>
            <Col>
              <h1>{ filteredData[ 0 ].fields.Name }</h1>
              <h2>{ filteredData[ 1 ].fields.Name }</h2>

              <p className='mainText text'>{ filteredData[ 1 ].fields.Description }</p>
            </Col>
          </Row>

          <Row>
            {
              filteredData.slice( 2, filteredData.length - 1 ).map( a => (

                <Col key={ a.id } md={ 4 }>
                  <figure className='aktiviteter_image'>
                    <picture>
                      <source media="(max-width: 575px)" srcSet={ smallImgPath + a.fields.Image_Name[ 0 ] } />

                      <source media="(max-width: 991px)" srcSet={ mediumImgPath + a.fields.Image_Name[ 0 ] } />

                      <source media="(min-width: 992px)" srcSet={ largeImgPath + a.fields.Image_Name[ 0 ] } />

                      <img src={ mediumImgPath + a.fields.Image_Name[ 0 ] } alt={ a.fields.Image_Description } className='image_activity' />
                    </picture>
                    <figcaption>{ a.fields.Image_Text[ 0 ] }</figcaption>
                  </figure>

                </Col>
              ) )
            }
          </Row>
          <Row>
            <Col>
              <h1 className='kort-title'>Kort over Aktiviteter</h1>
            </Col>
          </Row>

          <Row>
            <Col lg={ { span: 10, offset: 1 } }>
              {/* <div id='mapContainer'>

              </div> */}

              {
                coordinates?.length >= 1 ? (

                  <MapContainer center={ [ coordinates[ 0 ].lat, coordinates[ 0 ].long ] } zoom={ 10 } id="mapContainer" onClick={ ( e ) => handleClick( e ) }>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' />

                    {
                      coordinates.map( ( coord, i ) => (
                        <Marker position={ [ coord.lat, coord.long ] } key={ 'coord' + i }>

                          <Popup>
                            { coord.name }
                          </Popup>
                        </Marker>
                      ) )
                    }

                  </MapContainer> ) : ( null )


              }

            </Col>
          </Row>
        </>
      }

    </Container>
  )
}

export default Aktiviteter