import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { usePostData } from '../../../hooks/usePostData';


const AdminFrontpage = () => {

    const [ languageName, setLanguageName ] = useState( '' );
    const [ languageISO, setLanguageISO ] = useState( '' );
    const [ message, setMessage ] = useState( {} );

    const { error, loading, data, postData } = usePostData();

    const handleSubmit = ( e ) => {

        e.preventDefault();

        try {

            const newLanguage = {

                "fields": {
                    "Name": languageName,
                    "ISO": languageISO,
                }
            }

            postData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/Language', newLanguage, {
                'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY,
                'Content-Type': 'application/json'
            } );


            setMessage( {
                msg: 'Sproget er nu blevet gemt',
                class: 'success'
            } );

            e.target.reset();

        }
        catch ( error ) {
            console.log( error.name )
            setMessage( {
                msg: error.name + ': ' + error.message,
                class: 'failed'
            } );
        }
    }


    useEffect( () => {

        let timeOut;

        if ( Object.keys( message ).length !== 0 ) {

            timeOut = setTimeout( () => {
                setMessage( {} )
            }, 5000 )
        }

        return () => {
            clearTimeout( timeOut );
        }

    }, [ message ] )



    return (
        <Container fluid className='adminFrontpage'>
            <Row>

                { error && <div>Error</div> }

                { loading && <div>Loading</div> }

                <Col md={ { span: 4, offset: 4 } }>
                    <h1>Admin</h1>
                    <p className='mainText admin'>Velkommen til admin siden. I denne del af hjemmesiden kan du rette data på hjemmesiden <br />
                        Brug navigationsbaren til at finde den kategori af data du vil rette.
                    </p>
                </Col>

                <Row className='my-5'>
                    <Col lg={ { span: 4, offset: 4 } }>
                        <p className='mainText'>Klik på linket for mere info om ISO (639-1) - <a
                            href='https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes'
                            target="_blank">https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes</a></p>
                    </Col>
                </Row>

                <Row className='mt-5'>
                    <h1>Opret nyt sprog</h1>
                </Row>

                <form onSubmit={ handleSubmit }>
                    <Row className='my-5'>
                        <Col lg={ { span: 4, offset: 4 } }>
                            <label className='labels' htmlFor='langName'>Navn på sprog (på engelsk)</label>
                            <input
                                onChange={ ( e ) => setLanguageName( e.target.value ) }
                                className='inputs'
                                type="text"
                                placeholder='Giv sproget et navn'
                                id="langName"
                                required
                            />
                        </Col>
                    </Row>

                    <Row className='mb-5'>
                        <Col lg={ { span: 4, offset: 4 } }>
                            <label className='labels' htmlFor='langISO'>Sprogets ISO forkortelse (639-1)</label>
                            <input
                                onChange={ ( e ) => setLanguageISO( e.target.value ) }
                                className='inputs'
                                type="text"
                                placeholder='Giv sproget en forkortelse'
                                id="activitiesName"
                                required
                            />
                        </Col>
                    </Row>

                    {/* Submit knap */ }
                    <Row>
                        <Col lg={ { span: 4, offset: 4 } }>
                            <button
                                type="submit"
                                className='btn_post'
                                disabled={ !languageName || !languageISO }
                            >
                                Opret aktivitet
                            </button>
                        </Col>
                    </Row>

                    {/* User message */ }
                    { message &&
                        <Row>
                            <Col lg={ { span: 4, offset: 4 } }>
                                <div
                                    className={ `admin__message ${ message.class }` }
                                >
                                    { message.msg }
                                </div>
                            </Col>
                        </Row>
                    }

                </form>

            </Row>
        </Container>

    )
}

export default AdminFrontpage