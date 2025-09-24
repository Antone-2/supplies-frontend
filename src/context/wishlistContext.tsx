import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import apiClient from '@/config/apiClient';
import { useAuth } from './AuthContext';

interface WishlistProduct {
    _id: string;
    name: string;
    price: number;
    imageUrl?: string;
    description?: string;
}

interface WishlistContextType {
    wishlist: WishlistProduct[];
    loading: boolean;
    error: string | null;
    addToWishlist: (productId: string) => Promise<void>;
    removeFromWishlist: (productId: string) => Promise<void>;
    refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user, token } = useAuth();
    const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWishlist = async () => {
        if (!user || !token) {
            setWishlist([]);
            return;
        }
        setLoading(true);
        try {
            const response = await apiClient.get('/wishlist');
            setWishlist(response.data.items || []);
            setError(null);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to load wishlist');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, [user]);

    const addToWishlist = async (productId: string) => {
        if (!user || !token) {
            setError('You must be logged in to add items to wishlist.');
            throw new Error('You must be logged in to add items to wishlist.');
        }
        try {
            await apiClient.post('/wishlist/add', { productId });
            await fetchWishlist();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to add item to wishlist');
        }
    };

    const removeFromWishlist = async (productId: string) => {
        if (!user || !token) {
            setError('You must be logged in to remove items from wishlist.');
            throw new Error('You must be logged in to remove items from wishlist.');
        }
        try {
            await apiClient.post('/wishlist/remove', { productId });
            await fetchWishlist();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to remove item from wishlist');
        }
    };

    const refreshWishlist = async () => {
        await fetchWishlist();
    };

    return (
        <WishlistContext.Provider
            value={{ wishlist, loading, error, addToWishlist, removeFromWishlist, refreshWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = (): WishlistContextType => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
