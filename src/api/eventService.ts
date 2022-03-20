import axios from './Instance';

const getEvent = (_id: string) => {
  return axios
    .get(`/events/${_id}`)
    .then((response) => {
      return response.data;
    })
    .catch((response) => {
      throw new Error('Unable to Fetch Event.');
    });
};

const getFilteredEvents = (filter: string) => {
  return axios
    .get(`/events?type=${filter}`)
    .then((response) => {
      return response.data;
    })
    .catch((response) => {
      throw new Error('Unable to Fetch Events.');
    });
};
const subscribe = (eventId: string) => {
  return axios
    .get(`events/subscribe/${eventId}`)
    .then((response) => {
      return response.data;
    })
    .catch((response) => {
      throw Error('Unable to subscribe');
    });
};

const createEvent = () => {
  //To-Do add event creation logic here. Auth header with token is added by instance.
};
export default { getEvent, getFilteredEvents, createEvent, subscribe };
