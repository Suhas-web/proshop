import React from 'react'
import { useState, useEffect } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate} from 'react-router-dom'
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice';
import {toast} from 'react-toastify';
import Loader from '../components/Loader'

const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { userInfo } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const [login, {isLoading}] = useLoginMutation();
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({email, password}).unwrap();
            dispatch(setCredentials({...res}))
        } catch (err) {
            console.log(err?.data);
            if(err?.data?.stack?.includes("Invalid email")){
                toast.error("Invalid email or password. Please try again")
            } else {
                toast.error(err?.data?.message || err.error)
            }
        }  
    }

  return (
    <FormContainer>
        <Col md={8} xs={12}>
            <h1>Login</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} required>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='mt-2'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder="Enter password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} required>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='mt-2' disabled={isLoading}>
                    Sign In
                </Button>
                {isLoading && <Loader />}
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? <Link to='/register'>Register</Link>
                </Col>
            </Row>
        </Col>
    </FormContainer>
  )
}

export default LoginScreen