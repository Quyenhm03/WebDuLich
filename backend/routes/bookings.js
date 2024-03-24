import express from 'express'
import { createBooking, deleteBooking, getAllBooking, getBooking, getBookingCount, updateBooking } from '../controllers/bookingController.js'
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/', verifyUser, createBooking)
router.get('/:id', getBooking)
router.get('/', getAllBooking)
router.delete('/:id', deleteBooking)
router.put('/:id', updateBooking)
router.get('/search/getBookingCount', getBookingCount)

export default router
