import io from 'socket.io-client';

export const API_URL = process.env.REACT_APP_BACKEND || 'http://localhost:3003';
const socket = io(API_URL);

export default socket;
