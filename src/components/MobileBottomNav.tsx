import { LuUser, LuHouse, LuShoppingCart } from 'react-icons/lu';
import { FaWhatsapp } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import SearchModal from './SearchModal';
import { Link } from 'react-router-dom';

const MobileBottomNav = () => {
    const [activeTab, setActiveTab] = useState('home');

    const { user } = useAuth();
    const navItems = [
        {
            id: 'home',
            label: 'Home',
            icon: LuHouse,
            href: '/',
            type: 'link'
        },
        {
            id: 'cart',
            label: 'Cart',
            icon: LuShoppingCart,
            href: '/cart',
            type: 'link'
        },
        {
            id: 'chat',
            label: 'WhatsApp',
            icon: FaWhatsapp,
            href: 'https://wa.me/254746020323?text=Hi%20I%20need%20help%20with%20my%20order',
            type: 'link'
        },
        user ? {
            id: 'account',
            label: user.name.split(' ').map(n => n[0]).join('').toUpperCase(),
            icon: LuUser,
            href: '/profile',
            type: 'link'
        } : {
            id: 'account',
            label: 'Account',
            icon: LuUser,
            href: '/auth',
            type: 'link'
        }
    ];

    return (
        <>
            {/* Modern Mobile Bottom Navigation */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 safe-area-pb">
                {/* Cool gradient background */}
                <div className="absolute inset-0 bg-white backdrop-blur-xl border-t border-gray-200 shadow-2xl"></div>

                {/* Floating effect container */}
                <div className="relative px-2 py-1">
                    <div className="flex justify-around items-center max-w-md mx-auto">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;

                            if (item.type === 'modal' && item.id === 'search') {
                                return (
                                    <div key={item.id} className="flex-1 flex flex-col items-center justify-center py-2 px-1 relative group">
                                        <button
                                            onClick={() => setActiveTab(item.id)}
                                            className="relative flex items-center justify-center w-10 h-10 rounded-3xl bg-gradient-to-tr from-blue-500 to-purple-600 text-white shadow-lg transition-transform duration-300 ease-out hover:scale-110 active:scale-95"
                                            aria-label="Open Search"
                                        >
                                            <Icon className="w-7 h-7" />
                                            {isActive && (
                                                <div className="absolute inset-0 rounded-3xl ring-2 ring-white animate-pulse"></div>
                                            )}
                                        </button>
                                        <span className={`text-xs font-semibold mt-1 transition-all duration-300 ${isActive ? 'text-blue-600 scale-110' : 'text-gray-500 group-hover:text-gray-700'}`}>
                                            Search
                                        </span>
                                        {isActive && <SearchModal isOpen={isActive} onClose={() => setActiveTab('home')} />}
                                    </div>
                                );
                            }



                            if (item.type === 'link') {
                                if (item.id === 'chat') {
                                    return (
                                        <div key={item.id} className="flex-1 flex flex-col items-center justify-center py-2 px-1 relative group">
                                            <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                                                <button
                                                    onClick={() => setActiveTab(item.id)}
                                                    className="relative flex items-center justify-center w-10 h-10 rounded-3xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg transition-transform duration-300 ease-out hover:scale-110 active:scale-95"
                                                    aria-label="Open WhatsApp Chat"
                                                >
                                                    <Icon className="w-7 h-7" />
                                                    {isActive && (
                                                        <div className="absolute inset-0 rounded-3xl ring-2 ring-white animate-pulse"></div>
                                                    )}
                                                </button>
                                                <span className={`text-xs font-semibold mt-1 transition-all duration-300 ${isActive ? 'text-cyan-600 scale-110' : 'text-gray-500 group-hover:text-gray-700'}`}>
                                                    WhatsApp
                                                </span>
                                            </a>
                                        </div>
                                    );
                                } else if (item.id === 'account') {
                                    return (
                                        <div key={item.id} className="flex-1 flex flex-col items-center justify-center py-2 px-1 relative group">
                                            <Link to={item.href ?? '/'} className="flex flex-col items-center">
                                                <button
                                                    onClick={() => setActiveTab(item.id)}
                                                    className="relative flex items-center justify-center w-10 h-10 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-lg transition-transform duration-300 ease-out hover:scale-110 active:scale-95"
                                                    aria-label="Go to Account"
                                                >
                                                    {user ? (
                                                        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                                                            {item.label}
                                                        </div>
                                                    ) : (
                                                        <Icon className="w-7 h-7" />
                                                    )}
                                                    {isActive && (
                                                        <div className="absolute inset-0 rounded-3xl ring-2 ring-white animate-pulse"></div>
                                                    )}
                                                </button>
                                                <span className={`text-xs font-semibold mt-1 transition-all duration-300 ${isActive ? 'text-indigo-600 scale-110' : 'text-gray-500 group-hover:text-gray-700'}`}>
                                                    {user ? 'Profile' : 'Account'}
                                                </span>
                                            </Link>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={item.id} className="flex-1 flex flex-col items-center justify-center py-2 px-1 relative group">
                                            <Link to={item.href ?? '/'} className="flex flex-col items-center">
                                                <button
                                                    onClick={() => setActiveTab(item.id)}
                                                    className={`relative flex items-center justify-center w-10 h-10 rounded-3xl text-white shadow-lg transition-transform duration-300 ease-out hover:scale-110 active:scale-95 ${item.id === 'home' ? 'bg-gradient-to-tr from-gray-500 to-gray-700' : 'bg-gradient-to-tr from-gray-500 to-gray-700'}`}
                                                    aria-label={`Go to ${item.label}`}
                                                >
                                                    <Icon className="w-7 h-7" />
                                                    {isActive && (
                                                        <div className="absolute inset-0 rounded-3xl ring-2 ring-white animate-pulse"></div>
                                                    )}
                                                </button>
                                                <span className={`text-xs font-semibold mt-1 transition-all duration-300 ${isActive ? (item.id === 'home' ? 'text-gray-300 scale-110' : 'text-gray-300 scale-110') : 'text-gray-500 group-hover:text-gray-700'}`}>
                                                    {item.label}
                                                </span>
                                            </Link>
                                        </div>
                                    );
                                }
                            }

                            return null;
                        })}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default MobileBottomNav;
