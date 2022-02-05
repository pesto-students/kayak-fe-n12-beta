import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import React from 'react';
import EventsProvider from '../../providers/EventsProvider';
import UploadProvider from '../../providers/UploadProvider';
import EventForm from './EventForm';
import { Container } from './styles';

function EventCreateEdit() {
  return (
    <Container>
      <UploadProvider>
        <EventsProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <EventForm />
          </LocalizationProvider>
        </EventsProvider>
      </UploadProvider>
    </Container>
  );
}

export default EventCreateEdit;
