import express from 'express'
import { pay, payCancel, paySuccess } from '../controllers/payController.js'

const router = express.Router()

router.post('/', pay)
router.get('/success', paySuccess)
router.get('/cancel', payCancel)


export default router