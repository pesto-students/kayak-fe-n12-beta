import React from 'react';
import EventsProvider from '../../providers/EventsProvider';
import EventDescription from './EventDescription';

function EventDetails() {
  return (
    <EventsProvider>
      <EventDescription />
    </EventsProvider>
  );
}

export default EventDetails;
