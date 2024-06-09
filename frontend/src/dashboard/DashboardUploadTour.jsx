import React, { useState}from 'react'
import SideBar from './SideBar'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import { BASE_URL } from './../utils/config.js'
import './manageTour.css'

const DashboardUploadTour = () => {
    const [tour, setTour] = useState({
        title: '',
        city: '',
        address: '',
        departure: '',
        timeTour: 0,
        distance: '',
        photo: '',
        maxGroupSize: 0,
        price: 0,
        featured: false,
        desc: '',
        schedule: [{time: '', content: ['']}],
        map: '',
     })

     const handleScheduleChange = (index, e) => {
        const { id, value } = e.target;
        const newSchedule = [...tour.schedule];
      
        if (newSchedule.length <= index) {
          for (let i = newSchedule.length; i <= index; i++) {
            newSchedule.push({ time: '', content: [''] });
          }
        }
      
        newSchedule[index][id] = value;
        setTour((prev) => ({ ...prev, schedule: newSchedule }));
      };
      
      const handleAddContent = (index) => {
        const newSchedule = [...tour.schedule];
      
        if (newSchedule.length <= index) {
          for (let i = newSchedule.length; i <= index; i++) {
            newSchedule.push({ time: '', content: [''] });
          }
        }
      
        newSchedule[index].content.push('');
        setTour((prev) => ({ ...prev, schedule: newSchedule }));
      };
    
      const handleRemoveContent = (scheduleIndex, contentIndex) => {
        const newSchedule = [...tour.schedule];
        newSchedule[scheduleIndex].content.splice(contentIndex, 1);
        setTour((prev) => ({ ...prev, schedule: newSchedule }));
      };

      const renderScheduleInputs = () => {
        const { timeTour, schedule } = tour;
      
        if (timeTour <= 0) {
          return null;
        }
      
        const scheduleInputs = [];
        for (let i = 0; i < timeTour; i++) {
          const item = schedule[i] || { time: '', content: [''] };
      
          const scheduleInput = (
            <div key={i}>
              <FormGroup>
                <input
                  type="text"
                  placeholder="Thời gian"
                  id='time'
                  value={item.time}
                  onChange={(e) => handleScheduleChange(i, e)}
                  required
                />
              </FormGroup>
              {item.content.map((content, contentIndex) => (
                <div key={contentIndex}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Nội dung lịch trình"
                      id='content'
                      value={content}
                      onChange={(e) => handleContentChange(i, contentIndex, e)}
                      required
                    />
                  </FormGroup>
                  <Button className='btn primary__btn w-23' onClick={() => handleRemoveContent(i, contentIndex)}>
                    Xóa lịch trình
                  </Button>
                </div>
              ))}
              <br/>
              <Button className='btn primary__btn w-23' onClick={() => handleAddContent(i)}>Thêm lịch trình</Button>
              <br/>
            </div>
            
          );
      
          scheduleInputs.push(scheduleInput);
        }
      
        return scheduleInputs;
      };
      
      const handleContentChange = (scheduleIndex, contentIndex, e) => {
        const { value } = e.target;
        const newSchedule = [...tour.schedule];
        newSchedule[scheduleIndex].content[contentIndex] = value;
        setTour((prev) => ({ ...prev, schedule: newSchedule }));
      };

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
                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                 'role': `${localStorage.getItem('role')}`
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
                                <input type="text" placeholder='Khởi hành' id='departure' onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="text" placeholder='Địa chỉ' id='address' onChange={handleChange} required/>
                            </FormGroup>
                            <FormGroup>
                                <input type="number" placeholder='Thời gian tour' id='timeTour' onChange={handleChange} required/>
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
                                <input type="text" placeholder='Địa chỉ map' id='map' onChange={handleChange} required/>
                            </FormGroup>
                            {renderScheduleInputs()}
                            <br/>
                            <FormGroup className='featured-checkbox'>
                                <input type='checkbox' id='featured' name='featured' onChange={handleChange}/>
                                <label htmlFor='featured'>Tour nổi bật</label>
                            </FormGroup>
                            <br/>
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
  )
}

export default DashboardUploadTour