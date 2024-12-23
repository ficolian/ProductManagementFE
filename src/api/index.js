import axios from 'axios';
import { API_BASE_URL } from 'utils/constants/api';

const baseURL = API_BASE_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
