import axios from 'axios';

const api = axios.create({
  baseURL: '/api/auth',
  withCredentials: true
});

export const loginRequest = (data) => api.post('/login', data);
export const registerRequest = (data) => api.post('/register', data);
export const restoreRequest = (data) => api.post('/restore', data);
export const logoutRequest = () => api.post('/logout');
export const meRequest = () => api.get('/me');
export const updateProfileRequest = (data) => api.put('/profile', data);

export default api;