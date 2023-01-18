import '../sass/Footer.scss';

import { NavLink } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLocationDot, faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

import UseTranslator from '../hooks/UseTranslator';

const Footer = () => {

    const { filteredData, error, loading } = UseTranslator("Footer");

    const imgPathDesktop = './assets/images/desktop/';
    const imgPathTablet = './assets/images/tablet/';
    const imgPathMobile = './assets/images/mobile/';

    return (
        <Container fluid >
            {
                filteredData && <>
                    <Row className='footer_container'>
                        <Col lg={ 6 } className='divider'>

                            <NavLink to="/" className='logoContainer'>
                                <picture>
                                    <source media='(max-width: 575px)' srcSet={ imgPathMobile + filteredData[0].fields.Image_Name } />

                                    <source media='(max-width: 991px)' srcSet={ imgPathTablet + filteredData[0].fields.Image_Name } />

                                    <source media='(min-width: 992px)' srcSet={ imgPathDesktop + filteredData[0].fields.Image_Name } />

                                    <img
                                        className='footer_logo'
                                        src={ imgPathDesktop + filteredData[0].fields.Image_Name }
                                        alt={ filteredData[0].fields.Image_Description } />
                                </picture>

                            </NavLink>

                            <p className='mainText'>{ filteredData[0].fields.Footer_Title }</p>
                        </Col>

                        <Col lg={ 3 } className='divider'>

                            <h2>{ filteredData[0].fields.Nyttige_Links }</h2>

                            <ul className='footer_menu'>
                                <li><NavLink to='/galleri' className='mainText info'><FontAwesomeIcon icon={ faGreaterThan } className='icon' /> { filteredData[0].fields.Galleri }</NavLink></li>
                                <li><NavLink to='/omos' className='mainText info'> <FontAwesomeIcon icon={ faGreaterThan } className='icon' /> { filteredData[0].fields.Om_Os }</NavLink></li>
                                <li><NavLink to='/kontakt' className='mainText info'> <FontAwesomeIcon icon={ faGreaterThan } className='icon' /> { filteredData[0].fields.Kontakt }</NavLink></li>
                            </ul>
                        </Col>

                        <Col lg={ 3 }>

                            <h2>{ filteredData[0].fields.Kontakt_Os }</h2>

                            <div className='info'>
                                <p className='mainText'> <FontAwesomeIcon icon={ faLocationDot } /> Dyrehavevej 9 </p>
                                <p className='mainText'> <FontAwesomeIcon icon={ faPhone } /> +45 40224199</p>
                            </div>

                            <ul className="footer_menu">
                                <li>
                                    <NavLink to='/' className='mainText info'> <FontAwesomeIcon icon={ faEnvelope } /> info@gjerrildvandrerhjem.dk</NavLink>
                                </li>
                            </ul>


                            <ul className="footer_menu">
                                <li>
                                    <div className="soMe_footer">
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
                            </ul>

                        </Col>
                    </Row>
                    <Row className='copyright'>
                        <Col lg={ 12 }>
                            <p className='mainText'>&copy; 2023 Gjerrild Vandrehjem - All Rights Reserved</p>
                        </Col>
                    </Row>
                </>
            }

        </Container>

    )
}

export default Footer