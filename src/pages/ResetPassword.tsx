import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import medhelmLogo from '../assets/medhelm-logo.svg';

const ResetPassword: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    // Password strength checker
    const checkStrength = (pwd: string) => {
        if (!pwd) return '';
        if (pwd.length < 6) return 'Weak';
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(pwd)) return 'Strong';
        if (pwd.length >= 8) return 'Medium';
        return 'Weak';
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordStrength(checkStrength(e.target.value));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (passwordStrength === 'Weak') {
            setError('Password is too weak.');
            return;
        }
        setLoading(true);
        try {
            // Call backend API to reset password
            const res = await fetch(`${import.meta.env.VITE_API_URL || '/api/v1'}/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to reset password');
            setSuccess('Password reset successful! You can now log in.');
            setTimeout(() => navigate('/auth'), 2000);
        } catch (err: any) {
            setError(err.message || 'Failed to reset password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-2 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                {/* Branding/Logo */}
                <div className="flex flex-col items-center mb-6">
                    <img src={medhelmLogo} alt="Medhelm Logo" className="w-16 h-16 mb-2 animate-fade-in" />
                    <span className="text-xl font-bold text-indigo-700 tracking-wide mb-2">Medhelm Supplies</span>
                </div>
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4 animate-fade-in">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Set a New Password</h1>
                </div>
                <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                    <div className="p-8">
                        {/* Animated error/success messages */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center animate-slide-down">
                                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                                <span className="text-sm text-red-700">{error}</span>
                            </div>
                        )}
                        {success && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center animate-slide-down">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                <span className="text-sm text-green-700">{success}</span>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={handlePasswordChange}
                                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10"
                                        placeholder="Enter new password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        tabIndex={-1}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                                        onClick={() => setShowPassword(v => !v)}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {/* Password strength feedback */}
                                {password && (
                                    <div className="mt-2 text-xs font-medium flex items-center gap-2">
                                        <span>Password strength:</span>
                                        <span className={
                                            passwordStrength === 'Strong' ? 'text-green-600' :
                                                passwordStrength === 'Medium' ? 'text-yellow-600' :
                                                    'text-red-600'
                                        }>{passwordStrength}</span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirm ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10"
                                        placeholder="Confirm new password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        tabIndex={-1}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                                        onClick={() => setShowConfirm(v => !v)}
                                        aria-label={showConfirm ? 'Hide password' : 'Show password'}
                                    >
                                        {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                            >
                                {loading && (
                                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                    </svg>
                                )}
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </form>
                        {/* Link to login */}
                        <div className="mt-6 text-center">
                            <span className="text-sm text-gray-600">Remembered your password?</span>{' '}
                            <Link to="/auth" className="text-indigo-600 hover:underline font-medium">Back to Login</Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Animations */}
            <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.7s ease; }
        @keyframes slide-down { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slide-down { animation: slide-down 0.4s cubic-bezier(.4,2,.6,1); }
      `}</style>
        </div>
    );
};

export default ResetPassword;
