import React, { useState} from 'react'
import SideBar from './SideBar'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import { BASE_URL } from './../utils/config.js'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch.js'
import './manageTour.css'

const EditTour = () => {
    const {id} = useParams()
    const {data: tour} = useFetch(`${BASE_URL}/tours/${id}`)
    const [tourup, setTourUp] = useState(tour)

    useEffect(() => {
        setTourUp(tour);
      }, [tour]);

    console.log(tour)
  
     const handleChange = e => {
        const { id, value, checked, type } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
    
        setTourUp(prev => ({ ...prev, [id]: newValue }));
    }

     const handleClick = async e => {
        e.preventDefault()
        //console.log(tour)
  
        try {
  
           const res = await fetch(`${BASE_URL}/tours/${id}`, {
              method: 'put',
              headers: {
                 'content-type': 'application/json',
                 'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              credentials: 'include',
              body: JSON.stringify(tourup)
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
        <section>
            <Container>
                <Row>
                    <Col lg='3'>
                        <SideBar/>
                    </Col>
                    <Col className='sidebar__dashboard' onSubmit={handleClick}>
                        <div className="contact__form">
                        <h5>Sửa Tour</h5>
                        <Form className='contact__info-form'>
                            <FormGroup>
                                <input type="text" placeholder='Tiêu đề' id='title' defaultValue={tour.title} onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="text" placeholder='Thành phố' id='city' defaultValue={tour.city} onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="text" placeholder='Địa chỉ' id='address' defaultValue={tour.address} onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="number" placeholder='Khoảng cách' id='distance' defaultValue={tour.distance} onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="text" placeholder='Photo' id='photo' defaultValue={tour.photo} onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="number" placeholder='Giá' id='price' defaultValue={tour.price} onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="text" placeholder='Mô tả' id='desc' defaultValue={tour.desc} onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="number" placeholder='Số lượng khách tối đa' id='maxGroupSize' defaultValue={tour.maxGroupSize} onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup className='featured-checkbox'>
                                <input type='checkbox' id='featured' name='featured' checked={tourup.featured} onChange={handleChange}/>
                                <label htmlFor='featured'>Tour nổi bật</label>
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
  )
}

export default EditTour