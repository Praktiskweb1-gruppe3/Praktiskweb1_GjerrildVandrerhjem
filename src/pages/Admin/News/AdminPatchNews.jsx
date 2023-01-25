import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { usePatchData } from '../../../hooks/usePatchData';
import axios from 'axios';
import ChosenImage from '../../../component/Admin/ChosenImage';
import ShowImages from '../../../component/Admin/ShowImages';

// For all news on selected language
import UseTranslator from '../../../hooks/UseTranslator';

// for the selected news
import { useGetData } from '../../../hooks/useGetData';


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SubjectDropdown from '../../../component/Admin/SubjectDropdown';

const AdminPatchNews = ( { postLanguage } ) => {

    const [ updatedTitle, setUpdatedTitle ] = useState( '' );
    const [ updatedDate, setUpdatedDate ] = useState( '' );
    const [ updatedBodyText, setUpdatedBodyText ] = useState( '' );
    const [ updatedReadMoreText, setUpdatedReadMoreText ] = useState( '' )

    const [ images, setImages ] = useState( [] );
    const [ updatedNewsId, setUpdatedNewsId ] = useState( '' );
    const [ updatedImageId, setUpdatedImageId ] = useState( '' );
    const [ isImagesVisible, setIsImagesVisible ] = useState( false );
    const [ chosenImage, setChosenImage ] = useState( '' );


    // success/error message
    const [ message, setMessage ] = useState( {} );

    const { error, loading, data, patchData } = usePatchData();
    const { error: errorSelectNews, loading: loadingSelectNews, data: dataSelectNews, getData } = useGetData();

    const { error: errorAllNews, loading: loadingAllNews, filteredData } = UseTranslator( 'News', true );


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

            const updatedNews = {

                "fields": {
                    "Title": updatedTitle,
                    "Date": updatedDate,
                    "Body_Text": updatedBodyText,
                    "Btn": updatedReadMoreText,
                    "Language": [
                        postLanguage.value
                    ],
                    "Images": [
                        updatedImageId
                    ]
                }
            }

            patchData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/News/' + updatedNewsId, updatedNews, {
                'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY,
                'Content-Type': 'application/json'
            } );


            setMessage( {
                msg: 'Aktiviteten er nu blevet gemt',
                class: 'success'
            } );

            // resetting the inputs
            setChosenImage( '' );
            setUpdatedBodyText( '' );
            setIsImagesVisible( false );
            setUpdatedDate('');
            setUpdatedTitle('');

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

    useEffect( () => {

        if ( updatedNewsId ) {
            getData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/News/' + updatedNewsId, {
                'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY
            } )
        }

    }, [ updatedNewsId ] )

    useEffect( () => {

        if ( dataSelectNews ) {

            setChosenImage(dataSelectNews.fields.ImgId_Desktop[0]);
            setUpdatedBodyText(dataSelectNews.fields.Body_Text);
            setUpdatedDate(dataSelectNews.fields.Date);
            setUpdatedTitle(dataSelectNews.fields.Title);
            setUpdatedReadMoreText(dataSelectNews.fields.Btn);
            setUpdatedImageId(dataSelectNews.fields.Images[0]);

        }

    }, [ dataSelectNews ] )

    useEffect( () => {
        if ( filteredData ) {

            document.querySelector( '.newsSelect' ).selectedIndex = 0;

            setChosenImage('');
            setUpdatedBodyText('');
            setUpdatedDate('');
            setUpdatedTitle('');
            setUpdatedReadMoreText('');

            setUpdatedImageId('');
            setUpdatedNewsId('');

        }
    }, [ filteredData ] )

    return (
        <>
            { error && errorAllNews && errorSelectNews && <div>Error</div> }

            { loading && loadingAllNews && loadingSelectNews && <div>Loading</div> }

            <form onSubmit={ handleSubmit } className="adminPatchForm">
                <Row>

                    <Col lg={ { span: 6, offset: 1 } }>

                        { filteredData &&
                            <Row>
                                <Col lg={ { span: 12 } } className="pe-5 mb-5">

                                    <SubjectDropdown
                                        filterOption="Images"
                                        filteredData={filteredData}
                                        htmlFor="news"
                                        labelText='Vælg en nyhed at rette'
                                        selectClass="newsSelect"
                                        selectData="Title"
                                        setId={setUpdatedNewsId}                                        
                                    />
                                </Col>

                            </Row>
                        }

                        { dataSelectNews && <Row>
                            <Row className='mb-5'>
                                <Col lg={ 12 }>
                                    <label className='labels' htmlFor='newsTitle'>Titel</label>
                                    <input
                                        onChange={ ( e ) => setUpdatedTitle( e.target.value ) }
                                        className='inputs'
                                        type="text"
                                        defaultValue={updatedTitle}
                                        placeholder="Nyhedens titel"
                                        id="newsTitle"
                                    />
                                </Col>
                            </Row>

                            <Row className='mb-5'>
                                <Col lg={ 4 }>
                                    <label className='labels' htmlFor='newsDato'>Dato for nyheden</label>
                                    <input
                                        onChange={ ( e ) => setUpdatedDate( e.target.value ) }
                                        className='inputs'
                                        type="date"
                                        value={updatedDate}
                                        id="newsDato"
                                    />
                                </Col>

                                <Col lg={ 8 }>
                                    <label className='labels' htmlFor='newsDato'>Tekst til læs mere knap</label>
                                    <input
                                        onChange={ ( e ) => setUpdatedReadMoreText( e.target.value ) }
                                        className='inputs'
                                        type="text"
                                        defaultValue={updatedReadMoreText}
                                        placeholder="F.eks. Læs mere"
                                        id="newsDato"
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={ 12 }>
                                    <label className='labels' htmlFor='newsContent'>Nyheden</label>
                                    <ReactQuill
                                        onChange={ ( value ) => setUpdatedBodyText( value ) }
                                        theme="snow"
                                        className='quillInput'
                                        value={ updatedBodyText }
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
                                        disabled={ !updatedImageId || !updatedBodyText || !updatedTitle || !postLanguage.value || !updatedDate }
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
                                setId={ setUpdatedImageId }
                                setChosenImage={ setChosenImage }
                            />
                        }
                    </Row>
                </Row>
            </form>
        </>
    )
}

export default AdminPatchNews