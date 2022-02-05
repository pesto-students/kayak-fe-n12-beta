import { MenuItem } from '@mui/material';
import { useFormikContext } from 'formik';
import React, { Fragment, memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { CATEGORIES } from '../../constants/Categories';
import { useEventsContext } from '../../providers/EventsProvider/context';
import { DatePicker, StyledTextField } from './styles';

function DetailsForm() {
  const { eventId } = useParams();
  const { getEventById } = useEventsContext();
  const { values, handleBlur, touched, errors, handleChange, setFieldValue, setFieldError } =
    useFormikContext<any>();
  const handleDateChange = (date: any, keyboardInput?: string) => {
    let startDate = '';
    if (keyboardInput) {
      try {
        startDate = new Date(keyboardInput).toISOString();
      } catch (error) {
        setFieldError('startDate', 'Please enter a valid date in mm/dd/yyyy format');
      }
    }
    if (date && !keyboardInput) {
      startDate = new Date(date).toISOString();
    }
    setFieldValue('startDate', startDate);
  };
  const fetchEvent = useCallback(async () => {
    if (eventId && getEventById) {
      const eventData = await getEventById(eventId);
      setFieldValue('name', eventData?.data?.name);
      setFieldValue('description', eventData?.data?.description);
      setFieldValue('category', eventData?.data?.category);
      setFieldValue('startDate', eventData?.data?.startDate);
      setFieldValue('expectedFunding', eventData?.data?.expectedFunding);
      setFieldValue('location', eventData?.data?.location);
      setFieldValue('pitchDate', eventData?.data?.pitchDate);
      setFieldValue('meetingUrl', eventData?.data?.meetingUrl);
      setFieldValue('meetingPassword', eventData?.data?.meetingPassword);
      setFieldValue('detailedInformation', eventData?.data?.detailedInformation);
      setFieldValue('highlightingImageVideoURL', eventData?.data?.highlightingImageVideoURL);
    }
  }, [eventId, getEventById]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);
  return (
    <Fragment>
      <StyledTextField
        name="name"
        label="Name"
        placeholder="Enter Name"
        variant="outlined"
        size="medium"
        type="text"
        fullWidth
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.name || ''}
        error={!!touched.name && !!errors.name}
        helperText={touched.name && errors.name}
      />

      <StyledTextField
        name="description"
        label="Description"
        placeholder="Enter Description"
        variant="outlined"
        size="medium"
        type="text"
        fullWidth
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.description || ''}
        error={!!touched.description && !!errors.description}
        helperText={touched.description && errors.description}
      />

      <StyledTextField
        name="category"
        label="Category"
        placeholder="Select Event Category"
        variant="outlined"
        size="medium"
        type="text"
        fullWidth
        select
        sx={{ textAlign: 'left' }}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.category || ''}
        error={!!touched.category && !!errors.category}
        helperText={touched.category && errors.category}>
        {CATEGORIES.map((item) => (
          <MenuItem value={item.key} key={item.id}>
            {item.value}
          </MenuItem>
        ))}
      </StyledTextField>

      <StyledTextField
        name="expectedFunding"
        label="Expected Funding"
        placeholder="Enter Expected Funding"
        variant="outlined"
        size="medium"
        type="text"
        fullWidth
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.expectedFunding || ''}
        error={!!touched.expectedFunding && !!errors.expectedFunding}
        helperText={touched.expectedFunding && errors.expectedFunding}
      />

      <DatePicker
        label="Start Date"
        inputFormat="MM/dd/yyyy"
        value={values.startDate}
        onChange={(date, input) => {
          handleDateChange(date, input);
        }}
        renderInput={(params) => (
          <StyledTextField
            name="startDate"
            value={values.startDate || ''}
            error={!!touched.startDate && !!errors.startDate}
            helperText={touched.startDate && errors.startDate}
            fullWidth
            size="medium"
            {...params}
          />
        )}
      />
    </Fragment>
  );
}

export default memo(DetailsForm);
