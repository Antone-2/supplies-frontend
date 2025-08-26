import AdminProductManagement from './pages/AdminProductManagement';
import OrderConfirmed from './pages/OrderConfirmed';

import AuthProvider from './providers/AuthProvider';
import { CartProvider } from './context/cartContext';
import { WishlistProvider } from './context/wishlistContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Index from './pages/Index';
import { TooltipProvider } from '@/components/ui/tooltip';
import Checkout from './pages/Checkout';
import TrackOrder from './pages/TrackOrder';
import AdminOrderManagement from './pages/AdminOrderManagement';
import AdminRoute from './components/AdminRoute';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Returns from './pages/Returns';
import DeliveryPolicy from './pages/DeliveryPolicy';
import Cookies from './pages/Cookies';
import Privacy from './pages/Privacy';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/productDetail';
import CategoryPage from './pages/Category';
import WishlistPage from './components/WishlistPage';
import Shop from './pages/Shop';
import ReviewsPage from './pages/ReviewsPage';




import NotFound from './pages/NotFound';
import Auth from './pages/Auth';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ResendVerification from './pages/ResendVerification';
import SearchResults from './pages/SearchResults';
import OAuthCallback from './pages/OAuthCallback';
import Profile from './pages/profile';
import ActivateAccount from './pages/ActivateAccount';


const App = () => (
    <AuthProvider>
        <CartProvider>
            <WishlistProvider>
                <TooltipProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/track-order" element={<TrackOrder />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="/returns" element={<Returns />} />
                            <Route path="/delivery-policy" element={<DeliveryPolicy />} />
                            <Route path="/cookies" element={<Cookies />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/products" element={<ProductList />} />
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/reviews" element={<ReviewsPage />} />
                            <Route path="/product/:id" element={<ProductDetail />} />
                            <Route path="/category/:categoryName" element={<CategoryPage />} />
                            <Route path="/auth" element={<Auth />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/reset-password" element={<ResetPassword />} />
                            <Route path="/admin-orders" element={
                                <AdminRoute>
                                    <AdminOrderManagement />
                                </AdminRoute>
                            } />
                            <Route path="/admin-products" element={
                                <AdminRoute>
                                    <AdminProductManagement />
                                </AdminRoute>
                            } />
                            <Route path="/resend-verification" element={<ResendVerification />} />
                            <Route path="/order-confirmed" element={<OrderConfirmed />} />
                            <Route path="/search" element={<SearchResults />} />
                            <Route path="/wishlist" element={<WishlistPage />} />
                            <Route path="/activate" element={<ActivateAccount />} />
                            <Route path="/oauth-callback" element={<OAuthCallback />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </TooltipProvider>
            </WishlistProvider>
        </CartProvider>
    </AuthProvider>
);

export default App;
