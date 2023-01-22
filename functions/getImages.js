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

    try {

        const records = await table.select({}).firstPage();

        const formattedRecords = records.map(record => ({
            id: record.id,
            ...record.fields
        }))
        

        return {
            statusCode: 200,
            body: JSON.stringify( formattedRecords ),
        }
    } catch ( error ) {
        return {
            statusCode: 500,
            body: JSON.stringify( { error: 'Failed to upload image' } )
        }
    }

} 