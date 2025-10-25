import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// API endpoints
const api = {
  // Live data
  getLiveData: () => apiClient.get('/live/'),
  
  // Predictions
  predictRace: (config) => apiClient.post('/predict-race/', config),
  
  // Driver stats
  getDriverStats: (driverId) => apiClient.get(`/driver/${driverId}/stats/`),
  
  // Pit strategy
  optimizePit: (data) => apiClient.post('/optimize-pit/', data),
};

export default api;
