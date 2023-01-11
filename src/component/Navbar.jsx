import { NavLink, Link } from "react-router-dom";

import { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faPhone, faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

import '../sass/Navigation.scss';

const Navbar = () => {

    /* #region  Usestates */
    const [ isMenuOpen, setIsMenuOpen ] = useState( false );

    const [ scrolledYPos, setScrolledYPos ] = useState( 0 );
    /* #endregion */

    const headerRef = useRef();

    /* #region  Menu handling */
    const handleClick = () => setIsMenuOpen( !isMenuOpen );


    /* #endregion */

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


    }, [] )


    return (
        <header className="container-fluid px-0 header" ref={ headerRef }>

            <nav className=" container-xl topnav">
                <h1 className="big_heading">På toppen af Djursland - med dig i centrum</h1>
                <h1 className="small_heading">Gjerrild Vandrerhjem</h1>


                <div className="info">
                    <p><FontAwesomeIcon icon={ faPhone } /> +45 40224199</p>
                    <p><FontAwesomeIcon icon={ faEnvelope } /> info@gjerrildvandrerhjem.dk</p>

                </div>

                <div className="soMeAndLanguage">
                    <FontAwesomeIcon icon={ faFacebookF } />
                    <FontAwesomeIcon icon={ faInstagram } />

                </div>
            </nav>

            <hr className="navbarSeperator" />

            <nav className="container-xl navbar">

                <Link to="/">
                    {/* <img src="" alt="" /> */ }

                    {/* logo placeholder */ }
                    <div style={ { width: '250px', height: '105px', backgroundColor: 'skyblue' } }></div>
                </Link>



                <ul className={ isMenuOpen ? "navbar__menu active" : "navbar__menu" }>

                    <li>
                        <h2 className="small_heading">På toppen af Djursland -<br /> med dig i centrum</h2>
                    </li>

                    <li>
                        <NavLink to="/rooms">Værelser</NavLink>
                    </li>

                    <li>
                        <NavLink to="/rooms">Events</NavLink>
                    </li>

                    <li>
                        <NavLink to="/rooms">Aktiviteter</NavLink>
                    </li>
                    <li>
                        <NavLink to="/rooms">Vi tilbyder</NavLink>
                    </li>
                    <li>
                        <NavLink to="/rooms">Nyheder</NavLink>
                    </li>

                    <li>
                        <div className="soMe">
                            <FontAwesomeIcon icon={ faFacebookF } />
                            <FontAwesomeIcon icon={ faInstagram } />
                        </div>
                    </li>

                    <li>
                        <button className="btn_bookroom">Bestil værelse</button>
                    </li>
                </ul>
                <div className="hamburger" onClick={ handleClick }>
                    { isMenuOpen ? <FontAwesomeIcon icon={ faXmark } /> : <FontAwesomeIcon icon={ faBars } /> }
                </div>

            </nav>
        </header>
    )
}
export default Navbar;