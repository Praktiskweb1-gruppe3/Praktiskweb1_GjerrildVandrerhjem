import React from 'react'

import '../sass/NoMatch.scss';

import UseTranslator from '../hooks/UseTranslator';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useNavigate } from "react-router-dom";


const NoMatch = () => {

    const { filteredData, error, loading } = UseTranslator('NoMatch', true)

    const navigate = useNavigate()
    const toHomepage = () => navigate('/')

    return (
        <Container fluid className='NoMatchContainer'>

            {
                filteredData && <>
                    <Row>
                        <Col lg={{ span: 12 }}>
                            <h1 className='NoMatchTitle'>{filteredData[0].fields.TitleHeader}</h1>
                            <p className='NoMatchText'>{filteredData[0].fields.Description}</p>
                            <button onClick={toHomepage} className='NoMatchBtn'>{filteredData[0].fields.Btn}</button>

                            <div class="fireplace">
                                <div class="blur">
                                    <div class="fireplace__flame_big"></div>
                                </div>
                                <section class="fireplace__log"></section>
                                <section class="fireplace__log"></section>
                                <section class="fireplace__log"></section>
                                <section class="fireplace__log"></section>
                                <section class="fireplace__log"></section>
                                <section class="fireplace__log"></section>
                                <section class="fireplace__log"></section>
                                <main class="fireplace__spark"></main>
                                <main class="fireplace__spark"></main>
                                <main class="fireplace__spark"></main>
                                <main class="fireplace__spark"></main>
                                <div class="blur fix">
                                    <div class="fireplace__flame"></div>
                                </div>
                                <div class="fireplace__light"></div>
                            </div>

                        </Col>
                    </Row>
                </>
            }


        </Container>

    )
}

export default NoMatch