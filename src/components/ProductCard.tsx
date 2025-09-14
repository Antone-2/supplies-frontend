import React from 'react';
import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
import { LuHeart, LuEye, LuStar } from 'react-icons/lu';
import { useAuth } from '../hooks/use-auth';
import { useWishlist } from '@/context/wishlistContext';
import { Product } from '../types/product';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { user } = useAuth();
    const { wishlist, addToWishlist, removeFromWishlist, loading: wishlistLoading } = useWishlist();

    const isWishlisted = wishlist.some(item => item._id === product._id);

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

    const imageUrl = product.images?.[0]?.url || '/placeholder-product.jpg';

    // Badge logic
    const isNew = product.createdAt && (Date.now() - new Date(product.createdAt).getTime()) < 1000 * 60 * 60 * 24 * 14; // 2 weeks
    const isOnSale = product.originalPrice && product.price < product.originalPrice;

    return (
        <div data-testid="product-card" className="product-card group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                {isNew && <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded shadow">NEW</span>}
                {isOnSale && <span className="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded shadow">SALE</span>}
                {product.stock === 0 && <span className="bg-gray-400 text-white text-xs font-bold px-2 py-1 rounded shadow">Out of Stock</span>}
                {product.stock > 0 && product.stock < 10 && (
                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded shadow">Only {product.stock} left</span>
                )}
            </div>

            {/* Action Buttons Overlay */}
            <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                {/* Wishlist Button */}
                <button
                    onClick={handleToggleWishlist}
                    disabled={wishlistLoading}
                    className={`p-2 rounded-full transition-all duration-300 shadow-lg ${isWishlisted
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
                        } ${wishlistLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    <LuHeart className="w-5 h-5" fill={isWishlisted ? 'white' : 'none'} />
                </button>

                {/* Product Details Button */}
                <Link
                    to={`/product/${product._id}`}
                    className="p-2 rounded-full bg-white/90 text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg"
                    aria-label="View product details"
                >
                    <LuEye className="w-5 h-5" />
                </Link>
            </div>

            {/* Product Image */}
            <div className="relative aspect-[4/3] overflow-hidden group">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>

            {/* Product Info */}
            <div className="p-3">
                <div className="mb-1 flex flex-col gap-1">
                    <h3 className="text-base font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-700 transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-xs text-gray-500">{product.category}</p>
                </div>

                {/* Short Description on hover/tap */}
                <div className="hidden group-hover:block text-sm text-gray-600 mb-1 animate-fade-in">
                    {product.description?.slice(0, 60) || 'No description.'}
                    {product.description && product.description.length > 60 ? '...' : ''}
                </div>

                {/* Rating */}
                <div className="flex items-center mb-1">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <LuStar
                                key={i}
                                className={`w-3 h-3 ${i < (product.rating || 0)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="ml-1 text-xs text-gray-600">
                        ({product.reviewCount || 0})
                    </span>
                </div>

                {/* Price */}
                <div className="mb-2 flex items-center gap-2">
                    <span className="text-xl font-bold text-orange-500">
                        KES {product.price?.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                            KES {product.originalPrice.toLocaleString()}
                        </span>
                    )}
                </div>

                {/* Stock Information */}
                <div className="mb-2">
                    <span className={`text-xs font-medium ${product.stock === 0 ? 'text-red-600' : product.stock < 10 ? 'text-orange-600' : 'text-green-600'}`}>
                        {product.stock === 0 ? 'Out of Stock' : product.stock < 10 ? `Only ${product.stock} left in stock` : `${product.stock} in stock`}
                    </span>
                </div>
            </div>



            {/* Animations */}
            <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.5s; }
            `}</style>
        </div>
    );
};

export default ProductCard;
