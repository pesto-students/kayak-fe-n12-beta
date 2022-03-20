import { Divider, Grid, TextField, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext';

const UserAddress = () => {
  const { user } = useContext(UserContext);

  const { values, handleBlur, touched, errors, handleChange, setFieldValue, setFieldError } =
    useFormikContext<any>();

  const updateFieldValue = () => {
    setFieldValue('street', user?.street);
    setFieldValue('city', user?.city);
    setFieldValue('zipCode', user?.zipCode);
    setFieldValue('country', user?.country);
  };

  useEffect(() => {
    updateFieldValue();
  }, []);

  return (
    <>
      <Typography sx={{ py: 2, fontWeight: 500 }} component="h4" variant="h5" align="left">
        Address
      </Typography>
      <Grid mb={4} container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="street"
            name="street"
            label="Street"
            placeholder="Street"
            type="text"
            fullWidth
            margin="normal"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.street || ''}
            error={!!touched.street && !!errors.street}
            helperText={touched.street && errors.street}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="city"
            name="city"
            label="City"
            placeholder="City"
            type="text"
            fullWidth
            margin="normal"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.city || ''}
            error={!!touched.city && !!errors.city}
            helperText={touched.city && errors.city}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="zipCode"
            name="zipCode"
            label="Zip Code"
            placeholder="Zip Code"
            type="text"
            fullWidth
            margin="normal"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.zipCode || ''}
            error={!!touched.zipCode && !!errors.zipCode}
            helperText={touched.zipCode && errors.zipCode}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="country"
            name="country"
            label="Country"
            placeholder="Country"
            type="text"
            fullWidth
            margin="normal"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.country || ''}
            error={!!touched.country && !!errors.country}
            helperText={touched.country && errors.country}
          />
        </Grid>
      </Grid>
      <Divider sx={{ margin: '48px 0' }} />
    </>
  );
};

export default UserAddress;
