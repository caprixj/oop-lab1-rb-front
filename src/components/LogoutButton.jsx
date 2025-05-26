import React from 'react';
import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

export default function LogoutButton() {
  const { logout } = useAuth0();
  return (
    <Button
      variant="outlined"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log out
    </Button>
  );
}
