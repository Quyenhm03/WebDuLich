import React from 'react'
import SideBar from './SideBar'
import { Container, Row, Col } from 'reactstrap'
import { FaRegCalendarMinus, FaEllipsisV } from "react-icons/fa"
import { FaUser } from "react-icons/fa6";
import { MdOutlineTour } from "react-icons/md";
import { BASE_URL } from '../utils/config'
import UseFetch from '../hooks/useFetch'

const Dashboard = () => {
    const { data: tourCount } = UseFetch(`${BASE_URL}/tours/search/getTourCount`)
    const { data: userCount } = UseFetch(`${BASE_URL}/users/search/getUserCount`)
    const { data: bookingCount } = UseFetch(`${BASE_URL}/booking/search/getBookingCount`)
    const { data: bookings } = UseFetch(`${BASE_URL}/booking`)
    const total = bookings.map(booking => {
        return booking.tourPrice*booking.guestSize + 10;
    }).reduce((acc, cur) => acc+cur, 0)  

  return (
    <section>
        <Container>
            <Row>
                <Col lg='3'>
                    <SideBar/>
                </Col>
                <Col>
                    <h5> Welcome manager!</h5>
                    <div className='grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]'>
                        <div className=' h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#F6C23E] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                            <div>
                                <h2 className='text-[11px] leading-[17px] font-bold'>REVENUE</h2>
                                <h1 className='text-[20px] leading-[24px] font-bold mt-[5px]'>${total}</h1>
                            </div>
                            <FaRegCalendarMinus fontSize={28} color="" />

                        </div>
                        <div className=' h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#F6C23E] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                            <div>
                                <h2 className=' text-[11px] leading-[17px] font-bold'>
                                    TOURS</h2>
                                <h1 className='text-[20px] leading-[24px] font-bold mt-[5px]'>{tourCount}</h1>
                            </div>
                            <MdOutlineTour fontSize={28} />
                        </div>
                        <div className=' h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#F6C23E] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                            <div>
                                <h2 className=' text-[11px] leading-[17px] font-bold'>USER </h2>
                                <h1 className='text-[20px] leading-[24px] font-bold mt-[5px]'>{userCount}</h1>
                            </div>
                            <FaUser fontSize={28} />
                        </div>
                        <div className=' h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#F6C23E] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                            <div>
                                <h2 className=' text-[11px] leading-[17px] font-bold'>BOOKINGS</h2>
                                <h1 className='text-[20px] leading-[24px] font-bold mt-[5px]'>{bookingCount}</h1>
                            </div>
                            <FaRegCalendarMinus fontSize={28} />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Dashboard