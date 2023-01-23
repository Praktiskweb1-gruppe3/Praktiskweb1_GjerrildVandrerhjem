import * as Cloudinary from 'cloudinary'
import * as dotenv from 'dotenv';
import { table } from './utils/airtable';


dotenv.config();

Cloudinary.v2.config( {
    cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.VITE_CLOUDINARY_API_KEY,
    api_secret: process.env.VITE_CLOUDINARY_API_SECRET
} );



export const handler = async ( event ) => {

    const { desktop_file, tablet_file, mobile_file, description, imageText, language } = JSON.parse( event.body );    

    try {

        // desktop
        const { public_id: desktop_public_id } = await Cloudinary.v2.uploader.upload( desktop_file, {
            upload_preset: "gjerrildvandrerhjem",
            folder: 'GjerrildVandrerHjem/desktop'
        } );

        // tablet
        const { public_id: tablet_public_id } = await Cloudinary.v2.uploader.upload( tablet_file, {
            upload_preset: "gjerrildvandrerhjem",
            folder: 'GjerrildVandrerHjem/tablet'
        } );

        // mobile
        const { public_id: mobile_public_id } = await Cloudinary.v2.uploader.upload( mobile_file, {
            upload_preset: "gjerrildvandrerhjem",
            folder: 'GjerrildVandrerHjem/mobile'
        } );

        console.log(desktop_public_id);

        const record = await table.create( {
            ImgId_Desktop: desktop_public_id,
            ImgId_Tablet: tablet_public_id, 
            ImgId_Mobile: mobile_public_id,
            Description: description,
            Language: [language],
            Image_Text: imageText
        } )

        return {
            statusCode: 200,
            body: JSON.stringify( record ),
        }
    } catch ( error ) {
        return {
            statusCode: 500,
            body: JSON.stringify( { error: 'Failed to upload image' } )
        }
    }

} 