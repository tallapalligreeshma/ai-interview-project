import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include JWT in headers
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

export const authAPI = {
    login: (credentials: any) => api.post('/auth/login', credentials),
    register: (userData: any) => api.post('/auth/register', userData),
};

export const interviewAPI = {
    getQuestions: (roleSlug?: string, type?: string) => 
        api.get('/interview/questions', { params: { role: roleSlug, type } }),
    startInterview: (data: any) => api.post('/interview/start', data),
    evaluateAnswer: (evaluationData: { 
        question: string; 
        answer: string; 
        history: any[];
        role?: string;
        type?: string;
    }) => api.post('/ai/evaluate', evaluationData),
    getFinalResult: (id: string) => api.get(`/ai/result/${id}`),
};

export const userAPI = {
    getDashboardData: () => api.get('/user/dashboard'),
    getHistory: () => api.get('/user/history'),
};

export default api;
