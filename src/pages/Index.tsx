import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SearchFilter from '@/components/SearchFilter';
import Categories from '@/components/Categories';
import FeaturedProducts from '@/components/FeaturedProducts';
import Reviews from '@/components/Reviews';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import { useEffect, useState } from 'react';
// Custom hook to detect mobile viewport
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return isMobile;
}
import SEOHead from '@/components/SEOHead';



const Index = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    // Optionally, pass products if needed for live search
    return (
        <div className="min-h-screen">
            <SEOHead
                title="MEDHELM Supplies Ltd - Quality Medical Equipment Kenya"
                description="Premium medical supplies and equipment in Kiambu Town, Kenya. Serving healthcare providers with quality diagnostic tools, surgical instruments, and medical supplies."
                keywords="medical supplies Kenya, medical equipment Kiambu, healthcare supplies, surgical instruments, diagnostic tools, PPE Kenya"
            />
            <Header />
            <Hero />
            <SearchFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            {!useIsMobile() && (
                <section id="categories">
                    <Categories />
                </section>
            )}
            <section id="products" className={useIsMobile() ? 'mt-2' : ''}>
                <FeaturedProducts />
            </section>
            <section id="reviews">
                <Reviews />
            </section>
            <Footer />
            {useIsMobile() && <MobileBottomNav />}
            {/* Add bottom padding for mobile nav */}
            {useIsMobile() && <div className="h-18 safe-area-pb"></div>}
        </div>
    );
};

export default Index;