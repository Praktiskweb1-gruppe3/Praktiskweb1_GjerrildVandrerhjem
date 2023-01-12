import React, { useState } from 'react';
import axios from 'axios';

export const usePostData = () => {

    // State til håndtering af data, loading, error
    const [ data, setData ] = useState();
    const [ error, setError ] = useState( false );
    const [ loading, setLoading ] = useState( false );

    // Payload er de data som skal oprettes
    const postData = ( url, payload = null, headers = null, params = null ) => {

        setLoading( true );
        //setData() hvis der ikke skal vises gamle data når den er ved at bladre

        axios.post( url, payload, { headers: headers, params: params } )
            .then( response => {
                setData( response.data );
                setError( false );
            } )
            .catch( err => {
                console.log( err )
                setError( true );
                setData();
            } )
            .finally( () => {
                setLoading( false );
            } );
    }

    // Det der retuneres fra hooket 
    return { postData, error, loading, data }
}