import LockOpenIcon from '@mui/icons-material/LockOpen';
import { LoadingButton } from '@mui/lab';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../../api/userService';
import UserContext from '../../context/UserContext';

export default function CollectUserInformation() {
  const { isUserLoggedIn, setIsUserLoggedIn, setUser, setToken } = useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [pan, setPan] = useState('');

  const updateCompanyName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(event.target.value);
  };

  const updateCompanyType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyType(event.target.value);
  };

  const updateRegistrationNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationNumber(event.target.value);
  };

  const updatePan = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPan(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    UserService.updateUser(companyName, companyType, registrationNumber, pan)
      .then((response) => {
        setIsLoading(false);
        setUser(response.data);
        setToken(response.token);
        setIsUserLoggedIn(true);
        navigate('/accounts/profile');
      })
      .catch((error) => {
        setIsLoading(false);
        alert('Unable to register please try again');
      });
  };

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
          Enter Company Information
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="companyName"
                fullWidth
                id="companyName"
                label="Company Name"
                value={companyName}
                onChange={updateCompanyName}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="companyType"
                label="Company Type"
                name="companyType"
                value={companyType}
                onChange={updateCompanyType}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="registrationNumber"
                label="Registration Number"
                name="registrationNumber"
                value={registrationNumber}
                onChange={updateRegistrationNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="pan"
                label="Pan"
                type="pan"
                id="pan"
                onChange={updatePan}
                value={pan}
              />
            </Grid>
          </Grid>
          <LoadingButton
            loading={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Update
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/accounts/profile">Skip</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
