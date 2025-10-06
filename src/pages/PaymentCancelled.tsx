import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

const PaymentCancelled = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [countdown, setCountdown] = useState(15);

    useEffect(() => {
        // Show cancelled toast
        toast.error('Payment Cancelled', {
            description: 'Your payment was cancelled. You can try again or choose a different payment method.',
            duration: 5000
        });

        // Start countdown redirect
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/checkout', { replace: true });
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    const handleRetryPayment = () => {
        navigate('/checkout', { replace: true });
    };

    const handleGoHome = () => {
        navigate('/', { replace: true });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                {/* Cancelled Icon */}
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-6">
                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </div>

                {/* Cancelled Message */}
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Payment Cancelled
                </h1>

                <p className="text-gray-600 mb-6">
                    Your payment was cancelled. Don't worry - no charges were made to your account. You can try again with the same or different payment method.
                </p>

                {/* Reasons */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                    <h3 className="font-medium text-gray-900 mb-2">Common reasons for cancellation:</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Payment was manually cancelled</li>
                        <li>• Insufficient funds in account</li>
                        <li>• Network connectivity issues</li>
                        <li>• Payment gateway timeout</li>
                    </ul>
                </div>

                {/* Redirect Countdown */}
                <p className="text-sm text-gray-500 mb-6">
                    Redirecting to checkout in <span className="font-medium text-blue-600">{countdown}</span> seconds
                </p>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={handleRetryPayment}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        Try Payment Again
                    </button>

                    <button
                        onClick={handleGoHome}
                        className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                        Continue Shopping
                    </button>

                    <button
                        onClick={() => navigate('/contact')}
                        className="w-full text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                    >
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancelled;