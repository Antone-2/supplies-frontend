import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import Topbar from '../../components/admin/Topbar';
import Sidebar from '../../components/admin/Sidebar';
import {
    LuPackage,
    LuClipboardList,
    LuUsers,
    LuDollarSign,
    LuTrendingUp,
    LuTrendingDown,
    LuActivity,
    LuTriangle,
    LuClock,
    LuArrowUpRight,
    LuArrowDownRight,
    LuPlus,
    LuFilter,
    LuRefreshCw,
    LuEye,
    LuDownload,
    LuCalendar,
    LuSettings,
    LuBell,
    LuMenu,
    LuX,
    LuShoppingBag,
    LuUserCheck,
    LuInfo
} from 'react-icons/lu';
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
const statsData = {
    totalProducts: 1247,
    totalOrders: 3241,
    totalUsers: 892,
    totalRevenue: 2847590,
    monthlyGrowth: 12.5,
    pendingOrders: 23,
    lowStockItems: 8,
    activeUsers: 156
};

const recentOrders = [
    { id: '#1234', customer: 'John Doe', amount: 'KES 2,500', status: 'shipped', date: '2024-01-15' },
    { id: '#1235', customer: 'Jane Smith', amount: 'KES 1,200', status: 'processing', date: '2024-01-15' },
    { id: '#1236', customer: 'Mike Johnson', amount: 'KES 3,800', status: 'delivered', date: '2024-01-14' },
    { id: '#1237', customer: 'Sarah Wilson', amount: 'KES 950', status: 'pending', date: '2024-01-14' },
    { id: '#1238', customer: 'David Brown', amount: 'KES 4,200', status: 'shipped', date: '2024-01-13' },
];

const topProducts = [
    { name: 'Surgical Masks', sales: 1247, revenue: 124700, growth: 8.2 },
    { name: 'Hand Sanitizer', sales: 892, revenue: 178400, growth: 15.3 },
    { name: 'Medical Gloves', sales: 634, revenue: 190200, growth: -2.1 },
    { name: 'Thermometers', sales: 523, revenue: 104600, growth: 5.7 },
    { name: 'Bandages', sales: 445, revenue: 89000, growth: 12.8 },
];

