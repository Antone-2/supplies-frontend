
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Loader2, User, Mail, Lock, CheckCircle, XCircle, LogOut, Camera, Shield, MapPin, ShoppingBag, ChevronRight, Phone, Eye, EyeOff, AlertTriangle } from 'lucide-react';

const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    phone: '',
  });
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');

  // Security form state
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [securityLoading, setSecurityLoading] = useState(false);
  const [securityError, setSecurityError] = useState('');
  const [securitySuccess, setSecuritySuccess] = useState('');

  // Address state
  const [addresses, setAddresses] = useState<any[]>([]);
  const [editingAddress, setEditingAddress] = useState<number | null>(null);
  const [addressForm, setAddressForm] = useState({
    type: 'Home',
    name: '',
    address: '',
    city: '',
    phone: '',
    isDefault: false,
  });
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [addressSuccess, setAddressSuccess] = useState('');
  // ...existing code...

  // Address form handlers
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  const handleEditAddress = (index: number, addr: any) => {
    setEditingAddress(index);
    setAddressForm({
      type: addr.type,
      name: addr.name,
      address: addr.address,
      city: addr.city,
      phone: addr.phone,
      isDefault: addr.isDefault,
    });
    setAddressError('');
    setAddressSuccess('');
  };

  const handleCancelAddressEdit = () => {
    setEditingAddress(null);
    setAddressForm({
      type: '',
      name: '',
      address: '',
      city: '',
      phone: '',
      isDefault: false,
    });
    setAddressError('');
    setAddressSuccess('');
  };

  const handleAddressSubmit = async (e: React.FormEvent, index: number) => {
    e.preventDefault();
    setAddressError('');
    setAddressSuccess('');
    setAddressLoading(true);

    try {
      // Call the API to update the address
      const response = await fetch(`/api/v1/user/addresses/${index}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressForm),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update address');
      }

      // Update local addresses state with the updated address
      const updatedAddresses = [...addresses];
      updatedAddresses[index] = { ...addressForm };
      setAddresses(updatedAddresses);

      setAddressSuccess('Address updated successfully!');
      setEditingAddress(null);
      setAddressForm({
        type: '',
        name: '',
        address: '',
        city: '',
        phone: '',
        isDefault: false,
      });
    } catch (err: any) {
      setAddressError(err.message || 'Failed to update address. Please try again.');
    } finally {
      setAddressLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Required</h3>
              <p className="text-gray-600 mb-6">Please log in to access your profile</p>
              <Button onClick={() => navigate('/auth')} className="w-full h-12 text-base">
                Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const updateData: any = {
        name: form.name,
        email: form.email,
      };
      if (form.password) updateData.password = form.password;
      if (form.phone) updateData.phone = form.phone;
      // Call updateUser and wait for response
      await updateUser(updateData);
      setSuccess('Profile updated successfully!');
      setEditing(false);
      setForm({ ...form, password: '' });
    } catch (err: any) {
      // Try to extract error message from axios error response
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setForm({
      name: user.name,
      email: user.email,
      password: '',
      phone: '',
    });
    setEditing(false);
    setError('');
    setSuccess('');
  };

  // Security form handlers
  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecurityForm({ ...securityForm, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 8) errors.push('At least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
    if (!/\d/.test(password)) errors.push('One number');
    if (!/[!@#$%^&*]/.test(password)) errors.push('One special character');
    return errors;
  };

  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError('');
    setSecuritySuccess('');

    // Validation
    if (!securityForm.currentPassword) {
      setSecurityError('Current password is required');
      return;
    }

    if (!securityForm.newPassword) {
      setSecurityError('New password is required');
      return;
    }

    if (securityForm.newPassword !== securityForm.confirmPassword) {
      setSecurityError('New passwords do not match');
      return;
    }

    const passwordErrors = validatePassword(securityForm.newPassword);
    if (passwordErrors.length > 0) {
      setSecurityError(`Password requirements not met: ${passwordErrors.join(', ')}`);
      return;
    }

    setSecurityLoading(true);

    try {
      // In a real app, this would call the password change API
      // For now, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSecuritySuccess('Password updated successfully!');
      setSecurityForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setShowPasswords({ current: false, new: false, confirm: false });
    } catch (err: any) {
      setSecurityError(err.response?.data?.message || 'Failed to update password. Please try again.');
    } finally {
      setSecurityLoading(false);
    }
  };

  const menuItems = [
    { id: 'personal', icon: User, label: 'Personal Info', description: 'Update your information' },
    { id: 'addresses', icon: MapPin, label: 'Addresses', description: 'Manage delivery addresses' },
    { id: 'orders', icon: ShoppingBag, label: 'Orders', description: 'View your order history' },
    { id: 'security', icon: Shield, label: 'Security', description: 'Password & privacy' },
  ];



  // Remove 2FA and recent login activity sections from activeSection options
  const allowedSections = ['personal', 'addresses', 'orders', 'security'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back to Shop
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                {/* Profile Avatar */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="h-20 w-20 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white mx-auto">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <button className="absolute -bottom-1 -right-1 h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <h3 className="mt-3 font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <div className="mt-2 flex items-center justify-center gap-1">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Active</span>
                  </div>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-2">
                  {menuItems.filter(item => allowedSections.includes(item.id)).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeSection === item.id
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{item.label}</div>
                        <div className="text-xs text-gray-500 truncate">{item.description}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </button>
                  ))}
                </nav>

                {/* Logout Button */}
                <div className="mt-6 pt-6 border-t">
                  <Button
                    onClick={() => {
                      logout();
                      navigate('/auth');
                    }}
                    variant="outline"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">

                {/* Success/Error Messages */}
                {success && (
                  <Alert className="mb-6 border-green-200 bg-green-50">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <AlertDescription className="text-green-800 font-medium">{success}</AlertDescription>
                  </Alert>
                )}
                {error && (
                  <Alert className="mb-6 border-red-200 bg-red-50">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <AlertDescription className="text-red-800">{error}</AlertDescription>
                  </Alert>
                )}




                {/* Personal Info Section */}
                {activeSection === 'personal' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                      <Button
                        onClick={() => setEditing(!editing)}
                        variant={editing ? "outline" : "default"}
                        size="sm"
                      >
                        {editing ? 'Cancel' : 'Edit Profile'}
                      </Button>
                    </div>

                    {editing ? (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                              <User className="h-4 w-4" />
                              Full Name
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              value={form.name}
                              onChange={handleChange}
                              placeholder="Enter your full name"
                              required
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                              <Mail className="h-4 w-4" />
                              Email Address
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={form.email}
                              onChange={handleChange}
                              placeholder="Enter your email"
                              required
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
                              <Phone className="h-4 w-4" />
                              Phone Number
                            </Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={form.phone}
                              onChange={handleChange}
                              placeholder="Enter your phone number"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium">
                              <Lock className="h-4 w-4" />
                              New Password
                            </Label>
                            <Input
                              id="password"
                              name="password"
                              type="password"
                              value={form.password}
                              onChange={handleChange}
                              placeholder="Leave blank to keep current"
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div className="flex gap-3 pt-4">
                          <Button type="submit" disabled={isLoading} className="flex-1 h-11">
                            {isLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                              </>
                            ) : (
                              'Save Changes'
                            )}
                          </Button>
                          <Button type="button" variant="outline" onClick={handleCancel} className="flex-1 h-11">
                            Cancel
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                            <User className="h-4 w-4" />
                            Full Name
                          </Label>
                          <p className="text-gray-900 font-medium">{user.name}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                            <Mail className="h-4 w-4" />
                            Email Address
                          </Label>
                          <p className="text-gray-900 font-medium">{user.email}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                            <Shield className="h-4 w-4" />
                            Account Status
                          </Label>
                          <p className="text-green-700 font-medium">Verified</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Addresses Section */}
                {activeSection === 'addresses' && (
                  <div className="space-y-6">
                    {/* Address Success/Error Messages */}
                    {addressSuccess && (
                      <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <AlertDescription className="text-green-800 font-medium">{addressSuccess}</AlertDescription>
                      </Alert>
                    )}
                    {addressError && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <AlertDescription className="text-red-800">{addressError}</AlertDescription>
                      </Alert>
                    )}

                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Addresses</h3>
                      <Button size="sm">
                        <MapPin className="mr-2 h-4 w-4" />
                        Add New Address
                      </Button>
                    </div>

                    {/* Address Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                      {[
                        {
                          type: 'Home',
                          name: 'John Doe',
                          address: 'Koinange Street, Luthuli Avenue',
                          city: 'Nairobi, 00100',
                          phone: '+254 712 345 678',
                          isDefault: true
                        },
                        {
                          type: 'Work',
                          name: 'John Doe',
                          address: 'Westlands Road, Muthithi Road',
                          city: 'Nairobi, 00800',
                          phone: '+254 723 456 789',
                          isDefault: false
                        },
                        {
                          type: 'Secondary Home',
                          name: 'John Doe',
                          address: 'Mombasa Road, Pipeline',
                          city: 'Nairobi, 00500',
                          phone: '+254 734 567 890',
                          isDefault: false
                        }
                      ].map((addr, index) => (
                        <Card key={index} className="p-4">
                          {editingAddress === index ? (
                            <form onSubmit={(e) => handleAddressSubmit(e, index)} className="space-y-4">
                              <div className="flex items-center gap-2 mb-4">
                                <MapPin className="h-5 w-5 text-gray-400" />
                                <span className="font-medium text-gray-900">Edit {addr.type}</span>
                              </div>

                              <div className="grid grid-cols-1 gap-4">
                                <div>
                                  <Label htmlFor={`addressType-${index}`} className="text-sm font-medium">
                                    Address Type
                                  </Label>
                                  <Input
                                    id={`addressType-${index}`}
                                    name="type"
                                    type="text"
                                    value={addressForm.type}
                                    onChange={handleAddressChange}
                                    placeholder="e.g., Home, Work"
                                    required
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor={`addressName-${index}`} className="text-sm font-medium">
                                    Full Name
                                  </Label>
                                  <Input
                                    id={`addressName-${index}`}
                                    name="name"
                                    type="text"
                                    value={addressForm.name}
                                    onChange={handleAddressChange}
                                    placeholder="Enter full name"
                                    required
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor={`address-${index}`} className="text-sm font-medium">
                                    Address
                                  </Label>
                                  <Input
                                    id={`address-${index}`}
                                    name="address"
                                    type="text"
                                    value={addressForm.address}
                                    onChange={handleAddressChange}
                                    placeholder="Enter street address"
                                    required
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor={`addressCity-${index}`} className="text-sm font-medium">
                                    City & Postal Code
                                  </Label>
                                  <Input
                                    id={`addressCity-${index}`}
                                    name="city"
                                    type="text"
                                    value={addressForm.city}
                                    onChange={handleAddressChange}
                                    placeholder="e.g., Nairobi, 00100"
                                    required
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor={`addressPhone-${index}`} className="text-sm font-medium">
                                    Phone Number
                                  </Label>
                                  <Input
                                    id={`addressPhone-${index}`}
                                    name="phone"
                                    type="tel"
                                    value={addressForm.phone}
                                    onChange={handleAddressChange}
                                    placeholder="Enter phone number"
                                    required
                                    className="mt-1"
                                  />
                                </div>
                              </div>

                              <div className="flex gap-3 pt-4">
                                <Button type="submit" disabled={addressLoading} className="flex-1 h-9">
                                  {addressLoading ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Updating...
                                    </>
                                  ) : (
                                    'Save Changes'
                                  )}
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={handleCancelAddressEdit}
                                  className="flex-1 h-9"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </form>
                          ) : (
                            <>
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-5 w-5 text-gray-400" />
                                  <span className="font-medium text-gray-900">{addr.type}</span>
                                  {addr.isDefault && (
                                    <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full">
                                      Default
                                    </span>
                                  )}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditAddress(index, addr)}
                                >
                                  Edit
                                </Button>
                              </div>
                              <div className="space-y-1 text-sm text-gray-600">
                                <p className="font-medium text-gray-900">{addr.name}</p>
                                <p>{addr.address}</p>
                                <p>{addr.city}</p>
                                <p>{addr.phone}</p>
                              </div>
                            </>
                          )}
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Orders Section */}
                {activeSection === 'orders' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Order History</h3>
                      <Button size="sm" variant="outline">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        View All Orders
                      </Button>
                    </div>

                    {/* Order Cards */}
                    <div className="space-y-4">
                      {[
                        {
                          id: 'ORD-2024-001',
                          date: '2024-01-15',
                          status: 'Delivered',
                          total: 1250.00,
                          items: [
                            { name: 'Wireless Headphones', quantity: 1, price: 850.00 },
                            { name: 'Phone Case', quantity: 2, price: 200.00 }
                          ]
                        },
                        {
                          id: 'ORD-2024-002',
                          date: '2024-01-10',
                          status: 'In Transit',
                          total: 450.00,
                          items: [
                            { name: 'Smart Watch', quantity: 1, price: 450.00 }
                          ]
                        },
                        {
                          id: 'ORD-2024-003',
                          date: '2024-01-05',
                          status: 'Processing',
                          total: 320.00,
                          items: [
                            { name: 'Laptop Stand', quantity: 1, price: 320.00 }
                          ]
                        }
                      ].map((order) => (
                        <Card key={order.id} className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold text-gray-900">Order #{order.id}</h4>
                                <span className={`px-3 py-1 text-xs rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                  order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">Ordered on {new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">KSh {order.total.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <ShoppingBag className="h-5 w-5 text-gray-400" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">{item.name}</p>
                                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                  </div>
                                </div>
                                <p className="font-medium text-gray-900">KSh {item.price.toLocaleString()}</p>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-3 mt-4 pt-4 border-t">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              Track Order
                            </Button>
                            {order.status === 'Delivered' && (
                              <Button variant="outline" size="sm">
                                Write Review
                              </Button>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>

                    {/* Empty State */}
                    {false && (
                      <div className="text-center py-12">
                        <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                        <p className="text-gray-600 mb-6">When you place your first order, it will appear here.</p>
                        <Button>
                          Start Shopping
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Security Section */}
                {activeSection === 'security' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>

                    {/* Security Success/Error Messages */}
                    {securitySuccess && (
                      <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <AlertDescription className="text-green-800 font-medium">{securitySuccess}</AlertDescription>
                      </Alert>
                    )}
                    {securityError && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <AlertDescription className="text-red-800">{securityError}</AlertDescription>
                      </Alert>
                    )}

                    {/* Password Change */}
                    <Card className="p-6">
                      <h4 className="font-medium text-gray-900 mb-4">Change Password</h4>
                      <form onSubmit={handleSecuritySubmit} className="space-y-4">
                        {/* Current Password */}
                        <div className="relative">
                          <Label htmlFor="currentPassword" className="flex items-center gap-2 text-sm font-medium">
                            <Lock className="h-4 w-4" />
                            Current Password
                          </Label>
                          <div className="relative mt-1">
                            <Input
                              id="currentPassword"
                              name="currentPassword"
                              type={showPasswords.current ? "text" : "password"}
                              value={securityForm.currentPassword}
                              onChange={handleSecurityChange}
                              placeholder="Enter your current password"
                              required
                              className="pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility('current')}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showPasswords.current ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* New Password */}
                        <div className="relative">
                          <Label htmlFor="newPassword" className="flex items-center gap-2 text-sm font-medium">
                            <Lock className="h-4 w-4" />
                            New Password
                          </Label>
                          <div className="relative mt-1">
                            <Input
                              id="newPassword"
                              name="newPassword"
                              type={showPasswords.new ? "text" : "password"}
                              value={securityForm.newPassword}
                              onChange={handleSecurityChange}
                              placeholder="Enter your new password"
                              required
                              className="pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility('new')}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showPasswords.new ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                          <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-sm font-medium">
                            <Lock className="h-4 w-4" />
                            Confirm New Password
                          </Label>
                          <div className="relative mt-1">
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type={showPasswords.confirm ? "text" : "password"}
                              value={securityForm.confirmPassword}
                              onChange={handleSecurityChange}
                              placeholder="Confirm your new password"
                              required
                              className="pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility('confirm')}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showPasswords.confirm ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Password Requirements */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="text-sm font-medium text-gray-900 mb-2">Password Requirements:</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li className={`flex items-center gap-2 ${securityForm.newPassword.length >= 8 ? 'text-green-600' : ''}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${securityForm.newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              At least 8 characters
                            </li>
                            <li className={`flex items-center gap-2 ${/[A-Z]/.test(securityForm.newPassword) ? 'text-green-600' : ''}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(securityForm.newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              One uppercase letter
                            </li>
                            <li className={`flex items-center gap-2 ${/[a-z]/.test(securityForm.newPassword) ? 'text-green-600' : ''}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${/[a-z]/.test(securityForm.newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              One lowercase letter
                            </li>
                            <li className={`flex items-center gap-2 ${/\d/.test(securityForm.newPassword) ? 'text-green-600' : ''}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${/\d/.test(securityForm.newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              One number
                            </li>
                            <li className={`flex items-center gap-2 ${/[!@#$%^&*]/.test(securityForm.newPassword) ? 'text-green-600' : ''}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${/[!@#$%^&*]/.test(securityForm.newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              One special character (!@#$%^&*)
                            </li>
                          </ul>
                        </div>

                        <Button type="submit" disabled={securityLoading} className="w-full h-11">
                          {securityLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Updating Password...
                            </>
                          ) : (
                            'Update Password'
                          )}
                        </Button>
                      </form>
                    </Card>

                    {/* Account Security Info */}
                    <Card className="p-6">
                      <h4 className="font-medium text-gray-900 mb-4">Account Security</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Shield className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="font-medium text-gray-900">Account Status</p>
                              <p className="text-sm text-gray-600">Your account is verified and secure</p>
                            </div>
                          </div>
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-medium text-gray-900">Email Verification</p>
                              <p className="text-sm text-gray-600">Your email address is verified</p>
                            </div>
                          </div>
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                    </Card>
                  </div>
                )}

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
