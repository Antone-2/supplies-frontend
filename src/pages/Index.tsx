import Header from '@/components/Header';
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
        fetch(`${import.meta.env.VITE_API_URL}/products/featured/all`)
            .then(res => res.json())
            .then(data => {
                if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
                    setFeaturedProducts(data.data);
                } else {
                    // Fallback demo products
                    setFeaturedProducts([
                        {
                            _id: "64e1a1f2c1a4b2a1c1a4b2a1",
                            name: "Digital Blood Pressure Monitor",
                            brand: "Omron",
                            price: 8500,
                            originalPrice: 10000,
                            rating: 4.8,
                            reviews: 156,
                            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
                            inStock: true,
                            isNew: false,
                            discount: 15
                        },
                        {
                            _id: "64e1a1f2c1a4b2a1c1a4b2a2",
                            name: "Infrared Thermometer",
                            brand: "Beurer",
                            price: 3200,
                            originalPrice: 3200,
                            rating: 4.9,
                            reviews: 203,
                            image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop",
                            inStock: true,
                            isNew: true,
                            discount: 0
                        },
                        {
                            _id: "64e1a1f2c1a4b2a1c1a4b2a3",
                            name: "Pulse Oximeter",
                            brand: "ChoiceMMed",
                            price: 2800,
                            originalPrice: 3500,
                            rating: 4.7,
                            reviews: 89,
                            image: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&h=300&fit=crop",
                            inStock: true,
                            isNew: false,
                            discount: 20
                        },
                        {
                            _id: "64e1a1f2c1a4b2a1c1a4b2a4",
                            name: "Stethoscope Classic III",
                            brand: "3M Littmann",
                            price: 15000,
                            originalPrice: 15000,
                            rating: 4.9,
                            reviews: 342,
                            image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",
                            inStock: true,
                            isNew: false,
                            discount: 0
                        }
                    ]);
                }
                setLoading(false);
            })
            .catch(() => {
                // Fallback demo products on error
                setFeaturedProducts([
                    {
                        _id: "64e1a1f2c1a4b2a1c1a4b2a1",
                        name: "Digital Blood Pressure Monitor",
                        brand: "Omron",
                        price: 8500,
                        originalPrice: 10000,
                        rating: 4.8,
                        reviews: 156,
                        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
                        inStock: true,
                        isNew: false,
                        discount: 15
                    },
                    {
                        _id: "64e1a1f2c1a4b2a1c1a4b2a2",
                        name: "Infrared Thermometer",
                        brand: "Beurer",
                        price: 3200,
                        originalPrice: 3200,
                        rating: 4.9,
                        reviews: 203,
                        image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop",
                        inStock: true,
                        isNew: true,
                        discount: 0
                    },
                    {
                        _id: "64e1a1f2c1a4b2a1c1a4b2a3",
                        name: "Pulse Oximeter",
                        brand: "ChoiceMMed",
                        price: 2800,
                        originalPrice: 3500,
                        rating: 4.7,
                        reviews: 89,
                        image: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&h=300&fit=crop",
                        inStock: true,
                        isNew: false,
                        discount: 20
                    },
                    {
                        _id: "64e1a1f2c1a4b2a1c1a4b2a4",
                        name: "Stethoscope Classic III",
                        brand: "3M Littmann",
                        price: 15000,
                        originalPrice: 15000,
                        rating: 4.9,
                        reviews: 342,
                        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",
                        inStock: true,
                        isNew: false,
                        discount: 0
                    }
                ]);
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
            <Header />
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
