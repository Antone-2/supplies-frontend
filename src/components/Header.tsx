import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import {
  Phone,
  Mail,
  MapPin,
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X
} from 'lucide-react';
import medHelmLogo from '@/assets/medhelm-logo.svg';
import UserAvatar from '@/components/UserAvatar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { cart, wishlist } = useCart();

  // Calculate counts for badges with null checks
  const cartItemCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
  const wishlistItemCount = wishlist ? wishlist.length : 0;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar with contact info */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center text-sm gap-2">
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+254 746 020 323</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden md:inline">{import.meta.env.VITE_COMPANY_EMAIL}</span>
              <span className="md:hidden">Email Us</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <MapPin className="h-4 w-4" />
            <span>Kiambu Town</span>
            <span className="hidden lg:inline">, Opposite Level 5 Hospital</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        {/* Mobile header container */}
        <div className="flex items-center justify-between md:hidden">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={medHelmLogo} alt="MEDHELM Supplies" className="h-20 w-20" />
            <div>
              <h1 className="text-xl font-bold text-primary">MEDHELM</h1>
              <p className="text-sm text-muted-foreground -mt-1">SUPPLIES</p>
            </div>
          </Link>

          {/* Cart icon */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 relative"
            onClick={() => navigate('/cart')}
            title="Shopping Cart"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-medium">
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 ml-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Desktop header container */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={medHelmLogo} alt="MEDHELM Supplies" className="h-20 w-20 sm:h-24 sm:w-24" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-primary">MEDHELM</h1>
              <p className="text-sm text-muted-foreground -mt-1">SUPPLIES</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/categories" className="text-foreground hover:text-primary transition-colors">
              Categories
            </Link>
            <Link to="/products" className="text-foreground hover:text-primary transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Always visible icons */}
            <Button
              variant="ghost"
              size="sm"
              className="p-2 relative"
              onClick={() => navigate('/wishlist')}
              title="Wishlist"
            >
              <Heart className="h-4 w-4" />
              {wishlistItemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-medium">
                  {wishlistItemCount > 99 ? '99+' : wishlistItemCount}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 relative"
              onClick={() => navigate('/cart')}
              title="Shopping Cart"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-medium">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Button>
            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hidden sm:flex items-center gap-2"
                onClick={() => navigate('/profile')}
                title={`My Account - ${user?.name || 'User'}`}
              >
                <UserAvatar user={user} size="sm" />
                <span className="ml-1 hidden lg:inline text-sm">
                  Account
                </span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hidden sm:flex"
                onClick={() => navigate('/auth')}
                title="Login to access your account"
              >
                <User className="h-4 w-4" />
                <span className="ml-1 hidden lg:inline text-sm">
                  Login
                </span>
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2 ml-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="space-y-4">
              {/* Navigation Links */}
              <div className="flex flex-col gap-3">
                <Link
                  to="/"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Home</span>
                </Link>
                <Link
                  to="/categories"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Categories</span>
                </Link>
                <Link
                  to="/products"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Products</span>
                </Link>
                <Link
                  to="/about"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>About</span>
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Contact</span>
                </Link>
              </div>

              {/* Mobile Actions */}
              <div className="border-t pt-3 space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => {
                    navigate('/products');
                    setIsMenuOpen(false);
                  }}
                >
                  <Search className="h-4 w-4" />
                  <span>Search Products</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 sm:hidden"
                  onClick={() => {
                    navigate(isAuthenticated ? '/profile' : '/auth');
                    setIsMenuOpen(false);
                  }}
                >
                  {isAuthenticated ? (
                    <UserAvatar user={user} size="sm" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span>{isAuthenticated ? `${user?.name || "My Account"}` : "Login / Register"}</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 relative"
                  onClick={() => {
                    navigate('/wishlist');
                    setIsMenuOpen(false);
                  }}
                >
                  <Heart className="h-4 w-4" />
                  <span>My Wishlist</span>
                  {wishlistItemCount > 0 && (
                    <span className="absolute right-2 h-5 w-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-medium">
                      {wishlistItemCount > 99 ? '99+' : wishlistItemCount}
                    </span>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => {
                    navigate('/cart');
                    setIsMenuOpen(false);
                  }}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Shopping Cart</span>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;