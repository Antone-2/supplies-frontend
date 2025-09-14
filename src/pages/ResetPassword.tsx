import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LuLock, LuCheck, LuEye, LuEyeOff } from 'react-icons/lu';
import medhelmLogo from '../assets/medhelm-logo.png';

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
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to reset password');
            setSuccess('Password reset successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/auth');
            }, 2000);
        } catch (err: any) {
            setError(err.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
                <div className="px-8 py-12">
                    <div className="text-center mb-8">
                        <img src={medhelmLogo} alt="Medhelm Supplies" className="h-12 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900">Reset Your Password</h2>
                        <p className="text-gray-600 mt-2">Enter your new password below</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center">
                                <LuLock className="h-5 w-5 text-red-400 mr-2" />
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center">
                                <LuCheck className="h-5 w-5 text-green-400 mr-2" />
                                <p className="text-green-700 text-sm">{success}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pr-12"
                                    placeholder="Enter new password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(v => !v)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <LuEyeOff className="w-5 h-5" /> : <LuEye className="w-5 h-5" />}
                                </button>
                            </div>
                            {/* Password Strength Indicator */}
                            {password && (
                                <div className="mt-2">
                                    <div className="flex items-center space-x-2">
                                        <div className={`h-2 flex-1 rounded-full ${passwordStrength === 'Weak' ? 'bg-red-200' : passwordStrength === 'Medium' ? 'bg-yellow-200' : 'bg-green-200'}`}></div>
                                        <div className={`h-2 flex-1 rounded-full ${passwordStrength === 'Medium' || passwordStrength === 'Strong' ? 'bg-yellow-200' : 'bg-gray-200'}`}></div>
                                        <div className={`h-2 flex-1 rounded-full ${passwordStrength === 'Strong' ? 'bg-green-200' : 'bg-gray-200'}`}></div>
                                    </div>
                                    <p className={`text-xs mt-1 ${passwordStrength === 'Weak' ? 'text-red-600' : passwordStrength === 'Medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                                        Password strength: {passwordStrength}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirm ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pr-12"
                                    placeholder="Confirm new password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowConfirm(v => !v)}
                                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                                >
                                    {showConfirm ? <LuEyeOff className="w-5 h-5" /> : <LuEye className="w-5 h-5" />}
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
                            {loading ? 'Resetting Password...' : 'Reset Password'}
                        </button>
                    </form>

                    {/* Link to login */}
                    <div className="mt-6 text-center">
                        <span className="text-sm text-gray-600">Remembered your password?</span>{' '}
                        <Link to="/auth" className="text-indigo-600 hover:underline font-medium">Back to Login</Link>
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
