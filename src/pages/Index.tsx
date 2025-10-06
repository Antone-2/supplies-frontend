import Header from '../components/Header';
import Hero from '../components/Hero';
import SearchFilter from '../components/SearchFilter';
import FeaturedProducts from '../components/FeaturedProducts';
import Reviews from '../components/Reviews';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import WhatsAppChat from '../components/WhatsAppChat';
import SEOHead from '../components/SEOHead';
import NewsletterSubscription from '../components/NewsletterSubscription';
import { useState } from 'react';

const Index = () => {
  // Simulate loading state for demonstration (replace with actual loading logic if needed)
  const [loading] = useState(false);
  // Example: setLoading(true) while fetching initial data, then setLoading(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mt-4 text-medical-body">Loading MEDHELM Supplies...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <SEOHead
        title="MEDHELM - Medical Supplies Kenya"
        description="Quality medical supplies in Kenya. Fast delivery."
        keywords="medical supplies, equipment, Kenya, PPE"
      />
      <Header />
      <Hero />
      <SearchFilter />
      {/* Categories section disabled for better UX */}
      {/* <section id="categories">
        <Categories />
      </section> */}
      <section id="products">
        <FeaturedProducts />
      </section>

      <section id="reviews">
        <Reviews />
      </section>
      <Footer />
      <MobileBottomNav />
      <WhatsAppChat />
      {/* Add bottom padding for mobile nav */}
      <div className="lg:hidden h-18 safe-area-pb"></div>
    </div>
  );
};

export default Index;
