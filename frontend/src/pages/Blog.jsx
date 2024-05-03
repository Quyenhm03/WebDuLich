import React, { useState, useEffect } from 'react'
import CommonSection from '../shared/CommonSection'
import '../styles/blog.css'
import BlogCard from './../shared/BlogCard'
import Newsletter from './../shared/Newsletter'
import { Col, Container, Row } from 'reactstrap'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'

const Blog = () => {
   const [pageCount, setPageCount] = useState(0)
   const [page, setPage] = useState(0)

   const { data: blogs, loading, error } = useFetch(`${BASE_URL}/blog?page=${page}`)
   const { data: blogCount } = useFetch(`${BASE_URL}/blog/search/getBlogCount`)

   useEffect(() => {
      const pages = Math.ceil(blogCount / 8)
      setPageCount(pages)
      window.scrollTo(0,0)
   }, [page, blogCount, blogs])

   return (
      <>
         <CommonSection title={"Blog du lịch"} />

         <section className='pt-0'>
            <Container>
               {loading && <h4 className='text-center pt-5'>LOADING..........</h4>}
               {error && <h4 className='text-center pt-5'>{error}</h4>}
               {
                  !loading && !error &&
                  <Row>
                     {
                        blogs?.map(blog => (<Col lg='3' md='6' sm='6' className='mb-4' key={blog._id}> <BlogCard blog={blog} /> </Col>))
                     }

                     <Col lg='12'>
                        <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                           {[...Array(pageCount).keys()].map(number => (
                              <span key={number} onClick={() => setPage(number)}
                                 className={page === number ? 'active__page' : ''}
                              >
                                 {number + 1}
                              </span>
                           ))}
                        </div>
                     </Col>
                  </Row>
               }
            </Container>
         </section>
         <Newsletter />
      </>
   )
}

export default Blog