import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';

const Cookies = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 font-['Roboto']">Cookie Notice</h1>
                    <p className="text-gray-600 font-['Roboto']">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Section 1: What Are Cookies */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">1. What Are Cookies?</h2>
                        <p className="text-gray-600 leading-relaxed font-['Roboto']">
                            Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better browsing experience by remembering your preferences and analyzing how you use our site.
                        </p>
                    </div>

                    {/* Section 2: Types of Cookies */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">2. Types of Cookies We Use</h2>
                        <div className="space-y-4 font-['Roboto']">
                            <div className="bg-blue-50 p-4 rounded">
                                <h3 className="font-semibold text-blue-800 mb-2">Essential Cookies</h3>
                                <p className="text-blue-700 text-sm mb-2">These cookies are essential for the website to function properly.</p>
                                <p className="text-xs text-blue-600"><strong>Examples:</strong> Session management, security tokens, shopping cart functionality</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded">
                                <h3 className="font-semibold text-green-800 mb-2">Analytics Cookies</h3>
                                <p className="text-green-700 text-sm mb-2">These cookies help us understand how visitors interact with our website.</p>
                                <p className="text-xs text-green-600"><strong>Examples:</strong> Google Analytics, page views, bounce rate</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded">
                                <h3 className="font-semibold text-purple-800 mb-2">Functionality Cookies</h3>
                                <p className="text-purple-700 text-sm mb-2">These cookies enable enhanced functionality and personalization.</p>
                                <p className="text-xs text-purple-600"><strong>Examples:</strong> Language preferences, remembered login details</p>
                            </div>
                            <div className="bg-orange-50 p-4 rounded">
                                <h3 className="font-semibold text-orange-800 mb-2">Marketing Cookies</h3>
                                <p className="text-orange-700 text-sm mb-2">These cookies track your browsing habits for advertising purposes.</p>
                                <p className="text-xs text-orange-600"><strong>Examples:</strong> Social media cookies, retargeting pixels</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Third-Party Cookies */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">3. Third-Party Cookies</h2>
                        <p className="text-gray-600 leading-relaxed mb-4 font-['Roboto']">
                            We may use third-party services that set cookies on our website:
                        </p>
                        <ul className="text-gray-600 space-y-2 font-['Roboto']">
                            <li>• <strong>Google Analytics:</strong> Website analytics and performance tracking</li>
                            <li>• <strong>Facebook Pixel:</strong> Social media advertising and conversion tracking</li>
                            <li>• <strong>Payment Processors:</strong> Secure payment processing (M-Pesa, PayPal)</li>
                            <li>• <strong>Customer Support:</strong> Live chat and support features</li>
                        </ul>
                    </div>

                    {/* Section 4: Managing Preferences */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">4. Managing Your Cookie Preferences</h2>
                        <div className="space-y-4 font-['Roboto']">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Browser Settings</h3>
                                <p className="text-gray-600 mb-2">You can control cookies through your browser settings:</p>
                                <ul className="text-gray-600 space-y-1 ml-4">
                                    <li>• Block all cookies</li>
                                    <li>• Allow only first-party cookies</li>
                                    <li>• Delete existing cookies</li>
                                    <li>• Set cookies to expire when you close your browser</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Cookie Banner</h3>
                                <p className="text-gray-600">When you first visit our website, you'll see a cookie banner where you can:</p>
                                <ul className="text-gray-600 space-y-1 ml-4">
                                    <li>• Accept all cookies</li>
                                    <li>• Reject non-essential cookies</li>
                                    <li>• Customize your preferences</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Section 5: Impact of Disabling */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">5. Impact of Disabling Cookies</h2>
                        <p className="text-gray-600 leading-relaxed mb-4 font-['Roboto']">
                            Disabling certain cookies may impact your experience on our website:
                        </p>
                        <ul className="text-gray-600 space-y-2 font-['Roboto']">
                            <li>• <strong>Essential Cookies:</strong> Website may not function properly</li>
                            <li>• <strong>Analytics Cookies:</strong> We cannot improve our website based on usage data</li>
                            <li>• <strong>Functional Cookies:</strong> You may need to re-enter information on each visit</li>
                            <li>• <strong>Marketing Cookies:</strong> You may see less relevant advertisements</li>
                        </ul>
                    </div>

                    {/* Section 6: Updates */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">6. Updates to This Notice</h2>
                        <p className="text-gray-600 leading-relaxed font-['Roboto']">
                            We may update this Cookie Notice from time to time to reflect changes in our practices or applicable laws. We encourage you to review this notice periodically for any updates.
                        </p>
                    </div>

                    {/* Section 7: Contact Information */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">7. Contact Information</h2>
                        <div className="text-gray-600 font-['Roboto']">
                            <p>If you have questions about our use of cookies, please contact us:</p>
                            <div className="mt-3 space-y-1">
                                <p><strong>Email:</strong> privacy@medhelmsupplies.co.ke</p>
                                <p><strong>Phone:</strong> +254 746 020 323</p>
                                <p><strong>Address:</strong> Kiambu Town, Opposite Kiambu Level 5 Hospital</p>
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

export default Cookies;
