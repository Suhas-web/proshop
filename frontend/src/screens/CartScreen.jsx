import React from 'react'
import { Row, Col, Image, ListGroup, FormControl, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import { Link } from 'react-router-dom';
import Message from '../components/Message';

const CartScreen = () => {

    const {cartItems} = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({...product, qty}))
    }
    const deleteCartHandler = async (id) => {
        dispatch(removeFromCart(id))
    }
    return (
    <>
    {(cartItems === undefined || cartItems.length === 0) ? 
    (<Message>Cart is empty <Link to="/">Go back</Link></Message>)
    : (<Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            <ListGroup variant='flush'>
                {cartItems.map(product => (
                <ListGroup.Item key={product._id}>
                    <Row>
                        <Col md={2}>
                        <Image src={product.image} fluid rounded></Image>
                        </Col>
                        <Col md={3}><Link to={`/product/${product._id}`}>{product.name}</Link></Col>
                        <Col md={2}>Rs {product.price}</Col>
                        <Col md={2}>
                            <FormControl
                            as='select'
                            value={product.qty}
                            onChange={(e) => addToCartHandler(product, Number(e.target.value))}>
                                {[...Array(product.countInStock).keys()].map(x => (
                                    <option key={x+1} value={x+1}>{x+1}</option>
                                ))}
                            </FormControl>
                        </Col>
                        <Col md={2}><Button variant="danger" onClick={() => deleteCartHandler(product._id)}><FaTrash></FaTrash></Button></Col>
                    </Row>
                </ListGroup.Item>
            ))}
            </ListGroup>
        </Col>

        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row><h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2></Row>
                        <Row><p> Rs {cartItems.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)}                             
                            </p></Row>
                            </ListGroup.Item>
                    <ListGroup.Item>
                        <Button> Proceed to checkout</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>)}
    </>
  )
}

export default CartScreen;