const Dashboard: React.FC = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showMobileHeader, setShowMobileHeader] = useState(true);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
            case 'shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar - Now properly fixed */}
            <Sidebar
                activeSection="dashboard"
                setActiveSection={() => { }}
                sections={[]}
                isCollapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-500 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
                {/* Mobile Header */}
                <div className="lg:hidden bg-white border-b shadow-sm sticky top-0 z-30">
                    <div className="flex items-center justify-between px-2 py-2">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
                                <LuTrendingUp className="h-3 w-3 text-white" />
                            </div>
                            <div>
                                <h1 className="text-sm font-medium text-gray-900">Dashboard</h1>
                                <p className="text-xs text-gray-500">Medhelm Supplies</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="p-1.5">
                                <LuBell className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-1.5">
                                <LuSettings className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                </div>

                <main className="flex-1 p-1 sm:p-2 md:p-3 lg:p-6 space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6 pb-20 lg:pb-8 overflow-x-hidden">
                    {/* Welcome Section - tighter padding, smaller text */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md p-1.5 text-white mx-0.5">
                        <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                                <h1 className="text-xs font-medium mb-0.5 font-['Roboto']">Welcome back, Admin!</h1>
                                <p className="text-blue-100 text-xs font-['Roboto'] truncate">Here's what's happening with your store today</p>
                            </div>
                            <div className="hidden sm:block ml-1">
                                <LuTrendingUp className="h-3 w-3 text-blue-200" />
                            </div>
                        </div>
                    </div>

                    {/* Key Performance Indicators - Mobile Optimized */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 px-0.5 sm:px-0">
                        <Card className="transition-all duration-200 border-l-2 border-l-blue-500 touch-manipulation shadow-sm">
                            <CardHeader className="pb-0.5 p-1.5">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xs font-normal text-gray-600 font-['Roboto'] truncate">Products</CardTitle>
                                    <div className="p-0.5 bg-blue-50 rounded">
                                        <LuPackage className="h-2 w-2 text-blue-600" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0 p-1.5">
                                <div className="text-xs font-medium text-gray-900">{statsData.totalProducts.toLocaleString()}</div>
                                <p className="text-xs text-green-600 flex items-center mt-0.5">
                                    <LuTrendingUp className="h-2 w-2 mr-0.5" />
                                    +5.2%
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-green-500 touch-manipulation">
                            <CardHeader className="pb-0.5 p-1.5">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xs font-normal text-gray-600 font-['Roboto']">Orders</CardTitle>
                                    <div className="p-0.5 bg-green-50 rounded">
                                        <LuClipboardList className="h-2.5 w-2.5 text-green-600" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0 p-1.5">
                                <div className="text-xs sm:text-sm font-medium text-gray-900">{statsData.totalOrders.toLocaleString()}</div>
                                <p className="text-xs text-green-600 flex items-center mt-0.5">
                                    <LuTrendingUp className="h-2 w-2 mr-0.5" />
                                    +12.5%
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-purple-500 touch-manipulation">
                            <CardHeader className="pb-0.5 p-1.5">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xs font-normal text-gray-600 font-['Roboto']">Users</CardTitle>
                                    <div className="p-0.5 bg-purple-50 rounded">
                                        <LuUsers className="h-2.5 w-2.5 text-purple-600" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0 p-1.5">
                                <div className="text-xs sm:text-sm font-medium text-gray-900">{statsData.totalUsers.toLocaleString()}</div>
                                <p className="text-xs text-green-600 flex items-center mt-0.5">
                                    <LuTrendingUp className="h-2 w-2 mr-0.5" />
                                    +8.1%
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-orange-500 touch-manipulation">
                            <CardHeader className="pb-0.5 p-1.5">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xs font-normal text-gray-600 font-['Roboto']">Revenue</CardTitle>
                                    <div className="p-0.5 bg-orange-50 rounded">
                                        <LuDollarSign className="h-2.5 w-2.5 text-orange-600" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0 p-1.5">
                                <div className="text-xs sm:text-sm font-medium text-gray-900">{formatCurrency(statsData.totalRevenue / 1000)}K</div>
                                <p className="text-xs text-green-600 flex items-center mt-0.5">
                                    <LuTrendingUp className="h-2 w-2 mr-0.5" />
                                    +15.3%
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* System Status & Alerts - Mobile Optimized */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 px-0.5 sm:px-0">
                        <Card className="border-l-2 border-l-yellow-500 bg-yellow-50/50 touch-manipulation shadow-sm">
                            <CardHeader className="pb-0.5 p-1.5">
                                <CardTitle className="text-xs font-normal flex items-center text-yellow-700 font-['Roboto'] truncate">
                                    <LuClock className="h-2 w-2 mr-1" />
                                    Pending Orders
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 p-1.5">
                                <div className="text-xs font-medium text-yellow-700">{statsData.pendingOrders}</div>
                                <p className="text-xs text-yellow-600 mt-0.5 truncate">Need attention</p>
                                <Button size="sm" className="mt-1 w-full bg-yellow-600 hover:bg-yellow-700 text-xs py-1 min-h-[44px]">
                                    Process Now
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-red-500 bg-red-50/50 touch-manipulation">
                            <CardHeader className="pb-0.5 p-1.5">
                                <CardTitle className="text-xs font-normal flex items-center text-red-700 font-['Roboto']">
                                    <LuTriangle className="h-2.5 w-2.5 mr-1" />
                                    Low Stock
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 p-1.5">
                                <div className="text-base sm:text-lg font-medium text-red-700">{statsData.lowStockItems}</div>
                                <p className="text-xs text-red-600 mt-0.5">Items need restocking</p>
                                <Button size="sm" variant="outline" className="mt-1.5 w-full border-red-300 text-red-700 hover:bg-red-50 text-xs py-1">
                                    View Items
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-green-500 bg-green-50/50 touch-manipulation">
                            <CardHeader className="pb-0.5 p-1.5">
                                <CardTitle className="text-xs font-normal flex items-center text-green-700 font-['Roboto']">
                                    <LuActivity className="h-2.5 w-2.5 mr-1" />
                                    Active Users
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 p-1.5">
                                <div className="text-base sm:text-lg font-medium text-green-700">{statsData.activeUsers}</div>
                                <p className="text-xs text-green-600 mt-0.5">Currently online</p>
                                <Button size="sm" variant="outline" className="mt-1.5 w-full border-green-300 text-green-700 hover:bg-green-50 text-xs py-1">
                                    View Users
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Grid - Mobile First */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3 px-0.5 sm:px-0">
                        {/* Recent Orders */}
                        <div className="lg:col-span-2">
                            <Card className="touch-manipulation">
                                <CardHeader className="pb-1.5 p-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                                        <div>
                                            <CardTitle className="text-xs sm:text-sm font-medium font-['Roboto']">Recent Orders</CardTitle>
                                            <CardDescription className="text-xs font-['Roboto']">Latest customer orders and status</CardDescription>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Button variant="outline" size="sm" className="text-xs px-1.5 py-0.5">
                                                <LuFilter className="h-2 w-2 mr-0.5" />
                                                Filter
                                            </Button>
                                            <Button variant="outline" size="sm" className="text-xs px-1.5 py-0.5">
                                                <LuEye className="h-2 w-2 mr-0.5" />
                                                View All
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-2">
                                    <div className="space-y-1.5">
                                        {recentOrders.map((order) => (
                                            <div key={order.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-1 rounded-md border bg-white transition-shadow gap-1 touch-manipulation min-h-[44px]">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                                                        <span className="font-medium text-xs truncate max-w-[60px]">{order.id}</span>
                                                        <Badge className={`${getStatusColor(order.status)} text-xs px-1 py-0.5`}>
                                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-xs text-gray-600 truncate mt-0.5 max-w-[80px]">{order.customer}</p>
                                                    <p className="text-xs text-gray-500 flex items-center mt-0.5">
                                                        <LuCalendar className="h-2 w-2 mr-0.5" />
                                                        {order.date}
                                                    </p>
                                                </div>
                                                <div className="text-left sm:text-right">
                                                    <p className="font-medium text-xs">{order.amount}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Top Products */}
                        <div>
                            <Card className="touch-manipulation">
                                <CardHeader className="p-2">
                                    <CardTitle className="text-xs sm:text-sm font-medium font-['Roboto']">Top Products</CardTitle>
                                    <CardDescription className="text-xs font-['Roboto']">Best performing products this month</CardDescription>
                                </CardHeader>
                                <CardContent className="p-2">
                                    <div className="space-y-1.5">
                                        {topProducts.map((product, index) => (
                                            <div key={product.name} className="flex flex-col p-1 rounded-md border bg-white transition-shadow touch-manipulation min-h-[44px]">
                                                <div className="flex items-center justify-between mb-0.5">
                                                    <span className="text-xs font-normal text-gray-500">#{index + 1}</span>
                                                    <div className={`flex items-center text-xs ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                        {product.growth >= 0 ? (
                                                            <LuArrowUpRight className="h-2 w-2 mr-0.5" />
                                                        ) : (
                                                            <LuArrowDownRight className="h-2 w-2 mr-0.5" />
                                                        )}
                                                        {Math.abs(product.growth)}%
                                                    </div>
                                                </div>
                                                <h4 className="font-normal text-xs mb-0.5 truncate max-w-[80px]">{product.name}</h4>
                                                <p className="text-xs text-gray-600 mb-0.5 truncate">{product.sales} sales</p>
                                                <p className="font-medium text-xs text-gray-900">{formatCurrency(product.revenue)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Quick Actions - Mobile Optimized */}
                    <Card className="touch-manipulation mx-0.5 sm:mx-0">
                        <CardHeader className="p-2">
                            <CardTitle className="text-xs sm:text-sm font-medium font-['Roboto']">Quick Actions</CardTitle>
                            <CardDescription className="text-xs font-['Roboto']">Common administrative tasks and shortcuts</CardDescription>
                        </CardHeader>
                        <CardContent className="p-2">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                                <Button className="h-12 sm:h-14 flex flex-col gap-0.5 text-xs bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 touch-manipulation">
                                    <LuPackage className="h-3 w-3" />
                                    Add Product
                                </Button>
                                <Button variant="outline" className="h-12 sm:h-14 flex flex-col gap-0.5 text-xs border-green-200 text-green-700 hover:bg-green-50 touch-manipulation">
                                    <LuClipboardList className="h-3 w-3" />
                                    Process Orders
                                </Button>
                                <Button variant="outline" className="h-12 sm:h-14 flex flex-col gap-0.5 text-xs border-purple-200 text-purple-700 hover:bg-purple-50 touch-manipulation">
                                    <LuUsers className="h-3 w-3" />
                                    Manage Users
                                </Button>
                                <Button variant="outline" className="h-12 sm:h-14 flex flex-col gap-0.5 text-xs border-orange-200 text-orange-700 hover:bg-orange-50 touch-manipulation">
                                    <LuTrendingUp className="h-3 w-3" />
                                    View Reports
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </main>

                {/* Mobile Bottom Navigation */}
                <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-lg lg:hidden">
                    <div className="grid grid-cols-4 gap-1 p-2">
                        <Button variant="ghost" className="flex flex-col items-center gap-1 text-xs px-2 py-3 text-blue-600">
                            <LuTrendingUp className="h-5 w-5" />
                            Dashboard
                        </Button>
                        <Button variant="ghost" className="flex flex-col items-center gap-1 text-xs px-2 py-3 text-gray-600 hover:text-blue-600">
                            <LuPackage className="h-5 w-5" />
                            Products
                        </Button>
                        <Button variant="ghost" className="flex flex-col items-center gap-1 text-xs px-2 py-3 text-gray-600 hover:text-blue-600">
                            <LuClipboardList className="h-5 w-5" />
                            Orders
                        </Button>
                        <Button variant="ghost" className="flex flex-col items-center gap-1 text-xs px-2 py-3 text-gray-600 hover:text-blue-600">
                            <LuUsers className="h-5 w-5" />
                            Users
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
