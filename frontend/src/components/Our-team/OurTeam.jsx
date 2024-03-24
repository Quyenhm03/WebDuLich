import React from 'react'
import Slider from 'react-slick'

const OurTeam = () => {
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
         <div className='d-flex align-items-center gap-4 mt-3'>
            <img src="https://a3travel.webtravel.vn/files/files/member-2.jpg" className='w-50 h-50 rounded-2' alt="" />
            <div>
               <h6 className='mb-0 mt-3'>Hana</h6>
               <p>Account Manager</p>
            </div>
         </div> 
      </div>

      <div className="testimonial py-4 px-3">
         <div className='d-flex align-items-center gap-4 mt-3'>
            <img src="https://a3travel.webtravel.vn/files/files/member-3.jpg" className='w-50 h-50 rounded-2' alt="" />
            <div>
               <h6 className='mb-0 mt-3'>Jean Lemay</h6>
               <p>Office Manager</p>
            </div>
         </div> 
      </div>

      <div className="testimonial py-4 px-3">
         <div className='d-flex align-items-center gap-4 mt-3'>
            <img src="https://a3travel.webtravel.vn/files/files/member-5.jpg" className='w-50 h-50 rounded-2' alt="" />
            <div>
               <h6 className='mb-0 mt-3'>Hostal Miralva</h6>
               <p>Sales Manager</p>
            </div>
         </div> 
      </div>

      <div className="testimonial py-4 px-3">

         <div className='d-flex align-items-center gap-4 mt-3'>
            <img src="https://a3travel.webtravel.vn/files/files/member-1.jpg" className='w-50 h-50 rounded-2' alt="" />
            <div>
               <h6 className='mb-0 mt-3'>Sioma Costa</h6>
               <p>CEO & Founder</p>
            </div>
         </div> 
      </div>
   </Slider>
}

export default OurTeam