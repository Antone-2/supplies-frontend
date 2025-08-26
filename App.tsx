import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Index from './src/pages/Index'
import About from './src/pages/About'
import Contact from './src/pages/Contact'
import NotFound from './src/pages/NotFound'
import Category from './src/pages/Category'
import Auth from './src/pages/Auth'
import Checkout from './src/pages/Checkout'
import Cookies from './src/pages/Cookies'
import DeliveryPolicy from './src/pages/DeliveryPolicy'
import Returns from './src/pages/Returns'
import Terms from './src/pages/Terms'
import Privacy from './src/pages/Privacy'
import TrackOrder from './src/pages/TrackOrder'
import Shop from './src/pages/Shop'
import ProductDetail from './src/pages/productDetail'
import OrderHistory from './src/pages/OrderHistory'
import './App.css'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/category/:categoryName" element={<Category />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/login" element={<Navigate to="/auth" replace />} />
                <Route path="/register" element={<Navigate to="/auth" replace />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-history" element={<OrderHistory />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/delivery-policy" element={<DeliveryPolicy />} />
                <Route path="/returns" element={<Returns />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default App
