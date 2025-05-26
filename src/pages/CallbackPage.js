import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SpinnerOverlay from '../components/SpinnerOverlay';
import { useAuth } from '../contexts/AuthContext';

export default function CallbackPage() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (!code) return navigate('/', { replace: true });

    fetch(`/callback?code=${code}`)
      .then(res => res.json())
      .then(data => {
        setToken(data.idToken);
        const isAdmin = (data.roles || []).includes('ADMIN');
        navigate(isAdmin ? '/admin' : '/booking', { replace: true });
      })
      .catch(() => navigate('/', { replace: true }));
  }, [search, setToken, navigate]);

  return <SpinnerOverlay />;
}
