// src/context/CartContext.tsx
import React, { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { toast } from '@/components/ui/sonner';
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
  items: CartProduct[];
  total: number;
  itemCount: number;
  wishlist: any[];
  loading: boolean;
  error: string | null;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
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
  const { user } = useAuth();
  // Use localStorage for token detection
  const token = localStorage.getItem('authToken');
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Placeholder for wishlist integration
  const [wishlist, setWishlist] = useState<any[]>([]);
  // Guest cart helpers
  // Only keep one declaration of getGuestCart and setGuestCart
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

  // Computed properties
  let items: CartProduct[] = cartItems;
  if (!user || !token) {
    items = getGuestCart();
  }
  const total = items.reduce((sum: number, item: CartProduct) => sum + ((item.product.price || 0) * item.quantity), 0);
  const itemCount = items.reduce((sum: number, item: CartProduct) => sum + item.quantity, 0);

  // Sync cartItems state with guest cart only in effect
  useEffect(() => {
    if (!user || !token) {
      const guestCart = getGuestCart();
      if (JSON.stringify(cartItems) !== JSON.stringify(guestCart)) {
        setCartItems(guestCart);
      }
    }
  }, [user, token]);

  // Placeholder wishlist methods
  const addToWishlist = async (productId: string) => {
    // Integrate with wishlist context or API
    setWishlist((prev) => [...prev, { _id: productId }]);
    toast.success('Product added to wishlist!');
  };
  const removeFromWishlist = async (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item._id !== productId));
  };

  // Guest cart helpers
  // (Removed duplicate declarations)

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
      let guestCart = getGuestCart();
      const idx = guestCart.findIndex((item: CartProduct) => item.product._id === productId);
      if (idx > -1) {
        guestCart[idx].quantity += quantity;
        toast.success('Product quantity updated in cart!');
      } else {
        // Try to fetch product details from API, fallback to local data
        let productData;
        let imageUrl = '';
        try {
          const response = await apiClient.get(`/products/${productId}`);
          productData = response.data;
          if (productData.images && productData.images.length > 0) {
            imageUrl = productData.images[0].url;
          } else if (productData.image) {
            imageUrl = productData.image;
          }
        } catch {
          // Fallback: product not found in API, do not add
        }
        if (productData) {
          guestCart.push({ _id: productId, product: { _id: productId, name: productData.name, price: productData.price, imageUrl }, quantity });
          toast.success('Product added to cart!');
        }
      }
      setGuestCart(guestCart);
      setCartItems([...guestCart]);
      return;
    }
    try {
      const guestId = getGuestId();
      await apiClient.post('/cart/add', { productId, quantity, guestId });
      await fetchCart();
      console.log('User cart updated via API'); // Debug logging
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add item to cart');
      console.error('Error adding to cart:', err); // Debug logging
    }
  };

  // Update quantity of an item
  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user || !token) {
      let guestCart = getGuestCart();
      const idx = guestCart.findIndex((item: CartProduct) => item.product._id === productId);
      if (idx > -1) {
        guestCart[idx].quantity = quantity;
        setGuestCart(guestCart);
        setCartItems([...guestCart]);
        console.log('[GuestCart] Updated quantity:', guestCart[idx]);
        console.log('[GuestCart] localStorage after update:', localStorage.getItem(GUEST_CART_KEY));
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
      let guestCart = getGuestCart();
      guestCart = guestCart.filter((item: CartProduct) => item.product._id !== productId);
      setGuestCart(guestCart);
      setCartItems([...guestCart]);
      console.log('[GuestCart] Removed product:', productId);
      console.log('[GuestCart] localStorage after remove:', localStorage.getItem(GUEST_CART_KEY));
      return;
    }
    try {
      const guestId = getGuestId();
      await apiClient.post('/cart/remove', { productId, guestId });
      await fetchCart();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to remove item');
    }
    // Log guest cart for debugging
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!user || !token) {
      // Clear guest cart
      localStorage.removeItem(GUEST_CART_KEY);
      setCartItems([]);
      console.log('[GuestCart] Cleared cart. localStorage:', localStorage.getItem(GUEST_CART_KEY));
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
      value={{
        cartItems,
        items,
        total,
        itemCount,
        wishlist,
        loading,
        error,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
        addToWishlist,
        removeFromWishlist,
      }}
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
