import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const PaymentDemo = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');
    const status = searchParams.get('status') || 'success';

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    navigate('/orders');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    const getStatusIcon = () => {
        switch (status) {
            case 'success':
                return <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />;
            case 'failed':
                return <XCircle className="w-16 h-16 text-red-500 mx-auto" />;
            default:
                return <Clock className="w-16 h-16 text-yellow-500 mx-auto" />;
        }
    };

    const getStatusMessage = () => {
        switch (status) {
            case 'success':
                return 'Payment Successful!';
            case 'failed':
                return 'Payment Failed';
            default:
                return 'Payment Pending';
        }
    };

    const getStatusDescription = () => {
        switch (status) {
            case 'success':
                return 'Your payment has been processed successfully. Your order is confirmed.';
            case 'failed':
                return 'There was an issue processing your payment. Please try again.';
            default:
                return 'Your payment is being processed. Please wait.';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    {getStatusIcon()}
                    <CardTitle className="text-2xl font-bold text-gray-900">
                        {getStatusMessage()}
                    </CardTitle>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                        <p className="text-blue-700 text-sm font-medium">
                            🧪 DEMO MODE
                        </p>
                        <p className="text-blue-600 text-xs mt-1">
                            This is a demo payment for testing purposes
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-600 text-center">
                        {getStatusDescription()}
                    </p>

                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between">
                            <span className="font-medium">Order ID:</span>
                            <span className="text-gray-600">{orderId}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Amount:</span>
                            <span className="text-gray-600">KES {amount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Status:</span>
                            <span className={`capitalize ${status === 'success' ? 'text-green-600' :
                                    status === 'failed' ? 'text-red-600' : 'text-yellow-600'
                                }`}>
                                {status}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Button
                            onClick={() => navigate('/orders')}
                            className="w-full"
                        >
                            View Orders ({countdown}s)
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => navigate('/')}
                            className="w-full"
                        >
                            Continue Shopping
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PaymentDemo;