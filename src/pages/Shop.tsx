import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Filter } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductService, { Product } from '@/services/productService';
import { useCart } from '@/context/cartContext';

const Shop: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const location = useLocation();
    // Reset category filter if coming from a View All Products button
    useEffect(() => {
        if (location.state && location.state.resetFilters) {
            setSelectedCategory('all');
        }
    }, [location.state]);
    const [categories, setCategories] = useState<string[]>([]);

    const { addToCart, cartItems } = useCart();

    const fetchProducts = async (page: number = 1) => {
        try {
            setLoading(true);
            setError(null);

            const response = await ProductService.getProductsByCategory({
                category: selectedCategory,
                page,
                limit: 12,
                inStock: true,
                sortBy,
                sortOrder
            });

            setProducts(response.data.products);
            setTotalPages(response.data.pagination.totalPages);
            setTotalProducts(response.data.pagination.totalProducts);
        } catch (err) {
            setError('Failed to load products. Please try again later.');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await ProductService.getCategoriesWithCounts();
            const categoryNames = response.data.map(cat => cat.name);
            setCategories(['all', ...categoryNames]);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage, selectedCategory, sortBy, sortOrder]);

    const handleAddToCart = (product: Product) => {
        addToCart(product._id);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center mb-8">
                        <Skeleton className="h-8 w-64 mx-auto mb-2" />
                        <Skeleton className="h-4 w-96 mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <Card key={i} className="overflow-hidden">
                                <CardHeader className="p-0">
                                    <Skeleton className="aspect-square w-full" />
                                </CardHeader>
                                <CardContent className="p-4">
                                    <Skeleton className="h-4 w-3/4 mb-2" />
                                    <Skeleton className="h-3 w-1/2 mb-2" />
                                    <Skeleton className="h-6 w-1/3" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
                        <p className="text-lg font-medium text-red-800 mb-4">{error}</p>
                        <Button onClick={() => fetchProducts(1)}>Try Again</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop Medical Supplies</h1>
                        <p className="text-xl opacity-90 mb-8">Quality medical equipment and supplies at competitive prices</p>
                        <div className="flex justify-center items-center gap-4">
                            <Link to="/cart">
                                <Button variant="secondary" className="flex items-center gap-2">
                                    <ShoppingCart className="h-5 w-5" />
                                    Cart ({cartItems.length})
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex items-center gap-2">
                            <Filter className="h-5 w-5 text-gray-500" />
                            <span className="font-medium">Filters:</span>
                        </div>

                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map(category => (
                                    <SelectItem key={category} value={category}>
                                        {category === 'all' ? 'All Categories' : category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
                            const [newSortBy, newSortOrder] = value.split('-');
                            setSortBy(newSortBy);
                            setSortOrder(newSortOrder as 'asc' | 'desc');
                        }}>
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                                <SelectItem value="rating-asc">Rating (Low to High)</SelectItem>
                                <SelectItem value="rating-desc">Rating (High to Low)</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="ml-auto">
                            <p className="text-sm text-gray-600">
                                Showing {products.length} of {totalProducts} products
                            </p>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {products.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-600 mb-4">Try adjusting your filters or check back later.</p>
                        <Button onClick={() => setSelectedCategory('all')}>Show All Products</Button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <CardHeader className="p-0">
                                        <div className="aspect-square bg-gray-100 flex items-center justify-center">
                                            {product.images?.[0]?.url ? (
                                                <img
                                                    src={product.images[0].url}
                                                    alt={product.images[0].alt || product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <ShoppingCart className="h-12 w-12 text-gray-400" />
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{product.category}</p>

                                        {product.rating && product.rating.count > 0 && (
                                            <div className="flex items-center mb-2">
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${i < Math.floor(product.rating.average)
                                                                ? 'text-yellow-400 fill-current'
                                                                : 'text-gray-300'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-sm text-gray-600 ml-2">
                                                    ({product.rating.count})
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-2xl font-bold text-blue-600">
                                                {formatPrice(product.price)}
                                            </span>
                                            <Badge variant={product.stock > 0 ? "default" : "secondary"}>
                                                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                            </Badge>
                                        </div>

                                        {product.discount && product.discount > 0 && (
                                            <div className="text-sm text-green-600 mb-2">
                                                Save {product.discount}% off
                                            </div>
                                        )}
                                    </CardContent>
                                    <CardFooter className="p-4 pt-0">
                                        <Button
                                            className="w-full"
                                            onClick={() => handleAddToCart(product)}
                                            disabled={product.stock === 0}
                                        >
                                            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center space-x-2 mt-8">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>

                                <span className="text-sm text-gray-600">
                                    Page {currentPage} of {totalPages}
                                </span>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Shop;
