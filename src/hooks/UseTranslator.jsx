import { useEffect, useContext, useState } from 'react';

import { Context } from '../Context/Context';

import { useGetData } from './useGetData';

const UseTranslator = ( airtableName, sort = false ) => {

    const { error, loading, data, getData } = useGetData();
    const { language } = useContext( Context );
    const [ currentLanguageData, setCurrentLanguageData ] = useState();

    useEffect( () => {

        if ( data ) {
            setCurrentLanguageData( data.records.filter( d => d.fields.ISO[ 0 ] === language ) );
        }

    }, [ data ] )

    useEffect( () => {
        if(sort){
           getData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/' + airtableName, {
                'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLEKEY
            }, {
                "sort[0][field]": "Order"
            }); 
        }
        else{
            getData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/' + airtableName, {
                'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLEKEY
            })
        }
            
       

    }, [ language ] );

    return [ currentLanguageData ];

}

export default UseTranslator;