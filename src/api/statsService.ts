import axios from './Instance';

const getStatsData = () => {
  return axios
    .get('/stats')
    .then((response) => {
      return response.data;
    })
    .catch((response) => {
      throw new Error('Could not load stat data.');
    });
};

export default { getStatsData };
