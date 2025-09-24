import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Users,
    Package,
    DollarSign,
    ShoppingCart,
    Eye,
    Activity,
    AlertTriangle,
    Target,
    Clock,
    Calendar,
    Download,
    RefreshCw,
    Filter,
    MoreHorizontal,
    ArrowUpRight,
    ArrowDownRight,
    Zap,
    Globe,
    Smartphone,
    Monitor,
    Search,
    Home,
    ChevronRight,
    Menu,
    X,
    Settings,
    Bell,
    User,
    LogOut
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
import Spinner from '../../components/Spinner';

interface AnalyticsData {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    totalProducts: number;
    conversionRate: number;
    averageOrderValue: number;
    monthlyGrowth: number;
    customerRetention: number;
    topProducts: Array<{
        name: string;
        sales: number;
        revenue: number;
        growth: number;
    }>;
    recentOrders: Array<{
        id: string;
        customer: string;
        amount: number;
        status: string;
        date: string;
        items: number;
    }>;
    trafficSources: Array<{
        source: string;
        visitors: number;
        percentage: number;
        change: number;
    }>;
    salesByCategory: Array<{
        category: string;
        sales: number;
        percentage: number;
    }>;
}

const AnalyticsDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState('30d');
    const [selectedMetric, setSelectedMetric] = useState('revenue');
    const [searchTerm, setSearchTerm] = useState('');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/admin/analytics');
                const data = await response.json();
                setAnalyticsData(data.analytics || null);
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getGrowthColor = (growth: number) => {
        return growth >= 0 ? 'text-green-600' : 'text-red-600';
    };

    const getGrowthIcon = (growth: number) => {
        return growth >= 0 ? ArrowUpRight : ArrowDownRight;
    };

    // Breadcrumb navigation
    const breadcrumbItems = [
        { label: 'Dashboard', icon: Home, href: '/admin' },
        { label: 'Analytics', icon: BarChart3, href: '/admin/analytics' }
    ];

    // Quick action shortcuts
    const quickActions = [
        { label: 'Add Product', icon: Package, href: '/admin/products/new', color: 'blue' },
        { label: 'Process Orders', icon: ShoppingCart, href: '/admin/orders', color: 'green' },
        { label: 'Manage Users', icon: Users, href: '/admin/users', color: 'purple' },
        { label: 'View Reports', icon: BarChart3, href: '/admin/reports', color: 'orange' }
    ];

    return (
        <AdminLayout activeSection="dashboard" title="Analytics Dashboard">
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
                {/* Mobile Menu Button */}
                <div className="lg:hidden fixed top-4 left-4 z-50">
                    <Button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>

                {/* Mobile Overlay */}
                {mobileMenuOpen && (
                    <div
                        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )}

                {/* Header with Breadcrumb */}
                <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Breadcrumb Navigation */}
                        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                            {breadcrumbItems.map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="flex items-center space-x-2">
                                        <item.icon className="h-4 w-4" />
                                        <span className="font-medium">{item.label}</span>
                                    </div>
                                    {index < breadcrumbItems.length - 1 && (
                                        <ChevronRight className="h-4 w-4 text-gray-400" />
                                    )}
                                </React.Fragment>
                            ))}
                        </nav>

                        {/* Header Content */}
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                            <div>
                                <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-tight leading-tight font-['Roboto']">
                                    Analytics
                                </h1>
                                <p className="text-lg text-gray-600 mt-3 font-medium tracking-wide font-['Roboto']">
                                    Comprehensive insights into your business performance
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                                {/* Search Bar */}
                                <div className="relative flex-1 lg:w-80">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <Input
                                        placeholder="Search analytics, reports..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-12 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-2xl font-['Roboto']"
                                    />
                                </div>

                                <Select value={dateRange} onValueChange={setDateRange}>
                                    <SelectTrigger className="w-48 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-2xl font-['Roboto']">
                                        <SelectValue placeholder="Select date range" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="7d">Last 7 days</SelectItem>
                                        <SelectItem value="30d">Last 30 days</SelectItem>
                                        <SelectItem value="90d">Last 90 days</SelectItem>
                                        <SelectItem value="1y">Last year</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 text-lg font-semibold font-['Roboto']">
                                    <Download className="h-5 w-5 mr-2" />
                                    Export Report
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-1 lg:gap-1.5 mb-8">
                        <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
                            <CardContent className="p-1.5">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0">
                                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider font-['Roboto']">Total Revenue</p>
                                        <p className="text-sm font-black text-gray-900 tracking-tight font-['Roboto']">{formatCurrency(analyticsData.totalRevenue)}</p>
                                        <div className="flex items-center space-x-0.5">
                                            <TrendingUp className="w-2.5 h-2.5 text-green-500" />
                                            <span className="text-xs font-bold text-green-600 bg-green-100 px-0.5 py-0 rounded-full font-['Roboto']">
                                                +{analyticsData.monthlyGrowth}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-0.5 bg-blue-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                        <DollarSign className="h-2.5 w-2.5 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                            <CardContent className="p-1.5">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0">
                                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider font-['Roboto']">Total Orders</p>
                                        <p className="text-sm font-black text-gray-900 tracking-tight font-['Roboto']">{analyticsData.totalOrders.toLocaleString()}</p>
                                        <div className="flex items-center space-x-0.5">
                                            <TrendingUp className="w-2.5 h-2.5 text-green-500" />
                                            <span className="text-xs font-bold text-green-600 bg-green-100 px-0.5 py-0 rounded-full font-['Roboto']">
                                                +8.2%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-0.5 bg-green-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                        <ShoppingCart className="h-2.5 w-2.5 text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-50">
                            <CardContent className="p-1.5">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0">
                                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider font-['Roboto']">Total Customers</p>
                                        <p className="text-sm font-black text-gray-900 tracking-tight font-['Roboto']">{analyticsData.totalCustomers.toLocaleString()}</p>
                                        <div className="flex items-center space-x-0.5">
                                            <TrendingUp className="w-2.5 h-2.5 text-green-500" />
                                            <span className="text-xs font-bold text-green-600 bg-green-100 px-0.5 py-0 rounded-full font-['Roboto']">
                                                +5.7%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-0.5 bg-purple-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                        <Users className="h-2.5 w-2.5 text-purple-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50">
                            <CardContent className="p-1.5">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0">
                                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider font-['Roboto']">Conversion Rate</p>
                                        <p className="text-sm font-black text-gray-900 tracking-tight font-['Roboto']">{analyticsData.conversionRate}%</p>
                                        <div className="flex items-center space-x-0.5">
                                            <TrendingUp className="w-2.5 h-2.5 text-green-500" />
                                            <span className="text-xs font-bold text-green-600 bg-green-100 px-0.5 py-0 rounded-full font-['Roboto']">
                                                +0.3%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-0.5 bg-orange-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                        <Target className="h-2.5 w-2.5 text-orange-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
                            <CardTitle className="text-lg font-bold text-gray-800 font-['Roboto']">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {quickActions.map((action, index) => (
                                    <Button
                                        key={index}
                                        className={`h-16 flex flex-col gap-1 text-sm font-semibold transition-all duration-300 hover:scale-105 ${action.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' :
                                            action.color === 'green' ? 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' :
                                                action.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700' :
                                                    'bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                                            }`}
                                    >
                                        <action.icon className="h-4 w-4" />
                                        {action.label}
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Charts and Analytics Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                        {/* Sales by Category */}
                        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
                                <CardTitle className="text-lg font-bold text-gray-800 font-['Roboto']">Sales by Category</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="space-y-3">
                                    {analyticsData.salesByCategory.map((category, index) => (
                                        <div key={category.category} className="space-y-1">
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold text-sm text-gray-700 font-['Roboto']">{category.category}</span>
                                                <span className="text-xs text-gray-600 font-['Roboto']">{category.percentage}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${category.percentage}%` }}
                                                ></div>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-bold text-sm text-gray-900 font-['Roboto']">{formatCurrency(category.sales)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Traffic Sources */}
                        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-2xl">
                                <CardTitle className="text-lg font-bold text-gray-800 font-['Roboto']">Traffic Sources</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="space-y-3">
                                    {analyticsData.trafficSources.map((source, index) => (
                                        <div key={source.source} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-blue-500' :
                                                    index === 1 ? 'bg-green-500' :
                                                        index === 2 ? 'bg-purple-500' : 'bg-orange-500'
                                                    }`}></div>
                                                <div>
                                                    <p className="font-semibold text-sm text-gray-800 font-['Roboto']">{source.source}</p>
                                                    <p className="text-xs text-gray-600 font-['Roboto']">{source.visitors.toLocaleString()} visitors</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-sm text-gray-900 font-['Roboto']">{source.percentage}%</p>
                                                <div className={`flex items-center text-xs ${getGrowthColor(source.change)}`}>
                                                    {React.createElement(getGrowthIcon(source.change), { className: "w-2 h-2 mr-1" })}
                                                    {Math.abs(source.change)}%
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Orders and Top Products */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                        {/* Recent Orders */}
                        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
                                <CardTitle className="text-lg font-bold text-gray-800 font-['Roboto']">Recent Orders</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gradient-to-r from-gray-50 to-blue-50">
                                                <th className="text-left p-3 font-bold text-gray-700 uppercase tracking-wider font-['Roboto'] text-xs">Order</th>
                                                <th className="text-left p-3 font-bold text-gray-700 uppercase tracking-wider font-['Roboto'] text-xs">Customer</th>
                                                <th className="text-left p-3 font-bold text-gray-700 uppercase tracking-wider font-['Roboto'] text-xs">Amount</th>
                                                <th className="text-left p-3 font-bold text-gray-700 uppercase tracking-wider font-['Roboto'] text-xs">Status</th>
                                                <th className="text-left p-3 font-bold text-gray-700 uppercase tracking-wider font-['Roboto'] text-xs">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {analyticsData.recentOrders.map((order, index) => (
                                                <tr key={order.id} className={`border-b hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                                                    <td className="p-3">
                                                        <div>
                                                            <p className="font-bold text-gray-900 text-sm font-['Roboto']">{order.id}</p>
                                                            <p className="text-xs text-gray-600 font-['Roboto']">{order.items} items</p>
                                                        </div>
                                                    </td>
                                                    <td className="p-3">
                                                        <p className="font-semibold text-gray-900 text-sm font-['Roboto']">{order.customer}</p>
                                                        <p className="text-xs text-gray-600 font-['Roboto']">{order.date}</p>
                                                    </td>
                                                    <td className="p-3 font-bold text-gray-900 text-sm font-['Roboto']">{formatCurrency(order.amount)}</td>
                                                    <td className="p-3">
                                                        <Badge className={`${getStatusColor(order.status)} px-2 py-1 text-xs font-semibold border font-['Roboto']`}>
                                                            {order.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="p-3">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="sm" className="hover:bg-blue-100 hover:text-blue-600 transition-all duration-300">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="bg-white shadow-xl border-0">
                                                                <DropdownMenuItem className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 font-['Roboto']">
                                                                    <Eye className="h-4 w-4 mr-2" />
                                                                    View Details
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem className="hover:bg-green-50 hover:text-green-600 transition-all duration-300 font-['Roboto']">
                                                                    <RefreshCw className="h-4 w-4 mr-2" />
                                                                    Update Status
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

                        {/* Top Products */}
                        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-2xl">
                                <CardTitle className="text-lg font-bold text-gray-800 font-['Roboto']">Top Products</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="space-y-3">
                                    {analyticsData.topProducts.map((product, index) => (
                                        <div key={product.name} className="p-3 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 transition-all duration-300 border border-gray-100">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                                        #{index + 1}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-sm text-gray-900 font-['Roboto']">{product.name}</h4>
                                                        <p className="text-xs text-gray-600 font-['Roboto']">{product.sales} sales</p>
                                                    </div>
                                                </div>
                                                <div className={`flex items-center text-xs font-semibold ${getGrowthColor(product.growth)}`}>
                                                    {React.createElement(getGrowthIcon(product.growth), { className: "w-3 h-3 mr-1" })}
                                                    {Math.abs(product.growth)}%
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-600 font-['Roboto']">Revenue</span>
                                                <span className="font-bold text-sm text-gray-900 font-['Roboto']">{formatCurrency(product.revenue)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Additional Analytics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1 lg:gap-1.5 mb-8">
                        <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-blue-50">
                            <CardContent className="p-1.5">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0">
                                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider font-['Roboto']">Customer Retention</p>
                                        <p className="text-sm font-black text-gray-900 tracking-tight font-['Roboto']">{analyticsData.customerRetention}%</p>
                                        <div className="flex items-center space-x-0.5">
                                            <TrendingUp className="w-2.5 h-2.5 text-green-500" />
                                            <span className="text-xs font-bold text-green-600 bg-green-100 px-0.5 py-0 rounded-full font-['Roboto']">
                                                +2.1%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-0.5 bg-indigo-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                        <Users className="h-2.5 w-2.5 text-indigo-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-pink-50 to-rose-50">
                            <CardContent className="p-1.5">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0">
                                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider font-['Roboto']">Avg Order Value</p>
                                        <p className="text-sm font-black text-gray-900 tracking-tight font-['Roboto']">{formatCurrency(analyticsData.averageOrderValue)}</p>
                                        <div className="flex items-center space-x-0.5">
                                            <TrendingUp className="w-2.5 h-2.5 text-green-500" />
                                            <span className="text-xs font-bold text-green-600 bg-green-100 px-0.5 py-0 rounded-full font-['Roboto']">
                                                +5.4%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-0.5 bg-pink-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                        <DollarSign className="h-2.5 w-2.5 text-pink-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-teal-50 to-cyan-50">
                            <CardContent className="p-1.5">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0">
                                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider font-['Roboto']">Total Products</p>
                                        <p className="text-sm font-black text-gray-900 tracking-tight font-['Roboto']">{analyticsData.totalProducts.toLocaleString()}</p>
                                        <div className="flex items-center space-x-0.5">
                                            <TrendingUp className="w-2.5 h-2.5 text-green-500" />
                                            <span className="text-xs font-bold text-green-600 bg-green-100 px-0.5 py-0 rounded-full font-['Roboto']">
                                                +3.2%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-0.5 bg-teal-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                        <Package className="h-2.5 w-2.5 text-teal-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Mobile Bottom Navigation */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-lg">
                    <div className="flex justify-around py-3 px-4">
                        <Button variant="ghost" className="flex flex-col items-center gap-1 text-xs px-3 py-2">
                            <Home className="h-5 w-5" />
                            Dashboard
                        </Button>
                        <Button variant="ghost" className="flex flex-col items-center gap-1 text-xs px-3 py-2">
                            <BarChart3 className="h-5 w-5" />
                            Analytics
                        </Button>
                        <Button variant="ghost" className="flex flex-col items-center gap-1 text-xs px-3 py-2">
                            <Package className="h-5 w-5" />
                            Products
                        </Button>
                        <Button variant="ghost" className="flex flex-col items-center gap-1 text-xs px-3 py-2">
                            <Settings className="h-5 w-5" />
                            Settings
                        </Button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AnalyticsDashboard;
