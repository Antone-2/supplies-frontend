import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Star,
    ShoppingCart,
    Heart,
    Truck,
    Shield,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/cartContext';
import { toast } from 'sonner';

interface ProductDetailsProps {
    product: Product | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const ProductDetails = ({ product, open, onOpenChange }: ProductDetailsProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useCart();

    // Check if product is in wishlist
    const isInWishlist = (id: number) => wishlist.some((item: any) => item._id === id.toString());

    if (!product) return null;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0
        }).format(price);
    };

    const handleAddToCart = () => {
        addToCart(product.id.toString());
        toast.success(`${product.name} added to cart!`);
    };

    const toggleWishlist = () => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id.toString());
            toast.success(`${product.name} removed from wishlist`);
        } else {
            addToWishlist(product.id.toString());
            toast.success(`${product.name} added to wishlist!`);
        }
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === product.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{product.name}</DialogTitle>
                </DialogHeader>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="relative">
                            <img
                                src={product.images[currentImageIndex]}
                                alt={product.name}
                                className="w-full h-80 object-cover rounded-lg"
                            />

                            {product.images.length > 1 && (
                                <>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                                        onClick={prevImage}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                                        onClick={nextImage}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </>
                            )}

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
                        </div>

                        {/* Thumbnail gallery */}
                        {product.images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${index === currentImageIndex ? 'border-primary' : 'border-border'
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-muted-foreground">{product.brand}</p>
                            <h2 className="text-2xl font-bold text-medical-heading">{product.name}</h2>
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
                                {product.rating} ({product.reviews} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-primary">
                                {formatPrice(product.price)}
                            </span>
                            {product.discount > 0 && (
                                <span className="text-lg text-muted-foreground line-through">
                                    {formatPrice(product.originalPrice)}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="font-semibold mb-2">Description</h3>
                            <p className="text-muted-foreground">{product.description}</p>
                        </div>

                        {/* Features */}
                        <div>
                            <h3 className="font-semibold mb-2">Key Features</h3>
                            <ul className="space-y-1">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="text-sm text-muted-foreground flex items-center">
                                        <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Separator />

                        {/* Delivery & Warranty */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Truck className="h-4 w-4" />
                                <span>Free Delivery</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Shield className="h-4 w-4" />
                                <span>1 Year Warranty</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2">
                            <Button
                                className="w-full"
                                size="lg"
                                disabled={!product.inStock}
                                onClick={handleAddToCart}
                            >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Add to Cart
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={toggleWishlist}
                            >
                                <Heart
                                    className={`mr-2 h-4 w-4 ${isInWishlist(product.id) ? 'text-red-500 fill-current' : ''
                                        }`}
                                />
                                {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProductDetails;