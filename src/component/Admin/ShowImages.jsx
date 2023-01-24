import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Image } from 'cloudinary-react';

const ShowImages = ( { images, setId, setChosenImage } ) => {
    return (

        <>
            {
                images && <Col lg={ 12 } className="my-5">
                    <Row className='mt-5'>
                        <p className='mainText'>Vælg et billede fra databasen (de tilsvarede billede til mobil og tablet bliv valgt automatisk)</p>
                        { images.map( img => (
                            <Col lg={ 2 } className="mb-3" key={ img.id }>
                                <figure className='imagesFigure'>
                                    <Image
                                        cloudName={ import.meta.env.VITE_CLOUDINARY_CLOUD_NAME }
                                        public_id={ img.ImgId_Desktop }
                                        alt={ img.Description }
                                    />

                                    <input
                                        type="radio"
                                        className='radio'
                                        name='images'
                                        onChange={ () => {
                                            setId( img.id )
                                          setChosenImage ? setChosenImage(img.ImgId_Desktop) : null;
                                        }

                                        }
                                    />
                                </figure>
                            </Col>

                        ) ) }
                    </Row>
                </Col>
            }
        </>

    )
}

export default ShowImages