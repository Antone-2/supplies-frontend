import apiClient from '../config/apiClient';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'guest';
  phone?: string;
  address?: {
    street: string;
    city: string;
    phone: string;
  };
}

interface AuthResponse {
  user: User;
  token: string;
}

// Register new user
export const register = async (userData: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/register', userData);
  return response.data;
};

// Login user
export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/login', credentials);
  return response.data;
};

// Get current user
export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};

// Update user profile
export const updateUserProfile = async (userData: Partial<User>): Promise<User> => {
  const response = await apiClient.put('/users/profile', userData);
  return response.data;
};

// Forgot password
export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  const response = await apiClient.post('/auth/forgot-password', { email });
  return response.data;
};

// Reset password
export const resetPassword = async (data: {
  token: string;
  newPassword: string;
}): Promise<{ message: string }> => {
  const response = await apiClient.post('/auth/reset-password', data);
  return response.data;
};

// Refresh token
export const refreshToken = async (): Promise<{ token: string }> => {
  const response = await apiClient.post('/auth/refresh-token');
  return response.data;
};

// Logout
export const logout = async (): Promise<void> => {
  await apiClient.post('/auth/logout');
  localStorage.removeItem('token');
  delete apiClient.defaults.headers.common['Authorization'];
};

// Verify email
export const verifyEmail = async (token: string): Promise<{ message: string }> => {
  const response = await apiClient.get(`/auth/verify-email?token=${token}`);
  return response.data;
};

// Resend verification email
export const resendVerification = async (email: string): Promise<{ message: string }> => {
  const response = await apiClient.post('/auth/resend-verification', { email });
  return response.data;
};
