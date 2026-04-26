import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

export const loginRequest = (data) => api.post('/auth/login', data);
export const registerRequest = (data) => api.post('/auth/register', data);
export const restoreRequest = (data) => api.post('/auth/restore', data);
export const logoutRequest = () => api.post('/auth/logout');
export const meRequest = () => api.get('/auth/me');
export const updateProfileRequest = (data) => api.put('/profile', data);