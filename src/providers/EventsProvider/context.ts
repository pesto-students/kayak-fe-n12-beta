// libs
import { createContext, useContext } from 'react';
import { IEvent } from '../../common/Interface/IEvent';
import { Event } from './types';

interface EventsContext {
  createEvent?: (body: any) => Promise<void>;
  searchEvents?: (query: string) => Promise<void>;
  getEventById?: (id: string) => Promise<any>;
  editEvent?: (body: any, id: string) => Promise<void>;
  searchResult: Array<Event>;
  events: Array<IEvent>;
  fetchEvents?: (type: string) => Promise<void>;
  fetchPortfolio?: () => Promise<void>;
  portfolio: Array<IEvent>;
  isSearchLoading: boolean;
}

const initialValue: EventsContext = {
  searchResult: [],
  events: [],
  portfolio: [],
  isSearchLoading: false
};

const eventsContext = createContext(initialValue);

export const useEventsContext = () => useContext(eventsContext);

export default eventsContext;
