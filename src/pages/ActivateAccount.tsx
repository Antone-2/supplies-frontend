import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ActivateAccount: React.FC = () => {
    const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
    const [message, setMessage] = useState('Activating your account...');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        if (!token) {
            setStatus('error');
            setMessage('Activation token missing.');
            return;
        }
        axios.get(`/api/v1/auth/activate?token=${token}`)
            .then(() => {
                setStatus('success');
                setMessage('Your account has been activated! You can now log in.');
                setTimeout(() => navigate('/auth?activated=1'), 2000);
            })
            .catch(() => {
                setStatus('error');
                setMessage('Activation failed or link expired.');
            });
    }, [location, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className={`text-lg font-semibold mb-4 ${status === 'success' ? 'text-green-600' : status === 'error' ? 'text-red-600' : 'text-gray-700'}`}>{message}</div>
            {status === 'pending' && <div className="loader" />}
        </div>
    );
};

export default ActivateAccount;
