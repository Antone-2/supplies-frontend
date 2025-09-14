import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { ProductFilters } from './ProductFilters';

// ...existing code...
import { Product } from '../types/product';
import { useFetch } from '../hooks/use-fetch';

interface ProductCatalogProps {
    category?: string;
    searchQuery?: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ category, searchQuery }) => {
    const [sortBy, setSortBy] = useState<string>('newest');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    const { data: products, loading, error } = useFetch<Product[]>('/products');
    // Cart and wishlist hooks are available but not used in this component
    // const { cart, addToCart } = useCart();
    // const { wishlist, addToWishlist } = useWishlist();

    const filteredAndSortedProducts = useMemo(() => {
        if (!products) return [];

        let filtered = products;

        // Filter by category
        if (category && category !== 'all') {
            filtered = filtered.filter(p => p.category === category);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by price range
        filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // Filter by selected categories
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(p => selectedCategories.includes(p.category));
        }

        // Sort products
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                filtered.sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });
        }

        return filtered;
    }, [products, category, searchQuery, priceRange, selectedCategories, sortBy]);

    if (loading) return <div className="text-center py-12">Loading products...</div>;
    if (error) return <div className="text-center text-red-500">Error loading products</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar */}
                <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                    <ProductFilters
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        availableCategories={[...new Set(products?.map(p => p.category) || [])]}
                    />
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {category ? `${category} Products` : 'All Products'}
                        </h1>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Filters
                            </button>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="newest">Newest</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                                <option value="name">Name A-Z</option>
                            </select>
                        </div>
                    </div>

                    {/* Results Count */}
                    <p className="text-gray-600 mb-6">
                        {filteredAndSortedProducts.length} products found
                    </p>

                    {/* Product Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
                        {filteredAndSortedProducts.map(product => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))}
                    </div>

                    {filteredAndSortedProducts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No products found matching your criteria</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
