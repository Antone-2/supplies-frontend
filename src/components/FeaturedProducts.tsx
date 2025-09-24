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

import React, { useEffect, useState } from 'react';
import productService, { Product } from '@/services/productService';
import { useCart } from '@/context/cartContext';
import { toast } from 'sonner';

const FeaturedProducts: React.FC = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // You can filter for featured or just show first few products
                const res = await productService.getFilteredProducts({ inStock: true, limit: 8 });
                setProducts(res.data.products);
            } catch {
                setProducts([]);
            }
            setLoading(false);
        };
        fetchProducts();
    }, []);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0
        }).format(price);
    };

    const handleAddToCart = async (product: Product) => {
        await addToCart(product._id);
        toast.success(`${product.name} added to cart!`);
    };

    if (loading) {
        return <div className="text-center py-12">Loading featured products...</div>;
    }

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-medical-heading mb-4 font-['Roboto']">Featured Products</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {products.map((product) => (
                        <Card key={product._id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden">
                            <div className="relative">
                                <img
                                    src={product.images?.[0]?.url || '/placeholder-product.jpg'}
                                    alt={product.name}
                                    className="w-full h-32 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {/* Wishlist and view icons */}
                                <div className="absolute top-3 right-3 flex flex-col gap-2">
                                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                                        <Heart className="h-4 w-4 text-pink-500" />
                                    </Button>
                                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <CardContent className="p-4 md:p-6">
                                <div className="space-y-3">
                                    <p className="text-sm text-muted-foreground font-['Roboto']">{product.brand}</p>
                                    <h3 className="font-semibold text-medical-heading group-hover:text-primary transition-colors font-['Roboto']">{product.name}</h3>
                                    {/* Rating */}
                                    <div className="flex items-center gap-2">
                                        <div className="flex">
                                            {Array.from({ length: 5 }).map((_, i) => {
                                                const avg = product.rating?.average || 0;
                                                let starClass = 'text-gray-300';
                                                if (i < Math.floor(avg)) {
                                                    starClass = 'text-yellow-400 fill-current';
                                                } else if (i === Math.floor(avg) && avg % 1 >= 0.5) {
                                                    starClass = 'text-yellow-400 fill-current';
                                                }
                                                return <Star key={i} className={`h-4 w-4 ${starClass}`} />;
                                            })}
                                        </div>
                                        <span className="text-sm text-muted-foreground font-['Roboto']">{product.rating?.average || 0} <span className="ml-1">{product.rating?.count || 0}</span></span>
                                    </div>
                                    {/* Price */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-bold text-primary font-['Roboto']">Ksh {product.price.toLocaleString()}</span>
                                    </div>
                                    {/* Features */}
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-['Roboto']">
                                        <div className="flex items-center gap-1">
                                            <Truck className="h-3 w-3" />
                                            <span>Free Delivery</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Shield className="h-3 w-3" />
                                            <span>Warranty</span>
                                        </div>
                                    </div>
                                    <Button className="w-full" disabled={product.stock === 0} onClick={() => handleAddToCart(product)}>
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        Add to Cart
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-['Roboto']" onClick={() => window.location.href = '/products'}>
                        View All Products
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;