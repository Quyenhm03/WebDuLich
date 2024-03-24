import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ThankYou from '../pages/ThankYou'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import SearchResultList from '../pages/SearchResultList'
import TourDetails from '../pages/TourDetails'
import Tours from '../pages/Tours'
import About from '../pages/About'
import Blog from '../pages/Blog'
import BlogDetails from '../pages/BlogDetails'
import DashboardUploadTour from '../dashboard/DashboardUploadTour'
import UploadBlog from '../dashboard/UploadBlog'
import EditTour from '../dashboard/EditTour'
import EditBlog from '../dashboard/EditBlog'
import EditBooking from '../dashboard/EditBooking'
import ManageTour from '../dashboard/ManageTour'
import ManageBlog from '../dashboard/ManageBlog'
import ManageUser from '../dashboard/ManageUser'
import Dashboard from '../dashboard/Dashboard'
import ManageBooking from '../dashboard/ManageBooking'

const Routers = () => {
   return (
      <Routes>
         <Route path='/' element={<Navigate to='/home'/>} />
         <Route path='/home' element={<Home/>} />
         <Route path='/about' element={<About/>} />
         <Route path='/tours' element={<Tours/>} />
         <Route path='/tours/:id' element={<TourDetails/>} />
         <Route path='/login' element={<Login/>} />
         <Route path='/register' element={<Register/>} />
         <Route path='/thank-you' element={<ThankYou/>} />
         <Route path='/blog' element={<Blog/>} />
         <Route path='/blog/:id' element={<BlogDetails/>} />
         <Route path='/admin/dashboard' element={<Dashboard/>} />
         <Route path='/admin/dashboard/uploadtour' element={<DashboardUploadTour/>} />
         <Route path='/admin/dashboard/uploadblog' element={<UploadBlog/>} />
         <Route path='/admin/dashboard/managetour' element={<ManageTour/>} />
         <Route path='/admin/dashboard/manageblog' element={<ManageBlog/>} />
         <Route path='/admin/dashboard/edittour/:id' element={<EditTour/>} />
         <Route path='/admin/dashboard/editblog/:id' element={<EditBlog/>} />
         <Route path='/admin/dashboard/editbooking/:id' element={<EditBooking/>} />
         <Route path='/admin/dashboard/manageuser' element={<ManageUser/>} />
         <Route path='/admin/dashboard/managebooking' element={<ManageBooking/>} />
         <Route path='/tours/search' element={<SearchResultList/>} />
      </Routes>
   )
}

export default Routers
