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

    const { id, description, imageText, language } = JSON.parse( event.body );

    console.log( "id " + id )
    console.log( 'description: ' + description )
    console.log( "imageText: " + imageText )
    console.log( 'language: ' + language )

    try {


        // const { public_id } = await Cloudinary.v2.uploader.upload( file, {
        //     public_id: file,
        //     upload_preset: "gjerrildvandrerhjem",
        //     folder: 'GjerrildVandrerHjem/desktop'
        // } );

        // // tablet
        // const { public_id: tablet_public_id } = await Cloudinary.v2.uploader.upload( tablet_file, {
        //     upload_preset: "gjerrildvandrerhjem",
        //     folder: 'GjerrildVandrerHjem/tablet'
        // } );

        // // mobile
        // const { public_id: mobile_public_id } = await Cloudinary.v2.uploader.upload( mobile_file, {
        //     upload_preset: "gjerrildvandrerhjem",
        //     folder: 'GjerrildVandrerHjem/mobile'
        // } );

        await table._updateRecords( true, id, {
            "fields": {
                "Description": description,
                "Language": [
                    language
                ]
            }
        }, () => {
            console.log('done')
        } )

        // console.log( 'record: ' + record )



        return {
            statusCode: 200,
            body: '',
        }
    } catch ( error ) {
        return {
            statusCode: 500,
            body: JSON.stringify( { error: 'Failed to update image' } )
        }
    }

} 