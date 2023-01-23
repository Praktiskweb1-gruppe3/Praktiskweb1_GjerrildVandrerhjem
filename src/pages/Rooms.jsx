import '../sass/Rooms.scss'

import React, { useEffect } from 'react'

import UseTranslator from '../hooks/UseTranslator';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// import { Slide } from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css'


const Rooms = () => {

    const { filteredData, error, loading } = UseTranslator('Rooms', true)

    const largeImgPath = './assets/images/desktop/';
    const mediumImgPath = './assets/images/tablet/';
    const smallImgPath = './assets/images/mobile/';

    const slideImages = [
        {
            url: 'images/slide_2.jpg',
            caption: 'Slide 1'
        },
        {
            url: 'images/slide_3.jpg',
            caption: 'Slide 2'
        },
        {
            url: 'images/slide_4.jpg',
            caption: 'Slide 3'
        },
    ];

    useEffect( () => {

        document.querySelector( '#root' ).style.backgroundColor = '#FAFAFF';
      }, [] )
    

    return (
        <Container fluid className='room'>
            { 
            filteredData && <>
                <Row>
                    <Col>
                        <h1>{ filteredData[0].fields.Room_Title }</h1>
                        <form>
                            <label>{ filteredData[0].fields.Room_Date }</label>
                        </form>
                        {/* SLIDER */ }
                        <div className="slide-container">
                            <Slide>
                                { slideImages.map((slideImage, index) => (
                                    <div className="each-slide" key={ index }>
                                        <div style={ { 'backgroundImage': `url(${slideImage.url})` } }>
                                            <span>{ slideImage.caption }</span>
                                        </div>
                                    </div>
                                )) }
                            </Slide>
                        </div>

                    </Col>
                </Row>
            </> }
        </Container>
    )
}

export default Rooms