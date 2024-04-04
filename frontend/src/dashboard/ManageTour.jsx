import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'reactstrap'
import SideBar from './SideBar'
import { Button, Table } from 'flowbite-react'
import { BASE_URL } from '../utils/config'
import UseFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'

const ManageTour = () => {
    const [pageCount, setPageCount] = useState(0)
    const [page, setPage] = useState(0)

    const { data: tours } = UseFetch(`${BASE_URL}/tours?page=${page}`)
    const { data: tourCount } = UseFetch(`${BASE_URL}/tours/search/getTourCount`)

    useEffect(() => {
        const pages = Math.ceil(tourCount / 8)
        setPageCount(pages)
        window.scrollTo(0,0)
     }, [page, tourCount, tours])

     const handleDelete = async (id) => {
        try {
          const res = await fetch(`${BASE_URL}/tours/${id}`, {
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
          return alert("Delete successful!")
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
                        <h5>Manage All Tour</h5>
                        <h5>Total Tours: {tourCount}</h5>
                    </div>
                    <div className="overflow-x-auto">
                        <Table hoverable>
                            <Table.Head>
                            <Table.HeadCell>Title</Table.HeadCell>
                            <Table.HeadCell>Address</Table.HeadCell>
                            <Table.HeadCell>Price</Table.HeadCell>
                            <Table.HeadCell>Distance</Table.HeadCell>
                            <Table.HeadCell>Max Group Size</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Edit or delete</span>
                            </Table.HeadCell>
                            </Table.Head>
                           
                            <Table.Body className="divide-y">
                            {
                                tours?.map(tour => (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={tour._id}>
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {tour.title}
                                        </Table.Cell>
                                        <Table.Cell>{tour.address}</Table.Cell>
                                        <Table.Cell>{tour.price}</Table.Cell>
                                        <Table.Cell>{tour.distance}</Table.Cell>
                                        <Table.Cell>{tour.maxGroupSize}</Table.Cell>
                                        <Table.Cell>
                                            <Link to={`/admin/dashboard/edittour/${tour._id}`}>Edit</Link>
                                        </Table.Cell>
                                        <Table.Cell>
                                        <Table.Cell>
                                            <Button onClick={() => handleDelete(tour._id)}>Delete</Button>
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

export default ManageTour