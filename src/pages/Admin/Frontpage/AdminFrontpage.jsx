import React, { useState, useEffect, useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { useGetData } from '../../../hooks/useGetData';
import AdminTitle from '../../../component/Admin/AdminTitle';

import Select from '../../../component/Admin/Select';

import AdminPostImage from './AdminPostImage';
import AdminPatchImage from './AdminPatchImage';
import AdminDeleteImage from './AdminDeleteImage';


const AdminFrontpage = () => {

    // the language to post
    const [ postLanguage, setPostLanguage ] = useState();

    const [ selectedOperation, setSelectedOperation ] = useState();


    const { error: errorLanguage, loading: loadingLanguage, data: dataLanguage, getData: getDataLanguage } = useGetData();

    useEffect( () => {


        getDataLanguage( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/Language', {
            'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY
        }, {
            "sort[0][field]": "ISO"
        } );


    }, [] );


    return (
        <Container fluid="lg" className='adminFrontpage'>

            { loadingLanguage && <div>Loading..</div> }
            { errorLanguage && <div>Error..</div> }

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
                        dataLanguage={ dataLanguage }
                        selectedOperation={ selectedOperation }
                    />
                </Col>
            </Row>


            {
                selectedOperation && postLanguage &&
                <>
                    {
                        selectedOperation === 'POST' && <AdminPostImage
                            language={ postLanguage }
                        />
                    }
                    {
                        selectedOperation === 'PATCH' && <AdminPatchImage
                            language={ postLanguage }
                        />
                    }

                    {
                        selectedOperation === 'DELETE' && <AdminDeleteImage
                            language={ postLanguage }
                        />
                    }

                </>
            }



        </Container>
    )
}

export default AdminFrontpage