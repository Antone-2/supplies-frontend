import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';

const DeliveryPolicy = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 font-['Roboto']">Delivery Policy</h1>
                    <p className="text-gray-600 font-['Roboto']">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Section 1: Delivery Options */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">1. Delivery Options</h2>
                        <p className="text-gray-600 leading-relaxed mb-6 font-['Roboto']">
                            We offer multiple delivery options to meet your medical supply needs:
                        </p>
                        <div className="space-y-4 font-['Roboto']">
                            <div className="bg-blue-50 p-4 rounded">
                                <h3 className="font-semibold text-blue-800 mb-2">Standard Delivery</h3>
                                <p className="text-blue-700 text-sm mb-1">3-5 business days</p>
                                <p className="text-blue-700 text-sm">Free for orders over KSh 5,000</p>
                                <p className="text-blue-700 text-sm">KSh 500 for orders under KSh 5,000</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded">
                                <h3 className="font-semibold text-green-800 mb-2">Express Delivery</h3>
                                <p className="text-green-700 text-sm mb-1">1-2 business days</p>
                                <p className="text-green-700 text-sm">KSh 1,000 flat rate</p>
                                <p className="text-green-700 text-sm">Available in major cities</p>
                            </div>
                            <div className="bg-orange-50 p-4 rounded">
                                <h3 className="font-semibold text-orange-800 mb-2">Emergency Delivery</h3>
                                <p className="text-orange-700 text-sm mb-1">Same day delivery</p>
                                <p className="text-orange-700 text-sm">KSh 2,500 flat rate</p>
                                <p className="text-orange-700 text-sm">Available for critical medical supplies</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded">
                                <h3 className="font-semibold text-purple-800 mb-2">Pickup Service</h3>
                                <p className="text-purple-700 text-sm mb-1">Free pickup</p>
                                <p className="text-purple-700 text-sm">From our Kiambu location</p>
                                <p className="text-purple-700 text-sm">Mon-Sat: 8AM-6PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Delivery Areas */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">2. Delivery Areas</h2>
                        <div className="space-y-6 font-['Roboto']">
                            <div>
                                <h3 className="font-semibold text-green-800 mb-3">Free Delivery Zones</h3>
                                <ul className="text-gray-600 space-y-1">
                                    <li>• Kiambu County</li>
                                    <li>• Nairobi County</li>
                                    <li>• Thika Town</li>
                                    <li>• Ruiru Town</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-blue-800 mb-3">Standard Delivery Zones</h3>
                                <ul className="text-gray-600 space-y-1">
                                    <li>• Central Kenya Region</li>
                                    <li>• Mombasa County</li>
                                    <li>• Kisumu County</li>
                                    <li>• Nakuru County</li>
                                    <li>• Other major towns</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Delivery Process */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">3. Delivery Process</h2>
                        <div className="space-y-4 font-['Roboto']">
                            <div className="flex items-start gap-3">
                                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Order Confirmation</h3>
                                    <p className="text-gray-600">You'll receive an order confirmation email with tracking information.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Processing</h3>
                                    <p className="text-gray-600">Orders are processed within 1 business day. Express orders within 2 hours.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Dispatch</h3>
                                    <p className="text-gray-600">You'll receive a dispatch notification with tracking details.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Delivery</h3>
                                    <p className="text-gray-600">Our delivery team will contact you before delivery. Signature required for all orders.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Temperature-Controlled Items */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">4. Temperature-Controlled Items</h2>
                        <p className="text-gray-600 leading-relaxed font-['Roboto']">
                            Medications and temperature-sensitive supplies are delivered in specialized vehicles with temperature monitoring to maintain product integrity.
                        </p>
                    </div>

                    {/* Section 5: Delivery Attempts */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">5. Delivery Attempts</h2>
                        <p className="text-gray-600 leading-relaxed font-['Roboto']">
                            We make up to 3 delivery attempts. If unsuccessful, items will be held at our facility for 7 days before being returned to inventory.
                        </p>
                    </div>

                    {/* Section 6: Damaged Items */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">6. Damaged Items</h2>
                        <p className="text-gray-600 leading-relaxed font-['Roboto']">
                            Please inspect items upon delivery. Report any damage within 24 hours for immediate replacement or refund.
                        </p>
                    </div>

                    {/* Section 7: Contact Information */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">7. Contact Information</h2>
                        <div className="text-gray-600 font-['Roboto']">
                            <p>For delivery inquiries or special arrangements, contact us:</p>
                            <div className="mt-3 space-y-1">
                                <p><strong>Email:</strong> delivery@medhelmsupplies.co.ke</p>
                                <p><strong>Phone:</strong> +254 746 020 323</p>
                                <p><strong>Address:</strong> Kiambu Town, Opposite Kiambu Level 5 Hospital</p>
                                <p><strong>Hours:</strong> Mon-Sat: 8:00 AM - 6:00 PM</p>
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

export default DeliveryPolicy;
