import React from 'react'

import UseTranslator from '../hooks/UseTranslator';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import '../sass/NewsArchive.scss';

import { useNavigate } from "react-router-dom";

const NewsArchive = () => {

    const { filteredData, error, loading } = UseTranslator()

    const navigate = useNavigate();
    const ToNews = () => navigate('/news')


    return (
        <Container className='NewsArchiveContainer'>
            <Row>
                <Col>
                    <h1>Nyheder arkiv</h1>

                    <button onClick={ToNews} className='BackBtn'>Tilbage til Nyheder</button>
                </Col>
            </Row>
        </Container>
    )
}

export default NewsArchive