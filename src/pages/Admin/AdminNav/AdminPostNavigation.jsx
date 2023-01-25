import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import { usePostData } from '../../../hooks/usePostData';
import axios from 'axios';
import ChosenImage from '../../../component/Admin/ChosenImage';
import ShowImages from '../../../component/Admin/ShowImages';

const AdminPostNavigation = ( { postLanguage, setSelectedOperation } ) => {

    const [ headerTitle, setHeaderTitle ] = useState( '' );
    const [ headerTitle2, setHeaderTitle2 ] = useState( '' );
    const [ rooms, setRooms ] = useState( '' );
    const [ events, setEvents ] = useState( '' );
    const [ activities, setActivities ] = useState( '' );
    const [ service, setService ] = useState( '' );
    const [ news, setNews ] = useState( '' );
    const [ bookRoom, setBookRoom ] = useState( '' );
    const [ selectLang, setSelectLang ] = useState();

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

            const newNav = {

                "fields": {
                    "Header_Title": headerTitle,
                    "Header_Title2": headerTitle2,
                    "Rooms": rooms,
                    "Events": events,
                    "Activities": activities,
                    "Services": service,
                    "News": news,
                    "BookRoom": bookRoom,
                    "SelectLang": selectLang,
                    "Language": [
                        postLanguage.value
                    ],
                    "Images": [
                        imageId
                    ]
                }
            }

            postData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/Navigation', newNav, {
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
                                    <label className='labels' htmlFor='navHeaderTitle'>Header titel</label>
                                    <input
                                        onChange={ ( e ) => setHeaderTitle( e.target.value ) }
                                        className='inputs'
                                        type="text"
                                        placeholder='Øverste titel i header'
                                        id="navHeaderTitle"
                                    />
                                </Col>

                            </Row>

                            <Row className='mb-5'>
                                <Col lg={ 6 }>
                                    <label className='labels' htmlFor='navHeaderTitle2'>Header titel</label>
                                    <input
                                        onChange={ ( e ) => setHeaderTitle2( e.target.value ) }
                                        className='inputs'
                                        type="text"
                                        placeholder='Titel i burger menu'
                                        id="navHeaderTitle2"
                                    />
                                </Col>
                                <Col lg={ 6 }>
                                    <label className='labels' htmlFor='navRooms'>Værelser (menu punkt)</label>
                                    <input
                                        onChange={ ( e ) => setRooms( e.target.value ) }
                                        className='inputs'
                                        type="text"
                                        placeholder='Værelses menu punkt'
                                        id="navRooms"
                                    />
                                </Col>
                            </Row>

                            <Row className='mb-5'>


                                <Col lg={ 4 }>
                                    <label className='labels' htmlFor='navEvents'>Events (menu punkt)</label>
                                    <input
                                        onChange={ ( e ) => setEvents( e.target.value ) }
                                        className='inputs'
                                        type="text"
                                        placeholder='Events menu punkt'
                                        id="navEvents"
                                    />
                                </Col>

                                <Col lg={ 4 }>
                                    <label className='labels' htmlFor='navActivities'>Aktiviteter (menu punkt)</label>
                                    <input
                                        onChange={ ( e ) => setActivities( e.target.value ) }
                                        className='inputs'
                                        type="text"
                                        placeholder='Aktiviteter menu punkt'
                                        id="navEvents"
                                    />
                                </Col>

                                <Col lg={ 4 }>
                                    <label className='labels' htmlFor='navServices'>Vi tilbyder (menu punkt)</label>
                                    <input
                                        onChange={ ( e ) => setService( e.target.value ) }
                                        className='inputs'
                                        type="text"
                                        placeholder='Vi tilbyder menu punkt'
                                        id="navServices"
                                    />
                                </Col>
                            </Row>

                            <Row className='mb-5'>


                                <Col lg={ 4 }>
                                    <label className='labels' htmlFor='navNews'>Nyheder (menu punkt)</label>
                                    <input
                                        onChange={ ( e ) => setNews( e.target.value ) }
                                        className='inputs'
                                        type="text"
                                        placeholder='Nyheder menu punkt'
                                        id="navNews"
                                    />
                                </Col>

                                <Col lg={ 4 }>
                                    <label className='labels' htmlFor='navActivities'>Book værelse (knap)</label>
                                    <input
                                        onChange={ ( e ) => setBookRoom( e.target.value ) }
                                        className='inputs'
                                        type="text"
                                        placeholder='Book værelse (knap)'
                                        id="navActivities"
                                    />
                                </Col>

                                <Col lg={ 4 }>
                                    <label className='labels' htmlFor='navSelectLang'>Vælg sporg (dropdown)</label>
                                    <input
                                        onChange={ ( e ) => setSelectLang( e.target.value ) }
                                        className='inputs'
                                        type="text"
                                        placeholder='Vælg sporg (dropdown)'
                                        id="navSelectLang"
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
                                        disabled={ !imageId || !headerTitle || !headerTitle2 || !postLanguage.value || !rooms || !events || !activities || !service || !news || !bookRoom || !selectLang }
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
                        <Col lg={{span: 11, offset: 1}}>
                            { isImagesVisible &&

                                <ShowImages
                                    images={ images }
                                    setId={ setImageId }
                                    setChosenImage={ setChosenImage }
                                /> }
                        </Col>

                    </Row>
                </Row>
            </form>
        </>

    )
}

export default AdminPostNavigation