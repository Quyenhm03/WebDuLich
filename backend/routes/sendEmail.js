import express from 'express'
import { sendEmail } from '../controllers/sendEmailController.js'
import { verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/', verifyUser, sendEmail)

export default router