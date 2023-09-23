import {Navbar, Nav, Container} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import logo from "../assets/logo.png"

const Header = () => {
    return (<header>
        <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
            <Container>
                <Navbar.Brand href = '/'> <img src={logo} alt="ProShop"></img>ProShop </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-nabar-nav'/>
                <Navbar.Collapse id='basic-nabar-nav'>
                    <Nav className='ms-auto'>
                        <Nav.Link href='/cart'><FaShoppingCart/> Cart</Nav.Link>
                        <Nav.Link href='/login'><FaUser/> Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>)
}

export default Header;