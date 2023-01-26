import '../../sass/Forside/EventsForside.scss';

import React, { useContext, useEffect, useState } from 'react'

import UseTranslator from '../../hooks/UseTranslator';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import parse from 'html-react-parser';

import { ImagePathContext } from '../../Context/ImagePathContext';
import { Image } from 'cloudinary-react';


const Events = ( { e } ) => {

    const { filteredData, error, loading } = UseTranslator( 'Events', true, 'Dato' )

    const { cloudinaryImagePath } = useContext( ImagePathContext );

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
                        <Col lg={ 12 } className='event-card'>
                            <Col lg={ 4 }>
                                {
                                    filteredData.filter( img => img.fields.hasOwnProperty( 'Images' ) ).slice( 0, 1 ).map( ( e, i ) => (

                                        <div className='event-image' key={ e.id }>
                                            <figure key={ e.id }>
                                                <picture>
                                                    <source media="(max-width: 575px)" srcSet={ cloudinaryImagePath + e.fields.ImgId_Mobile[ 0 ] } />

                                                    <source media="(max-width: 991px)" srcSet={ cloudinaryImagePath + e.fields.ImgId_Tablet[ 0 ] } />

                                                    <source media="(min-width: 992px)" srcSet={ cloudinaryImagePath + e.fields.ImgId_Desktop[ 0 ] } />

                                                    <Image
                                                        public_id={ e.fields.ImgId_Desktop[ 0 ] }
                                                        cloudName={ import.meta.env.VITE_CLOUDINARY_CLOUD_NAME }
                                                        alt={ e.fields.Image_Description } className='image_activity'
                                                    />

                                                </picture>
                                                <figcaption>{ e.fields.hasOwnProperty( 'Image_Text' ) ? e.fields.Image_Text[ 0 ] : '' }</figcaption>
                                            </figure>
                                        </div>
                                    ) )
                                }
                            </Col>

                            <Col lg={ 4 }>
                                <h2>{ filteredData[ 1 ].fields.Titel }</h2>
                                <div className='event-description'>
                                    <p >{ filteredData[ 1 ].fields.Description }</p>
                                </div>
                            </Col>

                            <Col lg={ 4 }>
                                <div className='event-info'>
                                    <p>{ filteredData[ 1 ].fields.TimeOfEvent }</p>
                                    <p>{ filteredData[ 1 ].fields.Dato }</p>
                                    <p>{ filteredData[ 1 ].fields.Price }</p>
                                </div>
                            </Col>

                        </Col>

                    </Row>

                    <Row>
                        <Col lg={ 12 }>
                            <Col lg={ 4 }>
                                {
                                    filteredData.filter( img => img.fields.hasOwnProperty( 'Images' ) ).slice( 1, 2 ).map( ( e, i ) => (

                                        <div className='event-image' key={ e.id }>
                                            <figure >
                                                <picture>
                                                    <source media="(max-width: 575px)" srcSet={ cloudinaryImagePath + e.fields.ImgId_Mobile[ 0 ] } />

                                                    <source media="(max-width: 991px)" srcSet={ cloudinaryImagePath + e.fields.ImgId_Tablet[ 0 ] } />

                                                    <source media="(min-width: 992px)" srcSet={ cloudinaryImagePath + e.fields.ImgId_Desktop[ 0 ] } />

                                                    <Image
                                                        public_id={ e.fields.ImgId_Desktop[ 0 ] }
                                                        cloudName={ import.meta.env.VITE_CLOUDINARY_CLOUD_NAME }
                                                        alt={ e.fields.Image_Description } className='image_activity'
                                                    />

                                                </picture>
                                                <figcaption>{ e.fields.hasOwnProperty( 'Image_Text' ) ? e.fields.Image_Text[ 0 ] : '' }</figcaption>
                                            </figure>
                                        </div>
                                    ) )
                                }
                            </Col>

                            <Col lg={ 4 }>
                                <h2>{ filteredData[ 2 ].fields.Titel }</h2>
                                <div className='event-description'>
                                    <p >{ filteredData[ 2 ].fields.Description }</p>
                                </div>
                            </Col>

                            <Col lg={ 4 }>
                                <div className='event-info'>
                                    <p>{ filteredData[ 2 ].fields.TimeOfEvent }</p>
                                    <p>{ filteredData[ 2 ].fields.Dato }</p>
                                    <p>{ filteredData[ 2 ].fields.Price }</p>
                                </div>
                            </Col>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={ 12 }>
                            <Col lg={ 4 }>
                                {
                                    filteredData.filter( img => img.fields.hasOwnProperty( 'Images' ) ).slice( 2, 3 ).map( ( e, i ) => (

                                        <div className='event-image' key={ e.id }>
                                            <figure >
                                                <picture>
                                                    <source media="(max-width: 575px)" srcSet={ cloudinaryImagePath + e.fields.ImgId_Mobile[ 0 ] } />

                                                    <source media="(max-width: 991px)" srcSet={ cloudinaryImagePath + e.fields.ImgId_Tablet[ 0 ] } />

                                                    <source media="(min-width: 992px)" srcSet={ cloudinaryImagePath + e.fields.ImgId_Desktop[ 0 ] } />

                                                    <Image
                                                        public_id={ e.fields.ImgId_Desktop[ 0 ] }
                                                        cloudName={ import.meta.env.VITE_CLOUDINARY_CLOUD_NAME }
                                                        alt={ e.fields.Image_Description } className='image_activity'
                                                    />

                                                </picture>
                                                <figcaption>{ e.fields.hasOwnProperty( 'Image_Text' ) ? e.fields.Image_Text[ 0 ] : '' }</figcaption>
                                            </figure>
                                        </div>
                                    ) )
                                }
                            </Col>

                            <Col lg={ 4 }>
                                <h2>{ filteredData[ 3 ].fields.Titel }</h2>
                                <div className='event-description'>
                                    <p >{ filteredData[ 3 ].fields.Description }</p>
                                </div>
                            </Col>

                            <Col lg={ 4 }>
                                <div className='event-info'>
                                    <p>{ filteredData[ 3 ].fields.TimeOfEvent }</p>
                                    <p>{ filteredData[ 3 ].fields.Dato }</p>
                                    <p>{ filteredData[ 3 ].fields.Price }</p>
                                </div>
                            </Col>
                        </Col>
                    </Row>

                </>
            }
        </Container>
    )
}

export default Events