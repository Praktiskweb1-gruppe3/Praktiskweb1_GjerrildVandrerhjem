import '../sass/Navigation.scss';
import { NavLink, Link } from "react-router-dom";

import { useState, useRef, useEffect, useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

import ChangeLanguage from './ChangeLanguage';

import { useGetData } from '../hooks/useGetData';
import { Context } from '../Context/Context';



const Navbar = () => {

    const { error, loading, data, getData } = useGetData();

    const [ language, setLanguage ] = useContext( Context );

    const [ currentLanguageData, setCurrentLanguageData ] = useState();


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

    useEffect( () => {

        if ( data ) {
            setCurrentLanguageData( data.records.filter( d => d.fields.Code[ 0 ] === language ) );
        }

    }, [ data ] )

    useEffect( () => {
        getData( 'https://api.airtable.com/v0/app0qMLpB7LbMjc7l/Navigation', {
            'Authorization': 'Bearer ' + import.meta.env.VITE_AIRTABLEKEY
        } );

    }, [ language ] )


    return (


        <header className="container-fluid px-0 header" ref={ headerRef }>

            {
                currentLanguageData &&

                <>
                    <nav className=" container-xl topnav">
                        <h1 className="big_heading">{ currentLanguageData[ 0 ].fields.Header_Title }</h1>

                        <h1 className="small_heading">{ currentLanguageData[ 0 ].fields.Header_Title2 }</h1>


                        <div className="info">
                            <p><FontAwesomeIcon icon={ faPhone } /> +45 40224199</p>
                            <p><FontAwesomeIcon icon={ faEnvelope } /> info@gjerrildvandrerhjem.dk</p>

                        </div>

                        <div className="soMeAndLanguage">
                            <FontAwesomeIcon icon={ faFacebookF } />
                            <FontAwesomeIcon icon={ faInstagram } />
                            <ChangeLanguage currentLanguageData={currentLanguageData} />

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
                                <h2 className="small_heading">
                                    <span>
                                        { currentLanguageData[ 0 ].fields.Header_Title.split( '-' )[ 0 ] } -
                                    </span>
                                    <span>{ currentLanguageData[ 0 ].fields.Header_Title.split( '-' )[ 1 ] }</span>
                                </h2>
                            </li>

                            <li>
                                <NavLink to="/rooms">{currentLanguageData[0].fields.Rooms}</NavLink>
                            </li>

                            <li>
                                <NavLink to="/events">{currentLanguageData[0].fields.Events}</NavLink>
                            </li>

                            <li>
                                <NavLink to="/activities">{currentLanguageData[0].fields.Activities}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/services">{currentLanguageData[0].fields.Services}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/news">{currentLanguageData[0].fields.News}</NavLink>
                            </li>

                            <li>
                                <div className="soMe">
                                    <FontAwesomeIcon icon={ faFacebookF } />
                                    <FontAwesomeIcon icon={ faInstagram } />
                                </div>
                            </li>

                            <li>
                                <button className="btn_bookroom">{currentLanguageData[0].fields.BookRoom}</button>
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