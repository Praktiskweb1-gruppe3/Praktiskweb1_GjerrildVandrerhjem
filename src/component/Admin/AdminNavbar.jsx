import '../../sass/Navigation.scss';
import { NavLink } from "react-router-dom";

import { useState, useRef, useEffect } from "react";

import UseTranslator from '../../hooks/UseTranslator';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useCurrentUser, useIsLoggedIn } from 'thin-backend-react';

import { logout } from 'thin-backend';

const AdminNavbar = () => {

    const [ isMenuOpen, setIsMenuOpen ] = useState( false );

    const [ scrolledYPos, setScrolledYPos ] = useState( 0 );

    const { filteredData, error, loading } = UseTranslator( "AdminNavigation" );

    const headerRef = useRef();


    const getUser = useCurrentUser();

    const isLoggedIn = useIsLoggedIn();

    const imgPathMobile = './assets/images/mobile/';
    const imgPathTablet = './assets/images/tablet/';
    const imgPathDesktop = './assets/images/desktop/';


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

            {
                filteredData &&

                <>
                    <nav className=" container-xl topnav">
                        <h1 className="big_heading">{ filteredData[ 0 ].fields.Header_Title }</h1>
                        {

                            <div className='logoutSection'>
                                <p className='mainText'>
                                    { getUser?.email }
                                </p>

                                { isLoggedIn ? ( <button className="btn__logout" onClick={ logout }  >{ filteredData[ 0 ].fields.Logout }</button> ) : ( null ) }
                            </div>



                        }
                    </nav>

                    <hr className="navbarSeperator" />

                    <nav className="container-xl navbar px-lg-0">


                        <ul className={ isMenuOpen ? "navbar__menu active" : "navbar__menu" }>

                            <li>
                                <h2 className="small_heading">
                                    <span>
                                        { filteredData[ 0 ].fields.Header_Title.split()[ 0 ] } -
                                    </span>
                                    <span>{ filteredData[ 0 ].fields.Header_Title.split( '-' )[ 1 ] }</span>
                                </h2>
                            </li>

                            <li>
                                <NavLink to="/admin" end>{ filteredData[ 0 ].fields.Frontpage }</NavLink>
                            </li>

                            <li>
                                <NavLink to="rooms">{ filteredData[ 0 ].fields.Rooms }</NavLink>
                            </li>

                            <li>
                                <NavLink to="events">{ filteredData[ 0 ].fields.Events }</NavLink>
                            </li>

                            <li>
                                <NavLink to="activities">{ filteredData[ 0 ].fields.Activities }</NavLink>
                            </li>
                            <li>
                                <NavLink to="services">{ filteredData[ 0 ].fields.Services }</NavLink>
                            </li>
                            <li>
                                <NavLink to="news">{ filteredData[ 0 ].fields.News }</NavLink>
                            </li>
                            <li>
                                <NavLink to="contact">{ filteredData[ 0 ].fields.Contact }</NavLink>
                            </li>
                            <li>
                                <NavLink to="about">{ filteredData[ 0 ].fields.OmOs }</NavLink>
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