import express from 'express'
import { createComment } from '../controllers/commentController.js'
import { verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/:blogId', verifyUser, createComment)

export default router