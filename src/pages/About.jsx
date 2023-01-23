import '../sass/About.scss';
import React, { useEffect, useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import parse from 'html-react-parser';

import UseTranslator from '../hooks/UseTranslator';


import { ImagePathContext } from '../Context/ImagePathContext';
import { Image } from 'cloudinary-react';


const About = () => {

  const { filteredData, error, loading } = UseTranslator( 'About', true );

  const { cloudinaryImagePath } = useContext( ImagePathContext );


  useEffect( () => {

    document.querySelector( '#root' ).style.backgroundColor = '#FAFAFF';
  }, [] )



  return (
    filteredData &&
    <Container fluid className='about'>

      <Container fluid='lg'>
        <Row>

          {
            filteredData.map( ( a, i ) => (
              <Col
                xs={ 12 }
                md={ { span: 10, offset: 1 } }
                key={ a.id }
                className={ `px-0 px-sm-5 px-md-0 about__card-col` + ( i + 1 ) }
              >

                <h2>{ a.fields.Titel }</h2>
                <h4>
                  {
                    a.fields.hasOwnProperty( 'Subtitel' ) && a.fields.Subtitel
                  }
                </h4>

                <section className='about__card'>

                  <Col
                    xs={ 12 }
                    md={ { span: 6, order: i === 0 ? 2 : 1 } }
                  >

                    <figure className={ `about-card__image ${ 'about-card__image' + ( i + 1 ) }` }>
                      <picture>

                        <source media='(max-width: 420px)' srcSet={ cloudinaryImagePath + a.fields.ImgId_Mobile[ 0 ] } />

                        <source media='(max-width: 767px)' srcSet={ cloudinaryImagePath + a.fields.ImgId_Tablet[ 0 ] } />

                        <source media='(min-width: 768px)' srcSet={ cloudinaryImagePath + a.fields.ImgId_Desktop[ 0 ] } />

                        <Image
                          cloudName={ import.meta.env.VITE_CLOUDINARY_CLOUD_NAME }
                          public_id={a.fields.ImgId_Desktop[ 0 ]}
                          alt={ a.fields.Image_Description } />

                      </picture>
                    </figure>
                  </Col>

                  <Col
                    xs={ 12 }
                    md={ { span: 6, order: i === 0 ? 1 : 2 } }>
                    <article
                      className={ `about-card__text ${ 'about-card__text' + ( i + 1 ) }` }>
                      <div
                        className='mainText'>

                        { parse( a.fields.Content ) }

                      </div>
                    </article>
                  </Col>

                </section>

              </Col>
            ) )
          }

        </Row>
      </Container>

    </Container>

  )
}

export default About