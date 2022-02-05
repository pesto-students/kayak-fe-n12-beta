import axios from 'axios';
import { SESSION_STORAGE_KEY } from '../constants/auth';

function authHeader(): string {
  let user;
  const userData = localStorage.getItem(SESSION_STORAGE_KEY);
  if (userData !== null) {
    user = JSON.parse(userData);
  } else {
    user = {};
  }
  if (user && user.tokenData) {
    return user.tokenData.token;
  } else {
    return '';
  }
}

const axiosClient = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authHeader()}`
  },
  baseURL: process.env.REACT_APP_BASE_URL
});

export default axiosClient;
