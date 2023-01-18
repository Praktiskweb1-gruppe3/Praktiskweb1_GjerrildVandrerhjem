import '../sass/About.scss';
import React, { useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import parse from 'html-react-parser';

import UseTranslator from '../hooks/UseTranslator';


const About = () => {

  const { filteredData, error, loading } = UseTranslator( 'About', true );

  const bigImgPath = './assets/images/desktop/';
  const mediumImgPath = './assets/images/tablet/';
  const mobileImgPath = './assets/images/mobile/';

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
                        <source media='(max-width: 420px)' srcSet={ mobileImgPath + a.fields.Image_Name[ 0 ] } />
                        <source media='(max-width: 767px)' srcSet={ mediumImgPath + a.fields.Image_Name[ 0 ] } />
                        <source media='(min-width: 768px)' srcSet={ bigImgPath + a.fields.Image_Name[ 0 ] } />

                        <img src={ bigImgPath + a.fields.Image_Name[ 0 ] } alt={ bigImgPath + a.fields.Image_Description } />

                      </picture>
                    </figure>
                  </Col>

                  <Col
                    xs={12}
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