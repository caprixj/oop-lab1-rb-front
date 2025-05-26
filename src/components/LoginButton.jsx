import React from 'react';
import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      variant="contained"
      onClick={() =>
        loginWithRedirect({ appState: { returnTo: '/booking' } })
      }
    >
      Log in
    </Button>
  );
}
