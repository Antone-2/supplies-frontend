import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Shield, Clock, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Returns = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Returns & Refunds Policy</h1>

                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <RefreshCw className="h-5 w-5" />
                                    Return Policy Overview
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4">
                                    At MEDHELM Supplies, we understand that sometimes medical supplies may not meet your expectations.
                                    We offer a comprehensive return policy to ensure your satisfaction.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center p-4 border rounded-lg">
                                        <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                                        <h3 className="font-medium">30-Day Returns</h3>
                                        <p className="text-sm text-muted-foreground">Return within 30 days of purchase</p>
                                    </div>
                                    <div className="text-center p-4 border rounded-lg">
                                        <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                                        <h3 className="font-medium">Quality Guarantee</h3>
                                        <p className="text-sm text-muted-foreground">100% quality assurance on all products</p>
                                    </div>
                                    <div className="text-center p-4 border rounded-lg">
                                        <RefreshCw className="h-8 w-8 mx-auto mb-2 text-primary" />
                                        <h3 className="font-medium">Easy Process</h3>
                                        <p className="text-sm text-muted-foreground">Simple return process with support</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Return Conditions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-medium text-green-600 mb-2">✓ Returnable Items</h3>
                                        <ul className="list-disc list-inside space-y-1 text-sm">
                                            <li>Unopened medical supplies in original packaging</li>
                                            <li>Defective or damaged products</li>
                                            <li>Wrong items delivered</li>
                                            <li>Medical equipment with manufacturer defects</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-red-600 mb-2">✗ Non-Returnable Items</h3>
                                        <ul className="list-disc list-inside space-y-1 text-sm">
                                            <li>Opened sterile medical supplies</li>
                                            <li>Personal protective equipment (PPE) that has been used</li>
                                            <li>Prescription medications</li>
                                            <li>Customized medical equipment</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Return Process</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <Badge variant="outline" className="min-w-8 h-8 flex items-center justify-center">1</Badge>
                                        <div>
                                            <h3 className="font-medium">Contact Us</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Call us at +254 746 020 323 or email returns@medhelmsupplies.co.ke within 30 days of purchase.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Badge variant="outline" className="min-w-8 h-8 flex items-center justify-center">2</Badge>
                                        <div>
                                            <h3 className="font-medium">Return Authorization</h3>
                                            <p className="text-sm text-muted-foreground">
                                                We'll provide you with a Return Authorization Number (RAN) and return instructions.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Badge variant="outline" className="min-w-8 h-8 flex items-center justify-center">3</Badge>
                                        <div>
                                            <h3 className="font-medium">Package & Ship</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Pack the item securely in original packaging and ship to our return center.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Badge variant="outline" className="min-w-8 h-8 flex items-center justify-center">4</Badge>
                                        <div>
                                            <h3 className="font-medium">Refund Processing</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Refunds are processed within 5-7 business days after we receive the returned item.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Need Help?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button className="flex-1">
                                        <Phone className="mr-2 h-4 w-4" />
                                        Call Support: +254 746 020 323
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                        Email: returns@medhelmsupplies.co.ke
                                    </Button>
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

export default Returns;