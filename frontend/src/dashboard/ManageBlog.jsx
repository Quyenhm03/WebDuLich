import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'reactstrap'
import SideBar from './SideBar'
import { Button, Table } from 'flowbite-react'
import { BASE_URL } from '../utils/config'
import UseFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'

const ManageBlog = () => {
    const [pageCount, setPageCount] = useState(0)
    const [page, setPage] = useState(0)

    const { data: blogs } = UseFetch(`${BASE_URL}/blog?page=${page}`)
    const { data: blogCount } = UseFetch(`${BASE_URL}/blog/search/getBlogCount`)

    useEffect(() => {
        const pages = Math.ceil(blogCount / 8)
        setPageCount(pages)
        window.scrollTo(0,0)
     }, [page, blogCount, blogs])

     const handleDelete = async (id) => {
        try {
          const res = await fetch(`${BASE_URL}/blog/${id}`, {
            method: 'delete',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: 'include'
          });
      
          if (!res.ok) {
            const result = await res.json();
            return alert(result.message);
          }
          return alert("Xóa thành công!")
        } catch (error) {
          alert(error.message);
        }
      };

  return (
    <>
    <section>
        <Container>
            <Row>
                <Col lg='3'>
                    <SideBar/>
                </Col>
                <Col className='sidebar__dashboard'>
                    <h5>Quản lý Blog</h5>
                    <div className="overflow-x-auto">
                        <Table hoverable>
                            <Table.Head>
                            <Table.HeadCell>Tiêu đề</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Sửa hoặc xóa</span>
                            </Table.HeadCell>
                            </Table.Head>
                           
                            <Table.Body className="divide-y">
                            {
                                blogs?.map(blog => (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={blog._id}>
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {blog.title}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Link to={`/admin/dashboard/editblog/${blog._id}`}>Sửa</Link>
                                        </Table.Cell>
                                        <Table.Cell>
                                        <Table.Cell>
                                            <Button onClick={() => handleDelete(blog._id)}>Xóa</Button>
                                        </Table.Cell>
                                        </Table.Cell>
                                    </Table.Row>
                                ))

                            }
                            </Table.Body>
                        </Table>
                    </div>
                    
                </Col>
                
            </Row>
            <Row>
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
        </Container>
    </section>
</>
  )
}

export default ManageBlog