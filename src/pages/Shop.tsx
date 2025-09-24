import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LuShoppingCart, LuStar, LuFilter, LuHeart, LuEye, LuX } from 'react-icons/lu';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import ProductService, { Product } from '@/services/productService';
import { useCart } from '@/context/cartContext';
import { useWishlist } from '@/context/wishlistContext';

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
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState<string[]>([]);
    const [searchParams] = useSearchParams();
    // location removed (unused)

    const { addToCart } = useCart();
    const { addToWishlist, loading: wishlistLoading } = useWishlist();

    const fetchProducts = useCallback(async (page: number = 1, searchQuery?: string) => {
        try {
            setLoading(true);
            setError(null);

            const searchParam = searchQuery !== undefined ? searchQuery : searchTerm;

            const response = await ProductService.getProductsByCategory({
                category: selectedCategory,
                page,
                limit: 12,
                inStock: true,
                sortBy,
                sortOrder,
                search: searchParam || undefined
            });

            // Defensive: fallback if pagination is missing
            const products = response?.data?.products || [];
            const pagination = response?.data?.pagination || {};
            setProducts(products);
            setTotalPages(pagination.totalPages || 1);
            setTotalProducts(pagination.totalProducts || products.length);
        } catch (err) {
            setError('Failed to load products. Please try again later.');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    }, [selectedCategory, sortBy, sortOrder, searchTerm]);

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
        const categoryFromUrl = searchParams.get('category');
        if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
            setSelectedCategory(categoryFromUrl);
            setCurrentPage(1); // Reset to first page when category changes
        } else if (!categoryFromUrl && selectedCategory !== 'all') {
            // If no category in URL but selectedCategory is not 'all', reset to 'all'
            setSelectedCategory('all');
            setCurrentPage(1);
        }
    }, [searchParams]); // Remove selectedCategory from dependencies to prevent infinite loop

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage, selectedCategory, sortBy, sortOrder]);

    // Debounce search input
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setCurrentPage(1);
            fetchProducts(1, searchTerm);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, fetchProducts]);

    const handleAddToCart = (product: Product) => {
        addToCart(product._id);
    };

    const handleAddToWishlist = async (product: Product) => {
        await addToWishlist(product._id);
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

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {[...Array(8)].map((_, i) => (
                            <Card key={i} className="overflow-hidden">
                                <CardHeader className="p-0">
                                    <Skeleton className="aspect-square w-full" />
                                </CardHeader>
                                <CardContent className="p-2 sm:p-4">
                                    <Skeleton className="h-3 sm:h-4 w-3/4 mb-1 sm:mb-2" />
                                    <Skeleton className="h-2 sm:h-3 w-1/2 mb-1 sm:mb-2" />
                                    <Skeleton className="h-4 sm:h-6 w-1/3" />
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
                        <h1 data-testid="shop-heading" className="text-4xl md:text-5xl font-bold mb-4">Shop Medical Supplies</h1>
                        <p className="text-xl opacity-90 mb-8">Quality medical equipment and supplies at competitive prices</p>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex items-center gap-2">
                            <LuFilter className="h-5 w-5 text-gray-500" />
                            <span className="font-medium">Filters:</span>
                        </div>

                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full md:w-64 pr-10"
                                aria-label="Search products"
                            />
                            {searchTerm && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                                    onClick={() => setSearchTerm('')}
                                    aria-label="Clear search"
                                >
                                    <LuX className="h-4 w-4" />
                                </Button>
                            )}
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
                        <LuShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-600 mb-4">Try adjusting your filters or check back later.</p>
                        <Button onClick={() => setSelectedCategory('all')}>Show All Products</Button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {products.map((product) => (
                                <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow" data-testid="product-card">
                                    <CardHeader className="p-0 relative">
                                        <div className="aspect-square bg-gray-100 flex items-center justify-center">
                                            {product.images?.[0]?.url ? (
                                                <img
                                                    src={product.images[0].url}
                                                    alt={product.images[0].alt || product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <LuShoppingCart className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                                            )}
                                        </div>
                                        <div className="absolute top-1 sm:top-2 right-1 sm:right-2 flex flex-col gap-1 sm:gap-2">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-white/80 hover:bg-white hover:scale-110 hover:shadow-md transition-all duration-200"
                                                        onClick={() => handleAddToWishlist(product)}
                                                        disabled={wishlistLoading}
                                                    >
                                                        <LuHeart className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 hover:text-pink-500 transition-colors duration-200" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Add to Wishlist</p>
                                                </TooltipContent>
                                            </Tooltip>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-white/80 hover:bg-white hover:scale-110 hover:shadow-md transition-all duration-200"
                                                        asChild
                                                    >
                                                        <Link to={`/product/${product._id}`}>
                                                            <LuEye className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 hover:text-cyan-500 transition-colors duration-200" />
                                                        </Link>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>View Details</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-2 sm:p-4">
                                        <h3 className="font-semibold text-sm sm:text-lg mb-1 sm:mb-2 line-clamp-2">{product.name}</h3>
                                        <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{product.category}</p>

                                        {product.rating && product.rating.count > 0 && (
                                            <div className="flex items-center mb-1 sm:mb-2">
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <LuStar
                                                            key={i}
                                                            className={`h-3 w-3 sm:h-4 sm:w-4 ${i < Math.floor(product.rating.average)
                                                                ? 'text-yellow-400 fill-current'
                                                                : 'text-gray-300'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-xs sm:text-sm text-gray-600 ml-1 sm:ml-2">
                                                    ({product.rating.count})
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                                            <span className="text-lg sm:text-2xl font-bold text-orange-600">
                                                {formatPrice(product.price)}
                                            </span>
                                            <Badge variant={product.stock > 0 ? "default" : "secondary"} className="text-xs">
                                                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                            </Badge>
                                        </div>

                                        {product.discount && product.discount > 0 && (
                                            <div className="text-xs sm:text-sm text-green-600 mb-1 sm:mb-2">
                                                Save {product.discount}% off
                                            </div>
                                        )}
                                    </CardContent>
                                    <CardFooter className="p-2 sm:p-4 pt-0">
                                        <Button
                                            className="w-full text-sm"
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
