import {Row, Col, Button, Table} from 'react-bootstrap';
import { useCreateProductMutation, useGetProductsQuery} from '../../slices/productsApiSlice'
import Loader from '../../components/Loader' 
import Message from '../../components/Message' 
import { FaEdit, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap'
import {toast} from 'react-toastify'
import { useDeleteProductMutation } from '../../slices/productsApiSlice';
import { useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';

const ProductListScreen = () => {

    const {pageNumber} = useParams();
    const {data, error, isLoading, refetch} = useGetProductsQuery({pageNumber});
    const [deleteProduct, {isLoading: loadingDelete}] = useDeleteProductMutation();
    const deleteProductHandler = async (id) => {
      try {
        await deleteProduct(id);
        toast.success("Deleted product successfully")
        refetch();
      } catch (err) {
          console.log(err);
          toast.error(err?.data?.message || err?.error);
      }
    }
    const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation();
    const createProductHandler = async () => {
      if(window.confirm('Are you sure you want to create a new product? ')){
        try {
          await createProduct();
          refetch();
        } catch (err) {
          console.log(err);
          toast.error(err?.data?.message || err?.error);
        }
      }
    }
    return (
    <>
    <Row>
      <Col><h1>Products</h1></Col>
      <Col className='text-end'><Button onClick={()=>createProductHandler()} className='btn-sm m-3'><FaEdit/> Create Product</Button></Col>
    </Row>
    {loadingDelete && <Loader/>}
    {loadingCreate && <Loader/>}
    {isLoading ? <Loader/> : 
    error ? <Message variant="danger">{error?.data?.message || error.error}</Message> : 
    <>
      <Table striped hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ProductID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
         {data.products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <Button className="btn-sm mx-2" variant="light"><FaEdit/></Button>
                </LinkContainer>
              </td>
              <td>
                <Button className="btn-sm mx-2" variant="danger" onClick={() => deleteProductHandler(product._id)}><FaTrash/></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>}
        <Paginate pages={data.pages} page={data.page} isAdmin={true}/>
    </>
    );
};

export default ProductListScreen;
