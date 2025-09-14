import React, { useEffect, useState } from 'react';
import medHelmLogo from '@/assets/medhelm-logo.png';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { LuTrash2 } from 'react-icons/lu';

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
}

interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
}

const Cart: React.FC = () => {
  const { user, token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Fetch cart data
  const fetchCart = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await axios.get('/api/cart', {
        headers: { Authorization: `Bearer ${token ?? ''}` },
      });
      setCartItems(res.data.items || []);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  // Update quantity
  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    try {
      await axios.put(
        '/api/cart/update',
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token ?? ''}` } }
      );
      fetchCart();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update quantity');
    }
  };

  // Remove item
  const removeItem = async (productId: string) => {
    try {
      await axios.delete(`/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token ?? ''}` },
      });
      fetchCart();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to remove item');
    }
  };

  if (!user) {
    return <p className="text-center p-8">Please log in to view your cart.</p>;
  }

  if (loading) {
    return <p className="text-center p-8">Loading cart...</p>;
  }

  if (error) {
    return <p className="text-red-600 text-center p-8">{error}</p>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center flex flex-col items-center">
        <img src={medHelmLogo} alt="Medhelm Supplies Logo" className="h-20 mb-4" />
        <p className="text-xl">Your cart is empty.</p>
      </div>
    );
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-4 relative" style={{ minHeight: '80vh' }}>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="space-y-4 pb-24 overflow-y-auto" style={{ maxHeight: '60vh' }}>
        {cartItems.map(({ product, quantity }) => (
          <div
            key={product._id}
            className="flex items-center justify-between border-b py-4"
          >
            <div className="flex items-center space-x-4">
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <h2 className="font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-sm font-medium">
                  Price: KES {product.price.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) =>
                  updateQuantity(product._id, parseInt(e.target.value, 10))
                }
                className="w-16 text-center border rounded"
                aria-label={`Quantity for ${product.name}`}
              />
              <button
                onClick={() => removeItem(product._id)}
                className="text-red-600 hover:text-red-800 p-2"
                aria-label={`Remove ${product.name} from cart`}
              >
                <LuTrash2 className="h-5 w-5 text-red-500 cursor-pointer" onClick={() => removeItem(product._id)} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Fixed Pay Now button at bottom */}
      <div className="fixed left-0 right-0 bottom-0 bg-white border-t shadow-lg p-4 flex flex-col items-end z-40" style={{ maxWidth: '100vw' }}>
        <h3 className="text-xl font-semibold mb-2">
          Total: KES {total.toLocaleString()}
        </h3>
        <button
          onClick={() => setShowPaymentModal(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Pay Now
        </button>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Choose Payment Method</h2>
            {paymentError && <div className="text-red-600 mb-2">{paymentError}</div>}
            <button
              className="w-full mb-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              disabled={paymentLoading}
              onClick={async () => {
                setPaymentLoading(true);
                setPaymentError(null);
                try {
                  // Send subtotal to Pesapal for M-Pesa
                  const res = await axios.post(
                    '/api/v1/payment/pesapal/initiate',
                    {
                      amount: total,
                      currency: 'KES',
                      description: 'Cart Payment',
                      notification_id: `order-${Date.now()}`,
                      billing_phone: user?.phone || '',
                      billing_email: user?.email || '',
                      callback_url: window.location.origin + '/payment-callback',
                    },
                    { headers: { Authorization: `Bearer ${token ?? ''}` } }
                  );
                  // Redirect to Pesapal payment page (iframeUrl)
                  window.location.href = res.data.iframeUrl;
                  setShowPaymentModal(false);
                } catch (err: any) {
                  setPaymentError(err.response?.data?.message || 'Failed to initiate payment');
                } finally {
                  setPaymentLoading(false);
                }
              }}
            >
              Pay with M-Pesa
            </button>
            <button
              className="w-full mb-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              disabled={paymentLoading}
              onClick={async () => {
                setPaymentLoading(true);
                setPaymentError(null);
                try {
                  // Send subtotal to Pesapal for Airtel Money
                  const res = await axios.post(
                    '/api/v1/payment/pesapal/initiate',
                    {
                      amount: total,
                      currency: 'KES',
                      description: 'Cart Payment',
                      notification_id: `order-${Date.now()}`,
                      billing_phone: user?.phone || '',
                      billing_email: user?.email || '',
                      callback_url: window.location.origin + '/payment-callback',
                    },
                    { headers: { Authorization: `Bearer ${token ?? ''}` } }
                  );
                  // Redirect to Pesapal payment page (iframeUrl)
                  window.location.href = res.data.iframeUrl;
                  setShowPaymentModal(false);
                } catch (err: any) {
                  setPaymentError(err.response?.data?.message || 'Failed to initiate payment');
                } finally {
                  setPaymentLoading(false);
                }
              }}
            >
              Pay with Airtel Money
            </button>
            <button
              className="w-full px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              onClick={() => setShowPaymentModal(false)}
              disabled={paymentLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
