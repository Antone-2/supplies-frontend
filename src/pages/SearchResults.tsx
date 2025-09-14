import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';

const SearchResults: React.FC = () => {
  const location = useLocation();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get search query from URL
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get('q') || '';

  useEffect(() => {
    if (!searchQuery) return;
    setLoading(true);
    setError('');
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/products?search=${encodeURIComponent(searchQuery)}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch search results.');
        setLoading(false);
      });
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Search Results for "{searchQuery}"</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p>No products found.</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
