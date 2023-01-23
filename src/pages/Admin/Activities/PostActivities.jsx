import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

import { usePostData } from '../../../hooks/usePostData';

import { useGetData } from '../../../hooks/useGetData';


const PostActivities = ( { language } ) => {

    const [ quillInput, setQuillInput ] = useState();
    const [ name, setName ] = useState()


    const [ position, setPosition ] = useState( null )

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

    const handleSubmit = ( e ) => {

        e.preventDefault();

        try {

            const newActivity = {

                "fields": {
                    "Name": name,
                    "Description": quillInput,
                    "Language": [
                        language
                    ],
                    "Latitude": position[ 0 ],
                    "Longitude": position[ 1 ],
                    "Image": [
                        "reccAnaa7h2LX7ZbY"
                    ]
                }
            }

            postData('https://api.airtable.com/v0/app0qMLpB7LbMjc7l/Activities', newActivity, {
                'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY,
                'Content-Type': 'application/json'
            });


            setMessage( {
                msg: 'Din data er nu blevet gemt',
                class: 'success'
            } );

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

            timeOut = setTimeout(() => {
                setMessage({})
            }, 5000)


        }

    }, [ message ] )

    return (

        <>
            { error && <div>Error</div> }

            { loading && <div>Loading</div> }

            <form onSubmit={ handleSubmit }>
                <Row>

                    <Col lg={ { span: 6, offset: 1 } }>

                        <Row>

                            <Row className='mb-5'>
                                <Col lg={ 6 }>
                                    <label className='labels' htmlFor='activitiesName'>Navn</label>
                                    <input
                                        onChange={ ( e ) => setName( e.target.value ) }
                                        className='inputs'
                                        type="text"
                                        placeholder='Giv aktiviteten et navn'
                                        id="activitiesName"
                                    />
                                </Col>

                                <Col lg={ 6 }>
                                    <label className='labels' htmlFor='activitiesImage'>Billede</label>
                                    <input
                                        name="Image"
                                        className='inputs'
                                        type="file"
                                        placeholder='Giv aktiviteten et navn'
                                        id="activitiesName"
                                    />
                                </Col>

                            </Row>

                            <Row>
                                <Col lg={ 12 }>
                                    <label className='labels' htmlFor='activitiesDesc'>Beskriv aktiviteten</label>
                                    <ReactQuill
                                        onChange={ setQuillInput }
                                        theme="snow"
                                        className='quillInput'
                                        placeholder='Lav en beskrivelse af aktiviteten'
                                        name="Description"
                                    />
                                </Col>

                            </Row>

                            <Row>
                                <Col lg={ { span: 4, offset: 4 } }>
                                    <button type="submit" className='btn_post'>Opret aktivitet</button>
                                </Col>
                            </Row>

                            { message &&
                                <Row>
                                    <Col lg={ { span: 4, offset: 4 } }>
                                        <div className={ `admin__message ${ message.class }` }>{ message.msg }</div>
                                    </Col>
                                </Row>
                            }

                        </Row>

                    </Col>

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

                </Row>
            </form>
        </>

    )
}

export default PostActivities;