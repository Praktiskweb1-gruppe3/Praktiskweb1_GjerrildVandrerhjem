import * as dotenv from 'dotenv';
import Airtable from 'airtable';

dotenv.config();

Airtable.configure({
    apiKey: process.env.VITE_AIRTABLE_API_KEY
}); 

const base = Airtable.base(process.env.VITE_AIRTABLE_BASE_ID);
const table = base(process.env.VITE_AIRTABLE_TABLE_NAME);

export {table, base};