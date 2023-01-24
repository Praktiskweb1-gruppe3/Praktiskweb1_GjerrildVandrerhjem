import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UseTranslator from '../../../hooks/UseTranslator';
import { useGetData } from '../../../hooks/useGetData';

import { useDeleteData } from '../../../hooks/useDeleteData';


const AdminDeleteActivity = () => {

    const [ id, setId ] = useState();
    const { error, loading, filteredData } = UseTranslator( 'Activities', true );
    const { error: errorActivity, loading: loadingActivity, data: dataActivity, getData } = useGetData();
    const { error: errorDelete, loading: loadingDelete, data: dataDelete, deleteData } = useDeleteData();
    const [ message, setMessage ] = useState( {} );


    const handleDelete = () => {

        console.log( 'first' )

        if ( window.confirm( `Er du sikker på at du vil slette aktiviteten: ${ dataActivity.fields.Name }` ) ) {

            try {
                deleteData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/Activities/' + id, {
                    'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY
                } );

                setMessage( {
                    msg: 'Aktiviteten er nu blevet slettet',
                    class: 'success'
                } );

            } catch ( error ) {
                setMessage( {
                    msg: error.name + ': ' + error.message,
                    class: 'failed'
                } );
            }

        }
    }


    useEffect( () => {

        if ( id ) {
            getData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/Activities/' + id, {
                'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY
            } )
        }

    }, [ id ] )

    useEffect( () => {
        if ( dataDelete ) {

            document.querySelector( '.activitiesSelect' ).selectedIndex = 0;

        }
    }, [ dataDelete ] )

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

        <>
            { error && errorActivity && errorDelete && <div>Error</div> }
            { loading && loadingActivity && loadingDelete && <div>Loading..</div> }

            { filteredData &&
                <Row>
                    <Row>
                        <Col lg={ { span: 6, offset: 1 } } className="pe-5 mb-5">
                            <label className='labels' htmlFor='activities'>Vælg en aktivitet at rette</label>
                            <select
                                onChange={ ( e ) => setId( e.target.value ) }
                                defaultValue="Vælg"
                                id="selectOperation"
                                className='select activitiesSelect'
                            >
                                <option disabled>Vælg</option>
                                {
                                    filteredData.filter( opt => opt.fields.hasOwnProperty( 'Image' ) ).map( option => (

                                        <option
                                            key={ option.id }
                                            value={ option.id }
                                        >
                                            { option.fields.Name }
                                        </option>

                                    ) )
                                }
                            </select>
                        </Col>

                    </Row>

                    { dataActivity &&
                        <Row>
                            <Col lg={ { span: 6, offset: 1 } }>

                                <button
                                    onClick={ () => handleDelete() }
                                    disabled={ !dataActivity }
                                    className="btn_delete"
                                >
                                    Slet aktivitet
                                </button>



                            </Col>


                        </Row>
                    }
                </Row>
            }


        </>
    )
}

export default AdminDeleteActivity