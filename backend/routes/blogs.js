import express from 'express'
import { createBlog, deleteBlog, getAllBlog, getSingleBlog, updateBlog, getBlogCount } from '../controllers/blogController.js'

import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

//Create new blog 
router.post('/', verifyAdmin, createBlog)

//Update blog 
router.put('/:id', verifyAdmin, updateBlog)

//Delete blog 
router.delete('/:id', verifyAdmin, deleteBlog)

//Get single blog 
router.get('/:id', getSingleBlog)

//Get all blog 
router.get('/', getAllBlog)

//get blog count
router.get("/search/getBlogCount", getBlogCount)

export default router