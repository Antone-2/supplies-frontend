import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
    BarChart3,
    Download,
    Calendar,
    Filter,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Package,
    Users,
    ShoppingCart,
    Eye,
    RefreshCw,
    FileText,
    PieChart,
    Activity,
    Target,
    AlertTriangle,
    CheckCircle
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/select';
import Spinner from '../../components/Spinner';

interface ReportData {
    sales: {
        total: number;
        growth: number;
        byPeriod: Array<{ period: string; amount: number; orders: number }>;
    };
    products: {
        topSelling: Array<{ name: string; sales: number; revenue: number; growth: number }>;
        lowStock: Array<{ name: string; stock: number; threshold: number }>;
    };
    customers: {
        new: number;
        returning: number;
        topSpenders: Array<{ name: string; email: string; totalSpent: number; orders: number }>;
    };
    orders: {
        total: number;
        pending: number;
        completed: number;
        cancelled: number;
        averageValue: number;
    };
}

const AdminReports = () => {
    const [loading, setLoading] = useState(true);
    const [reportData, setReportData] = useState<ReportData | null>(null);
    const [dateRange, setDateRange] = useState('30d');
    const [reportType, setReportType] = useState('overview');

    useEffect(() => {
        const fetchReports = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/admin/reports');
                const data = await response.json();
                setReportData(data.reportData || null);
            } catch (error) {
                console.error('Failed to fetch reports:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getGrowthColor = (growth: number) => {
        return growth >= 0 ? 'text-green-600' : 'text-red-600';
    };

    const getGrowthIcon = (growth: number) => {
        return growth >= 0 ? TrendingUp : TrendingDown;
    };

    if (loading) {
        return (
            <AdminLayout activeSection="reports" title="Reports">
                <div className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-gray-600 mt-4">Loading reports...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (!reportData) return null;

    return (
        <AdminLayout activeSection="reports" title="Reports">
            <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-tight leading-tight font-['Roboto']">
                            📊 Reports & Analytics
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600 mt-3 font-medium tracking-wide font-['Roboto']">Comprehensive business insights and performance metrics</p>
                    </div>
                    <div className="flex gap-3">
                        <Select value={dateRange} onValueChange={setDateRange}>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Select date range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7d">Last 7 days</SelectItem>
                                <SelectItem value="30d">Last 30 days</SelectItem>
                                <SelectItem value="90d">Last 90 days</SelectItem>
                                <SelectItem value="1y">Last year</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                            <Download className="h-4 w-4 mr-2" />
                            Export Report
                        </Button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Spinner />
                    </div>
                ) : (
                    <>
                        {/* Key Metrics Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                            <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-gradient-to-br from-blue-50 to-cyan-50">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-gray-600">Total Sales</p>
                                            <p className="text-2xl font-bold text-gray-900">{formatCurrency(reportData.sales.total)}</p>
                                            <div className="flex items-center space-x-2">
                                                <TrendingUp className="w-4 h-4 text-green-500" />
                                                <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                                    +{reportData.sales.growth}%
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-blue-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                            <DollarSign className="h-8 w-8 text-blue-600" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-gradient-to-br from-green-50 to-emerald-50">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                            <p className="text-2xl font-bold text-gray-900">{reportData.orders.total.toLocaleString()}</p>
                                            <div className="flex items-center space-x-2">
                                                <Activity className="w-4 h-4 text-blue-500" />
                                                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                                                    {reportData.orders.completed} completed
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-green-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                            <ShoppingCart className="h-8 w-8 text-green-600" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-gradient-to-br from-purple-50 to-violet-50">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-gray-600">New Customers</p>
                                            <p className="text-2xl font-bold text-gray-900">{reportData.customers.new}</p>
                                            <div className="flex items-center space-x-2">
                                                <Users className="w-4 h-4 text-purple-500" />
                                                <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                                                    {reportData.customers.returning} returning
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-purple-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                            <Users className="h-8 w-8 text-purple-600" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-gradient-to-br from-orange-50 to-amber-50">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                                            <p className="text-2xl font-bold text-gray-900">{formatCurrency(reportData.orders.averageValue)}</p>
                                            <div className="flex items-center space-x-2">
                                                <Target className="w-4 h-4 text-orange-500" />
                                                <span className="text-sm font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                                                    Per order
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-orange-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                            <BarChart3 className="h-8 w-8 text-orange-600" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sales Trend Chart */}
                        <Card className="shadow-md border-0 bg-white/80">
                            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                                <CardTitle className="text-xl font-bold text-gray-800">Sales Trend</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {reportData.sales.byPeriod.map((period, index) => (
                                        <div key={period.period} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                                                    {period.period}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{formatCurrency(period.amount)}</p>
                                                    <p className="text-sm text-gray-600">{period.orders} orders</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className={`flex items-center ${getGrowthColor(index > 0 ? ((period.amount - reportData.sales.byPeriod[index - 1].amount) / reportData.sales.byPeriod[index - 1].amount * 100) : 0)}`}>
                                                    {React.createElement(getGrowthIcon(index > 0 ? ((period.amount - reportData.sales.byPeriod[index - 1].amount) / reportData.sales.byPeriod[index - 1].amount * 100) : 0), { className: "w-4 h-4 mr-1" })}
                                                    <span className="text-sm font-semibold">
                                                        {index > 0 ? Math.abs(((period.amount - reportData.sales.byPeriod[index - 1].amount) / reportData.sales.byPeriod[index - 1].amount * 100)).toFixed(1) : 0}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Top Selling Products */}
                            <Card className="shadow-md border-0 bg-white/80">
                                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                                    <CardTitle className="text-xl font-bold text-gray-800">Top Selling Products</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        {reportData.products.topSelling.map((product, index) => (
                                            <div key={product.name} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                                                        #{index + 1}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{product.name}</p>
                                                        <p className="text-sm text-gray-600">{product.sales} units sold</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-gray-900">{formatCurrency(product.revenue)}</p>
                                                    <div className={`flex items-center text-sm ${getGrowthColor(product.growth)}`}>
                                                        {React.createElement(getGrowthIcon(product.growth), { className: "w-3 h-3 mr-1" })}
                                                        {Math.abs(product.growth)}%
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Low Stock Alerts */}
                            <Card className="shadow-md border-0 bg-white/80">
                                <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50 rounded-t-lg">
                                    <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                        <AlertTriangle className="h-5 w-5 text-red-600" />
                                        Low Stock Alerts
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        {reportData.products.lowStock.map((product) => (
                                            <div key={product.name} className="flex items-center justify-between p-4 rounded-lg bg-red-50 border border-red-200">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                                        <Package className="h-5 w-5 text-red-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{product.name}</p>
                                                        <p className="text-sm text-gray-600">Stock: {product.stock} (Threshold: {product.threshold})</p>
                                                    </div>
                                                </div>
                                                <Button size="sm" variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                                                    Restock
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Top Customers */}
                        <Card className="shadow-md border-0 bg-white/80">
                            <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg">
                                <CardTitle className="text-xl font-bold text-gray-800">Top Customers</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gradient-to-r from-gray-50 to-purple-50">
                                                <th className="text-left p-4 font-medium text-gray-700">Customer</th>
                                                <th className="text-left p-4 font-medium text-gray-700">Email</th>
                                                <th className="text-left p-4 font-medium text-gray-700">Orders</th>
                                                <th className="text-left p-4 font-medium text-gray-700">Total Spent</th>
                                                <th className="text-left p-4 font-medium text-gray-700">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reportData.customers.topSpenders.map((customer, index) => (
                                                <tr key={customer.email} className={`border-b hover:bg-gradient-to-r hover:from-purple-50 hover:to-violet-50 transition-all duration-300 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                                                    <td className="p-4 font-semibold text-gray-900">{customer.name}</td>
                                                    <td className="p-4 text-gray-600">{customer.email}</td>
                                                    <td className="p-4 font-semibold text-gray-900">{customer.orders}</td>
                                                    <td className="p-4 font-bold text-gray-900">{formatCurrency(customer.totalSpent)}</td>
                                                    <td className="p-4">
                                                        <Button variant="ghost" size="sm" className="hover:bg-purple-100 hover:text-purple-600">
                                                            <Eye className="h-4 w-4 mr-2" />
                                                            View Profile
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Order Status Summary */}
                        <Card className="shadow-md border-0 bg-white/80">
                            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg">
                                <CardTitle className="text-xl font-bold text-gray-800">Order Status Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div className="text-center p-4 rounded-lg bg-green-50">
                                        <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold text-green-600">{reportData.orders.completed}</p>
                                        <p className="text-sm text-gray-600">Completed</p>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-yellow-50">
                                        <Activity className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold text-yellow-600">{reportData.orders.pending}</p>
                                        <p className="text-sm text-gray-600">Pending</p>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-blue-50">
                                        <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold text-blue-600">{reportData.orders.total - reportData.orders.completed - reportData.orders.cancelled}</p>
                                        <p className="text-sm text-gray-600">Processing</p>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-red-50">
                                        <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                                        <p className="text-2xl font-bold text-red-600">{reportData.orders.cancelled}</p>
                                        <p className="text-sm text-gray-600">Cancelled</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminReports;
