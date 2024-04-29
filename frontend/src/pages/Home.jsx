import React from 'react'
import '../styles/home.css'
import { Container, Row, Col } from 'reactstrap'
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import worldImg from '../assets/images/world.png'
import experienceImg from '../assets/images/experience.png'
import Subtitle from './../shared/Subtitle'
import SearchBar from './../shared/SearchBar'
import ServiceList from '../services/ServiceList'
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList'
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery'
import Testimonials from '../components/Testimonial/Testimonials'
import Newsletter from '../shared/Newsletter'


const Home = () => {
   return <>
      {/* ========== HERO SECTION ========== */}
      
      <section>
         <Container>
            <Row>
               <Col lg='6'>
                  <div className="hero__content">
                     <div className="hero__subtitle d-flex align-items-center">
                        <Subtitle subtitle={'Hãy cho chúng tôi biết nơi bạn sẽ đến'} />
                        <img src={worldImg} alt="" />
                     </div>
                     <h1>Du lịch là cánh cửa tạo ra những <span className='hightlight'>kỷ niệm đáng nhớ</span></h1>
                     <p>
                        Du lịch là một cuộc hành trình kỳ diệu mở ra cánh cửa cho việc tạo ra những kỷ niệm đáng nhớ.
                        Với mỗi điểm đến mới, các trải nghiệm đang chờ đợi, sẵn sàng khắc sâu vào tâm trí và trái tim chúng ta.
                        Những cảnh quan hùng vĩ, những nền văn hóa đa dạng và những cuộc gặp gỡ đều góp phần tạo nên những khoảnh
                        khắc đáng nhớ sau mỗi chuyến đi.
                     </p>
                  </div>
               </Col>

               <Col lg='2'>
                  <div className="hero__img-box">
                     <img src={heroImg} alt="" />
                  </div>
               </Col>
               <Col lg='2'>
                  <div className="hero__img-box hero__video-box mt-4">
                     <video src={heroVideo} alt="" controls />
                  </div>
               </Col>
               <Col lg='2'>
                  <div className="hero__img-box mt-5">
                     <img src={heroImg02} alt="" />
                  </div>
               </Col>

               <SearchBar />
            </Row>
         </Container>
      </section>
      {/* ============================================================== */}

      {/* ==================== HERO SECTION START ====================== */}
      <section>
         <Container>
            <Row>
               <Col lg='3'>
                  <h5 className="services__subtitle">Chúng tôi cung cấp</h5>
                  <h2 className="services__title">Chung tôi đem đến những dịch vụ tốt nhất</h2>
               </Col>
               <ServiceList />
            </Row>
         </Container>
      </section>

      {/* ========== FEATURED TOUR SECTION START ========== */}
      <section>
         <Container>
            <Row>
               <Col lg='12' className='mb-5'>
                  <Subtitle subtitle={'Khám phá'} />
                  <h2 className='featured__tour-title'>Các tour nổi bật của chúng tôi</h2>
               </Col>
               <FeaturedTourList />
            </Row>
         </Container>
      </section>
      {/* ========== FEATURED TOUR SECTION END =========== */}

      {/* ========== EXPERIENCE SECTION START ============ */}
      <section>
         <Container>
            <Row>
               <Col lg='6'>
                  <div className="experience__content">
                     <Subtitle subtitle={'Kinh nghiệm'} />
                     <h2>Với tất cả kinh nghiệm của chúng tôi <br /> chúng tôi sẽ phục vụ bạn một cách tốt nhất</h2>
                     <p>Khi bạn bước chân vào TravelWorld, chúng tôi sẽ đưa bạn đến những trải nghiệm không giới hạn. Với nhiều năm hoạt động trong ngành và niềm đam mê, chúng tôi tự hào là người bạn đồng hành đáng tin cậy.
                        <br />
                        <br /> Từ việc lập kế hoạch tỉ mỉ đến việc thăm quan các địa điểm thú vị, chúng tôi sẽ tập trung vào mọi chi tiết nhằm mang đến cho bạn một hành trình không chỉ là du lịch mà còn là một chuyến phiêu lưu đáng nhớ. </p>
                  </div>

                  <div className="counter__wrapper d-flex align-items-center gap-5">
                     <div className="counter__box">
                        <span>12k+</span>
                        <h6>Chuyến đi thành công</h6>
                     </div>
                     <div className="counter__box">
                        <span>2k+</span>
                        <h6>Khách hàng thân thiết</h6>
                     </div>
                     <div className="counter__box">
                        <span>15</span>
                        <h6>Năm kinh nghiệm</h6>
                     </div>
                  </div>
               </Col>
               <Col lg='6'>
                  <div className="experience__img">
                     <img src={experienceImg} alt="" />
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
      {/* ========== EXPERIENCE SECTION END ============== */}

      {/* ========== GALLERY SECTION START ============== */}
      <section>
         <Container>
            <Row>
               <Col lg='12'>
                  <Subtitle subtitle={'Gallery'} />
                  <h2 className="gallery__title">Hình ảnh du lịch của khách hàng <span className='hightlight'>TravelWorld</span></h2>
               </Col>
               <Col lg='12'>
                  <MasonryImagesGallery />
               </Col>
            </Row>
         </Container>
      </section>
      {/* ========== GALLERY SECTION END ================ */}

      {/* ========== TESTIMONIAL SECTION START ================ */}
      <section>
         <Container>
            <Row>
               <Col lg='12'>
                  <Subtitle subtitle={'Tình cảm của khách hàng'} />
                  <h2 className="testimonial__title">Khách hàng nói gì về chúng tôi</h2>
               </Col>
               <Col lg='12'>
                  <Testimonials />
               </Col>
            </Row>
         </Container>
      </section>
      {/* ========== TESTIMONIAL SECTION END ================== */}
      <Newsletter />
     
   </>
}

export default Home