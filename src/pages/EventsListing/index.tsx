import React from 'react';
import EventsProvider from '../../providers/EventsProvider';
import EventListing from './EventListing';

function BrowseEvents() {
  return (
    <EventsProvider>
      <EventListing />
    </EventsProvider>
  );
}

export default BrowseEvents;
