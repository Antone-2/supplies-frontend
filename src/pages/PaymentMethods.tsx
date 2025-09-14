import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CreditCard, Plus, Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type PaymentMethod = {
    id: string;
    type: 'card' | 'mpesa';
    last4?: string;
    cardType?: string;
    expiryDate?: string;
    phoneNumber?: string;
    isDefault: boolean;
};

const PaymentMethods = () => {
    const navigate = useNavigate();
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
        {
            id: '1',
            type: 'card',
            cardType: 'Visa',
            last4: '4242',
            expiryDate: '12/26',
            isDefault: true,
        },
        {
            id: '2',
            type: 'mpesa',
            phoneNumber: '+254 712 345 678',
            isDefault: false,
        },
    ]);


    const handleSetDefault = (id: string) => {
        setPaymentMethods(methods =>
            methods.map(method => ({
                ...method,
                isDefault: method.id === id,
            }))
        );
    };

    const handleDelete = (id: string) => {
        setPaymentMethods(methods => methods.filter(method => method.id !== id));
    };


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-2xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate('/profile')}
                                className="p-2"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <h1 className="text-xl font-semibold text-gray-900">Payment Methods</h1>
                        </div>
                        <Button size="sm" className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add New
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-6">
                {paymentMethods.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No payment methods</h3>
                            <p className="text-gray-600 mb-4">Add a payment method to make purchases faster.</p>
                            <Button className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Add Payment Method
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {paymentMethods.map((method) => (
                            <Card key={method.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-gray-100 rounded-lg">
                                                <CreditCard className="h-6 w-6 text-gray-600" />
                                            </div>
                                            <div>
                                                {method.type === 'card' ? (
                                                    <>
                                                        <p className="font-medium text-gray-900">
                                                            {method.cardType} **** {method.last4}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            Expires {method.expiryDate}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="font-medium text-gray-900">M-Pesa</p>
                                                        <p className="text-sm text-gray-600">{method.phoneNumber}</p>
                                                    </>
                                                )}
                                                {method.isDefault && (
                                                    <Badge variant="secondary" className="mt-1">
                                                        Default
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {!method.isDefault && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleSetDefault(method.id)}
                                                >
                                                    Set Default
                                                </Button>
                                            )}
                                            <Button variant="ghost" size="sm">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(method.id)}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Security Notice */}
                <Card className="mt-6 border-amber-200 bg-amber-50">
                    <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-amber-100 rounded-lg">
                                <CreditCard className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-amber-900 mb-1">Secure Payments</h4>
                                <p className="text-sm text-amber-700">
                                    Your payment information is encrypted and secure. We never store your full card details.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PaymentMethods;
