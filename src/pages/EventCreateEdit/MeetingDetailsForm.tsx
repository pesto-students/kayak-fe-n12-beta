import DateTimePicker from '@mui/lab/DateTimePicker';
import { MenuItem } from '@mui/material';
import { useFormikContext } from 'formik';
import React, { Fragment, memo } from 'react';
import { LOCATION_OPTION } from './constants';
import { StyledTextField } from './styles';

function MeetingDetailsForm() {
  const { values, handleBlur, touched, errors, handleChange, setFieldValue } =
    useFormikContext<any>();

  const handleDateTimeChange = (date: any) => {
    const pitchDate = new Date(date).toISOString();
    setFieldValue('pitchDate', pitchDate);
  };
  return (
    <Fragment>
      <StyledTextField
        name="location"
        label="Location"
        placeholder="Select Location"
        variant="outlined"
        size="medium"
        type="text"
        fullWidth
        select
        sx={{ textAlign: 'left' }}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.location || ''}
        error={!!touched.location && !!errors.location}
        helperText={touched.location && errors.location}>
        {LOCATION_OPTION.map((item) => (
          <MenuItem value={item.value} key={item.id}>
            {item.label}
          </MenuItem>
        ))}
      </StyledTextField>

      <DateTimePicker
        label="Pitch Date and Time"
        value={values.pitchDate}
        onChange={(date) => {
          handleDateTimeChange(date);
        }}
        renderInput={(params) => (
          <StyledTextField
            size="medium"
            fullWidth
            name="pitchDate"
            label="Pitch Date and Time"
            placeholder="Select Location"
            variant="outlined"
            value={values.pitchDate || ''}
            error={!!touched.pitchDate && !!errors.pitchDate}
            helperText={touched.pitchDate && errors.pitchDate}
            {...params}
          />
        )}
      />

      <StyledTextField
        name="meetingUrl"
        label="Meeting URL"
        placeholder="Enter Meeting URL"
        variant="outlined"
        size="medium"
        type="text"
        fullWidth
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.meetingUrl || ''}
        error={!!touched.meetingUrl && !!errors.meetingUrl}
        helperText={touched.meetingUrl && errors.meetingUrl}
      />

      <StyledTextField
        name="meetingPassword"
        label="Meeting Password"
        placeholder="Enter Meeting Password"
        variant="outlined"
        size="medium"
        type="text"
        fullWidth
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.meetingPassword || ''}
        error={!!touched.meetingPassword && !!errors.meetingPassword}
        helperText={touched.meetingPassword && errors.meetingPassword}
      />
    </Fragment>
  );
}

export default memo(MeetingDetailsForm);
