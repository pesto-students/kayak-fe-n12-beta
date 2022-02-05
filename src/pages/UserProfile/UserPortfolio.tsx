import { Grid, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import EventCardSkeleton from '../../components/EventCardSkeleton';
import PortfolioEventCard from '../../components/PortfolioEventCard';
import { useEventsContext } from '../../providers/EventsProvider/context';

function UserPortfolio() {
  const { fetchPortfolio, portfolio } = useEventsContext();
  const [isPortfolioLoading, setPorfolioLoading] = useState<boolean>(false);
  const skeletonArray = ['item1', 'item2'];

  const fetchPortfolioList = useCallback(async () => {
    if (fetchPortfolio) {
      try {
        setPorfolioLoading(true);
        await fetchPortfolio();
        setPorfolioLoading(false);
      } catch (error) {
        setPorfolioLoading(false);
      }
    }
  }, [fetchPortfolio]);

  useEffect(() => {
    fetchPortfolioList();
  }, [fetchPortfolioList]);
  return (
    <Grid pl={3} container spacing={2}>
      <Grid mb={3} xs={12} sm={6} md={12}>
        <Typography sx={{ pb: 2, fontWeight: 600 }} component="h4" variant="h5" align="left">
          My Events
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        {!isPortfolioLoading &&
          portfolio.length > 0 &&
          portfolio.map((eventData) => (
            <Grid item key={eventData._id} xs={12} sm={6} md={6}>
              <PortfolioEventCard {...eventData} />
            </Grid>
          ))}
        {isPortfolioLoading &&
          skeletonArray.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={6}>
              <EventCardSkeleton />
            </Grid>
          ))}
        {!isPortfolioLoading && portfolio.length == 0 && (
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

export default UserPortfolio;
