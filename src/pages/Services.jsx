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
                {
                    filteredDataResturant &&
                    <Row >
                        <Col lg={ 6 }>
                            <h1>{ filteredDataResturant[ 0 ].fields.Titel }</h1>

                            <Row>
                                <Col lg={{span:10, offset: 2}}>
                                    <div className='mainText'
                                        style={ { fontSize: '2rem' } }>

                                        { parse( filteredDataResturant[ 0 ].fields.Text ) }

                                    </div>
                                </Col>
                            </Row>

                        </Col>

                        <Col lg={ {span: 4} }>

                            <figure className='resturant_big_image'>
                                <picture>
                                <source media="(max-width: 575px)" srcSet={ smallImgPath + filteredDataResturant[ 0 ].fields.Image_Name[ 2 ] } />
                                <source media="(max-width: 991px)" srcSet={ mediumImgPath + filteredDataResturant[ 0 ].fields.Image_Name[ 2 ] } />
                                <source media="(min-width: 992px)" srcSet={ largeImgPath + filteredDataResturant[ 0 ].fields.Image_Name[ 2 ] } />

                                <img
                                    style={ { width: '100%', height: 'auto', display: 'block' } }
                                    src={ largeImgPath + filteredDataResturant[ 0 ].fields.Image_Name[ 2 ] }
                                    alt={ filteredDataResturant[ 0 ].fields.Image_Description[ 2 ] }
                                />

                            </picture>
                            </figure>

                            

                            <Row>
                                <Col lg={ 6 }>
                                    <picture>
                                        <source media="(max-width: 575px)" srcSet={ smallImgPath + filteredDataResturant[ 0 ].fields.Image_Name[ 1 ] } />
                                        <source media="(max-width: 991px)" srcSet={ mediumImgPath + filteredDataResturant[ 0 ].fields.Image_Name[ 1 ] } />
                                        <source media="(min-width: 992px)" srcSet={ largeImgPath + filteredDataResturant[ 0 ].fields.Image_Name[ 1 ] } />

                                        <img
                                            style={ { width: '100%', height: 'auto', display: 'block' } }
                                            src={ largeImgPath + filteredDataResturant[ 0 ].fields.Image_Name[ 1 ] }
                                            alt={ filteredDataResturant[ 0 ].fields.Image_Description[ 1 ] }
                                        />

                                    </picture>
                                </Col>

                                <Col lg={ 6 }>
                                    <picture>
                                        <source media="(max-width: 575px)" srcSet={ smallImgPath + filteredDataResturant[ 0 ].fields.Image_Name[ 0 ] } />
                                        <source media="(max-width: 991px)" srcSet={ mediumImgPath + filteredDataResturant[ 0 ].fields.Image_Name[ 0 ] } />
                                        <source media="(min-width: 992px)" srcSet={ largeImgPath + filteredDataResturant[ 0 ].fields.Image_Name[ 0] } />

                                        <img
                                            style={ { width: '100%', height: 'auto', display: 'block' } }
                                            src={ largeImgPath + filteredDataResturant[ 0 ].fields.Image_Name[ 0 ] }
                                            alt={ filteredDataResturant[ 0 ].fields.Image_Description[ 0 ] }
                                        />

                                    </picture>

                                </Col>
                            </Row>

                        </Col>

                    </Row>
                }
            </Container>

        </Container>




    )
}

export default Services