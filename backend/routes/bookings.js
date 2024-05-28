import express from 'express'
import { createBooking, deleteBooking, getAllBooking, getBooking, getBookingCount, updateBooking, getBookingPage } from '../controllers/bookingController.js'
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/', verifyUser, createBooking)
router.get('/:id', getBooking)
router.get('/', verifyAdmin, getAllBooking)
router.delete('/:id', verifyAdmin, deleteBooking)
router.put('/:id', verifyAdmin, updateBooking)
router.get('/bookingPage/getBooking', verifyAdmin, getBookingPage)
router.get('/search/getBookingCount', getBookingCount)

export default router