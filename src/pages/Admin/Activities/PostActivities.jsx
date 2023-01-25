import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

import { usePostData } from '../../../hooks/usePostData';

import axios from 'axios';
import ShowImages from '../../../component/Admin/ShowImages';


const PostActivities = ( { postLanguage, setSelectedOperation } ) => {

    const [ description, setDescription ] = useState();
    const [ facts, setFacts ] = useState( '' );
    const [ name, setName ] = useState( '' );

    const [ images, setImages ] = useState( [] );
    const [ id, setId ] = useState( '' );

    const [ position, setPosition ] = useState( null );

    const { error, loading, data, postData } = usePostData();

    const [ message, setMessage ] = useState( {} );

    const GetLatLng = () => {

        const map = useMapEvents( {
            click ( e ) {
                setPosition( [ e.latlng.lat, e.latlng.lng ] );
            }
        } )

        return (
            <>
                {
                    position &&
                    <Marker position={ position }>

                    </Marker>
                }
            </>
        )
    }

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

    const handleSubmit = ( e ) => {

        e.preventDefault();

        try {

            const newActivity = {

                "fields": {
                    "Name": name,
                    "Description": description,
                    "Facts": facts,
                    "Language": [
                        postLanguage.value
                    ],
                    "Latitude": position[ 0 ],
                    "Longitude": position[ 1 ],
                    "Image": [
                        id
                    ]
                }
            }

            postData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/Activities', newActivity, {
                'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY,
                'Content-Type': 'application/json'
            } );


            setMessage( {
                msg: 'Aktiviteten er nu blevet gemt',
                class: 'success'
            } );

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

    useEffect( () => {

        loadImages();

    }, [ postLanguage ] )

    return (

        <>
            { error && <div>Error</div> }

            { loading && <div>Loading</div> }

            <form onSubmit={ handleSubmit } className="adminDeleteForm">
                <Row>

                    <Col lg={ { span: 6, offset: 1 } }>

                        <Row>
                            <Row className='mb-5'>
                                <Col lg={ 12 }>
                                    <label className='labels' htmlFor='activitiesName'>Navn</label>
                                    <input
                                        onChange={ ( e ) => setName( e.target.value ) }
                                        className='inputs'
                                        type="text"
                                        placeholder='Giv aktiviteten et navn'
                                        id="activitiesName"
                                        required
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={ 12 }>
                                    <label className='labels' htmlFor='activitiesDesc'>Kort beskrivelse af aktiviteten</label>
                                    <ReactQuill
                                        onChange={ setDescription }
                                        theme="snow"
                                        className='quillInput'
                                        placeholder='Lav en beskrivelse af aktiviteten'
                                        name="Description"
                                    />
                                </Col>
                            </Row>

                            <Row className='mt-5 mb-5'>
                                <Col lg={ 12 }>
                                    <label className='labels' htmlFor='activitiesDesc'>Korte fakta om aktiviteten</label>
                                    <ReactQuill
                                        onChange={ setFacts }
                                        theme="snow"
                                        className='quillInput'
                                        placeholder='Lav en beskrivelse af aktiviteten'
                                        name="Description"
                                    />
                                </Col>
                            </Row>
                        </Row>

                    </Col>

                    {/* react leaflet */ }
                    <Col lg={ 4 }>

                        <p className='mainText'>Sæt en markør ved aktiviteten</p>
                        <MapContainer
                            center={ [ 56.503961730282896, 10.816764100376847 ] }
                            zoom={ 12 }
                            id="mapContainer__adminactivities"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' />

                             <GetLatLng /> 

                        </MapContainer>
                    </Col>

                    {/* Billeder */ }
                    <Row>
                        <ShowImages
                            images={images}
                            setId={setId}
                        /> 
                    </Row>

                    {/* Submit knap */ }
                    <Row>
                        <Col lg={ { span: 4, offset: 4 } }>
                            <button
                                type="submit"
                                className='btn_post'
                                disabled={ !id || !description || !name || !position || !postLanguage.value || !facts }
                            >
                                Opret aktivitet
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
            </form>
        </>

    )
}

export default PostActivities;