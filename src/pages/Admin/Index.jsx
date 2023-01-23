import { initThinBackend } from 'thin-backend';
import { ThinBackend } from 'thin-backend-react';

import { Outlet } from 'react-router-dom';

import { useState } from 'react';

import 'thin-backend-react/auth.css';
import '../../sass/Admin/Admin.scss'


import { useEffect } from 'react';

import AdminContent from './AdminContent';

const Index = () => {

    const [ pathname, setPathname ] = useState( '' )

    useEffect( () => {

        // Is being set in AdminNavbar
        return () => {
            document.querySelector( '.header' ).classList.remove( 'admin' );
        }

    }, [ ] )


    return (

        <ThinBackend requireLogin>

            <AdminContent />

            <Outlet />

        </ThinBackend>

    )
}

initThinBackend( { host: import.meta.env.VITE_BACKEND_URL } )


export default Index;