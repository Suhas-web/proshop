import React, { useEffect, useState } from 'react'
import { useGetProductsDetailQuery, useUpdateProductMutation } from '../../slices/productsApiSlice';
import { LinkContainer } from 'react-router-bootstrap';
import {Row, Col, Button, Form} from 'react-bootstrap'
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import { useUploadProductImageMutation } from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
    const {id: productId} = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const {data: product, error, isLoading} = useGetProductsDetailQuery(productId);
    const [updateProduct, {isLoading: loadingUpdateProduct}] = useUpdateProductMutation();
    const [uploadProductImage, {isLoading: loadingUpload}] = useUploadProductImageMutation();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const updatedProduct = {
            _id: productId,
            name,
            price,
            brand,
            image,
            category,
            countInStock,
            description
        };
        const result = await updateProduct(updatedProduct);
        if(result.error){
            console.log(result.error);
            toast.error(result.error)
        } else {
            toast.success("Updated profile succcessfully")
            navigate('/admin/productList');
        }
    }

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0])
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            console.log("Response image URL: " + res.image);
            setImage(res.image);
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.error)
        }
    }

    useEffect(()=>{
        if(product){
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCountInStock(product.countInStock);
            setCategory(product.category);
            setDescription(product.description);
        }
    }, [product])

  return (
    <>
    <Link to='/admin/productList'><Button className='btn-sm'>Go back</Button></Link>
    <FormContainer>
        <h1 className='mt-3'>Edit Product</h1>
        {loadingUpdateProduct && <Loader/>}
        {isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
        <Form onSubmit={submitHandler}>
            <Form.Group  controlId='name' className='my-2'>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" 
                placeholder="Enter name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group  controlId='price' className='my-2'>
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" 
                placeholder="Enter price" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} required></Form.Control>
            </Form.Group >
            <Form.Group controlId='image' className='my-2'>
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" 
                placeholder="Enter Image url" 
                value={image} 
                onChange={(e) => setImage(e.target.value)}></Form.Control>
                <Form.Control type="file" 
                label="Choose file"
                onChange={uploadFileHandler}></Form.Control>
            </Form.Group>
            <Form.Group  controlId='brand' className='my-2'>
                <Form.Label>Brand</Form.Label>
                <Form.Control type="text" 
                placeholder="Enter brand" 
                value={brand} 
                onChange={(e) => setBrand(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group  controlId='countInStock' className='my-2'>
                <Form.Label>countInStock</Form.Label>
                <Form.Control type="text" 
                placeholder="Enter countInStock" 
                value={countInStock} 
                onChange={(e) => setCountInStock(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group  controlId='category' className='my-2'>
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" 
                placeholder="Enter category" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group  controlId='description' className='my-2'>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" 
                placeholder="Enter description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} required></Form.Control>
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

export default ProductEditScreen