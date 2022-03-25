import axios from 'axios';
import config from 'core/config';
import storage from 'core/storage';

const api = axios.create({
  baseURL: config.apiUrl,
  timeout: config.apiTimeout,
});

api.interceptors.request.use((request) => {
  const token = storage.getItem('access-token');

  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`;
  }

  return request;
});

export default api;
