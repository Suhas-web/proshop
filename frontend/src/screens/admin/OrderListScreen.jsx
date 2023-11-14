import React from 'react'
import { useGetAllOrdersQuery } from '../../slices/ordersApiSlice'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {FaTimes} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'

const OrderListScreen = () => {
  const { data:orders, error, isLoading} = useGetAllOrdersQuery();
  return (
    <><h2>Order History</h2>
            {isLoading ? (<Loader/>) : (error ? (<Message variant='danger'>{error?.data?.message || error?.error}</Message>) : (
                <Table striped hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>OrderID</th>
                            <th>USER</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid? (String(order.paidAt).substring(0, 10)) : (<FaTimes style={{color: 'red'}}/>)}</td>
                                <td>{order.isDelivered? (String(order.deliveredAt).substring(0, 10)) : (<FaTimes style={{color: 'red'}}/>)}</td>
                                <td><LinkContainer to={`/order/${order._id}`}><Button className="btn-sm" variant="light">Details</Button></LinkContainer></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ))}</>
  )
}

export default OrderListScreen