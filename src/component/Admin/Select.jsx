import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Select = ({setSelectedOperation, setPostLanguage, dataLanguage}) => {
  return (
    <Row className='mb-5'>
                <Col lg={ { span: 3, offset: 1 } } >
                    <label htmlFor="selectOperation" className='labels'>Vælg om du vil opret, rette eller slette</label>
                    <select
                        onChange={ ( e ) => setSelectedOperation( e.target.value ) }
                        defaultValue="Vælg"
                        id="selectOperation"
                        className='select'
                    >

                        <option disabled>Vælg</option>
                        <option value="POST">Opret</option>
                        <option value="PATCH">Ret</option>
                        <option value="DELETE">Slet</option>
                    </select>
                </Col>

                <Col lg={ 3 } >
                    { dataLanguage &&
                        <>
                            <label htmlFor="language" className='labels'>Vælg hvilken sprog aktiviteten skal oprettes</label>
                            <select
                                id="language"
                                className="select"
                                onChange={ e => setPostLanguage( e.target.value ) }
                                defaultValue="Vælg et sprog"
                            >
                                <option disabled>Vælg et sprog</option>
                                {
                                    dataLanguage.records.map( lang => (

                                        <option key={ lang.id } value={ lang.id } >{ lang.fields.Name }</option>
                                    ) )
                                }
                            </select>

                        </> }

                </Col>

            </Row>
  )
}

export default Select