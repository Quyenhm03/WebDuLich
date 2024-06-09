import React, { useState } from 'react';
import SideBar from './SideBar';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { BASE_URL } from './../utils/config.js';

const UploadBlog = () => {
  const [blog, setBlog] = useState({
    title: '',
    photo: '',
    content: [{ paraTitle: '', desc: '' }],
    postAt : new Date()
  });

  const handleChange = e => {
    const { id, value } = e.target;
    setBlog(prevBlog => ({ ...prevBlog, [id]: value }));
  };

  const handleContentChange = (index, e) => {
    const { id, value } = e.target;
    const updatedContent = [...blog.content];
    updatedContent[index][id] = value;
    setBlog(prevBlog => ({ ...prevBlog, content: updatedContent }));
  };

  const addContent = () => {
    setBlog(prevBlog => ({
      ...prevBlog,
      content: [...prevBlog.content, { paraTitle: '', desc: '' }],
    }));
  };

  const removeContent = index => {
    const updatedContent = [...blog.content];
    updatedContent.splice(index, 1);
    setBlog(prevBlog => ({ ...prevBlog, content: updatedContent }));
  };

  const handleClick = async e => {
    e.preventDefault();
    console.log(blog);

    try {
      const res = await fetch(`${BASE_URL}/blog`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'role': `${localStorage.getItem('role')}`
        },
        credentials: 'include',
        body: JSON.stringify(blog),
      });

      const result = await res.json();

      if (!res.ok) {
        return alert(result.message);
      }
      alert(result.message);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
      <section>
        <Container>
          <Row>
            <Col lg='3'>
              <SideBar />
            </Col>
            <Col className='sidebar__dashboard'>
              <div className='contact__form'>
                <h5>Thêm một Blog</h5>
                <Form className='contact__info-form' onSubmit={handleClick}>
                  <FormGroup>
                    <input type='text' placeholder='Tiêu đề Blog' id='title' onChange={handleChange} required />
                  </FormGroup>
                  <FormGroup>
                    <input type='text' placeholder='Ảnh' id='photo' onChange={handleChange} required />
                  </FormGroup>
                  {blog.content.map((item, index) => (
                    <div key={index}>
                      <FormGroup>
                        <input type='text'
                          placeholder='Tiêu đề đoạn' id='paraTitle' value={item.paraTitle} onChange={e => handleContentChange(index, e)} required />
                      </FormGroup>
                      <FormGroup>
                        <input type='text' placeholder='Nội dung đoạn' id='desc' value={item.desc} onChange={e => handleContentChange(index, e)} required />
                      </FormGroup>
                      <Button className='btn primary__btn' onClick={() => removeContent(index)}>
                        Xóa nội dung
                      </Button>
                    </div>
                  ))}
                   <br />
                  <Button className='btn primary__btn' onClick={addContent}>
                    Thêm nội dung
                  </Button>
                  <br />
                  <br/>
                  <div className='contact__button'>
                    <Button className='btn primary__btn w-25' onSubmit={handleClick}>
                      Lưu
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
  );
};

export default UploadBlog;