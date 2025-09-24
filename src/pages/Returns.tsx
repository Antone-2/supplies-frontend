import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';

const Returns = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 font-['Roboto']">Returns & Refunds Policy</h1>
                    <p className="text-gray-600 font-['Roboto']">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Section 1: Return Policy Overview */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">1. Return Policy Overview</h2>
                        <p className="text-gray-600 leading-relaxed font-['Roboto']">
                            At MEDHELM Supplies, we understand that sometimes medical supplies may not meet your expectations. We offer a comprehensive return policy to ensure your satisfaction.
                        </p>
                    </div>

                    {/* Section 2: Return Window */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">2. Return Window</h2>
                        <p className="text-gray-600 leading-relaxed mb-4 font-['Roboto']">
                            You have 30 days from the date of delivery to return or exchange your items. This generous return window applies to most products.
                        </p>
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                            <p className="text-blue-800 font-semibold font-['Roboto']">30-day return guarantee on all eligible items</p>
                        </div>
                    </div>

                    {/* Section 3: Returnable Items */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">3. Returnable Items</h2>
                        <ul className="text-gray-600 space-y-2 font-['Roboto']">
                            <li>• Unopened medical supplies in original packaging</li>
                            <li>• Defective or damaged products</li>
                            <li>• Wrong items delivered</li>
                            <li>• Medical equipment with manufacturer defects</li>
                            <li>• Unused consumable supplies</li>
                            <li>• Items not meeting quality standards</li>
                        </ul>
                    </div>

                    {/* Section 4: Non-Returnable Items */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">4. Non-Returnable Items</h2>
                        <ul className="text-gray-600 space-y-2 font-['Roboto']">
                            <li>• Opened sterile medical supplies</li>
                            <li>• Personal protective equipment (PPE) that has been used</li>
                            <li>• Prescription medications</li>
                            <li>• Customized medical equipment</li>
                            <li>• Items damaged due to misuse</li>
                            <li>• Products past expiration date</li>
                        </ul>
                    </div>

                    {/* Section 5: Return Process */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">5. Return Process</h2>
                        <div className="space-y-3 font-['Roboto']">
                            <div className="flex items-start gap-3">
                                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                                <p className="text-gray-600">Contact our customer service team within 30 days of purchase</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                                <p className="text-gray-600">Receive return authorization and instructions</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                                <p className="text-gray-600">Package items securely in original packaging</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                                <p className="text-gray-600">Ship items back or visit our store location</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 6: Refund Information */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">6. Refund Information</h2>
                        <div className="space-y-3 font-['Roboto']">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Processing Time</h3>
                                <p className="text-gray-600">Once we receive your returned items, we'll process your refund within 5-7 business days.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Refund Method</h3>
                                <p className="text-gray-600">Refunds will be issued to the original payment method used for purchase.</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 7: Shipping Costs */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">7. Return Shipping Costs</h2>
                        <div className="space-y-4 font-['Roboto']">
                            <div className="bg-green-50 p-4 rounded">
                                <h3 className="font-semibold text-green-800 mb-2">Free Return Shipping</h3>
                                <ul className="text-green-700 text-sm">
                                    <li>• Wrong item shipped by us</li>
                                    <li>• Damaged or defective items</li>
                                    <li>• Items not as described</li>
                                </ul>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded">
                                <h3 className="font-semibold text-yellow-800 mb-2">Customer Pays Shipping</h3>
                                <ul className="text-yellow-700 text-sm">
                                    <li>• Changed mind about purchase</li>
                                    <li>• No longer needed</li>
                                    <li>• Ordered wrong size/quantity</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Section 8: Contact Information */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">8. Contact Information</h2>
                        <div className="text-gray-600 font-['Roboto']">
                            <p><strong>Email:</strong> returns@medhelmsupplies.co.ke</p>
                            <p><strong>Phone:</strong> +254 746 020 323</p>
                            <p><strong>Address:</strong> Kiambu Town, Opposite Kiambu Level 5 Hospital</p>
                            <p><strong>Hours:</strong> Mon-Fri: 8:00 AM - 6:00 PM</p>

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

export default Returns;
