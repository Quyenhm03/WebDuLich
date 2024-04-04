import express  from "express";
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from "cookie-parser";
import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/reviews.js'
import bookingRoute from './routes/bookings.js'
import commentRoute from './routes/comments.js'
import blogRoute from './routes/blogs.js'
import sendEmailRoute from './routes/sendEmail.js'

dotenv.config()
const app = express()
const port = process.env.PORT
const corsOptions = {
   origin: ['https://webdulich.onrender.com', 'https://webdulich-fe.onrender.com'],
   credentials: true
}

mongoose.set("strictQuery", false)
const connect = async() => {
   try {
      await mongoose.connect(process.env.MONGO_URI)

      console.log('MongoDB connected')
   } catch (error) {
      console.log('MongoDB connected failed')
   }
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/tours", tourRoute)
app.use("/api/v1/users", userRoute)
app.use("/api/v1/review", reviewRoute)
app.use("/api/v1/booking", bookingRoute)
app.use("/api/v1/comment", commentRoute)
app.use("/api/v1/blog", blogRoute)
app.use("/api/v1/sendEmail", sendEmailRoute)
app.use((req, res) => {
   return res.send('404 not found')
})

app.listen(port, () => {
   connect()
   console.log('server listening on port', port)
})