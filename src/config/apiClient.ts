import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors gracefully
    if (error.code === 'ERR_NAME_NOT_RESOLVED' || error.code === 'ERR_NETWORK') {
      console.warn('API server is not available. Using mock data where possible.');
      // Return a mock response for certain endpoints to prevent app crashes
      if (error.config?.url?.includes('/orders/all')) {
        return Promise.resolve({
          data: {
            orders: [],
            total: 0,
            message: 'API server unavailable - showing mock data'
          }
        });
      }
      if (error.config?.url?.includes('/orders/analytics')) {
        return Promise.resolve({
          data: {
            analytics: {
              totalOrders: 0,
              totalRevenue: 0,
              monthlyGrowth: 0
            },
            message: 'API server unavailable - showing mock data'
          }
        });
      }
      if (error.config?.url?.includes('/products/low-stock')) {
        return Promise.resolve({
          data: {
            products: [],
            count: 0,
            message: 'API server unavailable - showing mock data'
          }
        });
      }
    }

    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
