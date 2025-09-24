import React, { useState } from 'react';
import apiClient from '@/config/apiClient';

const SubscribeForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        try {
            const res = await apiClient.post('/subscription/subscribe', { email });
            setMessage(res.data.message);
            setEmail('');
        } catch (err: any) {
            setMessage(err.response?.data?.error || 'Subscription failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 max-w-sm mx-auto">
            <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="border rounded px-3 py-2 w-full"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
                {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
            {message && <p className="text-center text-sm mt-2">{message}</p>}
        </form>
    );
};

export default SubscribeForm;
