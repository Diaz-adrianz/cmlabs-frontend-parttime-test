import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL,
});

// handle interceptors here

export default api;
