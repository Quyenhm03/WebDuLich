import React, { useState} from 'react'
import SideBar from './SideBar'
import { Container, Row, Col, Form, FormGroup, Button, ListGroup, ListGroupItem, } from 'reactstrap'
import { BASE_URL } from './../utils/config.js'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch.js'

const EditBooking = () => {
    const {id} = useParams()
    const {data: booking} = useFetch(`${BASE_URL}/booking/${id}`)
    const [bookingup, setBookingUp] = useState(booking)

    console.log(booking)
    const serviceFee = 10
    let totalAmount = Number(booking.tourPrice) * Number(booking.guestSize) + Number(serviceFee)

    const handleChange = e => {
        setBookingUp(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleClick = async e => {
        e.preventDefault()
        // console.log(bookingup)
  
        try {
  
           const res = await fetch(`${BASE_URL}/booking/${id}`, {
              method: 'put',
              headers: {
                 'content-type': 'application/json',
                 'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              credentials: 'include',
              body: JSON.stringify(bookingup)
           })
  
           const result = await res.json()
  
           if(!res.ok) {
              return alert(result.message)
           }
           totalAmount = Number(booking.tourPrice) * Number(bookingup.guestSize) + Number(serviceFee)

           return alert("Cập nhật thành công!")

        } catch (error) {
           alert(error.message)
        }   
    }
    
    // const serviceFee = 10
    // const totalAmount = Number(booking.tourPrice) * Number(booking.guestSize) + Number(serviceFee)
  return (
    <>
        <section>
            <Container>
                <Row>
                    <Col lg='3'>
                        <SideBar/>
                    </Col>
                    <Col className='sidebar__dashboard' onSubmit={handleClick}>
                        <div className="contact__form">
                        <h5>Sửa booking</h5>
                        <Form className='contact__info-form'>
                            <FormGroup>
                                <input type="text" placeholder='Tên tour' id='tourName' defaultValue={booking.tourName} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="text" placeholder='Họ tên' id='fullName' defaultValue={booking.fullName} onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="number" placeholder='Số lượng khách' id='guestSize' defaultValue={booking.guestSize} onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="number" placeholder='Số điện thoại' id='phone' defaultValue={booking.phone} onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="text" placeholder='Đặt vào' id='bookAt' defaultValue={booking.bookAt} onChange={handleChange} required/>
                            </FormGroup>
                            <div className="booking__bottom">
                                <ListGroup>
                                <ListGroupItem className='border-0 px-0'>
                                    <h5 className='d-flex align-items-center gap-1'>Giá <i class='ri-close-line'></i> 1 người</h5>
                                    <span> ${booking.tourPrice}</span>
                                </ListGroupItem>
                                <ListGroupItem className='border-0 px-0'>
                                    <h5>Phí dịch vụ</h5>
                                    <span>${serviceFee}</span>
                                </ListGroupItem>
                                <ListGroupItem className='border-0 px-0 total'>
                                    <h5>Tổng</h5>
                                    <span>${totalAmount}</span>
                                </ListGroupItem>
                                </ListGroup>
                            </div>
                            <FormGroup>
                                <div className="contact__button">
                                    <Button className='btn primary__btn w-25'  onSubmit={handleClick}>Lưu</Button>
                                </div>
                            </FormGroup>
                        </Form>
                        
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default EditBooking