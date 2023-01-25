import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { usePatchData } from '../../../hooks/usePatchData';
import axios from 'axios';
import ChosenImage from '../../../component/Admin/ChosenImage';
import ShowImages from '../../../component/Admin/ShowImages';

// For all news on selected language
import UseTranslator from '../../../hooks/UseTranslator';

import { usePatchData } from '../../../hooks/usePatchData';

const AdminPatchNavigation = () => {

    const [ updatedHeaderTitle, setUpdatedHeaderTitle ] = useState( '' );
    const [ updatedHeaderTitle2, setUpdatedHeaderTitle2 ] = useState( '' );
    const [ updatedRooms, setUpdatedRooms ] = useState( '' );
    const [ updatedEvents, setUpdatedEvents ] = useState( '' );
    const [ updatedActivities, setUpdatedActivities ] = useState( '' );
    const [ updatedService, setUpdatedService ] = useState( '' );
    const [ updatedNews, setUpdatedNews ] = useState( '' );
    const [ updatedBookRoom, setUpdatedBookRoom ] = useState( '' );
    const [ updatedSelectLang, setUpdatedSelectLang ] = useState();

    const [ images, setImages ] = useState( [] );
    const [ updatedimageId, setUpdatedImageId ] = useState( '' );

    const [ isImagesVisible, setIsImagesVisible ] = useState( false );
    const [ chosenImage, setChosenImage ] = useState( '' );

    const { error, loading, data, patchData } = usePatchData();
    const { error: errorNavigation, loading: loadingNavigation, filteredData } = UseTranslator( 'Navigation');



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
                        updatedimageId
                    ]
                }
            }

            patchData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/Navigation/' + updatedNavId, newNav, {
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
        <div>AdminPatchNavigation</div>
    )
}

export default AdminPatchNavigation