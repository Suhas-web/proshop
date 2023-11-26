import {Carousel, Image} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useGetCarouselProductsQuery } from '../slices/productsApiSlice'
import Message from './Message';

const CarouselPage = () => {
    const {error, isLoading, data} = useGetCarouselProductsQuery();
  return (
    isLoading ? <></> : error ? <Message>{error?.message?.data || error.error}</Message> :
    <Carousel pause='hover' className='bg-primary mb-4'>
      {data.products.map(product => (
      <Carousel.Item key={product._id}>
        <Link to={`/product/${product._id}`}>
        <Image src={product.image} alt={product.name} fluid/>
        <Carousel.Caption>
          <h3>{product.name}</h3>
          <p>{String(product.description)}</p>
        </Carousel.Caption>
        </Link>
      </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default CarouselPage