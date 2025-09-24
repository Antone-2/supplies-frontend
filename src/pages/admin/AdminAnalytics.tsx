import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    Area,
    AreaChart
} from 'recharts';
import {
    TrendingUp,
    TrendingDown,
    Users,
    ShoppingCart,
    DollarSign,
    Package,
    Download,
    Calendar,
    Filter
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/select';

const AdminAnalytics = () => {
    const [dateRange, setDateRange] = useState('30');
    const [loading, setLoading] = useState(true);

    // Mock data - replace with actual API calls
    const revenueData = [
        { month: 'Jan', revenue: 45000, orders: 120, users: 89 },
        { month: 'Feb', revenue: 52000, orders: 135, users: 95 },
        { month: 'Mar', revenue: 48000, orders: 128, users: 102 },
        { month: 'Apr', revenue: 61000, orders: 156, users: 118 },
        { month: 'May', revenue: 55000, orders: 142, users: 125 },
        { month: 'Jun', revenue: 67000, orders: 168, users: 134 },
    ];

    const categoryData = [
        { name: 'Medical Equipment', value: 35, color: '#3b82f6' },
        { name: 'Supplies', value: 28, color: '#10b981' },
        { name: 'Medications', value: 20, color: '#f59e0b' },
        { name: 'Personal Care', value: 17, color: '#ef4444' },
    ];

    const dailySalesData = [
        { day: 'Mon', sales: 1200 },
        { day: 'Tue', sales: 1800 },
        { day: 'Wed', sales: 1600 },
        { day: 'Thu', sales: 2100 },
        { day: 'Fri', sales: 2400 },
        { day: 'Sat', sales: 1900 },
        { day: 'Sun', sales: 1400 },
    ];

    const topProducts = [
        { name: 'Surgical Masks', sales: 1250, revenue: 18750 },
        { name: 'Hand Sanitizer', sales: 980, revenue: 14700 },
        { name: 'Digital Thermometer', sales: 756, revenue: 22680 },
        { name: 'Blood Pressure Monitor', sales: 543, revenue: 27150 },
        { name: 'First Aid Kit', sales: 432, revenue: 12960 },
    ];

    const stats = {
        totalRevenue: 45000000, // Ksh 45M
        totalOrders: 1049,
        totalUsers: 663,
        averageOrderValue: 42900, // Ksh 42,900
        conversionRate: 3.2,
        growthRate: 12.5
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const exportReport = () => {
        // Mock export functionality
        console.log('Exporting analytics report...');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center">Loading analytics...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-tight leading-tight font-['Roboto']">
                            Analytics Dashboard
                        </h1>
                        <p className="text-lg text-gray-600 mt-3 font-medium tracking-wide font-['Roboto']">Comprehensive business insights and metrics</p>
                    </div>
                    <div className="flex gap-3">
                        <Select value={dateRange} onValueChange={setDateRange}>
                            <SelectTrigger className="w-48">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7">Last 7 days</SelectItem>
                                <SelectItem value="30">Last 30 days</SelectItem>
                                <SelectItem value="90">Last 3 months</SelectItem>
                                <SelectItem value="365">Last year</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button onClick={exportReport} variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Export Report
                        </Button>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between">
                                <div className="space-y-3">
                                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Total Revenue</p>
                                    <p className="text-4xl font-black text-gray-900 tracking-tight">Ksh {stats.totalRevenue.toLocaleString()}</p>
                                    <div className="flex items-center space-x-2">
                                        <TrendingUp className="h-5 w-5 text-green-500" />
                                        <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">+{stats.growthRate}% from last month</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-green-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                    <DollarSign className="h-10 w-10 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between">
                                <div className="space-y-3">
                                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Total Orders</p>
                                    <p className="text-4xl font-black text-gray-900 tracking-tight">{stats.totalOrders.toLocaleString()}</p>
                                    <div className="flex items-center space-x-2">
                                        <TrendingUp className="h-5 w-5 text-green-500" />
                                        <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">+8.2% from last month</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-blue-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                    <ShoppingCart className="h-10 w-10 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-50">
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between">
                                <div className="space-y-3">
                                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Total Users</p>
                                    <p className="text-4xl font-black text-gray-900 tracking-tight">{stats.totalUsers.toLocaleString()}</p>
                                    <div className="flex items-center space-x-2">
                                        <TrendingUp className="h-5 w-5 text-green-500" />
                                        <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">+15.3% from last month</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-purple-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                    <Users className="h-10 w-10 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50">
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between">
                                <div className="space-y-3">
                                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Avg Order Value</p>
                                    <p className="text-4xl font-black text-gray-900 tracking-tight">Ksh {stats.averageOrderValue.toLocaleString()}</p>
                                    <div className="flex items-center space-x-2">
                                        <TrendingDown className="h-5 w-5 text-red-500" />
                                        <span className="text-sm font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">-2.1% from last month</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-orange-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                    <Package className="h-10 w-10 text-orange-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                📈 Revenue Trend
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={320}>
                                <AreaChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="month" fontSize={12} fontWeight={500} />
                                    <YAxis fontSize={12} fontWeight={500} />
                                    <Tooltip
                                        formatter={(value) => [`Ksh ${value.toLocaleString()}`, 'Revenue']}
                                        contentStyle={{
                                            backgroundColor: '#1f2937',
                                            border: 'none',
                                            borderRadius: '12px',
                                            color: 'white',
                                            fontSize: '14px',
                                            fontWeight: '600'
                                        }}
                                    />
                                    <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-emerald-50">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                🥧 Sales by Category
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={320}>
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={90}
                                        fill="#8884d8"
                                        dataKey="value"
                                        strokeWidth={2}
                                        stroke="#ffffff"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1f2937',
                                            border: 'none',
                                            borderRadius: '12px',
                                            color: 'white',
                                            fontSize: '14px',
                                            fontWeight: '600'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-green-50">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                📊 Daily Sales This Week
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={320}>
                                <BarChart data={dailySalesData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="day" fontSize={12} fontWeight={500} />
                                    <YAxis fontSize={12} fontWeight={500} />
                                    <Tooltip
                                        formatter={(value) => [`Ksh ${value.toLocaleString()}`, 'Sales']}
                                        contentStyle={{
                                            backgroundColor: '#1f2937',
                                            border: 'none',
                                            borderRadius: '12px',
                                            color: 'white',
                                            fontSize: '14px',
                                            fontWeight: '600'
                                        }}
                                    />
                                    <Bar dataKey="sales" fill="#10b981" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-indigo-50">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                📈 Orders & Users Growth
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={320}>
                                <LineChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="month" fontSize={12} fontWeight={500} />
                                    <YAxis yAxisId="left" fontSize={12} fontWeight={500} />
                                    <YAxis yAxisId="right" orientation="right" fontSize={12} fontWeight={500} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1f2937',
                                            border: 'none',
                                            borderRadius: '12px',
                                            color: 'white',
                                            fontSize: '14px',
                                            fontWeight: '600'
                                        }}
                                    />
                                    <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={4} name="Orders" dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }} />
                                    <Line yAxisId="right" type="monotone" dataKey="users" stroke="#10b981" strokeWidth={4} name="Users" dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Top Products Table */}
                <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
                    <CardHeader className="pb-6">
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                            🏆 Top Performing Products
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-gray-200">
                                        <th className="text-left p-6 font-bold text-gray-700 uppercase tracking-wider text-sm">Product</th>
                                        <th className="text-left p-6 font-bold text-gray-700 uppercase tracking-wider text-sm">Units Sold</th>
                                        <th className="text-left p-6 font-bold text-gray-700 uppercase tracking-wider text-sm">Revenue</th>
                                        <th className="text-left p-6 font-bold text-gray-700 uppercase tracking-wider text-sm">Performance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topProducts.map((product, index) => (
                                        <tr key={index} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group">
                                            <td className="p-6 font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                                                {product.name}
                                            </td>
                                            <td className="p-6 font-bold text-gray-800 text-lg">
                                                {product.sales.toLocaleString()}
                                            </td>
                                            <td className="p-6 font-black text-gray-900 text-lg">
                                                Ksh {product.revenue.toLocaleString()}
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-20 bg-gray-200 rounded-full h-3 mr-2 shadow-inner">
                                                        <div
                                                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full shadow-sm transition-all duration-300"
                                                            style={{ width: `${Math.min((product.revenue / 30000) * 100, 100)}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                                                        {Math.round((product.revenue / 30000) * 100)}%
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminAnalytics;
