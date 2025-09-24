import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import apiClient from '@/config/apiClient';
import { Button } from '@/components/ui/button';

const ResendVerification: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await apiClient.post('/auth/resend-verification', { email });
      setMessage('Verification email sent! Please check your inbox.');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to resend verification email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">Resend Verification Email</h2>
      <form onSubmit={handleResend} className="space-y-4">
        <input
          type="email"
          className="w-full border rounded-md px-3 py-2"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>{loading ? <Spinner /> : 'Resend Email'}</Button>
        {message && <p className="text-green-600 mt-2">{message}</p>}
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default ResendVerification;
