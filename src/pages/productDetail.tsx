import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/use-fetch';
// import apiClient from '@/config/apiClient';
import { Product } from '@/types/product';
import { useCart } from '@/context/cartContext';
import Button from '../components/Button';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: product, loading, error } = useFetch<Product>(`/products/${id}`);
    const { addToCart } = useCart();

    if (loading) return <p>Loading product...</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div className="max-w-4xl mx-auto p-4 flex flex-col md:flex-row gap-6">
            <img src={product.imageUrl} alt={product.name} className="w-full md:w-1/2 rounded" />
            <div className="md:w-1/2">
                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                <p className="mb-4">{product.description}</p>
                <p className="text-lg font-semibold mb-4">Price: KES {product.price.toLocaleString()}</p>
                <Button onClick={() => addToCart(product._id)}>Add to Cart</Button>
            </div>
        </div>
    );
};

export default ProductDetail;