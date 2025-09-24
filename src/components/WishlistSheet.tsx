import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const WishlistSheet = () => {
    // Use wishlist from context
    // import { useWishlist } from '@/context/wishlistContext';
    // const { wishlist } = useWishlist();
    // For now, fallback to empty array if context not available
    const wishlistItems = [];
    const itemCount = wishlistItems.length;

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <Heart className="h-4 w-4" />
                    {itemCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                            {itemCount}
                        </Badge>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <Heart className="h-5 w-5" />
                        Wishlist ({itemCount})
                    </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col h-full">
                    {wishlistItems.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-600 mb-2">Your wishlist is empty</h3>
                                <p className="text-gray-500">Save items you love for later</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex-1 overflow-y-auto py-4">
                                <div className="space-y-4">
                                    {wishlistItems.map((item) => (
                                        <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                                                <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                                                {!item.inStock && (
                                                    <Badge variant="destructive" className="text-xs mt-1">
                                                        Out of Stock
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 px-2"
                                                    disabled={!item.inStock}
                                                >
                                                    <ShoppingCart className="h-3 w-3 mr-1" />
                                                    Add to Cart
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <Link to="/wishlist" className="block">
                                    <Button variant="outline" className="w-full">
                                        View Wishlist
                                    </Button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default WishlistSheet;
