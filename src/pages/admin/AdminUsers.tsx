import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import Spinner from '../../components/Spinner';
import {
    Users,
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    UserCheck,
    UserX,
    Mail,
    Phone,
    Calendar,
    Shield,
    ShieldCheck,
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

interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: 'admin' | 'user' | 'manager';
    status: 'active' | 'inactive' | 'suspended';
    joinDate: string;
    lastLogin: string;
    ordersCount: number;
    totalSpent: number;
    avatar?: string;
}

const AdminUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/admin/users');
                const data = await response.json();
                setUsers(data.users || []);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800 border-green-200';
            case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'manager': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'user': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'admin': return <ShieldCheck className="h-4 w-4" />;
            case 'manager': return <Shield className="h-4 w-4" />;
            case 'user': return <UserCheck className="h-4 w-4" />;
            default: return <UserCheck className="h-4 w-4" />;
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone.includes(searchTerm);
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
    });

    const stats = {
        totalUsers: users.length,
        activeUsers: users.filter(u => u.status === 'active').length,
        adminUsers: users.filter(u => u.role === 'admin').length,
        totalRevenue: users.reduce((sum, u) => sum + u.totalSpent, 0)
    };

    return (
        <AdminLayout activeSection="users" title="User Management">
            <div className="flex-1 p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-tight leading-tight font-['Roboto']">
                            👥 User Management
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-600 mt-2 font-medium tracking-wide font-['Roboto']">Manage user accounts and permissions</p>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-2 text-sm font-semibold">
                        <Plus className="h-3 w-3 mr-2" />
                        Add User
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                    <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-gradient-to-br from-blue-50 to-cyan-50">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-gray-600">Total Users</p>
                                    <p className="text-lg font-bold text-gray-900">{stats.totalUsers}</p>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-1 py-0.5 rounded-full">All Users</span>
                                    </div>
                                </div>
                                <div className="p-2 bg-blue-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                    <Users className="h-5 w-5 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-gradient-to-br from-green-50 to-emerald-50">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-gray-600">Active Users</p>
                                    <p className="text-lg font-bold text-gray-900">{stats.activeUsers}</p>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                                        <span className="text-xs font-medium text-green-600 bg-green-100 px-1 py-0.5 rounded-full">Online</span>
                                    </div>
                                </div>
                                <div className="p-2 bg-green-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                    <UserCheck className="h-5 w-5 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-gradient-to-br from-purple-50 to-violet-50">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-gray-600">Admin Users</p>
                                    <p className="text-lg font-bold text-gray-900">{stats.adminUsers}</p>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                                        <span className="text-xs font-medium text-purple-600 bg-purple-100 px-1 py-0.5 rounded-full">Staff</span>
                                    </div>
                                </div>
                                <div className="p-2 bg-purple-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                    <Shield className="h-5 w-5 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-gradient-to-br from-orange-50 to-amber-50">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-gray-600">Total Revenue</p>
                                    <p className="text-lg font-bold text-gray-900">KSh {stats.totalRevenue.toLocaleString()}</p>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                                        <span className="text-xs font-medium text-orange-600 bg-orange-100 px-1 py-0.5 rounded-full">Generated</span>
                                    </div>
                                </div>
                                <div className="p-2 bg-orange-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                    <Mail className="h-5 w-5 text-orange-600" />
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
                                        placeholder="Search users..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-8 py-2 text-sm border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-lg"
                                    />
                                </div>
                            </div>

                            <Select value={roleFilter} onValueChange={setRoleFilter}>
                                <SelectTrigger className="w-32 py-2 text-sm border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-lg">
                                    <SelectValue placeholder="Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Roles</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="manager">Manager</SelectItem>
                                    <SelectItem value="user">User</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-32 py-2 text-sm border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-lg">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                    <SelectItem value="suspended">Suspended</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Users Table */}
                <Card className="shadow-md border-0 bg-white/80">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                        <CardTitle className="text-lg font-bold text-gray-800">Users ({filteredUsers.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-gray-50 to-blue-50">
                                        <th className="text-left p-3 font-medium text-gray-700 text-sm">User</th>
                                        <th className="text-left p-3 font-medium text-gray-700 text-sm">Contact</th>
                                        <th className="text-left p-3 font-medium text-gray-700 text-sm">Role</th>
                                        <th className="text-left p-3 font-medium text-gray-700 text-sm">Status</th>
                                        <th className="text-left p-3 font-medium text-gray-700 text-sm">Orders</th>
                                        <th className="text-left p-3 font-medium text-gray-700 text-sm">Spent</th>
                                        <th className="text-left p-3 font-medium text-gray-700 text-sm">Last Login</th>
                                        <th className="text-left p-3 font-medium text-gray-700 text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user, index) => (
                                        <tr key={user._id} className={`border-b hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                                            <td className="p-3">
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                                                    <p className="text-xs text-gray-600 font-mono bg-gray-100 px-1 py-0.5 rounded inline-block mt-0.5">ID: {user._id}</p>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <div className="space-y-0.5">
                                                    <div className="flex items-center text-xs text-gray-600">
                                                        <Mail className="h-3 w-3 mr-1" />
                                                        {user.email}
                                                    </div>
                                                    <div className="flex items-center text-xs text-gray-600">
                                                        <Phone className="h-3 w-3 mr-1" />
                                                        {user.phone}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <Badge className={`${getRoleColor(user.role)} px-1 py-0.5 text-xs border flex items-center w-fit`}>
                                                    {getRoleIcon(user.role)}
                                                    <span className="ml-1">{user.role}</span>
                                                </Badge>
                                            </td>
                                            <td className="p-3">
                                                <Badge className={`${getStatusColor(user.status)} px-1 py-0.5 text-xs border`}>
                                                    {user.status}
                                                </Badge>
                                            </td>
                                            <td className="p-3 font-semibold text-gray-900 text-sm">{user.ordersCount}</td>
                                            <td className="p-3 font-semibold text-gray-900 text-sm">KSh {user.totalSpent.toLocaleString()}</td>
                                            <td className="p-3 text-xs text-gray-600">{user.lastLogin}</td>
                                            <td className="p-3">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="hover:bg-blue-100 hover:text-blue-600 p-1">
                                                            <MoreHorizontal className="h-3 w-3" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="bg-white shadow-lg border-0">
                                                        <DropdownMenuItem onClick={() => setSelectedUser(user)} className="hover:bg-blue-50 hover:text-blue-600 text-xs py-1">
                                                            <Eye className="h-3 w-3 mr-1" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="hover:bg-green-50 hover:text-green-600 text-xs py-1">
                                                            <Edit className="h-3 w-3 mr-1" />
                                                            Edit User
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600 hover:bg-red-50 text-xs py-1">
                                                            <Trash2 className="h-3 w-3 mr-1" />
                                                            Delete User
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

                {/* User Details Modal */}
                {selectedUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
                        <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">User Details</h2>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setSelectedUser(null)}
                                        className="hover:bg-gray-100 text-gray-600 hover:text-gray-800 p-1"
                                    >
                                        ✕
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="space-y-1">
                                            <label className="block text-xs font-medium text-gray-700">Full Name</label>
                                            <p className="text-sm text-gray-900 font-semibold">{selectedUser.name}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-xs font-medium text-gray-700">User ID</label>
                                            <p className="text-sm text-gray-900 font-mono bg-gray-100 px-1 py-0.5 rounded">{selectedUser._id}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-xs font-medium text-gray-700">Email</label>
                                            <p className="text-sm text-gray-900">{selectedUser.email}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-xs font-medium text-gray-700">Phone</label>
                                            <p className="text-sm text-gray-900">{selectedUser.phone}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-xs font-medium text-gray-700">Role</label>
                                            <Badge className={`${getRoleColor(selectedUser.role)} px-1 py-0.5 text-xs border flex items-center w-fit`}>
                                                {getRoleIcon(selectedUser.role)}
                                                <span className="ml-1">{selectedUser.role}</span>
                                            </Badge>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-xs font-medium text-gray-700">Status</label>
                                            <Badge className={`${getStatusColor(selectedUser.status)} px-1 py-0.5 text-xs border`}>
                                                {selectedUser.status}
                                            </Badge>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-xs font-medium text-gray-700">Join Date</label>
                                            <p className="text-sm text-gray-900">{selectedUser.joinDate}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-xs font-medium text-gray-700">Last Login</label>
                                            <p className="text-sm text-gray-900">{selectedUser.lastLogin}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-xs font-medium text-gray-700">Total Orders</label>
                                            <p className="text-sm text-gray-900 font-semibold">{selectedUser.ordersCount}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-xs font-medium text-gray-700">Total Spent</label>
                                            <p className="text-sm text-gray-900 font-bold">KSh {selectedUser.totalSpent.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-2 mt-4 pt-3 border-t border-gray-200">
                                    <Button variant="outline" onClick={() => setSelectedUser(null)} className="px-4 py-1 text-xs hover:bg-gray-50">
                                        Close
                                    </Button>
                                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-1 text-xs shadow-lg hover:shadow-xl">
                                        Edit User
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

export default AdminUsers;
