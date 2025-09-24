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
                await removeFromWishlist(product.id ?? '');
            } else {
                await addToWishlist(product.id ?? '');
            }
        } catch (error) {
            console.error('Failed to toggle wishlist:', error);
        }
    };

    let imageUrl = '/placeholder-product.jpg';
    if (product.images && product.images.length > 0) {
        if (typeof product.images[0] === 'string') {
            imageUrl = product.images[0];
        } else {
            imageUrl = (product.images[0] as any).url;
        }
    }

    // Badge logic
    const isNew = product.isNew;
    const isOnSale = product.isOnSale;

    return (
        <div data-testid="product-card" className="product-card group relative bg-white/80 backdrop-blur-md rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 overflow-hidden border border-white/30 hover:border-cyan-400/50 transform hover:scale-100 md:hover:scale-105 hover:translate-y-0 md:-translate-y-1">
            {/* Badges */}
            <div className="hidden md:flex absolute top-2 left-2 md:top-3 md:left-3 z-10 flex flex-col gap-1">
                {isNew && <span className="bg-gradient-to-r from-green-400 to-green-600 text-white text-[10px] md:text-xs font-bold px-1 py-0.5 md:px-2 md:py-1 rounded shadow-lg shadow-green-500/50">NEW</span>}
                {isOnSale && <span className="bg-gradient-to-r from-pink-400 to-pink-600 text-white text-[10px] md:text-xs font-bold px-1 py-0.5 md:px-2 md:py-1 rounded shadow-lg shadow-pink-500/50">SALE</span>}
                {product.isOutOfStock && <span className="bg-gradient-to-r from-gray-400 to-gray-600 text-white text-[10px] md:text-xs font-bold px-1 py-0.5 md:px-2 md:py-1 rounded shadow-lg shadow-gray-500/50">Out of Stock</span>}
                {product.isLowStock && (
                    <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-white text-[10px] md:text-xs font-bold px-1 py-0.5 md:px-2 md:py-1 rounded shadow-lg shadow-orange-500/50">{product.stock} in stock</span>
                )}
            </div>

            {/* Action Buttons Overlay */}
            <div className="absolute top-1 right-1 md:top-3 md:right-3 z-10 flex flex-col gap-0.5 md:gap-2">
                {/* Wishlist Button */}
                <button
                    onClick={handleToggleWishlist}
                    disabled={wishlistLoading}
                    className={`p-1 md:p-2 rounded-full transition-all duration-300 shadow-lg ${isWishlisted
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
                        } ${wishlistLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    <LuHeart className="w-3 h-3 md:w-5 md:h-5" fill={isWishlisted ? 'white' : 'none'} />
                </button>

                {/* Product Details Button */}
                <Link
                    to={`/product/${product._id}`}
                    className="p-1 md:p-2 rounded-full bg-white/90 text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg"
                    aria-label="View product details"
                >
                    <LuEye className="w-3 h-3 md:w-5 md:h-5" />
                </Link>
            </div>

            {/* Product Image */}
            <div className="relative aspect-[3/2] overflow-hidden group">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>

            {/* Product Info */}
            <div className="p-1 md:p-3">
                <div className="mb-0.5 md:mb-1 flex flex-col gap-0.5 md:gap-1">
                    <h3 className="text-xs md:text-base font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-700 transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-[8px] md:text-xs text-gray-500">{product.category}</p>
                </div>

                {/* Short Description on hover/tap */}
                <div className="hidden md:group-hover:block text-xs md:text-sm text-gray-600 mb-0.5 md:mb-1 animate-fade-in">
                    {product.description?.slice(0, 40) || 'No description.'}
                    {product.description && product.description.length > 40 ? '...' : ''}
                </div>

                {/* Rating */}
                <div className="hidden md:flex items-center mb-0.5 md:mb-1">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <LuStar
                                key={i}
                                className={`w-2.5 h-2.5 md:w-3 md:h-3 ${i < (product.rating || 0)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                    {product.reviewCount && product.reviewCount > 0 && (
                        <span className="ml-1 text-[10px] md:text-xs text-gray-600">
                            ({product.reviewCount})
                        </span>
                    )}
                </div>

                {/* Price */}
                {product.price > 0 && (
                    <div className="mb-1 md:mb-2 flex items-center gap-1 md:gap-2">
                        <span className="text-base md:text-xl font-bold text-orange-500">
                            KES {product.price?.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                            <span className="ml-1 md:ml-2 text-xs md:text-sm text-gray-500 line-through">
                                KES {product.originalPrice.toLocaleString()}
                            </span>
                        )}
                    </div>
                )}

                {/* Stock Information */}
                {/* Remove stray 0 below price */}
                {/* <div className="hidden mb-1 md:mb-2">
                    <span className={`text-[10px] md:text-xs font-medium ${product.stock === 0 ? 'text-red-600' : product.stock < 10 ? 'text-orange-600' : 'text-green-600'}`}>
                        {product.stock === 0 ? 'Out of Stock' : product.stock < 10 ? `Only ${product.stock} left in stock` : `${product.stock} in stock`}
                    </span>
                </div> */}
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
