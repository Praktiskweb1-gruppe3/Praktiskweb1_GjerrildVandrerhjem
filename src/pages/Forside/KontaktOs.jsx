import '../../sass/Forside/KontaktOs.scss';

import React, { useEffect, useState } from 'react';

import UseTranslator from '../../hooks/UseTranslator';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FormText from 'react-bootstrap/FormText';

import parse from 'html-react-parser';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import 'yup-phone-lite';

const KontaktOs = () => {

    // const [isVisible, setVisible] = useState(false)
    // const [message, setMessage] = useState()

    const { filteredData, error, loading } = UseTranslator("Kontakt");

    const validation = yup.object().shape({
        name: yup
            .string()
            .required('Name must be filled'),

        mail: yup
            .string()
            .email('Wrong email format')
            .required('Email must be filled'),

    });

    const { register, handleSubmit, control, formState: { errors }, } = useForm({ resolver: yupResolver(validation) });

    const onSubmit = (data) => console.log(data);

    // const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    //     resolver: yupResolver(validation),
    //     defaultValues: {
    //         name: '',
    //         mail: ''

    //     }
    // })

    useEffect(() => {

        document.querySelector('#root').style.backgroundColor = '#FAFAFF';
    }, [])

    // useEffect(() => {

    //     let timeOut;

    //     if (message) {
    //         timeOut = setTimeout(() => {
    //             setVisible(false)
    //         }, 1000)
    //     }

    // }, [message])

    return (
        <Container className='kontakt-os'>

            { error && <div>Error</div> }
            { loading && <div>Loading</div> }

            {
                filteredData && <>
                    <form onSubmit={ handleSubmit(onSubmit) } >
                        <Row>
                            <Col >
                                <h1 className='title_forside'>{ filteredData[0].fields.Kontakt_Title }</h1>
                                <div className='mainText text'>{ parse(filteredData[0].fields.Kontakt_DescriptionInfo) }</div>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={ { span: 6, offset: 3 } }>

                                <Row>
                                    <Col lg={ { span: 10, offset: 1 } }>
                                        <label className='mainText title'>{ filteredData[0].fields.Navn }</label>
                                        <input type="text" placeholder={ filteredData[0].fields.Navn_Description } className='inputs' id='name' { ...register('name') } />
                                        <FormText className='formText'>{ errors.name?.name }</FormText>

                                        <label className='mainText title'>{ filteredData[0].fields.Mail }</label>
                                        <input type="text" placeholder={ filteredData[0].fields.Mail_Description } className='inputs' id='mail' { ...register('mail') } />
                                        <FormText className='formText'>{ errors.mail?.mail }</FormText>

                                        <label className='mainText title' htmlFor='besked'>{ filteredData[0].fields.Besked }</label>
                                        <textarea type="text" id="besked" placeholder={ filteredData[0].fields.Besked_Description } className='message_input' />



                                        <button type="submit" className='send_submit-input mainText'>{ filteredData[0].fields.Send }</button>


                                        {/* {
                                            message ? (
                                                <Col lg={ { span: 8, offset: 2 } }>
                                                    <div className={ `submit_message  ${message.class}` }>

                                                        { message.msg }
                                                    </div>
                                                </Col>
                                            ) : (null)
                                        } */}

                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                    </form>
                </>
            }
        </Container>
    )
}

export default KontaktOs;