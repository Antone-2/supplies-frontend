import React, { useState } from 'react';
import apiClient from '../config/apiClient';

const AdminNotifySubscribers: React.FC = () => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('');
        setLoading(true);
        try {
            await apiClient.post('/admin/notify-subscribers', { subject, html: message });
            setStatus('Notification sent to all subscribers.');
            setSubject('');
            setMessage('');
        } catch (err: any) {
            setStatus(err.response?.data?.error || 'Failed to send notification.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col gap-3 p-4 border rounded">
            <h2 className="text-lg font-bold">Notify Subscribers</h2>
            <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                required
                className="border px-3 py-2 rounded"
            />
            <textarea
                placeholder="Message (HTML allowed)"
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
                className="border px-3 py-2 rounded min-h-[100px]"
            />
            <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded" disabled={loading}>
                {loading ? 'Sending...' : 'Send Notification'}
            </button>
            {status && <p className="text-center text-sm mt-2">{status}</p>}
        </form>
    );
};

export default AdminNotifySubscribers;
