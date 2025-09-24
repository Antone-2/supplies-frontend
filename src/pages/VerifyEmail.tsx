import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle, XCircle, Mail } from 'lucide-react';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        const email = searchParams.get('email');

        if (!token) {
            setStatus('error');
            setMessage('Verification token is missing');
            return;
        }

        // Simulate email verification API call
        const verifyEmail = async () => {
            try {
                // In a real app, this would be an API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Simulate success/error based on token
                if (token === 'valid-token') {
                    setStatus('success');
                    setMessage('Your email has been successfully verified! Redirecting to login...');
                    setTimeout(() => {
                        navigate('/auth', { state: { fromVerify: true } });
                    }, 2000);
                } else {
                    setStatus('error');
                    setMessage('Invalid or expired verification token');
                }
            } catch (error) {
                setStatus('error');
                setMessage('Verification failed. Please try again.');
            }
        };

        verifyEmail();
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                        <Mail className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl">Email Verification</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    {status === 'loading' && (
                        <div className="space-y-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="text-gray-600">Verifying your email...</p>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="space-y-4">
                            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                            <div>
                                <h3 className="text-xl font-semibold text-green-600 mb-2">
                                    Verification Successful!
                                </h3>
                                <p className="text-gray-600">{message}</p>
                                <p className="text-xs text-gray-500">You will be redirected to login shortly.</p>
                            </div>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="space-y-4">
                            <XCircle className="h-16 w-16 text-red-500 mx-auto" />
                            <div>
                                <h3 className="text-xl font-semibold text-red-600 mb-2">
                                    Verification Failed
                                </h3>
                                <p className="text-gray-600 mb-4">{message}</p>
                            </div>
                            <div className="space-y-2">
                                <Link to="/resend-verification">
                                    <Button variant="outline" className="w-full">
                                        Resend Verification Email
                                    </Button>
                                </Link>
                                <Link to="/profile">
                                    <Button className="w-full">Back to Profile</Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default VerifyEmail;
