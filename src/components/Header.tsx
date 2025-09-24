import CartIcon from './CartIcon';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/wishlistContext';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import WishlistSheet from './WishlistSheet';
import { Menu, Phone, MapPin, User, Mail, LogOut, User as UserIcon, ShoppingCart } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import medHelmLogo from '../assets/medhelm-logo.svg';
import { categories } from '@/data/products';
// ...existing code...


const Header = () => {
    // ...search bar and navigation removed as requested...

    // ...existing code...

    const { wishlist } = useWishlist();
    const wishlistCount = wishlist.length;

    const { user, logout } = useAuth();
    return (
        <header className="bg-white shadow-lg border-b border-border sticky top-0 z-50">
            {/* Top bar with contact info */}
            <div className="bg-primary text-primary-foreground py-2 px-4 hidden md:block">
                <div className="container mx-auto flex flex-wrap justify-between items-center text-sm">
                    <div className="flex flex-wrap items-center gap-2 md:gap-4">
                        <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span className="text-xs md:text-sm font-['Roboto']">+254 746 020 323</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            <span className="hidden sm:inline text-xs md:text-sm font-['Roboto']">info@medhelmsupplies.co.ke</span>
                            <span className="sm:hidden text-xs font-['Roboto']">Email Us</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="text-xs md:text-sm font-['Roboto']">Kiambu Town</span>
                        <span className="hidden md:inline font-['Roboto']">, Opposite Level 5 Hospital</span>
                    </div>
                </div>
            </div>

            {/* Main header */}
            <div className="container mx-auto px-4 py-1">
                {/* Desktop header */}
                <div className="hidden lg:flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <img src={medHelmLogo} alt="MEDHELM Supplies Logo" className="h-20 w-auto drop-shadow-lg" style={{ maxHeight: '5rem' }} width="80" height="80" />
                        <div className="flex flex-col justify-center" style={{ height: '5rem' }}>
                            <h1 className="text-2xl font-extrabold text-primary leading-none tracking-wide" style={{ letterSpacing: '0.1em' }}>MEDHELM</h1>
                            <p className="text-base text-muted-foreground leading-none tracking-widest font-semibold" style={{ color: '#E53935' }}> S U P P L I E S</p>
                        </div>
                    </div>

                    {/* Desktop navigation */}
                    <nav className="flex items-center gap-6">
                        <Link to="/" className="text-foreground hover:text-primary transition-colors font-['Roboto']">Home</Link>
                        <a href="#categories" className="text-foreground hover:text-primary transition-colors cursor-pointer font-['Roboto']" onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById('categories');
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            } else {
                                window.location.href = '/#categories';
                            }
                        }}>Categories</a>
                        <a href="#products" className="text-foreground hover:text-primary transition-colors cursor-pointer font-['Roboto']" onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById('products');
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            } else {
                                window.location.href = '/#products';
                            }
                        }}>Products</a>
                        <Link to="/about" className="text-foreground hover:text-primary transition-colors font-['Roboto']">About</Link>
                        <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-['Roboto']">Contact</Link>
                    </nav>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
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
                        <CartIcon />
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="relative">
                                        <User className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem asChild>
                                        <Link to="/profile" className="flex items-center">
                                            <UserIcon className="mr-2 h-4 w-4" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => {
                                        logout();
                                        window.location.href = '/auth';
                                    }}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button variant="ghost" size="sm" asChild>
                                <Link to="/auth">
                                    <User className="h-4 w-4" />
                                    <span className="ml-1">Account</span>
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>

                {/* Mobile header */}
                <header className="flex lg:hidden items-center justify-between px-4 py-3 sticky top-0 bg-white shadow-md z-50">
                    {/* Left: Hamburger menu and Logo */}
                    <div className="flex items-center gap-4">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button id="mobile-menu-toggle" data-cy="mobile-menu-toggle" variant="ghost" size="sm" className="menu-toggle" aria-label="Open menu">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64 mobile-nav">
                                <div className="flex flex-col gap-4 mt-8">
                                    <Link to="/" className="text-foreground hover:text-primary transition-colors py-2 font-['Roboto']">Home</Link>
                                    <a href="#categories" className="text-foreground hover:text-primary transition-colors py-2 cursor-pointer font-['Roboto']" onClick={(e) => {
                                        e.preventDefault();
                                        const element = document.getElementById('categories');
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        } else {
                                            window.location.href = '/#categories';
                                        }
                                    }}>Categories</a>
                                    <a href="#products" className="text-foreground hover:text-primary transition-colors py-2 cursor-pointer font-['Roboto']" onClick={(e) => {
                                        e.preventDefault();
                                        const element = document.getElementById('products');
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        } else {
                                            window.location.href = '/#products';
                                        }
                                    }}>Products</a>
                                    <Link to="/wishlist" className="text-foreground hover:text-primary transition-colors py-2 font-['Roboto']">Wishlist</Link>
                                    <Link to="/about" className="text-foreground hover:text-primary transition-colors py-2 font-['Roboto']">About</Link>
                                    <Link to="/contact" className="text-foreground hover:text-primary transition-colors py-2 font-['Roboto']">Contact</Link>
                                    {!user && <Link to="/auth" className="text-foreground hover:text-primary transition-colors py-2 font-['Roboto']">Login</Link>}
                                    {/* Admin links */}
                                    {user?.role === 'admin' && (
                                        <></>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>

                        <div className="flex items-center gap-3">
                            <img src={medHelmLogo} alt="MEDHELM Supplies Logo" className="h-8 w-auto drop-shadow-lg" width="32" height="32" />
                        </div>
                    </div>

                    {/* Center: Title */}
                    <div className="flex-grow text-center">
                        <h1 className="text-xl font-extrabold text-primary leading-none tracking-wide" style={{ letterSpacing: '0.1em' }}>MEDHELM</h1>
                        <p className="text-sm text-muted-foreground leading-none tracking-widest font-semibold" style={{ color: '#E53935' }}>S U P P L I E S</p>
                    </div>
                    {/* Right: Cart and Account */}
                    <div className="flex items-center gap-4">
                        <CartIcon size="sm" />
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="relative" aria-label="User menu">
                                        <User className="h-6 w-6" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem asChild>
                                        <Link to="/profile" className="flex items-center">
                                            <UserIcon className="mr-2 h-4 w-4" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => {
                                        logout();
                                        window.location.href = '/auth';
                                    }}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button variant="ghost" size="sm" asChild>
                                <Link to="/auth">
                                    <User className="h-6 w-6" />
                                </Link>
                            </Button>
                        )}
                    </div>
                </header>
            </div>
        </header>
    );
};

export default Header;