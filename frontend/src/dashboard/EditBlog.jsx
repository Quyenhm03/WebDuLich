import React, { useState} from 'react'
import SideBar from './SideBar'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import { BASE_URL } from './../utils/config.js'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch.js'

const EditBlog = () => {
    const {id} = useParams()
    const {data: blog} = useFetch(`${BASE_URL}/blog/${id}`)
    const [blogup, setBlogUp] = useState(blog)

    console.log(blog)
  
    const handleChange = e => {
        setBlogUp(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

     const handleClick = async e => {
        e.preventDefault()
        console.log(blog)
  
        try {
  
           const res = await fetch(`${BASE_URL}/blog/${id}`, {
              method: 'put',
              headers: {
                 'content-type': 'application/json',
                 'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              credentials: 'include',
              body: JSON.stringify(blogup)
           })
  
           const result = await res.json()
  
           if(!res.ok) {
              return alert(result.message)
           }
           return alert("Cập nhật thành công!")
        } catch (error) {
           alert(error.message)
        }   
     }
  
  return (
    <>
        <section>
            <Container>
                <Row>
                    <Col lg='3'>
                        <SideBar/>
                    </Col>
                    <Col className='sidebar__dashboard' onSubmit={handleClick}>
                        <div className="contact__form">
                        <h5>Sửa blog</h5>
                        <Form className='contact__info-form'>
                            <FormGroup>
                                <input type="text" placeholder='Tiêu đề' id='title' defaultValue={blog.title} onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="text" placeholder='Photo' id='photo' defaultValue={blog.photo} onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="text" placeholder='Nội dung' id='content'  onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <div className="contact__button">
                                    <Button className='btn primary__btn w-25'  onSubmit={handleClick}>Lưu</Button>
                                </div>
                            </FormGroup>
                        </Form>
                        
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default EditBlog