import {Link, useParams} from 'react-router-dom';
import {Row, Col, ListGroup, Card, Button,Image} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery, useGetPayPalClientIdQuery, usePayOrderMutation, useDeliverOrderMutation } from '../slices/ordersApiSlice';
import {PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js'
import {toast} from 'react-toastify'
import { useEffect } from 'react';

import React from 'react'
import { useSelector } from 'react-redux';

const OrderScreen = () => {
    const {id: orderId} = useParams();
    const {data: order, refetch, isLoading, error} = useGetOrderDetailsQuery(orderId);
    const [payOrderResponse] = usePayOrderMutation(); 
    const {data: paypal, isLoading: loadingPayPal, error: errorPayPal} = useGetPayPalClientIdQuery();
    const [dispatch] = usePayPalScriptReducer();
    const [deliverOrder, {isLoading: loadingDeliver}] = useDeliverOrderMutation();
    const {userInfo} = useSelector(state => state.auth)

    async function onApproveTest() {
          await payOrderResponse({orderId, details : {payer: {}}})
          refetch();
          toast.success("Payment successfull")
    }
    function onError (err) {
      console.log("Error on payment", err);
      toast.error(err?.data?.message || err?.message)
    }
    function onApprove (data, actions) {
      return actions.order.capture().then(async function (details) {
        try {
          await payOrderResponse({orderId, details});
          refetch();
          toast.success("Payment successfull")
        } catch (err) {
          console.log("Error onApprove", err);
          toast.error(err?.data?.message || err?.message)
        }
      })
    }
    function createOrder (data, actions) {
      return actions.order.create({
        purchase_units : [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      }).then((orderId) => {
        return orderId;
      }).catch((err) => {
        toast.error(err?.data?.message || err?.message)
      });
    }

    useEffect(()=>{
      if(!errorPayPal && !loadingPayPal && paypal){
        const loadPayPalScript = async () => {
          dispatch({
            type: "resetOptions",
            value: {
              'clientId': paypal.clientId,
              currency: 'USD'
            }
          });
          dispatch({type: "setLoadingStatus", value: "pending"});
        }
        if(order && !order.isPaid){
          if(!window.paypal){
            loadPayPalScript();
          }
        }
      }
    }, [order, paypal, dispatch, loadingPayPal, errorPayPal])

    const deliverOrderHandler = async () => {
      try {
        await deliverOrder(orderId);
        refetch();
        toast.success("Order delivered");
      } catch (err) {
        console.log(err);
        toast.error("Error marking order as delivered");
      }
    }

   return (
    isLoading ? <Loader/> : (
    error ? <Message variant='danger'>{error?.message?.data || error?.error}</Message> : (
      <>
        <h1>Order {order._id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p><strong>Name: </strong> {order.user.name}</p>
                <p><strong>Email: </strong> {order.user.email}</p>
                <p><strong>Address: </strong> {order.shippingAddress.address}, 
                {order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}</p>
                {order.isDelivered ? 
                (<Message variant="success">Delivered on {String(order.deliveredAt).substring(0,10)}</Message>) : 
                (<Message variant="danger">Not delivered</Message>)}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment</h2>
                <p><strong>Method: </strong>{order.paymentMethod}</p>
                {order.isPaid ? 
                (<Message variant="success">Paid on {String(order.paidAt).substring(0,10)}</Message>) : 
                (<Message variant="danger">Not Paid</Message>)}
              </ListGroup.Item>
              <ListGroup variant='flush'>
                <h2>Orders: </h2>
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image fluid rounded src={item.image}></Image>
                      </Col>
                      <Col md={6}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={5}>
                        {item.qty} x Rs{item.price} = Rs{Number(item.qty) * Number(item.price)}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                ))}
              </ListGroup>

            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row><Col>Item: </Col><Col>{order.itemsPrice}</Col></Row>
                  <Row><Col>Shipping: </Col><Col>{order.shippingPrice}</Col></Row>
                  <Row><Col>Tax: </Col><Col>{order.taxPrice}</Col></Row>
                  <Row><Col>Total price: </Col><Col>{order.totalPrice}</Col></Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {!order.isPaid && (<ListGroup.Item>
                    {loadingPayPal && <Loader/>}
                    <div>
                      <Button className="my-3" onClick={onApproveTest}>Test Pay Order</Button>
                      <div>
                        <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons>
                      </div>
                    </div>
                  </ListGroup.Item>)}
                </ListGroup.Item>
                <ListGroup.Item>
                  {!order.isDelivered && (<ListGroup.Item>
                    {loadingDeliver && <Loader/>}
                    {userInfo && userInfo.isAdmin && 
                    (<div>
                      <Button className="btn btn-block my-3" onClick={deliverOrderHandler}>Mark Order as delivered</Button>
                    </div>)}
                  </ListGroup.Item>)}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    )
  ))
}

export default OrderScreen