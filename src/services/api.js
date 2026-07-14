import axios from 'axios';

// Create an Axios instance with the base URL from the .env file
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default api;