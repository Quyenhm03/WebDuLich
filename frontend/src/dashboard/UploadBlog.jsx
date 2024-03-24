import React, {useState} from 'react'
import SideBar from './SideBar'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import { BASE_URL } from './../utils/config.js'

const UploadBlog = () => {
    const [blog, setBlog] = useState({
        title: '',
        photo: '',
        content: '',
     })
  
     const handleChange = e => {
        setBlog(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

     const handleClick = async e => {
        e.preventDefault()
        console.log(blog)
  
        try {
  
           const res = await fetch(`${BASE_URL}/blog`, {
              method: 'post',
              headers: {
                 'content-type': 'application/json'
              },
              credentials: 'include',
              body: JSON.stringify(blog)
           })
  
           const result = await res.json()
  
           if(!res.ok) {
              return alert(result.message)
           }
           alert(result.message)
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
                    <Col className='sidebar__dashboard'>
                        <div className="contact__form">
                        <h5>Upload A Blog</h5>
                        <Form className='contact__info-form' onSubmit={handleClick}>
                            <FormGroup>
                                <input type="text" placeholder='Title' id='title' onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="text" placeholder='Photo' id='photo' onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="text" placeholder='Content' id='content' onChange={handleChange} required/>
                            </FormGroup>
                        </Form>
                        
                        <br/>
                        <div className="contact__button">
                            <Button className='btn primary__btn w-25' onSubmit={handleClick}>Submit</Button>
                        </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default UploadBlog