import { useState, useEffect, useCallback } from 'react';
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

// ...existing code...

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Configure API client with token
  useEffect(() => {
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          setIsLoading(true);
          const response = await apiClient.get('/auth/me');
          setUser(response.data);
          setError(null);
        } catch (error) {
          console.error('Auth check failed:', error);
          setToken(null);
          setUser(null);
          localStorage.removeItem('token');
        } finally {
          setIsLoading(false);
        }
      }
    };

    checkAuth();
  }, [token]);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
  const response = await apiClient.post('/auth/signin', { email, password });
      const { user, token } = response.data;
      
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
      
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.post('/auth/register', userData);
      const { user, token } = response.data;
      
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
      
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setError(null);
    localStorage.removeItem('token');
    delete apiClient.defaults.headers.common['Authorization'];
  }, []);

  const updateUser = useCallback(async (userData: Partial<User>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.put('/users/profile', userData);
      setUser(response.data);
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Profile update failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const response = await apiClient.post('/auth/refresh-token');
      const { token } = response.data;
      
      setToken(token);
      localStorage.setItem('token', token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return token;
    } catch (error) {
      logout();
      throw error;
    }
  }, [logout]);

  return {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    error,
    login,
    register,
    logout,
    updateUser,
    refreshToken,
  };
}
