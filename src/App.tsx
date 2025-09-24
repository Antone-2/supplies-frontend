import React, { Suspense, lazy } from 'react';
import Spinner from './components/Spinner';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/cartContext';
import { WishlistProvider } from './context/wishlistContext';
import AuthProvider from './providers/AuthProvider';
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import ProtectedRoute from './components/ProtectedRoute';

// Only import the pages/components you actually have and use
const Index = lazy(() => import('./pages/Index'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Products = lazy(() => import('./pages/Products'));
const CategoryProducts = lazy(() => import('./pages/CategoryProducts'));
const Cart = lazy(() => import('./components/Cart'));
const TrackOrder = lazy(() => import('./pages/TrackOrder'));
const Returns = lazy(() => import('./pages/Returns'));
const DeliveryPolicy = lazy(() => import('./pages/DeliveryPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Cookies = lazy(() => import('./pages/Cookies'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Auth = lazy(() => import('./pages/Auth'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminAnalytics = lazy(() => import('./pages/admin/AnalyticsDashboard_enhanced'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const AdminReports = lazy(() => import('./pages/admin/AdminReports'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Checkout = lazy(() => import('./pages/Checkout'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'));
const DashboardMobilePreview = lazy(() => import('./DashboardMobilePreview'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

const queryClient = new QueryClient();

const App = () => (
    <AuthProvider>
        <CartProvider>
            <QueryClientProvider client={queryClient}>
                <WishlistProvider>
                    <HelmetProvider>
                        <TooltipProvider>
                            <Toaster />
                            <Sonner />
                            <BrowserRouter future={{ v7_relativeSplatPath: true }}>
                                <Suspense fallback={<Spinner />}>
                                    <Routes>
                                        <Route path="/" element={<Index />} />
                                        <Route path="/about" element={<About />} />
                                        <Route path="/contact" element={<Contact />} />
                                        <Route path="/products" element={<Products />} />
                                        <Route path="/category/:category" element={<CategoryProducts />} />
                                        <Route path="/cart" element={<Cart />} />
                                        <Route path="/auth" element={<Auth />} />
                                        <Route path="/register" element={<Register />} />
                                        <Route path="/forgot-password" element={<ForgotPassword />} />
                                        <Route path="/track-order" element={<TrackOrder />} />
                                        <Route path="/returns" element={<Returns />} />
                                        <Route path="/delivery-policy" element={<DeliveryPolicy />} />
                                        <Route path="/terms" element={<Terms />} />
                                        <Route path="/privacy" element={<Privacy />} />
                                        <Route path="/cookies" element={<Cookies />} />
                                        <Route path="/admin" element={
                                            <ProtectedRoute requiredRole="admin">
                                                <AdminDashboard />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/admin/dashboard-mobile" element={
                                            <ProtectedRoute requiredRole="admin">
                                                <DashboardMobilePreview />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/admin/products" element={
                                            <ProtectedRoute requiredRole="admin">
                                                <AdminProducts />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/admin/orders" element={
                                            <ProtectedRoute requiredRole="admin">
                                                <AdminOrders />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/admin/users" element={
                                            <ProtectedRoute requiredRole="admin">
                                                <AdminUsers />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/admin/analytics" element={
                                            <ProtectedRoute requiredRole="admin">
                                                <AdminAnalytics />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/admin/reports" element={
                                            <ProtectedRoute requiredRole="admin">
                                                <AdminReports />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/admin/settings" element={
                                            <ProtectedRoute requiredRole="admin">
                                                <AdminSettings />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/verify-email" element={<VerifyEmail />} />
                                        <Route path="/reset-password" element={<ResetPassword />} />
                                        <Route path="/checkout" element={<Checkout />} />
                                        <Route path="/reviews" element={<ReviewsPage />} />
                                        <Route path="*" element={<NotFound />} />
                                    </Routes>
                                </Suspense>
                            </BrowserRouter>
                        </TooltipProvider>
                    </HelmetProvider>
                </WishlistProvider>
            </QueryClientProvider>
        </CartProvider>
    </AuthProvider>
);

export default App;