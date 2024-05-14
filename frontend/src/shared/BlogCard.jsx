import React from 'react'
import { Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'
import './blog-card.css'

const BlogCard = ({ blog }) => {

   const { _id, title, photo, createdAt} = blog

   const options = { day: 'numeric', month: 'long', year: 'numeric' }

   return (
        <div className='blog__card'>
            <Card>
                <div className="blog__img">
                <img src={photo} alt="blog-img" />
                </div>

                <CardBody>
                <div className="card__top d-flex align-items-center justify-content-between">
                  <span className="tour__location d-flex align-items-center gap-1">
                    <i class="ri-calendar-line"></i> {new Date(createdAt).toLocaleDateString('en-US', options)}
                  </span>
                </div>
                <h5 className='blog__title'><Link to={`/blog/${_id}`}>{title}</Link></h5>
                
                <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
                  <div className="author__info d-flex align-items-center" style={{ marginTop: '15px' }}>
                      <img className="author__avatar" src="https://i0.wp.com/photoshop.xyz/wp-content/uploads/2022/05/word-image-32.jpeg?resize=500%2C500&ssl=1" alt="Author Avatar" />
                      <span className="author__name" style={{ fontSize: '15px', marginLeft: '8px' }}>Marques Brown</span>
                  </div>
                  <Link to={`/blog/${_id}`}>
                      <button className=' submit__btn'>Đọc thêm</button>
                  </Link>
                </div>
                </CardBody>
            </Card>
        </div>
   )
}

export default BlogCard