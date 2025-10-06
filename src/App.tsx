// Simple imports - no lazy loading complications
// import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// Simple page imports
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import CategoryPage from "./pages/CategoryPage";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import CartPage from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentDemo from "./pages/PaymentDemo";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancelled from "./pages/PaymentCancelled";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import Cookies from "./pages/Cookies";
import DeliveryPolicy from "./pages/DeliveryPolicy";
import Privacy from "./pages/Privacy";
import Returns from "./pages/Returns";
import Terms from "./pages/Terms";
import TrackOrder from "./pages/TrackOrder";
import NotFound from "./pages/NotFound";
import AllReviews from "./pages/AllReviews";
import AdminRoutes from "./components/admin/AdminRoutes";

// Simple App - No complications!
function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-background">
            <Routes>
              {/* Essential Pages Only */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<Products />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/signup" element={<Auth />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/reviews" element={<AllReviews />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment-demo" element={<PaymentDemo />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-cancelled" element={<PaymentCancelled />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/delivery-policy" element={<DeliveryPolicy />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/track-order" element={<TrackOrder />} />
              <Route path="/categories" element={<Products />} />
              <Route path="/reviews" element={<Index />} />
              {/* Admin Routes */}
              <Route path="/admin/*" element={<AdminRoutes />} />
              {/* Catch all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
