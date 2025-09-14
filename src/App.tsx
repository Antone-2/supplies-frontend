import { Suspense, lazy } from 'react';
import AuthProvider from './providers/AuthProvider';
import { CartProvider } from './context/cartContext';
import { WishlistProvider } from './context/wishlistContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import Header from './components/Header';
import MobileBottomNav from './components/MobileBottomNav';
import { ErrorBoundary } from './components/ErrorBoundary';
import RouteFallback from './components/RouteFallback';

// Lazy loaded pages/components
const Index = lazy(() => import('./pages/Index'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Terms = lazy(() => import('./pages/Terms'));
const Returns = lazy(() => import('./pages/Returns'));
const DeliveryPolicy = lazy(() => import('./pages/DeliveryPolicy'));
const Cookies = lazy(() => import('./pages/Cookies'));
const Privacy = lazy(() => import('./pages/Privacy'));
const ProductList = lazy(() => import('./pages/ProductList'));
const ProductDetail = lazy(() => import('./pages/productDetail'));
const CategoryPage = lazy(() => import('./pages/Category'));
const WishlistPage = lazy(() => import('./components/WishlistPage'));
const Cart = lazy(() => import('./components/Cart'));
const Shop = lazy(() => import('./pages/Shop'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'));
const Categories = lazy(() => import('./pages/Categories'));
const Checkout = lazy(() => import('./pages/Checkout'));
const TrackOrder = lazy(() => import('./pages/TrackOrder'));
const AdminOrderManagement = lazy(() => import('./pages/AdminOrderManagement'));
const AdminProductManagement = lazy(() => import('./pages/AdminProductManagement'));
const ResendVerification = lazy(() => import('./pages/ResendVerification'));
const OrderConfirmed = lazy(() => import('./pages/OrderConfirmed'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const Auth = lazy(() => import('./pages/Auth'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const OAuthCallback = lazy(() => import('./pages/OAuthCallback'));
const Profile = lazy(() => import('./pages/profile'));
const ActivateAccount = lazy(() => import('./pages/ActivateAccount'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminRoute = lazy(() => import('./components/AdminRoute'));

const App = () => (
    <AuthProvider>
        <CartProvider>
            <WishlistProvider>
                <TooltipProvider>
                    <BrowserRouter>
                        <Header />
                        <ErrorBoundary>
                            <Suspense fallback={<RouteFallback />}>
                                <Routes>
                                    <Route path="/" element={<Index />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/checkout" element={
                                        <ErrorBoundary>
                                            <Checkout />
                                        </ErrorBoundary>
                                    } />
                                    <Route path="/track-order" element={<TrackOrder />} />
                                    <Route path="/terms" element={<Terms />} />
                                    <Route path="/returns" element={<Returns />} />
                                    <Route path="/delivery-policy" element={<DeliveryPolicy />} />
                                    <Route path="/cookies" element={<Cookies />} />
                                    <Route path="/privacy" element={<Privacy />} />
                                    <Route path="/products" element={<ProductList />} />
                                    <Route path="/shop" element={<Shop />} />
                                    <Route path="/categories" element={<Categories />} />
                                    <Route path="/reviews" element={<ReviewsPage />} />
                                    <Route path="/product/:id" element={
                                        <ErrorBoundary>
                                            <ProductDetail />
                                        </ErrorBoundary>
                                    } />
                                    <Route path="/category/:categoryName" element={<CategoryPage />} />
                                    <Route path="/auth" element={<Auth />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/forgot-password" element={<ForgotPassword />} />
                                    <Route path="/reset-password" element={<ResetPassword />} />
                                    <Route path="/admin-orders" element={
                                        <ErrorBoundary>
                                            <AdminRoute>
                                                <AdminOrderManagement />
                                            </AdminRoute>
                                        </ErrorBoundary>
                                    } />
                                    <Route path="/admin-products" element={
                                        <ErrorBoundary>
                                            <AdminRoute>
                                                <AdminProductManagement />
                                            </AdminRoute>
                                        </ErrorBoundary>
                                    } />
                                    <Route path="/resend-verification" element={<ResendVerification />} />
                                    <Route path="/order-confirmed" element={<OrderConfirmed />} />
                                    <Route path="/search" element={<SearchResults />} />
                                    <Route path="/cart" element={<Cart />} />
                                    <Route path="/wishlist" element={<WishlistPage />} />
                                    <Route path="/activate" element={<ActivateAccount />} />
                                    <Route path="/verify-email" element={<VerifyEmail />} />
                                    <Route path="/oauth-callback" element={<OAuthCallback />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </Suspense>
                        </ErrorBoundary>
                        <MobileBottomNav />
                    </BrowserRouter>
                </TooltipProvider>
            </WishlistProvider>
        </CartProvider>
    </AuthProvider>
);

export default App;
<Route path="/profile" element={<Profile />} />
