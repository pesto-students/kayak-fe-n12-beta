import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import HeroImage from '../../material-components/HeroImage';

const PersonalInformation = () => {
  const { user } = useContext(UserContext);

  const { values, handleBlur, touched, errors, handleChange, setFieldValue, setFieldError } =
    useFormikContext<any>();

  const updateFieldValue = () => {
    setFieldValue('firstname', user?.firstname);
    setFieldValue('lastname', user?.lastname);
    setFieldValue('email', user?.email);
    setFieldValue('contactNumber', user?.contactNumber);
  };

  useEffect(() => {
    updateFieldValue();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid mb={2} item xs={12} sm={6} md={3}>
          <HeroImage src={user.picture} height={'80%'} width={'100%'} />
          <Button
            sx={{ marginTop: '8px', color: '#fff' }}
            fullWidth
            variant="contained"
            type="submit">
            Update Profile
          </Button>
        </Grid>
        <Grid mb={3} item xs={12} sm={6} md={9}>
          <Typography sx={{ pb: 2, fontWeight: 500 }} component="h4" variant="h5" align="left">
            Personal Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                id="firstname"
                name="firstname"
                label="First Name"
                placeholder="First Name"
                type="text"
                fullWidth
                margin="normal"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstname || ''}
                error={!!touched.firstname && !!errors.firstname}
                helperText={touched.firstname && errors.firstname}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                id="lastname"
                name="lastname"
                label="Last Name"
                placeholder="Last Name"
                type="text"
                fullWidth
                margin="normal"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastname || ''}
                error={!!touched.lastname && !!errors.lastname}
                helperText={touched.lastname && errors.lastname}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                id="email"
                name="email"
                label="Email Address"
                placeholder="Email Address"
                type="text"
                fullWidth
                margin="normal"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email || ''}
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                id="contactNumber"
                name="contactNumber"
                label="Contact Number"
                placeholder="Contact Number"
                type="text"
                fullWidth
                margin="normal"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contactNumber || ''}
                error={!!touched.contactNumber && !!errors.contactNumber}
                helperText={touched.contactNumber && errors.contactNumber}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ margin: '32px 0' }} />
    </>
  );
};

export default PersonalInformation;
