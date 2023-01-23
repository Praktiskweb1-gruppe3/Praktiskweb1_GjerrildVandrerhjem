import React, { useState, useEffect, useContext } from 'react';

import { Context } from '../../../Context/Context';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { usePostData } from '../../../hooks/usePostData';
import { useGetData } from '../../../hooks/useGetData';
import AdminTitle from '../../../component/Admin/AdminTitle';

import Select from '../../../component/Admin/Select';

import AdminPostImage from './AdminPostImage';
import AdminPatchImage from './AdminPatchImage';

const AdminFrontpage = () => {

    const [ postLanguage, setPostLanguage ] = useState();

    const [ selectedOperation, setSelectedOperation ] = useState();

   


    const { error: errorLanguage, loading: loadingLanguage, data: dataLanguage, getData: getDataLanguage } = useGetData();

    // Use when ever using
    // const [ images, setImages ] = useState( [] )
    // const loadImages = async () => {
    //     try {

    //         const res = await fetch( '/.netlify/functions/getImages' )

    //         const data = await res.json();
    //         setImages( data.filter( img => img.ISO[ 0 ] === language ) );

    //         console.log( images );

    //     }
    //     catch ( error ) {
    //         console.error( error );
    //     }
    // }

    // call in useEffect loadImages();



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
                <Col lg={ { span: 6 } }  >
                    <AdminTitle pageName="billeder" />
                </Col>
            </Row>



            {/* Choose fetch method and language */ }
            <Select
                setSelectedOperation={ setSelectedOperation }
                setPostLanguage={ setPostLanguage }
                dataLanguage={ dataLanguage }
                selectedOperation={ selectedOperation }
            />

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

                </>
            }



        </Container>
    )
}

export default AdminFrontpage