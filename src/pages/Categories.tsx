

import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import productService from '@/services/productService';
import { categoryList } from '@/data/categoryList';


const AllCategoriesPage = () => {
    const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        setLoading(true);
        setError(null);
        productService.getCategoriesWithCounts()
            .then(res => {
                if (res.success && Array.isArray(res.data)) {
                    // Merge categories from API with categoryList to include all categories
                    const allCategories = categoryList.map(cat => {
                        const apiCat = res.data.find((c: any) => c.name.toLowerCase() === cat.name.toLowerCase());
                        return {
                            name: cat.name,
                            count: apiCat ? apiCat.count : 0,
                            id: cat.id,
                            icon: cat.icon,
                            color: cat.color,
                            description: cat.description,
                        };
                    });
                    setCategories(allCategories);
                } else {
                    setError('No categories found.');
                }
            })
            .catch(() => setError('Failed to load categories.'))
            .finally(() => setLoading(false));
    }, []);

    // Helper to get icon/color from categoryList by name (case-insensitive)
    const getCategoryMeta = (name: string) => {
        const found = categoryList.find(
            c => c.name.toLowerCase() === name.toLowerCase() || c.id.toLowerCase() === name.toLowerCase().replace(/\s+/g, '-')
        );
        return found || { icon: () => <span>?</span>, color: 'from-gray-400 to-gray-600', description: '' };
    };

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">All Categories</h1>
            {loading ? (
                <div className="text-center text-gray-500">Loading categories...</div>
            ) : error ? (
                <div className="text-center text-red-600">{error}</div>
            ) : categories.length === 0 ? (
                <div className="text-center text-gray-500">No categories found.</div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
                    {categories.map((cat) => {
                        const meta = getCategoryMeta(cat.name);
                        const Icon = meta.icon;
                        return (
                            <Link
                                key={cat.name}
                                to={`/category/${encodeURIComponent(cat.name)}`}
                                className="block group"
                                style={{ textDecoration: 'none' }}
                            >
                                <Card className="hover:shadow-2xl transition-all duration-300 group-hover:scale-105 border-0 bg-gradient-to-br from-white to-blue-50 animate-fade-in">
                                    <CardContent className="p-4 sm:p-6 md:p-8 flex flex-col items-center text-center">
                                        <div className={`bg-gradient-to-br ${meta.color} rounded-full p-3 sm:p-4 md:p-5 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-2 sm:mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white drop-shadow-lg" />
                                        </div>
                                        <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors">{cat.name}</span>
                                        <span className="text-gray-500 mb-1 sm:mb-2 text-xs sm:text-sm leading-relaxed">{meta.description}</span>
                                        <span className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700 mb-0 sm:mb-1">{cat.count}</span>
                                        <span className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">{cat.count === 1 ? 'Product' : 'Products'}</span>
                                        <span className="inline-block mt-1 sm:mt-2 px-2 py-1 sm:px-4 sm:py-1 rounded bg-blue-100 text-blue-700 text-xs font-semibold group-hover:bg-blue-200 transition">View Products</span>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AllCategoriesPage;
