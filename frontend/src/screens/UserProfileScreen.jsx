import { useEffect, useState } from "react"
import { Button, Col, Form, Row, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useUpdateProfileMutation } from "../slices/usersApiSlice"
import { setCredentials } from "../slices/authSlice"
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice"
import Loader from "../components/Loader"
import Message from "../components/Message"
import {FaTimes} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'

const UserProfileScreen = () => {
    
    const {userInfo} = useSelector(state => state.auth)
    const [name, setName] = useState("")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [updateProfile] = useUpdateProfileMutation();
    const {data: orderHistory, isLoading, error} = useGetMyOrdersQuery();
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error("Passwords do not match")
        } else {
            try {
                const res = await updateProfile({_id: userInfo._id, name, email, password}).unwrap();
                dispatch(setCredentials(res));
                toast.success("Profile updated successfully.")
            } catch (err) {
                console.log(err);
                toast.error(err?.data?.message || err?.error);
            }
        }
    }

    useEffect(()=> {
        if(userInfo){
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    
    }, [userInfo.name, userInfo.email, userInfo, setName, setEmail])

  return (
    <Row>
        <Col md={3}>
            <Form onSubmit={submitHandler}>
                <Form.Group name='name' className="my-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group name='email' className="my-2"> 
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group name='password' className="my-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group name='name' className="my-2">
                    <Form.Label>ConfirmPassword</Form.Label>
                    <Form.Control type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" className="my-2" variant="primary">Submit</Button> 
            </Form>
        </Col>
        <Col md={9}>
            <h2>Order History</h2>
            {isLoading ? (<Loader/>) : (error ? (<Message variant='danger'>{error?.data?.message || error?.error}</Message>) : (
                <Table striped hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>OrderID</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderHistory.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid? (String(order.paidAt).substring(0, 10)) : (<FaTimes style={{color: 'red'}}/>)}</td>
                                <td>{order.isDelivered? (String(order.deliveredAt).substring(0, 10)) : (<FaTimes style={{color: 'red'}}/>)}</td>
                                <td><LinkContainer to={`/order/${order._id}`}><Button className="btn-sm" variant="light">Details</Button></LinkContainer></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ))}
        </Col>
    </Row>
  )
}

export default UserProfileScreen