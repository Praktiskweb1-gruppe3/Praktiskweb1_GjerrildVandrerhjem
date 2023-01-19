import { initThinBackend } from 'thin-backend';
import { ThinBackend } from 'thin-backend-react';
import 'thin-backend-react/auth.css';

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';


// Admin navbar
import AdminNavbar from '../../component/Admin/AdminNavbar';


const Admin = () => {


    useEffect(() => {

        // Is being set in AdminNavbar
        return () => {
            document.querySelector('.footer').style.display = 'block';
            document.querySelector('.header').style.display = 'block';
            document.querySelector('.admin_header').style.display = 'none';
        }

    }, [])
   

    return (
        <ThinBackend requireLogin>

            <AdminNavbar  />

        </ThinBackend>
    )
}

initThinBackend( { host: import.meta.env.VITE_BACKEND_URL } )


export default Admin;