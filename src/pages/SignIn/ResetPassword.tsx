import React, { useState } from 'react';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import UserService from '../../api/userService';
import { LoadingButton } from '@mui/lab';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { token } = useParams();

  const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const updateConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    UserService.resetPassword(password, confirmPassword, token)
      .then((response) => {
        setIsLoading(false);
        navigate('/signin');
      })
      .catch((response) => {
        setIsLoading(false);
        //To-Do Handle update to user password reset failed
        alert('Password Reset Failed.');
      });
  };

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
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={updatePassword}
            value={password}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            onChange={updateConfirmPassword}
            value={confirmPassword}
          />

          <LoadingButton
            type="submit"
            loading={isLoading}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Reset Password
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signin">{'Sign In'}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
