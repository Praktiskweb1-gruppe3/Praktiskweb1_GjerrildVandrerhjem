import React, { useEffect, useContext, useState, useRef } from 'react';

import { Context } from '../Context/Context';

import { useGetData } from '../hooks/useGetData';


const ChangeLanguage = ({currentLanguageData} ) => {

  const { error, loading, data, getData } = useGetData();

  const  { setLanguage}  = useContext( Context );


  useEffect( () => {
    getData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/Language', {
      'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLEKEY
    }, {
      "sort[0][field]": "ISO"

    } );
  }, [] );

  return (
    <>

      {
        data &&
        <>
          <label htmlFor="language">{ currentLanguageData[ 0 ].fields.SelectLang }</label>
          <select
          id="language"
            className="langSelect"
            onChange={ e => setLanguage( e.target.value ) }
            defaultChecked="Danish"
          >
            {
              data.records.map( lang => (

                <option key={ lang.id } value={lang.fields.ISO} >{ lang.fields.Name }</option>
              ) )
            }
          </select>

        </>
      }
    </>
  )
}

export default ChangeLanguage;