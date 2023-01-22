import React, { useEffect } from 'react';

import { useCurrentUser } from 'thin-backend-react';

import { logout } from 'thin-backend';

import AdminNavbar from '../../component/Admin/AdminNavbar';



const AdminContent = () => {

    const user = useCurrentUser();


    useEffect( () => {

        document.querySelector( '#root' ).classList.add( 'admin' );
        document.querySelector( '.footer' ).classList.add( 'admin' );
        document.querySelector( '.header' ).classList.add( 'admin' );

        return () => {
            document.querySelector( '.footer' ).classList.remove( 'admin' );
        }



    }, [] )


    if ( user === null || user == undefined ) {
        return <div>Loading...</div>
    }

    if ( !user.admin ) {

        return (
            <div className='notAdmin'>
                <p className='mainText'> Du er ikke admin og har derfor ikke adgang!</p>
                <button className='btn__logout' onClick={ logout }>Logud</button>
            </div> )
    }


    return (
        <>
            <AdminNavbar />
        </>

    )


}

export default AdminContent;