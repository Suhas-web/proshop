import {Badge, Navbar, Nav, Container} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import logo from "../assets/logo.png"
import {LinkContainer} from 'react-router-bootstrap'
import { useSelector } from 'react-redux'

const Header = () => {
    const {cartItems} = useSelector(state => state.cart);

    return (<header>
        <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                <Navbar.Brand> <img src={logo} alt="ProShop"></img>ProShop </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-nabar-nav'/>
                <Navbar.Collapse id='basic-nabar-nav'>
                    <Nav className='ms-auto'>
                        <LinkContainer to='/cart'>
                            <Nav.Link><FaShoppingCart/> Cart 
                            {(cartItems !== undefined || cartItems.length !== 0) && (
                                    <Badge pill variant="info" style={{marginLeft: "5px"}}>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</Badge>
                                )
                            }
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/login'>
                            <Nav.Link><FaUser/> Login</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>)
}

export default Header;