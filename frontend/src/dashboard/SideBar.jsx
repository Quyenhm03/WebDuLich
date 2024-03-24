import React from 'react'
import { MdManageAccounts,  MdDashboard, MdFileUpload  } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { BsDatabaseFillGear, BsPostcardFill, BsSuitcase2Fill   } from "react-icons/bs";
import './side-bar.css'
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className='sidebar__dashboard'>
      <div className='px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[--secondary-color]'>
        <h1 className='text-[20px] leading-[24px] cursor-pointer font-bold'>Admin panel</h1>
      </div>
      <div className='flex items-center gap-[10px] py-[15px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
        <MdDashboard/>
        <Link to="/admin/dashboard" className='text-[15px] leading-[15px] no-underline text-black'>
          Dashboard
        </Link>
      </div>
      <div className='flex items-center gap-[10px] py-[15px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
        <MdFileUpload/>
        <Link to="/admin/dashboard/uploadtour" className='text-[15px] leading-[15px] no-underline text-black'>
          Upload Tour
        </Link>
      </div>
      <div className='flex items-center gap-[10px] py-[15px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
        <FaFileUpload/>
        <Link to="/admin/dashboard/uploadblog" className='text-[15px] leading-[15px] no-underline text-black'>
          Upload Blog
        </Link>
      </div>
      <div className='flex items-center gap-[10px] py-[15px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
        <BsDatabaseFillGear/>
        <Link to="/admin/dashboard/managetour" className='text-[15px] leading-[15px] no-underline text-black'>
          Manage Tours
        </Link>
      </div>
      <div className='flex items-center gap-[10px] py-[15px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
        <BsPostcardFill/>
        <Link to="/admin/dashboard/manageblog" className='text-[15px] leading-[15px] no-underline text-black'>
          Manage Blogs
        </Link>
      </div>
      <div className='flex items-center gap-[10px] py-[15px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
        <BsSuitcase2Fill/>
        <Link to="/admin/dashboard/managebooking" className='text-[15px] leading-[15px] no-underline text-black'>
          Manage Bookings
        </Link>
      </div>
      <div className='flex items-center gap-[10px] py-[15px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
        <MdManageAccounts/>
        <Link to="/admin/dashboard/manageuser" className='text-[15px] leading-[15px] no-underline text-black'>
          Users
        </Link>
      </div>
    </div>
  )
}

export default SideBar
