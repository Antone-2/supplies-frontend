import Hero from '@/components/Hero';
import SearchFilter from '@/components/SearchFilter';
import Categories from '@/components/Categories';
import FeaturedProducts from '@/components/FeaturedProducts';
import Reviews from '@/components/Reviews';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import WhatsAppChat from '@/components/WhatsAppChat';
import { useState, useMemo, useEffect } from 'react';
import { useCart } from '@/context/cartContext';

// Dummy featured products (replace with API call if needed)


const Index = () => {

    // Featured products from backend
    const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Search/filter state
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    // Removed unused selectedPriceRange and setSelectedPriceRange

    // Fetch featured products on mount
    useEffect(() => {
        setLoading(true);
        setError('');
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/products/featured/all`)
            .then(res => res.json())
            .then(data => {
                if (data && data.success && Array.isArray(data.data)) {
                    setFeaturedProducts(data.data);
                }
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load featured products.');
                setLoading(false);
            });
    }, []);

    // Filtered products
    const filteredProducts = useMemo(() => {
        return featuredProducts.filter(product => {
            const matchesSearch =
                !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory =
                !selectedCategory || product.category === selectedCategory;
            // Add price range logic if needed
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory, featuredProducts]);

    const { addToCart } = useCart();

    return (
        <div className="min-h-screen">
            <Hero />
            <SearchFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                products={featuredProducts}
            />
            <section id="categories">
                {/* Ensure Categories component accepts setSelectedCategory as a prop */}
                <Categories setSelectedCategory={setSelectedCategory} />
            </section>
            <section id="products">
                {loading ? (
                    <div className="text-center py-12">Loading featured products...</div>
                ) : error ? (
                    <div className="text-center text-red-600 py-12">{error}</div>
                ) : (
                    <FeaturedProducts products={filteredProducts} onAddToCart={productId => addToCart(productId, 1)} />
                )}
            </section>
            <section id="reviews">
                <Reviews />
            </section>
            <Footer />
            <MobileBottomNav />
            <WhatsAppChat />
            {/* Add bottom padding for mobile nav */}
            <div className="lg:hidden h-20"></div>
        </div>
    );
};

export default Index;
