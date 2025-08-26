import React from 'react';
import { Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/cartContext';
// import { formatCurrency } from '@/lib/utils';
// import { formatCurrency } from '@/lib/utils';

const CartSheet: React.FC = () => {
    const { cartItems, updateQuantity, removeFromCart } = useCart();
    const [open, setOpen] = React.useState(false);

    const cartTotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemsCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                            {cartItemsCount}
                        </Badge>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>Shopping Cart</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex-1 overflow-y-auto">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64">
                            <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-gray-500">Your cart is empty</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.product._id} className="flex items-center space-x-4 p-4 border rounded-lg">
                                    <img
                                        src={item.product.imageUrl}
                                        alt={item.product.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-semibold">{item.product.name}</h4>
                                        <p className="text-sm text-gray-600">KES {item.product.price}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </Button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                        >
                                            <Plus size={16} />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => removeFromCart(item.product._id)}
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {cartItems.length > 0 && (
                    <div className="mt-6 border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold">Total:</span>
                            <span className="font-bold text-lg">KES {cartTotal.toLocaleString()}</span>
                        </div>
                        <Button className="w-full" onClick={() => setOpen(false)}>
                            Proceed to Checkout
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default CartSheet;
