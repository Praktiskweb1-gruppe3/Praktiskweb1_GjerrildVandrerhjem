import '../sass/Rooms.scss'

import React, { useEffect } from 'react'

import UseTranslator from '../hooks/UseTranslator';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShower, faToilet, faWifi, faWheelchairMove, faWindowClose, faChair } from "@fortawesome/free-solid-svg-icons";

import parse from 'html-react-parser'


const Rooms = () => {

    const { filteredData, error, loading } = UseTranslator('Rooms', true)

    const largeImgPath = './assets/images/desktop/';
    const mediumImgPath = './assets/images/tablet/';
    const smallImgPath = './assets/images/mobile/';

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

    useEffect(() => {

        document.querySelector('#root').style.backgroundColor = '#FAFAFF';
    }, [])


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

                            </div>
                        </Col>
                    </Row>

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
        </Container>
    )
}

export default Rooms