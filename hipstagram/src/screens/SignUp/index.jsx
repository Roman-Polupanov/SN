import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMutation } from '@apollo/client';
import LinearProgress from '@mui/material/LinearProgress';
import { loginUser, SIGN_IN_QUERY } from '../../queries';

const Copyright = function (props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Hipstagram
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
};

const theme = createTheme();

export default function SignIn({ onSuccess }) {
  const [signIn, { loading: signinInProgress }] = useMutation(SIGN_IN_QUERY);
  const [loginInProgress, setLoginInProgress] = React.useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const login = data.get('login');
    const password = data.get('password');
    const variables = { login, password };

    await signIn({ variables });
    setLoginInProgress(true);
    const { data: { login: token } } = await loginUser(login, password);
    setLoginInProgress(false);

    if (token) {
      localStorage.authToken = token;
      onSuccess();
    } else {
      alert('failed to signUp');
    }
  };

  const isLoading = loginInProgress || signinInProgress;

  return (
    <ThemeProvider theme={theme}>
      { isLoading && <LinearProgress /> }
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Profile
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoComplete="login"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
