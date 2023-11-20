import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import UserResponse from "../types/userResponse";

type HeaderProps = {
    currentUser: UserResponse | null;
};

function Header({ currentUser }: HeaderProps) {
    return (
        <Navbar
            expand='lg'
            className=' bg-info z-3   position-fixed top-0  w-100'>
            <Container>
                <Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link as={Link} to='/'>
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to='/questions'>
                            Questions
                        </Nav.Link>
                    </Nav>
                    <div className='d-flex gap-5'>
                        {!currentUser ? (
                            <>
                                <Nav.Link
                                    className='btn btn-primary'
                                    as={Link}
                                    to='/signup'>
                                    SignUp
                                </Nav.Link>
                                <Nav.Link
                                    className='btn btn-success'
                                    as={Link}
                                    to='/login'>
                                    Login
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link
                                    className='fs-3 text-danger'
                                    as={Link}
                                    to='/logout'>
                                    Logout
                                </Nav.Link>
                            </>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
