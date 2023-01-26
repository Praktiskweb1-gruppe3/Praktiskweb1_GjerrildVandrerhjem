import 'react-slideshow-image/dist/styles.css';
import '../../sass/Forside/Forside.scss'

import React, { useContext, useEffect, useState } from 'react'

import UseTranslator from '../../hooks/UseTranslator';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {  Slide } from 'react-slideshow-image';

import { ImagePathContext } from '../../Context/ImagePathContext';
import { Image } from 'cloudinary-react';

import VoresRooms from '../Forside/VoresRooms';
import Events from '../Forside/Events';
import OplevDjursland from '../Forside/OplevDjursland';
import KontaktOs from '../Forside/KontaktOs';


const Forside = () => {

    const { filteredData, error, loading } = UseTranslator('ForsideSlider', true)

    const { cloudinaryImagePath } = useContext(ImagePathContext);


    useEffect(() => {

        document.querySelector('#root').style.backgroundColor = '#FAFAFF';
    }, [])

    return (
        <Container fluid className='forside'>

            { error && <div>Error</div> }
            { loading && <div>Loading</div> }

            {
                filteredData && <>
                    <Row>

                        <Col lg={{span: 8, offset: 2}} className="d-none d-md-block px-0">

                            <div className="slide-container">
                                {/* <AutoplaySlider duration={ 5000 }> */}
                                    <Slide autoplay infinite arrows={false}>
                                        { filteredData.map((s, i) => (
                                            <div className="each-slide" key={ s.id }>
                                                <figure className='forside_images bigSlider'>
                                                    <picture>
                                                        <source media="(max-width: 991px)" srcSet={ cloudinaryImagePath + s.fields.ImgId_Tablet[0] } />
                                                        <source media="(min-width: 992px)" srcSet={ cloudinaryImagePath + s.fields.ImgId_Desktop[0] } />

                                                        <Image
                                                            cloudName={ import.meta.env.VITE_CLOUDINARY_CLOUD_NAME }
                                                            public_id={ s.fields.ImgId_Desktop[0] }
                                                            alt={ s.fields.Image_Description }
                                                        />

                                                        <figcaption>{ s.fields.hasOwnProperty('Image_Text') ? s.fields.Image_Text[0] : '' }</figcaption>
                                                    </picture>
                                                </figure>
                                            </div>
                                        )) }
                                    </Slide>
                                {/* </AutoplaySlider> */}
                            </div>
                        </Col>

                    </Row>

                    <Row>
                        <Col>
                            {/* component værelser  */ }
                            <VoresRooms />
                        </Col>

                    </Row>

                    <Row>
                        <Col>{/* component events  */ }
                            <Events /> 
                        </Col>

                    </Row>

                    <Row>
                        <Col>{/* component oplev djursland */ }
                            <OplevDjursland />
                        </Col>

                    </Row>

                    <Row>
                        <Col>{/* component kontakt */ }
                            <KontaktOs /></Col>

                    </Row>




                </>
            }
        </Container>
    )
}

export default Forside