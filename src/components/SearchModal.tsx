import React, { useState, useEffect } from 'react';
import { LuSearch } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';

interface SearchModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ open: externalOpen, onOpenChange: externalOnOpenChange }) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Use external open state if provided, otherwise use internal state
    const open = externalOpen !== undefined ? externalOpen : internalOpen;
    const setOpen = externalOnOpenChange || setInternalOpen;

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }
        setLoading(true);
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/products?search=${encodeURIComponent(query)}&limit=10`)
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

    const handleSelect = () => {
        setOpen(false);
        setQuery('');
        setResults([]);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="search-icon">
                    <LuSearch className="h-5 w-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Search Products</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    <div className="relative">
                        <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            type="text"
                            placeholder="Search for products..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="pl-10 pr-4"
                            autoFocus
                        />
                    </div>

                    <div className="mt-4 max-h-64 overflow-y-auto">
                        {loading && (
                            <div className="p-4 text-center text-gray-500">
                                Searching for "{query}"...
                            </div>
                        )}

                        {!loading && results.length > 0 && (
                            <div className="space-y-2">
                                <div className="p-2 text-sm text-gray-600 border-b">
                                    Showing results for "{query}"
                                </div>
                                {results.map(product => (
                                    <Link
                                        to={`/product/${product._id || product.id}`}
                                        key={product._id || product.id}
                                        className="block p-3 hover:bg-gray-50 rounded-lg border"
                                        onClick={handleSelect}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-medium text-sm">{product.name}</h4>
                                                <p className="text-xs text-gray-600">KES {product.price}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {!loading && query.trim() && results.length === 0 && (
                            <div className="p-4 text-center text-gray-500">
                                No products found for "{query}"
                            </div>
                        )}

                        {!query.trim() && (
                            <div className="p-4 text-center text-gray-400">
                                Start typing to search for products...
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SearchModal;
