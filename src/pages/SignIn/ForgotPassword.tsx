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

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { token } = useParams();

  const [email, setEmail] = useState('');

  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    UserService.forgotPassword(email)
      .then((response) => {
        setIsLoading(false);
        alert('Password reset link set to your registered email.');
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={updateEmail}
            autoFocus
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
