import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UseTranslator from '../../../hooks/UseTranslator';
import AdminTitle from '../../../component/Admin/AdminTitle';
import PostActivities from './PostActivities';

const AdminActivities = () => {


    const { filteredData, error, loading } = UseTranslator( 'Activities', true );

    const [ selectedOperation, setSelectedOperation ] = useState();

    const handleSubmit = ( e ) => {

        e.preventDefault();

    }

    return (
        <Container fluid className='adminActivities'>

            { loading && <div>Loading...</div> }
            { error && <div>Der skete en fejl.</div> }

            <AdminTitle pageName="aktiviteter" />

            <Row>
                <Col lg={2} className="mb-5">
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
            </Row>



            { filteredData && selectedOperation &&
                <form onSubmit={ handleSubmit }>

                    {selectedOperation === 'POST' && <PostActivities filteredData={filteredData} />}


                </form>
            }

        </Container>

    )
}

export default AdminActivities;