import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LuLayoutDashboard,
    LuBox,
    LuUsers,
    LuShoppingCart,
    LuSettings,
    LuTrendingUp,
    LuMenu,
    LuX,
    LuChevronLeft,
    LuChevronRight
} from 'react-icons/lu';

const navLinks = [
    { key: 'dashboard', label: 'Dashboard', icon: LuLayoutDashboard, href: '/admin' },
    { key: 'products', label: 'Products', icon: LuBox, href: '/admin/products' },
    { key: 'orders', label: 'Orders', icon: LuShoppingCart, href: '/admin/orders' },
    { key: 'users', label: 'Users', icon: LuUsers, href: '/admin/users' },
    { key: 'analytics', label: 'Analytics', icon: LuTrendingUp, href: '/admin/analytics' },
    { key: 'settings', label: 'Settings', icon: LuSettings, href: '/admin/settings' },
];

interface SidebarProps {
    activeSection: string;
    setActiveSection: (key: string) => void;
    sections: { key: string; label: string }[];
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    activeSection,
    setActiveSection,
    sections,
    isCollapsed = false,
    onToggleCollapse
}) => {
    const location = useLocation();

    return (
        <aside className={`bg-white border-r shadow-lg flex flex-col min-h-screen transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'
            }`}>
            {/* Header */}
            <div className="h-20 flex items-center justify-between px-4 border-b bg-gradient-to-r from-primary to-blue-600">
                {!isCollapsed && (
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
                            <LuLayoutDashboard className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-xl font-bold text-white">Admin</span>
                    </div>
                )}
                {isCollapsed && (
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mx-auto">
                        <LuLayoutDashboard className="h-5 w-5 text-primary" />
                    </div>
                )}
                <button
                    onClick={onToggleCollapse}
                    className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
                    aria-label="Toggle sidebar"
                >
                    {isCollapsed ? <LuChevronRight className="h-4 w-4" /> : <LuChevronLeft className="h-4 w-4" />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 overflow-y-auto">
                <ul className="space-y-1 px-3">
                    {navLinks.map(({ key, label, icon: Icon, href }) => {
                        const isActive = location.pathname === href || activeSection === key;
                        return (
                            <li key={key}>
                                <Link
                                    to={href}
                                    onClick={() => setActiveSection(key)}
                                    className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 font-medium hover:bg-primary/10 hover:text-primary group ${isActive
                                        ? 'bg-primary text-white shadow-md'
                                        : 'text-gray-700 hover:bg-gray-50'
                                        } ${isCollapsed ? 'justify-center' : ''}`}
                                >
                                    <Icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'} transition-transform group-hover:scale-110`} />
                                    {!isCollapsed && (
                                        <span className="transition-opacity duration-200">
                                            {label}
                                        </span>
                                    )}
                                    {isCollapsed && (
                                        <div className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                                            {label}
                                        </div>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t">
                {!isCollapsed && (
                    <div className="text-xs text-gray-500 text-center">
                        <p>Medhelm Supplies</p>
                        <p className="mt-1">Admin Panel v1.0</p>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
