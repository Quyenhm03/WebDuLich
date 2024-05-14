import React from 'react'
import './newsletter.css'
import { Container, Row, Col } from 'reactstrap'
import maleTourist from '../assets/images/male-tourist.png'

const NewsLetter = () => {
   return (
      <section className='newsletter'>
         <Container>
            <Row>
               <Col lg='6'>
                  <div className="newsletter__content">
                     <h2>Đăng ký ngay để nhận được những thông tin du lịch hữu ích</h2>

                     <div className="newsletter__input">
                        <input type="email" placeholder='Nhập email của bạn' />
                        <button className="btn newsletter__btn">Nhận ưu đãi</button>
                     </div>
                     <br/>
                     <p>Đừng bỏ lỡ cơ hội! Hãy đăng ký ngay để nhận được những thông tin du lịch hữu ích. Chúng tôi sẽ đem đến
                        cho bạn những tin tức mới nhất về các địa điểm thú vị, gợi ý hành trình và những ưu đãi độc quyền.
                        <br/>
                        Hãy cùng chúng tôi chẩn bị cho những chuyến phiêu lưu tuyệt vời và khám phá thế giới đầy màu sắc!
                     </p>
                  </div>
               </Col>
               <Col lg='6'>
                  <div className="newsletter__img">
                     <img src={maleTourist} alt="" />
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default NewsLetter