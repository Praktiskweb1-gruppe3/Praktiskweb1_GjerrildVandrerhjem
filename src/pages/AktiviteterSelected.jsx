import React, { useRef, useEffect } from 'react';

import UseTranslator from '../hooks/UseTranslator';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useNavigate, useLocation } from "react-router-dom";

import '../sass/AktivitetSelected.scss';

// import { cleanUpMap, initMapAllActivites } from '../leaflet';


const AktiviteterSelected = () => {

    const navigate = useNavigate()
    const location = useLocation()

    // Coordinates for Map
    // const coordinates = useRef([])

    const { filteredData, error, loading } = UseTranslator('ActivitySelect', true)

    const largeImgPath = "./assets/images/desktop/";
    const mediumImgPath = "./assets/images/tablet/";
    const smallImgPath = "./assets/images/mobile/";

    // Navigate the user back to Overview of Activities
    const returnOverV = () => navigate('/activities')

    // Navigate user to current selected activity homepage
    const GoToPage = () => navigate('/')


    useEffect(() => {
        if (location.state.data) {
            console.log(location.state.data)
        }
        document.querySelector('#root').style.backgroundColor = '#FAFAFF';
    }, [])

    return (

        <Container fluid='lg' className='aktivSelectContainer xss'>

            {/* {error && } */}

            {/* {loading && } */}


            {
                location.state.data && filteredData &&
                <>
                    <h1 className='HeadlineSelected'>{location.state.data.fields.Image_Text}</h1>
                    <h2>{filteredData[0].fields.Header_Undertitle}</h2>
                    <button onClick={returnOverV} className='BackToOverviewBtn'>{filteredData[0].fields.OverviewBtn}</button>

                    <Container fluid='lg' className='MainContent'>
                        <Row>
                            <Col lg={{ span: 12 }}
                                md={{ span: 6 }}
                                sm={{ span: 4 }}>
                                <figure className='Thumbnail'>
                                    <picture>
                                        <source media="(max-width: 575px)" srcSet={smallImgPath + location.state.data.fields.Image_Name[0]} />
                                        <source media="(max-width: 991px)" srcSet={mediumImgPath + location.state.data.fields.Image_Name[0]} />
                                        <source media="(min-width: 992px)" srcSet={largeImgPath + location.state.data.fields.Image_Name[0]} />

                                        <img src={mediumImgPath + location.state.data.fields.Image_Name[0]} alt={location.state.data.fields.Image_Description} />

                                    </picture>
                                </figure>
                                <section className='Apetizer'>
                                    <p className='ApetizerText'>{location.state.data.fields.Description.slice(0, 1200)}</p>
                                    <button onClick={GoToPage} className='hostWebpageBtn'>{filteredData[0].fields.WebsiteBtn}</button>
                                </section>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={{ span: 12 }}
                                md={{ span: 6 }}
                                sm={{ span: 4 }}>
                                <div className='mapContainer'></div>
                                <section className='Facts'>
                                    <h2>{filteredData[0].fields.Facts}</h2>
                                    <p className='FactsText'>{location.state.data.fields.Description.slice(0, 900)}</p>
                                </section>
                            </Col>
                        </Row>
                    </Container>
                </>
            }
        </Container>

    )
}

export default AktiviteterSelected;