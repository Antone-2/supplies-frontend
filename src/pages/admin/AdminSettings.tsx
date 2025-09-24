import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Switch } from '../../components/ui/switch';
import {
    Settings,
    Save,
    RefreshCw,
    Shield,
    Bell,
    Mail,
    Globe,
    Database,
    Key,
    Palette,
    CreditCard,
    Truck,
    Users,
    Package,
    AlertTriangle,
    CheckCircle,
    Info
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/select';
import Spinner from '../../components/Spinner';

interface Setting {
    id: string;
    category: string;
    name: string;
    description: string;
    value: any;
    type: 'text' | 'number' | 'boolean' | 'select' | 'email';
    options?: string[];
}

const AdminSettings = () => {
    const [settings, setSettings] = useState<Setting[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeCategory, setActiveCategory] = useState('general');

    // Mock settings data
    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/admin/settings');
                const data = await response.json();
                setSettings(data.settings || []);
            } catch (error) {
                console.error('Failed to fetch settings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);
            {
                id: 'email_notifications',
                category: 'notifications',
                name: 'Email Notifications',
                description: 'Enable email notifications for orders',
                value: true,
                type: 'boolean'
            },
            {
                id: 'sms_notifications',
                category: 'notifications',
                name: 'SMS Notifications',
                description: 'Enable SMS notifications for urgent orders',
                value: false,
                type: 'boolean'
            },
            {
                id: 'low_stock_alert',
                category: 'notifications',
                name: 'Low Stock Alerts',
                description: 'Alert when products are low in stock',
        ];

        setTimeout(() => {
        // No mockSettings, only fetch from API
    }, []);

    const handleSettingChange = (id: string, value: any) => {
        setSettings(prev => prev.map(setting =>
            setting.id === id ? { ...setting, value } : setting
        ));
    };

    const handleSave = async () => {
        setSaving(true);
        // Simulate API call
        setTimeout(() => {
            setSaving(false);
            // Show success message
            alert('Settings saved successfully!');
        }, 1500);
    };

    const categories = [
        { id: 'general', name: 'General', icon: Settings, description: 'Basic store configuration' },
        { id: 'business', name: 'Business', icon: Package, description: 'Business rules and policies' },
        { id: 'shipping', name: 'Shipping', icon: Truck, description: 'Shipping and delivery settings' },
        { id: 'notifications', name: 'Notifications', icon: Bell, description: 'Notification preferences' },
        { id: 'security', name: 'Security', icon: Shield, description: 'Security and access control' }
    ];

    const filteredSettings = settings.filter(setting => setting.category === activeCategory);

    return (
        <AdminLayout activeSection="settings" title="Settings">
            {loading ? (
                <div className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-gray-600 mt-4">Loading settings...</p>
                    </div>
                </div>
            ) : (
                <div className="flex-1 p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-tight leading-tight font-['Roboto']">
                                ⚙️ Settings
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-600 mt-2 font-medium tracking-wide font-['Roboto']">Configure your store settings and preferences</p>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <Button variant="outline" size="sm" className="flex items-center gap-2 text-sm">
                                <RefreshCw className="h-3 w-3" />
                                Reset
                            </Button>
                            <Button
                                onClick={handleSave}
                                disabled={saving}
                                size="sm"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-2 text-sm font-semibold"
                            >
                                {saving ? (
                                    <>
                                        <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-3 w-3 mr-1" />
                                        Save
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        {/* Categories Sidebar */}
                        <Card className="lg:col-span-1 shadow-md border-0 bg-white/80">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-bold text-gray-800">Categories</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-1">
                                {categories.map((category) => {
                                    const Icon = category.icon;
                                    const isActive = activeCategory === category.id;
                                    return (
                                        <button
                                            key={category.id}
                                            onClick={() => setActiveCategory(category.id)}
                                            className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition-all duration-200 ${isActive
                                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                                                : 'hover:bg-gray-50 text-gray-700'
                                                }`}
                                        >
                                            <Icon className="h-4 w-4" />
                                            <div>
                                                <p className="font-semibold text-sm">{category.name}</p>
                                                <p className="text-xs opacity-75">{category.description}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </CardContent>
                        </Card>

                        {/* Settings Content */}
                        <div className="lg:col-span-3 space-y-4">
                            <Card className="shadow-md border-0 bg-white/80">
                                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                                    <CardTitle className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                        {React.createElement(categories.find(c => c.id === activeCategory)?.icon || Settings, { className: "h-4 w-4" })}
                                        {categories.find(c => c.id === activeCategory)?.name} Settings
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 space-y-4">
                                    {filteredSettings.map((setting) => (
                                        <div key={setting.id} className="space-y-2">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                        {setting.name}
                                                    </label>
                                                    <p className="text-xs text-gray-600">{setting.description}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {setting.type === 'text' && (
                                                    <Input
                                                        value={setting.value}
                                                        onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                                                        className="flex-1 h-8 text-sm"
                                                        placeholder={`Enter ${setting.name.toLowerCase()}`}
                                                    />
                                                )}

                                                {setting.type === 'email' && (
                                                    <Input
                                                        type="email"
                                                        value={setting.value}
                                                        onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                                                        className="flex-1 h-8 text-sm"
                                                        placeholder={`Enter ${setting.name.toLowerCase()}`}
                                                    />
                                                )}

                                                {setting.type === 'number' && (
                                                    <Input
                                                        type="number"
                                                        value={setting.value}
                                                        onChange={(e) => handleSettingChange(setting.id, parseInt(e.target.value))}
                                                        className="flex-1 h-8 text-sm"
                                                        placeholder={`Enter ${setting.name.toLowerCase()}`}
                                                    />
                                                )}

                                                {setting.type === 'boolean' && (
                                                    <Switch
                                                        checked={setting.value}
                                                        onCheckedChange={(checked) => handleSettingChange(setting.id, checked)}
                                                    />
                                                )}

                                                {setting.type === 'select' && (
                                                    <Select
                                                        value={setting.value}
                                                        onValueChange={(value) => handleSettingChange(setting.id, value)}
                                                    >
                                                        <SelectTrigger className="flex-1 h-8 text-sm">
                                                            <SelectValue placeholder={`Select ${setting.name.toLowerCase()}`} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {setting.options?.map((option) => (
                                                                <SelectItem key={option} value={option}>
                                                                    {option}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Quick Actions */}
                            <Card className="shadow-md border-0 bg-gradient-to-r from-blue-50 to-purple-50">
                                <CardHeader>
                                    <CardTitle className="text-sm font-bold text-gray-800">Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="p-3">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        <Button variant="outline" className="h-12 flex flex-col gap-1 text-xs border-blue-200 text-blue-700 hover:bg-blue-50">
                                            <Database className="h-4 w-4" />
                                            Backup Data
                                        </Button>
                                        <Button variant="outline" className="h-12 flex flex-col gap-1 text-xs border-green-200 text-green-700 hover:bg-green-50">
                                            <RefreshCw className="h-4 w-4" />
                                            Clear Cache
                                        </Button>
                                        <Button variant="outline" className="h-12 flex flex-col gap-1 text-xs border-purple-200 text-purple-700 hover:bg-purple-50">
                                            <Key className="h-4 w-4" />
                                            API Keys
                                        </Button>
                                        <Button variant="outline" className="h-12 flex flex-col gap-1 text-xs border-orange-200 text-orange-700 hover:bg-orange-50">
                                            <Globe className="h-4 w-4" />
                                            SEO Settings
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminSettings;
