import React, { useRef, useEffect } from 'react';

import UseTranslator from '../hooks/UseTranslator';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import '../sass/Aktiviteter.scss';

import { cleanUpMap, initMapAllActivites } from '../leaflet';

const Aktiviteter = () => {

  const { filteredData, error, loading } = UseTranslator('Activities', true)

  const largeImgPath = "./assets/images/big/"
  const mediumImgPath = "./assets/images/medium/"
  const smallImgPath = "./assets/images/small/"

  const coordinates = useRef([])

  useEffect(() => {
    if (coordinates.current.length <= 0 && filteredData) {

      filteredData.forEach(coordinate => {
        console.log(coordinate.fields.hasOwnProperty('Latitude'))

        if (coordinate.fields.hasOwnProperty('Latitude') && coordinate.fields.hasOwnProperty('Longitude')) {

          coordinates.current.push({ lat: coordinate.fields.Latitude, long: coordinate.fields.Longitude, name: coordinate.fields.Name })

        }

      });

    }

    if (coordinates.current.length >= 1) {
      initMapAllActivites(coordinates.current)
    }

    return () => {

      cleanUpMap();

    }
  }, [filteredData, coordinates.current])

  useEffect( () => {

    document.querySelector( '#root' ).style.backgroundColor = '#FAFAFF';
}, [] )


  return (
    <Container fluid className='aktiviteter'>

      {
        filteredData && <>
          <Row>
            <Col>
              <h1>{ filteredData[0].fields.Name }</h1>
              <h2>{ filteredData[1].fields.Name }</h2>

              <p className='mainText text'>{ filteredData[1].fields.Description }</p>
            </Col>
          </Row>

          <Row>
            {
              filteredData.slice(2).map(a => (

                <Col key={ a.id } md={ 4 }>
                  <figure className='aktiviteter_image'>
                    <picture>
                      <source media="(max-width: 575px)" srcSet={ smallImgPath + a.fields.Image_Name[0] } />

                      <source media="(max-width: 991px)" srcSet={ mediumImgPath + a.fields.Image_Name[0] } />

                      <source media="(min-width: 992px)" srcSet={ largeImgPath + a.fields.Image_Name[0] } />

                      <img src={ mediumImgPath + a.fields.Image_Name[0] } alt={ a.fields.Image_Description } className='image_activity' />
                    </picture>
                    <figcaption>{ a.fields.Image_Text[0] }</figcaption>
                  </figure>

                </Col>
              ))
            }
          </Row>
          <Row>
            <Col>
              <h1 className='kort-title'>Kort over Aktiviteter</h1>
            </Col>
          </Row>

          <Row>
            <Col lg={ { span: 10, offset: 1 } }>
              <div id='mapContainer'>

              </div>
            </Col>
          </Row>
        </>
      }



    </Container>
  )
}

export default Aktiviteter