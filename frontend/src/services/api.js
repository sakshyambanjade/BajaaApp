import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// API methods
export const f1Api = {
  // Get current F1 standings
  getLiveStandings: async (season = 2025) => {
    const response = await apiClient.get('/standings/', {
      params: { season }
    });
    return response.data;
  },
  
  // Get live session data
  getLiveSession: async () => {
    const response = await apiClient.get('/live-session/');
    return response.data;
  },
  
  // ML Prediction endpoint
  predictRace: async (data) => {
    const response = await apiClient.post('/predict/', data);
    return response;
  },
  
  // Get driver telemetry
  getDriverTelemetry: async (sessionKey, driverNumber) => {
    const response = await apiClient.get('/telemetry/', {
      params: { session_key: sessionKey, driver_number: driverNumber }
    });
    return response.data;
  },
};

export default f1Api;  // Also export as default for flexibility
