import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { usePostData } from '../../../hooks/usePostData';
import axios from 'axios';
import ChosenImage from '../../../component/Admin/ChosenImage';
import ShowImages from '../../../component/Admin/ShowImages';

const AdminPostNews = ( { postLanguage } ) => {

    const [ title, setTitle ] = useState( '' );
    const [ date, setDate ] = useState( '' );
    const [ bodyText, setBodyText ] = useState( '' );
    const [ readMoreText, setReadMoreText ] = useState( '' )

    const [ images, setImages ] = useState( [] );
    const [ imageId, setImageId ] = useState( '' );

    const [ isImagesVisible, setIsImagesVisible ] = useState( false );
    const [ chosenImage, setChosenImage ] = useState( '' );

    // success/error message
    const [ message, setMessage ] = useState( {} );

    const { error, loading, data, postData } = usePostData();



    // load images from airtable, using netlify and cloudinary
    const loadImages = async () => {
        try {

            const res = await axios.get( '/.netlify/functions/getImages' );

            const data = await res.data;

            setImages( data.filter( img => img.ISO[ 0 ] === postLanguage.ISO ) );

        }
        catch ( error ) {
            console.error( error );
        }
    }

    // onSubmit
    const handleSubmit = ( e ) => {

        e.preventDefault();

        try {

            const newNews = {

                "fields": {
                    "Title": title,
                    "Date": date,
                    "Body_Text": bodyText,
                    "Btn": readMoreText,
                    "Language": [
                        postLanguage.value
                    ],
                    "Images": [
                        imageId
                    ]
                }
            }

            postData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/News', newNews, {
                'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY,
                'Content-Type': 'application/json'
            } );


            setMessage( {
                msg: 'Aktiviteten er nu blevet gemt',
                class: 'success'
            } );

            // resetting the inputs
            setChosenImage( '' );
            setBodyText( '' );
            setIsImagesVisible( false );

            e.target.reset();

        }
        catch ( error ) {
            console.log( error.name )
            setMessage( {
                msg: error.name + ': ' + error.message,
                class: 'failed'
            } );
        }
    }

    // the success/error message after submit
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

    // load images for the currently set language (used for the images alt text)
    useEffect( () => {

        loadImages();

    }, [ postLanguage ] )


    return (

        <>
            { error && <div>Error</div> }

            { loading && <div>Loading</div> }

            <form onSubmit={ handleSubmit } className="adminPostForm">
                <Row>

                    <Col lg={ { span: 6, offset: 1 } }>

                        <Row>
                            <Row className='mb-5'>
                                <Col lg={ 12 }>
                                    <label className='labels' htmlFor='newsTitle'>Titel</label>
                                    <input
                                        onChange={ ( e ) => setTitle( e.target.value ) }
                                        className='inputs'
                                        type="text"
                                        placeholder='Giv nyheden en titel'
                                        id="newsTitle"
                                    />
                                </Col>
                            </Row>

                            <Row className='mb-5'>
                                <Col lg={ 4 }>
                                    <label className='labels' htmlFor='newsDato'>Dato for nyheden</label>
                                    <input
                                        onChange={ ( e ) => setDate( e.target.value ) }
                                        className='inputs'
                                        type="date"
                                        id="newsDato"
                                    />
                                </Col>

                                <Col lg={ 8 }>
                                    <label className='labels' htmlFor='newsDato'>Tekst til læs mere knap</label>
                                    <input
                                        onChange={ ( e ) => setReadMoreText( e.target.value ) }
                                        className='inputs'
                                        type="text"
                                        placeholder='F.eks. Læs mere'
                                        id="newsDato"
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={ 12 }>
                                    <label className='labels' htmlFor='newsContent'>Nyheden</label>
                                    <ReactQuill
                                        onChange={ ( value ) => setBodyText( value ) }
                                        theme="snow"
                                        className='quillInput'
                                        value={ bodyText }
                                        placeholder='Hvad er nyheden'
                                        name="newsContent"
                                        id="newsContent"
                                    />
                                </Col>
                            </Row>


                            <Row>

                                <Col lg={ { span: 4, offset: 2 } } >

                                    <button className='btn_getImages news' onClick={ ( e ) => {
                                        e.preventDefault();
                                        setIsImagesVisible( true )
                                    } }>Vis billederne</button>
                                </Col>

                                <Col lg={ { span: 4 } }>
                                    <button
                                        type="submit"
                                        className='btn_post news'
                                        disabled={ !imageId || !bodyText || !title || !postLanguage.value || !date || !readMoreText }
                                    >
                                        Opret nyhed
                                    </button>
                                </Col>

                            </Row>

                            {/* User message */ }
                            { message &&
                                <Row>
                                    <Col lg={ { span: 4, offset: 4 } }>
                                        <div
                                            className={ `admin__message ${ message.class }` }
                                        >
                                            { message.msg }
                                        </div>
                                    </Col>
                                </Row>
                            }

                        </Row>

                    </Col>

                    {/* Det valgte billede */ }
                    <Col lg={ 4 }>
                        <ChosenImage
                            publicImgId={ chosenImage }
                            altTag="Chosen image"
                            labelText="Det valgte billede"
                        />
                    </Col>

                    {/* Billeder */ }
                    <Row>
                        { isImagesVisible &&

                            <ShowImages
                                images={ images }
                                setId={ setImageId }
                                setChosenImage={ setChosenImage }
                            /> }
                    </Row>
                </Row>
            </form>
        </>


    )
}

export default AdminPostNews