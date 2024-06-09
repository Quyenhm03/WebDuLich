import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { BASE_URL } from './../utils/config.js';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch.js';

const EditBlog = () => {
  const { id } = useParams();
  const { data: blog, loading, error } = useFetch(`${BASE_URL}/blog/${id}`);
  const [blogUp, setBlogUp] = useState(blog);

  useEffect(() => {
    setBlogUp(blog);
  }, [blog]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBlogUp((prevBlogUp) => ({ ...prevBlogUp, [id]: value }));
  };

  const handleContentChange = (index, e) => {
    const { id, value } = e.target;
    const updatedContent = [...blogUp.content];
    updatedContent[index] = { ...updatedContent[index], [id]: value };
    setBlogUp((prevBlogUp) => ({ ...prevBlogUp, content: updatedContent }));
  };

  const addContent = () => {
    setBlogUp((prevBlogUp) => ({
      ...prevBlogUp,
      content: [...prevBlogUp.content, { paraTitle: '', desc: '' }],
    }));
  };

  const removeContent = (index) => {
    setBlogUp((prevBlogUp) => {
      const updatedContent = [...prevBlogUp.content];
      updatedContent.splice(index, 1);
      return { ...prevBlogUp, content: updatedContent };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
      // console.log(blogUp)
    try {
        const res = await fetch(`${BASE_URL}/blog/${id}`, {
           method: 'put',
           headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'user': `${localStorage.getItem('user')}`
           },
           credentials: 'include',
           body: JSON.stringify(blogUp)
        })

        const result = await res.json()

        if(!res.ok) {
           return alert(result.message)
        }
        return alert("Cập nhật thành công!")
     } catch (error) {
        alert(error.message)
     }   
  };

  return (
      <section>
        <Container>
          {loading && <h4 className='text-center pt-5'>LOADING..........</h4>}
          {error && <h4 className='text-center pt-5'>{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg='3'>
                <SideBar />
              </Col>
              <Col className='sidebar__dashboard'>
                <div className='contact__form'>
                  <h5>Sửa Blog</h5>
                  <Form className='contact__info-form' onSubmit={handleClick}>
                    <FormGroup>
                      <input type='text' placeholder='Tiêu đề Blog' id='title' value={blogUp.title} onChange={handleChange} required />
                    </FormGroup>
                    <FormGroup>
                      <input type='text' placeholder='Photo' id='photo' value={blogUp.photo} onChange={handleChange} required />
                    </FormGroup>
                    {blogUp.content && blogUp.content.map((item, index) => (
                      <div key={index}>
                        <FormGroup>
                          <input type='text' placeholder='Tiêu đề đoạn' id='paraTitle' value={item.paraTitle} onChange={(e) => handleContentChange(index, e)} required />
                        </FormGroup>
                        <FormGroup>
                          <input type='text' placeholder='Nội dung đoạn' id='desc' value={item.desc} onChange={(e) => handleContentChange(index, e)} required />
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
                    <br />
                    <div className='contact__button'>
                      <Button className='btn primary__btn w-25' type='submit'>
                        Lưu
                      </Button>
                    </div>
                  </Form>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
  );
};

export default EditBlog;