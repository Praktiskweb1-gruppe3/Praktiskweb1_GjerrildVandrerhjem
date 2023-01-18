import '../sass/Kontakt.scss';

import React, { useRef, useEffect } from 'react';

import UseTranslator from '../hooks/UseTranslator';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Kontakt = () => {

    const { filteredData, error, loading } = UseTranslator("Kontakt");

    return (
        <Container fluid className='kontakt'>
            {
                filteredData &&
                <form>
                    <Row>

                        <Col>
                            <h1>{ filteredData[0].fields.Kontakt_Title }</h1>
                            <p className='mainText text'>{ filteredData[0].fields.Kontakt_Description }</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={ { span: 6, offset: 1 } }>

                            <Row>
                                <Col lg={ 6 }>

                                    <label className='mainText'>{ filteredData[0].fields.Navn }
                                        <input type="text" placeholder={ filteredData[0].fields.Navn_Description } className='inputs' />
                                    </label>
                                </Col>

                                <Col lg={ 6 }>
                                    <label className='mainText'>{ filteredData[0].fields.Telefon }
                                        <input type="text" placeholder={ filteredData[0].fields.Telefon_Description } className='inputs' />
                                    </label>
                                </Col>

                                <Col lg={ 6 }>
                                    <label className='mainText'>{ filteredData[0].fields.Mail }
                                        <input type="text" placeholder={ filteredData[0].fields.Mail_Description } className='inputs' />
                                    </label>
                                </Col>

                                <Col lg={ 6 }>
                                    <label className='mainText'>{ filteredData[0].fields.Emne }
                                        <input type="text" placeholder={ filteredData[0].fields.Emne_Description } className='inputs' />
                                    </label>
                                </Col>

                                <Col lg={ 12 }>
                                    <label className='mainText title' htmlFor='besked'>{ filteredData[0].fields.Besked }</label>
                                        <textarea type="text" id="besked" placeholder={ filteredData[0].fields.Besked_Description } className='message_input' />
                                    

                                    <Col lg={{span: 6, offset:3}}>
                                        <input type="submit" value={ filteredData[0].fields.Send } className='send_submit-input mainText'></input>
                                    </Col>
                                </Col>
                            </Row>

                        </Col>

                        <Col lg={ { span: 3, offset: 1 } } className="mt-4">
                            <div style={ { backgroundColor: 'blue', height: '100%', width: '100%' } }></div>
                        </Col>

                    </Row>

                    <Row>

                    </Row>
                </form>
            }
        </Container>

    )
}

export default Kontakt