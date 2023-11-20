import React, { useEffect, useState } from 'react'
import {Button, Form} from 'react-bootstrap'
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import { useGetUserProfilesDetailQuery, useUpdateUserProfileMutation } from '../../slices/usersApiSlice';

const UserEditScreen = () => {
    const {id: userId} = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState('');
    const {data: user, error, isLoading} = useGetUserProfilesDetailQuery(userId);
    const [updateUser, {isLoading: loadingUpdateUser}] = useUpdateUserProfileMutation();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(isAdmin);
        const updatedUser = {
                _id: userId,
                name,
                email,
                isAdmin,
            };
        const result = await updateUser(updatedUser).unwrap();
        console.log("result " + result);
        if(result.error){
            console.log(result.error);
            toast.error(result.error)
        } else {
            toast.success("Updated profile succcessfully")
            navigate('/admin/userList');
        }
    }


    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user])

  return (
    <>
    <Link to='/admin/userList'><Button className='btn-sm'>Go back</Button></Link>
    <FormContainer>
        <h1 className='mt-3'>Edit user</h1>
        {loadingUpdateUser && <Loader/>}
        {isLoading ? <Loader/> : 
        error ? <Message variant='danger'>{error?.data?.message}</Message> :
        <Form onSubmit={submitHandler}>
            <Form.Group  controlId='name' className='my-2'>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" 
                placeholder="Enter name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group  controlId='email' className='my-2'>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" 
                placeholder="Enter email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} required></Form.Control>
            </Form.Group >
            <Form.Group controlId='isAdmin' className='my-2'>
                <Form.Check type="checkbox" 
                label='isAdmin'
                checked={Boolean(isAdmin)}
                value={isAdmin} 
                onChange={(e) => setIsAdmin(e.target.checked)}>
                </Form.Check>
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-3' disabled={isLoading}>
                Update
            </Button>
            {isLoading && <Loader />}
        </Form>}
    </FormContainer>
    </>
  )
}

export default UserEditScreen