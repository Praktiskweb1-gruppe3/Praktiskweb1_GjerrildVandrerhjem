import React, { useState, useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

const AdminDeleteImage = ( { language } ) => {

    const [ images, setImages ] = useState( [] )

    const [ id, setId ] = useState();

    const [ file, setFile ] = useState( [] );

    const [ imageDir, setImageDir ] = useState( '' );

    const [ message, setMessage ] = useState( {} );

    const loadImages = async () => {
        try {

            const res = await axios.get( '/.netlify/functions/getImages' );

            const data = await res.data;

            setImages( data.filter( img => img.ISO[ 0 ] === language.ISO ) );


        }
        catch ( error ) {
            console.error( error );
        }
    }

    const submitHandler = async ( e ) => {
        e.preventDefault();

        try {

            await axios.delete( '/.netlify/functions/deleteImages', {
                data: JSON.stringify( {
                    id: id,
                    file: file,
                    imageDir: imageDir
                } )
            } )


            setMessage( {
                msg: 'Dit billede er nu blevet slettet',
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

        loadImages();

    }, [ language ] )

    useEffect( () => {

        return () => {
            document.querySelector( '.languageSelect' ).selectedIndex = 0;
        }

    }, [] )


    return (
        <form onSubmit={ submitHandler }>

            <Row>


                {

                    <Col lg={ 6 }>

                        <Row className='mb-3'>
                            <Col lg={ 12 } >
                                <label htmlFor="selectImageDir" className='labels'>Vil du rette et billede til pc, tablet eller mobil</label>
                                <select
                                    onChange={ ( e ) => setImageDir( e.target.value ) }
                                    defaultValue="Vælg"
                                    id="selectImageDir"
                                    className='select'
                                >

                                    <option disabled>Vælg</option>
                                    <option value="GjerrildVandrerHjem/desktop">Desktop</option>
                                    <option value="GjerrildVandrerHjem/tablet">Tablet</option>
                                    <option value="GjerrildVandrerHjem/mobile">Mobil</option>
                                </select>
                            </Col>
                        </Row>

                    </Col>

                }

                { images && imageDir && <Col lg={ 12 } className="mb-5">
                    <Row className='mt-5'>
                        <p className='mainText'>Vælg et billede slette </p>
                        { images && imageDir.includes( 'desktop' ) && images.map( img => (
                            <Col lg={ 2 } className="mb-3" key={ img.id }>
                                <figure className='imagesFigure'>
                                    <Image
                                        cloudName={ import.meta.env.VITE_CLOUDINARY_CLOUD_NAME }
                                        public_id={ img.ImgId_Desktop }
                                        alt={ img.Description }
                                        data-name={ img.Name }
                                    />

                                    <input
                                        type="radio"
                                        className='radio'
                                        name='images'
                                        onChange={ () => {
                                            setFile( [
                                                img.ImgId_Desktop,
                                                img.ImgId_Tablet,
                                                img.ImgId_Mobile ]
                                            )
                                            setId( img.id )
                                        }
                                        }
                                    />
                                </figure>
                            </Col>

                        ) ) }

                        { images && imageDir.includes( 'tablet' ) && images.map( img => (
                            <Col lg={ 2 } className="mb-3" key={ img.id }>
                                <figure className='imagesFigure'>
                                    <Image
                                        cloudName={ import.meta.env.VITE_CLOUDINARY_CLOUD_NAME }
                                        public_id={ img.ImgId_Tablet }
                                        alt={ img.Description }
                                    />

                                    <input
                                        type="radio"
                                        className='radio'
                                        name='imagesTablet'
                                        onChange={ () => {
                                            setFile( [
                                                img.ImgId_Desktop,
                                                img.ImgId_Tablet,
                                                img.ImgId_Mobile ] )
                                            setId( img.id )
                                        } }
                                    />
                                </figure>
                            </Col>

                        ) ) }

                        { images && imageDir.includes( 'mobile' ) && images.map( img => (
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
                                        name='imagesMobile'
                                        onChange={ () => {
                                            setFile( [
                                                img.ImgId_Desktop,
                                                img.ImgId_Tablet,
                                                img.ImgId_Mobile ] )
                                            setId( img.id )
                                        } }
                                    />
                                </figure>
                            </Col>

                        ) ) }
                    </Row>
                </Col> }

                {
                    id && file &&
                    <>
                        <Row>
                            <Col lg={ { span: 4, offset: 4 } }>
                                <button type="submit" className='btn_post'>Slet billede</button>
                            </Col>
                        </Row>

                        { message &&
                            <Row>
                                <Col lg={ { span: 4, offset: 4 } }>
                                    <div className={ `admin__message ${ message.class }` }>{ message.msg }</div>
                                </Col>
                            </Row>
                        }
                    </>
                }

            </Row>

        </form>
    )
}

export default AdminDeleteImage