import axios from 'axios';

export const baseURL = process.env.REACT_APP_BACKEND || 'http://localhost:3003';
const API = axios.create({
  baseURL,
  timeout: 2000,
});

export default API;
