import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import SpinnerOverlay from '../components/SpinnerOverlay';
import { useAuth } from '../contexts/AuthContext';

export default function LandingPage() {
  const { user, loading, login } = useAuth();
  if (loading) return <SpinnerOverlay />;
  if (user)    return <Navigate to="/booking" replace />;
  return (
    <Container className="py-5 text-center">
      <h2>Welcome to Hotel Booking</h2>
      <Button onClick={login}
              style={{ background: 'var(--primary)', border: 'none' }}>
        Log In
      </Button>
    </Container>
  );
}
