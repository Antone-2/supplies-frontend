// src/context/CartContext.tsx
import React, { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import apiClient from '@/config/apiClient';
import { useAuth } from './AuthContext';
import { v4 as uuidv4 } from 'uuid';

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
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const GUEST_CART_KEY = 'guest_cart';
const GUEST_ID_KEY = 'guest_id';

function getGuestId() {
  let guestId = localStorage.getItem(GUEST_ID_KEY);
  if (!guestId) {
    guestId = uuidv4();
    localStorage.setItem(GUEST_ID_KEY, guestId);
  }
  return guestId;
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, token } = useAuth();
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Guest cart helpers
  const getGuestCart = () => {
    try {
      const cart = localStorage.getItem(GUEST_CART_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch {
      return [];
    }
  };
  const setGuestCart = (items: CartProduct[]) => {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
  };

  const fetchCart = async () => {
    setLoading(true);
    if (!user || !token) {
      // For guest cart, fetch product details for each item to populate product info
      const guestCart = getGuestCart();
      const detailedItems = await Promise.all(
        guestCart.map(async (item: CartProduct) => {
          if (!item.product.name || !item.product.price) {
            try {
              const response = await apiClient.get(`/products/${item.product._id}`);
              const productData = response.data.data;
              return {
                ...item,
                product: {
                  _id: item.product._id,
                  name: productData.name,
                  price: productData.price,
                  imageUrl: productData.imageUrl,
                },
              };
            } catch {
              return item;
            }
          }
          return item;
        })
      );
      setCartItems(detailedItems);
      setLoading(false);
      return;
    }
    try {
      const guestId = getGuestId();
      const response = await apiClient.get('/cart', { params: { guestId } });
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
    // On login, optionally merge guest cart with user cart here
  }, [user]);

  // Add product to cart (quantity defaults to 1)
  const addToCart = async (productId: string, quantity = 1) => {
    if (!user || !token) {
      // Guest cart logic
      let items = getGuestCart();
      const idx = items.findIndex((item: CartProduct) => item.product._id === productId);
      if (idx > -1) {
        items[idx].quantity += quantity;
      } else {
        // Fetch product details to store full product info in guest cart
        const response = await apiClient.get(`/products/${productId}`);
        const productData = response.data;
        let imageUrl = '';
        if (productData.images && productData.images.length > 0) {
          imageUrl = productData.images[0].url;
        } else if (productData.image) {
          imageUrl = productData.image;
        }
        items.push({ _id: productId, product: { _id: productId, name: productData.name, price: productData.price, imageUrl }, quantity });
      }
      setGuestCart(items);
      setCartItems(items);
      return;
    }
    try {
      const guestId = getGuestId();
      await apiClient.post('/cart/add', { productId, quantity, guestId });
      await fetchCart();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add item to cart');
    }
  };

  // Update quantity of an item
  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user || !token) {
      let items = getGuestCart();
      const idx = items.findIndex((item: CartProduct) => item.product._id === productId);
      if (idx > -1) {
        items[idx].quantity = quantity;
        setGuestCart(items);
        setCartItems(items);
      }
      return;
    }
    try {
      const guestId = getGuestId();
      await apiClient.post('/cart/update', { productId, quantity, guestId });
      await fetchCart();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update quantity');
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId: string) => {
    if (!user || !token) {
      let items = getGuestCart();
      items = items.filter((item: CartProduct) => item.product._id !== productId);
      setGuestCart(items);
      setCartItems(items);
      return;
    }
    try {
      const guestId = getGuestId();
      await apiClient.post('/cart/remove', { productId, guestId });
      await fetchCart();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to remove item');
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!user || !token) {
      // Clear guest cart
      localStorage.removeItem(GUEST_CART_KEY);
      setCartItems([]);
      return;
    }
    try {
      const guestId = getGuestId();
      await apiClient.delete('/cart/clear', { data: { guestId } });
      setCartItems([]);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to clear cart');
    }
  };

  // Refresh cart data manually
  const refreshCart = async () => {
    await fetchCart();
  };

  return (
    <CartContext.Provider
      value={{ cartItems, loading, error, addToCart, updateQuantity, removeFromCart, clearCart, refreshCart }}
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
