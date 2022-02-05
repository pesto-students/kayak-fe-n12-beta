import { Box, Button, Grid, Step, StepLabel, Stepper } from '@mui/material';
import { useFormikContext } from 'formik';
import React, { memo } from 'react';
import { steps } from './constants';
import { FormContainer } from './styles';

interface IFormStepperProps {
  children: React.ReactNode;
  activeStep: number;
  handleNext: VoidFunction;
  handleReset: VoidFunction;
  handleBack: VoidFunction;
}

function FormStepper({ children, activeStep, handleNext, handleBack }: IFormStepperProps) {
  const { handleSubmit, validateForm, setFieldError, setErrors } = useFormikContext();

  const onClickNextHandler = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const form: any = await validateForm();

    if (form && Object.keys(form).length === 0) {
      handleNext();
    }
    for (const key in form) {
      setFieldError(key, form[key] as string);
      setErrors(form);
    }
  };
  return (
    <Grid md={8} xs={12}>
      <Stepper activeStep={activeStep}>
        {steps.map((item) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={item.value} {...stepProps}>
              <StepLabel {...labelProps}>{item.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <FormContainer onSubmit={handleSubmit}>
        {children}
        <Box mt={2} sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />

          <Button
            type={activeStep === steps.length - 1 ? 'submit' : 'button'}
            onClick={onClickNextHandler}
            variant="contained">
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </FormContainer>
    </Grid>
  );
}

export default memo(FormStepper);
