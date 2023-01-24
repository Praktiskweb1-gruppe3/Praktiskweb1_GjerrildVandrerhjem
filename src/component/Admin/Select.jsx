import React, {useContext} from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Context } from '../../Context/Context';


const Select = ( { setSelectedOperation, setPostLanguage, dataLanguage } ) => {

    const {setLanguage} = useContext(Context);

    return (
        <Row className='mb-5'>

            <Col lg={ { span: 3 } }  >
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
                                setLanguage(iso);                                
                            } }
                            defaultValue="Vælg et sprog"
                        >
                            <option disabled>Vælg et sprog</option>
                            {
                                dataLanguage.records.map( lang => (

                                    <option
                                        key={ lang.id }
                                        // value={ selectedOperation === "POST" ? lang.id : lang.fields.ISO }
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
    )
}

export default Select;