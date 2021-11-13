import { Button, Container, Grid } from '@mui/material';
import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const navigateToSignIn = () => {
    navigate('login');
  };

  const navigateToSignUp = () => {
    navigate('sign-up');
  };

  return (
    <Container fixed>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        {location.pathname === '/feed' && <Button variant="text" onClick={onLogout}>logout</Button>}
        {location.pathname === '/login' && <Button variant="text" onClick={navigateToSignUp}>Sign Up</Button>}
        {location.pathname === '/sign-up' && <Button variant="text" onClick={navigateToSignIn}>Sign In</Button>}
      </Grid>
    </Container>
  );
}
