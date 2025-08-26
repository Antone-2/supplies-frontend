import { Home, Search, ShoppingCart, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useCart } from '@/context/cartContext';
import { useWishlist } from '@/context/wishlistContext';
import CartSheet from './CartSheet';
import WishlistSheet from './WishlistSheet';
import { Sheet, SheetContent } from '@/components/ui/sheet';

const MobileBottomNav = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [cartOpen, setCartOpen] = useState(false);
    const [wishlistOpen, setWishlistOpen] = useState(false);
    const { cartItems } = useCart();
    const { wishlist } = useWishlist();
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const wishlistCount = wishlist.length;

    const navItems = [
        {
            id: 'home',
            label: 'Home',
            icon: Home,
            href: '#'
        },
        {
            id: 'search',
            label: 'Search',
            icon: Search,
            href: '#'
        },
        {
            id: 'cart',
            label: '',
            icon: ShoppingCart,
            href: '#',
            badge: cartCount
        },
        {
            id: 'wishlist',
            label: '',
            icon: Heart,
            href: '#',
            badge: wishlistCount
        },
        {
            id: 'account',
            label: 'Account',
            icon: User,
            href: '/auth'
        }
    ];

    return (
        <>
            {/* Cart Modal - open from right for desktop-like experience */}
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
                <SheetContent side="right" className="max-w-md w-full overflow-y-auto">
                    <CartSheet />
                </SheetContent>
            </Sheet>
            {/* Wishlist Modal - open from right for desktop-like experience */}
            <Sheet open={wishlistOpen} onOpenChange={setWishlistOpen}>
                <SheetContent side="right" className="max-w-md w-full overflow-y-auto">
                    <WishlistSheet />
                </SheetContent>
            </Sheet>
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 px-2 py-2 safe-area-pb">
                <div className="flex justify-around items-center max-w-md mx-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        // Custom onClick for cart and wishlist
                        let onClick = () => setActiveTab(item.id);
                        if (item.id === 'cart') onClick = () => setCartOpen(true);
                        if (item.id === 'wishlist') onClick = () => setWishlistOpen(true);
                        return (
                            <Button
                                key={item.id}
                                variant="ghost"
                                size="sm"
                                asChild
                                className={`
                    flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-0 flex-1
                    ${isActive
                                        ? 'text-primary bg-primary/5'
                                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                                    }
                  `}
                                onClick={onClick}
                            >
                                <a href={item.href} className="flex flex-col items-center">
                                    <div className="relative flex items-center justify-center">
                                        <Icon className="h-6 w-6" />
                                        {item.badge && item.badge > 0 && (
                                            <span className="absolute -top-2 -right-3 flex items-center justify-center h-5 w-5 rounded-full bg-red-600 text-white text-xs font-bold border-2 border-white shadow" style={{ fontSize: '0.8rem' }}>
                                                {item.badge}
                                            </span>
                                        )}
                                    </div>
                                    {item.label && (
                                        <span className="text-xs font-medium truncate">
                                            {item.label}
                                        </span>
                                    )}
                                </a>
                            </Button>
                        );
                    })}
                </div>
            </nav>
        </>
    );
};

export default MobileBottomNav;