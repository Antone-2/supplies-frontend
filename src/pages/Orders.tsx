import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Package, CheckCircle, Truck, Clock, XCircle } from 'lucide-react';
type OrderItem = {
    name: string;
    quantity: number;
    price: number;
};

type Order = {
    id: string;
    date: string;
    status: string;
    total: number;
    items: OrderItem[];
};

const Orders = () => {
    useAuth(); // invoked to ensure authentication context (user not directly used yet)
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);

    // Mock orders data - in real app, this would come from API
    useEffect(() => {
        // Clear orders if user has no orders
        setOrders([]);
    }, []);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'delivered':
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'shipped':
                return <Truck className="h-4 w-4 text-blue-600" />;
            case 'processing':
                return <Clock className="h-4 w-4 text-yellow-600" />;
            default:
                return <XCircle className="h-4 w-4 text-red-600" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'shipped':
                return 'bg-blue-100 text-blue-800';
            case 'processing':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-red-100 text-red-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-2xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate('/profile')}
                            className="p-2"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <h1 className="text-xl font-semibold text-gray-900">My Orders</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-6">
                {orders.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                            <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
                            <Button onClick={() => navigate('/shop')}>Start Shopping</Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <Card key={order.id} className="hover:shadow-md transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Package className="h-5 w-5 text-gray-600" />
                                            <div>
                                                <CardTitle className="text-lg">Order {order.id}</CardTitle>
                                                <p className="text-sm text-gray-600">{order.date}</p>
                                            </div>
                                        </div>
                                        <Badge className={getStatusColor(order.status)}>
                                            <div className="flex items-center gap-1">
                                                {getStatusIcon(order.status)}
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </div>
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {order.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                                            >
                                                <div>
                                                    <p className="font-medium text-gray-900">{item.name}</p>
                                                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="font-medium text-gray-900">KSh {item.price.toFixed(2)}</p>
                                            </div>
                                        ))}
                                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                            <span className="font-semibold text-gray-900">Total</span>
                                            <span className="font-bold text-lg text-indigo-600">KSh {order.total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <Button variant="outline" size="sm" className="flex-1">
                                            View Details
                                        </Button>
                                        <Button variant="outline" size="sm" className="flex-1">
                                            Track Order
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;

