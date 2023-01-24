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
import 'yup-phone-lite';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';


const Kontakt = () => {

    const [phoneNumber, setPhoneNumber] = useState()

    const [isVisible, setVisible] = useState(false)
    const [message, setMessage] = useState()

    const { filteredData, error, loading } = UseTranslator("Kontakt");

    const phoneValidation = yup.object().shape({

    })

    const validation = yup.object().shape({
        name: yup
            .string()
            .required('Name must be filled'),

        phoneNumber: yup
            .string()
            .phone("IN", "Please enter a valid phone number")
            .required("A phone number is required"),

        mail: yup
            .string()
            .email('Wrong email format')
            .required('Email must be filled'),

        title: yup
            .string()
            .required('Must be filled')

    });

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validation),
        defaultValues: {
            name: '',
            phoneNumber: '',
            mail: '',
            title: ''
        }
    })


    useEffect(() => {

        document.querySelector('#root').style.backgroundColor = '#FAFAFF';
    }, [])

    useEffect(() => {

        let timeOut;

        if (message) {
            timeOut = setTimeout(() => {
                setVisible(false)
            }, 1000)
        }

    }, [message])



    const onSubmit = (data) => {

        validation.isValid(phoneNumber).then(console.log)

        // try {

        //     console.log(isValid)

        //     if (isValid) {
        //         console.log('SUBMITTED!', phoneNumber)

        //         setMessage({
        //             msg: 'Tak for din besked - din info er nu i systemet',
        //             class: 'success'
        //         });
        //         resetForm();
        //         // setVisible(true);
        //     } else {
        //         console.log('VALIDATION FAILED')
        //     }


        // } catch (error) {
        //     console.log(error)

        //     setMessage({
        //         msg: error.message,
        //         class: 'failed'
        //     })
        //     // setVisible(true);
        // }

        console.log(data);
    };

    const resetForm = () => {
        reset({ name: '', mail: '', emne: '' });
    }

    const onValid = (errors) => {
        console.log(errors)
        setMessage({
            msg: 'Der skete en fejl. Tjek om alle felterne er udfyldt og prøv igen',
            class: 'failed'
        })

    }

    return (
        <Container fluid className='kontakt'>
            {
                filteredData &&
                <form onSubmit={ handleSubmit(onSubmit, onValid) }>
                    <Row>
                        <Col>
                            <h1>{ filteredData[0].fields.Kontakt_Title }</h1>
                            <div className='mainText text'>{ parse(filteredData[0].fields.Kontakt_Description) }</div>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={ { span: 6, offset: 1 } }>

                            <Row>
                                <Col lg={ 6 }>
                                    <label className='mainText'>{ filteredData[0].fields.Navn }</label>
                                    <input type="text" placeholder={ filteredData[0].fields.Navn_Description } className='inputs' id='name' { ...register('name') } />
                                    <FormText className='formText'>{ errors.name?.message }</FormText>
                                </Col>

                                <Col lg={ 6 }>
                                    <label className='mainText'>{ filteredData[0].fields.Telefon }</label>

                                    {/* <input type="text" placeholder={ filteredData[0].fields.Telefon_Description } className='inputs' id='phoneNumber' {...register('phoneNumber')} /> */ }
                                    <PhoneInput
                                        placeholder={ filteredData[0].fields.Telefon_Description }
                                        value={ phoneNumber }
                                        onChange={ setPhoneNumber }
                                    // { ...register('phoneNumber') }
                                    />
                                    <FormText className='formText'>{ errors.phoneNumber?.message }</FormText>
                                </Col>

                                <Col lg={ 6 }>
                                    <label className='mainText'>{ filteredData[0].fields.Mail }</label>
                                    <input type="text" placeholder={ filteredData[0].fields.Mail_Description } className='inputs' id='mail' { ...register('mail') } />
                                    <FormText className='formText'>{ errors.mail?.message }</FormText>
                                </Col>

                                <Col lg={ 6 }>
                                    <label className='mainText'>{ filteredData[0].fields.Emne } </label>
                                    <input type="text" placeholder={ filteredData[0].fields.Emne_Description } className='inputs' id='title' { ...register('title') } />
                                    <FormText className='formText'>{ errors.title?.message }</FormText>
                                </Col>

                                <Col lg={ 12 }>
                                    <label className='mainText title' htmlFor='besked'>{ filteredData[0].fields.Besked }</label>
                                    <textarea type="text" id="besked" placeholder={ filteredData[0].fields.Besked_Description } className='message_input' />


                                    <Col lg={ { span: 6, offset: 3 } }>
                                        <button type="submit" className='send_submit-input mainText'>{ filteredData[0].fields.Send }</button>
                                    </Col>

                                    {
                                        message ? (
                                            <Col lg={ { span: 8, offset: 2 } }>
                                                <div className={ `submit_message  ${message.class}` }>

                                                    { message.msg }
                                                </div>
                                            </Col>
                                        ) : (null)
                                    }

                                </Col>
                            </Row>

                        </Col>

                        <Col lg={ { span: 3, offset: 1 } } className="mt-4">
                            <MapContainer center={ [56.503961730282896, 10.816764100376847] } zoom={ 12 } id="mapContainer__kontakt" >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' />

                                <Marker position={ [56.503961730282896, 10.816764100376847] }>
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