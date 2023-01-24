import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import AdminTitle from '../../../component/Admin/AdminTitle';
import PostActivities from './PostActivities';

import Select from '../../../component/Admin/Select';
import AdminPatchActicity from './AdminPatchActicity';
import AdminDeleteActivity from './AdminDeleteActivity';

const AdminActivities = () => {

    const [ selectedOperation, setSelectedOperation ] = useState();

    // the language to post the data
    const [ postLanguage, setPostLanguage ] = useState();  

    return (
        <Container fluid="lg" className='adminActivities'>

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
                        selectedOperation={ selectedOperation }
                    />
                </Col>
            </Row>

            {   selectedOperation && postLanguage &&
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