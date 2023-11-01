import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps';
import {Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap'
import Message from '../components/Message';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const [ createOrder, {isLoading, err}] = useCreateOrderMutation();
    
    useEffect(()=>{
        if(!cart.shippingAddress.address){
            navigate('/shipping');
        } else if(!cart.paymentMethod){
            navigate('/payment');
        }
    }, [cart.shippingAddress.address, cart.paymentMethod, navigate])

    const placeOrderHandler = async () => {
        try{
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                taxPrice: cart.taxPrice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (err){
            toast.error(err)
        }
    }
  return (
    <>
    <CheckoutSteps step1 step2 step3 step4/>
    <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2><strong>Shipping address</strong></h2>
                    <p>{cart.shippingAddress.address},
                     {cart.shippingAddress.address}, 
                     {cart.shippingAddress.city}, 
                     {cart.shippingAddress.country}
                     </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment method</h2>
                    <p>{cart.paymentMethod}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Order Items</h2>
                    <ListGroup variant='flush'>
                        {(!cart?.cartItems || cart.cartItems.length === 0) ? 
                        (<Message>Add items to cart: <Link to='/'>Click here</Link></Message>) :
                        (cart.cartItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                            <Row>
                                <Col md={2}>
                                    <Image fluid rounded src={item.image} alt={item.name}></Image>
                                </Col>
                                <Col>
                                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                                </Col>
                                <Col md={4}>
                                    <p>{item.qty} X {item.price} = {item.qty * item.price}</p>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        )))}
                        
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                       <h1>Order Summary</h1> 
                    </ListGroup.Item>
                    <ListGroup.Item>
                       <p>Items price: {cart.itemsPrice}</p> 
                    </ListGroup.Item>
                    <ListGroup.Item>
                       <p>Shipping:  {cart.shippingPrice}</p> 
                    </ListGroup.Item>
                    <ListGroup.Item>
                       <p>Tax:  {cart.taxPrice}</p> 
                    </ListGroup.Item>
                    <ListGroup.Item>
                       <p>Total:  {cart.totalPrice}</p> 
                    </ListGroup.Item>
                                        <ListGroup.Item>
                       <p>{err && <Message variant='danger'>{err}</Message>}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type='button' className='btn btn-block' 
                            disabled={cart.cartItems.length === 0} 
                            onClick={placeOrderHandler}>
                                Place Order
                        </Button>
                    </ListGroup.Item>
                    {isLoading && <Loader/>}
                </ListGroup>
            </Card>
        </Col>
    </Row>
    </>
  )
}

export default PlaceOrderScreen