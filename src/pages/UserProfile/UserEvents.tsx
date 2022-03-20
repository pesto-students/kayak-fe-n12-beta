import { Grid, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import LargeImageCard from '../../components/LargeImageCard';
import LargeImageCardSkeleton from '../../components/LargeImageCardSkeleton';
import { useEventsContext } from '../../providers/EventsProvider/context';

function UserEvents() {
  const { fetchEvents, events } = useEventsContext();

  const [isEventsLoading, setEventsLoading] = useState<boolean>(false);
  const skeletonArray = ['item1', 'item2'];

  const fetchEventList = useCallback(async () => {
    if (fetchEvents) {
      try {
        setEventsLoading(true);
        await fetchEvents('user-events');
        setEventsLoading(false);
      } catch (error) {
        setEventsLoading(false);
      }
    }
  }, [fetchEvents]);

  useEffect(() => {
    fetchEventList();
  }, [fetchEventList]);

  useEffect(() => {
    if (fetchEvents) fetchEvents('user-events');
  }, [fetchEvents]);
  return (
    <Grid pl={3} container spacing={2}>
      <Grid mb={3} xs={12} sm={6} md={12}>
        <Typography sx={{ pb: 2, fontWeight: 600 }} component="h4" variant="h5" align="left">
          My Events
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        {!isEventsLoading &&
          events.length > 0 &&
          events.map((eventData) => (
            <Grid item key={eventData._id} xs={12} sm={6} md={6}>
              <LargeImageCard {...eventData} />
            </Grid>
          ))}
        {isEventsLoading &&
          skeletonArray.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={6}>
              <LargeImageCardSkeleton />
            </Grid>
          ))}
        {!isEventsLoading && events.length == 0 && (
          <Grid item key="noevent" xs={12} sm={6} md={6}>
            <Typography variant="subtitle1" gutterBottom component="div">
              No Events To Display.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default UserEvents;
