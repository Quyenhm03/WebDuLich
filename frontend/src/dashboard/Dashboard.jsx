import React from 'react'
import SideBar from './SideBar'
import { Container, Row, Col } from 'reactstrap'
import { FaRegCalendarMinus } from "react-icons/fa"
import { FaUser } from "react-icons/fa6";
import { MdOutlineTour } from "react-icons/md";
import { BASE_URL } from '../utils/config'
import UseFetch from '../hooks/useFetch'
import { Table } from 'flowbite-react'
import ColumnChart from './ColumnChart'


const Dashboard = () => {
    const { data: tourCount } = UseFetch(`${BASE_URL}/tours/search/getTourCount`)
    const { data: userCount } = UseFetch(`${BASE_URL}/users/search/getUserCount`)
    const { data: bookingCount } = UseFetch(`${BASE_URL}/booking/search/getBookingCount`)
    const { data: bookings } = UseFetch(`${BASE_URL}/booking`)
    const total = bookings?.map(booking => {
        return booking.tourPrice*booking.guestSize + 10;
    }).reduce((acc, cur) => acc+cur, 0) 
    
    // Đếm số lượng đặt tour cho từng tour
    const tourCounts = {};
    bookings?.forEach(booking => {
    const { tourName } = booking;
    if (tourCounts[tourName]) {
        tourCounts[tourName]++;
    } else {
        tourCounts[tourName] = 1;
    }
    });

    // Chuyển đổi đối tượng đếm thành mảng các cặp tên tour và số lượng đặt
    const tourCountsArray = Object.entries(tourCounts);

    tourCountsArray.sort((a, b) => b[1] - a[1]);

    const popularTours = tourCountsArray.slice(0, 5);

  return (
    <section>
        <Container>
            <Row>
                <Col lg='3'>
                    <SideBar/>
                </Col>
                <Col>
                    <h5> Xin chào quản lý!</h5>
                    <div className='grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]'>
                        <div className=' h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#F6C23E] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                            <div>
                                <h2 className='text-[11px] leading-[17px] font-bold'>DOANH THU</h2>
                                <h1 className='text-[20px] leading-[24px] font-bold mt-[5px]'>${total}</h1>
                            </div>
                            <FaRegCalendarMinus fontSize={28} color="" />

                        </div>
                        <div className=' h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#F6C23E] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                            <div>
                                <h2 className=' text-[11px] leading-[17px] font-bold'>
                                    SỐ LƯỢNG TOUR</h2>
                                <h1 className='text-[20px] leading-[24px] font-bold mt-[5px]'>{tourCount}</h1>
                            </div>
                            <MdOutlineTour fontSize={28} />
                        </div>
                        <div className=' h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#F6C23E] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                            <div>
                                <h2 className=' text-[11px] leading-[17px] font-bold'>SỐ LƯỢNG TÀI KHOẢN </h2>
                                <h1 className='text-[20px] leading-[24px] font-bold mt-[5px]'>{userCount}</h1>
                            </div>
                            <FaUser fontSize={28} />
                        </div>
                        <div className=' h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#F6C23E] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                            <div>
                                <h2 className=' text-[11px] leading-[17px] font-bold'>SỐ LƯỢNG ĐẶT TOUR</h2>
                                <h1 className='text-[20px] leading-[24px] font-bold mt-[5px]'>{bookingCount}</h1>
                            </div>
                            <FaRegCalendarMinus fontSize={28} />
                        </div>
                    </div>
                    <br/>
                    <Row>
                    <Col lg='6'>
                        <h5>Top 5 tour được đặt nhiều nhất</h5>
                        <br/>
                        <div className="overflow-x-auto">
                            <Table hoverable>
                                <Table.Head>
                                <Table.HeadCell>Tiêu đề</Table.HeadCell>
                                <Table.HeadCell>Số lượt đặt</Table.HeadCell>
                                </Table.Head>
                            
                                <Table.Body className="divide-y">
                                {
                                    popularTours?.map(tour => (
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={tour[0]}>
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {tour[0]}
                                            </Table.Cell>
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {tour[1]}
                                            </Table.Cell>
                                            
                                        </Table.Row>
                                    ))

                                }
                                </Table.Body>
                            </Table>
                            
                        </div>
                    </Col>
                    <Col lg='6'>
                        <ColumnChart />
                    </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Dashboard