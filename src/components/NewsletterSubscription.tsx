import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface NewsletterSubscriptionProps {
    className?: string;
}

const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({
    className = ''
}) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prevent double submission
        if (isLoading) {
            return;
        }

        if (!email) {
            toast.error('Please enter your email address');
            return;
        }

        if (!isValidEmail(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setIsLoading(true);

        try {
            // Show loading toast
            toast.loading('Subscribing to newsletter...', {
                description: 'Please wait while we process your subscription.',
                duration: 3000
            });

            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
            const response = await fetch(`${apiUrl}/newsletter/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.trim(),
                    firstName: firstName.trim(),
                    source: 'footer'
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle specific error cases
                if (response.status === 409) {
                    toast.dismiss();
                    toast.info('Already Subscribed', {
                        description: 'This email is already subscribed to our newsletter.',
                        duration: 4000
                    });
                    setIsSubscribed(true);
                    return;
                }
                throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
            }

            if (data.success) {
                setIsSubscribed(true);
                setEmail('');
                setFirstName('');
                toast.success('Successfully subscribed!', {
                    description: 'Thank you for joining our newsletter. You\'ll receive updates about new products and health tips.',
                });
            } else {
                if (response.status === 409) {
                    toast.error('Already subscribed!', {
                        description: 'This email is already subscribed to our newsletter.',
                    });
                } else {
                    throw new Error(data.message || 'Failed to subscribe');
                }
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            toast.error('Subscription failed', {
                description: 'Please try again later or contact support.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    if (isSubscribed) {
        return (
            <div className={`text-center p-4 bg-green-50 rounded-lg border border-green-200 ${className}`}>
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-green-800 mb-1">
                    Welcome to Medhelm Supplies!
                </h3>
                <p className="text-green-600 text-sm">
                    You're now subscribed to our newsletter and will receive updates about new medical supplies and health tips.
                </p>
            </div>
        );
    }

    return (
        <div className={className}>
            <div className="flex items-center gap-2 mb-3">
                <Mail className="h-5 w-5 text-white" />
                <h3 className="text-lg font-semibold text-white">
                    Stay Updated with Medhelm Supplies
                </h3>
            </div>

            <p className="text-gray-300 text-sm mb-4">
                Get the latest updates on new medical supplies, health tips, and exclusive offers delivered to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex gap-2">
                    <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                        className="flex-1 bg-white text-black placeholder-gray-400"
                        autoComplete="email"
                        autoFocus
                    />
                    <Button
                        type="submit"
                        disabled={isLoading || !email}
                        className="whitespace-nowrap bg-medical-primary hover:bg-medical-primary/90"
                    >
                        {isLoading ? 'Subscribing...' : 'Subscribe'}
                    </Button>
                </div>
            </form>

            <p className="text-xs text-gray-400 mt-3">
                By subscribing, you agree to receive emails from Medhelm Supplies.
                You can unsubscribe at any time.
            </p>
        </div>
    );
};

export default NewsletterSubscription;