import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/config/apiClient';

// This component handles the OAuth callback after social login
const OAuthCallback = () => {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  useEffect(() => {
    // Get token from query string (?token=...)
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      // Store token and set Authorization header
      localStorage.setItem('token', token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Fetch user info and update AuthContext
      checkAuth().then(() => {
        navigate('/profile'); // Redirect to profile or home
      });
    } else {
      // No token found, redirect to login
      navigate('/auth');
    }
  }, [checkAuth, navigate]);

  return <div>Signing you in...</div>;
};

export default OAuthCallback;
