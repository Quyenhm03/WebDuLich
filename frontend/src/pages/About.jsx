import React from 'react'
import Subtitle from '../shared/Subtitle'
import '../styles/about.css'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import OurTeam from '../components/Our-team/OurTeam'


const About = () => {
  return (
   <>
   
    <div className='about'>
      <section>
         <Container>
            <Row>
               <Col lg='12' className='about__welcome mb-5'>
                  <Subtitle subtitle={'Về chúng tôi'} />
                  <h2>Chào mừng đến với TravelWorld</h2>
                  <p>Chúng tôi là TracelWorld, nơi bạn khám phá mội góc cạnh của thế giới thông qua những hành trình thú vị.
                     Từ những cảnh quan tuyệt đẹp đến văn hóa đa dạng, chúng tôi cam kết đưa bạn đến những trải nghiệm mới mẻ và
                     khám phá những điều bạn chưa từng biết.<br />
                     <br />
                     Tại TravelWorls, chúng tôi hiểu rằng mỗi hành trình là một câu chuyện riêng và chúng tôi luôn cố gắng tạo ra những
                     chuyến đi phù hợp với sở thích cá nhân và mong muốn của bạn. Hãy cùng chúng tôi bước chân ra khỏi vùng an toàn và khám
                     phá thế giới đầy màu sắc. TravelWorld sẽ luôn đồng hành cùng bạn để mỗi khoảnh khắc đều tạo ra kỷ niệm.
                  </p>
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
                  <Subtitle subtitle={'Thành viên trong TravelWorld'} />
                  <h2>Đội ngũ chuyên gia của chúng tôi</h2>
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
                    <Subtitle subtitle={'Liên hệ chúng tôi'} />
                </Col>
                <Col lg='6' className='contact mb-5 mb-lg-0'>
                    <div className="contact__form">
                      <h5>Để lại phản hồi</h5>
                      <Form className='contact__info-form'>
                        <FormGroup>
                            <input type="text" placeholder='Họ tên' id='fullName' required/>
                        </FormGroup>
                        <FormGroup>
                            <input type="email" placeholder='Email' id='email' required/>
                        </FormGroup>
                        <FormGroup>
                            <input type="text" placeholder='Tiêu đề' id='subject' required/>
                        </FormGroup>
                        <FormGroup>
                            <input type="text" placeholder='Nội dung' id='comment' required/>
                        </FormGroup>
                      </Form>
                      <br/>
                      <div className="contact__button">
                        <Button className='btn primary__btn w-25'>Gửi</Button>
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
    
    </>
  )
}

export default About