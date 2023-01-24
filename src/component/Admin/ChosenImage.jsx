import React from 'react';

import { Image } from 'cloudinary-react';

const ChosenImage = ( { publicImgId, altTag, labelText } ) => {
    return (
        <>
            { publicImgId &&
                <>
                    <p className='mainText'>{labelText}</p>
                    <Image
                        cloudName={ import.meta.env.VITE_CLOUDINARY_CLOUD_NAME }
                        public_id={ publicImgId }
                        alt={altTag}
                    />
                </>
            }

        </>
    )
}

export default ChosenImage