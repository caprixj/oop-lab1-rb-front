import { useAuth0 } from '@auth0/auth0-react';

export function useAuthService() {
  const {
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
    handleRedirectCallback,
    user,
    isAuthenticated,
    isLoading
  } = useAuth0();

  return {
    login: loginWithRedirect,
    logout: () => logout({ returnTo: window.location.origin }),
    handleCallback: handleRedirectCallback,
    getToken: getAccessTokenSilently,
    user,
    isAuthenticated,
    isLoading
  };
}
