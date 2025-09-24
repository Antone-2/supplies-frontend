import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Bell, Search, Settings, User, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface TopbarProps {
    onMenuClick?: () => void;
    title?: string;
}

const Topbar: React.FC<TopbarProps> = ({ onMenuClick, title = "Dashboard" }) => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = '/auth';
    };

    return (
        <header className="h-20 bg-white border-b border-gray-200 flex items-center px-6 justify-between shadow-sm sticky top-0 z-40">
            {/* Left section */}
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onMenuClick}
                    className="lg:hidden p-2"
                    aria-label="Toggle menu"
                >
                    <Menu className="h-5 w-5" />
                </Button>

                <div className="hidden sm:block">
                    <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                    <p className="text-sm text-gray-500">Welcome back, {user?.name || 'Admin'}</p>
                </div>
            </div>

            {/* Center section - Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search products, orders, users..."
                        className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                    />
                </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-3">
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative p-2">
                    <Bell className="h-5 w-5 text-gray-600" />
                    <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                    >
                        3
                    </Badge>
                </Button>

                {/* Settings */}
                <Button variant="ghost" size="sm" className="p-2">
                    <Settings className="h-5 w-5 text-gray-600" />
                </Button>

                {/* User menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="/placeholder-avatar.jpg" alt={user?.name || 'Admin'} />
                                <AvatarFallback className="bg-primary text-white">
                                    {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'AD'}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user?.name || 'Admin User'}</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {user?.email || 'admin@medhelmsupplies.com'}
                                </p>
                                <Badge variant="secondary" className="w-fit text-xs">
                                    {user?.role === 'admin' ? 'Administrator' : 'User'}
                                </Badge>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default Topbar;
