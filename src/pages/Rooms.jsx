import '../sass/Rooms.scss'

import React, { useEffect } from 'react'

import UseTranslator from '../hooks/UseTranslator';

import Container from 'react-bootstrap/Container';
<<<<<<< Updated upstream
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShower, faToilet, faWifi, faWheelchairMove, faWindowClose, faChair } from "@fortawesome/free-solid-svg-icons";

import parse from 'html-react-parser'

=======
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
>>>>>>> Stashed changes

const Rooms = () => {

    const { filteredData, error, loading } = UseTranslator('Rooms', true)

    const largeImgPath = './assets/images/desktop/';
    const mediumImgPath = './assets/images/tablet/';
    const smallImgPath = './assets/images/mobile/';

<<<<<<< Updated upstream
    // const slideImages = [
    //     {
    //         url: 'images/slide_2.jpg',
    //         caption: 'Slide 1'
    //     },
    //     {
    //         url: 'images/slide_3.jpg',
    //         caption: 'Slide 2'
    //     },
    //     {
    //         url: 'images/slide_4.jpg',
    //         caption: 'Slide 3'
    //     },
    // ];

=======
>>>>>>> Stashed changes
    useEffect(() => {

        document.querySelector('#root').style.backgroundColor = '#FAFAFF';
    }, [])

<<<<<<< Updated upstream

    return (
        <Container fluid className='room'>
            {
                filteredData && <>
                    <Row >

                        <h1>{ filteredData[0].fields.Room_Title }</h1>

                        <Col lg={ { span: 6, offset: 3 } }>
                            <form className='room_reservation'>

                                <div className='custom-formGroup'>
                                    <label>{ filteredData[0].fields.Room_Date }</label>
                                    <input type="datetime-local"
                                        defaultValue="2023-01-23"
                                        min="2023-01-23"
                                        max="2023-12-31"
                                        placeholder={ filteredData[0].fields.Room_Check }
                                        className='input_room' />
                                </div>

                                <div className='custom-formGroup'>
                                    <label>{ filteredData[0].fields.Room_Guest }</label>
                                    <input type="number"
                                        min="1"
                                        max="100"
                                        className='input_room' />
                                </div>

                                <button type="submit" className='send_submit-room mainText'>{ filteredData[0].fields.Room_Available }</button>

                            </form>
                        </Col>
                    </Row>

                    <Row className='my-5'>
                        <Col lg={ { span: 8, offset: 2 } } className="room_deal">

                            <Row>
                                <Col lg={ 7 }>

                                    <h1>{ filteredData[0].fields.Room_Deal }</h1>

                                </Col>
                                <Col lg={ 4 }>

                                    <div className='room_price'>
                                        <h2 className='room_price'>{ 'DKK kr.-' + filteredData[0].fields.Prices }</h2>
                                        <p className='mainText'>Pr. nat</p>
                                    </div>
                                </Col>
                            </Row>

                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            {/* SLIDER */ }
                            <div className='room_slider'>

=======
    return (
        <Container fluid className='rooms'>
            {
                filteredData && <>
                    <Row>
                        <Col>
                        <div>
                            <h1>{ filteredData[0].fields.Room_Title }</h1>
                            <form className='search_bar'>
                                <label className='mainText'>{ filteredData[0].fields.Room_Date }</label>
                                <input type="text" placeholder={ filteredData[0].fields.Room_Description } className='' />
                            </form>
>>>>>>> Stashed changes
                            </div>
                        </Col>
                    </Row>

<<<<<<< Updated upstream
                    {/* <Row>
                        <Col>
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
                    </Row> */}

                    <Row className='room_about'>
                        {/* <hr className='hr_about' /> */ }
                        <h1 className='room_about-title'>{ filteredData[0].fields.Room_Title2 }</h1>

                        <Col lg={ { span: 5, offset: 1 } }>

                            <div className='mainText room_aboutText'>{ parse(filteredData[0].fields.Room_Description) }</div>

                        </Col>

                        <Col lg={ { span: 5, offset: 1 } }>

                            <div className='mainText room_aboutText'>   { filteredData[0].fields.Room_list_inclusive }
                                <p className='room_aboutIconText'>  <FontAwesomeIcon icon={ faToilet } className='room_icon' /> { filteredData[0].fields.Room_list_toilet } </p>
                                <p className='room_aboutIconText'>  <FontAwesomeIcon icon={ faWifi } className='room_icon' /> { filteredData[0].fields.Room_list_bed } </p>
                                <p className='room_aboutIconText'>  <FontAwesomeIcon icon={ faWheelchairMove } className='room_icon' /> { filteredData[0].fields.Room_list_handicap } </p>
                                <p className='room_aboutIconText'>  <FontAwesomeIcon icon={ faWindowClose } className='room_icon' /> { filteredData[0].fields.Room_list_windows } </p>
                                <p className='room_aboutIconText'>  <FontAwesomeIcon icon={ faChair } className='room_icon' /> { filteredData[0].fields.Room_list_desk } </p>
                            </div>
                        </Col>
                    </Row>
                </> }
=======
                </>
            }

>>>>>>> Stashed changes
        </Container>
    )
}

export default Rooms