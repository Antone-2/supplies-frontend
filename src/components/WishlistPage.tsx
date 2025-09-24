import React from 'react';
import medHelmLogo from '@/assets/medhelm-logo.svg';
import { useWishlist } from '@/context/wishlistContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Wishlist: React.FC = () => {
    const { wishlist, loading, error, removeFromWishlist } = useWishlist();

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
            {loading && <div>Loading wishlist...</div>}
            {error && <div className="text-red-600 mb-4">{error}</div>}
            {wishlist.length === 0 && !loading ? (
                <div className="flex flex-col items-center my-12">
                    <img src={medHelmLogo} alt="Medhelm Supplies Logo" className="h-20 mb-4" width="80" height="80" />
                    <div>Your wishlist is empty.</div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlist.map((product) => (
                        <Card key={product._id} className="relative">
                            <CardContent className="p-4 flex flex-col items-center">
                                <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover mb-2" width="320" height="160" />
                                <h2 className="font-semibold text-lg mb-1">{product.name}</h2>
                                <p className="text-primary font-bold mb-2">KES {product.price}</p>
                                <div className="flex gap-2 mt-2">
                                    <Link to={`/product/${product._id}`} className="underline text-blue-600">View</Link>
                                    <Button size="sm" variant="destructive" onClick={() => removeFromWishlist(product._id)}>
                                        Remove
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
