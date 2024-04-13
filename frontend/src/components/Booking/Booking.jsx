import React, { useState, useContext } from 'react'
import './booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap'

import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL } from '../../utils/config'

const Booking = ({ tour, avgRating }) => {
   const navigate = useNavigate()

   const { user } = useContext(AuthContext)

   const [booking, setBooking] = useState({
      userId: user && user._id,
      userEmail: user && user.email,
      tourName: tour.title,
      tourPrice: tour.price,
      fullName: '',
      phone: '',
      guestSize: 1,
      bookAt: ''
   })

   const handleChange = e => {
      setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }))
   }

   const serviceFee = 10
   const totalAmount = Number(booking.tourPrice) * Number(booking.guestSize) + Number(serviceFee)

   const handleClick = async e => {
      e.preventDefault()
      console.log(booking)

      try {
         if (!user || user === undefined || user === null) {
            return alert('Please sign in')
         }

         if(booking.fullName != '' && booking.phone != '' && booking.bookAt != ''){
            const res = await fetch(`${BASE_URL}/booking`, {
               method: 'post',
               headers: {
                  'content-type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
               },
               credentials: 'include',
               body: JSON.stringify(booking)
            })

            const result = await res.json()

            if(!res.ok) {
               return alert(result.message)
            }
            navigate('/thank-you')

            //send email
            const email = {booking: booking, serviceFee: serviceFee, totalAmount: totalAmount}
            console.log(email)
            const eres = await fetch(`${BASE_URL}/sendEmail`, {
               method: 'post',
               headers: {
                  'content-type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
               },
               credentials: 'include',
               body: JSON.stringify(email)
            })

            const eresult = await eres.json()

            if(!eres.ok) {
               return alert(eresult.message)
            }
         } else {
            return alert('Please fill out the form!')
         }

      } catch (error) {
         alert(error.message)
      }   
   }

   const handlePayClick = async e => {
      e.preventDefault()
      // console.log(booking)

      try {
         if (!user || user === undefined || user === null) {
            return alert('Please sign in')
         }

         const payment = {booking: booking, totalAmount: totalAmount}
         // console.log(payment)
         const res = await fetch(`${BASE_URL}/pay`, {
            method: 'post',
            // mode: 'no-cors',
            headers: {
               'Access-Control-Allow-Origin': '*',
               'content-type': 'application/json',
               'Authorization': `Bearer ${localStorage.getItem('token')}`,
               
            },
            credentials: 'include',
            body: JSON.stringify(payment)
         })

         // console.log(payment)
         const result = await res.json()

         if(!res.ok) {
            return alert(result.message)
         }
         window.location = result.forwardLink
         // navigate('/thank-you')

      } catch (error) {
         alert(error.message)
      }   
   }

   return (
      <div className='booking'>
         <div className="booking__top d-flex align-items-center justify-content-between">
            <h3>${booking.tourPrice} <span>/per person</span></h3>
            <span className="tour__rating d-flex align-items-center">
               <i class='ri-star-fill' style={{ 'color': 'var(--secondary-color)' }}></i>
               {avgRating === 0 ? null : avgRating} ({tour.reviews?.length})
            </span>
         </div>

         {/* =============== BOOKING FORM START ============== */}
         <div className="booking__form">
            <h5>Information</h5>
            <Form className='booking__info-form' onSubmit={handleClick}>
               <FormGroup>
                  <input type="text" placeholder='Full Name' id='fullName' required
                     onChange={handleChange} />
               </FormGroup>
               <FormGroup>
                  <input type="tel" placeholder='Phone' id='phone' required
                     onChange={handleChange} />
               </FormGroup>
               <FormGroup className='d-flex align-items-center gap-3'>
                  <input type="date" placeholder='' id='bookAt' required
                     onChange={handleChange} />
                  <input type="number" placeholder='Guest' id='guestSize' required
                     onChange={handleChange} />
               </FormGroup>
            </Form>
         </div>
         {/* =============== BOOKING FORM END ================ */}


         {/* =============== BOOKING BOTTOM ================ */}
         <div className="booking__bottom">
            <ListGroup>
               <ListGroupItem className='border-0 px-0'>
                  <h5 className='d-flex align-items-center gap-1'>${booking.tourPrice} <i class='ri-close-line'></i> 1 person</h5>
                  <span> ${booking.tourPrice}</span>
               </ListGroupItem>
               <ListGroupItem className='border-0 px-0'>
                  <h5>Service charge</h5>
                  <span>${serviceFee}</span>
               </ListGroupItem>
               <ListGroupItem className='border-0 px-0 total'>
                  <h5>Total</h5>
                  <span>${totalAmount}</span>
               </ListGroupItem>
            </ListGroup>
            <Button className='btn primary__btn w-100 mt-4' onClick={handlePayClick}>Booking with Paypal</Button>
            <span className='centered-text'>or</span>
            <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>Booking with Email</Button>
         </div>
      </div>
   )
}

export default Booking