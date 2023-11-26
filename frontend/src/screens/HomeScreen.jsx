import {Row, Col} from 'react-bootstrap';
import Product from "../components/Product";
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import CarouselPage from '../components/CarouselPage';
import Meta from '../components/Meta';

const HomeScreen = () => {
    const {pageNumber, keyword} = useParams();
    const {data, error, isLoading} = useGetProductsQuery({pageNumber, keyword});
    const title = keyword ? `Search results for ${keyword.trim()}` : 'Latest Products'

    return (
    <>
    {keyword ? <Link to='/' className='my-3'>See all products</Link> : 
    <CarouselPage/>
    }
    {isLoading ? <Loader/> : 
    error ? <Message variant="danger">{error?.data?.message || error.error}</Message> : 
        <>
            <Meta/>
            <h1>{title}</h1>
            <Row>
                {data && data.products && data.products.length > 0 ? 
                data.products.map((product) => 
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                    <Product product={product}/>
                </Col>
                ) : <h2>No products found</h2>}
            </Row>
            <Paginate pages={data.pages} page={data.page} keyword={keyword}/>
        </>}
    </>
    );
    
}

export default HomeScreen;