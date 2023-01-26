import '../sass/Kontakt.scss';

import React, { useEffect, useState } from 'react';

import UseTranslator from '../hooks/UseTranslator';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FormText from 'react-bootstrap/FormText';

import parse from 'html-react-parser';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import 'yup-phone';


const Kontakt = () => {

    // const [ phoneNumber, setPhoneNumber ] = useState()
    const [ message, setMessage ] = useState( {} )

    const { filteredData, error, loading } = UseTranslator( "Kontakt" );

    const validation = yup.object().shape( {
        name: yup
            .string()
            .required( 'Name must be filled' ),

        phone: yup.string().phone( 'Phone must be a valid phone number.' ).required(),

        mail: yup
            .string()
            .email( 'Wrong email format' )
            .required( 'Email must be filled' ),

        title: yup
            .string()
            .required( 'Must be filled' ),
        besked: yup
            .string()
            .required( 'Besked must be filled' )


    } );

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm( {
        resolver: yupResolver( validation ),
        defaultValues: {
            name: '',
            phone: '',
            mail: '',
            title: ''
        }
    } )

    const resetForm = () => {
        reset( { name: '', phone: '', mail: '', emne: '', besked: '' } );
    }


    const onSubmit = ( data ) => {

        try {
            setMessage( {
                msg: 'Din mail er blevet modtaget',
                class: 'success'
            } )
            console.log( data )
            resetForm();
        }
        catch ( error ) {
            setMessage( {
                msg: error.name + ': ' + error.message,
                class: 'failed'
            } )

        }
    };



    useEffect( () => {

        document.querySelector( '#root' ).style.backgroundColor = '#FAFAFF';
    }, [] )

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
        <Container fluid className='kontakt'>
            {
                filteredData &&
                <form onSubmit={ handleSubmit( onSubmit ) }>
                    <Row>
                        <Col>
                            <h1>{ filteredData[ 0 ].fields.Kontakt_Title }</h1>
                            <div className='mainText text'>{ parse( filteredData[ 0 ].fields.Kontakt_Description ) }</div>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={ { span: 6, offset: 1 } }>

                            <Row>
                                <Col lg={ 6 }>
                                    <label className='mainText'>{ filteredData[ 0 ].fields.Navn }</label>
                                    <input type="text" placeholder={ filteredData[ 0 ].fields.Navn_Description } className='inputs' id='name' { ...register( 'name' ) } />
                                    <FormText className='formText'>{ errors.name?.message }</FormText>
                                </Col>

                                <Col lg={ 6 }>
                                    <label className='mainText' htmlFor='phone'>{ filteredData[ 0 ].fields.Telefon }</label>

                                    {/* <input type="text" placeholder={ filteredData[0].fields.Telefon_Description } className='inputs' id='phoneNumber' {...register('phoneNumber')} /> */ }
                                    <input
                                        type="tel"
                                        name='phone'
                                        id="phone"
                                        className='inputs'
                                        placeholder={ filteredData[ 0 ].fields.Telefon_Description }
                                        { ...register( 'phone' ) }
                                    />
                                    <FormText className='formText'>{ errors.phone?.message }</FormText>
                                </Col>

                                <Col lg={ 6 }>
                                    <label className='mainText'>{ filteredData[ 0 ].fields.Mail }</label>
                                    <input type="text" placeholder={ filteredData[ 0 ].fields.Mail_Description } className='inputs' id='mail' { ...register( 'mail' ) } />
                                    <FormText className='formText'>{ errors.mail?.message }</FormText>
                                </Col>

                                <Col lg={ 6 }>
                                    <label className='mainText'>{ filteredData[ 0 ].fields.Emne } </label>
                                    <input type="text" placeholder={ filteredData[ 0 ].fields.Emne_Description } className='inputs' id='title' { ...register( 'title' ) } />
                                    <FormText className='formText'>{ errors.title?.message }</FormText>
                                </Col>

                                <Col lg={ 12 }>
                                    <label className='mainText title' htmlFor='besked'>{ filteredData[ 0 ].fields.Besked }</label>
                                    <textarea type="text" id="besked" placeholder={ filteredData[ 0 ].fields.Besked_Description } className='message_input'
                                        { ...register( 'besked' ) } />
                                    <FormText className='formText'>{ errors.besked?.message }</FormText>

                                </Col>

                                <Col lg={ { span: 6, offset: 3 } }>
                                    <button type="submit" className='send_submit-input mainText'>{ filteredData[ 0 ].fields.Send }</button>
                                </Col>

                                {
                                    message ? (
                                        <Col lg={ { span: 8, offset: 2 } }>
                                            <div className={ `submit_message  ${ message.class }` }>

                                                { message.msg }
                                            </div>
                                        </Col>
                                    ) : ( null )
                                }


                            </Row>

                        </Col>

                        <Col lg={ { span: 3, offset: 1 } } className="mt-4">
                            <MapContainer center={ [ 56.503961730282896, 10.816764100376847 ] } zoom={ 12 } id="mapContainer__kontakt" >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' />

                                <Marker position={ [ 56.503961730282896, 10.816764100376847 ] }>
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