import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';

const TrackOrder = () => {
    const [orderNumber, setOrderNumber] = useState('');
    const [orderStatus, setOrderStatus] = useState<any>(null);

    const handleTrack = () => {
        // Simulate order tracking
        if (orderNumber) {
            setOrderStatus({
                orderNumber: orderNumber,
                status: 'In Transit',
                estimatedDelivery: '2025-08-12',
                currentLocation: 'Nairobi Distribution Center',
                trackingSteps: [
                    { step: 'Order Placed', completed: true, date: '2025-08-09' },
                    { step: 'Payment Confirmed', completed: true, date: '2025-08-09' },
                    { step: 'Processing', completed: true, date: '2025-08-10' },
                    { step: 'Shipped', completed: true, date: '2025-08-11' },
                    { step: 'In Transit', completed: true, date: '2025-08-11' },
                    { step: 'Out for Delivery', completed: false, date: '2025-08-12' },
                    { step: 'Delivered', completed: false, date: '2025-08-12' }
                ]
            });
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 font-['Roboto']">Track Your Order</h1>
                    <p className="text-gray-600 font-['Roboto']">
                        Enter your order number to track its current status and location
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Section 1: Order Tracking Form */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">1. Track Your Order</h2>
                        <div className="space-y-4 font-['Roboto']">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Order Number
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your order number (e.g. MH-2025-001)"
                                    value={orderNumber}
                                    onChange={(e) => setOrderNumber(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <button
                                onClick={handleTrack}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                            >
                                Track Order
                            </button>
                            <p className="text-sm text-gray-600">
                                You can find your order number in your confirmation email or account dashboard.
                            </p>
                        </div>
                    </div>

                    {/* Section 2: Order Status */}
                    {orderStatus && (
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">2. Order Status</h2>
                            <div className="space-y-4 font-['Roboto']">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Order Number:</span>
                                    <span className="font-semibold text-gray-900">{orderStatus.orderNumber}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Status:</span>
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                        {orderStatus.status}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Current Location:</span>
                                    <span className="font-medium text-gray-900">{orderStatus.currentLocation}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Estimated Delivery:</span>
                                    <span className="font-medium text-gray-900">{orderStatus.estimatedDelivery}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section 3: Tracking History */}
                    {orderStatus && (
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">3. Tracking History</h2>
                            <div className="space-y-4 font-['Roboto']">
                                {orderStatus.trackingSteps.map((step: any, index: number) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${step.completed
                                                ? 'bg-green-600 text-white'
                                                : 'bg-gray-200 text-gray-500'
                                            }`}>
                                            {step.completed ? '✓' : index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                                                {step.step}
                                            </h3>
                                            <p className="text-sm text-gray-600">{step.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Section 4: Help & Support */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">4. Need Help?</h2>
                        <div className="space-y-4 font-['Roboto']">
                            <p className="text-gray-600">
                                Can't find your order or need assistance with tracking?
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-600">📧</span>
                                    <span className="text-gray-600">Email: support@medhelmsupplies.co.ke</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-600">📞</span>
                                    <span className="text-gray-600">Phone: +254 746 020 323</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-600">💬</span>
                                    <span className="text-gray-600">Live Chat: Available 24/7</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500">
                                Our customer service team is available to help you with any tracking issues or questions about your order.
                            </p>
                        </div>
                    </div>

                    {/* Section 5: Tracking Tips */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">5. Tracking Tips</h2>
                        <div className="space-y-3 font-['Roboto']">
                            <div className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">•</span>
                                <p className="text-gray-600">Orders are updated in real-time as they move through our system</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">•</span>
                                <p className="text-gray-600">You may receive SMS updates for important status changes</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">•</span>
                                <p className="text-gray-600">Delivery times are estimates and may vary based on location</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">•</span>
                                <p className="text-gray-600">Signature is required for all deliveries for security</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <MobileBottomNav />
            <div className="lg:hidden h-20"></div>
        </div>
    );
};

export default TrackOrder;
