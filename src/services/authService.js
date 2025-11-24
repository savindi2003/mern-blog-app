import axios from 'axios';


const API = axios.create({ baseURL: 'http://localhost:5000' });


export const register = (data) => API.post('/api/auth/register', data);
export const login = (data) => API.post('/api/auth/login', data);
export const getProfile = (token) => API.get('/api/protected/profile', { headers: { Authorization: `Bearer ${token}` } });


// Utility for starting google flow:
export const googleAuthUrl = () => 'http://localhost:5000/auth/google';

