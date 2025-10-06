import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import SEOHead from '../components/SEOHead';
import { FaRegEnvelope } from 'react-icons/fa';
import { toast } from 'sonner';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error('Please enter your email address');
            return;
        }

        try {
            // Call backend API to send reset link
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
            const response = await fetch(`${apiUrl}/auth/forgot-password`, {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Failed to send reset link');
            }

            toast.success('Reset Link Sent!', {
                description: 'A password reset link has been sent to your email address. Please check your inbox.',
            });

            // Clear form after success
            setEmail('');
        } catch (error) {
            toast.error('Failed to send reset link', {
                description: 'Please check your email and try again.',
            });
        }
    };

    return (
        <>
            <SEOHead
                title="Forgot Password - Medhelm Supplies"
                description="Reset your Medhelm Supplies account password."
                keywords="forgot password, reset password, Medhelm Supplies"
            />

            <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
                <div className="w-full max-w-md">
                    <Card className="shadow-xl border-0">
                        <CardHeader className="flex flex-col items-center space-y-4 text-center p-6 pt-8">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                                <FaRegEnvelope className="h-8 w-8 text-white" />
                            </div>
                            <CardTitle className="text-3xl font-bold text-foreground">Reset your password</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-base font-medium">Email Address</Label>
                                    <div className="relative">
                                        <FaRegEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email} onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <Button type="submit" className="w-full">
                                        Send reset email
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="justify-center p-6 pt-0">
                            <p className="text-sm text-muted-foreground text-center">
                                Remember your password?{' '}
                                <Link to="/auth" className="text-primary hover:underline font-medium">
                                    Sign in here
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
