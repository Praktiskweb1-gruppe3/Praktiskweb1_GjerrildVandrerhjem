import React, { useEffect, useContext, useState } from 'react'

import UseTranslator from '../hooks/UseTranslator';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import '../sass/News.scss';

import { useGetData } from '../hooks/useGetData';

import { useNavigate } from "react-router-dom";

import { ImagePathContext } from '../Context/ImagePathContext';
import { Image } from 'cloudinary-react';


const News = () => {

    const { filteredData, error, loading } = UseTranslator("News", true)
    const { filteredData: filteredDataNewsUI, error: errorNewsUI, loading: loadingNewsUI } = UseTranslator("NewsUI", true)
    const { cloudinaryImagePath } = useContext(ImagePathContext);

    const navigate = useNavigate();
    const GoToArchive = () => navigate('/newsArchive')

    const { error: errorGet, loading: loadingGet, data: dataGet, getData } = useGetData()

    const [filterResult, setFilterResult] = useState("");
    const [search, setSearch] = useState("");

    const searchItems = (searchValue) => {
        setSearch(searchValue)
        if(search !== '') {
            const filterData = filteredDataNewsUI[0].fields.Word.filter((item => {
                return Object.values(item).join('').toLowerCase().includes(search.toLowerCase())
            }))
            setFilterResult(filterData)
        }
        else(
            setFilterResult(dataGet)
        )
    }

    // // Filter?
    // const FilterWords = Sterm => {
    //     console.log(Sterm);

    //     // Hide
    //     Array.from(filteredDataNewsUI[0].fields.Word)
    //         .filter(item => !item.textContext.toLowerCase().includes(Sterm))
    //         .forEach(item => item.add('filtered'));

    //     // Show
    //     Array.from(filteredDataNewsUI[0].fields.Word)
    //         .filter(item => item.textContext.toLowerCase().includes(Sterm))
    //         .forEach(item => item.remove('filtered'))

    // }

    // const Sterm = search.trim().toLowerCase();


    const RunSearch = () => console.log(dataGet)

    useEffect(() => {

        getData("https://api.airtable.com/v0/app0qMLpB7LbMjc7l/NewsUI",
            { "Authorization": "Bearer " + import.meta.env.VITE_AIRTABLE_API_KEY })


    }, [])

    return (

        <Container fluid className='NewsContainer'>

            {/* {error && } */}

            {/* {loading && } */}

            {
                filteredData && <>
                    <h1 className='News_Headline'>{filteredData[0].fields.Title}</h1>

                    <Container className='Userinterface'>
                        <Row>
                            <Col lg={{ span: 12 }}
                                xs={{ span: 12 }}>
                                <form className='UIForm' onSubmit={RunSearch}>
                                    <div>
                                        <label htmlFor='SearchWord'>Søg</label> <br></br>
                                        <input type="search" defaultValue={search} onChange={(e) => searchItems(e.target.value)} placeholder='&#128269; Indtast søgeord' className='SeachInp' id='SearchWord'></input>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} onClick={RunSearch} className='SearchIcon' />
                                    </div>
                                    <div>
                                        <label htmlFor='SelectCategory'>Kategorier</label> <br></br>
                                        <select defaultValue="DEFAULT" placeholder='Vælg en kategori' className='CategoryInp' id='SelectCategory'>
                                            <option value="DEFAULT" disabled>Vælg en kategori</option>
                                            {
                                                dataGet && dataGet.records.map(c =>

                                                    <option value={c.id} key={c.id}>
                                                        {c.fields.CategoryName}
                                                    </option>

                                                )
                                            }
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
                            <Col lg={{ span: 12 }}
                                xs={{ span: 12 }}>
                                <h2 className='HL_ArticleHeader'>{filteredData[1].fields.Title}</h2>
                                <p className='HL_Date'>Dato: {filteredData[1].fields.Date}</p>
                                <p className='HL_Body_Text'>
                                    {filteredData[1].fields.Body_Text}
                                </p>
                                <button className='HL_Btn'>{filteredData[1].fields.Btn}</button>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={{ span: 12 }}
                                xs={{ span: 12 }}>
                                <picture>
                                    <source
                                        media="(max-width: 575px)"
                                        srcSet={cloudinaryImagePath + filteredData[1].fields.ImgId_Mobile[0]}
                                    />

                                    <source
                                        media="(max-width: 991px)"
                                        srcSet={cloudinaryImagePath + filteredData[1].fields.ImgId_Tablet[0]}
                                    />

                                    <source
                                        media="(min-width: 992px)"
                                        srcSet={cloudinaryImagePath + filteredData[1].fields.ImgId_Desktop[0]}
                                    />
                                    <Image
                                        cloudName={import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}
                                        public_id={cloudinaryImagePath + filteredData[1].fields.ImgId_Desktop[0]}
                                        alt={filteredData[1].fields.Image_Description}
                                        className='HL_Image'
                                    />
                                </picture>
                            </Col>
                        </Row>
                    </Container>

                    {/* 3 NEWS IN A ROW */}

                    <Container className='RegularNews'>
                        <Row>
                            {
                                filteredData.slice(2).map(news => (

                                    <Col key={news.id} lg={{ span: 4 }}>
                                        <div className='CARD'>
                                            <picture>
                                                <source
                                                    media="(max-width: 575px)"
                                                    srcSet={cloudinaryImagePath + news.fields.ImgId_Mobile}
                                                />

                                                <source
                                                    media="(max-width: 991px)"
                                                    srcSet={cloudinaryImagePath + news.fields.ImgId_Tablet}
                                                />

                                                <source
                                                    media="(min-width: 992px)"
                                                    srcSet={cloudinaryImagePath + news.fields.ImgId_Desktop}
                                                />
                                                <Image
                                                    cloudName={import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}
                                                    public_id={cloudinaryImagePath + news.fields.ImgId_Desktop}
                                                    alt={news.fields.Image_Description}
                                                    className='CARD_Img'
                                                />
                                            </picture>
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