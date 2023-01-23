import '../sass/Services.scss';


import React, { useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import UseTranslator from '../hooks/UseTranslator';
import parse from 'html-react-parser';

import { ImagePathContext } from '../Context/ImagePathContext';
import { Image } from 'cloudinary-react';

const Services = () => {

    const { filteredData, error, loading } = UseTranslator( "Services", true );

    const { filteredData: filteredDataResturant, error: errorResturant, loading: loadingResturant } = UseTranslator( 'Restaurant' );

    const { cloudinaryImagePath } = useContext( ImagePathContext );

    const largeImgPath = "./assets/images/desktop/";
    const mediumImgPath = "./assets/images/tablet/";
    const smallImgPath = "./assets/images/mobile/";

    useEffect( () => {

        document.querySelector( '#root' ).style.backgroundColor = '#FAFAFF';
    }, [] )


    return (
        <Container fluid className='services xxs'>

            { error && <div>Error</div> }

            { loading && <div>Loading...</div> }

            {
                filteredData &&

                <Container fluid="lg" className='xxs' >
                    <Row className='servicesRow'>
                        <h1>{ filteredData[ 0 ].fields.Service_Name }</h1>
                        {
                            filteredData.slice( 1 ).map( service => (
                                <Col
                                    key={ service.id }
                                    xs={ { span: 10, offset: 1 } }
                                    sm={ { span: 6, offset: 0 } }
                                    className="d-flex xxs"
                                >
                                    <div className='services__card'>
                                        <picture>
                                            <source
                                                media="(max-width: 575px)"
                                                srcSet={ cloudinaryImagePath + service.fields.ImgId_Mobile[ 0 ] }
                                            />

                                            <source
                                                media="(max-width: 991px)"
                                                srcSet={ cloudinaryImagePath + service.fields.ImgId_Tablet[ 0 ] }
                                            />

                                            <source
                                                media="(min-width: 992px)"
                                                srcSet={ cloudinaryImagePath + service.fields.ImgId_Desktop[ 0 ] }
                                            />

                                            <Image
                                                cloudName={ import.meta.env.VITE_CLOUDINARY_CLOUD_NAME }
                                                public_id={ cloudinaryImagePath + service.fields.ImgId_Desktop[ 0 ] }
                                                alt={ service.fields.Image_Description }
                                            />

                                        </picture>

                                        <div className="card__body">
                                            <h3 className='card__title'>{ service.fields.Service_Name }</h3>
                                            <div className='card__description'>{ parse( service.fields.Service_Description ) }</div>
                                        </div>
                                    </div>

                                </Col>
                            ) )
                        }
                    </Row>

                </Container>
            }

            <Container fluid="lg" className='resturant'>
                {/* Text section with 3 images */ }
                {
                    filteredDataResturant &&
                    <Row >
                        <h1>{ filteredDataResturant[ 0 ].fields.Titel }</h1>
                        <Col xs={ { span: 12, order: 2 } } lg={ { span: 6, order: 1 } } >

                            <Row>
                                <Col lg={ { span: 12 } }>
                                    <div className='mainText'>

                                        { parse( filteredDataResturant[ 0 ].fields.Text ) }

                                    </div>
                                </Col>
                            </Row>

                        </Col>

                        <Col md={ { span: 12, order: 1 } } lg={ { span: 6, order: 2 } }>

                            {/* Images with text */ }
                            <Row>
                                {
                                    filteredDataResturant[ 0 ].fields.Images_Text.map( ( img, i ) => (
                                        // If it is the third image, make the big and reorder the flexbox to put it first. 
                                        // order start with 1, i starts with 0. Therefore (i+1)
                                        <Col
                                            xs={ { order: i === 2 ? 1 : ( i + 1 ) + 1 } }
                                            md={ { span: i === 2 ? 12 : 6 } }
                                            // lg={ { span: i === 2 ? 12 : 6 }}
                                            key={ "resturant_image" + i }
                                            className={ "resturant_image" + ( i + 1 ) + `${ i === 2 ? ' d-none d-md-block' : '' } ` }>

                                            <picture>
                                                <source
                                                    media="(max-width: 575px)"
                                                    srcSet={ cloudinaryImagePath + filteredDataResturant[ 0 ].fields.ImgId_Mobile[ i ] }
                                                />

                                                <source
                                                    media="(max-width: 991px)"
                                                    srcSet={ cloudinaryImagePath + filteredDataResturant[ 0 ].fields.ImgId_Tablet[ i ] }
                                                />

                                                <source
                                                    media="(min-width: 992px)"
                                                    srcSet={ cloudinaryImagePath + filteredDataResturant[ 0 ].fields.ImgId_Desktop[ i ] }
                                                />

                                                <Image
                                                    cloudName={ import.meta.env.VITE_CLOUDINARY_CLOUD_NAME }
                                                    src={ largeImgPath + filteredDataResturant[ 0 ].fields.ImgId_Desktop[ i ] }
                                                    alt={ filteredDataResturant[ 0 ].fields.Image_Description[ i ] }
                                                />

                                            </picture>
                                        </Col>
                                    ) )
                                }
                            </Row>

                        </Col>

                    </Row>
                }

                <Row className='d-none d-md-block'>
                    <Col lg={ { span: 12 } }>
                        <hr className='resturant__ruler' />

                    </Col>
                </Row>

                {/* Image Galleri */ }
                <Container fluid className='resturant__gallery d-none d-md-block'>

                    { filteredDataResturant &&
                        <Row>
                            <h2>{ filteredDataResturant[ 0 ].fields.Galleri_Title }</h2>
                            { filteredDataResturant[ 0 ].fields.Images_Galleri.map( ( gImg, i ) => (
                                <Col className='px-3'
                                    md={ 4 }
                                    lg={ 3 }
                                    key={ "resturant__gallery" + i }>
                                    <picture>
                                        <source
                                            media="(max-width: 575px)"
                                            srcSet={ cloudinaryImagePath + filteredDataResturant[ 0 ].fields.ImgId_Mobile_Galleri[ i ] }
                                        />

                                        <source
                                            media="(max-width: 991px)"
                                            srcSet={ cloudinaryImagePath + filteredDataResturant[ 0 ].fields.ImgId_Tablet_Galleri[ i ] }

                                        />

                                        <source
                                            media="(min-width: 992px)"
                                            srcSet={ cloudinaryImagePath + filteredDataResturant[ 0 ].fields.ImgId_Desktop_Galleri[ i ] }

                                        />

                                        <Image
                                            style={ { width: '100%', height: 'auto', display: 'block' } }
                                            cloudName={ import.meta.env.VITE_CLOUDINARY_CLOUD_NAME }
                                            public_id={ largeImgPath + filteredDataResturant[ 0 ].fields.ImgId_Desktop_Galleri[ i ] }
                                            alt={ filteredDataResturant[ 0 ].fields.Image_Description_Galleri[ i ] }
                                            className="gallery__image"
                                        />

                                    </picture>

                                </Col>

                            ) ) }
                        </Row>
                    }

                </Container>


            </Container>

        </Container>




    )
}

export default Services