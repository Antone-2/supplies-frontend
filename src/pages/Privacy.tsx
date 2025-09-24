import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 font-['Roboto']">Privacy Policy</h1>
                    <p className="text-gray-600 font-['Roboto']">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Section 1: Information We Collect */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">1. Information We Collect</h2>
                        <div className="space-y-4 font-['Roboto']">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                                <p className="text-gray-600 mb-2">We collect information you provide directly to us, such as:</p>
                                <ul className="text-gray-600 space-y-1 ml-4">
                                    <li>• Name, email address, and phone number</li>
                                    <li>• Billing and delivery addresses</li>
                                    <li>• Payment information (processed securely)</li>
                                    <li>• Healthcare facility information (if applicable)</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Automatically Collected Information</h3>
                                <ul className="text-gray-600 space-y-1 ml-4">
                                    <li>• Device information and IP address</li>
                                    <li>• Browser type and version</li>
                                    <li>• Pages visited and time spent on site</li>
                                    <li>• Referral sources</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: How We Use Your Information */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">2. How We Use Your Information</h2>
                        <p className="text-gray-600 leading-relaxed mb-4 font-['Roboto']">
                            We use the information we collect to:
                        </p>
                        <ul className="text-gray-600 space-y-2 font-['Roboto']">
                            <li>• Process and fulfill your orders</li>
                            <li>• Communicate about your orders and account</li>
                            <li>• Provide customer support</li>
                            <li>• Send marketing communications (with your consent)</li>
                            <li>• Improve our website and services</li>
                            <li>• Comply with legal obligations</li>
                            <li>• Prevent fraud and enhance security</li>
                        </ul>
                    </div>

                    {/* Section 3: Information Sharing */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">3. Information Sharing</h2>
                        <p className="text-gray-600 leading-relaxed mb-4 font-['Roboto']">
                            We do not sell, trade, or rent your personal information. We may share your information with:
                        </p>
                        <ul className="text-gray-600 space-y-2 font-['Roboto']">
                            <li>• <strong>Service Providers:</strong> Third parties who assist with payment processing, shipping, and analytics</li>
                            <li>• <strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                            <li>• <strong>Business Transfers:</strong> In connection with a merger, sale, or transfer of assets</li>
                        </ul>
                    </div>

                    {/* Section 4: Data Security */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">4. Data Security</h2>
                        <p className="text-gray-600 leading-relaxed mb-4 font-['Roboto']">
                            We implement appropriate security measures to protect your personal information:
                        </p>
                        <ul className="text-gray-600 space-y-2 font-['Roboto']">
                            <li>• SSL encryption for data transmission</li>
                            <li>• Secure servers and databases</li>
                            <li>• Regular security assessments</li>
                            <li>• Limited access to personal information</li>
                            <li>• Employee training on data protection</li>
                        </ul>
                    </div>

                    {/* Section 5: Cookies and Tracking */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">5. Cookies and Tracking</h2>
                        <p className="text-gray-600 leading-relaxed mb-4 font-['Roboto']">
                            We use cookies and similar technologies to:
                        </p>
                        <ul className="text-gray-600 space-y-2 font-['Roboto']">
                            <li>• Remember your preferences and settings</li>
                            <li>• Analyze website usage and performance</li>
                            <li>• Provide personalized content</li>
                            <li>• Enable social media features</li>
                        </ul>
                        <p className="text-gray-600 font-['Roboto']">You can control cookies through your browser settings.</p>
                    </div>

                    {/* Section 6: Your Rights */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">6. Your Rights</h2>
                        <p className="text-gray-600 leading-relaxed mb-4 font-['Roboto']">
                            You have the right to:
                        </p>
                        <ul className="text-gray-600 space-y-2 font-['Roboto']">
                            <li>• Access the personal information we hold about you</li>
                            <li>• Request correction of inaccurate information</li>
                            <li>• Request deletion of your personal information</li>
                            <li>• Object to processing of your information</li>
                            <li>• Request data portability</li>
                            <li>• Withdraw consent for marketing communications</li>
                        </ul>
                    </div>

                    {/* Section 7: Data Retention */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">7. Data Retention</h2>
                        <p className="text-gray-600 leading-relaxed font-['Roboto']">
                            We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, comply with legal obligations, resolve disputes, and enforce our agreements.
                        </p>
                    </div>

                    {/* Section 8: International Transfers */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">8. International Transfers</h2>
                        <p className="text-gray-600 leading-relaxed font-['Roboto']">
                            Your information may be transferred to and processed in countries other than Kenya. We ensure appropriate safeguards are in place to protect your information in accordance with this privacy policy.
                        </p>
                    </div>

                    {/* Section 9: Children's Privacy */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">9. Children's Privacy</h2>
                        <p className="text-gray-600 leading-relaxed font-['Roboto']">
                            Our services are not intended for children under 18. We do not knowingly collect personal information from children under 18. If we become aware of such collection, we will delete the information immediately.
                        </p>
                    </div>

                    {/* Section 10: Contact Us */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">10. Contact Us</h2>
                        <div className="text-gray-600 font-['Roboto']">
                            <p>If you have questions about this Privacy Policy or our data practices, contact us:</p>
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

export default Privacy;
