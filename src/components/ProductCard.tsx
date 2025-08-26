import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Check } from 'lucide-react';
import { useAuth } from '../hooks/use-auth';
import { useCart } from '@/context/cartContext';
import { useWishlist } from '@/context/wishlistContext';
import { Product } from '../types/product';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [showQuickView, setShowQuickView] = useState(false);

    const { user } = useAuth();
    const { addToCart, loading: cartLoading } = useCart();
    const { wishlist, addToWishlist, removeFromWishlist, loading: wishlistLoading } = useWishlist();

    const isWishlisted = wishlist.some(item => item._id === product._id);

    const handleAddToCart = async () => {
        if (!user) {
            alert('Please login to add items to cart');
            return;
        }

        try {
            await addToCart(product._id, quantity);
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    const handleToggleWishlist = async () => {
        if (!user) {
            alert('Please login to manage wishlist');
            return;
        }

        try {
            if (isWishlisted) {
                await removeFromWishlist(product._id);
            } else {
                await addToWishlist(product._id);
            }
        } catch (error) {
            console.error('Failed to toggle wishlist:', error);
        }
    };

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(Math.max(1, Math.min(newQuantity, product.stock || 100)));
    };

    const imageUrl = product.images?.[0]?.url || '/placeholder-product.jpg';

    // Badge logic
    const isNew = product.createdAt && (Date.now() - new Date(product.createdAt).getTime()) < 1000 * 60 * 60 * 24 * 14; // 2 weeks
    const isOnSale = product.originalPrice && product.price < product.originalPrice;

    return (
        <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                {isNew && <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded shadow">NEW</span>}
                {isOnSale && <span className="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded shadow">SALE</span>}
                {product.stock === 0 && <span className="bg-gray-400 text-white text-xs font-bold px-2 py-1 rounded shadow">Out of Stock</span>}
                {product.stock > 0 && product.stock < 10 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow">Only {product.stock} left</span>
                )}
            </div>

            {/* Wishlist Button */}
            <button
                onClick={handleToggleWishlist}
                disabled={wishlistLoading}
                className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300 shadow ${isWishlisted
                    ? 'bg-red-500 text-white'
                    : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                    } ${wishlistLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
                <Heart className="w-4 h-4" fill={isWishlisted ? 'white' : 'none'} />
            </button>

            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden group">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Quick View Button */}
                <button
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 text-blue-600 px-4 py-1 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-semibold"
                    onClick={() => setShowQuickView(true)}
                >
                    Quick View
                </button>
            </div>

            {/* Product Info */}
            <div className="p-4">
                <div className="mb-2 flex flex-col gap-1">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-700 transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-xs text-gray-500">{product.category}</p>
                </div>

                {/* Short Description on hover/tap */}
                <div className="hidden group-hover:block text-sm text-gray-600 mb-2 animate-fade-in">
                    {product.description?.slice(0, 60) || 'No description.'}
                    {product.description && product.description.length > 60 ? '...' : ''}
                </div>

                {/* Rating */}
                <div className="flex items-center mb-2">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < (product.rating || 0)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                        ({product.reviewCount || 0})
                    </span>
                </div>

                {/* Price */}
                <div className="mb-3 flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                        KES {product.price?.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                            KES {product.originalPrice.toLocaleString()}
                        </span>
                    )}
                </div>

                {/* Quantity Selector */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                    </label>
                    <div className="flex items-center">
                        <button
                            onClick={() => handleQuantityChange(quantity - 1)}
                            className="px-3 py-1 border border-gray-300 rounded-l-md hover:bg-gray-50"
                            disabled={quantity <= 1}
                            aria-label="Decrease quantity"
                        >
                            -
                        </button>
                        <span className="px-4 py-1 border-t border-b border-gray-300">
                            {quantity}
                        </span>
                        <button
                            onClick={() => handleQuantityChange(quantity + 1)}
                            className="px-3 py-1 border border-gray-300 rounded-r-md hover:bg-gray-50"
                            disabled={!!product.stock && quantity >= (product.stock || 1)}
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                    <button
                        onClick={handleAddToCart}
                        disabled={cartLoading || product.stock === 0}
                        className={`w-full py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${addedToCart
                            ? 'bg-green-600 text-white'
                            : product.stock === 0
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            } ${cartLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        aria-label={product.stock === 0 ? 'Out of stock' : 'Add to cart'}
                    >
                        {cartLoading ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : addedToCart ? (
                            <>
                                <Check className="w-4 h-4" />
                                Added!
                            </>
                        ) : product.stock === 0 ? (
                            'Out of Stock'
                        ) : (
                            <>
                                <ShoppingCart className="w-4 h-4" />
                                Add to Cart
                            </>
                        )}
                    </button>
                    <Link
                        to={`/product/${product._id}`}
                        className="w-full block py-2 px-4 rounded-lg border border-blue-600 text-blue-600 text-center hover:bg-blue-50 transition-colors duration-200"
                    >
                        View Details
                    </Link>
                </div>
            </div>

            {/* Quick View Modal */}
            {showQuickView && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-fade-in">
                        <button
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
                            onClick={() => setShowQuickView(false)}
                            aria-label="Close quick view"
                        >
                            &times;
                        </button>
                        <img src={imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-xl mb-4" />
                        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                        <div className="mb-2 text-gray-600">{product.description || 'No description.'}</div>
                        <div className="mb-2 flex items-center gap-2">
                            <span className="text-xl font-bold text-blue-700">KES {product.price?.toLocaleString()}</span>
                            {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">KES {product.originalPrice.toLocaleString()}</span>
                            )}
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < (product.rating || 0)
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                        }`}
                                />
                            ))}
                            <span className="text-sm text-gray-600">({product.reviewCount || 0})</span>
                        </div>
                        <button
                            onClick={() => { setShowQuickView(false); handleAddToCart(); }}
                            disabled={cartLoading || product.stock === 0}
                            className={`w-full py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${addedToCart
                                ? 'bg-green-600 text-white'
                                : product.stock === 0
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                } ${cartLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <ShoppingCart className="w-4 h-4" />
                            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            )}

            {/* Animations */}
            <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.5s; }
            `}</style>
        </div>
    );
};

export default ProductCard;
