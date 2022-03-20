import { Formik } from 'formik';
import React, { memo, useState } from 'react';
import { useParams } from 'react-router';
import { useEventsContext } from '../../providers/EventsProvider/context';
import { FORM_OPTION } from './constants';
import DetailsForm from './DetailsForm';
import FormStepper from './FormStepper';
import LongDescriptionForm from './LongDescriptionForm';
import MediaUploadForm from './MediaUploadForm';
import MeetingDetailsForm from './MeetingDetailsForm';

function EventForm() {
  const { eventId } = useParams();
  const { createEvent, editEvent } = useEventsContext();
  const handleFormSubmit = async (values: any) => {
    if (eventId && editEvent) {
      editEvent(values, eventId);
      return;
    }
    if (createEvent) createEvent(values);
  };

  const [step, setStep] = useState<number>(0);

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleReset = () => {
    setStep(0);
  };

  return (
    <Formik
      initialValues={FORM_OPTION[step].initialValue}
      validationSchema={FORM_OPTION[step].schema}
      onSubmit={handleFormSubmit}>
      <FormStepper
        activeStep={step}
        handleBack={handleBack}
        handleNext={handleNext}
        handleReset={handleReset}>
        {step === 0 && <DetailsForm />}
        {step === 1 && <MeetingDetailsForm />}
        {step === 2 && <LongDescriptionForm />}
        {step === 3 && <MediaUploadForm />}
      </FormStepper>
    </Formik>
  );
}

export default memo(EventForm);
