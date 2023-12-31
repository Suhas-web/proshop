import {Badge, Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import logo from "../assets/logo.png"
import {LinkContainer} from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { toast } from 'react-toastify'
import { clearCartItems } from '../slices/cartSlice'
import SearchBox from './SearchBox'

const Header = () => {
    const {cartItems} = useSelector(state => state.cart);
    const {userInfo} = useSelector(state => state.auth);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApi] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApi().unwrap();
            dispatch(logout());
            dispatch(clearCartItems())
            navigate('/login')
        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    }

    return (<header>
        <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                <Navbar.Brand> <img src={logo} alt="ProShop"></img>ProShop </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-nabar-nav'/>
                <Navbar.Collapse id='basic-nabar-nav'>
                    <Nav className='ms-auto'>
                        <SearchBox/>
                        <LinkContainer to='/cart'>
                            <Nav.Link><FaShoppingCart/> Cart 
                            {(cartItems !== undefined || cartItems.length !== 0) && (
                                    <Badge pill variant="info" style={{marginLeft: "5px"}}>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</Badge>
                                )
                            }
                            </Nav.Link>
                        </LinkContainer>
                        {userInfo && userInfo.isAdmin && 
                        (<NavDropdown title='Admin' username="AdminMenu">
                            <LinkContainer to='/admin/productList'>
                                <NavDropdown.Item>Products</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/userList'>
                                <NavDropdown.Item>Users</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/orderList'>
                                <NavDropdown.Item>Orders</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>)}
                        {userInfo ? 
                        (<NavDropdown title={userInfo.name} id='username'>
                            <LinkContainer to='/users/profile'>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                        </NavDropdown>) :
                        <LinkContainer to='/login'>
                            <Nav.Link><FaUser/> Login</Nav.Link>
                        </LinkContainer>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>)
}

export default Header;