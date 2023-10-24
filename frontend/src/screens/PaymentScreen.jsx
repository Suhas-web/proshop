import {useEffect, useState} from 'react'
import FormContainer from '../components/FormContainer';
import { Form, Col, Button} from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { shippingAddress } = useSelector(state => state.cart)

    useEffect(() => {
        if(!shippingAddress){
            navigate('/shipping');
        }
    }, [shippingAddress, navigate])

    const submitPaymentHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeOrder")
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1 className='my-1'>Payment Method</h1>
        <Form onSubmit={submitPaymentHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select method</Form.Label>
                <Col>
                <Form.Check type='radio' 
                    label='Paypal or credit card'
                    id='PayPal'
                    name='payment method'
                    value={paymentMethod}
                    className='my-2'
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >Paypal</Form.Check>
                </Col>
                <Button variant='primary' type='submit'>Proceed to pay</Button>
            </Form.Group>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen