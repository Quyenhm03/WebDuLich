import express from 'express'
import { login, register, google } from '../controllers/authController.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/google', google)


export default router