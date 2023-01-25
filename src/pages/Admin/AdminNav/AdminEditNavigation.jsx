import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { usePatchData } from '../../../hooks/usePatchData';
import { useDeleteData } from '../../../hooks/useDeleteData';
import { useGetData } from '../../../hooks/useGetData';
import axios from 'axios';
import ChosenImage from '../../../component/Admin/ChosenImage';
import ShowImages from '../../../component/Admin/ShowImages';

import UseAdminTranslator from '../../../hooks/UseAdminTranslator';

const AdminEditNavigation = ( { postLanguage, setSelectedOperation } ) => {

    const [ updatedHeaderTitle, setUpdatedHeaderTitle ] = useState( '' );
    const [ updatedHeaderTitle2, setUpdatedHeaderTitle2 ] = useState( '' );
    const [ updatedRooms, setUpdatedRooms ] = useState( '' );
    const [ updatedEvents, setUpdatedEvents ] = useState( '' );
    const [ updatedActivities, setUpdatedActivities ] = useState( '' );
    const [ updatedService, setUpdatedService ] = useState( '' );
    const [ updatedNews, setUpdatedNews ] = useState( '' );
    const [ updatedBookRoom, setUpdatedBookRoom ] = useState( '' );
    const [ updatedSelectLang, setUpdatedSelectLang ] = useState();
    const [ updatedNavigationId, setUpdatedNavigationId ] = useState( '' );
    const [ images, setImages ] = useState( [] );
    const [ updatedImageId, setUpdatedImageId ] = useState( '' );

    const [ isImagesVisible, setIsImagesVisible ] = useState( false );
    const [ chosenImage, setChosenImage ] = useState( '' );

    const { error: errorPatch, loading: loadingPatch, data: dataPatch, patchData } = usePatchData();
    const { error: errorDelete, loading: loadingDelete, data: dataDelete, deleteData } = useDeleteData();
    const { error: errorNavigation, loading: loadingNavigation, filteredData } = UseAdminTranslator( 'Navigation' );

    const { error, loading, data, getData } = useGetData();


    // success/error message
    const [ message, setMessage ] = useState( {} );

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

    const handleDelete = () => {

        if ( window.confirm( `Er du sikker på at du vil slette navigation på: ${ filteredData[ 0 ].fields.Language_Name[ 0 ] }` ) ) {

            try {
                deleteData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/Navigation/' + updatedNavigationId, {
                    'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY
                } );

                setMessage( {
                    msg: 'Navigationsinfo er nu blevet slettet',
                    class: 'success'
                } );


            } catch ( error ) {
                setMessage( {
                    msg: error.name + ': ' + error.message,
                    class: 'failed'
                } );
            }

        }
    }

    // onSubmit
    const handleSubmit = ( e ) => {

        e.preventDefault();

        try {

            const newNav = {

                "fields": {
                    "Header_Title": updatedHeaderTitle,
                    "Header_Title2": updatedHeaderTitle2,
                    "Rooms": updatedRooms,
                    "Events": updatedEvents,
                    "Activities": updatedActivities,
                    "Services": updatedService,
                    "News": updatedNews,
                    "BookRoom": updatedBookRoom,
                    "SelectLang": updatedSelectLang,
                    "Language": [
                        postLanguage.value
                    ],
                    "Images": [
                        updatedImageId
                    ]
                }
            }

            patchData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/Navigation/' + updatedNavigationId, newNav, {
                'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY,
                'Content-Type': 'application/json'
            } );


            setMessage( {
                msg: 'Navigations info er nu blevet gemt',
                class: 'success'
            } );


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
                setSelectedOperation( '' );
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

        if ( filteredData && filteredData.length >= 1 ) {
            setUpdatedNavigationId( filteredData[ 0 ].id );
            setUpdatedHeaderTitle( filteredData[ 0 ].fields.Header_Title );
            setUpdatedHeaderTitle2( filteredData[ 0 ].fields.Header_Title2 );
            setUpdatedRooms( filteredData[ 0 ].fields.Rooms );
            setUpdatedEvents( filteredData[ 0 ].fields.Events );
            setUpdatedActivities( filteredData[ 0 ].fields.Activities );
            setUpdatedService( filteredData[ 0 ].fields.Services );
            setUpdatedNews( filteredData[ 0 ].fields.News );
            setUpdatedBookRoom( filteredData[ 0 ].fields.BookRoom );
            setUpdatedSelectLang( filteredData[ 0 ].fields.SelectLang );
            setChosenImage( filteredData[ 0 ].fields.ImgId_Desktop[ 0 ] );
            setUpdatedImageId( filteredData[ 0 ].fields.Images[ 0 ] );
        }

    }, [ filteredData ] )

    return (

        <>
            { error && errorNavigation && errorPatch && errorDelete && <div>Error</div> }

            { loading && loadingNavigation && loadingPatch && loadingDelete && <div>Loading</div> }

            {
                filteredData && filteredData.length >= 1 &&
                <form onSubmit={ handleSubmit } className="adminPostForm">
                    <Row>

                        <Col lg={ { span: 6, offset: 1 } }>

                            <Row>
                                <Row className='mb-5'>
                                    <Col lg={ 12 }>
                                        <label className='labels' htmlFor='navHeaderTitle'>Header titel</label>
                                        <input
                                            onChange={ ( e ) => setUpdatedHeaderTitle( e.target.value ) }
                                            className='inputs'
                                            type="text"
                                            defaultValue={ updatedHeaderTitle }
                                            id="navHeaderTitle"
                                        />
                                    </Col>

                                </Row>

                                <Row className='mb-5'>
                                    <Col lg={ 6 }>
                                        <label className='labels' htmlFor='navHeaderTitle2'>Header titel</label>
                                        <input
                                            onChange={ ( e ) => setUpdatedHeaderTitle2( e.target.value ) }
                                            className='inputs'
                                            type="text"
                                            defaultValue={ updatedHeaderTitle2 }
                                            id="navHeaderTitle2"
                                        />
                                    </Col>
                                    <Col lg={ 6 }>
                                        <label className='labels' htmlFor='navRooms'>Værelser (menu punkt)</label>
                                        <input
                                            onChange={ ( e ) => setUpdatedRooms( e.target.value ) }
                                            className='inputs'
                                            type="text"
                                            defaultValue={ updatedRooms }
                                            id="navRooms"
                                        />
                                    </Col>
                                </Row>

                                <Row className='mb-5'>


                                    <Col lg={ 4 }>
                                        <label className='labels' htmlFor='navEvents'>Events (menu punkt)</label>
                                        <input
                                            onChange={ ( e ) => setUpdatedEvents( e.target.value ) }
                                            className='inputs'
                                            type="text"
                                            defaultValue={ updatedEvents }
                                            id="navEvents"
                                        />
                                    </Col>

                                    <Col lg={ 4 }>
                                        <label className='labels' htmlFor='navActivities'>Aktiviteter (menu punkt)</label>
                                        <input
                                            onChange={ ( e ) => setUpdatedActivities( e.target.value ) }
                                            className='inputs'
                                            type="text"
                                            defaultValue={ updatedActivities }
                                            id="navEvents"
                                        />
                                    </Col>

                                    <Col lg={ 4 }>
                                        <label className='labels' htmlFor='navServices'>Vi tilbyder (menu punkt)</label>
                                        <input
                                            onChange={ ( e ) => setUpdatedService( e.target.value ) }
                                            className='inputs'
                                            type="text"
                                            defaultValue={ updatedService }
                                            id="navServices"
                                        />
                                    </Col>
                                </Row>

                                <Row className='mb-5'>


                                    <Col lg={ 4 }>
                                        <label className='labels' htmlFor='navNews'>Nyheder (menu punkt)</label>
                                        <input
                                            onChange={ ( e ) => setUpdatedNews( e.target.value ) }
                                            className='inputs'
                                            type="text"
                                            defaultValue={ updatedNews }
                                            id="navNews"
                                        />
                                    </Col>

                                    <Col lg={ 4 }>
                                        <label className='labels' htmlFor='navActivities'>Book værelse (knap)</label>
                                        <input
                                            onChange={ ( e ) => setUpdatedBookRoom( e.target.value ) }
                                            className='inputs'
                                            type="text"
                                            defaultValue={ updatedBookRoom }
                                            id="navActivities"
                                        />
                                    </Col>

                                    <Col lg={ 4 }>
                                        <label className='labels' htmlFor='navSelectLang'>Vælg sporg (dropdown)</label>
                                        <input
                                            onChange={ ( e ) => setUpdatedSelectLang( e.target.value ) }
                                            className='inputs'
                                            type="text"
                                            defaultValue={ updatedSelectLang }
                                            id="navSelectLang"
                                        />
                                    </Col>
                                </Row>

                                <Row>

                                    <Col lg={ { span: 4 } } >

                                        <button className='btn_getImages news' onClick={ ( e ) => {
                                            e.preventDefault();
                                            setIsImagesVisible( true )
                                        } }>Vis billederne</button>
                                    </Col>

                                    <Col lg={ { span: 4 } }>
                                        <button
                                            type="submit"
                                            className='btn_post news'
                                            disabled={ !updatedHeaderTitle || !updatedHeaderTitle2 || !updatedRooms || !postLanguage.value || !updatedEvents || !updatedActivities || !updatedService || !updatedNews || !updatedBookRoom || !updatedSelectLang || !updatedImageId }
                                        >
                                            Ret navigationsinfo
                                        </button>
                                    </Col>

                                    <Col lg={ { span: 4 } }>

                                        <button
                                            onClick={ () => handleDelete() }
                                            disabled={ !filteredData }
                                            className="btn_delete"
                                        >
                                            Slet
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
                            <Col lg={ { span: 11, offset: 1 } }>
                                { isImagesVisible &&

                                    <ShowImages
                                        images={ images }
                                        setId={ setUpdatedImageId }
                                        setChosenImage={ setChosenImage }
                                    /> }
                            </Col>

                        </Row>
                    </Row>
                </form> }

            { filteredData && filteredData.length <= 0 &&
                <Row>
                    <Col lg={ { span: 6, offset: 1 } }>
                        <h2>Der kunne desværre ikke findes nogle data.</h2>
                    </Col>
                </Row> }


        </>
    )
}

export default AdminEditNavigation;