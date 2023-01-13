import React, { useEffect, useState } from 'react';

import UseTranslator from '../hooks/UseTranslator';

const ImageTest = () => {

    const [ selectedData ] = UseTranslator( "Services", true );

    const largeImgPath = "./assets/images/big/services/"
    const mediumImgPath = "./assets/images/medium/services/"
    const smallImgPath = "./assets/images/small/services/"

    return (
        <>
            {
                selectedData &&

                <div>
                    {
                        selectedData.map( ( service ) => (
                            <div style={ { width: '350px', border: '2px solid black', margin: '25px' } }>
                                <p>{ service.fields.Service_Name }</p>
                                <p>{ service.fields.Name }</p>
                                <p>{ service.fields.Service_Description }</p>

                                <picture>
                                    <source media="(max-width: 575px)" srcSet={ smallImgPath + service.fields.Image_Name[ 0 ] } />

                                    <source media="(max-width: 991px)" srcSet={ mediumImgPath + service.fields.Image_Name[ 0 ] } />

                                    <source media="(min-width: 992px)" srcSet={ largeImgPath + service.fields.Image_Name[ 0 ] } />

                                    <img style={ { width: '100%', height: 'auto', display: 'block' } } src={ largeImgPath + service.fields.Image_Name[ 0 ] } alt={ service.fields.Image_Description } />
                                </picture>

                            </div>
                        ) )
                    }
                </div>
            }

        </>




    )
}

export default ImageTest