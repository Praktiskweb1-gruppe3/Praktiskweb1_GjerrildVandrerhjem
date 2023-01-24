import '../../sass/Navigation.scss';
import { NavLink } from "react-router-dom";

import { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useCurrentUser, useIsLoggedIn } from 'thin-backend-react';

import { logout } from 'thin-backend';

import { useGetData } from '../../hooks/useGetData';

const AdminNavbar = () => {

    const [ isMenuOpen, setIsMenuOpen ] = useState( false );

    const {error, loading, data, getData} = useGetData();

    const headerRef = useRef();


    const getUser = useCurrentUser();

    const isLoggedIn = useIsLoggedIn();


    const handleClick = () => setIsMenuOpen( !isMenuOpen );

    const handleStylingOnScroll = () => {
        const scrollY = window.scrollY;

        if ( scrollY > 75 ) {

            //* The header styling happens inside changeHeadingOnScroll in the gsap onComplete

            headerRef.current.classList.add( "onScroll" );

        }
        else {
            headerRef.current.classList.remove( "onScroll" );

        }
    }

    useEffect( () => {

        window.addEventListener( "scroll", handleStylingOnScroll );

        getData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/AdminNavigation' , {
                'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLE_API_KEY
            })

        return () => {
            window.removeEventListener( "scroll", handleStylingOnScroll );

        }

    }, [] )

    useEffect( () => {

        /* Removing the class on every render to make sure the header only has default values. 
            This cannot happen in the other useEffect, since that will run every time the y scroll pos changes. 
        */
        if ( headerRef.current.classList.contains( "onScroll" ) ) {
            headerRef.current.classList.remove( "onScroll" );
        }


    }, [] );

    return (
        

        <header className="container-fluid px-0 adminHeader " ref={ headerRef }>

            {error && <div>Error</div>}
            {loading && <div>Loading...</div>}



            {
                data &&

                <>
                    <nav className=" container-xl topnav">
                        <h1 className="big_heading">{ data.records[ 0 ].fields.Header_Title }</h1>
                        {

                            <div className='logoutSection'>
                                <p className='mainText'>
                                    { getUser?.email }
                                </p>

                                { isLoggedIn ? ( <button className="btn__logout" onClick={ logout }  >{ data.records[ 0 ].fields.Logout }</button> ) : ( null ) }
                            </div>
                        }
                    </nav>

                    <hr className="navbarSeperator" />

                    <nav className="container-xl navbar px-lg-0">


                        <ul className={ isMenuOpen ? "navbar__menu active" : "navbar__menu" }>

                            <li>
                                <h2 className="small_heading">
                                    <span>
                                        { data.records[ 0 ].fields.Header_Title.split()[ 0 ] } -
                                    </span>
                                    <span>{ data.records[ 0 ].fields.Header_Title.split( '-' )[ 1 ] }</span>
                                </h2>
                            </li>

                            <li>
                                <NavLink to="/admin" end>{ data.records[ 0 ].fields.Frontpage }</NavLink>
                            </li>

                            <li>
                                <NavLink to="rooms">{ data.records[ 0 ].fields.Rooms }</NavLink>
                            </li>

                            <li>
                                <NavLink to="events">{ data.records[ 0 ].fields.Events }</NavLink>
                            </li>

                            <li>
                                <NavLink to="activities">{ data.records[ 0 ].fields.Activities }</NavLink>
                            </li>
                            <li>
                                <NavLink to="services">{ data.records[ 0 ].fields.Services }</NavLink>
                            </li>
                            <li>
                                <NavLink to="news">{ data.records[ 0 ].fields.News }</NavLink>
                            </li>
                            <li>
                                <NavLink to="contact">{ data.records[ 0 ].fields.Contact }</NavLink>
                            </li>
                            <li>
                                <NavLink to="about">{ data.records[ 0 ].fields.OmOs }</NavLink>
                            </li>
                        </ul>
                        <div className="hamburger" onClick={ handleClick }>
                            { isMenuOpen ? <FontAwesomeIcon icon={ faXmark } /> : <FontAwesomeIcon icon={ faBars } /> }
                        </div>

                    </nav>
                </>

            }
        </header>
    )
}
export default AdminNavbar;