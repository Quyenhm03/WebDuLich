import React, { useRef, useState } from 'react'
import './search-bar.css'
import { Col, Form, FormGroup } from 'reactstrap'
import { BASE_URL } from '../utils/config'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'

const departureOptions = [
   { value: 'Ha Noi', label: 'Hà Nội' },
   { value: 'Ho Chi Minh', label: 'Hồ Chí Minh' },
 ];

const locationOptions = [
   { value: 'London', label: 'London, Anh' },
   { value: 'Bali', label: 'Bali, Indonesia' },
   { value: 'Bangkok', label: 'Bangkok, Thái Lan' },
   { value: 'Phuket', label: 'Phuket, Thái Lan' },
   { value: 'Tokyo', label: 'Tokyo, Nhật Bản' },
   { value: 'Paris', label: 'Paris, Pháp' },
   { value: 'Sylhet', label: 'Sylhet, Bangladesh' },
   { value: 'Chittagong', label: 'Chittagong, Bangladesh' }
 ];

const SearchBar = () => {
   const [selectedLocation, setSelectedLocation] = useState(null);
   const [selectedDeparture, setSelectedDeparture] = useState(null);
   const maxGroupSizeRef = useRef(0)
   const navigate = useNavigate()

   const searchHandler = async() => {
      const location = selectedLocation ? selectedLocation.value : ''
      const departure = selectedDeparture ? selectedDeparture.value : ''
      const maxGroupSize = maxGroupSizeRef.current.value

      if (location === '' || departure === '' || maxGroupSize === '') {
         return alert('All fields are required!')
      }

      const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?departure=${departure}&city=${location}&maxGroupSize=${maxGroupSize}`)
      
      if(!res.ok) alert('Something went wrong')

      const result = await res.json()

      navigate(`/tours/search?departure=${departure}&city=${location}&maxGroupSize=${maxGroupSize}`, {state: result.data})
   }

   return <Col lg="12">
      <div className="search__bar">
         <Form className='d-flex align-items-center gap-4'>
            <FormGroup className='d-flex gap-3 form__group form__group-fast'>
               <span><i class='ri-plane-fill'></i></span>
               <div>
                  <h6>Điểm đi</h6>
                  <Select className='select__loc' placeholder= 'Nơi khởi hành' options={departureOptions} value={selectedDeparture} onChange={setSelectedDeparture}/>
               </div>
            </FormGroup>
            <FormGroup className='d-flex gap-3 form__group form__group-fast'>
               <span><i class='ri-map-pin-line'></i></span>
               <div>
                  <h6>Điểm đến</h6>
                  <Select className='select__loc' placeholder= 'Chọn điểm đến' options={locationOptions} value={selectedLocation} onChange={setSelectedLocation}/>
               </div>
            </FormGroup>
            <FormGroup className='d-flex gap-3 form__group form__group-last'>
               <span><i class='ri-group-line'></i></span>
               <div>
                  <h6>Số lượng</h6>
                  <input type="number" placeholder='0' ref={maxGroupSizeRef} />
               </div>
            </FormGroup>

            <span className='search__icon' type='submit' onClick={searchHandler}>
               <i class='ri-search-line'></i>
            </span>
         </Form>
      </div>
   </Col>
}

export default SearchBar