import '../../sass/Forside/EventsForside.scss';

import React, { useContext, useEffect, useState } from 'react'

import UseTranslator from '../../hooks/UseTranslator';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import parse from 'html-react-parser';

import { ImagePathContext } from '../../Context/ImagePathContext';
import { Image } from 'cloudinary-react';

import { useNavigate } from 'react-router-dom';


const Events = (  ) => {

    const { filteredData, error, loading } = UseTranslator( 'Events', true, 'Dato' )

    const { cloudinaryImagePath } = useContext(ImagePathContext);

    const navigate = useNavigate();

    useEffect( () => {

        document.querySelector( '#root' ).style.backgroundColor = '#FAFAFF';
    }, [] )

    return (
        <Container fluid className='events px-0'>

            { error && <div>Error</div> }
            { loading && <div>Loading</div> }

            {
                filteredData && <>
                    <Row>
                        <Col lg={ 12 }>
                            <h1 className='title_forside'>Events</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={ { span: 10, offset: 1 } }>
                            { filteredData.filter(img => img.fields.hasOwnProperty('Images_Frontpage')).slice(0, 3).map((e, i) => (


                                <Col lg={ { span: 12 } } className='event-card' key={ e.id }>

                                    <Col lg={ 1 }>

                                        <p className='mainText'>{ e.fields.Dato }</p>
                                    </Col>

                                    <Col lg={ 2 }>
                                        <figure className='event-image'>
                                            <picture>
                                                <source media="(max-width: 575px)" srcSet={ cloudinaryImagePath + e.fields.ImgId_Mobile_Frontpage[0] } />

                                                <source media="(max-width: 991px)" srcSet={ cloudinaryImagePath + e.fields.ImgId_Tablet_Frontpage[0] } />

                                                <source media="(min-width: 992px)" srcSet={ cloudinaryImagePath + e.fields.ImgId_Desktop_Frontpage[0] } />

                                                <Image
                                                    public_id={ e.fields.ImgId_Desktop_Frontpage[0] }
                                                    cloudName={ import.meta.env.VITE_CLOUDINARY_CLOUD_NAME }
                                                    alt={ e.fields.Image_Description_Frontpage } className='image_activity'
                                                />

                                            </picture>
                                        </figure>
                                    </Col>

                                    <Col lg={ 7 } className="py-3">
                                        <h2>{ e.fields.Titel }</h2>
                                        <div className='event-description mainText'>
                                            { parse(e.fields.Description.slice(0, 300) + '...') }
                                        </div>
                                    </Col>

                                    <Col lg={ 2 }>
                                        <div className='event-info mainText'>
                                            <p>{ e.fields.TimeOfEvent }</p>
                                            <p>{ e.fields.Price[0] }</p>
                                            <p>Ledige pladser: <br /> { e.fields.Tickets }</p>
                                        </div>
                                    </Col>
                                </Col>


                            )) }

                        </Col>
                    </Row>

                    <Row className='mb-4'>
                        <Col lg={ { span: 2, offset: 5 } }>
                            <button type="submit" className='send_submit-input' onClick={ () => navigate("/events") }>Se alle events</button>

                        </Col>
                    </Row>



                </>
            }
        </Container>
    )
}

export default Events