import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import AdminTitle from '../../../component/Admin/AdminTitle';
import Select from '../../../component/Admin/Select';

import BackToAdmin from '../../../component/Admin/BackToAdmin';
import AdminPostNavigation from './AdminPostNavigation';
import AdminPatchNavigation from './AdminPatchNavigation';

const AdminNavigation = () => {

    const [ selectedOperation, setSelectedOperation ] = useState();

    // the language to post the data
    const [ postLanguage, setPostLanguage ] = useState();

    return (

        <Container fluid className='adminNav'>

            <Row>
                <Col md={ { span: 4, offset: 1 } }>
                    <BackToAdmin />
                </Col>
            </Row>

            <Container fluid="lg" >

                <Row>
                    <Col lg={ { span: 6, offset: 1 } } >
                        <AdminTitle pageName="navigation" />
                    </Col>
                </Row>

                {/* Choose fetch method and language */ }
                <Row>
                    <Col lg={ { span: 11, offset: 1 } }>
                        <Select
                            setSelectedOperation={ setSelectedOperation }
                            setPostLanguage={ setPostLanguage }
                            selectedOperation={ selectedOperation }
                        />
                    </Col>
                </Row>

                <Row>
                    <Col lg={{span: 11, offset: 1}}>
                        <p className='mainText'>Kun opret navigation for de sporg der ikke her en i forvejen!</p>
                    </Col>

                </Row>

                { selectedOperation && postLanguage &&
                    <>

                        { selectedOperation === 'POST' && <AdminPostNavigation setSelectedOperation={ setSelectedOperation } postLanguage={ postLanguage } /> }

                        { selectedOperation === 'PATCH' && <AdminPatchNavigation postLanguage={ postLanguage }
                            setSelectedOperation={ setSelectedOperation } /> }

                        {/* { selectedOperation === 'DELETE' && <AdminDeleteNews /> } */ }

                    </>
                }

            </Container>

        </Container>
    )
}

export default AdminNavigation