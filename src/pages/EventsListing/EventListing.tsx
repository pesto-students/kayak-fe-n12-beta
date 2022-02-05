import { Grid, Typography } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { IEvent } from '../../common/Interface/IEvent';
import LargeImageCard from '../../components/LargeImageCard';
import LargeImageCardSkeleton from '../../components/LargeImageCardSkeleton';
import { useEventsContext } from '../../providers/EventsProvider/context';
import { blue } from '../../styles/themeColors';
import EventsPageHeroContent from './EventsPageHeroContent';
import FilterButton from './FilterButton';
import FilterListing from './FilterListing';

const EventListing = () => {
  const [searchParams] = useSearchParams();
  const [filterCategory, setFilterCategory] = useState<string[] | undefined>();
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [eventsCount, setEventsCount] = useState(0);

  const [eventsList, setEventsList] = useState<Array<IEvent>>([]);

  const { fetchEvents, events } = useEventsContext();
  const { status } = useParams();

  const [isEventsLoading, setEventsLoading] = useState<boolean>(false);
  const skeletonArray = ['item1', 'item2', 'item3', 'item4'];

  const fetchEventList = useCallback(async () => {
    if (fetchEvents && status) {
      try {
        setEventsLoading(true);
        await fetchEvents(status);
        setEventsLoading(false);
      } catch (error) {
        setEventsLoading(false);
      }
    }
  }, [fetchEvents, status]);

  useEffect(() => {
    fetchEventList();
  }, [fetchEventList]);

  useEffect(() => {
    let filteredEvents = [];

    if (
      filterCategory?.length === 1 &&
      filterCategory[0] === '' &&
      minAmount === 0 &&
      maxAmount === 0 &&
      !startDate &&
      !endDate
    ) {
      filteredEvents = [...events];
    } else {
      filteredEvents = events.filter((event) => {
        const category =
          filterCategory && filterCategory.includes(event.category.toLocaleLowerCase());
        const min = minAmount && minAmount <= event.expectedFunding;
        const max = maxAmount && event.expectedFunding <= maxAmount;
        const sDate = startDate && startDate < new Date(event.startDate);
        const eDate = endDate && new Date(event.startDate) < endDate;

        if (category || min || max || sDate || eDate) return true;
        return false;
      });
    }

    setEventsList(filteredEvents);
    setEventsCount(filteredEvents.length);
  }, [filterCategory, minAmount, maxAmount, startDate, endDate, events]);

  useEffect(() => {
    try {
      const categoryFilter = searchParams.get('category')?.split(',') || [''];
      const startDateFilter = searchParams.get('Start Date');
      const endDateFilter = searchParams.get('End Date');
      const minAmountFilter = searchParams.get('min');
      const maxAmountFilter = searchParams.get('max');
      if (categoryFilter) {
        setFilterCategory(categoryFilter);
      }
      if (startDateFilter) {
        setStartDate(startDate);
      }

      if (endDateFilter) {
        setEndDate(endDate);
      }

      if (minAmountFilter) {
        setMinAmount(parseInt(minAmountFilter));
      }

      if (maxAmountFilter) {
        setMaxAmount(parseInt(maxAmountFilter));
      }
    } catch (error) {
      console.log(error);
    }
  }, [searchParams]);

  return (
    <div>
      {/* <StyledButton /> */}
      <EventsPageHeroContent />
      <Grid sx={{ py: 8, px: 8, background: blue[50] }}>
        {/*  */}
        <FilterButton />
        {/*  */}
        <Grid sx={{ pt: 2 }} container spacing={2}>
          <Grid item xs={12} sm={3} md={3}>
            <FilterListing />
          </Grid>
          <Grid item xs={12} sm={9} md={9}>
            <Typography variant="caption" display="block" gutterBottom>
              Viewing {eventsCount} of {events?.length} events.
            </Typography>
            <Grid container spacing={2}>
              {!isEventsLoading &&
                eventsList.length > 0 &&
                eventsList.map((eventData) => (
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
              {!isEventsLoading && eventsCount == 0 && (
                <Grid item key="noevent" xs={12} sm={6} md={6}>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    No Events To Display.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={4}></Grid>
      </Grid>
    </div>
  );
};
export default memo(EventListing);
