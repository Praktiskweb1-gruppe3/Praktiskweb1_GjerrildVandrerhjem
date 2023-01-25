import React from 'react'

const SubjectDropdown = ( { filteredData, filterOption, selectClass, htmlFor, labelText, setId, selectData } ) => {
    return (
        <>
            <label className='labels' htmlFor={ htmlFor }>{ labelText }</label>
            <select
                onChange={ ( e ) => setId( e.target.value ) }
                defaultValue="Vælg"
                id={ htmlFor }
                className={ `select ${ selectClass }` }
            >
                <option disabled>Vælg</option>
                {
                    filteredData.filter( opt => opt.fields.hasOwnProperty( filterOption ) ).map( option => (

                        <option
                            key={ option.id }
                            value={ option.id }
                        >
                            { selectData === 'Price' && option.fields.Price }
                            { selectData === 'Category' && option.fields.Category }
                            { selectData === 'Title' && option.fields.Title }
                            { selectData === 'Titel' && option.fields.Titel }
                            { selectData === 'Name' && option.fields.Name }
                        </option>

                    ) )
                }
            </select>
        </>
    )
}

export default SubjectDropdown