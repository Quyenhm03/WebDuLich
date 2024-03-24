import Blog from "../models/Blog.js"
import Comment from "../models/Comment.js"

export const createComment = async (req,res) => {
   const blogId  = req.params.blogId
   const newComment = new Comment({...req.body}) 
   
   try {
      const savedComment = await newComment.save()

      // after creating a new comment now update the comment array of the tour 
      await Blog.findByIdAndUpdate(blogId, {
         $push: {comments: savedComment._id}
      })

      res.status(200).json({success:true, message:"Comment submitted", data:savedComment})
   } catch (error) {
      res.status(500).json({success:false, message:"Failed to submit"})
   }
}