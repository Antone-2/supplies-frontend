import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus, cancelOrder } from '../../services/orderService';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
    ShoppingCart,
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    Package,
    Truck,
    CheckCircle,
    XCircle,
    Clock,
    Download,
    RefreshCw
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/select';

interface Order {
    _id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    items: number;
    total: number;
    orderDate: string;
    shippingAddress: string;
    paymentMethod: string;
}

const AdminOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Fetch orders from backend
    useEffect(() => {
        setLoading(true);
        getOrders().then((data) => {
            setOrders(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'delivered': return <CheckCircle className="h-4 w-4" />;
            case 'shipped': return <Truck className="h-4 w-4" />;
            case 'processing': return <Clock className="h-4 w-4" />;
            case 'pending': return <Package className="h-4 w-4" />;
            case 'cancelled': return <XCircle className="h-4 w-4" />;
            default: return <Package className="h-4 w-4" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-700 border-green-300';
            case 'shipped': return 'bg-blue-100 text-blue-700 border-blue-300';
            case 'processing': return 'bg-orange-100 text-orange-700 border-orange-300';
            case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            case 'cancelled': return 'bg-red-100 text-red-700 border-red-300';
            default: return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };

    const filteredOrders = orders.filter((order: Order) => {
        const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        totalOrders: orders.length,
        pendingOrders: orders.filter((o: Order) => o.status === 'pending').length,
        deliveredOrders: orders.filter((o: Order) => o.status === 'delivered').length,
        totalRevenue: orders.reduce((sum: number, o: Order) => sum + o.total, 0)
    };

    if (loading) {
        return (
            <AdminLayout activeSection="orders" title="Order Management">
                <div className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-gray-600 mt-4">Loading orders...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout activeSection="orders" title="Order Management">
            <div className="flex-1 p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-tight leading-tight font-['Roboto']">
                            🛒 Order Management
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-600 mt-2 font-medium tracking-wide font-['Roboto']">Manage customer orders and shipments</p>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-2 text-sm font-semibold">
                        <Plus className="h-3 w-3 mr-2" />
                        New Order
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                    <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-gradient-to-br from-blue-50 to-cyan-50">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-gray-600">Total Orders</p>
                                    <p className="text-lg font-bold text-gray-900">{stats.totalOrders}</p>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-1 py-0.5 rounded-full">All Orders</span>
                                    </div>
                                </div>
                                <div className="p-2 bg-blue-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                    <ShoppingCart className="h-5 w-5 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-gradient-to-br from-orange-50 to-amber-50">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-gray-600">Pending Orders</p>
                                    <p className="text-lg font-bold text-gray-900">{stats.pendingOrders}</p>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                                        <span className="text-xs font-medium text-orange-600 bg-orange-100 px-1 py-0.5 rounded-full">Awaiting</span>
                                    </div>
                                </div>
                                <div className="p-2 bg-orange-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                    <Clock className="h-5 w-5 text-orange-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-gradient-to-br from-green-50 to-emerald-50">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-gray-600">Delivered</p>
                                    <p className="text-lg font-bold text-gray-900">{stats.deliveredOrders}</p>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                                        <span className="text-xs font-medium text-green-600 bg-green-100 px-1 py-0.5 rounded-full">Completed</span>
                                    </div>
                                </div>
                                <div className="p-2 bg-green-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-gradient-to-br from-purple-50 to-violet-50">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-gray-600">Total Revenue</p>
                                    <p className="text-lg font-bold text-gray-900">KSh {stats.totalRevenue.toLocaleString()}</p>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                                        <span className="text-xs font-medium text-purple-600 bg-purple-100 px-1 py-0.5 rounded-full">Generated</span>
                                    </div>
                                </div>
                                <div className="p-2 bg-purple-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                    <Package className="h-5 w-5 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="shadow-md border-0 bg-white/80">
                    <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
                                    <Input
                                        placeholder="Search orders..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-8 py-2 text-sm border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-lg"
                                    />
                                </div>
                            </div>

                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-40 py-2 text-sm border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-lg">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="shipped">Shipped</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Orders Table */}
                <Card className="shadow-md border-0 bg-white/80">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                        <CardTitle className="text-lg font-bold text-gray-800">Orders ({filteredOrders.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-gray-50 to-blue-50">
                                        <th className="text-left p-3 font-medium text-gray-700 text-sm">Order</th>
                                        <th className="text-left p-3 font-medium text-gray-700 text-sm">Customer</th>
                                        <th className="text-left p-3 font-medium text-gray-700 text-sm">Status</th>
                                        <th className="text-left p-3 font-medium text-gray-700 text-sm">Items</th>
                                        <th className="text-left p-3 font-medium text-gray-700 text-sm">Total</th>
                                        <th className="text-left p-3 font-medium text-gray-700 text-sm">Date</th>
                                        <th className="text-left p-3 font-medium text-gray-700 text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((order, index) => (
                                        <tr key={order._id} className={`border-b hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                                            <td className="p-3">
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm">{order.orderNumber}</p>
                                                    <p className="text-xs text-gray-600 font-mono bg-gray-100 px-1 py-0.5 rounded inline-block mt-0.5">ID: {order._id}</p>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <div className="space-y-0.5">
                                                    <p className="font-semibold text-gray-900 text-sm">{order.customerName}</p>
                                                    <p className="text-xs text-gray-600">{order.customerEmail}</p>
                                                    <p className="text-xs text-gray-600">{order.customerPhone}</p>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <Badge className={`${getStatusColor(order.status)} px-1 py-0.5 text-xs border flex items-center w-fit`}>
                                                    {getStatusIcon(order.status)}
                                                    <span className="ml-1">{order.status}</span>
                                                </Badge>
                                            </td>
                                            <td className="p-3 text-sm text-gray-900">{order.items}</td>
                                            <td className="p-3 font-semibold text-gray-900 text-sm">KSh {order.total.toLocaleString()}</td>
                                            <td className="p-3 text-xs text-gray-600">{order.orderDate}</td>
                                            <td className="p-3">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="hover:bg-blue-100 hover:text-blue-600 p-1">
                                                            <MoreHorizontal className="h-3 w-3" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="bg-white shadow-lg border-0">
                                                        <DropdownMenuItem onClick={() => setSelectedOrder(order)} className="hover:bg-blue-50 hover:text-blue-600 text-xs py-1">
                                                            <Eye className="h-3 w-3 mr-1" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="hover:bg-green-50 hover:text-green-600 text-xs py-1">
                                                            <Edit className="h-3 w-3 mr-1" />
                                                            Update Status
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600 hover:bg-red-50 text-xs py-1">
                                                            <Trash2 className="h-3 w-3 mr-1" />
                                                            Cancel Order
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Order Details Modal */}
                {selectedOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
                        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        Order Details - {selectedOrder.orderNumber}
                                    </h2>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setSelectedOrder(null)}
                                        className="hover:bg-gray-100 text-gray-600 hover:text-gray-800 p-1"
                                    >
                                        ✕
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700">Order Number</label>
                                                <p className="text-sm text-gray-900 font-mono bg-gray-100 px-1 py-0.5 rounded">{selectedOrder.orderNumber}</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700">Customer Name</label>
                                                <p className="text-sm text-gray-900 font-semibold">{selectedOrder.customerName}</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700">Email</label>
                                                <p className="text-sm text-gray-900">{selectedOrder.customerEmail}</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700">Phone</label>
                                                <p className="text-sm text-gray-900">{selectedOrder.customerPhone}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700">Status</label>
                                                <Badge className={`${getStatusColor(selectedOrder.status)} px-1 py-0.5 text-xs border flex items-center w-fit`}>
                                                    {getStatusIcon(selectedOrder.status)}
                                                    <span className="ml-1">{selectedOrder.status}</span>
                                                </Badge>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700">Items</label>
                                                <p className="text-sm text-gray-900 font-semibold">{selectedOrder.items}</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700">Total Amount</label>
                                                <p className="text-sm text-gray-900 font-bold">KSh {selectedOrder.total.toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700">Payment Method</label>
                                                <p className="text-sm text-gray-900">{selectedOrder.paymentMethod}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-700">Shipping Address</label>
                                        <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedOrder.shippingAddress}</p>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-700">Order Date</label>
                                        <p className="text-sm text-gray-900">{selectedOrder.orderDate}</p>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-2 mt-4 pt-3 border-t border-gray-200">
                                    <Button variant="outline" onClick={() => setSelectedOrder(null)} className="px-4 py-1 text-xs hover:bg-gray-50">
                                        Close
                                    </Button>
                                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-1 text-xs shadow-lg hover:shadow-xl">
                                        Update Status
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminOrders;
