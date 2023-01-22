import React, { useState, useContext, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UseTranslator from '../../../hooks/UseTranslator';
import AdminTitle from '../../../component/Admin/AdminTitle';
import PostActivities from './PostActivities';


import { useGetData } from '../../../hooks/useGetData';

import { Context } from '../../../Context/Context';

const AdminActivities = () => {


    const { filteredData, error, loading } = UseTranslator( 'Activities', true );

    const [ selectedOperation, setSelectedOperation ] = useState();

    const [ activitiesLanguage, setActivitiesLanguage ] = useState();

    const { error: errorLanguage, loading: loadingLanguage, data: dataLanguage, getData: getDataLanguage } = useGetData();


    useEffect( () => {
        getDataLanguage( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/Language', {
            'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLEKEY
        }, {
            "sort[0][field]": "ISO"

        } );
    }, [] );

    return (
        <Container fluid="lg" className='adminActivities'>

            { loading && <div>Loading...</div> }
            { error && <div>Der skete en fejl.</div> }

            <Col lg={{span: 6, offset: 1}}>
                <AdminTitle pageName="aktiviteter" />

            </Col>


            <Row className='mb-5'>
                <Col lg={ { span: 3, offset: 1 } } className="px-5">
                    <label htmlFor="selectOperation" className='labels'>Vælg om du vil opret, rette eller slette</label>
                    <select
                        onChange={ ( e ) => setSelectedOperation( e.target.value ) }
                        defaultValue="Vælg"
                        id="selectOperation"
                        className='select'
                    >

                        <option disabled>Vælg</option>
                        <option value="POST">Opret</option>
                        <option value="PATCH">Ret</option>
                        <option value="DELETE">Slet</option>
                    </select>
                </Col>

                <Col lg={ 3 } className="px-5">
                    { dataLanguage &&
                        <>
                            <label htmlFor="language" className='labels'>Vælg hvilken sprog aktiviteten skal oprettes</label>
                            <select
                                id="language"
                                className="select"
                                onChange={ e => setActivitiesLanguage( e.target.value ) }
                                defaultValue="Vælg et sprog"
                            >
                                <option disabled>Vælg et sprog</option>
                                {
                                    dataLanguage.records.map( lang => (

                                        <option key={ lang.id } value={ lang.id } >{ lang.fields.Name }</option>
                                    ) )
                                }
                            </select>

                        </> }

                </Col>

            </Row>

            { filteredData && selectedOperation && activitiesLanguage &&
                <>

                    { selectedOperation === 'POST' && <PostActivities filteredData={ filteredData } language={ activitiesLanguage } /> }


                </>
            }

        </Container>

    )
}

export default AdminActivities;