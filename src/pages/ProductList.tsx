import React from 'react';
import { useFetch } from '../hooks/use-fetch';
import { Product } from '@/types/product';
// ...existing code...
// ...existing code...
import ProductCard from '../components/ProductCard';

const ProductList: React.FC = () => {
    const { data: products, loading, error } = useFetch<Product[]>('/products');

    if (loading) return <p>Loading products...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products?.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;