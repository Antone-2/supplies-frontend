import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface SearchDropdownProps {
  query: string;
  onSelect: () => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ query, onSelect }) => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/products?search=${encodeURIComponent(query)}&limit=5`)
      .then(res => res.json())
      .then(data => {
        // Support both { products: [...] } and { data: { products: [...] } }
        const products = data.products || data.data?.products || [];
        setResults(products);
        setLoading(false);
      })
      .catch(() => {
        setResults([]);
        setLoading(false);
      });
  }, [query]);


  // Always show dropdown if searching, even if no results
  if (!query.trim()) return null;

  return (
    <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
      {loading && <div className="p-2 text-gray-500">Searching...</div>}
      {!loading && results.length > 0 && results.map(product => (
        <Link
          to={`/product/${product._id || product.id}`}
          key={product._id || product.id}
          className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
          onClick={onSelect}
        >
          {product.name}
        </Link>
      ))}
      {!loading && results.length === 0 && (
        <div className="p-2 text-gray-500">No results found.</div>
      )}
    </div>
  );
};

export default SearchDropdown;
