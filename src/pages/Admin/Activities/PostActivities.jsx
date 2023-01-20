import React, {useState} from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PostActivities = ( { filteredData } ) => {

    const [ quillInput, setQuillInput ] = useState();

    return (
        <>
            <Row>
                <Col lg={ 2 }>
                    <label className='labels' htmlFor='activitiesName'>Giv aktiviteten et navn</label>
                    <input
                        name="Name"
                        className='inputs'
                        type="text"
                        placeholder='Giv et navn'
                        id="activitiesName"
                    />
                </Col>

                <Col lg={ 2 }>
                    <label className='labels' htmlFor='activitiesImage'>Giv aktiviteten et billede</label>
                    <input
                        name="Image"
                        className='inputs'
                        type="file"
                        placeholder='Giv et navn'
                        id="activitiesName"
                    />
                </Col>
            </Row>

            <Row className='mt-5'>
                <Col lg={ 4 }>
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
        </>

    )
}

export default PostActivities;