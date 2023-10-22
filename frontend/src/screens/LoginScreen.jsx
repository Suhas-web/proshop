import React from 'react'
import { useState } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer';

const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const submitHandler = () => {
        console.log("Submitted");
    }
  return (
    <FormContainer>
        <Col md={8} xs={12}>
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
                <Button type='submit' variant='primary' className='mt-2'>
                    Sign In
                </Button>
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