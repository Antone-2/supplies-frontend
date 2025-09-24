import React, { useEffect, useState } from 'react';
// ...existing code...
import apiClient from '@/config/apiClient';

const CheckoutConfirmation: React.FC = () => {
  const [order] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // ...existing code...

  useEffect(() => {
    // Optionally fetch order details here if needed
    // setOrder(...)
  }, []);

  const handlePay = async () => {
    setLoading(true);
    setError('');
    try {
      // Call backend to initiate Pesapal payment
      const res = await apiClient.post('/orders/pay/pesapal', { orderId: order?._id });
      const { paymentUrl } = res.data;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        setError('Failed to get payment URL.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Payment initiation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
      {/* Show order details here if available */}
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded"
        onClick={handlePay}
        disabled={loading}
      >
        {loading ? 'Redirecting...' : 'Pay with Pesapal'}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default CheckoutConfirmation;
