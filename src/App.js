import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import CallbackPage from './pages/CallbackPage';
import BookingPage from './pages/BookingPage';
import ResponsesPage from './pages/ResponsesPage';
import AdminPage from './pages/AdminPage';
import InvoicePage from './pages/InvoicePage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/booking" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
        <Route path="/responses" element={<ProtectedRoute><ResponsesPage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        <Route path="/invoice/:id" element={<ProtectedRoute><InvoicePage /></ProtectedRoute>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
