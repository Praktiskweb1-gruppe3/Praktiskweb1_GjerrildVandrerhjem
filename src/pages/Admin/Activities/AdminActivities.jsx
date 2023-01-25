import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import AdminTitle from '../../../component/Admin/AdminTitle';
import PostActivities from './PostActivities';

import Select from '../../../component/Admin/Select';
import AdminPatchActicity from './AdminPatchActicity';
import AdminDeleteActivity from './AdminDeleteActivity';

import BackToAdmin from '../../../component/Admin/BackToAdmin';

const AdminActivities = () => {

    const [ selectedOperation, setSelectedOperation ] = useState();

    // the language to post the data
    const [ postLanguage, setPostLanguage ] = useState();

    return (
        <Container fluid className='adminActivities'>

            <Row>
                <Col md={ { span: 4, offset: 1 } }>
                    <BackToAdmin />
                </Col>
            </Row>

            <Container fluid="lg">

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

                { selectedOperation && postLanguage &&
                    <>

                        { selectedOperation === 'POST' && <PostActivities 
                        postLanguage={ postLanguage }
                        setSelectedOperation={setSelectedOperation}
                         /> }

                        { selectedOperation === 'PATCH' && <AdminPatchActicity 
                        postLanguage={ postLanguage }
                        setSelectedOperation={setSelectedOperation}
                        /> }

                        { selectedOperation === 'DELETE' && <AdminDeleteActivity setSelectedOperation={setSelectedOperation}  /> }

                    </>
                }
            </Container>



        </Container>

    )
}

export default AdminActivities;