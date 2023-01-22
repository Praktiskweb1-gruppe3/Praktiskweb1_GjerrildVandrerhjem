import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import UseTranslator from '../../../hooks/UseTranslator';
import AdminTitle from '../../../component/Admin/AdminTitle';
import PostActivities from './PostActivities';

import { useGetData } from '../../../hooks/useGetData';
import Select from '../../../component/Admin/Select';

const AdminActivities = () => {


    const { filteredData, error, loading } = UseTranslator( 'Activities', true );

    const [ selectedOperation, setSelectedOperation ] = useState();

    const [ postLanguage, setPostLanguage ] = useState();

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
                <Col lg={ { span: 6, offset: 1 } } className="px-5">
                    <AdminTitle pageName="aktiviteter" />
                </Col>
            </Row>



            {/* Choose fetch method and language */ }
            <Select
                setSelectedOperation={ setSelectedOperation }
                setPostLanguage={ setPostLanguage }
                dataLanguage={ dataLanguage }
            />


            { filteredData && selectedOperation && postLanguage &&
                <>

                    { selectedOperation === 'POST' && <PostActivities language={ postLanguage } /> }


                </>
            }

        </Container>

    )
}

export default AdminActivities;