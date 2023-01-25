import React, { useState, useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

import { Image } from 'cloudinary-react';

import { usePatchData } from '../../../hooks/usePatchData';



const AdminPatchImage = ( { postLanguage } ) => {

    const [ images, setImages ] = useState( [] )

    const [ updatedImageDir, setUpdatedImageDir ] = useState( '' )

    const [ updatedImageAlt, setUpdatedImageAlt ] = useState( '' );

    const [ updatedImageText, setUpdatedImageText ] = useState( '' );

    const [ id, setId ] = useState();

    const [ selectedImage, setSelectedImage ] = useState();

    const { error, loading, data, patchData } = usePatchData();




    const [ message, setMessage ] = useState( {} );


    const loadImages = async () => {
        try {

            const res = await axios.get( '/.netlify/functions/getImages' );
            const data = await res.data;

            const filterImg = await data.filter( img => img.ISO[ 0 ] === postLanguage.ISO )
            setImages( filterImg );

        }
        catch ( error ) {
            console.error( error );
        }
    }
    

    const submitHandler = async ( e ) => {
        e.preventDefault();

        if ( updatedImageAlt === '' ) {
            setUpdatedImageAlt( selectedImage.description );
        }

        if ( updatedImageText === '' ) {
            setUpdatedImageText( selectedImage.imageText );
        }

        try {

            const payload = {
                "fields": {
                    "Description": updatedImageAlt,
                    "Language": [
                        postLanguage.value
                    ]
                }
            }



            patchData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/Images/' + id, payload, {
                'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY,
                'Content-Type': 'application/json'
            } )


            setUpdatedImageAlt( '' );
            setUpdatedImageText( '' );

            setMessage( {
                msg: 'Dit billede er nu blevet opdateret',
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

    }, [ postLanguage ] )


    return (
        <form onSubmit={ submitHandler }>

            <Row>
                <Col lg={ {span: 10, offset: 1} } className="mb-5">
                    <Row>
                        { images &&

                            <>
                                <p className='mainText'>Vælg et billede at redigere</p>
                                { updatedImageDir.includes( 'desktop' ) && images.map( img => (
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
                                                onChange={ ( e ) => {
                                                    setId( img.id );
                                                    setSelectedImage( {
                                                        description: img.Description,
                                                        imageText: img.hasOwnProperty( 'Image_Text' ) ? img.Image_Text : ''
                                                    } )
                                                } }
                                            />
                                        </figure>
                                    </Col>

                                ) ) }
                            </>
                        }

                        { images && updatedImageDir.includes( 'tablet' ) && images.map( img => (
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
                                        onChange={ ( e ) => {
                                            setId( img.id );
                                            setSelectedImage( {
                                                description: img.Description,
                                                imageText: img.hasOwnProperty( 'Image_Text' ) ? img.Image_Text : ''
                                            } )
                                        } }
                                    />
                                </figure>
                            </Col>

                        ) ) }

                        { images && updatedImageDir.includes( 'mobile' ) && images.map( img => (
                            <Col lg={ 2 } className="mb-3" key={ img.id }>
                                <figure className='imagesFigure'>
                                    <Image
                                        cloudName={ import.meta.env.VITE_CLOUDINARY_CLOUD_NAME }
                                        public_id={ img.ImgId_Mobile }
                                        alt={ img.Description }
                                    />

                                    <input
                                        type="radio"
                                        className='radio'
                                        name='imagesMobile'
                                        onChange={ ( e ) => {
                                            setId( img.id );
                                            setSelectedImage( {
                                                description: img.Description,
                                                imageText: img.hasOwnProperty( 'Image_Text' ) ? img.Image_Text : ''
                                            } )
                                        } }
                                    />
                                </figure>
                            </Col>

                        ) ) }
                    </Row>
                </Col>

                {

                    <Col lg={ {span:6, offset: 1} }>

                        <Row className='mb-3'>
                            <Col lg={ 12 } >
                                <label htmlFor="selectImageDir" className='labels'>Vil du rette et billede til pc, tablet eller mobil</label>
                                <select
                                    onChange={ ( e ) => setUpdatedImageDir( e.target.value ) }
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

                        {
                            selectedImage &&
                            <>

                                <Row className='mt-5'>
                                    <Col lg={ { span: 12 } } >
                                        <label className='labels' htmlFor='imageDesc'>Billedets alt tekst</label>
                                        <input
                                            id="imageDesc"
                                            type="text"
                                            onChange={ ( e ) => setUpdatedImageAlt( e.target.value ) }
                                            className='inputs'
                                            defaultValue={ selectedImage.description }
                                        />
                                    </Col>
                                </Row>

                                <Row className='mt-5'>
                                    <Col lg={ { span: 12 } } >
                                        <label className='labels' htmlFor='imageText'>Billedets tekst (teskt oven på billedet)</label>
                                        <input
                                            id=""
                                            type="text"
                                            onChange={ ( e ) => setUpdatedImageText( e.target.value ) }
                                            className='inputs'
                                            defaultValue={ selectedImage.imageText }
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={ { span: 4, offset: 4 } }>
                                        <button type="submit" className='btn_post'>Opdater billede</button>
                                    </Col>
                                </Row>

                                { message &&
                                    <Row>
                                        <Col lg={ { span: 4, offset: 4 } }>
                                            <div className={ `admin__message ${ message.class }` }>{ message.msg }</div>
                                        </Col>
                                    </Row>
                                }
                            </> }


                    </Col>

                }



            </Row>

        </form>

    )
}

export default AdminPatchImage