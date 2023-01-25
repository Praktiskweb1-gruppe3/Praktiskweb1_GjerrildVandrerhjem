import React, { useState, useEffect, useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import AdminTitle from '../../../component/Admin/AdminTitle';

import Select from '../../../component/Admin/Select';

import AdminPostImage from './AdminPostImage';
import AdminPatchImage from './AdminPatchImage';
import AdminDeleteImage from './AdminDeleteImage';

import BackToAdmin from '../../../component/Admin/BackToAdmin';


const AdminImages = () => {

    // the language to post
    const [ postLanguage, setPostLanguage ] = useState();

    const [ selectedOperation, setSelectedOperation ] = useState();

    return (
        <Container fluid className='adminImages'>

            <Row>
                <Col md={ { span: 4, offset: 1 } }>
                    <BackToAdmin />
                </Col>
            </Row>


            <Container fluid="lg">
                <Row>
                    <Col lg={ { span: 6, offset: 1 } }  >
                        <AdminTitle pageName="billeder" />
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
                {
                    selectedOperation && postLanguage &&
                    <>
                        {
                            selectedOperation === 'POST' && <AdminPostImage
                            postLanguage={ postLanguage }
                            />
                        }
                        {
                            selectedOperation === 'PATCH' && <AdminPatchImage
                            postLanguage={ postLanguage }
                            />
                        }

                        {
                            selectedOperation === 'DELETE' && <AdminDeleteImage
                            postLanguage={ postLanguage }
                            />
                        }

                    </>
                }

            </Container>

        </Container>
    )
}

export default AdminImages