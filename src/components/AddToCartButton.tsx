import React, { useState } from 'react';
import { ShoppingCart, Plus } from 'lucide-react';
import { Button } from './ui/button';

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
  onAddToCart?: (productId: string) => void;
  className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId,
  productName,
  price,
  onAddToCart,
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // In a real app, this would make an API call to add to cart
      console.log(`Added ${productName} to cart`);

      if (onAddToCart) {
        onAddToCart(productId);
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isLoading}
      className={`w-full ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          Adding...
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
          <span className="ml-1 font-semibold">${price.toFixed(2)}</span>
        </div>
      )}
    </Button>
  );
};

export default AddToCartButton;
