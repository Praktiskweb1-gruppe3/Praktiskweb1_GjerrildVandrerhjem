import React, { useEffect, useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { usePatchData } from '../../../hooks/usePatchData';
import axios from 'axios';
import ChosenImage from '../../../component/Admin/ChosenImage';
import ShowImages from '../../../component/Admin/ShowImages';

// for the selected news
import { useGetData } from '../../../hooks/useGetData';

const AdminPatchAbout = ( { postLanguage, setSelectedOperation, aboutId, setAboutId, hasSubtitle } ) => {

    const [ imageId, setImageId ] = useState( '' );
    const [ title, setTitle ] = useState( '' );
    const [ description, setDescription ] = useState( '' );
    const [ subtitel, setSubtitel ] = useState( '' )

    const [ images, setImages ] = useState( [] );
    const [ message, setMessage ] = useState( {} );
    const [ isImagesVisible, setIsImagesVisible ] = useState( false );
    const [ chosenImage, setChosenImage ] = useState( '' );

    const { error: errorAbout, loading: loadingAbout, data: dataAbout, getData } = useGetData();
    const { error, loading, data, patchData } = usePatchData();



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

            const updatedAbout = {

                "fields": {
                    "Titel": title,
                    "Content": description,
                    "Subtitel": subtitel,
                    "Image": [
                        imageId
                    ],
                    "Language": [
                        postLanguage.value
                    ]
                }
            }

            patchData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/About/' + aboutId, updatedAbout, {
                'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY,
                'Content-Type': 'application/json'
            } );


            setMessage( {
                msg: 'Der er nu blevet gemt',
                class: 'success'
            } );

            // resetting the inputs
            setIsImagesVisible( false );
            setImageId( '' );
            setChosenImage( '' );
            setDescription( '' );
            setTitle( '' );
            setAboutId( '' );
            hasSubtitle ? setSubtitel('') : null;

            e.target.reset();

            document.querySelector( '.aboutSelect' ).selectedIndex = 0;

        }
        catch ( error ) {
            console.log( error.name )
            setMessage( {
                msg: error.name + ': ' + error.message,
                class: 'failed'
            } );
        }
    }

    useEffect( () => {

        getData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/About/' + aboutId, {
            'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY
        } )

    }, [] )


    useEffect( () => {
        loadImages();
    }, [ postLanguage ] )

    useEffect( () => {

        if ( dataAbout ) {

            setChosenImage( dataAbout.fields.ImgId_Desktop[ 0 ] );
            setTitle( dataAbout.fields.Titel );
            setDescription( dataAbout.fields.Content );
            setImageId( dataAbout.fields.Image[ 0 ] );

            hasSubtitle ? setSubtitel(dataAbout.fields.Subtitel) : null;
        }


    }, [ dataAbout ] )

    // the success/error message after submit
    useEffect( () => {

        let timeOut;

        if ( Object.keys( message ).length !== 0 ) {

            timeOut = setTimeout( () => {
                setMessage( {} )
                setSelectedOperation( '' );

            }, 5000 )
        }

        return () => {
            clearTimeout( timeOut );
        }

    }, [ message ] )

    return (
        <form onSubmit={ handleSubmit }>

            { loading && loadingAbout && <div>Loading...</div> }
            { error && errorAbout && <div>Error</div> }

            <Row>
                <Col lg={ { span: 6, offset: 1 } }>
                    { dataAbout &&
                        <Row>
                            <Row className='my-5'>
                                <Col lg={ 12 }>
                                    <label className='labels' htmlFor='aboutTitle'>Overskrift</label>
                                    <input
                                        onChange={ ( e ) => setTitle( e.target.value ) }
                                        className='inputs'
                                        type="text"
                                        defaultValue={ title }
                                        placeholder="Overskrift"
                                        id="aboutTitle"
                                    />
                                </Col>
                            </Row>
                            { hasSubtitle && <Row className='mb-5'>
                                <Col lg={ 12 }>
                                    <label className='labels' htmlFor='aboutTitle'>Underoverskrift</label>
                                    <input
                                        onChange={ ( e ) => setSubtitel( e.target.value ) }
                                        className='inputs'
                                        type="text"
                                        defaultValue={ subtitel }
                                        placeholder="Underoverskrift"
                                        id="aboutTitle"
                                    />
                                </Col>
                            </Row> }

                            <Row className='mb-5'>
                                <Col lg={ 12 }>
                                    <label className='labels' htmlFor='aboutDesc'>Beskrivelse</label>
                                    <ReactQuill
                                        onChange={ ( value ) => setDescription( value ) }
                                        theme="snow"
                                        className='quillInput'
                                        value={ description }
                                        placeholder='Lav en beskrivelse'
                                        name="aboutDesc"
                                        id="aboutDesc"
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={ { span: 4, offset: 2 } } >

                                    <button className='btn_getImages btn_about'
                                        onClick={ ( e ) => {
                                            e.preventDefault();
                                            setIsImagesVisible( true )
                                        } }
                                        disabled={ !images }
                                    >Vis billederne</button>
                                </Col>

                                <Col lg={ { span: 4 } }>
                                    <button
                                        type="submit"
                                        className='btn_post btn_about'
                                        disabled={ !imageId || !title || !postLanguage.value || !description }
                                    >
                                        Opdater
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

                        </Row> }

                </Col>

                {/* Det valgte billede */ }
                <Col lg={ 4 }>

                    <ChosenImage
                        altTag="Chosen image"
                        labelText="Det valgte billede"
                        publicImgId={ chosenImage }
                    />

                </Col>


                {/* Billeder */ }
                <Row>
                    {
                        isImagesVisible &&
                        <ShowImages
                            images={ images }
                            setId={ setImageId }
                            setChosenImage={ setChosenImage }
                        />
                    }
                </Row>

            </Row>

        </form>

    )
}

export default AdminPatchAbout;