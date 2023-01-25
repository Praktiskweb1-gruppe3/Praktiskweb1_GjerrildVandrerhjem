import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import UseTranslator from '../../../hooks/UseTranslator';
import BackToAdmin from '../../../component/Admin/BackToAdmin';
import AdminPatchAbout from './AdminPatchAbout';
import { useGetData } from '../../../hooks/useGetData';





const AdminAbout = () => {

    // the language to post the data
    const [ postLanguage, setPostLanguage ] = useState();
    const [ selectedOperation, setSelectedOperation ] = useState( {} );
    const [aboutId, setAboutId] = useState('');

    const { error, loading, filteredData } = UseTranslator( 'About', true );


    const { error: errorLanguage, loading: loadingLanguage, data: dataLanguage, getData: getDataLanguage } = useGetData();


    useEffect( () => {
        getDataLanguage( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/Language', {
            'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY
        }, {
            "sort[0][field]": "ISO"

        } );
    }, [] );

    return (
        <Container fluid className='adminAbout'>

            { loading && loadingLanguage && <div>Loading... </div> }
            { error && errorLanguage && <div>Loading... </div> }

            <Row>
                <Col md={ { span: 2, offset: 1 } }>
                    <BackToAdmin />
                </Col>
            </Row>

            <Container fluid="lg" >


                <Row>
                    <Col lg={ { span: 6, offset: 1 } } >
                        <h1 className='adminHeading'>Ret i Om os</h1>
                    </Col>
                </Row>

                {/* Choose fetch method and language */ }
                <Row>

                    { filteredData &&
                        <Col lg={ { span: 3, offset: 1 } }  >
                            <label htmlFor="selectOperation" className='labels'>Hvilken afsnit vil du rette</label>
                            <select
                                onChange={ ( e ) => {
                                    const option = e.target.querySelectorAll( 'option' )[ e.target.selectedIndex ];
                                    const operation = option.getAttribute( 'data-index' );
                                    setSelectedOperation(  operation )
                                    setAboutId(e.target.value)
                                } }
                                defaultValue="Vælg"
                                id="selectOperation"
                                className='select aboutSelect'
                            >

                                <option disabled>Vælg</option>

                                {
                                    filteredData.map( (opt, i) => (
                                        <option 
                                        key={ opt.id } 
                                        value={ opt.id }
                                        data-index={'about' + (i + 1)}
                                        >{ opt.fields.Titel }</option>
                                    ) )
                                }
                            </select>
                        </Col> }

                    <Col lg={ 3 } className="pe-5" >
                        { dataLanguage &&
                            <>
                                <label htmlFor="language" className='labels'>Vælg for hvilket sprog du vil tilgå dataen</label>
                                <select
                                    id="language"
                                    className="select languageSelect"
                                    onChange={ e => {

                                        const option = e.target.querySelectorAll( 'option' )[ e.target.selectedIndex ];
                                        const iso = option.getAttribute( 'data-index' );

                                        setPostLanguage( {
                                            value: e.target.value,
                                            ISO: iso
                                        } );
                                    } }
                                    defaultValue="Vælg et sprog"
                                >
                                    <option disabled>Vælg et sprog</option>
                                    {
                                        dataLanguage.records.map( lang => (

                                            <option
                                                key={ lang.id }
                                                data-index={ lang.fields.ISO }
                                                value={ lang.id }

                                            >{ lang.fields.Name }
                                            </option>
                                        ) )
                                    }
                                </select>

                            </> }
                    </Col>
                </Row>

                {
                    postLanguage && selectedOperation &&

                    <>
                        { selectedOperation === 'about1' && <AdminPatchAbout
                            postLanguage={ postLanguage }
                            setSelectedOperation={setSelectedOperation}
                            aboutId={ aboutId }
                            setAboutId={setAboutId}
                            hasSubtitle={false}
                        /> }
                        { selectedOperation === 'about2' && <AdminPatchAbout
                            postLanguage={ postLanguage }
                            setSelectedOperation={setSelectedOperation}
                            aboutId={ aboutId }
                            setAboutId={setAboutId}
                            hasSubtitle={true}
                        /> }
                    </>
                }



            </Container>

        </Container>
    )
}

export default AdminAbout