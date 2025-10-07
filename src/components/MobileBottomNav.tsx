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
  <div className="grid grid-cols-5 items-center w-full max-w-full mx-auto px-0 py-1" style={{ minWidth: 0 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`
                mobile-nav-button flex flex-col items-center gap-0 h-auto py-1 px-0 min-w-0 flex-1 transition-all duration-300 min-h-[56px] touch-manipulation
                ${isActive
                  ? 'text-primary scale-105 font-medium'
                  : 'text-muted-foreground hover:text-primary hover:scale-105 active:scale-95'
                }
              `}
              style={{ minWidth: '0', width: '100%', margin: '0', justifySelf: 'center', padding: '0 0.5px' }}
              onClick={() => handleNavClick(item.id)}
              aria-label={`${item.label}${item.badge ? ` (${item.badge} items)` : ''}`}
              role="tab"
              aria-selected={isActive}
            >
              <div className="relative">
                <Icon className={`transition-all duration-300 h-5 w-5 ${isActive ? 'drop-shadow-sm' : ''}`} />
                {item.badge && item.badge > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-red-500 text-white font-bold border-2 border-background shadow-lg">
                    {item.badge > 9 ? '9+' : item.badge}
                  </Badge>
                )}
              </div>
              <span className={`text-[10px] font-medium truncate transition-all duration-300 max-w-full ${isActive ? 'text-primary font-semibold' : ''}`}>
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