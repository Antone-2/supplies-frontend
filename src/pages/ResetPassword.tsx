import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { CheckCircle, XCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import SEOHead from '../components/SEOHead';
import MedhelmLogo from '../assets/medhelm-logo.svg';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    // Support both /reset-password?token=... and /reset-password/:token
    const urlToken = window.location.pathname.split('/reset-password/')[1];
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'form' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');
    const [redirectCountdown, setRedirectCountdown] = useState(0);
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const token = searchParams.get('token') || urlToken;
        if (!token) {
            setStatus('error');
            setMessage('Invalid reset link. No token provided.');
        } else {
            setStatus('form');
        }
    }, [searchParams]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match', {
                description: 'Please make sure both passwords are identical.',
            });
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Password too short', {
                description: 'Password must be at least 6 characters long.',
            });
            return;
        }

        setStatus('loading');
        const token = searchParams.get('token');

        try {
            const backendUrl = import.meta.env.VITE_API_URL;
            const response = await fetch(`${backendUrl}/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token,
                    newPassword: formData.password
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Password reset failed');
            }

            const data = await response.json();
            setStatus('success');
            setMessage(data.message || 'Password reset successful! You can now log in with your new password.');

            // Show success toast notification
            toast.success('Password Reset Successful!', {
                description: 'Your password has been changed. Redirecting to login...',
                duration: 4000,
            });

            // Start countdown for auto-redirect
            setRedirectCountdown(5);
            const countdownInterval = setInterval(() => {
                setRedirectCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(countdownInterval);
                        navigate('/auth');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

        } catch (error: any) {
            setStatus('error');
            setMessage(error.message || 'Failed to reset password. The link may be expired or invalid.');

            // Show error toast notification
            toast.error('Password Reset Failed', {
                description: error.message || 'The reset link may be invalid or expired.',
                duration: 4000,
            });
        }
    };

    const handleGoToLogin = () => {
        navigate('/auth');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    if (status === 'loading' && !searchParams.get('token')) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <>
            <SEOHead
                title="Reset Password - MEDHELM Supplies Ltd"
                description="Reset your password to regain access to your MEDHELM Supplies account."
                keywords="reset password, password recovery, MEDHELM supplies"
            />

            <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <img src={MedhelmLogo} alt="Medhelm Supplies Logo" className="mx-auto mb-4 h-12" />
                        <h1 className="text-3xl font-bold text-primary mb-2">Reset Password</h1>
                    </div>

                    <Card className="shadow-lg">
                        <CardHeader className="text-center">
                            <CardTitle className="flex items-center justify-center gap-2">
                                {status === 'loading' && <Loader2 className="h-6 w-6 animate-spin" />}
                                {status === 'success' && <CheckCircle className="h-6 w-6 text-green-500" />}
                                {status === 'error' && <XCircle className="h-6 w-6 text-red-500" />}
                                {status === 'form' && 'Enter New Password'}
                            </CardTitle>
                            <CardDescription>
                                {status === 'loading' && 'Resetting your password...'}
                                {status === 'success' && 'Password reset completed successfully!'}
                                {status === 'error' && 'Password reset failed'}
                                {status === 'form' && 'Please enter your new password'}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {status === 'form' && (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="password">New Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter new password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                required
                                                minLength={6}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={togglePasswordVisibility}
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Confirm new password"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                required
                                                minLength={6}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={toggleConfirmPasswordVisibility}
                                            >
                                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full">
                                        Reset Password
                                    </Button>
                                </form>
                            )}

                            {status === 'loading' && (
                                <div className="text-center">
                                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                                    <p className="text-muted-foreground">Resetting your password...</p>
                                </div>
                            )}

                            {(status === 'success' || status === 'error') && (
                                <div className="text-center space-y-4">
                                    <p className="text-muted-foreground">{message}</p>

                                    {status === 'success' && redirectCountdown > 0 && (
                                        <div className="text-sm text-muted-foreground">
                                            Redirecting to login in {redirectCountdown} seconds...
                                        </div>
                                    )}

                                    <Button onClick={handleGoToLogin} className="w-full">
                                        {status === 'success' ? 'Go to Login Now' : 'Back to Login'}
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
