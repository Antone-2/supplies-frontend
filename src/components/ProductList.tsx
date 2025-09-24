import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Star,
    ShoppingCart,
    Heart,
    Eye,
    Truck,
    Shield
} from 'lucide-react';
import productService, { Product } from '@/services/productService';
import { useCart } from '@/context/cartContext';
import { toast } from 'sonner';
import ProductDetails from './ProductDetails';

interface ProductListProps {
    searchQuery?: string;
    selectedCategory?: string;
    selectedPriceRange?: string;
}

const ProductList = ({
    searchQuery = '',
    selectedCategory = '',
    selectedPriceRange = '',
}: ProductListProps) => {
    const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useCart();
    const isInWishlist = (id: string) => wishlist.some((item: any) => item._id === id);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showDetails, setShowDetails] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const options: any = {};
                if (searchQuery) options.search = searchQuery;
                if (selectedCategory) options.category = selectedCategory;
                if (selectedPriceRange) {
                    const [min, max] = selectedPriceRange.split('-').map(p => p.replace('+', ''));
                    options.minPrice = parseInt(min);
                    if (max) options.maxPrice = parseInt(max);
                }
                const res = await productService.getFilteredProducts(options);
                setProducts(res.data.products);
            } catch (err) {
                setProducts([]);
            }
            setLoading(false);
        };
        fetchProducts();
    }, [searchQuery, selectedCategory, selectedPriceRange]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0
        }).format(price);
    };

    const handleAddToCart = (product: Product) => {
        addToCart(product._id);
        toast.success(`${product.name} added to cart!`);
    };

    const toggleWishlist = (product: Product) => {
        if (isInWishlist(product._id)) {
            removeFromWishlist(product._id);
            toast.success(`${product.name} removed from wishlist`);
        } else {
            addToWishlist(product._id);
            toast.success(`${product.name} added to wishlist!`);
        }
    };

    const handleViewDetails = (product: Product) => {
        setSelectedProduct(product);
        setShowDetails(true);
    };

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="text-muted-foreground text-lg">Loading products...</div>
            </div>
        );
    }
    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-muted-foreground text-lg">
                    No products found matching your criteria.
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                    Try adjusting your search terms or filters.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-medical-heading">
                    {products.length} Products Found
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Card key={product._id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden">
                        <div className="relative">
                            <img
                                src={typeof product.images?.[0] === 'string' ? product.images[0] : '/placeholder.png'}
                                alt={product.name}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />

                            {/* Badges */}
                            <div className="absolute top-3 left-3 flex flex-col gap-1">
                                {product.discount && product.discount > 0 && (
                                    <Badge className="bg-secondary text-secondary-foreground">
                                        -{product.discount}%
                                    </Badge>
                                )}
                            </div>

                            {/* Quick actions */}
                            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    className="h-8 w-8 p-0"
                                    onClick={() => toggleWishlist(product)}
                                >
                                    <Heart
                                        className={`h-4 w-4 ${isInWishlist(product._id) ? 'text-red-500 fill-current' : ''}`}
                                    />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    className="h-8 w-8 p-0"
                                    onClick={() => handleViewDetails(product)}
                                >
                                    <Eye className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Stock indicator */}
                            {product.stock === 0 && (
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
                                                className={`h-4 w-4 ${i < Math.floor(product.rating?.average || 0)
                                                    ? 'text-yellow-400 fill-current'
                                                    : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        {product.rating?.average || 0} ({product.rating?.count || 0})
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-primary">
                                        {formatPrice(product.price)}
                                    </span>
                                    {product.discount && product.discount > 0 && (
                                        <span className="text-sm text-muted-foreground line-through">
                                            {/* If you want to show original price, you need to add it to Product type. For now, just show price. */}
                                            {formatPrice(product.price)}
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
                                    className="w-full"
                                    disabled={product.stock === 0}
                                    onClick={() => handleAddToCart(product)}
                                >
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    Add to Cart
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <ProductDetails
                product={selectedProduct as any}
                open={showDetails}
                onOpenChange={setShowDetails}
            />
        </div>
    );
};

export default ProductList;