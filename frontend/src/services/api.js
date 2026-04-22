import axios from 'axios';

const API = axios.create({
    baseURL: 'https://newsalertapp-backend.onrender.com',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
});

export default API;