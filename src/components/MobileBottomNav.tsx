import { Home, Search, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalItems } = useCart();
  const { isAuthenticated } = useAuth();

  const cartItems = getTotalItems();

  // Determine active tab based on current route
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/products') || path.startsWith('/search') || path.startsWith('/category')) return 'search';
    if (path === '/cart') return 'cart';
    if (path === '/wishlist') return 'wishlist';
    if (path.startsWith('/profile') || path.startsWith('/auth')) return 'account';
    return 'home'; // default
  };

  const activeTab = getActiveTab();

  const handleNavClick = (id: string) => {
    // Add haptic feedback for mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate(10); // Short vibration on tap
    }

    switch (id) {
      case 'home':
        navigate('/');
        break;
      case 'search':
        navigate('/products');
        break;
      case 'cart':
        navigate('/cart');
        break;
      case 'wishlist':
        navigate('/wishlist');
        break;
      case 'account':
        if (isAuthenticated) {
          navigate('/profile');
        } else {
          navigate('/auth');
        }
        break;
      default:
        break;
    }
  };

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      badge: null
    },
    {
      id: 'search',
      label: 'Search',
      icon: Search,
      badge: null
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: ShoppingCart,
      badge: cartItems > 0 ? cartItems : null
    },
    {
      id: 'account',
      label: isAuthenticated ? 'Account' : 'Login',
      icon: User,
      badge: null
    }
  ];

  return (
    <nav
      className="lg:hidden mobile-nav-fixed bg-background/95 backdrop-blur-md border-t border-border pb-safe"
      role="tablist"
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center max-w-screen-sm mx-auto px-0 py-2 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`
                mobile-nav-button flex flex-col items-center gap-0 h-auto py-2 px-1 min-w-0 flex-1 rounded-lg transition-all duration-300 min-h-[60px] touch-manipulation
                ${isActive
                  ? 'text-primary bg-primary/15 shadow-md scale-105 font-medium'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/8 hover:scale-105 active:scale-95'
                }
              `}
              onClick={() => handleNavClick(item.id)}
              aria-label={`${item.label}${item.badge ? ` (${item.badge} items)` : ''}`}
              role="tab"
              aria-selected={isActive}
            >
              <div className="relative">
                <Icon className={`transition-all duration-300 ${isActive ? 'h-6 w-6' : 'h-5 w-5'} ${isActive ? 'drop-shadow-sm' : ''}`} />
                {item.badge && item.badge > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-red-500 text-white font-bold border-2 border-background shadow-lg">
                    {item.badge > 9 ? '9+' : item.badge}
                  </Badge>
                )}
              </div>
              <span className={`text-xs font-medium truncate transition-all duration-300 max-w-full ${isActive ? 'text-primary font-semibold' : ''}`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;