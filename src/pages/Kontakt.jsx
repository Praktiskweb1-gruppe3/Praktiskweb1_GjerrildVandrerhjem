import '../sass/Kontakt.scss';

import React, { useRef, useEffect } from 'react';

import UseTranslator from '../hooks/UseTranslator';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Kontakt = () => {

    const { filteredData, error, loading } = UseTranslator("Kontakt");

    useEffect( () => {

        document.querySelector( '#root' ).style.backgroundColor = '#FAFAFF';
    }, [] )

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


                                    <Col lg={ { span: 6, offset: 3 } }>
                                        <button type="submit" className='send_submit-input mainText'>{ filteredData[0].fields.Send }</button>
                                    </Col>
                                </Col>
                            </Row>

                        </Col>

                        <Col lg={ { span: 3, offset: 1 } } className="mt-4">
                            <MapContainer center={[56.503961730282896, 10.816764100376847]} zoom={12} id="mapContainer__kontakt" >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' />

                                <Marker position={[56.503961730282896, 10.816764100376847]}>
                                    <Popup>
                                        Gjerrild Vandrerhjem <br /> Dyrehavevej 9 <br />
                                        8500 Grenaa
                                    </Popup>
                                </Marker>
                            </MapContainer>
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