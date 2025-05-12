// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AppNavbar() {
  const { user, roles, loading, login, logout } = useAuth();

  return (
    <Navbar expand="lg" style={{ background: 'var(--light)' }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: 'var(--primary)' }}>
          Hotel Booking
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            {user && (
              <>
                <Nav.Link as={Link} to="/booking">Book Room</Nav.Link>
                <Nav.Link as={Link} to="/responses">My Responses</Nav.Link>
                {roles.includes('admin') && (
                  <Nav.Link as={Link} to="/admin">Admin Panel</Nav.Link>
                )}
              </>
            )}
          </Nav>
          <Nav>
            {!loading && !user && (
              <Button variant="outline-primary" onClick={login}>
                Login
              </Button>
            )}
            {!loading && user && (
              <Button variant="outline-danger" onClick={logout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
