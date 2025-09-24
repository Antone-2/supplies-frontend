import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';

const Terms = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 font-['Roboto']">Terms & Conditions</h1>
                    <p className="text-gray-600 font-['Roboto']">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Section 1: Acceptance of Terms */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">1. Acceptance of Terms</h2>
                        <p className="text-gray-600 leading-relaxed font-['Roboto']">
                            By accessing and using MEDHELM Supplies website and services, you accept and agree to be bound by the terms and provision of this agreement. These terms apply to all visitors, users and others who access or use the service.
                        </p>
                    </div>

                    {/* Section 2: Use License */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">2. Use License</h2>
                        <p className="text-gray-600 leading-relaxed mb-4 font-['Roboto']">
                            Permission is granted to temporarily download one copy of the materials on MEDHELM Supplies website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul className="text-gray-600 space-y-2 font-['Roboto']">
                            <li>• modify or copy the materials</li>
                            <li>• use the materials for any commercial purpose or for any public display</li>
                            <li>• attempt to reverse engineer any software contained on the website</li>
                            <li>• remove any copyright or other proprietary notations from the materials</li>
                        </ul>
                    </div>

                    {/* Section 3: User Accounts */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">3. User Accounts</h2>
                        <p className="text-gray-600 leading-relaxed font-['Roboto']">
                            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                        </p>
                    </div>

                    {/* Section 4: Limitation of Liability */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">4. Limitation of Liability</h2>
                        <p className="text-gray-600 leading-relaxed font-['Roboto']">
                            In no event shall Medhelm Supplies or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Medhelm Supplies' website.
                        </p>
                    </div>

                    {/* Section 5: Privacy Policy */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">5. Privacy Policy</h2>
                        <p className="text-gray-600 leading-relaxed font-['Roboto']">
                            Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
                        </p>
                    </div>

                    {/* Section 6: Contact Information */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 font-['Roboto']">6. Contact Information</h2>
                        <div className="text-gray-600 font-['Roboto']">
                            <p><strong>Email:</strong> info@medhelmsupplies.co.ke</p>
                            <p><strong>Phone:</strong> +254 746 020 323</p>
                            <p><strong>Address:</strong> Kiambu Town, Kenya</p>
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

export default Terms;
