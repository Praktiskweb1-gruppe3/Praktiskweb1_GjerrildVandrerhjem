import React, { useState, useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

const AdminPostImage = ( { language } ) => {

    const [ desktopImageUrl, setDesktopImageUrl ] = useState( '' );
    const [ tabletImageUrl, setTabletImageUrl ] = useState( '' );
    const [ mobileImageUrl, setMobileImageUrl ] = useState( '' );

    const [ imageAlt, setImageAlt ] = useState();

    const [ imageText, setImageText ] = useState( '' );

    const [ message, setMessage ] = useState( {} );

    const handleChangeImage = ( e, setImageUrl ) => {
        const file = e.target.files[ 0 ];

        const reader = new FileReader();
        reader.readAsDataURL( file );

        reader.onloadend = () => {
            setImageUrl( reader.result );
        }

        reader.onerror = () => {
            console.error( 'ERROR' )
        }
    }

    const submitHandler = async ( e ) => {
        e.preventDefault();

        try {

            const res = await fetch( '/.netlify/functions/uploadImages', {
                method: "POST",
                body: JSON.stringify( {
                    desktop_file: desktopImageUrl,
                    tablet_file: tabletImageUrl,
                    mobile_file: mobileImageUrl,
                    description: imageAlt,
                    imageText: imageText,
                    language: language.value
                } )
            } )

            const data = await res.json();

            setDesktopImageUrl( '' );
            setTabletImageUrl( '' );
            setMobileImageUrl( '' );
            setImageAlt( '' );
            setImageText( '' );

            setMessage( {
                msg: 'Dit billede er nu blevet gemt',
                class: 'success'
            } );

            e.target.reset();


        }
        catch ( error ) {
            console.error( error );

            setMessage( {
                msg: error.name + ': ' + error.message,
                class: 'failed'
            } );
        }
    }

    useEffect( () => {

        let timeOut;

        if ( Object.keys( message ).length !== 0 ) {

            timeOut = setTimeout( () => {
                setMessage( {} )
            }, 5000 )


        }

        return () => {
            clearTimeout( timeOut );
        }

    }, [ message ] )

    useEffect( () => {
        return () => {
            document.querySelector( '.languageSelect' ).selectedIndex = 0;
        }
    }, [] )


    return (
        <form onSubmit={ submitHandler }>
            <Row>

                <Col lg={ { span: 6 } }>

                    <Row>

                        <Row>

                            <Col lg={ 4 } >
                                <label
                                    className='labels'
                                    htmlFor='image'
                                >
                                    Vælg et billede (desktop)
                                </label>

                                <input
                                    className='inputs imageInput'
                                    type="file"
                                    id="image"
                                    onChange={ ( e ) => handleChangeImage( e, setDesktopImageUrl ) }
                                />
                            </Col>

                            <Col lg={ 4 } >
                                <label
                                    className='labels'
                                    htmlFor='image'
                                >
                                    Vælg et billede (tablet)
                                </label>

                                <input
                                    className='inputs imageInput'
                                    type="file"
                                    id="image"
                                    onChange={ ( e ) => handleChangeImage( e, setTabletImageUrl ) }
                                />
                            </Col>

                            <Col lg={ 4 } >
                                <label
                                    className='labels'
                                    htmlFor='image'
                                >
                                    Vælg et billede (mobil)
                                </label>

                                <input
                                    className='inputs imageInput'
                                    type="file"
                                    id="image"
                                    onChange={ ( e ) => handleChangeImage( e, setMobileImageUrl ) }
                                />
                            </Col>

                        </Row>

                        <Row className='mt-4'>
                            {
                                desktopImageUrl &&
                                <Col lg={ 4 }>
                                    <img src={ desktopImageUrl } alt='Chosen image desktop' className='chosenImage' />


                                </Col>
                            }

                            {
                                tabletImageUrl &&
                                <Col lg={ 4 }>
                                    <img src={ tabletImageUrl } alt='Chosen image tablet' className='chosenImage' />


                                </Col>
                            }

                            {
                                mobileImageUrl &&
                                <Col lg={ 4 }>
                                    <img src={ mobileImageUrl } alt='Chosen image mobile' className='chosenImage' />


                                </Col>
                            }
                        </Row>

                        <Row className='mt-5'>
                            <Col lg={ { span: 12 } } >
                                <label className='labels' htmlFor='imageDesc'>Billedets alt tekst</label>
                                <input
                                    id="imageDesc"
                                    type="text"
                                    onChange={ ( e ) => setImageAlt( e.target.value ) }
                                    className='inputs'
                                    placeholder='Kort beskrivelse af billedet'
                                />
                            </Col>
                        </Row>

                        <Row className='mt-5'>
                            <Col lg={ { span: 12 } } >
                                <label className='labels' htmlFor='imageText'>Billedets tekst (teskt oven på billedet)</label>
                                <input
                                    id=""
                                    type="text"
                                    onChange={ ( e ) => setImageText( e.target.value ) }
                                    className='inputs'
                                    placeholder='Billede tekst'
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={ { span: 4, offset: 4 } }>
                                <button type="submit" className='btn_post' disabled={!desktopImageUrl || !tabletImageUrl || !mobileImageUrl}>Upload billeder</button>
                            </Col>
                        </Row>

                        { message &&
                            <Row>
                                <Col lg={ { span: 4, offset: 4 } }>
                                    <div className={ `admin__message ${ message.class }` }>{ message.msg }</div>
                                </Col>
                            </Row>
                        }

                    </Row>
                </Col>

            </Row>

        </form>

    )
}

export default AdminPostImage;