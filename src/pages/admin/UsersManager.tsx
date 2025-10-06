import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, User, Search, Filter, UserCheck, UserX, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/context/AdminAuthContext';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin' | 'super_admin';
    active: boolean;
    createdAt: string;
    lastLogin?: string;
    orders?: number;
    totalSpent?: number;
    phone?: string;
    verified?: boolean;
}

interface FormData {
    name: string;
    email: string;
    role: 'user' | 'admin' | 'super_admin';
    active: boolean;
    phone?: string;
    password?: string;
}

const UsersManager = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editUser, setEditUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<Partial<FormData>>({});
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');
    const { toast } = useToast();
    const { hasPermission } = useAdminAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="mt-4 text-medical-body">Loading users...</p>
                </div>
            </div>
        );
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const token = localStorage.getItem('adminAuthToken');
                const response = await fetch(`${apiUrl}/admin/users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) throw new Error('Failed to fetch users');
                const data = await response.json();
                setUsers(data.users || data || []);
            } catch (error) {
                toast({ title: 'Error', description: 'Failed to load users', variant: 'destructive' });
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [toast]);

    const handleAddUser = async (newUser: Partial<FormData>) => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const token = localStorage.getItem('adminAuthToken');
            const response = await fetch(`${apiUrl}/admin/users`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newUser)
            });
            if (!response.ok) throw new Error('Failed to add user');
            const data = await response.json();
            setUsers(prev => [...prev, data.user]);
            toast({ title: 'User Added', description: 'User successfully created.' });
            setShowAddModal(false);
            setFormData({});
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to add user', variant: 'destructive' });
        }
    };

    const handleEditUser = async (userId: string, updates: Partial<FormData>) => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const token = localStorage.getItem('adminAuthToken');
            const response = await fetch(`${apiUrl}/admin/users/${userId}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            });
            if (!response.ok) throw new Error('Failed to update user');
            const data = await response.json();
            setUsers(prev => prev.map(u => u.id === userId ? data.user : u));
            toast({ title: 'User Updated', description: 'User successfully updated.' });
            setShowEditModal(false);
            setEditUser(null);
            setFormData({});
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to update user', variant: 'destructive' });
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            return;
        }
        
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const token = localStorage.getItem('adminAuthToken');
            const response = await fetch(`${apiUrl}/admin/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to delete user');
            setUsers(prev => prev.filter(u => u.id !== userId));
            toast({ title: 'User Deleted', description: 'User successfully deleted.', variant: 'destructive' });
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to delete user', variant: 'destructive' });
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = !roleFilter || user.role === roleFilter;
        const matchesStatus = !statusFilter || 
                             (statusFilter === 'active' && user.active) ||
                             (statusFilter === 'inactive' && !user.active);
        
        return matchesSearch && matchesRole && matchesStatus;
    });

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'super_admin':
                return <Badge className="bg-purple-100 text-purple-800 border-purple-200"><Crown className="h-3 w-3 mr-1" />Super Admin</Badge>;
            case 'admin':
                return <Badge className="bg-blue-100 text-blue-800 border-blue-200"><UserCheck className="h-3 w-3 mr-1" />Admin</Badge>;
            default:
                return <Badge variant="secondary"><User className="h-3 w-3 mr-1" />User</Badge>;
        }
    };

    const getStatusBadge = (active: boolean) => {
        return active ? (
            <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
        ) : (
            <Badge className="bg-red-100 text-red-800 border-red-200">Inactive</Badge>
        );
    };

    if (loading) {
        return <div className="text-center py-12 text-lg text-muted-foreground">Loading users...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                        <Users className="h-8 w-8" />
                        Users Management
                    </h1>
                    <p className="text-muted-foreground">Manage your users, customers, and staff</p>
                </div>
                {hasPermission('create_users') && (
                    <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add User
                    </Button>
                )}
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Roles</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="super_admin">Super Admin</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Users List</CardTitle>
                    <CardDescription>{filteredUsers.length} of {users.length} users</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Login</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                                                    <User className="h-4 w-4 text-primary-foreground" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{user.name}</div>
                                                    <div className="text-sm text-muted-foreground">ID: {user.id}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{user.email}</div>
                                                {user.phone && (
                                                    <div className="text-sm text-muted-foreground">{user.phone}</div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                                        <TableCell>{getStatusBadge(user.active)}</TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                {user.lastLogin 
                                                    ? new Date(user.lastLogin).toLocaleDateString() 
                                                    : 'Never'}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                {hasPermission('edit_users') && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setEditUser(user);
                                                            setFormData(user);
                                                            setShowEditModal(true);
                                                        }}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                {hasPermission('delete_users') && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    {filteredUsers.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            No users found matching your filters.
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add User Modal */}
            <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            handleAddUser(formData);
                        }}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter full name"
                                value={formData.name || ''}
                                onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter email address"
                                value={formData.email || ''}
                                onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="+254 700 000 000"
                                value={formData.phone || ''}
                                onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password *</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                value={formData.password || ''}
                                onChange={e => setFormData(f => ({ ...f, password: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role *</Label>
                            <Select 
                                value={formData.role || ''} 
                                onValueChange={(value: 'user' | 'admin' | 'super_admin') => 
                                    setFormData(f => ({ ...f, role: value }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="super_admin">Super Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="active"
                                checked={formData.active || true}
                                onChange={e => setFormData(f => ({ ...f, active: e.target.checked }))}
                                className="rounded border-gray-300"
                            />
                            <Label htmlFor="active">Active User</Label>
                        </div>
                        <div className="flex gap-2 justify-end pt-4">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Add User</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit User Modal */}
            <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            if (editUser) handleEditUser(editUser.id, formData);
                        }}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="edit-name">Full Name *</Label>
                            <Input
                                id="edit-name"
                                type="text"
                                placeholder="Enter full name"
                                value={formData.name || ''}
                                onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-email">Email Address *</Label>
                            <Input
                                id="edit-email"
                                type="email"
                                placeholder="Enter email address"
                                value={formData.email || ''}
                                onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-phone">Phone Number</Label>
                            <Input
                                id="edit-phone"
                                type="tel"
                                placeholder="+254 700 000 000"
                                value={formData.phone || ''}
                                onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-role">Role *</Label>
                            <Select 
                                value={formData.role || ''} 
                                onValueChange={(value: 'user' | 'admin' | 'super_admin') => 
                                    setFormData(f => ({ ...f, role: value }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="super_admin">Super Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="edit-active"
                                checked={formData.active || false}
                                onChange={e => setFormData(f => ({ ...f, active: e.target.checked }))}
                                className="rounded border-gray-300"
                            />
                            <Label htmlFor="edit-active">Active User</Label>
                        </div>
                        <div className="flex gap-2 justify-end pt-4">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save Changes</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UsersManager;
