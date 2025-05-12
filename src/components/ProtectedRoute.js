import React from 'react';
import { Navigate } from 'react-router-dom';
import SpinnerOverlay from './SpinnerOverlay';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <SpinnerOverlay />;
  return user ? children : <Navigate to="/" replace />;
}
