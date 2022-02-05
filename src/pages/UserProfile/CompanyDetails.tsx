import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import { COMPANY_TYPE } from './constants';

const CompanyDetails = () => {
  const { user } = useContext(UserContext);

  const { values, handleBlur, touched, errors, handleChange, setFieldValue, setFieldError } =
    useFormikContext<any>();

  const updateFieldValue = () => {
    setFieldValue('company', user?.company);
    setFieldValue('companyType', user?.companyType);
    setFieldValue('pan', user?.pan);
  };

  useEffect(() => {
    updateFieldValue();
  }, []);

  return (
    <>
      <Typography sx={{ pb: 2, fontWeight: 500 }} component="h4" variant="h5" align="left">
        Company Information
      </Typography>
      <Grid mb={4} container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="company"
            name="company"
            label="Company"
            placeholder="Company"
            type="text"
            fullWidth
            margin="normal"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.company || ''}
            error={!!touched.company && !!errors.company}
            helperText={touched.company && errors.company}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="companyType"
            name="companyType"
            label="Company Type"
            placeholder="Select Location"
            type="text"
            fullWidth
            margin="normal"
            select
            sx={{ textAlign: 'left' }}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.companyType || ''}
            error={!!touched.companyType && !!errors.companyType}
            helperText={touched.companyType && errors.companyType}
            defaultValue="">
            {COMPANY_TYPE.map((item) => (
              <MenuItem value={item.value} key={item.id}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            id="pan"
            name="pan"
            label="Pan"
            placeholder="Pan"
            type="text"
            fullWidth
            margin="normal"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.pan || ''}
            error={!!touched.pan && !!errors.pan}
            helperText={touched.pan && errors.pan}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CompanyDetails;
