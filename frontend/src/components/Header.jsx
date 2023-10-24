import {Badge, Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import logo from "../assets/logo.png"
import {LinkContainer} from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { toast } from 'react-toastify'

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
                        <LinkContainer to='/cart'>
                            <Nav.Link><FaShoppingCart/> Cart 
                            {(cartItems !== undefined || cartItems.length !== 0) && (
                                    <Badge pill variant="info" style={{marginLeft: "5px"}}>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</Badge>
                                )
                            }
                            </Nav.Link>
                        </LinkContainer>
                        {userInfo ? 
                        (<NavDropdown title={userInfo.name} id='username'>
                            <LinkContainer to='/profile'>
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