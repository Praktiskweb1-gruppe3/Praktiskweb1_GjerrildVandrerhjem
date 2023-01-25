import 'react-slideshow-image/dist/styles.css';
import '../sass/Rooms.scss'

import React, { useContext, useEffect, useState } from 'react'

import UseTranslator from '../hooks/UseTranslator';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Slide } from 'react-slideshow-image';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShower, faToilet, faWifi, faWheelchairMove, faWindowClose, faChair } from "@fortawesome/free-solid-svg-icons";

import parse from 'html-react-parser';

import { ImagePathContext } from '../Context/ImagePathContext';
import { Image } from 'cloudinary-react';



const Rooms = () => {

    const { filteredData, error, loading } = UseTranslator('Rooms', true)

    const { cloudinaryImagePath } = useContext(ImagePathContext);

    const [dateFrom, setDateFrom] = useState()
    const [dateTo, setDateTo] = useState()
    const [numOfGuests, setNumOfGuests] = useState(1);

    const returnPrices = (oGPrice) => {

        if (numOfGuests > 1) {
            return oGPrice + (100 * numOfGuests) - 100;
        }

        return oGPrice;

    }


    useEffect(() => {

        document.querySelector('#root').style.backgroundColor = '#FAFAFF';
    }, [])


    return (
        <Container fluid className='room'>

            { error && <div>Error</div> }
            { loading && <div>Loading</div> }

            {
                filteredData && <>
                    <Row >

                        <h1>{ filteredData[0].fields.Room_Title }</h1>

                        <Col lg={ { span: 6, offset: 3 } }>
                            <form className='room_reservation'>

                                <div className='custom-formGroup'>
                                    <label className='labels'>{ filteredData[0].fields.Room_Date }</label>

                                    <div className='custom-formGroup-row'>

                                        <Row>
                                            
                                        </Row>
                                        <input type="date"
                                            defaultValue="dd-mm-y"
                                            min="2023-01-23"
                                            max="2023-12-31"
                                            placeholder={ filteredData[0].fields.Room_Check }
                                            onChange={ (e) => setDateFrom(e.target.value) }
                                            className='input_room' />

                                        <input type="date"
                                            defaultValue="dd-mm-y"
                                            min="2023-01-23"
                                            max="2023-12-31"
                                            placeholder={ filteredData[0].fields.Room_Check }
                                            onChange={ (e) => setDateTo(e.target.value) }
                                            className='input_room' />
                                    </div>



                                </div>

                                <div className='custom-formGroup'>
                                    <label className='labels'>{ filteredData[0].fields.Room_Guest }</label>
                                    <input type="number"
                                        defaultValue={ 1 }
                                        min="1"
                                        max="5"
                                        onChange={ (e) => setNumOfGuests(e.target.value) }
                                        className='input_room' />
                                </div>

                                <button type="submit" className='send_submit-room'>{ filteredData[0].fields.Room_Available }</button>

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
                                        <h2 className='room_price'>
                                            { 'DKK' + returnPrices(filteredData[0].fields.Prices[0]) }
                                        </h2>
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

                    <Row>
                        <Col lg={ { span: 8, offset: 2 } } className="d-none d-md-block">
                            <div className="slide-container">
                                <Slide>
                                    { filteredData[0].fields.Images.map((slideImage, index) => (
                                        <div className="each-slide" key={ index }>
                                            <figure className='room_images'>
                                                <picture>
                                                    <source media="(max-width: 991px)" srcSet={ cloudinaryImagePath + filteredData[0].fields.ImgId_Tablet[index] } />
                                                    <source media="(min-width: 992px)" srcSet={ cloudinaryImagePath + filteredData[0].fields.ImgId_Desktop[index] } />

                                                    <Image
                                                        cloudName={ import.meta.env.VITE_CLOUDINARY_CLOUD_NAME }
                                                        public_id={ filteredData[0].fields.ImgId_Desktop[index] }
                                                    //   alt={filteredData[0].fields.Description[index]}
                                                    />
                                                    <figcaption>{ slideImage.caption }</figcaption>
                                                </picture>
                                            </figure>
                                        </div>
                                    )) }
                                </Slide>
                            </div>
                        </Col>

                        <Col className='d-block d-md-none'>
                            <Image
                                cloudName={ import.meta.env.VITE_CLOUDINARY_CLOUD_NAME }
                                public_id={ filteredData[0].fields.ImgId_Mobile[0] }
                            //   alt={filteredData[0].fields.Description[index]}
                            />
                        </Col>
                    </Row>

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