import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import BookingPage from './pages/BookingPage';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently
  } = useAuth0();
  const navigate = useNavigate();
  const namespace = 'https://room-booking-api/';
  const roles = user?.[`${namespace}roles`] || [];
  const isAdmin = roles.includes('admin');
  const isClient = roles.includes('client');

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE
      }).catch(console.error);
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (isAdmin) {
        navigate('/admin', { replace: true });
      } else if (isClient) {
        navigate('/booking', { replace: true });
      }
    }
  }, [isLoading, isAuthenticated, isAdmin, isClient, navigate]);

  if (isLoading) {
    return <div>Loading…</div>;
  }

  return (
    <>
      {isAuthenticated && <LogoutButton sx={{ position: 'absolute', top: 16, right: 16 }} />}
      <Routes>
        <Route
          path="/admin"
          element={isAuthenticated && isAdmin ? <AdminPanel /> : <Navigate to="/" replace />}
        />
        <Route
          path="/booking"
          element={isAuthenticated && isClient ? <BookingPage /> : <Navigate to="/" replace />}
        />
        <Route path="/" element={<LoginButton />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
