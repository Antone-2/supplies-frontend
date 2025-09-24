import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import medHelmLogo from '@/assets/medhelm-logo.svg';
import { useCart } from '@/context/cartContext';
import apiClient from '@/config/apiClient';
// import Button from '../components/Button';

const Checkout: React.FC = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.post('/orders');
      setSuccess(true);
      // Redirect to Pesapal payment page
      const paymentUrl = res.data?.paymentUrl;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        navigate('/checkout-confirmation');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <p className="text-green-600">Order placed successfully!</p>;
  }

  if (cartItems.length === 0) return (
    <div className="flex flex-col items-center my-12">
      <img src={medHelmLogo} alt="Medhelm Supplies Logo" className="h-20 mb-4" />
      <p>Your cart is empty.</p>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {/* You can add form fields for shipping/payment info here */}
      <p>Number of items: {cartItems.length}</p>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default Checkout;