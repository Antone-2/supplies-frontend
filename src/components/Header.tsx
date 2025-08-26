import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/cartContext';
import { useWishlist } from '@/context/wishlistContext';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CartSheet from './CartSheet';
import WishlistSheet from './WishlistSheet';
import { Menu, Phone, MapPin, User, Mail } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import medHelmLogo from '@/assets/medhelm-logo.svg';


const Header = () => {
    // ...search bar and navigation removed as requested...

    // ...existing code...

    const { cartItems } = useCart();
    const { wishlist } = useWishlist();
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const wishlistCount = wishlist.length;

    const { user } = useAuth();
    return (
        <header className="bg-white shadow-lg border-b border-border sticky top-0 z-50">
            {/* Top bar with contact info */}
            <div className="bg-primary text-primary-foreground py-2 px-4">
                <div className="container mx-auto flex flex-wrap justify-between items-center text-sm">
                    <div className="flex flex-wrap items-center gap-2 md:gap-4">
                        <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span className="text-xs md:text-sm">+254 746 020 323</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            <span className="hidden sm:inline text-xs md:text-sm">info@medhelmsupplies.co.ke</span>
                            <span className="sm:hidden text-xs">Email Us</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="text-xs md:text-sm">Kiambu Town</span>
                        <span className="hidden md:inline">, Opposite Level 5 Hospital</span>
                    </div>
                </div>
            </div>

            {/* Main header */}
            <div className="container mx-auto px-4 py-1">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <img src={medHelmLogo} alt="MEDHELM Supplies Logo" className="h-20 w-auto drop-shadow-lg" style={{ maxHeight: '5rem' }} />
                        <div className="flex flex-col justify-center" style={{ height: '5rem' }}>
                            <h1 className="text-2xl font-extrabold text-primary leading-none tracking-wide" style={{ letterSpacing: '0.1em' }}>MEDHELM</h1>
                            <p className="text-base text-muted-foreground leading-none tracking-widest font-semibold">SUPPLIES</p>
                        </div>
                    </div>


                    {/* Search bar removed as requested */}

                    {/* Desktop navigation */}
                    <nav className="hidden lg:flex items-center gap-6">
                        <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
                        <a href="/#categories" className="text-foreground hover:text-primary transition-colors">Categories</a>
                        <a href="/#products" className="text-foreground hover:text-primary transition-colors">Products</a>
                        <Link to="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
                        <Link to="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
                        {/* Admin links */}
                        {user?.role === 'admin' && (
                            <>
                                <Link to="/admin-products" className="text-foreground hover:text-primary transition-colors font-semibold">Product Management</Link>
                                <Link to="/admin-orders" className="text-foreground hover:text-primary transition-colors font-semibold">Order Management</Link>
                            </>
                        )}
                    </nav>

                    {/* Action buttons - visible only on large screens, hidden on small devices */}
                    <div className="hidden lg:flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="p-2 relative" aria-label="Wishlist" onClick={() => document.getElementById('wishlist-sheet-btn')?.click()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75a5.25 5.25 0 00-4.5 2.472A5.25 5.25 0 007.5 3.75 5.25 5.25 0 003 9c0 7.25 9 11.25 9 11.25s9-4 9-11.25a5.25 5.25 0 00-5.25-5.25z" />
                            </svg>
                            {wishlistCount > 0 && (
                                <Badge className="absolute -top-2 -right-3 h-4 w-4 rounded-full p-0 text-xs bg-secondary" style={{ fontSize: '0.7rem', transform: 'translateY(-30%) scale(0.9)' }}>
                                    {wishlistCount}
                                </Badge>
                            )}
                        </Button>
                        <span style={{ display: 'none' }}>
                            <div id="wishlist-sheet-btn" style={{ display: 'none' }}><WishlistSheet /></div>
                        </span>
                        <div className="relative">
                            <CartSheet />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-3 flex items-center justify-center h-5 w-5 rounded-full bg-red-600 text-white text-xs font-bold border-2 border-white shadow" style={{ fontSize: '0.8rem' }}>
                                    {cartCount}
                                </span>
                            )}
                        </div>
                        {user ? (
                            <Button variant="ghost" size="sm" asChild>
                                <Link to="/profile">
                                    <div style={{ borderRadius: '50%', width: 32, height: 32, background: '#e0e7ff', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 16, border: '2px solid #6366f1' }}>
                                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </div>
                                </Link>
                            </Button>
                        ) : (
                            <Button variant="ghost" size="sm" asChild>
                                <Link to="/auth">
                                    <User className="h-4 w-4" />
                                    <span className="ml-1">Account</span>
                                </Link>
                            </Button>
                        )}
                    </div>

                    {/* Mobile actions - only menu, no cart/wishlist icons */}
                    <div className="flex lg:hidden items-center gap-2">
                        {/* Mobile menu */}
                        <Sheet>
                            <SheetTrigger asChild className="lg:hidden">
                                <Button variant="ghost" size="sm">
                                    <Menu className="h-4 w-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-64">
                                <div className="flex flex-col gap-4 mt-8">
                                    <Link to="/" className="text-foreground hover:text-primary transition-colors py-2">Home</Link>
                                    <a href="/#categories" className="text-foreground hover:text-primary transition-colors py-2">Categories</a>
                                    <a href="/#products" className="text-foreground hover:text-primary transition-colors py-2">Products</a>
                                    <Link to="/wishlist" className="text-foreground hover:text-primary transition-colors py-2">Wishlist</Link>
                                    <Link to="/about" className="text-foreground hover:text-primary transition-colors py-2">About</Link>
                                    <Link to="/contact" className="text-foreground hover:text-primary transition-colors py-2">Contact</Link>
                                    {/* Admin links */}
                                    {user?.role === 'admin' && (
                                        <>
                                            <Link to="/admin-products" className="text-foreground hover:text-primary transition-colors py-2 font-semibold">Product Management</Link>
                                            <Link to="/admin-orders" className="text-foreground hover:text-primary transition-colors py-2 font-semibold">Order Management</Link>
                                        </>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

                {/* Mobile search removed as requested */}
            </div>
        </header>
    );
};

export default Header;