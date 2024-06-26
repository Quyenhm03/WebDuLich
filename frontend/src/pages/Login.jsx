import React, { useContext, useState } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'
import Google from '../assets/images/google.png'
import { GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase/firebaseConfig'

const Login = () => {
   const [credentials, setCredentials] = useState({
      email: undefined,
      password: undefined
   })

   const {dispatch} = useContext(AuthContext)
   const navigate = useNavigate()

   const handleChange = e => {
      setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
   }

   const handleClick = async e => {
      e.preventDefault()

      dispatch({type:'LOGIN_START'})

      try {
         const res = await fetch(`${BASE_URL}/auth/login`, {
            method:'post',
            headers: {
               'content-type':'application/json'
            },
            credentials:'include',
            body: JSON.stringify(credentials)
         })

         const result = await res.json()
         if(!res.ok) alert(result.message)
         console.log(result.data)

         localStorage.setItem('token', result.accessToken)
         // console.log(localStorage.getItem('token'))
         dispatch({type:"LOGIN_SUCCESS", payload:result.data})       
         navigate('/')
      } catch(err) {
         dispatch({type:"LOGIN_FAILURE", payload:err.message})
      }
   }

   const handleGoogleClick = async() =>{
      dispatch({type:'LOGIN_START'})

      try{
         const provider = new GoogleAuthProvider()
         const auth = getAuth(app)

         const result = await signInWithPopup(auth, provider)
         const res = await fetch(`${BASE_URL}/auth/google`, {
            method:'post',
            headers: {
               'content-type':'application/json',
               "Access-Control-Allow-Origin": "*"
               // 'Cross-Origin-Opener-Policy': 'unsafe-none',
               // 'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
               // 'Cross-Origin-Opener-Policy': 'same-origin'
            },
            credentials:'include',
            body: JSON.stringify({
               name: result.user.displayName,
               email: result.user.email,
               photo: result.user.photoURL
            })
         })

         const dt = await res.json()
         if(!res.ok) alert(dt.message)
         console.log(dt.data)

         localStorage.setItem('token', dt.accessToken)
         dispatch({type:"LOGIN_SUCCESS", payload:dt.data})
         navigate('/')
      } catch (err) {
         dispatch({type:"LOGIN_FAILURE", payload:err.message})
      }
   }

   return (<>
      <section>
         <Container>
            <Row>
               <Col lg='8' className='m-auto'>
                  <div className="login__container d-flex justify-content-between">
                     <div className="login__img">
                        <img src={loginImg} alt="" />
                     </div>

                     <div className="login__form">
                        <div className="user">
                           <img src={userIcon} alt="" />
                        </div>
                        <h2>Đăng nhập</h2>

                        <Form onSubmit={handleClick}>
                           <FormGroup>
                              <input type="email" placeholder='Email' id='email' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="password" placeholder='Mật khẩu' id='password' onChange={handleChange} required />
                           </FormGroup>
                           <Button className='btn secondary__btn auth__btn' type='submit'>Đăng nhập</Button>
                        </Form>
                        <p>Bạn chưa có tài khoản? <Link to='/register'>Tạo tài khoản</Link></p>
                        <Button className='btn secondary__btn auth__btn' type='submit' onClick={handleGoogleClick}>
                           <div className='auth__btn__content'>
                              <img src={Google} alt="" />
                              <span>Tiếp tục với google</span>
                           </div>
                        </Button>
                           
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   </>
   )
}

export default Login