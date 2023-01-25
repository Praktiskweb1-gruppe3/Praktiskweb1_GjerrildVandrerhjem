import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UseTranslator from '../../../hooks/UseTranslator';
import { useGetData } from '../../../hooks/useGetData';

import { useDeleteData } from '../../../hooks/useDeleteData';
import SubjectDropdown from '../../../component/Admin/SubjectDropdown';

const AdminDeleteEvents = ( { setSelectedOperation } ) => {

    const [ id, setId ] = useState();

    const { error, loading, filteredData } = UseTranslator( 'Events', true, 'Dato' );

    const { error: errorEvents, loading: loadingEvents, data: dataEvents, getData } = useGetData();

    const { error: errorDelete, loading: loadingDelete, data: dataDelete, deleteData } = useDeleteData();

    const [ message, setMessage ] = useState( {} );

    const handleDelete = () => {

        if ( window.confirm( `Er du sikker på at du vil slette eventet: ${ dataEvents.fields.Titel }` ) ) {

            try {
                deleteData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/Events/' + id, {
                    'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY
                } );

                setMessage( {
                    msg: 'Eventet er nu blevet slettet',
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
            getData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/News/' + id, {
                'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY
            } )
        }

    }, [ id ] )

    useEffect( () => {

        let timeOut;

        if ( Object.keys( message ).length !== 0 ) {

            timeOut = setTimeout( () => {
                setMessage( {} )
                setSelectedOperation('');
            }, 5000 )
        }

        return () => {
            clearTimeout( timeOut );
        }

    }, [ message ] )

    return (
        <>
            { error && errorEvents && errorDelete && <div>Error</div> }
            { loading && loadingEvents && loadingDelete && <div>Loading..</div> }

            { filteredData &&
                <Row>
                    <Row>
                        <Col lg={ { span: 6, offset: 1 } } className="pe-5 mb-5">

                            <SubjectDropdown
                                filterOption="Images"
                                filteredData={ filteredData }
                                selectClass="eventSelect"
                                htmlFor="events"
                                labelText="Vælg en event at slette"
                                setId={ setId }
                                selectData='Titel'
                            />
                        </Col>

                    </Row>

                    { dataEvents &&
                        <Row>
                            <Col lg={ { span: 6, offset: 1 } }>

                                <button
                                    onClick={ () => handleDelete() }
                                    disabled={ !dataEvents }
                                    className="btn_delete"
                                >
                                    Slet
                                </button>
                            </Col>

                        </Row>
                    }

                    {/* User message */ }
                    { message &&
                        <Row>
                            <Col lg={ { span: 4, offset: 2 } }>
                                <div
                                    className={ `admin__message ${ message.class }` }
                                >
                                    { message.msg }
                                </div>
                            </Col>
                        </Row>
                    }
                </Row>
            }


        </>
    )
}

export default AdminDeleteEvents