import React from 'react'
import './side-bar.css'
import { Container } from 'reactstrap'
import UseFetch from '../../hooks/useFetch'
import { BASE_URL } from '../../utils/config'
import { Link } from 'react-router-dom'

const sideBar = () => {
    
    const { data: blogs, loading, error } = UseFetch(`${BASE_URL}/blog`)

  return (
    <section>
        <Container>
            {loading && <h4 className='text-center pt-5'>LOADING..........</h4>}
            {error && <h4 className='text-center pt-5'>{error}</h4>}
            {
                !loading && !error && (
                    <div>
                        <div className="sidebar">
                            <h1>Post recent</h1>
                            {
                                blogs?.map((blog, index) => {
                                    if (index > 4) {
                                      return null
                                    }
                                  
                                    return (
                                      <div className="sidebar__item">
                                        <img src={blog.photo} alt="" />
                                        <div className="blog_title d-flex align-items-center justify-content-between mt-3">
                                          <Link to={`/blog/${blog._id}`}>
                                            <h2>{blog.title}</h2>
                                          </Link>
                                        </div>
                                      </div>
                                    )
                                })
                            }
                        </div>   
                    </div>
                )
            }
        </Container>
    </section>
    )
}

export default sideBar