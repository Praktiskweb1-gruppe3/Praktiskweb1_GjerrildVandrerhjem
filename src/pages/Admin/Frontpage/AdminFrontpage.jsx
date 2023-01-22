import React, { useState, useEffect, useContext } from 'react';

import { Context } from '../../../Context/Context';


import { Image, Transformation } from 'cloudinary-react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { usePostData } from '../../../hooks/usePostData';
import { useGetData } from '../../../hooks/useGetData';
import AdminTitle from '../../../component/Admin/AdminTitle';

import Select from '../../../component/Admin/Select';

import UseTranslator from '../../../hooks/UseTranslator';
import AdminPostImage from './AdminPostImage';

const AdminFrontpage = () => {

    const { language } = useContext( Context );

    const [ postLanguage, setPostLanguage ] = useState();

    const [ selectedOperation, setSelectedOperation ] = useState();

    const { filteredData, error, loading } = UseTranslator( 'Images' );

    const [ images, setImages ] = useState( [] )

    const { error: errorLanguage, loading: loadingLanguage, data: dataLanguage, getData: getDataLanguage } = useGetData();

    // Use when ever using
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

            { loading && <div>Loading..</div> }
            { error && <div>Error..</div> }

            <Row>
                <Col lg={ { span: 6, offset: 1 } } className="px-5" >
                    <AdminTitle pageName="billeder" />
                </Col>
            </Row>



            {/* Choose fetch method and language */ }
            <Select
                setSelectedOperation={ setSelectedOperation }
                setPostLanguage={ setPostLanguage }
                dataLanguage={ dataLanguage }
            />

            {
                filteredData && selectedOperation && postLanguage &&
                <>
                    {
                        selectedOperation === 'POST' && <AdminPostImage language={ postLanguage } />
                    }

                </>
            }



        </Container>
    )
}

export default AdminFrontpage