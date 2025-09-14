import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/config/apiClient';
import { useAuth } from '../context/AuthContext';

const VerifyEmail: React.FC = () => {
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { checkAuth } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if (!token) {
            setStatus('error');
            setMessage('Invalid verification link.');
            return;
        }
        apiClient.get(`/auth/verify-email?token=${token}`)
            .then(async (res) => {
                setStatus('success');
                setMessage(res.data.message || 'Account verified');
                // Auto-login the user
                const { token: jwtToken } = res.data;
                if (jwtToken) {
                    localStorage.setItem('token', jwtToken);
                    apiClient.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
                    // Update auth state
                    await checkAuth();
                    setTimeout(() => navigate('/'), 3000);
                } else {
                    setTimeout(() => navigate('/auth'), 3000);
                }
            })
            .catch(err => {
                setStatus('error');
                setMessage(err.response?.data?.message || 'Verification failed.');
            });
    }, [navigate, checkAuth]);

    return (
        <div className="max-w-md mx-auto p-8 text-center">
            {status === 'verifying' && <p>Verifying your account...</p>}
            {status === 'success' && <p className="text-green-600">{message}</p>}
            {status === 'error' && <p className="text-red-600">{message}</p>}
        </div>
    );
};

export default VerifyEmail;
