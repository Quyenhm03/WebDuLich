import React from 'react'
import Subtitle from '../shared/Subtitle'
import '../styles/about.css'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import OurTeam from '../components/Our-team/OurTeam'

const About = () => {
  return (
    <div className='about'>
      <section>
         <Container>
            <Row>
               <Col lg='12' className='about__welcome mb-5'>
                  <Subtitle subtitle={'Welcome Travel World'} />
                  <h2>We Help You Planning Your Journey</h2>
                  <p>Treat yourself with a journey to your inner self. Visit a mystique and start your spiritual adventure with comes to exploring exotic place. We promise, you will enjoy each and every step you make.</p>
                  <img src="https://a3travel.webtravel.vn/files/files/about-01.png" alt=""/>
               </Col>
            </Row>
         </Container>
      </section>
      {/* Team member slide */}
      <section>
         <Container>
            <Row>
               <Col lg='12' className='about__team mb-5'>
                  <Subtitle subtitle={'Our team members'} />
                  <h2>Meet Our Expert Agents</h2>
               </Col>
               <Col lg='12'>
                  <OurTeam/>
               </Col>
            </Row>
         </Container>
      </section>
      {/* Form reply */}
      <section>
         <Container>
            <Row>
                <Col lg='12' className='about-contact mb-5'>
                    <Subtitle subtitle={'Contact us'} />
                </Col>
                <Col lg='6' className='contact mb-5 mb-lg-0'>
                    <div className="contact__form">
                      <h5>Leave a reply</h5>
                      <Form className='contact__info-form'>
                        <FormGroup>
                            <input type="text" placeholder='Full Name' id='fullName' required/>
                        </FormGroup>
                        <FormGroup>
                            <input type="email" placeholder='Email' id='email' required/>
                        </FormGroup>
                        <FormGroup>
                            <input type="text" placeholder='Subject' id='subject' required/>
                        </FormGroup>
                        <FormGroup>
                            <input type="text" placeholder='Comment' id='comment' required/>
                        </FormGroup>
                      </Form>
                      <br/>
                      <div className="contact__button">
                        <Button className='btn primary__btn w-25'>Send</Button>
                      </div>
                    </div>
                </Col>
                {/* google map */}
                <Col lg='6' className='contact map-col'>
                     <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2926381717434!2d105.78486297492772!3d20.980903480656533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135accdd8a1ad71%3A0xa2f9b16036648187!2zSOG7jWMgdmnhu4duIEPDtG5nIG5naOG7hyBCxrB1IGNow61uaCB2aeG7hW4gdGjDtG5n!5e0!3m2!1svi!2s!4v1708364079785!5m2!1svi!2s" 
                              width="100%" height="100%" 
                              allowFullScreen loading="lazy" 
                              referrerPolicy="no-referrer-when-downgrade"
                              title="Responsive Google Map"></iframe>
                </Col>
            </Row>
         </Container>
      </section>
    </div>
  )
}

export default About