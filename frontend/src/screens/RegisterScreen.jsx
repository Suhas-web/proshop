import React from 'react'
import { useState, useEffect } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate} from 'react-router-dom'
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice';
import {toast} from 'react-toastify';
import Loader from '../components/Loader'

const RegisterScreen = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

    const [register, {isLoading}] = useRegisterMutation();
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await register({name, email, password}).unwrap();
            dispatch(setCredentials({...res}))
        } catch (err) {
            console.log(err?.data);
            toast.error(err?.data?.message || err.error)
        }  
    }

  return (
    <FormContainer>
        <Col md={8} xs={12}>
            <h1>Register</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} required>
                    </Form.Control>
                </Form.Group>
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
                <Form.Group controlId='confirmPassword' className='mt-2'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder="Confirm password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} required>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='mt-2' disabled={isLoading}>
                    Sign Up
                </Button>
                {isLoading && <Loader />}
            </Form>
            <Row className='py-3'>
                <Col>
                    Existing user? <Link to='/login'>Login</Link>
                </Col>
            </Row>
        </Col>
    </FormContainer>
  )
}

export default RegisterScreen