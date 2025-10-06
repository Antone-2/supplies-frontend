import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '@/data/products';
import { toast } from 'sonner';

interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    wishlist: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    updateCartQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (id: number) => void;
    isInWishlist: (id: number) => boolean;
    isInCart: (id: number) => boolean;
    getCartItemQuantity: (id: number) => number;
    getTotalItems: () => number;
    getTotalPrice: () => number;
    syncWithBackend: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [wishlist, setWishlist] = useState<Product[]>([]);

    // Load cart and wishlist from localStorage on initialization
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            const savedWishlist = localStorage.getItem('wishlist');

            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                setCart(parsedCart);
            }

            if (savedWishlist) {
                const parsedWishlist = JSON.parse(savedWishlist);
                setWishlist(parsedWishlist);
            }
        } catch (error) {
            console.error('Error loading cart data from localStorage:', error);
            // Clear corrupted data
            localStorage.removeItem('cart');
            localStorage.removeItem('wishlist');
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }, [cart]);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        } catch (error) {
            console.error('Error saving wishlist to localStorage:', error);
        }
    }, [wishlist]);

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) {
                const newQuantity = existing.quantity + 1;
                toast.success(`${product.name}`, {
                    description: `Quantity updated to ${newQuantity} in cart`,
                    action: {
                        label: 'View Cart',
                        onClick: () => window.location.href = '/cart',
                    },
                });
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: newQuantity }
                        : item
                );
            } else {
                toast.success(`${product.name}`, {
                    description: 'Added to cart successfully',
                    action: {
                        label: 'View Cart',
                        onClick: () => window.location.href = '/cart',
                    },
                });
                return [...prev, { product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id: number) => {
        setCart(prev => {
            const item = prev.find(item => item.product.id === id);
            if (item) {
                toast.success('Item Removed', {
                    description: `${item.product.name} removed from cart`,
                    action: {
                        label: 'Undo',
                        onClick: () => addToCart(item.product),
                    },
                });
            }
            return prev.filter(item => item.product.id !== id);
        });
    };

    const updateCartQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }

        setCart(prev => {
            const item = prev.find(item => item.product.id === id);
            if (item) {
                toast.success('Quantity Updated', {
                    description: `${item.product.name} quantity changed to ${quantity}`,
                });
            }
            return prev.map(item =>
                item.product.id === id ? { ...item, quantity } : item
            );
        });
    };

    const clearCart = () => {
        const itemCount = getTotalItems();
        setCart([]);
        if (itemCount > 0) {
            toast.success('Cart Cleared', {
                description: `All ${itemCount} items removed from cart`,
            });
        }
    };

    const addToWishlist = (product: Product) => {
        setWishlist(prev => {
            if (prev.find(item => item.id === product.id)) {
                toast.info('Already in Wishlist', {
                    description: `${product.name} is already in your wishlist`,
                });
                return prev;
            }
            toast.success('Added to Wishlist', {
                description: `${product.name} saved for later`,
                action: {
                    label: 'View Wishlist',
                    onClick: () => window.location.href = '/wishlist',
                },
            });
            return [...prev, product];
        });
    };

    const removeFromWishlist = (id: number) => {
        setWishlist(prev => {
            const item = prev.find(item => item.id === id);
            if (item) {
                toast.success('Removed from Wishlist', {
                    description: `${item.name} removed from wishlist`,
                    action: {
                        label: 'Undo',
                        onClick: () => addToWishlist(item),
                    },
                });
            }
            return prev.filter(item => item.id !== id);
        });
    };

    const isInWishlist = (id: number) => {
        return wishlist.some(item => item.id === id);
    };

    const isInCart = (id: number) => {
        return cart.some(item => item.product.id === id);
    };

    const getCartItemQuantity = (id: number) => {
        const item = cart.find(item => item.product.id === id);
        return item ? item.quantity : 0;
    };

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const syncWithBackend = async () => {
        // Future implementation: sync cart with backend when user is authenticated
        try {
            const token = localStorage.getItem('authToken');
            if (token) {
                // TODO: Implement backend cart synchronization
                console.log('Cart sync with backend not yet implemented');
            }
        } catch (error) {
            console.error('Error syncing cart with backend:', error);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                wishlist,
                addToCart,
                removeFromCart,
                updateCartQuantity,
                clearCart,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                isInCart,
                getCartItemQuantity,
                getTotalItems,
                getTotalPrice,
                syncWithBackend,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
