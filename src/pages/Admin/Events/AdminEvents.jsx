import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import AdminTitle from '../../../component/Admin/AdminTitle';
import Select from '../../../component/Admin/Select';
import BackToAdmin from '../../../component/Admin/BackToAdmin';
import AdminPostEvents from './AdminPostEvents';



const AdminEvents = () => {

    const [ selectedOperation, setSelectedOperation ] = useState();

    // the language to post the data
    const [ postLanguage, setPostLanguage ] = useState();


    return (
        <Container fluid className='adminEvents'>

            <Row>
                <Col md={ { span: 4, offset: 1 } }>
                    <BackToAdmin />
                </Col>
            </Row>

            <Container fluid="lg" >

                <Row>
                    <Col lg={ { span: 6, offset: 1 } } >
                        <AdminTitle pageName="events" />
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

                         { selectedOperation === 'POST' && <AdminPostEvents postLanguage={ postLanguage } setSelectedOperation={setSelectedOperation} /> }

                       {/* { selectedOperation === 'PATCH' && <AdminPatchNews postLanguage={ postLanguage } /> }

                        { selectedOperation === 'DELETE' && <AdminDeleteNews /> } */}

                    </>
                }

            </Container>

        </Container>
    )
}

export default AdminEvents