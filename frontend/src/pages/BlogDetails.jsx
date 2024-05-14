import React, { useState, useRef, useEffect, useContext } from 'react'
import '../styles/blog-details.css'
import { Container, Row, Col, Form, ListGroup } from 'reactstrap'
import { useParams } from 'react-router-dom'
import avatar from '../assets/images/avatar.jpg'
import Newsletter from '../shared/Newsletter'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'
import { AuthContext } from '../context/AuthContext'
import SideBar from '../components/Side-bar/sideBar'

const BlogDetails = () => {
   const { id } = useParams()
   const commentMsgRef = useRef('')
   const { user } = useContext(AuthContext)

   // fetch data from database
   const { data: blog, loading, error } = useFetch(`${BASE_URL}/blog/${id}`)

   const { photo, title, content, comments, createdAt } = blog

   const options = { day: 'numeric', month: 'long', year: 'numeric' }

   const submitHandler = async e => {
      e.preventDefault()
      const commentText = commentMsgRef.current.value

      try {
         if (!user || user === undefined || user === null) {
            alert('Vui lòng đăng nhập!')
         }
         const commentObj = {
            username: user?.username,
            commentText,
         }

         const res = await fetch(`${BASE_URL}/comment/${id}`, {
            method: 'post',
            headers: {
               'content-type': 'application/json',
               'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: 'include',
            body: JSON.stringify(commentObj)
         })

         const result = await res.json()
         if (!res.ok) {
            return alert(result.message)
         }
         alert(result.message)
      } catch (error) {
         alert(error.message)
      }
   }

   useEffect(() => {
      window.scrollTo(0, 0)
   }, [blog])

   return (
      <section>
         <Container>
            {loading && <h4 className='text-center pt-5'>LOADING.........</h4>}
            {error && <h4 className='text-center pt-5'>{error}</h4>}
            {
               !loading && !error &&
               <Row>
                  <Row>
                     {/* <div className='photo-container'> */}
                        <div className="travel__blog-dt">
                           <img className="photo__blog" src={photo} alt="" />
                           <div className='set__bg'>
                              <h1>{title}</h1>
                              <span>Marques Brown | {new Date(createdAt).toLocaleDateString('en-US', options)}</span> 
                           </div>
                        </div>
                     {/* </div> */}
                  </Row>
                  <Col lg='8'>
                    
                     <div className="blog__content">
                        {/* <img src={photo} alt="" /> */}
                        
                        <br/>
                        <br/>
                        <div className="blog__info">
                           
                           <div className='content'>
                            {
                                content?.map(icontent => (
                                    <div>
                                        <h2>{icontent.paraTitle}</h2>
                                        <p>{icontent.desc}</p>
                                    </div>
                                ))
                            }                  
                           </div>
                        </div>
                        {/* <div className='source' style={{ textAlign: 'right'}}>
                           <p>Travel World tổng hợp</p>
                        </div> */}
                       
                        <div className="blog__comment mt-4">
                           <h4>Bình luận ({comments?.length} bình luận)</h4>

                           <Form onSubmit={submitHandler}>
                              <div className="comment__input">
                                 <input type="text" ref={commentMsgRef} placeholder='Chia sẻ suy nghĩ của bạn' required />
                                 <button className='btn primary__btn text-white' type='submit'>
                                    Gửi
                                 </button>
                              </div>
                           </Form>

                           <ListGroup className='user__comment'>
                              {
                                 comments?.map(comment => (
                                    <div className="comment__item">
                                       <img src={avatar} alt="" />

                                       <div className="w-100">
                                          <div className="d-flex align-items-center justify-content-between">
                                             <div>
                                                <h5>{comment.username}</h5>
                                                <p>{new Date(comment.createdAt).toLocaleDateString('en-US', options)}</p>
                                             </div>
                                          </div>

                                          <h6>{comment.commentText}</h6>
                                       </div>
                                    </div>
                                 ))
                              }
                           </ListGroup>
                        </div>
                        
                     </div>
                  </Col>
                  <Col lg='3'>
                    <SideBar />
                  </Col>
               </Row>
            }
         </Container>
         <Newsletter />
      </section>

   )
}

export default BlogDetails