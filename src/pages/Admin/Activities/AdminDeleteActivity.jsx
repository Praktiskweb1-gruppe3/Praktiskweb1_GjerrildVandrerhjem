import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UseAdminTranslator from '../../../hooks/UseAdminTranslator';
import { useGetData } from '../../../hooks/useGetData';

import { useDeleteData } from '../../../hooks/useDeleteData';
import SubjectDropdown from '../../../component/Admin/SubjectDropdown';


const AdminDeleteActivity = ({setSelectedOperation}) => {

    const [ id, setId ] = useState();
    const { error, loading, filteredData } = UseAdminTranslator( 'Activities', true );
    const { error: errorActivity, loading: loadingActivity, data: dataActivity, getData } = useGetData();
    const { error: errorDelete, loading: loadingDelete, data: dataDelete, deleteData } = useDeleteData();
    const [ message, setMessage ] = useState( {} );


    const handleDelete = () => {

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
                setSelectedOperation('');
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
                            
                            <SubjectDropdown
                                filterOption="Image"
                                filteredData={filteredData}
                                selectClass="activitiesSelect"
                                htmlFor="activities"
                                labelText="Vælg en aktivitet at slette"
                                setId={setId}
                                selectData='Name'
                            />
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

export default AdminDeleteActivity