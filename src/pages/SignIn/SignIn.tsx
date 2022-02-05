import LoginIcon from '@mui/icons-material/Login';
import { LoadingButton } from '@mui/lab';
import { Button, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../../api/userService';
import { BACKEND_URL } from '../../constants/auth';
import UserContext from '../../context/UserContext';

export default function SignIn() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isTestButtonLoading, setTestButtonIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const { isUserLoggedIn, setIsUserLoggedIn, setUser, setToken } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    UserService.login(email, password)
      .then((response) => {
        setIsLoading(false);
        setUser(response.data);
        setToken(response.tokenData);
        setIsUserLoggedIn(true);
        navigate('/accounts/profile');
      })
      .catch(() => {
        setIsLoading(false);
        //To-Do Handle update to user login failed
      });
  };

  const loginWithTestAccount = () => {
    setTestButtonIsLoading(true);
    const testEmail = process.env.REACT_APP_TEST_EMAIL || '';
    const testPassword = process.env.REACT_APP_TEST_PASSWORD || '';
    UserService.login(testEmail, testPassword)
      .then((response) => {
        setTestButtonIsLoading(false);
        setUser(response.data);
        setToken(response.tokenData);
        setIsUserLoggedIn(true);
        navigate('/accounts/profile');
      })
      .catch((error) => {
        console.log(error);
        setTestButtonIsLoading(false);
        //To-Do Handle update to user login failed
      });
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate('/accounts/profile');
    }
  }, []);
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 8
        }}>
        <LoginIcon fontSize="large" color="primary" />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={updateEmail}
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
            onChange={updatePassword}
            value={password}
          />
          <LoadingButton
            type="submit"
            loading={isLoading}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Sign In
          </LoadingButton>
          <Button
            href={`${BACKEND_URL}/auth/google`}
            fullWidth
            variant="outlined"
            sx={{ mt: 2, mb: 2 }}>
            Sign In Using Google
          </Button>

          <LoadingButton
            onClick={loginWithTestAccount}
            loading={isTestButtonLoading}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}>
            Sign In Using Test Account
          </LoadingButton>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
            <Grid item>
              <Link to="/forgotpassword">{'Forgot Password?'}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
