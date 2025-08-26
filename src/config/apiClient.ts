import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.medhelmsupplies.co.ke/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request debugging
    console.log(`🔄 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    const { response, config } = error;
    
    if (response) {
      console.error(`❌ ${response.status} ${config?.method?.toUpperCase()} ${config?.url}`);
      
      // Handle specific error codes
      switch (response.status) {
        case 404:
          console.error('🔍 Endpoint not found:', config?.url);
          break;
        case 401:
          console.warn('🔒 Unauthorized - clearing token');
          localStorage.removeItem('token');
          window.location.href = '/auth';
          break;
        case 500:
          console.error('🔥 Server error:', response.data);
          break;
      }
    } else if (error.code === 'ECONNREFUSED') {
      console.error('❌ Connection refused - server might not be running');
    } else {
      console.error('❌ Network error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Health check function
export const checkServerHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    console.error('❌ Health check failed:', error);
    throw error;
  }
};

export default apiClient;
