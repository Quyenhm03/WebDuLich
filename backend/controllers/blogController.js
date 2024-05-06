import Blog from '../models/Blog.js'

//Create new blog
export const createBlog = async (req, res) => {
   const newBlog = new Blog(req.body)

   try {
      const savedBlog = await newBlog.save()
    
      res.status(200).json({ success: true, message: 'Successfully created', data: savedBlog })
      // console.log(data)
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to create. Try again!' })
   }
}

//Update Blog
export const updateBlog = async (req, res) => {
   const id = req.params.id

   try {
      const updatedBlog = await Blog.findByIdAndUpdate(id, {
         $set: req.body
      }, { new: true })

      res.status(200).json({ success: true, message: 'Successfully updated', data: updatedBlog })
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to update' })
   }
}

//Delete Blog
export const deleteBlog = async (req, res) => {
   const id = req.params.id

   try {
      await Blog.findByIdAndDelete(id)

      res.status(200).json({ success: true, message: 'Successfully deleted' })
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to delete' })
   }
}

//Getsingle Blog
export const getSingleBlog = async (req, res) => {
   const id = req.params.id

   try {
      const blog = await Blog.findById(id).populate('comments')

      res.status(200).json({ success: true, message: 'Successfully', data: blog })
   } catch (error) {
      res.status(404).json({ success: false, message: 'Not Found' })
   }
}

//Get All Blog
export const getAllBlog = async (req, res) => {
   //For pagination
   const page = parseInt(req.query.page)

   //console.log(page)

   try {
      const blogs = await Blog.find({}).populate('comments').skip(page * 8).limit(8)

      res.status(200).json({ success: true, count: blogs.length, message: 'Successfully', data: blogs })
   } catch (error) {
      res.status(404).json({ success: false, message: 'Not Found' })
   }
}

//Get blog count 
export const getBlogCount = async(req,res) => {
   try {
      const blogCount = await Blog.estimatedDocumentCount()

      res.status(200).json({success:true, data:blogCount})
   } catch (error) {
      res.status(500).json({success:false, message: "Failed to fetch"})
   }
}