import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { usePostData } from '../../../hooks/usePostData';
import axios from 'axios';
import ChosenImage from '../../../component/Admin/ChosenImage';
import ShowImages from '../../../component/Admin/ShowImages';
import SubjectDropdown from '../../../component/Admin/SubjectDropdown';

import UseAdminTranslator from '../../../hooks/UseAdminTranslator';

const AdminPostEvents = ( { postLanguage,setSelectedOperation  } ) => {

    const [ title, setTitle ] = useState( '' );
    const [ description, setDescription ] = useState( '' );
    const [ date, setDate ] = useState( '' );
    const [ numOfTickets, setNumOfTickets ] = useState();
    const [ timeOfEvent, setTimeOfEvent ] = useState( '' );
    const [websiteUrl, setWebsiteUrl] = useState('');

    const [ priceId, setPriceId ] = useState();
    const [ organizerId, setOrganizerId ] = useState();
    const [ categoryId, setCategoryId ] = useState();

    const [ images, setImages ] = useState( [] );
    const [ imageId, setImageId ] = useState( '' );

    const [ isImagesVisible, setIsImagesVisible ] = useState( false );
    const [ chosenImage, setChosenImage ] = useState( '' );

    // success/error message
    const [ message, setMessage ] = useState( {} );

    const { error, loading, data, postData } = usePostData();

    const { error: errorPrice, loading: loadingPrice, filteredData: filteredDataPrice } = UseAdminTranslator( 'TicketPrice', true );
    const { error: errorOrganizer, loading: loadingOrganizer, filteredData: filteredDataOrganizer } = UseAdminTranslator( 'Organizer' );
    const { error: errorCategory, loading: loadingCategory, filteredData: filteredDataCategory } = UseAdminTranslator( 'Categories' );


    // load images from airtable, using netlify and cloudinary
    const loadImages = async () => {
        try {

            const res = await axios.get( '/.netlify/functions/getImages' );

            const data = await res.data;

            console.log(data);

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

            const newEvent = {

                "fields": {
                    "Titel": title,
                    "Dato": date,
                    "Description": description,
                    "Tickets": parseInt(numOfTickets),
                    "TimeOfEvent": timeOfEvent,
                    "TicketPrice": [priceId],
                    "Organizer": [organizerId],
                    "WebsiteLink": websiteUrl,
                    "Categories": [categoryId],
                    "Language": [
                        postLanguage.value
                    ],
                    "Images": [
                        imageId
                    ]
                }
            }

            postData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/Events', newEvent, {
                'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY,
                'Content-Type': 'application/json'
            } );


            setMessage( {
                msg: 'Eventet er nu blevet gemt',
                class: 'success'
            } );

            // resetting the inputs

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
                setSelectedOperation('');
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
            { error && errorPrice && errorCategory && errorOrganizer && <div>Error</div> }

            { loading && loadingPrice && loadingCategory && loadingOrganizer && <div>Loading</div> }

            <form onSubmit={ handleSubmit } className="adminPostForm">
                <Row>

                    <Col lg={ { span: 6, offset: 1 } }>

                        <Row>
                            <Row className='mb-5'>
                                <Col lg={ 12 }>
                                    <label className='labels' htmlFor='eventTitle'>Titel</label>
                                    <input
                                        onChange={ ( e ) => setTitle( e.target.value ) }
                                        className='inputs'
                                        type="text"
                                        placeholder='Giv eventet en titel'
                                        id="eventTitle"
                                    />
                                </Col>
                            </Row>

                            <Row className='mb-5'>
                                <Col lg={ 4 }>
                                    <label className='labels' htmlFor='eventDato'>Dato for eventet</label>
                                    <input
                                        onChange={ ( e ) => setDate( e.target.value ) }
                                        className='inputs'
                                        type="date"
                                        id="eventDato"
                                    />
                                </Col>

                                <Col lg={ 4 }>
                                    <label className='labels' htmlFor='eventsTicket'>Billetter</label>
                                    <input
                                        onChange={ ( e ) => setNumOfTickets( e.target.value ) }
                                        className='inputs'
                                        type="number"
                                        placeholder='Antal billetter'
                                        id="eventsTicket"
                                    />
                                </Col>
                                <Col lg={ 4 }>
                                    <label className='labels' htmlFor='eventsTime'>Tidsrum</label>
                                    <input
                                        onChange={ ( e ) => setTimeOfEvent( e.target.value ) }
                                        className='inputs'
                                        type="text"
                                        placeholder='F.eks. 17:30 - 21:00'
                                        id="eventsTime"
                                    />
                                </Col>
                            </Row>

                            <Row className='mb-5'>

                                <Col lg={ 12 }>
                                    <label className='labels' htmlFor='eventsUrl'>Websiteurl</label>
                                    <input
                                        onChange={ ( e ) => setWebsiteUrl( e.target.value ) }
                                        className='inputs'
                                        type="url"
                                        placeholder='Link til website for event'
                                        id="eventsTicket"
                                    />
                                </Col>
                            </Row>

                            <Row className='mb-5'>
                                { filteredDataPrice && <Col lg={ 4 }>
                                    <SubjectDropdown
                                        filteredData={ filteredDataPrice }
                                        filterOption="Price"
                                        selectClass={ '' }
                                        htmlFor="eventPricesSelect"
                                        labelText="Vælg prisen for eventet"
                                        setId={ setPriceId }
                                        selectData="Price"
                                    />

                                </Col> }

                                { filteredDataOrganizer && <Col lg={ 4 }>

                                    <SubjectDropdown
                                        filteredData={ filteredDataOrganizer }
                                        filterOption="Name"
                                        selectClass={ '' }
                                        htmlFor="eventOrganizerSelect"
                                        labelText="Vælg arrangør for eventet"
                                        setId={ setOrganizerId }
                                        selectData="Name"
                                    />

                                </Col> }

                                { filteredDataCategory && <Col lg={ 4 }>

                                    <SubjectDropdown
                                        filteredData={ filteredDataCategory }
                                        filterOption="Events"
                                        selectClass={ '' }
                                        htmlFor="eventCategorySelect"
                                        labelText="Vælg kategori for eventet"
                                        setId={ setCategoryId }
                                        selectData="Category"
                                    />

                                </Col> }

                            </Row>

                            <Row>
                                <Col lg={ 12 }>
                                    <label className='labels' htmlFor='eventDesc'>Beskrivelse af eventet</label>
                                    <ReactQuill
                                        onChange={ ( value ) => setDescription( value ) }
                                        theme="snow"
                                        className='quillInput'
                                        value={ description }
                                        placeholder='Hvad er eventet'
                                        name="eventDesc"
                                        id="eventDesc"
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
                                        disabled={ !imageId || !description || !title || !postLanguage.value || !date || !categoryId || !numOfTickets || !organizerId || !priceId }
                                    >
                                        Opret event
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

export default AdminPostEvents