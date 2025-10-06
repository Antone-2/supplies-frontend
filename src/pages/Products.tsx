import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import WhatsAppChat from '@/components/WhatsAppChat';
import SearchFilter from '@/components/SearchFilter';
import ProductList from '@/components/ProductList';
import SEOHead from '@/components/SEOHead';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  // Loading state handled in ProductList
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Products - MEDHELM"
        description="Shop medical supplies and equipment."
        keywords="medical products, equipment, Kenya"
      />
      <Header />

      <main className="pt-20">
        <div className="bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-medical-heading mb-4 text-center">
              Products
            </h1>
            <p className="text-lg text-medical-body max-w-2xl mx-auto text-center">
              Shop medical supplies and equipment.
            </p>
          </div>
        </div>

        <SearchFilter />

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
      <WhatsAppChat />
      <div className="lg:hidden h-20"></div>
    </div>
  );
};

export default Products;