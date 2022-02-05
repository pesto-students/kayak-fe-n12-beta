import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventService from '../../api/eventService';
import { IEvent } from '../../common/Interface/IEvent';
import EventCard from '../../components/EventCard';
import EventCardSkeleton from '../../components/EventCardSkeleton';
import LargeImageCard from '../../components/LargeImageCard';
import LargeImageCardSkeleton from '../../components/LargeImageCardSkeleton';
import EVENT_TYPE from '../../constants/Events';
import Heading from '../../material-components/Heading';
import LandingPageHeroContent from './LandingPageHeroContent';
import Stats from './Stats';

const ViewAll = () => {
  return (
    <Link to="/events">
      <Grid mt={4} mb={3} container justifyContent="right" alignItems={'center'}>
        <Typography color="primary" textAlign="center">
          View All
        </Typography>
        <ArrowForwardIcon sx={{ marginLeft: '4px' }} color="primary" />
      </Grid>
    </Link>
  );
};
const Landing = () => {
  const [featuredEvents, setFeaturedEvents] = useState<IEvent[]>();
  const [trendingEvents, setTrendingEvents] = useState<IEvent[]>();
  const [isFeaturedEventLoading, setFeaturedEventLoading] = useState<boolean>(false);
  const [isTrendingEventLoading, setTrendingEventLoading] = useState<boolean>(false);

  const skeletonArray = ['item1', 'item2', 'item3'];

  useEffect(() => {
    setFeaturedEventLoading(true);
    EventService.getFilteredEvents(EVENT_TYPE.FEATURED)
      .then((response) => {
        setFeaturedEvents(response.data);
        setFeaturedEventLoading(false);
      })
      .catch(() => {
        setFeaturedEventLoading(false);
      });
  }, []);

  useEffect(() => {
    setTrendingEventLoading(true);
    EventService.getFilteredEvents(EVENT_TYPE.TRENDING)
      .then((response) => {
        setTrendingEvents(response.data);
        setTrendingEventLoading(false);
      })
      .catch(() => {
        setTrendingEventLoading(false);
      });
  }, []);

  return (
    <>
      <LandingPageHeroContent />

      <Stats />

      {/* Event Status Buttons for filter */}
      <Container sx={{ py: 8 }}>
        {/* event cards  */}

        <Heading heading="Featured Events" />
        <ViewAll />
        <Grid container spacing={4} mb={12}>
          {!isFeaturedEventLoading &&
            featuredEvents &&
            featuredEvents.slice(0, 6).map((featuredEvent: IEvent) => (
              <Grid item key={featuredEvent._id} xs={12} sm={6} md={4}>
                <EventCard {...featuredEvent} />
              </Grid>
            ))}
          {!isFeaturedEventLoading && featuredEvents?.length === 0 && 'No Featured Events Found'}
          {isFeaturedEventLoading &&
            skeletonArray.map((item, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <EventCardSkeleton />
              </Grid>
            ))}
        </Grid>

        <Heading heading="Trending Events" />
        <ViewAll />
        <Grid container spacing={4}>
          {!isTrendingEventLoading &&
            trendingEvents &&
            trendingEvents.slice(0, 6).map((trendingEvent) => (
              <Grid item key={trendingEvent._id} xs={12} sm={6} md={6}>
                <LargeImageCard {...trendingEvent} />
              </Grid>
            ))}
          {!isTrendingEventLoading &&
            trendingEvents?.length === 0 &&
            'No Trending Events to display.'}
          {isTrendingEventLoading &&
            skeletonArray.slice(0, 2).map((item, index) => (
              <Grid item key={index} xs={12} sm={6} md={6}>
                <LargeImageCardSkeleton />
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default Landing;
