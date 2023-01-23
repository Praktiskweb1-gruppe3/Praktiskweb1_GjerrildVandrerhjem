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

    const { file, id, imageDir } = JSON.parse( event.body );
    try {

        
           const desktop = await Cloudinary.v2.uploader.destroy( file[0], {
                upload_preset: "gjerrildvandrerhjem",
                folder: imageDir
            } )

          const tablet =   await Cloudinary.v2.uploader.destroy( file[1], {
                upload_preset: "gjerrildvandrerhjem",
                folder: imageDir
            } )

           const mobile =  await Cloudinary.v2.uploader.destroy( file[2], {
                upload_preset: "gjerrildvandrerhjem",
                folder: imageDir
            } )
        


        await table.destroy( id );



        return {
            statusCode: 200,
            body: JSON.stringify( { msg: 'Record deleted' } ),
        }
    } catch ( error ) {
        return {
            statusCode: 500,
            body: JSON.stringify( { error: 'Failed to delete image' } )
        }
    }

} 