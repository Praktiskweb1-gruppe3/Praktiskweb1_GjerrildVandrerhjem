import '../../sass/Forside/VoresRooms.scss';
import 'react-slideshow-image/dist/styles.css';

import React, { useContext, useEffect, useState } from 'react'

import UseTranslator from '../../hooks/UseTranslator';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Slide } from 'react-slideshow-image';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShower, faToilet, faWifi } from "@fortawesome/free-solid-svg-icons";

import parse from 'html-react-parser';

import { ImagePathContext } from '../../Context/ImagePathContext';
import { Image } from 'cloudinary-react';

const VoresRooms = () => {

    const { filteredData, error, loading } = UseTranslator('Rooms', true)

    const { cloudinaryImagePath } = useContext(ImagePathContext);

    const [numOfGuests, setNumOfGuests] = useState(1);

    const [dateFrom, setDateFrom] = useState()
    const [dateTo, setDateTo] = useState()

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
        <Container>

            { error && <div>Error</div> }
            { loading && <div>Loading</div> }

            {
                filteredData && <>

                    <Row>
                        <Col>
                            <form className='vores-room-reservation'>

                                <div className='custom-formGroup'>
                                    <label className='labels'>{ filteredData[0].fields.Room_Date }</label>

                                    <div className='custom-formGroup-row'>


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

                                <button type="submit" className='send_submit-room' onClick={() => window.open(`https://gjerrildvandrerhjem.suitcasebooking.com/da/?datefrom=${dateFrom}&dateto=${dateTo}`, '_blank')}>{ filteredData[0].fields.Room_Available }</button>

                            </form>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <h1 className='title_forside'>{ filteredData[0].fields.Room_Title }</h1>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={ { span: 4, offset: 1 } } className="room-container d-none d-md-block">
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

                        <Col lg={ { span: 2 } } className='room-container'>
                            <h2 className='room_about-title'>{ filteredData[0].fields.Room_Deal }</h2>
                            <p className='mainText'>{ filteredData[0].fields.Room_DescriptionInfo }</p>
                            <FontAwesomeIcon icon={ faShower } className='room-icon' />
                            <FontAwesomeIcon icon={ faWifi } className='room-icon' />
                            <FontAwesomeIcon icon={ faToilet } className='room-icon' />
                        </Col>

                        <Col lg={ 4 } className='room-container'>

                            <div className='room_price'>
                                <h2 className='room_price'>
                                    { filteredData[0].fields.Room_PriceText }
                                </h2>

                                <h2 className='room_price'>
                                    { 'Fra DKK' + returnPrices(filteredData[0].fields.Prices[0]) }
                                </h2>
                                
                                <p className='mainText'>Pr. nat</p>
                            </div>
                        </Col>

                    </Row>

                    <Row>
                        <Col lg={ { span: 8, offset: 2 } }>
                            <button className="send_submit-input">Bestil Værelse</button>
                        </Col>
                    </Row>


                </>
            }
        </Container>
    )
}

export default VoresRooms