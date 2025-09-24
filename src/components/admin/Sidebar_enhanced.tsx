import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
    const [isMobile, setIsMobile] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Check if device is mobile
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isMobile && isMobileMenuOpen) {
                const sidebar = document.getElementById('admin-sidebar');
                if (sidebar && !sidebar.contains(event.target as Node)) {
                    setIsMobileMenuOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobile, isMobileMenuOpen]);

    const handleNavClick = (key: string) => {
        setActiveSection(key);
        if (isMobile) {
            setIsMobileMenuOpen(false);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            {isMobile && (
                <div className="lg:hidden fixed top-4 left-4 z-[60]">
                    <button
                        onClick={toggleMobileMenu}
                        className="p-3 bg-white rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-300"
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? (
                            <LuX className="h-6 w-6 text-gray-700" />
                        ) : (
                            <LuMenu className="h-6 w-6 text-gray-700" />
                        )}
                    </button>
                </div>
            )}

            {/* Mobile Overlay */}
            {isMobile && isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                id="admin-sidebar"
                className={`
                    bg-white border-r-2 border-gray-200 shadow-2xl flex flex-col transition-all duration-500 backdrop-blur-sm h-full font-['Roboto']
                    ${isMobile
                        ? `fixed left-0 top-0 z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-72`
                        : `${isCollapsed ? 'w-20' : 'w-72'}`
                    }
                `}
            >
                {/* Header */}
                <div className="h-24 flex items-center justify-between px-6 border-b-2 border-gray-100 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                    {!isCollapsed && (
                        <div className="flex items-center relative z-10">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                                <LuLayoutDashboard className="h-7 w-7 text-blue-600" />
                            </div>
                            <div>
                                <span className="text-2xl font-black text-white tracking-tight">Admin</span>
                                <p className="text-xs text-blue-100 font-medium">Panel</p>
                            </div>
                        </div>
                    )}
                    {isCollapsed && (
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-lg relative z-10">
                            <LuLayoutDashboard className="h-7 w-7 text-blue-600" />
                        </div>
                    )}
                    <button
                        onClick={onToggleCollapse}
                        className="p-3 rounded-2xl bg-white/20 text-white hover:bg-white/30 transition-all duration-300 backdrop-blur-sm relative z-10 hover:scale-110"
                        aria-label="Toggle sidebar"
                    >
                        {isCollapsed ? <LuChevronRight className="h-5 w-5" /> : <LuChevronLeft className="h-5 w-5" />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-8 overflow-y-auto bg-gradient-to-b from-white to-gray-50">
                    <ul className="space-y-3 px-4">
                        {navLinks.map(({ key, label, icon: Icon, href }) => {
                            const isActive = activeSection === key;
                            return (
                                <li key={key}>
                                    <Link
                                        to={href}
                                        onClick={() => handleNavClick(key)}
                                        className={`flex items-center px-4 py-4 rounded-2xl transition-all duration-300 font-semibold hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 group relative overflow-hidden w-full text-left ${isActive
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-200'
                                            : 'text-gray-700 hover:bg-gray-50'
                                            } ${isCollapsed ? 'justify-center' : ''}`}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <Icon className={`h-6 w-6 ${isCollapsed ? '' : 'mr-4'} transition-all duration-300 group-hover:scale-110 relative z-10`} />
                                        {!isCollapsed && (
                                            <span className="transition-all duration-300 relative z-10 font-bold tracking-wide">
                                                {label}
                                            </span>
                                        )}
                                        {isCollapsed && (
                                            <div className="absolute left-20 bg-gray-900 text-white px-3 py-2 rounded-xl text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 whitespace-nowrap shadow-xl">
                                                {label}
                                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-900"></div>
                                            </div>
                                        )}
                                        {isActive && !isCollapsed && (
                                            <div className="ml-auto">
                                                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                            </div>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="p-6 border-t-2 border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
                    {!isCollapsed && (
                        <div className="text-center">
                            <p className="text-sm font-bold text-gray-700 tracking-wide">Medhelm Supplies</p>
                            <p className="text-xs text-gray-500 mt-1 font-medium">Admin Panel v2.0</p>
                            <div className="flex justify-center mt-3 space-x-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    )}
                    {isCollapsed && (
                        <div className="text-center">
                            <div className="flex justify-center space-x-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
