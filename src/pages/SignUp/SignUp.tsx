import LockOpenIcon from '@mui/icons-material/LockOpen';
import { LoadingButton } from '@mui/lab';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../../api/userService';
import UserContext from '../../context/UserContext';

function SignUp() {
  const { isUserLoggedIn, setIsUserLoggedIn, setUser, setToken } = useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const updateFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const updateLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    UserService.signUp(email, password, firstName, lastName)
      .then((response) => {
        setIsLoading(false);
        setUser(response.data);
        setToken(response.tokenData);
        setIsUserLoggedIn(true);
        navigate('/collectuserinfo');
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.message) {
          alert('User already Exists please sing in ');
          navigate('/signin');
        } else {
          alert('Unable to register please try again');
        }
      });
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate('/accounts/profile');
    }
  }, []);

  return (
    <Container sx={{ py: 2 }} maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 8
        }}>
        <LockOpenIcon fontSize="large" color="primary" />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={updateFirstName}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={updateLastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={updateEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={updatePassword}
                value={password}
              />
            </Grid>
          </Grid>
          <LoadingButton
            loading={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signin">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
