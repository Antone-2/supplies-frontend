import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/cartContext';
import CartSheet from './CartSheet';
import { ShoppingCart } from 'lucide-react';

interface CartIconProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const CartIcon: React.FC<CartIconProps> = ({ className = '', size = 'md' }) => {
    const [cartOpen, setCartOpen] = useState(false);
    const { cartItems, itemCount } = useCart();
    const cartCount = itemCount; // Use the computed itemCount from context

    // Size configurations
    const sizeConfig = {
        sm: { icon: 'h-4 w-4', button: 'w-8 h-8', badge: 'h-4 w-4' },
        md: { icon: 'h-5 w-5', button: 'w-10 h-10', badge: 'h-5 w-5' },
        lg: { icon: 'h-6 w-6', button: 'w-12 h-12', badge: 'h-6 w-6' }
    };

    const config = sizeConfig[size];

    // Debug logging
    useEffect(() => {
        console.log('CartIcon - cartItems updated:', cartItems);
        console.log('CartIcon - itemCount:', itemCount);
        console.log('CartIcon - cartCount:', cartCount);
    }, [cartItems, itemCount, cartCount]);

    return (
        <>
            <button
                className={`relative flex items-center justify-center ${config.button} rounded-full bg-transparent text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${className}`}
                aria-label="Open Cart"
                onClick={() => setCartOpen(true)}
            >
                <ShoppingCart className={config.icon} />
                {cartCount > 0 && (
                    <span
                        data-testid="cart-count"
                        className={`absolute -top-2 -right-3 flex items-center justify-center ${config.badge} rounded-full bg-red-600 text-white text-xs font-bold border-2 border-white shadow`}
                        style={{ fontSize: '0.8rem' }}
                    >
                        {cartCount}
                    </span>
                )}
            </button>
            <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
        </>
    );
};

export default CartIcon;
