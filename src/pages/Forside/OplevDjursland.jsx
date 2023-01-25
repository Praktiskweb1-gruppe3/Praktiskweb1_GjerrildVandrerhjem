import '../../sass/Forside/OplevDjursland.scss'

import React, { useContext, useState, useEffect } from 'react';

import UseTranslator from '../../hooks/UseTranslator';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ImagePathContext } from '../../Context/ImagePathContext';
import { Image } from 'cloudinary-react';

const OplevDjursland = () => {

    const { filteredData, error, loading } = UseTranslator('FrontpageOplev', true)

    const { cloudinaryImagePath } = useContext(ImagePathContext);


    useEffect(() => {

        document.querySelector('#root').style.backgroundColor = '#FAFAFF';
    }, [])

    return (
        <Container >
            { error && <div>Error</div> }
            { loading && <div>Loading</div> }

            {
                filteredData && <>
                    <Row>
                        <h1 className='title_forside'>{ filteredData[0].fields.Name }</h1>

                        <Col lg={ 6 }>
                            <Row>
                                <Col lg={ 12 }>
                                    {
                                        filteredData.filter(img => img.fields.hasOwnProperty('Images')).slice(0, 1).map((a, i) => (


                                            <figure className='aktiviteter_image oplev' key={ a.id }>
                                                <picture>
                                                    <source media="(max-width: 575px)" srcSet={ cloudinaryImagePath + a.fields.ImgId_Mobile[0] } />

                                                    <source media="(max-width: 991px)" srcSet={ cloudinaryImagePath + a.fields.ImgId_Tablet[0] } />

                                                    <source media="(min-width: 992px)" srcSet={ cloudinaryImagePath + a.fields.ImgId_Desktop[0] } />

                                                    <Image
                                                        public_id={ a.fields.ImgId_Desktop[0] }
                                                        cloudName={ import.meta.env.VITE_CLOUDINARY_CLOUD_NAME }
                                                        alt={ a.fields.Image_Description } className='image_activity'
                                                    />

                                                </picture>
                                                <figcaption>{ a.fields.hasOwnProperty('Image_Text') ? a.fields.Image_Text[0] : '' }</figcaption>
                                            </figure>
                                        ))
                                    }
                                </Col>
                            </Row>

                        </Col>

                        <Col lg={6}>
                            {/* <Row> */}
                                {
                                    filteredData.filter(img => img.fields.hasOwnProperty('Images')).slice(1, 2).map((a, i) => (

                                        <Col
                                            key={ a.id }
                                            lg={ 12 }
                                        >
                                            <figure className={`aktiviteter_image oplev `} >
                                                <picture>
                                                    <source media="(max-width: 575px)" srcSet={ cloudinaryImagePath + a.fields.ImgId_Mobile[0] } />

                                                    <source media="(max-width: 991px)" srcSet={ cloudinaryImagePath + a.fields.ImgId_Tablet[0] } />

                                                    <source media="(min-width: 992px)" srcSet={ cloudinaryImagePath + a.fields.ImgId_Desktop[0] } />

                                                    <Image
                                                        public_id={ a.fields.ImgId_Desktop[0] }
                                                        cloudName={ import.meta.env.VITE_CLOUDINARY_CLOUD_NAME }
                                                        alt={ a.fields.Image_Description } className='image_activity'
                                                    />

                                                </picture>
                                                <figcaption>{ a.fields.hasOwnProperty('Image_Text') ? a.fields.Image_Text[0] : '' }</figcaption>
                                            </figure>

                                        </Col>
                                    ))
                                }
                            {/* </Row> */}
                            <Row>
                                {
                                    filteredData.filter(img => img.fields.hasOwnProperty('Images')).slice(2,4).map((a, i) => (

                                        <Col
                                            key={ a.id }
                                            lg={ 6 }
                                            
                                        >
                                            <figure className={`aktiviteter_image oplev`} >
                                                <picture>
                                                    <source media="(max-width: 575px)" srcSet={ cloudinaryImagePath + a.fields.ImgId_Mobile[0] } />

                                                    <source media="(max-width: 991px)" srcSet={ cloudinaryImagePath + a.fields.ImgId_Tablet[0] } />

                                                    <source media="(min-width: 992px)" srcSet={ cloudinaryImagePath + a.fields.ImgId_Desktop[0] } />

                                                    <Image
                                                        public_id={ a.fields.ImgId_Desktop[0] }
                                                        cloudName={ import.meta.env.VITE_CLOUDINARY_CLOUD_NAME }
                                                        alt={ a.fields.Image_Description } className='image_activity'
                                                    />

                                                </picture>
                                                <figcaption>{ a.fields.hasOwnProperty('Image_Text') ? a.fields.Image_Text[0] : '' }</figcaption>
                                            </figure>

                                        </Col>
                                    ))
                                }
                            </Row>

                        </Col>

                        <Row>
                            <Col>
                            <button type='submit' className='send_submit-input'>Se alle aktiviteter</button>
                            </Col>
                        </Row>


                    </Row>


                </>
            }
        </Container >

    )
}

export default OplevDjursland
