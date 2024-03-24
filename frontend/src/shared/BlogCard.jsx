import React from 'react'
import { Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'
import './blog-card.css'

const BlogCard = ({ blog }) => {

   const { _id, title, content, photo, comments, postAt} = blog

   return (
        <div className='blog__card'>
            <Card>
                <div className="blog__img">
                <img src={photo} alt="blog-img" />
                </div>

                <CardBody>
                <h5 className='blog__title'><Link to={`/blog/${_id}`}>{title}</Link></h5>

                <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
                        <Link to={`/blog/${_id}`}>
                            <button className=' submit__btn'>Read more</button>
                        </Link>
                </div>
                </CardBody>
            </Card>
        </div>
   )
}

export default BlogCard