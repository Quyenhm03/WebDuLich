import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'reactstrap'
import SideBar from './SideBar'
import { Button, Table } from 'flowbite-react'
import { BASE_URL } from '../utils/config'
import UseFetch from '../hooks/useFetch'

const ManageUser = () => {
    const [pageCount, setPageCount] = useState(0)
    const [page, setPage] = useState(0)

    const { data: users } = UseFetch(`${BASE_URL}/users?page=${page}`)
    const { data: userCount } = UseFetch(`${BASE_URL}/users/search/getUserCount`)

    useEffect(() => {
        const pages = Math.ceil(userCount / 8)
        setPageCount(pages)
        window.scrollTo(0,0)
     }, [page, userCount, users])

     const handleDelete = async (id) => {
        try {
          const res = await fetch(`${BASE_URL}/users/${id}`, {
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
          return alert("Xóa thành công")
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
                    <div className='flex items-center justify-between m-4'>
                        <h5>Quản lý tài khoản</h5>
                        <h5>Số lượng tài khoản: {userCount}</h5>
                    </div>
                    <div className="overflow-x-auto">
                        <Table hoverable>
                            <Table.Head>
                            <Table.HeadCell>Tên</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Xóa</span>
                            </Table.HeadCell>
                            </Table.Head>
                           
                            <Table.Body className="divide-y">
                            {
                                users?.map(user => (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={user._id}>
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {user.username}
                                        </Table.Cell>
                                        <Table.Cell>{user.email}</Table.Cell>
                                        <Table.Cell>
                                        <Table.Cell>
                                            <Button onClick={() => handleDelete(user._id)}>Xóa</Button>
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

export default ManageUser