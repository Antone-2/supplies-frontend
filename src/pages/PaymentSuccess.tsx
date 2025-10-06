import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        // Extract payment details from URL parameters
        const orderTrackingId = searchParams.get('OrderTrackingId');
        const merchantReference = searchParams.get('pesapal_merchant_reference');

        // Show success toast
        toast.success('Payment Successful!', {
            description: 'Your order has been processed successfully. You will be redirected to home page shortly.',
            duration: 5000
        });

        // Start countdown redirect
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/', { replace: true });
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate, searchParams]);

    const handleGoHome = () => {
        navigate('/', { replace: true });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                {/* Success Icon */}
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-6">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>

                {/* Success Message */}
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Payment Successful!
                </h1>

                <p className="text-gray-600 mb-6">
                    Thank you for your purchase! Your order has been processed successfully and you will receive a confirmation email shortly.
                </p>

                {/* Order Details */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-600">
                        Order Reference: <span className="font-medium text-gray-900">
                            {searchParams.get('pesapal_merchant_reference') || 'Processing...'}
                        </span>
                    </p>
                    {searchParams.get('OrderTrackingId') && (
                        <p className="text-sm text-gray-600 mt-2">
                            Transaction ID: <span className="font-medium text-gray-900">
                                {searchParams.get('OrderTrackingId')}
                            </span>
                        </p>
                    )}
                </div>

                {/* Redirect Countdown */}
                <p className="text-sm text-gray-500 mb-6">
                    Redirecting to home page in <span className="font-medium text-blue-600">{countdown}</span> seconds
                </p>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={handleGoHome}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        Continue Shopping
                    </button>

                    <button
                        onClick={() => navigate('/orders')}
                        className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                        View My Orders
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;