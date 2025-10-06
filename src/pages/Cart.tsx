// import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import MobileBottomNav from '@/components/MobileBottomNav';

const CartPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-medical-heading mb-2">
              Shopping Cart
            </h1>
            <p className="text-medical-body">
              Review and manage items in your shopping cart
            </p>
          </div>

          <Cart />
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default CartPage;