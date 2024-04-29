import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from 'reactstrap'
import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData = [
   {
      imgUrl: weatherImg,
      title: `Dự báo thời tiết`,
      desc: `Chúng tôi tự hào cung cấp cho bạn thông tin dự báo thời tiết chính xác và chi tiết cho mọi điểm đến.`,
   },
   {
      imgUrl: guideImg,
      title: `Hướng dẫn viên du lịch tốt nhất`,
      desc: `Chúng tôi tự hào là đội ngũ các chuyên gia du lịch đầy nhiệt huyết và kinh nghiệm sẵn sàng đưa bạn vào những hành trình đáng nhớ.`,
   },
   {
      imgUrl: customizationImg,
      title: 'Cá nhân hóa',
      desc: `Chúng tôi hiểu rằng mỗi người có những nhu cầu và sở thích riêng. Vì vậy, chúng tôi cam kết mang đến cho bạn trải nghiệm phù hợp nhất.`,
   },
]

const ServiceList = () => {
   return <>
      {
         servicesData.map((item, index) => (
            <Col lg='3' md='6' sm='12' className='mb-4' key={index}>
               <ServiceCard item={item} />
            </Col>))
      }
   </>

}

export default ServiceList