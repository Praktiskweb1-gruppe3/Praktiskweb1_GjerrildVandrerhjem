import React, { useEffect, useContext, useState, useRef } from 'react';

import { Context } from '../Context/Context';

import { useGetData } from '../hooks/useGetData';


const ChangeLanguage = ( { currentLanguageData } ) => {

  const { error, loading, data, getData } = useGetData();

  const [ language, setLanguage ] = useContext( Context );

  const [ newLanguageData, setNewLanguageData ] = useState();

  const languageOptions = useRef([]);


  useEffect( () => {
    getData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/LanguageSelect', {
      'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLEKEY
    }, {
      "sort[0][field]": "Code"

    } );
  }, [] );

  useEffect( () => {
    if ( data ) {      

      
      const test = []
      
      data.records.forEach(d => {
        
        test.push({code: d.fields.Code, value: d.fields.Name})
        
        
      })
      
      // KIG VIDERE
      setNewLanguageData(test.filter(d => d.code == currentLanguageData[0].fields.Code))
     
    }

    if(newLanguageData){


      
    }

  }, [ data ] )

  return (
    <>

      {
        newLanguageData &&
        <>
          <label>{ currentLanguageData[ 0 ].fields.SelectLang }</label>
          <select
            onChange={ e => setLanguage( e.target.value ) }
            defaultValue={ 'da' }
          >
            {
              // newLanguageData.value.map( (lang, i) => (

              //   <option key={ lang+ i } >{ lang }</option>
              // ) )
            }
          </select>

        </>
      }
    </>
  )
}

export default ChangeLanguage;