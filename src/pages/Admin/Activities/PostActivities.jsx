import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

import { usePostData } from '../../../hooks/usePostData';


const PostActivities = ( { filteredData, language } ) => {

    const [ quillInput, setQuillInput ] = useState();
    const [ position, setPosition ] = useState( null )

    const { error, loading, data, postData } = usePostData()

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

        const newActivity = {

            "fields": {
                "Name": "Opplev Djursland",
                "Description": "Gjerrild Vandrehjem ligger mellom skog og strand på toppen av Djursland, og har alle de beste familievennlige aktivitetene innen kjøreavstand.\n",
                "Language": [
                    "recMirybXLVCuQslg"
                ],
                "Latitude": 56.406534359689886,
                "Longitude": 10.926752610159358,
                "Image": [
                    "reccAnaa7h2LX7ZbY"
                ]
            }
        }

        postData( '', newActivity, {
            'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLEKEY,
            'Content-Type': 'application/json'
        } );

        let formData = new FormData( e.target );
        formData.append( "Description", quillInput );
        formData.append( 'Latitude', position[ 0 ] )
        formData.append( 'Longitude', position[ 1 ] );
        // formData.append('Language', )

        console.log( e.target.Image.files[ 0 ].name );



    }


    return (
        <form onSubmit={ handleSubmit }>
            <Row>

                <Col lg={ { span: 6, offset: 1 } }>

                    <Row>

                        <Row className='mb-5'>
                            <Col lg={ 6 }>
                                <label className='labels' htmlFor='activitiesName'>Navn</label>
                                <input
                                    name="Name"
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

                        <Row className='mb-5'>
                            <Col lg={ 6 }>
                                <label className='labels' htmlFor='Image_Text'>Billede tekst</label>
                                <input
                                    name="Image_Text"
                                    className='inputs'
                                    type="text"
                                    placeholder='Bruges ovenpå billedet'
                                    id="Image_Text"
                                />
                            </Col>
                            <Col lg={ 6 }>
                                <label className='labels' htmlFor='Image_Description'>Billedes alt tekst</label>
                                <input
                                    name="Image_Description"
                                    className='inputs'
                                    type="text"
                                    placeholder='Skriv noget tekst der kan bruges som alt tekst'
                                    id="Image_Description"
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

                    </Row>

                </Col>

                <Col lg={ 4 }>
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

                <Col lg={ { span: 4, offset: 3 } }>
                    <button type="submit" className='btn_post'>Opret aktivitet</button>
                </Col>


            </Row>



        </form>

    )
}

export default PostActivities;