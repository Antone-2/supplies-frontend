import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Heart, ShoppingCart, Loader2 } from 'lucide-react';
import { useCart } from '../hooks/use-cart';
import { useWishlist } from '../context/wishlistContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

interface AddToBothButtonProps {
    productId: string;
    productName: string;
    price: number;
    imageUrl?: string;
    className?: string;
}

const AddToBothButton: React.FC<AddToBothButtonProps> = ({
    productId,
    productName,
    // ...existing code...
    className = ''
}) => {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
    const { user } = useAuth();
    const [cartLoading, setCartLoading] = useState(false);
    const [wishlistLoading, setWishlistLoading] = useState(false);

    const isInWishlist = wishlist.some(item => item._id === productId);

    const handleAddToCart = async () => {
        setCartLoading(true);
        try {
            await addToCart(productId, 1);
            toast.success(`${productName} added to cart!`);
        } catch (error) {
            toast.error('Failed to add to cart');
        } finally {
            setCartLoading(false);
        }
    };

    const handleAddToWishlist = async () => {
        if (!user) {
            toast.error('Please login to add to wishlist');
            return;
        }

        setWishlistLoading(true);
        try {
            if (isInWishlist) {
                // Remove from wishlist
                await removeFromWishlist(productId);
                toast.success(`${productName} removed from wishlist!`);
            } else {
                // Add to wishlist
                await addToWishlist(productId);
                toast.success(`${productName} added to wishlist!`);
            }
        } catch (error) {
            toast.error('Failed to update wishlist');
        } finally {
            setWishlistLoading(false);
        }
    };

    return (
        <div className={`flex gap-2 ${className}`}>
            <Button
                onClick={handleAddToCart}
                disabled={cartLoading}
                className="flex-1"
                variant="default"
            >
                {cartLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                    <ShoppingCart className="h-4 w-4 mr-2" />
                )}
                Add to Cart
            </Button>

            <Button
                onClick={handleAddToWishlist}
                disabled={wishlistLoading}
                variant={isInWishlist ? "secondary" : "outline"}
                className="px-3"
            >
                {wishlistLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current text-red-500' : ''}`} />
                )}
            </Button>
        </div>
    );
};

export default AddToBothButton;
