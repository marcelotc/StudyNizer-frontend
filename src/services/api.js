import axios from 'axios';

const api = axios.create({
  baseURL: 'https://studynizer-backend-production.up.railway.app',
});

export default api;