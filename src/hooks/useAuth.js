import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export default function useAuth() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  return { isAuthenticated, isLoading };
}
