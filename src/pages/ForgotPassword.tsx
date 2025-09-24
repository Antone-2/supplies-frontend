import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import { LuMail, LuCheck } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import apiClient from '../config/apiClient';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await apiClient.post('/auth/forgot-password', { email });
      setSuccess('Password reset email sent');
    } catch (err) {
      setError((err as any)?.response?.data?.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-white to-primary-light/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <LuMail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 font-['Roboto']">Reset your password</h1>
        </div>
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
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-['Roboto']">Email Address</label>
                <div className="relative">
                  <LuMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Enter your email" required />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">{loading ? <Spinner /> : 'Send Reset Email'}</button>
            </form>
            <div className="text-center text-sm text-gray-600 mt-4">
              Remember your password?{' '}
              <Link to="/auth" className="font-medium text-primary hover:text-primary-light">Sign in here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
