import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAnalytics } from '../../lib/api';
import Spinner from '../../components/Spinner';
import AdminLayout from '../../components/admin/AdminLayout';
import Topbar from '../../components/admin/Topbar';
import {
    Package,
    ListChecks,
    Users,
    DollarSign,
    BarChart,
    TrendingDown,
    Activity,
    Triangle,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    Plus,
    Filter,
    RefreshCw,
    Eye,
    Download,
    Calendar,
    Settings,
    Bell,
    Menu,
    X,
    ShoppingBag,
    UserCheck,
    Info
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data for demonstration
// Real data from backend
// analytics object from useQuery
// Structure: { totalProducts, totalOrders, totalUsers, totalRevenue, monthlyGrowth, pendingOrders, lowStockItems, activeUsers, recentOrders, topProducts }

const Dashboard: React.FC = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: analytics, isLoading, isError } = useQuery({
        queryKey: ['analytics'],
        queryFn: fetchAnalytics
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'shipped': return 'bg-blue-100 text-blue-800';
            case 'processing': return 'bg-yellow-100 text-yellow-800';
            case 'pending': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AdminLayout activeSection="dashboard" title="Dashboard">
            {isLoading && <Spinner />}
            {isError && <div className="text-center text-red-500 py-8">Failed to load analytics data.</div>}
            {!isLoading && !isError && (
                <>
                    <Topbar
                        title="Dashboard"
                        onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    />

                    <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
                        {/* Page Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-tight leading-tight font-['Roboto']">
                                    📊 Dashboard Overview
                                </h1>
                                <p className="text-sm sm:text-base text-gray-600 mt-3 font-medium tracking-wide font-['Roboto']">Monitor your business performance and key metrics</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="outline" size="sm" className="flex items-center gap-2">
                                    <Download className="h-4 w-4" />
                                    Export
                                </Button>
                                <Button variant="outline" size="sm" className="flex items-center gap-2">
                                    <RefreshCw className="h-4 w-4" />
                                    Refresh
                                </Button>
                            </div>
                        </div>

                        {/* Key Performance Indicators */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                            <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-xs font-medium text-gray-600">Total Products</CardTitle>
                                    <div className="p-1.5 bg-blue-50 rounded-md">
                                        <Package className="h-4 w-4 text-blue-600" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xl font-bold text-gray-900">{analytics?.totalProducts?.toLocaleString?.() ?? 0}</div>
                                    <p className="text-xs text-green-600 flex items-center mt-1">
                                        <BarChart className="h-3 w-3 mr-1" />
                                        +5.2% from last month
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-green-500">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-xs font-medium text-gray-600">Total Orders</CardTitle>
                                    <div className="p-1.5 bg-green-50 rounded-md">
                                        <ListChecks className="h-4 w-4 text-green-600" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xl font-bold text-gray-900">{analytics?.totalOrders?.toLocaleString?.() ?? 0}</div>
                                    <p className="text-xs text-green-600 flex items-center mt-1">
                                        <BarChart className="h-3 w-3 mr-1" />
                                        +12.5% from last month
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-purple-500">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-xs font-medium text-gray-600">Total Users</CardTitle>
                                    <div className="p-1.5 bg-purple-50 rounded-md">
                                        <Users className="h-4 w-4 text-purple-600" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xl font-bold text-gray-900">{analytics?.totalUsers?.toLocaleString?.() ?? 0}</div>
                                    <p className="text-xs text-green-600 flex items-center mt-1">
                                        <BarChart className="h-3 w-3 mr-1" />
                                        +8.1% from last month
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-orange-500">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-xs font-medium text-gray-600">Revenue</CardTitle>
                                    <div className="p-1.5 bg-orange-50 rounded-md">
                                        <DollarSign className="h-4 w-4 text-orange-600" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xl font-bold text-gray-900">{formatCurrency(analytics?.totalRevenue ?? 0)}</div>
                                    <p className="text-xs text-green-600 flex items-center mt-1">
                                        <BarChart className="h-3 w-3 mr-1" />
                                        +15.3% from last month
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* System Status & Alerts */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
                            <Card className="border-l-4 border-l-yellow-500 bg-yellow-50/30">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xs font-medium flex items-center text-yellow-700">
                                        <Clock className="h-3 w-3 mr-1.5" />
                                        Pending Orders
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-yellow-700">{analytics?.pendingOrders ?? 0}</div>
                                    <p className="text-xs text-yellow-600 mt-1">Require immediate attention</p>
                                    <Button size="sm" className="mt-2 w-full bg-yellow-600 hover:bg-yellow-700 text-xs py-1.5">
                                        Process Orders
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="border-l-4 border-l-red-500 bg-red-50/30">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xs font-medium flex items-center text-red-700">
                                        <Triangle className="h-3 w-3 mr-1.5" />
                                        Low Stock Alert
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-red-700">{analytics?.lowStockItems ?? 0}</div>
                                    <p className="text-xs text-red-600 mt-1">Items need restocking</p>
                                    <Button size="sm" variant="outline" className="mt-2 w-full border-red-300 text-red-700 hover:bg-red-50 text-xs py-1.5">
                                        View Items
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="border-l-4 border-l-green-500 bg-green-50/30">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xs font-medium flex items-center text-green-700">
                                        <Activity className="h-3 w-3 mr-1.5" />
                                        Active Users
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-green-700">{analytics?.activeUsers ?? 0}</div>
                                    <p className="text-xs text-green-600 mt-1">Currently online</p>
                                    <Button size="sm" variant="outline" className="mt-2 w-full border-green-300 text-green-700 hover:bg-green-50 text-xs py-1.5">
                                        View Users
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                            {/* Recent Orders */}
                            <div className="xl:col-span-2">
                                <Card>
                                    <CardHeader>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                            <div>
                                                <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
                                                <CardDescription>Latest customer orders and their status</CardDescription>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="outline" size="sm">
                                                    <Filter className="h-4 w-4 mr-2" />
                                                    Filter
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    View All
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {(analytics?.recentOrders ?? []).map((order: any) => (
                                                <div key={order.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg border bg-white hover:shadow-sm transition-shadow gap-3 sm:gap-0">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                            <span className="font-semibold text-sm">{order.id}</span>
                                                            <Badge className={`${getStatusColor(order.status)} text-xs px-2 py-1`}>
                                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-gray-600 truncate mt-1">{order.customer}</p>
                                                        <p className="text-xs text-gray-500 flex items-center mt-1">
                                                            <Calendar className="h-3 w-3 mr-1" />
                                                            {order.date}
                                                        </p>
                                                    </div>
                                                    <div className="text-left sm:text-right">
                                                        <p className="font-semibold text-sm">{order.amount}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Top Products */}
                            <div>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg font-semibold">Top Products</CardTitle>
                                        <CardDescription>Best performing products this month</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {(analytics?.topProducts ?? []).map((product: any, index: number) => (
                                                <div key={product.name} className="flex flex-col p-3 rounded-lg border bg-white hover:shadow-sm transition-shadow">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                                                        <div className={`flex items-center text-xs ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                            {product.growth >= 0 ? (
                                                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                                            ) : (
                                                                <ArrowDownRight className="h-3 w-3 mr-1" />
                                                            )}
                                                            {Math.abs(product.growth)}%
                                                        </div>
                                                    </div>
                                                    <h4 className="font-medium text-sm mb-1">{product.name}</h4>
                                                    <p className="text-xs text-gray-600 mb-2">{product.sales} sales</p>
                                                    <p className="font-semibold text-sm text-gray-900">{formatCurrency(product.revenue)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
                                <CardDescription>Common administrative tasks and shortcuts</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <Button className="h-16 flex flex-col gap-1.5 text-xs bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                                        <Package className="h-4 w-4" />
                                        Add Product
                                    </Button>
                                    <Button variant="outline" className="h-16 flex flex-col gap-1.5 text-xs border-green-200 text-green-700 hover:bg-green-50">
                                        <ListChecks className="h-4 w-4" />
                                        Process Orders
                                    </Button>
                                    <Button variant="outline" className="h-16 flex flex-col gap-1.5 text-xs border-purple-200 text-purple-700 hover:bg-purple-50">
                                        <Users className="h-4 w-4" />
                                        Manage Users
                                    </Button>
                                    <Button variant="outline" className="h-16 flex flex-col gap-1.5 text-xs border-orange-200 text-orange-700 hover:bg-orange-50">
                                        <BarChart className="h-4 w-4" />
                                        View Reports
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </main>

                    {/* Mobile floating action bar */}
                    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-lg flex lg:hidden justify-around py-3 px-4 gap-2">
                        <Button className="flex flex-col items-center gap-1 text-xs px-3 py-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                            <Package className="h-5 w-5" />
                            Products
                        </Button>
                        <Button variant="outline" className="flex flex-col items-center gap-1 text-xs px-3 py-2 border-green-200 text-green-700">
                            <ListChecks className="h-5 w-5" />
                            Orders
                        </Button>
                        <Button variant="outline" className="flex flex-col items-center gap-1 text-xs px-3 py-2 border-purple-200 text-purple-700">
                            <Users className="h-5 w-5" />
                            Users
                        </Button>
                        <Button variant="outline" className="flex flex-col items-center gap-1 text-xs px-3 py-2 border-orange-200 text-orange-700">
                            <BarChart className="h-5 w-5" />
                            Reports
                        </Button>
                    </div>
                </>
            )}
        </AdminLayout>
    );
}

export default Dashboard;