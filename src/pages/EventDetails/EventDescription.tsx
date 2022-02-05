import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import parse from 'html-react-parser';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventService from '../../api/eventService';
import { IEvent } from '../../common/Interface/IEvent';
import EventDetailsSkeleton from '../../components/EventDetailsSkeleton';
import { useSnackbarContext } from '../../components/Snackbar/context';
import HeroImage from '../../material-components/HeroImage';
import { useEventsContext } from '../../providers/EventsProvider/context';
import RazorpayProvider from '../../providers/RazorpayProvider';
import { formatDate, getEventDaysLeft, getEventStatusByStartDate } from '../../utils/date.utils';
import RazorpayRedirect from './RazorpayRedirect';

const EventDescription = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState<IEvent>();
  const [isLoading, setIsLoading] = useState(false);
  const [isRazorpayDialogOpen, setRazorpayDialogOpen] = useState<boolean>(false);
  const [isEventsLoading, setEventsLoading] = useState<boolean>(false);
  const {
    ToastService: { showToast }
  } = useSnackbarContext();

  const { getEventById } = useEventsContext();

  const [amount, setAmount] = useState<number | string>('');
  const [eventStatus, setEventStatus] = useState<string>();

  const getPercentage = () => {
    if (eventData !== undefined) {
      return Math.round((eventData.totalFunding * 100) / eventData.expectedFunding);
    } else return 0;
  };

  const updateAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value) {
      setAmount(parseInt(value));
    } else setAmount('');
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);

    EventService.subscribe(eventData?._id || '')
      .then(() => {
        setIsLoading(false);
        // show sucess alert
      })
      .catch((response) => {
        setIsLoading(false);
      });
  };

  const fetchEvent = useCallback(async () => {
    if (getEventById && eventId) {
      try {
        setEventsLoading(true);
        const response = await getEventById(eventId);
        const event = response?.data;
        const singleEvent = {
          _id: event?._id,
          name: event?.name,
          creatorId: event?.creatorId,
          creatorName: event?.creatorName,
          description: event?.description,
          status: event?.status,
          category: event?.category,
          isEventPublished: event?.isEventPublished,
          highlightingImageVideoURL: event?.highlightingImageVideoURL,
          totalFunding: event?.totalFunding,
          expectedFunding: event?.expectedFunding,
          location: event?.location,
          meetingUrl: event?.meetingUrl,
          meetingPassword: event?.meetingPassword,
          pitchDate: event?.pitchDate,
          pitchDateTimestamp: event?.pitchDateTimestamp,
          startDate: event?.startDate,
          startDateTimestamp: event?.startDateTimestamp,
          detailedInformation: event?.detailedInformation,
          backers: event?.backers,
          subscribers: event?.subscribers,
          viewCount: event?.viewCount
        };
        setEventData(singleEvent);
        setEventsLoading(false);
      } catch (error) {
        setEventsLoading(false);
      }
    }
  }, [eventId, getEventById]);

  useEffect(() => {
    setEventStatus(getEventStatusByStartDate(eventData?.startDateTimestamp || 0));
  }, [eventData]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  return (
    <Fragment>
      {!isEventsLoading && (
        <RazorpayProvider>
          <Box
            sx={{
              pt: 8,
              pb: 4
            }}>
            <Container>
              <Grid container>
                <Grid item sx={{ pb: 4 }} xs={12} sm={6} md={6}>
                  <HeroImage src={eventData?.highlightingImageVideoURL || ''} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} sx={{ padding: '0 16px' }}>
                  <Box display={'flex'} alignItems={'flex-end'} mb={3}>
                    <Typography fontWeight={'500'} component="h3" variant="h3" align="left">
                      {eventData?.name}
                    </Typography>
                    <Typography
                      marginLeft={2}
                      marginBottom={'4px'}
                      component="span"
                      variant="subtitle1"
                      color="primary"
                      align="left">
                      By {eventData?.creatorName}
                    </Typography>
                  </Box>
                  <LinearProgress
                    sx={{ width: '60%', height: '10px', mb: 3 }}
                    variant="determinate"
                    value={getPercentage()}
                  />
                  {eventStatus == 'upcoming' && (
                    <Typography
                      fontWeight={'600'}
                      component="h5"
                      variant="h5"
                      color="primary"
                      marginBottom={2}
                      align="left">
                      Funding yet to start
                    </Typography>
                  )}
                  {(eventStatus == 'ongoing' || eventStatus == 'past') && (
                    <Box mb={2}>
                      <Typography component="h4" variant="h4" color="primary" align="left">
                        INR {eventData?.totalFunding.toLocaleString()}
                      </Typography>
                      <Typography component="span" variant="subtitle2" align="left">
                        pledged of INR {eventData?.expectedFunding.toLocaleString()} goal!
                      </Typography>
                    </Box>
                  )}

                  <Stack direction="row" justifyContent="space-between">
                    {(eventStatus == 'ongoing' || eventStatus == 'past') && (
                      <Box mb={4}>
                        <Typography fontWeight={'600'} component="h4" variant="h4" align="left">
                          {eventData?.backers.length}
                        </Typography>
                        <Typography
                          fontWeight={'600'}
                          component="span"
                          variant="subtitle2"
                          align="left">
                          backers
                        </Typography>
                      </Box>
                    )}
                    {eventStatus == 'upcoming' && (
                      <Box mb={4}>
                        <Typography fontWeight={'600'} component="h4" variant="h4" align="left">
                          {eventData?.subscribers.length}
                        </Typography>
                        <Typography
                          fontWeight={'600'}
                          component="span"
                          variant="subtitle2"
                          align="left">
                          people subscribed
                        </Typography>
                      </Box>
                    )}
                    {eventStatus == 'upcoming' && (
                      <Box mb={4}>
                        <Typography fontWeight={'600'} component="h4" variant="h4" align="left">
                          $ {eventData?.expectedFunding.toLocaleString()}
                        </Typography>
                        <Typography
                          fontWeight={'600'}
                          component="span"
                          variant="subtitle2"
                          align="left">
                          to Fund
                        </Typography>
                      </Box>
                    )}
                    {eventStatus == 'ongoing' && (
                      <Box mb={4}>
                        <Typography fontWeight={'600'} component="h4" variant="h4" align="left">
                          {getEventDaysLeft(eventData?.startDateTimestamp)}
                        </Typography>
                        <Typography
                          fontWeight={'600'}
                          component="span"
                          variant="subtitle2"
                          align="left">
                          days to go
                        </Typography>
                      </Box>
                    )}
                    {eventStatus == 'past' && (
                      <Box mb={4}>
                        <Typography
                          fontWeight={'600'}
                          color="#f08080"
                          component="h4"
                          variant="h4"
                          align="left">
                          Closed
                        </Typography>
                        <Typography
                          fontWeight={'600'}
                          component="span"
                          variant="subtitle2"
                          marginLeft={'4px'}
                          align="left">
                          for Funding
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                  <Divider sx={{ mb: 4 }} />
                  <Typography
                    fontWeight={'400'}
                    color={'#222122'}
                    component="span"
                    variant="subtitle2"
                    align="left">
                    {eventData?.description}
                  </Typography>
                  {eventStatus === 'ongoing' && (
                    <Stack
                      sx={{ pt: 4 }}
                      direction="row"
                      spacing={2}
                      justifyContent="space-between">
                      <TextField
                        required
                        id="amount"
                        label="Amount (₹)"
                        name="amount"
                        value={amount}
                        onChange={updateAmount}
                        autoFocus
                      />
                      <Button
                        onClick={() => {
                          if (!amount || amount === '') {
                            showToast(true, 'error', 'Please enter a valid amount!');
                          } else setRazorpayDialogOpen(true);
                        }}
                        sx={{ color: '#fff', padding: '12px 32px', borderRadius: '0' }}
                        variant="contained"
                        color="primary"
                        focusRipple>
                        Invest
                      </Button>
                    </Stack>
                  )}
                  {eventStatus == 'upcoming' && (
                    <Stack
                      sx={{ pt: 4 }}
                      direction="row"
                      spacing={2}
                      justifyContent="space-between">
                      <Box>
                        <Typography
                          fontWeight={'600'}
                          component="span"
                          variant="subtitle2"
                          align="left">
                          Meeting Time
                        </Typography>
                        <Typography
                          fontWeight={'600'}
                          color="primary"
                          component="h5"
                          variant="h5"
                          align="left">
                          {formatDate('MMM dd, yyyy hh:mm a', eventData?.pitchDate)}
                        </Typography>
                      </Box>
                      <LoadingButton
                        sx={{ padding: '0px 24px', color: '#fff', borderRadius: '0' }}
                        loading={isLoading}
                        onClick={handleClick}
                        variant="contained">
                        Subscribe
                      </LoadingButton>
                    </Stack>
                  )}
                </Grid>
              </Grid>
            </Container>
          </Box>
          {/* Event Story  */}
          <Container>
            <Divider sx={{ mt: 2 }} textAlign="left">
              <Typography
                color={'primary'}
                fontWeight={'600'}
                sx={{ py: 2 }}
                component="h4"
                variant="h4"
                align="left">
                Event Story
              </Typography>
            </Divider>
            <Box sx={{ pt: 4, pb: 4 }}>{parse(eventData?.detailedInformation || '')}</Box>
          </Container>
          <RazorpayRedirect isOpen={isRazorpayDialogOpen} amount={amount} />
        </RazorpayProvider>
      )}
      {isEventsLoading && <EventDetailsSkeleton />}
    </Fragment>
  );
};

export default EventDescription;
