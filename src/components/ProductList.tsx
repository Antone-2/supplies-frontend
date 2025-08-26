import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Product } from '@/types/product';
import { useCart } from '@/context/cartContext';

interface ProductListProps {
  searchQuery?: string;
  selectedCategory?: string;
  selectedPriceRange?: string;
  products?: Product[];
}

const ProductList = ({
  searchQuery = '',
  selectedCategory = '',
  selectedPriceRange = '',
  products: providedProducts
}: ProductListProps) => {
  useCart();
  const [sort, setSort] = useState('default');
  const [loading] = useState(false); // Simulate loading for skeletons

  const filteredProducts = useMemo(() => {
    let result = providedProducts || [];

    if (searchQuery) {
      result = result.filter((product: Product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter((product: Product) => product.category === selectedCategory);
    }

    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split('-').map(p => p.replace('+', ''));
      const minPrice = parseInt(min);
      const maxPrice = max ? parseInt(max) : Infinity;
      result = result.filter((product: Product) =>
        product.price >= minPrice && product.price <= maxPrice
      );
    }

    // Sorting
    if (sort === 'price-asc') {
      result = [...result].sort((a: Product, b: Product) => a.price - b.price);
    } else if (sort === 'price-desc') {
      result = [...result].sort((a: Product, b: Product) => b.price - a.price);
    } else if (sort === 'newest') {
      result = [...result].sort((a: Product, b: Product) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
    }

    return result;
  }, [searchQuery, selectedCategory, selectedPriceRange, providedProducts, sort]);



  // Simulate loading state for skeletons
  // setLoading(true) and setTimeout(() => setLoading(false), 1000) can be used in real fetch

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
            <div className="h-48 w-full bg-gray-200 rounded mb-4" />
            <div className="h-6 w-2/3 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-1/3 bg-gray-200 rounded mb-4" />
            <div className="h-10 w-full bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (filteredProducts.length === 0) {
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
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <h3 className="text-lg font-semibold text-medical-heading">
          {filteredProducts.length} Products Found
        </h3>
        {/* Sorting */}
        <div className="flex gap-2 items-center">
          <label htmlFor="sort" className="text-sm text-gray-600">Sort by:</label>
          <select
            id="sort"
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product: Product) => (
          <Card key={product._id} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden rounded-2xl animate-fade-in">
            {/* Use the modern ProductCard component for each product */}
            {/* @ts-ignore */}
            <div className="p-0">{/* ...existing code... */}</div>
          </Card>
        ))}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.7s; }
        .animate-pulse { animation: pulse 1.5s cubic-bezier(.4,0,.6,1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
      `}</style>
    </div>
  );
};

export default ProductList;