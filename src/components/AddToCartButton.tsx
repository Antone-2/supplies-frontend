import React, { useState } from 'react';
import { useCart } from '@/context/cartContext';
import { useAuth } from '../hooks/use-auth';
import { LuShoppingCart, LuCheck } from 'react-icons/lu';

interface AddToCartButtonProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image?: string;
    stock?: number;
  };
  quantity?: number;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  quantity = 1,
  className = '',
  variant = 'primary'
}) => {
  const { addToCart, cartItems } = useCart();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Check if product is already in cart
  // cartItems is already the array
  const isInCart = cartItems.some(item => item.product._id === product._id);
  const currentQuantityInCart = cartItems.find(item => item.product._id === product._id)?.quantity || 0;

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    if (product.stock && product.stock < (currentQuantityInCart + quantity)) {
      alert(`Only ${product.stock} items available. You already have ${currentQuantityInCart} in cart.`);
      return;
    }

    setIsLoading(true);
    try {
      await addToCart(product._id, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart');
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonStyles = () => {
    const baseStyles = 'flex items-center justify-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    if (isAdded) {
      return `${baseStyles} bg-green-600 text-white hover:bg-green-700`;
    }

    if (isInCart) {
      return `${baseStyles} bg-green-500 text-white hover:bg-green-600`;
    }

    switch (variant) {
      case 'primary':
        return `${baseStyles} bg-blue-600 text-white hover:bg-blue-700`;
      case 'secondary':
        return `${baseStyles} bg-gray-600 text-white hover:bg-gray-700`;
      case 'outline':
        return `${baseStyles} border border-blue-600 text-blue-600 hover:bg-blue-50`;
      default:
        return `${baseStyles} bg-blue-600 text-white hover:bg-blue-700`;
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading || Boolean(product.stock && product.stock < (currentQuantityInCart + quantity))}
      className={`${getButtonStyles()} ${className}`}
    >
      {isAdded ? (
        <>
          <LuCheck size={18} />
          <span>Added!</span>
        </>
      ) : isInCart ? (
        <>
          <LuShoppingCart size={18} />
          <span>In Cart ({currentQuantityInCart})</span>
        </>
      ) : (
        <>
          <LuShoppingCart size={18} />
          <span>{isLoading ? 'Adding...' : 'Add to Cart'}</span>
        </>
      )}
    </button>
  );
};

export default AddToCartButton;
