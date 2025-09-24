import { Toaster } from "./src/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Toaster as Sonner } from "./src/components/ui/sonner";
import { TooltipProvider } from "./src/components/ui/tooltip";
import { CartProvider } from './src/context/cartContext';
import Index from "./src/pages/Index";
import About from "./src/pages/About";
import Contact from "./src/pages/Contact";
import TrackOrder from "./src/pages/TrackOrder";
import Returns from "./src/pages/Returns";
import DeliveryPolicy from "./src/pages/DeliveryPolicy";
import Terms from "./src/pages/Terms";
import Privacy from "./src/pages/Privacy";
import Cookies from "./src/pages/Cookies";
import Products from "./src/pages/Products";
import CategoryProducts from "./src/pages/CategoryProducts";
import Cart from "./src/components/Cart";
import NotFound from "./src/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <CartProvider>
            <HelmetProvider>
                <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/category/:category" element={<CategoryProducts />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/track-order" element={<TrackOrder />} />
                            <Route path="/returns" element={<Returns />} />
                            <Route path="/delivery-policy" element={<DeliveryPolicy />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/cookies" element={<Cookies />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </TooltipProvider>
            </HelmetProvider>
        </CartProvider>
    </QueryClientProvider>
);

export default App;
