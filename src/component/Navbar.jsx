import '../sass/Navigation.scss';
import { NavLink, Link } from "react-router-dom";

import { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

import ChangeLanguage from './ChangeLanguage';

import UseTranslator from '../hooks/UseTranslator';



const Navbar = () => {

    const [ isMenuOpen, setIsMenuOpen ] = useState( false );

    const [ scrolledYPos, setScrolledYPos ] = useState( 0 );

    const headerRef = useRef();

    const { filteredData, error, loading } = UseTranslator( "Navigation" );

    const imgPathMobile = './assets/images/mobile/';
    const imgPathTablet = './assets/images/tablet/';
    const imgPathDesktop = './assets/images/desktop/';


    const handleClick = () => setIsMenuOpen( !isMenuOpen );

    const handleStylingOnScroll = () => {
        const scrollY = window.scrollY;
        setScrolledYPos( scrollY );

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

    }, [ scrolledYPos ] )

    useEffect( () => {

        /* Removing the class on every render to make sure the header only has default values. 
            This cannot happen in the other useEffect, since that will run every time the y scroll pos changes. 
        */
        if ( headerRef.current.classList.contains( "onScroll" ) ) {
            headerRef.current.classList.remove( "onScroll" );
        }


    }, [] );


    return (


        <header className="container-fluid px-0 header" ref={ headerRef }>

            {
                filteredData &&

                <>
                    <nav className=" container-xl topnav">
                        <h1 className="big_heading">{ filteredData[ 0 ].fields.Header_Title }</h1>

                        <h1 className="small_heading">{ filteredData[ 0 ].fields.Header_Title2 }</h1>


                        <div className="info">
                            <p><FontAwesomeIcon icon={ faPhone } /> +45 40224199</p>
                            <p><FontAwesomeIcon icon={ faEnvelope } /> info@gjerrildvandrerhjem.dk</p>

                        </div>

                        <div className="soMeAndLanguage">
                            <a href='https://www.facebook.com/profile.php?id=100085306731927' target="_blank"><FontAwesomeIcon icon={ faFacebookF } /></a>
                            <a href='https://www.instagram.com/danhostel_gjerrild_vandrerhjem/' target="_blank"><FontAwesomeIcon icon={ faInstagram } /></a>
                            <ChangeLanguage currentLanguageData={ filteredData } />

                        </div>
                    </nav>

                    <hr className="navbarSeperator" />

                    <nav className="container-xl navbar px-4 px-lg-0">

                        <Link to="/" className='logoContainer'>
                            <picture>
                                <source media='(max-width: 575px)' srcSet={ imgPathMobile + filteredData[ 0 ].fields.Image_Name } />

                                <source media='(max-width: 991px)' srcSet={ imgPathTablet + filteredData[ 0 ].fields.Image_Name } />

                                <source media='(min-width: 992px)' srcSet={ imgPathDesktop + filteredData[ 0 ].fields.Image_Name } />

                                <img
                                    className='navbar__logo'
                                    src={ imgPathDesktop + filteredData[ 0 ].fields.Image_Name }
                                    alt={ filteredData[ 0 ].fields.Image_Description } />
                            </picture>

                        </Link>

                        <ul className={ isMenuOpen ? "navbar__menu active" : "navbar__menu" }>

                            <li>
                                <h2 className="small_heading">
                                    <span>
                                        { filteredData[ 0 ].fields.Header_Title.split( '-' )[ 0 ] } -
                                    </span>
                                    <span>{ filteredData[ 0 ].fields.Header_Title.split( '-' )[ 1 ] }</span>
                                </h2>
                            </li>

                            <li>
                                <NavLink to="/rooms">{ filteredData[ 0 ].fields.Rooms }</NavLink>
                            </li>

                            <li>
                                <NavLink to="/events">{ filteredData[ 0 ].fields.Events }</NavLink>
                            </li>

                            <li>
                                <NavLink to="/activities">{ filteredData[ 0 ].fields.Activities }</NavLink>
                            </li>
                            <li>
                                <NavLink to="/services">{ filteredData[ 0 ].fields.Services }</NavLink>
                            </li>
                            <li>
                                <NavLink to="/news">{ filteredData[ 0 ].fields.News }</NavLink>
                            </li>

                            <li>
                                <div className="soMe">
                                    <a
                                        href='https://www.facebook.com/profile.php?id=100085306731927' target="_blank">
                                        <FontAwesomeIcon icon={ faFacebookF } />
                                    </a>

                                    <a
                                        href='https://www.instagram.com/danhostel_gjerrild_vandrerhjem/' target="_blank">
                                        <FontAwesomeIcon icon={ faInstagram } />
                                    </a>
                                </div>
                            </li>

                            <li>
                                <button className="btn__bookroom">{ filteredData[ 0 ].fields.BookRoom }</button>
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
export default Navbar;