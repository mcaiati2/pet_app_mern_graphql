import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { useStore } from '../store';

function Header() {
  const {state} = useStore()!;

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Petstagram</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>

          {state.user ? (
            <>
              <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
              <Nav.Link as={NavLink} to="/pet">Add Pet</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
              <Nav.Link as={NavLink} to="/login">Log In</Nav.Link>
            </>
          )}
        
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header;