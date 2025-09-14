import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// ...existing code...
import Footer from '@/components/Footer';

const Privacy = () => {
    return (
        <div className="min-h-screen">
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
                    <p className="text-muted-foreground mb-8">Last updated: August 9, 2025</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>1. Information We Collect</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 text-sm">
                                    <h4 className="font-medium">Personal Information</h4>
                                    <p>We collect information you provide directly to us, such as:</p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>Name, email address, and phone number</li>
                                        <li>Billing and delivery addresses</li>
                                        <li>Payment information (processed securely)</li>
                                        <li>Healthcare facility information (if applicable)</li>
                                    </ul>

                                    <h4 className="font-medium mt-4">Automatically Collected Information</h4>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>Device information and IP address</li>
                                        <li>Browser type and version</li>
                                        <li>Pages visited and time spent on site</li>
                                        <li>Referral sources</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>2. How We Use Your Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 text-sm">
                                    <p>We use the information we collect to:</p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>Process and fulfill your orders</li>
                                        <li>Communicate about your orders and account</li>
                                        <li>Provide customer support</li>
                                        <li>Send marketing communications (with your consent)</li>
                                        <li>Improve our website and services</li>
                                        <li>Comply with legal obligations</li>
                                        <li>Prevent fraud and enhance security</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>3. Information Sharing</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 text-sm">
                                    <p>We do not sell, trade, or rent your personal information. We may share your information with:</p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li><strong>Service Providers:</strong> Third parties who assist with payment processing, shipping, and analytics</li>
                                        <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                                        <li><strong>Business Transfers:</strong> In connection with a merger, sale, or transfer of assets</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>4. Data Security</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 text-sm">
                                    <p>We implement appropriate security measures to protect your personal information:</p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>SSL encryption for data transmission</li>
                                        <li>Secure servers and databases</li>
                                        <li>Regular security assessments</li>
                                        <li>Limited access to personal information</li>
                                        <li>Employee training on data protection</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>5. Cookies and Tracking</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 text-sm">
                                    <p>We use cookies and similar technologies to:</p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>Remember your preferences and settings</li>
                                        <li>Analyze website usage and performance</li>
                                        <li>Provide personalized content</li>
                                        <li>Enable social media features</li>
                                    </ul>
                                    <p>You can control cookies through your browser settings.</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>6. Your Rights</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 text-sm">
                                    <p>You have the right to:</p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>Access the personal information we hold about you</li>
                                        <li>Request correction of inaccurate information</li>
                                        <li>Request deletion of your personal information</li>
                                        <li>Object to processing of your information</li>
                                        <li>Request data portability</li>
                                        <li>Withdraw consent for marketing communications</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>7. Data Retention</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm">
                                    We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, comply with legal obligations, resolve disputes, and enforce our agreements.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>8. International Transfers</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm">
                                    Your information may be transferred to and processed in countries other than Kenya. We ensure appropriate safeguards are in place to protect your information in accordance with this privacy policy.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>9. Children's Privacy</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm">
                                    Our services are not intended for children under 18. We do not knowingly collect personal information from children under 18. If we become aware of such collection, we will delete the information immediately.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>10. Contact Us</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm">
                                    <p>If you have questions about this Privacy Policy or our data practices, contact us:</p>
                                    <div className="mt-3 space-y-1">
                                        <p><strong>Email:</strong> privacy@medhelmsupplies.co.ke</p>
                                        <p><strong>Phone:</strong> +254 746 020 323</p>
                                        <p><strong>Address:</strong> Kiambu Town, Kenya</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Privacy;