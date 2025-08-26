import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useWishlist } from '@/context/wishlistContext';
// import { formatCurrency } from '@/lib/utils';

const WishlistSheet: React.FC = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const [open, setOpen] = React.useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Heart className="h-5 w-5" />
                    {wishlist.length > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                            {wishlist.length}
                        </Badge>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>Wishlist</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex-1 overflow-y-auto">
                    {wishlist.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64">
                            <Heart className="h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-gray-500">Your wishlist is empty</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {wishlist.map((item) => (
                                <div key={item._id} className="flex items-center space-x-4 p-4 border rounded-lg">
                                    <img
                                        className="w-16 h-16 object-cover rounded"
                                        src={item.imageUrl}
                                        alt={item.name}
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-semibold">{item.name}</h4>
                                        <p className="text-sm text-gray-600">KES {item.price}</p>
                                    </div>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => removeFromWishlist(item._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
export default WishlistSheet;
