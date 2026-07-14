import axios from 'axios';

// සයිට් එක දුවන්නේ Vercel (Production) එකේද නැත්නම් Localhost එකේද කියලා අඳුරගන්නවා
const isProduction = import.meta.env.MODE === 'production';

// Create an Axios instance
const api = axios.create({
    // Vercel එකේදි Live Backend එකටත්, Local කරද්දි Local Backend එකටත් ඉබේම Call එක යයි
    baseURL: isProduction 
        ? 'https://weerasekara-backend.vercel.app/api' 
        : 'http://localhost:5000/api',
});

export default api;