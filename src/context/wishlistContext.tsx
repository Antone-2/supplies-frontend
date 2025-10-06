import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WishlistContextType {
  wishlist: any[];
  addToWishlist: (item: any) => void;
  removeFromWishlist: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  const addToWishlist = (item: any) => setWishlist((prev) => [...prev, item]);
  const removeFromWishlist = (id: string) => setWishlist((prev) => prev.filter((item) => item.id !== id));

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};
