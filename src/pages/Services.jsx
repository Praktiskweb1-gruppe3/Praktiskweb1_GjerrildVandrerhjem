import '../sass/Services.scss';


import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import UseTranslator from '../hooks/UseTranslator';

const Services = () => {

    const { filteredData, error, loading } = UseTranslator( "Services", true );

    const largeImgPath = "./assets/images/big/"
    const mediumImgPath = "./assets/images/medium/"
    const smallImgPath = "./assets/images/small/"


    return (
        <Container fluid className='services'>
            {
                filteredData &&

                <Container fluid="lg" >
                    <h1>{ filteredData[ 0 ].fields.Service_Name }</h1>
                    <Row className='servicesRow '>
                        {
                            filteredData.slice( 1 ).map( ( service, index ) => (
                                <Col
                                    key={ service.id }
                                    xs={ 12 }
                                    lg={6 }
                                >
                                    <div className='services__card'>
                                        <picture>
                                        <source media="(max-width: 575px)" srcSet={ smallImgPath + 'services/' + service.fields.Image_Name[ 0 ] } />

                                        <source media="(max-width: 991px)" srcSet={ mediumImgPath + 'services/' + service.fields.Image_Name[ 0 ] } />

                                        <source media="(min-width: 992px)" srcSet={ largeImgPath + 'services/' + service.fields.Image_Name[ 0 ] } />

                                        <img style={ { width: '100%', height: 'auto', display: 'block' } } src={ largeImgPath + service.fields.Image_Name[ 0 ] } alt={ service.fields.Image_Description } />
                                    </picture>

                                    <div className="card__body">
                                        <h3 className='card__title'>{ service.fields.Service_Name }</h3>
                                        <p className='card__description'>{ service.fields.Service_Description }</p>
                                    </div>
                                    </div>

                                    

                                </Col>
                            ) )
                        }
                    </Row>

                </Container>
            }

        </Container>




    )
}

export default Services