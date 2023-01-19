import React, { useState } from 'react';
import { useEffect } from 'react';

import { useCurrentUser } from 'thin-backend-react';

// Admin navbar
import AdminNavbar from '../../component/Admin/AdminNavbar';

const CheckIsAdmin = () => {

    const user = useCurrentUser();

    const [ isAdmin, setIsAdmin ] = useState();

    useEffect( () => {

        if ( user ) {
            setIsAdmin( user.admin )
        }

    }, [ user ] );

    if ( user === null || user === undefined ) {

        // Handle loading
        return <div>Loading...</div>
    }

    return (

        <>
            <AdminNavbar />

        </>

    )
}

export default CheckIsAdmin