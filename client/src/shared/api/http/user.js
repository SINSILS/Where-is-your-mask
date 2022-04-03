import api from 'core/api';

export const getCurrentUser = () => api.get('users/me').then((x) => x.data);

export const login = (credentials) => api.post('users/login', credentials).then((x) => x.data);

