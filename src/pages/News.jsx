import React from 'react'

import UseTranslator from '../hooks/UseTranslator';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import '../sass/News.scss';

import { useNavigate } from "react-router-dom";

const News = () => {

    const { filteredData, error, loading } = UseTranslator("News", true)
    const { filteredData: filteredDataNewsUI, error: errorNewsUI, loading: loadingNewsUI } = UseTranslator("NewsUI", true)

    const navigate = useNavigate();
    const GoToArchive = () => navigate('/newsArchive')

    return (

        <Container fluid className='NewsContainer'>

            {/* {error && } */}

            {/* {loading && } */}

            {
                filteredData && <>
                    <h1 className='News_Headline'>{filteredData[0].fields.Title}</h1>

                    <Container className='Userinterface'>
                        <Row>
                            <Col>
                                <form className='UIForm'>
                                    <div>
                                        <label htmlFor='SearchWord'>Søg</label> <br></br>
                                        <input type="text" placeholder='Indtast søgeord' className='SeachInp' id='SearchWord' ></input>
                                    </div>
                                    <div>
                                        <label htmlFor='SelectCategory'>Kategorier</label> <br></br>
                                        <select defaultValue="DEFAULT" placeholder='Vælg en kategori' className='CategoryInp' id='SelectCategory'>
                                            <option value="DEFAULT" disabled>Vælg en kategori</option>
                                            <option>Bar</option>
                                            <option>Nærheden</option>
                                            <option>Kommende</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor='BtnArchive'>Arkiv</label> <br></br>
                                        <button onClick={GoToArchive} className='ArchiveBtn' id='BtnArchive'>Se arkivet</button>
                                    </div>
                                </form>
                            </Col>
                        </Row>
                    </Container>

                    {/* ONE HIGHLIGHTED NEWS */}

                    <Container className='HighlightedNews' >
                        <Row className='NewsRow'>
                            <Col lg={{ span: 6 }}>
                                <h2 className='HL_ArticleHeader'>{filteredData[1].fields.Title}</h2>
                                <p className='HL_Date'>Dato: {filteredData[1].fields.Date}</p>
                                <p className='HL_Body_Text'>
                                    {filteredData[1].fields.Body_Text}
                                </p>
                                <button className='HL_Btn'>{filteredData[1].fields.Btn}</button>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={{ span: 6 }}>
                                <div className='HL_Image'>TEST</div>
                                {/* <img src='#' alt='#' className='HL_Image' /> */}
                            </Col>
                        </Row>
                    </Container>

                    {/* 3 NEWS IN A ROW */}

                    <Container className='RegularNews'>
                        <Row>
                            {
                                filteredData.slice(2).map(news => (

                                    <Col lg={{ span: 4 }}>
                                        <div className='CARD'>
                                            <div className='CARD_Img'></div>
                                            <h3 className='CARD_Headline'>{news.fields.Title}</h3>
                                            <p className='CARD_Date'>Dato: {news.fields.Date}</p>
                                            <p className='CARD_Text'>
                                                {news.fields.Body_Text}
                                            </p>
                                            <button className='CARD_Btn'>{news.fields.Btn}</button>
                                        </div>
                                    </Col>

                                ))
                            }
                        </Row>

                    </Container>


                </>

            }

        </Container>

    )
}

export default News