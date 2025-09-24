import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import SearchFilter from '@/components/SearchFilter';
import ProductList from '@/components/ProductList';
import SEOHead from '@/components/SEOHead';

const Products = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');

    return (
        <div className="min-h-screen">
            <SEOHead
                title="All Products - MEDHELM Supplies Ltd"
                description="Browse our complete range of medical supplies and equipment. Quality diagnostic tools, surgical instruments, PPE, and medical supplies in Kenya."
                keywords="medical products Kenya, medical equipment catalog, healthcare supplies, buy medical supplies online"
            />
            <Header />

            <main className="pt-20">
                <div className="bg-muted/30 py-12">
                    <div className="container mx-auto px-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-medical-heading mb-4 text-center font-['Roboto']">
                            All Medical Products
                        </h1>
                        <p className="text-lg text-medical-body max-w-2xl mx-auto text-center font-['Roboto']">
                            Explore our comprehensive catalog of medical supplies and equipment,
                            trusted by healthcare professionals across Kenya.
                        </p>
                    </div>
                </div>

                <SearchFilter
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />

                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <ProductList
                            searchQuery={searchQuery}
                            selectedCategory={selectedCategory}
                            selectedPriceRange={selectedPriceRange}
                        />
                    </div>
                </section>
            </main>

            <Footer />
            <MobileBottomNav />
            <div className="lg:hidden h-20"></div>
        </div>
    );
};

export default Products;