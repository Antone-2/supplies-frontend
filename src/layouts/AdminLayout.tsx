import { ReactNode, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    LayoutDashboard,
    Users,
    Package,
    ShoppingCart,
    BarChart3,
    Settings,
    LogOut,
    Menu,
    Bell,
    Shield,
    ChevronDown,
    User
} from 'lucide-react';

interface SidebarItem {
    name: string;
    href: string;
    icon: ReactNode;
    permission?: string;
    badge?: string;
}

const sidebarItems: SidebarItem[] = [
    {
        name: 'Dashboard',
        href: '/admin/dashboard',
        icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
        name: 'Users',
        href: '/admin/users',
        icon: <Users className="h-5 w-5" />,
        permission: 'manage_users',
    },
    {
        name: 'Products',
        href: '/admin/products',
        icon: <Package className="h-5 w-5" />,
        permission: 'manage_products',
    },
    {
        name: 'Orders',
        href: '/admin/orders',
        icon: <ShoppingCart className="h-5 w-5" />,
        permission: 'manage_orders',
    },
    {
        name: 'Analytics',
        href: '/admin/analytics',
        icon: <BarChart3 className="h-5 w-5" />,
        permission: 'view_analytics',
    },
    {
        name: 'Settings',
        href: '/admin/settings',
        icon: <Settings className="h-5 w-5" />,
        permission: 'manage_settings',
    },
];

interface AdminLayoutProps {
    children?: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const { admin, logout, hasPermission } = useAdminAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const filteredSidebarItems = sidebarItems.filter(item => 
        !item.permission || hasPermission(item.permission)
    );

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                        <Shield className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg">MEDHELM</h2>
                        <p className="text-sm text-muted-foreground">Admin Panel</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {filteredSidebarItems.map((item) => {
                        const isActive = location.pathname === item.href || 
                            (item.href !== '/admin/dashboard' && location.pathname.startsWith(item.href));
                        
                        return (
                            <li key={item.name}>
                                <Button
                                    variant={isActive ? "default" : "ghost"}
                                    className={`w-full justify-start ${
                                        isActive 
                                            ? 'bg-primary text-primary-foreground' 
                                            : 'hover:bg-gray-100'
                                    }`}
                                    onClick={() => {
                                        navigate(item.href);
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    {item.icon}
                                    <span className="ml-3">{item.name}</span>
                                    {item.badge && (
                                        <Badge variant="secondary" className="ml-auto">
                                            {item.badge}
                                        </Badge>
                                    )}
                                </Button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Admin info */}
            <div className="p-4 border-t">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">{admin?.name}</p>
                        <p className="text-xs text-muted-foreground">{admin?.role}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Desktop Sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <Card className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r">
                    <SidebarContent />
                </Card>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetContent side="left" className="w-72 p-0">
                    <SidebarContent />
                </SheetContent>
            </Sheet>

            {/* Main Content */}
            <div className="lg:pl-72">
                {/* Top Header */}
                <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-4 shadow-sm lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* Mobile menu button */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="lg:hidden"
                                        onClick={() => setIsMobileMenuOpen(true)}
                                    >
                                        <Menu className="h-5 w-5" />
                                    </Button>
                                </SheetTrigger>
                            </Sheet>
                            
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900">
                                    Admin Dashboard
                                </h1>
                                <p className="text-sm text-gray-500">
                                    Manage your MEDHELM Supplies platform
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Notifications */}
                            <Button variant="ghost" size="sm" className="relative">
                                <Bell className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                                    2
                                </span>
                            </Button>

                            {/* Admin Menu */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-2">
                                        <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                                            <User className="h-4 w-4 text-primary-foreground" />
                                        </div>
                                        <div className="hidden sm:block text-left">
                                            <p className="text-sm font-medium">{admin?.name}</p>
                                            <p className="text-xs text-muted-foreground">{admin?.role}</p>
                                        </div>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <div className="p-2">
                                        <p className="text-sm font-medium">{admin?.name}</p>
                                        <p className="text-xs text-muted-foreground">{admin?.email}</p>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => navigate('/admin/profile')}>
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <main className="p-4 lg:p-8">
                    {children || <Outlet />}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;