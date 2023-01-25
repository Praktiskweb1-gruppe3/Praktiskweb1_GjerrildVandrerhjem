import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { usePatchData } from '../../../hooks/usePatchData';
import { useGetData } from '../../../hooks/useGetData';
import axios from 'axios';
import ChosenImage from '../../../component/Admin/ChosenImage';
import ShowImages from '../../../component/Admin/ShowImages';
import SubjectDropdown from '../../../component/Admin/SubjectDropdown';

import UseAdminTranslator from '../../../hooks/UseAdminTranslator';

const AdminPatchEvents = ( { postLanguage, setSelectedOperation } ) => {

    const [ updatedTitle, setUpdatedTitle ] = useState( '' );
    const [ updatedDescription, setUpdatedDescription ] = useState( '' );
    const [ updatedDate, setUpdatedDate ] = useState( '' );
    const [ updatedNumOfTickets, setUpdatedNumOfTickets ] = useState();
    const [ updatedTimeOfEvent, setUpdatedTimeOfEvent ] = useState( '' );
    const [ updatedWebsiteUrl, setUpdatedWebsiteUrl ] = useState( '' );
    const [ updatedPriceId, setUpdatedPriceId ] = useState();
    const [ updatedOrganizerId, setUpdatedOrganizerId ] = useState();
    const [ updatedCategoryId, setUpdatedCategoryId ] = useState();
    const [ updatedEventId, setUpdatedEventId ] = useState( '' );

    const [ images, setImages ] = useState( [] );
    const [ updatedImageId, setUpdatedImageId ] = useState( '' );

    const [ isImagesVisible, setIsImagesVisible ] = useState( false );
    const [ chosenImage, setChosenImage ] = useState( '' );
    const [ message, setMessage ] = useState( {} );

    const { error, loading, data, patchData } = usePatchData();
    const { error: errorSelectEvent, loading: loadingSelectEvent, data: dataSelectEvent, getData } = useGetData();

    const { error: errorAllEvents, loading: loadingAllEvents, filteredData } = UseAdminTranslator( 'Events', true, 'Dato' );

    const { error: errorPrice, loading: loadingPrice, filteredData: filteredDataPrice } = UseAdminTranslator( 'TicketPrice', true );

    const { error: errorOrganizer, loading: loadingOrganizer, filteredData: filteredDataOrganizer } = UseAdminTranslator( 'Organizer' );

    const { error: errorCategory, loading: loadingCategory, filteredData: filteredDataCategory } = UseAdminTranslator( 'Categories' );

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

            const updatedEvent = {

                "fields": {
                    "Titel": updatedTitle,
                    "Dato": updatedDate,
                    "Description": updatedDescription,
                    "Tickets": parseInt( updatedNumOfTickets ),
                    "TimeOfEvent": updatedTimeOfEvent,
                    "TicketPrice": [ updatedPriceId ],
                    "Organizer": [ updatedOrganizerId ],
                    "WebsiteLink": updatedWebsiteUrl,
                    "Categories": [ updatedCategoryId ],
                    "Language": [
                        postLanguage.value
                    ],
                    "Images": [
                        updatedImageId
                    ]
                }
            }

            patchData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/Events/' + updatedEventId, updatedEvent, {
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

        if ( updatedEventId ) {
            getData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/Events/' + updatedEventId, {
                'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY
            } )
        }

    }, [ updatedEventId ] )

    useEffect( () => {

        if ( dataSelectEvent ) {

            setUpdatedTitle( dataSelectEvent.fields.Titel );
            setUpdatedDescription( dataSelectEvent.fields.Description );
            setUpdatedDate( dataSelectEvent.fields.Dato );
            setUpdatedNumOfTickets( dataSelectEvent.fields.Tickets );
            setUpdatedTimeOfEvent( dataSelectEvent.fields.TimeOfEvent );
            setUpdatedWebsiteUrl( dataSelectEvent.fields.WebsiteLink );
            setUpdatedPriceId( dataSelectEvent.fields.TicketPrice[ 0 ] )
            setUpdatedOrganizerId( dataSelectEvent.fields.Organizer[ 0 ] );
            setUpdatedCategoryId( dataSelectEvent.fields.Categories[ 0 ] );
            setChosenImage( dataSelectEvent.fields.ImgId_Desktop[ 0 ] );
            setUpdatedImageId( dataSelectEvent.fields.Images[ 0 ] );

        }

    }, [ dataSelectEvent ] )


    return (

        <>
            { loading && loadingAllEvents && loadingSelectEvent && loadingPrice && loadingCategory && loadingOrganizer && <div>Loading...</div> }

            { error && errorAllEvents && errorSelectEvent && errorPrice && errorCategory && errorOrganizer && <div>Error</div> }

            <form onSubmit={ handleSubmit } className="adminPostForm">


                <Row>

                    <Col lg={ { span: 6, offset: 1 } }>

                        { filteredData &&
                            <Row>
                                <Col lg={ { span: 12 } } className="pe-5 mb-5">

                                    <SubjectDropdown
                                        filterOption="Images"
                                        filteredData={ filteredData }
                                        htmlFor="events"
                                        labelText='Vælg et event at rette'
                                        selectClass="eventSelect"
                                        selectData="Titel"
                                        setId={ setUpdatedEventId }
                                    />
                                </Col>

                            </Row>
                        }

                        {
                            dataSelectEvent &&
                            <Row>
                                <Row className='mb-5'>
                                    <Col lg={ 12 }>
                                        <label className='labels' htmlFor='eventTitle'>Titel</label>
                                        <input
                                            onChange={ ( e ) => setUpdatedTitle( e.target.value ) }
                                            className='inputs'
                                            type="text"
                                            defaultValue={ updatedTitle }
                                            id="eventTitle"
                                        />
                                    </Col>
                                </Row>

                                <Row className='mb-5'>
                                    <Col lg={ 4 }>
                                        <label className='labels' htmlFor='eventDato'>Dato for eventet</label>
                                        <input
                                            onChange={ ( e ) => updatedDate( e.target.value ) }
                                            className='inputs'
                                            value={ updatedDate }
                                            type="date"
                                            id="eventDato"
                                        />
                                    </Col>

                                    <Col lg={ 4 }>
                                        <label className='labels' htmlFor='eventsTicket'>Billetter</label>
                                        <input
                                            onChange={ ( e ) => setUpdatedNumOfTickets( e.target.value ) }
                                            className='inputs'
                                            type="number"
                                            defaultValue={ updatedNumOfTickets }
                                            id="eventsTicket"
                                        />
                                    </Col>
                                    <Col lg={ 4 }>
                                        <label className='labels' htmlFor='eventsTime'>Tidsrum</label>
                                        <input
                                            onChange={ ( e ) => setUpdatedTimeOfEvent( e.target.value ) }
                                            className='inputs'
                                            type="text"
                                            defaultValue={ updatedTimeOfEvent }
                                            id="eventsTime"
                                        />
                                    </Col>
                                </Row>

                                <Row className='mb-5'>

                                    <Col lg={ 12 }>
                                        <label className='labels' htmlFor='eventsUrl'>Websiteurl</label>
                                        <input
                                            onChange={ ( e ) => setUpdatedWebsiteUrl( e.target.value ) }
                                            className='inputs'
                                            type="url"
                                            defaultValue={ updatedWebsiteUrl }
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
                                            setId={ setUpdatedPriceId }
                                            selectData="Price"
                                            value={ dataSelectEvent.fields.TicketPrice[ 0 ] }
                                        />

                                    </Col> }

                                    { filteredDataOrganizer && <Col lg={ 4 }>

                                        <SubjectDropdown
                                            filteredData={ filteredDataOrganizer }
                                            filterOption="Name"
                                            selectClass={ '' }
                                            htmlFor="eventOrganizerSelect"
                                            labelText="Vælg arrangør for eventet"
                                            setId={ setUpdatedOrganizerId }
                                            selectData="Name"
                                            value={ dataSelectEvent.fields.Organizer[ 0 ] }
                                        />

                                    </Col> }

                                    { filteredDataCategory && <Col lg={ 4 }>

                                        <SubjectDropdown
                                            filteredData={ filteredDataCategory }
                                            filterOption="Events"
                                            selectClass={ '' }
                                            htmlFor="eventCategorySelect"
                                            labelText="Vælg kategori for eventet"
                                            setId={ setUpdatedCategoryId }
                                            selectData="Category"
                                            value={ dataSelectEvent.fields.Categories[ 0 ] }
                                        />

                                    </Col> }

                                </Row>

                                <Row>
                                    <Col lg={ 12 }>
                                        <label className='labels' htmlFor='eventDesc'>Beskrivelse af eventet</label>
                                        <ReactQuill
                                            onChange={ ( value ) => setUpdatedDescription( value ) }
                                            theme="snow"
                                            className='quillInput'
                                            value={ updatedDescription }
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
                                            disabled={ !updatedImageId || !updatedDescription || !updatedTitle || !postLanguage.value || !updatedDate || !updatedCategoryId || !updatedNumOfTickets || !updatedOrganizerId || !updatedPriceId }
                                        >
                                            Opdater event
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

export default AdminPatchEvents;