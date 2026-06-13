import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message
      || (error.request ? 'Cannot connect to the server. Please try again.' : error.message)
      || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default api;
