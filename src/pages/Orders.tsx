import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

interface Order {
    _id: string;
    orderNumber: string;
    createdAt: string;
    orderStatus: string;
    paymentStatus: string;
    totalAmount: number;
    items: Array<{
        product: {
            _id: string;
            name: string;
            imageUrl?: string;
        };
        quantity: number;
        price: number;
    }>;
    shippingAddress: {
        name: string;
        address: string;
        city: string;
        phone: string;
    };
}

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            let allOrders: Order[] = [];

            // Get demo orders from localStorage
            const demoOrders = localStorage.getItem('demo_orders');
            if (demoOrders) {
                const parsedDemoOrders = JSON.parse(demoOrders);
                allOrders = parsedDemoOrders.map((order: any) => ({
                    _id: order.id,
                    orderNumber: order.id,
                    createdAt: order.createdAt,
                    orderStatus: order.status || 'pending',
                    paymentStatus: 'paid',
                    totalAmount: order.totalAmount,
                    items: order.items.map((item: any) => ({
                        product: {
                            _id: item.productId || '1',
                            name: item.name,
                            imageUrl: ''
                        },
                        quantity: item.quantity,
                        price: item.price
                    })),
                    shippingAddress: {
                        name: order.shippingAddress?.fullName || 'Customer',
                        address: order.shippingAddress?.address || '',
                        city: order.shippingAddress?.city || '',
                        phone: order.shippingAddress?.phone || ''
                    }
                }));
            }

            // Try to fetch orders from API if user is authenticated
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (data.orders) {
                            allOrders = [...allOrders, ...data.orders];
                        }
                    }
                } catch (apiError) {
                    console.log('API orders not available:', apiError);
                }
            }

            setOrders(allOrders);

            // Show notification for new orders if available
            if (allOrders.length > 0) {
                const latestOrder = allOrders[0];
                toast({
                    title: `Order ${latestOrder.orderStatus}`,
                    description: `Order #${latestOrder.orderNumber || latestOrder._id.toString().slice(-8)} is now ${latestOrder.orderStatus}.`,
                });
            }
        } catch (err) {
            setError('Failed to load orders');
            console.error('Orders fetch error:', err);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'processing': return 'bg-blue-100 text-blue-800';
            case 'shipped': return 'bg-purple-100 text-purple-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPaymentStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'paid': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };



    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center text-red-600">{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
                    <p className="text-gray-600">Track and manage your order history</p>
                </div>

                {orders.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">📦</div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No orders yet</h3>
                        <p className="text-gray-600 mb-6">When you place your first order, it will appear here.</p>
                        <Link
                            to="/products"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white rounded-lg shadow-sm border">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                Order #{order.orderNumber || order._id.slice(-8)}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                                                {order.orderStatus}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                                                {order.paymentStatus}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="border-t pt-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                {order.items.slice(0, 3).map((item, index) => (
                                                    <div key={index} className="flex items-center space-x-3">
                                                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                                            {item.product.imageUrl ? (
                                                                <img
                                                                    src={item.product.imageUrl}
                                                                    alt={item.product.name}
                                                                    className="w-full h-full object-cover rounded-lg"
                                                                />
                                                            ) : (
                                                                <span className="text-gray-500 text-xs">📦</span>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900">{item.product.name}</p>
                                                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                                {order.items.length > 3 && (
                                                    <div className="text-sm text-gray-600">
                                                        +{order.items.length - 3} more items
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-semibold text-gray-900">
                                                    KES {order.totalAmount.toLocaleString()}
                                                </p>
                                                <button
                                                    onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1"
                                                >
                                                    {selectedOrder?._id === order._id ? 'Hide Details' : 'View Details'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {selectedOrder?._id === order._id && (
                                        <div className="border-t mt-4 pt-4">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
                                                    <div className="space-y-3">
                                                        {order.items.map((item, index) => (
                                                            <div key={index} className="flex items-center justify-between">
                                                                <div className="flex items-center space-x-3">
                                                                    <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                                                                        {item.product.imageUrl ? (
                                                                            <img
                                                                                src={item.product.imageUrl}
                                                                                alt={item.product.name}
                                                                                className="w-full h-full object-cover rounded"
                                                                            />
                                                                        ) : (
                                                                            <span className="text-gray-500 text-xs">📦</span>
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-medium text-gray-900">{item.product.name}</p>
                                                                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                                    </div>
                                                                </div>
                                                                <p className="font-medium text-gray-900">
                                                                    KES {(item.price * item.quantity).toLocaleString()}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                                                    <div className="text-sm text-gray-600">
                                                        <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                                                        <p>{order.shippingAddress.address}</p>
                                                        <p>{order.shippingAddress.city}</p>
                                                        <p>{order.shippingAddress.phone}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
