import axios from 'axios';

/**
 * API Service
 * Axios instance with interceptors for authentication
 */

const API_BASE_URL = '/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - attach JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Unauthorized - clear token and redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

/**
 * Authentication API
 */
export const authAPI = {
    signup: (data) => api.post('/auth/signup', data),
    login: (data) => api.post('/auth/login', data),
    getMe: () => api.get('/auth/me'),
};

/**
 * Review API
 */
export const reviewAPI = {
    submitCode: (data) => api.post('/review/submit', data),
    getHistory: (page = 1, limit = 10) =>
        api.get(`/review/history?page=${page}&limit=${limit}`),
    getSubmission: (id) => api.get(`/review/${id}`),
    chatWithConsultant: (id, question) => api.post(`/review/${id}/chat`, { question }),
};

export default api;
