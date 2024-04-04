import express from 'express'
import { deleteUser, getAllUser, getSingleUser, getUserCount, updateUser } from '../controllers/userController.js'

import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

//Update user
router.put('/:id', verifyUser, updateUser)

//Delete user
router.delete('/:id', verifyAdmin, deleteUser)

//Get single user
router.get('/:id', verifyUser, getSingleUser)

//Get all user
router.get('/', verifyAdmin, getAllUser)

//Get user count
router.get('/search/getUserCount', getUserCount)


export default router