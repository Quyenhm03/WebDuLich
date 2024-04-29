import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'reactstrap'
import SideBar from './SideBar'
import { Button, Table } from 'flowbite-react'
import { BASE_URL } from '../utils/config'
import UseFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'

const ManageBooking = () => {
    const [pageCount, setPageCount] = useState(0)
    const [page, setPage] = useState(0)

    const { data: bookings } = UseFetch(`${BASE_URL}/booking?page=${page}`)
    const { data: bookingCount } = UseFetch(`${BASE_URL}/booking/search/getBookingCount`)

    useEffect(() => {
        const pages = Math.ceil(bookingCount / 8)
        setPageCount(pages)
        window.scrollTo(0,0)
     }, [page, bookingCount, bookings])

     const handleDelete = async (id) => {
        try {
          const res = await fetch(`${BASE_URL}/booking/${id}`, {
            method: 'delete',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: 'include'
          });
      
          if (!res.ok) {
            const result = await res.json();
            return alert(result.message);
          }
          return alert("Xóa thành công!")
        } catch (error) {
          alert(error.message);
        }
      };

  return (
    <>
    
    <section>
        <Container>
            <Row>
                <Col lg='3'>
                    <SideBar/>
                </Col>
                <Col className='sidebar__dashboard' lg='9'>
                    <h5>Quản lý Booking</h5>
                    <div className="overflow-x-auto">
                        <Table hoverable>
                            <Table.Head>
                            <Table.HeadCell>Tên tour</Table.HeadCell>
                            <Table.HeadCell>Họ tên</Table.HeadCell>
                            <Table.HeadCell>Số lượng</Table.HeadCell>
                            <Table.HeadCell>Số điện thoại</Table.HeadCell>
                            <Table.HeadCell>Đặt vào</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Sửa hoặc xóa</span>
                            </Table.HeadCell>
                            </Table.Head>
                           
                            <Table.Body className="divide-y">
                            {
                                bookings?.map(booking => (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={booking._id}>
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {booking.tourName}
                                        </Table.Cell>
                                        <Table.Cell>{booking.fullName}</Table.Cell>
                                        <Table.Cell>{booking.guestSize}</Table.Cell>
                                        <Table.Cell>{booking.phone}</Table.Cell>
                                        <Table.Cell>{booking.bookAt}</Table.Cell>
                                        <Table.Cell>
                                        <Table.Cell>
                                            <Link to={`/admin/dashboard/editbooking/${booking._id}`}>Sửa</Link>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button onClick={() => handleDelete(booking._id)}>Xóa</Button>
                                        </Table.Cell>
                                        </Table.Cell>
                                    </Table.Row>
                                ))

                            }
                            </Table.Body>
                        </Table>
                    </div>
                    
                </Col>
                
            </Row>
            <Row>
                <Col lg='12'>
                    <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                        {[...Array(pageCount).keys()].map(number => (
                            <span key={number} onClick={() => setPage(number)}
                                className={page === number ? 'active__page' : ''}
                            >
                                {number + 1}
                            </span>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
    
</>
  )
}

export default ManageBooking