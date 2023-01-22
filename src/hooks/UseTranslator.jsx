import { useEffect, useContext, useState } from 'react';

import { Context } from '../Context/Context';

import { useGetData } from './useGetData';

const UseTranslator = ( airtableName, sort = false, sortby = "Order" ) => {

    const { error, loading, data, getData } = useGetData();
    const { language } = useContext( Context );
    const [ filteredData, setFilteredData ] = useState();

    useEffect( () => {

        if ( data ) {
            setFilteredData( data.records.filter( d => d.fields.ISO[ 0 ] === language ) );
        }

    }, [ data ] )

    useEffect( () => {
        if(sort){
           getData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/' + airtableName, {
                'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY
            }, {
                "sort[0][field]": sortby
            }); 
        }
        else{
            getData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/' + airtableName, {
                'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY
            })
        }
            
       

    }, [ language ] );

    return  { filteredData, error, loading} ;

}

export default UseTranslator;