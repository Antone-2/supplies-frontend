// src/context/CartContext.tsx
import React, { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import apiClient from '@/config/apiClient';
import { useAuth } from './AuthContext';

interface CartProduct {
  _id: string;
  product: {
    _id: string;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
  };
  quantity: number;
}

interface CartContextType {
  cartItems: CartProduct[];
  loading: boolean;
  error: string | null;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, token } = useAuth();
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async () => {
    if (!user || !token) {
      setCartItems([]);
      return;
    }
    setLoading(true);
    try {
      const response = await apiClient.get('/cart');
      setCartItems(response.data.items || []);
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

  // Add product to cart (quantity defaults to 1)
  const addToCart = async (productId: string, quantity = 1) => {
    if (!user || !token) {
      setError('You must be logged in to add items to cart.');
      return;
    }
    try {
      await apiClient.post('/cart/add', { productId, quantity });
      await fetchCart();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add item to cart');
    }
  };

  // Update quantity of an item
  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user || !token) return;
    try {
      await apiClient.put('/cart/update', { productId, quantity });
      await fetchCart();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update quantity');
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId: string) => {
    if (!user || !token) return;
    try {
      await apiClient.delete(`/cart/remove/${productId}`);
      await fetchCart();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to remove item');
    }
  };

  // Refresh cart data manually
  const refreshCart = async () => {
    await fetchCart();
  };

  return (
    <CartContext.Provider
      value={{ cartItems, loading, error, addToCart, updateQuantity, removeFromCart, refreshCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
