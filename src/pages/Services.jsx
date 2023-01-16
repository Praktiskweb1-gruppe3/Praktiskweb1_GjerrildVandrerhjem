import '../sass/Services.scss';


import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import UseTranslator from '../hooks/UseTranslator';

import parse from 'html-react-parser';

const Services = () => {

    const { filteredData, error, loading } = UseTranslator( "Services", true );

    const { filteredData: filteredDataResturant, error: errorResturant, loading: loadingResturant } = UseTranslator( 'Restutant' );

    const largeImgPath = "./assets/images/big/";
    const mediumImgPath = "./assets/images/medium/";
    const smallImgPath = "./assets/images/small/";

    useEffect( () => {

        document.querySelector( '#root' ).style.backgroundColor = '#FAFAFF';
    }, [] )


    return (
        <Container fluid className='services'>

            {/* {error && } */}

            {/* {loading && } */}

            {
                filteredData &&

                <Container fluid="lg" >
                    <Row className='servicesRow'>
                        <h1>{ filteredData[ 0 ].fields.Service_Name }</h1>
                        {
                            filteredData.slice( 1 ).map( service => (
                                <Col
                                    key={ service.id }
                                    xs={ 12 }
                                    lg={ 6 }
                                    className="d-flex"
                                >
                                    <div className='services__card'>
                                        <picture>
                                            <source media="(max-width: 575px)" srcSet={ smallImgPath + service.fields.Image_Name[ 0 ] } />
                                            <source media="(max-width: 991px)" srcSet={ mediumImgPath + service.fields.Image_Name[ 0 ] } />
                                            <source media="(min-width: 992px)" srcSet={ largeImgPath + service.fields.Image_Name[ 0 ] } />

                                            <img
                                                style={ { width: '100%', height: 'auto', display: 'block' } }
                                                src={ largeImgPath + service.fields.Image_Name[ 0 ] }
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
                        <Col lg={ 6 } >

                            <Row>
                                <Col lg={ { span: 12 } }>
                                    <div className='mainText'
                                        style={ { fontSize: '2rem', lineHeight: '1.4', whiteSpace: 'pre-line' } }>

                                        { parse( filteredDataResturant[ 0 ].fields.Text ) }

                                    </div>
                                </Col>
                            </Row>

                        </Col>

                        <Col lg={ { span: 6 } }>

                            {/* Images with text */ }
                            <Row>
                                {
                                    filteredDataResturant[ 0 ].fields.Image_Name.map( ( img, i ) => (
                                        // If it is the third image, make the big and reorder the flexbox to put it first. 
                                        // order start with 1, i starts with 0. Therefore (i+1)
                                        <Col
                                            lg={ { span: i === 2 ? 12 : 6, order: i === 2 ? 1 : ( i + 1 ) + 1 } }
                                            key={ "resturant_image" + i }
                                            className={ "resturant_image" + ( i + 1 ) }>

                                            <picture>
                                                <source media="(max-width: 575px)" srcSet={ smallImgPath + img } />
                                                <source media="(max-width: 991px)" srcSet={ mediumImgPath + img } />
                                                <source media="(min-width: 992px)" srcSet={ largeImgPath + img } />

                                                <img
                                                    style={ { width: '100%', height: 'auto', display: 'block' } }
                                                    src={ largeImgPath + img }
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

                <Row>
                    <Col lg={ { span: 12 } }>
                        <hr className='resturant__ruler' />

                    </Col>
                </Row>

                {/* Image Galleri */ }
                <Container fluid className='resturant__gallery'>

                    { filteredDataResturant &&
                        <Row>
                            <h2>{ filteredDataResturant[ 0 ].fields.Galleri_Title }</h2>
                            {filteredDataResturant[ 0 ].fields.Image_Name_Galleri.map( ( gImg, i ) => (
                            <Col className='px-3' lg={ 3 } key={ "resturant__gallery" + i }>
                                <picture>
                                    <source media="(max-width: 575px)" srcSet={ smallImgPath + gImg } />
                                    <source media="(max-width: 991px)" srcSet={ mediumImgPath + gImg } />
                                    <source media="(min-width: 992px)" srcSet={ largeImgPath + gImg } />

                                    <img
                                        style={ { width: '100%', height: 'auto', display: 'block' } }

                                        src={ largeImgPath + gImg }
                                        alt={ filteredDataResturant[ 0 ].fields.Image_Description_Galleri[ i ] }
                                        className="gallery__image"
                                    />

                                </picture>

                            </Col>

                            ) )}
                        </Row>
                    }

                </Container>


            </Container>

        </Container>




    )
}

export default Services