import { useState } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

import {
    Star,
    ShoppingCart,
    Heart,
    Eye,
    Truck,
    Shield
} from 'lucide-react';
import { useWishlist } from '@/context/wishlistContext';
import { useCart } from '@/context/cartContext';

export const featuredProducts = [
    {
        id: 1,
        name: "Digital Blood Pressure Monitor",
        brand: "Omron",
        price: 8500,
        originalPrice: 10000,
        rating: 4.8,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
        inStock: true,
        isNew: false,
        discount: 15
    },
    {
        id: 2,
        name: "Infrared Thermometer",
        brand: "Beurer",
        price: 3200,
        originalPrice: 3200,
        rating: 4.9,
        reviews: 203,
        image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop",
        inStock: true,
        isNew: true,
        discount: 0
    },
    {
        id: 3,
        name: "Pulse Oximeter",
        brand: "ChoiceMMed",
        price: 2800,
        originalPrice: 3500,
        rating: 4.7,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&h=300&fit=crop",
        inStock: true,
        isNew: false,
        discount: 20
    },
    {
        id: 4,
        name: "Stethoscope Classic III",
        brand: "3M Littmann",
        price: 15000,
        originalPrice: 15000,
        rating: 4.9,
        reviews: 342,
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",
        inStock: true,
        isNew: false,
        discount: 0
    }
];

interface FeaturedProductsProps {
    products: any[];
    onAddToCart: (productId: string) => void;
}

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
    const { addToWishlist, loading: wishlistLoading, error: wishlistError } = useWishlist();
    const { addToCart, loading: cartLoading, error: cartError } = useCart();
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);

    const handleAddToWishlist = async (product: any) => {
        await addToWishlist(product._id || product.id);
        setSuccessMsg('Added to wishlist!');
        setShowToast(true);
        setTimeout(() => { setShowToast(false); setSuccessMsg(null); }, 1800);
    };
    const handleAddToCart = async (product: any) => {
        await addToCart(product._id || product.id, 1);
        setSuccessMsg('Added to cart!');
        setShowToast(true);
        setTimeout(() => { setShowToast(false); setSuccessMsg(null); }, 1800);
    };
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-medical-heading mb-4">
                        Featured Products
                    </h2>
                    <p className="text-lg text-medical-body max-w-2xl mx-auto">
                        Discover our most popular and trusted medical equipment, chosen by healthcare
                        professionals across Kenya for their reliability and quality.
                    </p>
                </div>

                {/* Toast for feedback */}
                {showToast && (
                    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-2 rounded shadow-lg animate-fade-in-out">
                        {successMsg}
                    </div>
                )}
                {cartError && <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-red-600 text-white px-6 py-2 rounded shadow-lg animate-fade-in-out">{cartError}</div>}
                {wishlistError && <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-red-600 text-white px-6 py-2 rounded shadow-lg animate-fade-in-out">{wishlistError}</div>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <Card key={product._id || product.id} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white rounded-xl overflow-hidden relative">
                            <div className="relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-xl"
                                />
                                {/* Badges */}
                                <div className="absolute top-3 left-3 flex flex-col gap-1">
                                    {product.isNew && (
                                        <Badge className="bg-accent text-accent-foreground">NEW</Badge>
                                    )}
                                    {product.discount > 0 && (
                                        <Badge className="bg-secondary text-secondary-foreground">
                                            -{product.discount}%
                                        </Badge>
                                    )}
                                </div>
                                {/* Quick actions */}
                                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-pink-100" onClick={() => handleAddToWishlist(product)} disabled={wishlistLoading} aria-label="Add to Wishlist">
                                                <Heart className="h-5 w-5 text-pink-500" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Add to Wishlist
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link to={`/product/${product._id || product.id}`} className="h-8 w-8 p-0 flex items-center justify-center rounded bg-secondary hover:bg-secondary/80 transition-colors" aria-label="View Details">
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            View Details
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                                {/* Stock indicator */}
                                {!product.inStock && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <Badge variant="destructive">Out of Stock</Badge>
                                    </div>
                                )}
                            </div>
                            <CardContent className="p-6">
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-muted-foreground">{product.brand}</p>
                                        <h3 className="font-semibold text-medical-heading group-hover:text-primary transition-colors">
                                            {product.name}
                                        </h3>
                                    </div>
                                    {/* Rating */}
                                    <div className="flex items-center gap-2">
                                        <div className="flex">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${i < Math.floor(product.rating)
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-muted-foreground">
                                            {product.rating} ({product.reviews})
                                        </span>
                                    </div>
                                    {/* Price */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-bold text-primary">
                                            {formatPrice(product.price)}
                                        </span>
                                        {product.discount > 0 && (
                                            <span className="text-sm text-muted-foreground line-through">
                                                {formatPrice(product.originalPrice)}
                                            </span>
                                        )}
                                    </div>
                                    {/* Features */}
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Truck className="h-3 w-3" />
                                            <span>Free Delivery</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Shield className="h-3 w-3" />
                                            <span>Warranty</span>
                                        </div>
                                    </div>
                                    {/* Add to cart button */}
                                    <Button
                                        className="w-full flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 transition-colors text-base font-semibold py-2 rounded-lg shadow"
                                        disabled={!product.inStock || cartLoading}
                                        onClick={() => handleAddToCart(product)}
                                        aria-label="Add to Cart"
                                    >
                                        <ShoppingCart className="h-5 w-5" />
                                        {cartLoading ? 'Adding...' : 'Add to Cart'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
                        <Link to={{ pathname: "/shop" }} state={{ resetFilters: true }}>View All Products</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;