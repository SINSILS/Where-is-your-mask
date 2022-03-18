import axios from 'axios';
import config from 'core/config';

const api = axios.create({
  baseURL: config.apiUrl,
  timeout: config.apiTimeout,
});

export default api;
