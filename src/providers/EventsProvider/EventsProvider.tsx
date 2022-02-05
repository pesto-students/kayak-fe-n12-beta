// libs
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from '../../api/Instance';
import { IEvent } from '../../common/Interface/IEvent';
import { useSnackbarContext } from '../../components/Snackbar/context';
// context
import AuthContext from './context';
import { Event } from './types';

interface EventsProviderProps {
  children: React.ReactNode;
}

function EventsProvider({ children }: EventsProviderProps) {
  const navigate = useNavigate();
  const {
    ToastService: { showToast }
  } = useSnackbarContext();
  const [searchResult, setSearchResult] = useState<Array<Event>>([]);
  const [events, setEvents] = useState<Array<IEvent>>([]);
  const [portfolio, setPortfolio] = useState<Array<IEvent>>([]);

  const [isSearchLoading, setSearchLoading] = useState<boolean>(false);

  const fetchEvents = useCallback(async (type: string) => {
    const endpoint = type === 'user-events' ? `/users/user-events` : `/events?type=${type}`;
    try {
      const response = await axios.get(endpoint);
      if (!response.data?.data) throw response.data;
      const eventsList = response.data?.data?.map((event: any) => ({
        _id: event._id,
        name: event.name,
        creatorId: event.creatorId,
        creatorName: event.creatorName,
        description: event.description,
        status: event.status,
        category: event.category,
        isEventPublished: event.isEventPublished,
        highlightingImageVideoURL: event.highlightingImageVideoURL,
        totalFunding: event.totalFunding,
        expectedFunding: event.expectedFunding,
        location: event.location,
        meetingUrl: event.meetingUrl,
        meetingPassword: event.meetingPassword,
        pitchDate: event.pitchDate,
        pitchDateTimestamp: event.pitchDateTimestamp,
        startDate: event.startDate,
        startDateTimestamp: event.startDateTimestamp,
        detailedInformation: event.detailedInformation,
        backers: event.backers,
        subscribers: event.subscribers,
        viewCount: event.viewCount
      }));
      setEvents(eventsList);
    } catch (error) {}
  }, []);

  const fetchPortfolio = useCallback(async () => {
    const endpoint = '/users/portfolio';
    try {
      const response = await axios.get(endpoint);
      if (!response.data?.data) throw response.data;
      const portfolioList = response.data?.data?.map((portfolioData: any) => ({
        _id: portfolioData?.event._id,
        name: portfolioData?.event.name,
        creatorId: portfolioData?.event.creatorId,
        creatorName: portfolioData?.event.creatorName,
        description: portfolioData?.event.description,
        status: portfolioData?.event.status,
        category: portfolioData?.event.category,
        isEventPublished: portfolioData?.event.isEventPublished,
        highlightingImageVideoURL: portfolioData?.event.highlightingImageVideoURL,
        totalFunding: portfolioData?.event.totalFunding,
        expectedFunding: portfolioData?.event.expectedFunding,
        location: portfolioData?.event.location,
        meetingUrl: portfolioData?.event.meetingUrl,
        meetingPassword: portfolioData?.event.meetingPassword,
        pitchDate: portfolioData?.event.pitchDate,
        pitchDateTimestamp: portfolioData?.event.pitchDateTimestamp,
        startDate: portfolioData?.event.startDate,
        startDateTimestamp: portfolioData?.event.startDateTimestamp,
        detailedInformation: portfolioData?.event.detailedInformation,
        backers: portfolioData?.event.backers,
        subscribers: portfolioData?.event.subscribers,
        viewCount: portfolioData?.event.viewCount,
        transactionAmount: portfolioData?.transaction?.amount,
        transactionId: portfolioData?.transaction?.transactionId,
        orderId: portfolioData?.transaction?.orderId,
        transactionDate: portfolioData?.transaction?.date,
        transactionStatus: portfolioData?.transaction?.status
      }));
      setPortfolio(portfolioList);
    } catch (error) {}
  }, []);

  const createEvent = useCallback(async (body: any) => {
    try {
      const response = await axios.post('/events', body);
      if (!response.data?.data) throw response.data;
      showToast(true, 'success', 'Event created successfully');
      navigate(`/event/${response.data?.data._id}`);
    } catch (error) {}
  }, []);

  const editEvent = useCallback(async (body: any, eventId: string) => {
    try {
      const response = await axios.patch(`/events/${eventId}`, body);
      if (!response.data?.data) throw response.data;
      showToast(true, 'success', 'Event edited successfully');
      navigate('home');
    } catch (error) {}
  }, []);

  const getEventById = useCallback(async (id: string) => {
    try {
      const response = await axios.get(`/events/${id}`);
      if (!response.data?.data) throw response.data;
      return response.data;
    } catch (error) {
      showToast(true, 'success', 'Some error occured!');
    }
  }, []);

  const searchEvents = useCallback(async (query: string) => {
    try {
      setSearchLoading(true);
      const response = await axios.get(`/events/search?q=${query}`);
      const eventsList = response.data?.data?.map((event: any) => ({
        id: event?._id,
        name: event?.name,
        description: event?.description,
        category: event?.category,
        expectedFunding: event?.expectedFunding,
        startDate: event?.startDate,
        imgUrl: event?.highlightingImageVideoURL
      }));
      setSearchResult(eventsList);
      setSearchLoading(false);
    } catch (error) {
      setSearchLoading(false);
    }
  }, []);

  const values = useMemo(
    () => ({
      createEvent,
      searchEvents,
      getEventById,
      editEvent,
      searchResult,
      events,
      fetchEvents,
      fetchPortfolio,
      portfolio,
      isSearchLoading
    }),
    [
      createEvent,
      searchEvents,
      getEventById,
      editEvent,
      searchResult,
      events,
      fetchEvents,
      portfolio,
      fetchPortfolio,
      isSearchLoading
    ]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default memo(EventsProvider);
