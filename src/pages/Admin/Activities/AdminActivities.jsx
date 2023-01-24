import React, { useState, useEffect, useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import UseTranslator from '../../../hooks/UseTranslator';
import AdminTitle from '../../../component/Admin/AdminTitle';
import PostActivities from './PostActivities';

import { useGetData } from '../../../hooks/useGetData';
import Select from '../../../component/Admin/Select';
import AdminPatchActicity from './AdminPatchActicity';

import { Context } from '../../../Context/Context';
import AdminDeleteActivity from './AdminDeleteActivity';

const AdminActivities = () => {


    const { filteredData, error, loading } = UseTranslator( 'Activities', true );

    const [ selectedOperation, setSelectedOperation ] = useState();

    // the language to post the data
    const [ postLanguage, setPostLanguage ] = useState();

    const { language } = useContext( Context );

    const { error: errorLanguage, loading: loadingLanguage, data: dataLanguage, getData: getDataLanguage } = useGetData();


    useEffect( () => {
        getDataLanguage( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/Language', {
            'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY
        }, {
            "sort[0][field]": "ISO"

        } );
    }, [] );

    return (
        <Container fluid="lg" className='adminActivities'>

            { loading && <div>Loading...</div> }
            { error && <div>Der skete en fejl.</div> }

            <Row>
                <Col lg={ { span: 6, offset: 1 } } >
                    <AdminTitle pageName="aktiviteter" />
                </Col>
            </Row>



            {/* Choose fetch method and language */ }
            <Row>
                <Col lg={ { span: 12, offset: 1 } }>
                    <Select
                        setSelectedOperation={ setSelectedOperation }
                        setPostLanguage={ setPostLanguage }
                        dataLanguage={ dataLanguage }
                        selectedOperation={ selectedOperation }
                    />
                </Col>
            </Row>

            { filteredData && selectedOperation && postLanguage &&
                <>

                    { selectedOperation === 'POST' && <PostActivities postLanguage={ postLanguage } /> }

                    { selectedOperation === 'PATCH' && <AdminPatchActicity  postLanguage={ postLanguage } /> }

                    {selectedOperation === 'DELETE' && <AdminDeleteActivity />}

                </>
            }

        </Container>

    )
}

export default AdminActivities;