import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Plus, Trash2, Edit, Home, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Address = {
    id: string;
    type: 'home' | 'work' | 'other';
    name: string;
    street: string;
    city: string;
    phone: string;
    isDefault: boolean;
};

const Addresses = () => {
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: '1',
            type: 'home',
            name: 'Home',
            street: '123 Main Street, Westlands',
            city: 'Nairobi',
            phone: '+254 712 345 678',
            isDefault: true,
        },
        {
            id: '2',
            type: 'work',
            name: 'Office',
            street: '456 Business Avenue, CBD',
            city: 'Nairobi',
            phone: '+254 723 456 789',
            isDefault: false,
        },
    ]);

    const handleSetDefault = (id: string) => {
        setAddresses(addresses =>
            addresses.map(address => ({
                ...address,
                isDefault: address.id === id,
            }))
        );
    };

    const handleDelete = (id: string) => {
        setAddresses(addresses => addresses.filter(address => address.id !== id));
    };

    const getAddressIcon = (type: string) => {
        switch (type) {
            case 'home':
                return <Home className="h-5 w-5" />;
            case 'work':
                return <Building className="h-5 w-5" />;
            default:
                return <MapPin className="h-5 w-5" />;
        }
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
                            <h1 className="text-xl font-semibold text-gray-900">Addresses</h1>
                        </div>
                        <Button size="sm" className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add Address
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-6">
                {addresses.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
                            <p className="text-gray-600 mb-4">Add an address to make deliveries faster.</p>
                            <Button className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Add Address
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {addresses.map((address) => (
                            <Card key={address.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-gray-100 rounded-lg">
                                                {getAddressIcon(address.type)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="font-medium text-gray-900">{address.name}</h3>
                                                    {address.isDefault && (
                                                        <Badge variant="secondary">Default</Badge>
                                                    )}
                                                </div>
                                                <p className="text-gray-700 mb-1">{address.street}</p>
                                                <p className="text-gray-700 mb-2">{address.city}</p>
                                                <p className="text-sm text-gray-600">{address.phone}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {!address.isDefault && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleSetDefault(address.id)}
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
                                                onClick={() => handleDelete(address.id)}
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

                {/* Delivery Info */}
                <Card className="mt-6 border-blue-200 bg-blue-50">
                    <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <MapPin className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-blue-900 mb-1">Delivery Information</h4>
                                <p className="text-sm text-blue-700">
                                    We deliver to all major areas in Nairobi and surrounding counties.
                                    Delivery typically takes 1-3 business days.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Addresses;
