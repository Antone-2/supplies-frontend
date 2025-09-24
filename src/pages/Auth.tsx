import React, { useState } from 'react';
import medHelmLogo from '../assets/medhelm-logo.svg';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LuEye, LuEyeOff, LuMail, LuLock, LuCheck } from 'react-icons/lu';
import { FcGoogle } from 'react-icons/fc';

// Simple Spinner component
const Spinner: React.FC = () => (
  <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
  </svg>
);

import { useEffect } from 'react';
const Auth: React.FC = () => {
  // Removed unused activeTab and setActiveTab state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // Removed unused termsAccepted and resetEmail state

  const { login } = useAuth();
  const navigate = useNavigate();

  // Redirect to home if already authenticated
  useEffect(() => {
    // If you want to check authentication, implement it here or remove this effect
    // Example: if (localStorage.getItem('token')) { navigate('/'); }
  }, [navigate]);

  // Show activation success message if redirected from activation link
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('activated') === '1') {
      setSuccess('Your account has been activated! Please log in.');
    }
  }, []);

  // Social login: check for token in URL and store it
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      window.history.replaceState({}, document.title, window.location.pathname); // Clean URL
      navigate('/');
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      setError(''); // Clear error on successful login
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Removed unused handleRegister function

  // Removed unused handleForgotPassword function

  // Removed unused TabButton component

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-white to-primary-light/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src={medHelmLogo} alt="Medhelm Supplies Logo" className="mx-auto mb-4 h-16" />
          <h1 className="text-3xl font-bold text-gray-900 font-['Roboto']">Welcome to Medhelm</h1>
          <p className="mt-2 text-sm text-gray-600 font-['Roboto']">Sign in to your account</p>
        </div>

        {/* Login Form Only */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <span className="w-5 h-5 text-red-500 mr-2" role="img" aria-label="warning">⚠️</span>
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <LuCheck className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm text-green-700">{success}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-['Roboto']">
                  Email Address
                </label>
                <div className="relative">
                  <LuMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-['Roboto']">
                  Password
                </label>
                <div className="relative">
                  <LuLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <LuEyeOff className="w-5 h-5" /> : <LuEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                    aria-label="Remember me"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary-light"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? <Spinner /> : 'Sign In'}
              </button>

              {/* Social Login */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/auth/google`}
                >
                  <FcGoogle className="w-5 h-5 mr-2" />
                  Google
                </button>
              </div>

              <div className="text-center text-sm text-gray-600 mt-4">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-primary hover:text-primary-light">
                  Sign up here
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="text-primary hover:text-primary-light">Terms</Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary hover:text-primary-light">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
