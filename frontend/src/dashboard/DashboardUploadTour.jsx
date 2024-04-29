import React, { useState}from 'react'
import SideBar from './SideBar'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import { BASE_URL } from './../utils/config.js'

const DashboardUploadTour = () => {
    const [tour, setTour] = useState({
        title: '',
        city: '',
        address: '',
        distance: '',
        photo: '',
        maxGroupSize: 0,
        price: 0,
        featured: false,
        desc: ''
     })
  
     const handleChange = e => {
        const { id, value, checked, type } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
    
        setTour(prev => ({ ...prev, [id]: newValue }));
    }

     const handleClick = async e => {
        e.preventDefault()
        console.log(tour)
  
        try {
  
           const res = await fetch(`${BASE_URL}/tours`, {
              method: 'post',
              headers: {
                 'content-type': 'application/json',
                 'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              credentials: 'include',
              body: JSON.stringify(tour)
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
                    <Col className='sidebar__dashboard' onSubmit={handleClick}>
                        <div className="contact__form">
                        <h5>Thêm một tour</h5>
                        <Form className='contact__info-form'>
                            <FormGroup>
                                <input type="text" placeholder='Tiêu đề' id='title' onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="text" placeholder='Thành phố' id='city' onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="text" placeholder='Địa chỉ' id='address' onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="number" placeholder='Khoảng cách' id='distance' onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="text" placeholder='Photo' id='photo' onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="number" placeholder='Giá' id='price' onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="text" placeholder='Mô tả' id='desc' onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="number" placeholder='Số lượng tối đa' id='maxGroupSize' onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="checkbox" id="featured" name="featured" onChange={handleChange}/>Tour nổi bật
                            </FormGroup>
                            <FormGroup>
                                <div className="contact__button">
                                    <Button className='btn primary__btn w-25' onSubmit={handleClick}>Lưu</Button>
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

export default DashboardUploadTour