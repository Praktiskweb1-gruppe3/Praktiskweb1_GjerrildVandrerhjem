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

    return (
        <Container fluid >
            {
                filteredData && <>
                    <Row className='footer_container'>
                        <Col lg={ 6 } className='divider'>

                            <NavLink to="/">
                                <img src={ "./assets/images/big/" + filteredData[0].fields.Image_Name } alt="" className='footer_logo' />
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

                            <p className='mainText info'> <FontAwesomeIcon icon={ faLocationDot } /> Dyrehavevej 8 </p>
                            <p className='mainText info'> <FontAwesomeIcon icon={ faPhone } /> +45 40224199</p>
                            <ul className="footer_menu">
                                <li>
                                    <NavLink to='/' className='mainText info'> <FontAwesomeIcon icon={ faEnvelope } /> info@gjerrildvandrerhjem.dk</NavLink>
                                </li>
                            </ul>
                            

                            <ul className="footer_menu">
                                <li>
                                    <div className="soMe_footer">
                                        <NavLink
                                            href='https://www.facebook.com/profile.php?id=100085306731927' target="_blank">
                                            <FontAwesomeIcon icon={ faFacebookF } />
                                        </NavLink>

                                        <NavLink
                                            href='https://www.instagram.com/danhostel_gjerrild_vandrerhjem/' target="_blank">
                                            <FontAwesomeIcon icon={ faInstagram } />
                                        </NavLink>
                                    </div>
                                </li>
                            </ul>

                        </Col>
                    </Row>
                    <Row className='copyright'>
                        <Col lg={12}>
                       <p className='mainText'>&copy; 2023 Gjerrild Vandrehjem - All Rights Reserved</p> 
                        </Col>
                    </Row>
                </>
            }

        </Container>

    )
}

export default Footer