import React from 'react'
import Slider from 'react-slick'
import ava01 from '../../assets/images/ava-1.jpg'
import ava02 from '../../assets/images/ava-2.jpg'
import ava03 from '../../assets/images/ava-3.jpg'

const Testimonials = () => {
   const settings = {
      dots:true,
      infinite:true,
      autoplay:true,
      speed:1000,
      swipeToSlide:true,
      autoplaySpeed:2000,
      slidesToShow:3,

      responsive: [
         {
            breakpoint: 992,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
               infinite: true,
               dots: true,
            },
            breakpoint: 576,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               infinite: true,
               dots: true,
            },
         }
      ]
   }

   return <Slider {...settings}>
      <div className="testimonial py-4 px-3">
         <p>TravleWorld thực sự đã làm cho hành trình của tôi trở nên thú vị hơn. Họ đã mang đến cho chúng tôi một chuyến đi
            với những cảnh quan và hoạt động thú vị. Đội ngũ hướng dẫn viên tận tình và kiến thức sâu rộng đã giúp cho chuyến đi 
            trở nên dễ dàng hơn.
         </p>

         <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava01} className='w-25 h-25 rounded-2' alt="" />
            <div>
               <h6 className='mb-0 mt-3'>John Doe</h6>
               <p>Khách hàng</p>
            </div>
         </div> 
      </div>

      <div className="testimonial py-4 px-3">
         <p>Chuyến du lịch của chúng tôi đã thực sự là một trải nghiệm đáng nhớ.
            Từ việc lên kế hoạch tỉ mỉ đến việc hướng dẫn chi tiết, chúng tôi cảm nhận được sự tận tâm và chuyên nghiệp.
         </p>

         <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava02} className='w-25 h-25 rounded-2' alt="" />
            <div>
               <h6 className='mb-0 mt-3'>Lia Franklin</h6>
               <p>Khách hàng</p>
            </div>
         </div> 
      </div>

      <div className="testimonial py-4 px-3">
         <p>Tôi đã đi nhiều nơi, trải nghiệm nhiều dịch vụ du lịch, nhưng chưa bao giờ gặp một đội ngũ hướng dẫn viên tận tình như TravelWorld.
            Họ luôn tạo cho tôi cảm giác vui vẻ, hứng thú và luôn sẵn sàng chia sẻ những điều thú vị, bổ ích.
         </p>

         <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava03} className='w-25 h-25 rounded-2' alt="" />
            <div>
               <h6 className='mb-0 mt-3'>John Doe</h6>
               <p>Khách hàng</p>
            </div>
         </div> 
      </div>

      <div className="testimonial py-4 px-3">
         <p>Tôi đã đi nhiều nơi, trải nghiệm nhiều dịch vụ du lịch, nhưng chưa bao giờ gặp một đội ngũ hướng dẫn viên tận tình như TravelWorld.
            Họ luôn tạo cho tôi cảm giác vui vẻ, hứng thú và luôn sẵn sàng chia sẻ những điều thú vị, bổ ích.
         </p>

         <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava03} className='w-25 h-25 rounded-2' alt="" />
            <div>
               <h6 className='mb-0 mt-3'>John Doe</h6>
               <p>Khách hàng</p>
            </div>
         </div> 
      </div>
   </Slider>
}

export default Testimonials