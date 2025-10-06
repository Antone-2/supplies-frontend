import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Users,
    Package,
    ShoppingCart,
    DollarSign,
    TrendingUp,
    Activity,
    AlertCircle,
    Eye
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useNavigate } from 'react-router-dom';

interface DashboardStats {
    totalUsers: number;
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
    newUsers: number;
    recentActivity: ActivityItem[];
    alerts: AlertItem[];
}

interface ActivityItem {
    id: string;
    type: 'order' | 'user' | 'product';
    message: string;
    timestamp: string;
}

interface AlertItem {
    id: string;
    type: 'warning' | 'error' | 'info';
    message: string;
    action?: string;
}

const AdminDashboard = () => {
    const { admin } = useAdminAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<DashboardStats>({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        newUsers: 0,
        recentActivity: [],
        alerts: []
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const response = await fetch(`${apiUrl}/admin/dashboard/stats`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('adminAuthToken')}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                } else {
                    // Fallback to mock data for development
                    setStats({
                        totalUsers: 1247,
                        totalProducts: 156,
                        totalOrders: 2840,
                        totalRevenue: 125000,
                        pendingOrders: 23,
                        newUsers: 45,
                        recentActivity: [
                            {
                                id: '1',
                                type: 'order',
                                message: 'New order #12345 from John Doe',
                                timestamp: '2 minutes ago'
                            },
                            {
                                id: '2',
                                type: 'user',
                                message: 'New user registration: jane@example.com',
                                timestamp: '5 minutes ago'
                            },
                            {
                                id: '3',
                                type: 'product',
                                message: 'Product "Digital Thermometer" updated',
                                timestamp: '10 minutes ago'
                            }
                        ],
                        alerts: [
                            {
                                id: '1',
                                type: 'warning',
                                message: '5 products are low in stock',
                                action: 'View Inventory'
                            },
                            {
                                id: '2',
                                type: 'info',
                                message: '23 orders pending approval',
                                action: 'Review Orders'
                            }
                        ]
                    });
                }
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'order':
                return <ShoppingCart className="h-4 w-4 text-blue-600" />;
            case 'user':
                return <Users className="h-4 w-4 text-green-600" />;
            case 'product':
                return <Package className="h-4 w-4 text-purple-600" />;
            default:
                return <Activity className="h-4 w-4 text-gray-600" />;
        }
    };

    const getAlertVariant = (type: string) => {
        switch (type) {
            case 'error':
                return 'destructive';
            case 'warning':
                return 'secondary';
            case 'info':
            default:
                return 'default';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Welcome Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {admin?.name}!
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Here's what's happening with your MEDHELM Supplies platform today.
                    </p>
                </div>
                <Badge variant="secondary" className="flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    {admin?.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                </Badge>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Users
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-600 font-medium">+{stats.newUsers}</span> new this month
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Products
                        </CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalProducts.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            Active inventory items
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Orders
                        </CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-yellow-600 font-medium">{stats.pendingOrders}</span> pending
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Revenue
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
                        <p className="text-xs text-muted-foreground">
                            <TrendingUp className="inline h-3 w-3 mr-1" />
                            Total revenue
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {stats.recentActivity.length > 0 ? (
                                stats.recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-start gap-3">
                                        {getActivityIcon(activity.type)}
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{activity.message}</p>
                                            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground text-center py-4">
                                    No recent activity
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Alerts & Notifications */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5" />
                            Alerts & Notifications
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {stats.alerts.length > 0 ? (
                                stats.alerts.map((alert) => (
                                    <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex-1">
                                            <Badge variant={getAlertVariant(alert.type)} className="mb-2">
                                                {alert.type}
                                            </Badge>
                                            <p className="text-sm">{alert.message}</p>
                                        </div>
                                        {alert.action && (
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-3 w-3 mr-1" />
                                                {alert.action}
                                            </Button>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground text-center py-4">
                                    No alerts at this time
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Button 
                            variant="outline" 
                            className="h-20 flex flex-col gap-2"
                            onClick={() => navigate('/admin/orders')}
                        >
                            <ShoppingCart className="h-6 w-6" />
                            <span>Manage Orders</span>
                        </Button>
                        <Button 
                            variant="outline" 
                            className="h-20 flex flex-col gap-2"
                            onClick={() => navigate('/admin/products')}
                        >
                            <Package className="h-6 w-6" />
                            <span>Add Product</span>
                        </Button>
                        <Button 
                            variant="outline" 
                            className="h-20 flex flex-col gap-2"
                            onClick={() => navigate('/admin/users')}
                        >
                            <Users className="h-6 w-6" />
                            <span>User Management</span>
                        </Button>
                        <Button 
                            variant="outline" 
                            className="h-20 flex flex-col gap-2"
                            onClick={() => navigate('/admin/analytics')}
                        >
                            <TrendingUp className="h-6 w-6" />
                            <span>View Analytics</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminDashboard;