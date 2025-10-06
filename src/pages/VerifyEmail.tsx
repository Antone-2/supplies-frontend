import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import SEOHead from '../components/SEOHead';
import MedhelmLogo from '../assets/medhelm-logo.svg';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    // Support both /verify-email?token=... and /verify-email/:token
    const urlToken = window.location.pathname.split('/verify-email/')[1];
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');
    const [redirectCountdown, setRedirectCountdown] = useState(0);

    useEffect(() => {
        const verifyEmail = async () => {
            // Prefer search param, fallback to route param
            const token = searchParams.get('token') || urlToken;
            if (!token) {
                setStatus('error');
                setMessage('Invalid verification link. No token provided.');
                return;
            }

            try {
                const backendUrl = import.meta.env.VITE_API_URL;
                const response = await fetch(`${backendUrl}/auth/verify-email?token=${token}`);
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || 'Verification failed');
                }
                const data = await response.json();
                setStatus('success');
                setMessage(data.message || 'Your email has been successfully verified! You can now log in.');

                // Show success toast notification
                toast.success('Email Verified Successfully!', {
                    description: 'Your account has been activated. Redirecting to login...',
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
                setMessage(error.message || 'Failed to verify email. The link may be expired or invalid.');

                // Show error toast notification
                toast.error('Email Verification Failed', {
                    description: error.message || 'The verification link may be invalid or expired.',
                    duration: 4000,
                });
            }
        };

        verifyEmail();
    }, [searchParams, urlToken]);

    const handleGoToLogin = () => {
        navigate('/auth');
    };

    return (
        <>
            <SEOHead
                title="Verify Email - Medhelm Supplies"
                description="Verify your email address to complete your Medhelm Supplies account registration."
                keywords="verify email, account verification, Medhelm supplies"
            />

            <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <img src={MedhelmLogo} alt="Medhelm Supplies Logo" className="mx-auto mb-4 h-12" />
                        <h1 className="text-3xl font-bold text-primary mb-2">Email Verification</h1>
                    </div>

                    <Card className="shadow-lg">
                        <CardHeader className="text-center">
                            <CardTitle className="flex items-center justify-center gap-2">
                                {status === 'loading' && <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />}
                                {status === 'success' && <CheckCircle className="h-6 w-6 text-green-500" />}
                                {status === 'error' && <XCircle className="h-6 w-6 text-red-500" />}
                                Email Verification
                            </CardTitle>
                            <CardDescription>
                                {status === 'loading' && 'Verifying your email...'}
                                {status === 'success' && 'Verification completed successfully!'}
                                {status === 'error' && 'Verification failed'}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="text-center space-y-4">
                            <p className="text-muted-foreground">{message}</p>

                            {status === 'loading' && (
                                <div className="text-sm text-muted-foreground">
                                    Please wait while we verify your account...
                                </div>
                            )}

                            {status === 'success' && redirectCountdown > 0 && (
                                <div className="text-sm text-muted-foreground">
                                    Redirecting to login in {redirectCountdown} seconds...
                                </div>
                            )}

                            {status !== 'loading' && (
                                <Button onClick={handleGoToLogin} className="w-full">
                                    {status === 'success' ? 'Go to Login Now' : 'Back to Login'}
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default VerifyEmail;
