import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from './ui/sheet';
import { Button } from './ui/button';

interface CartSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

import { useCart } from '@/context/cartContext';
const CartSheet: React.FC<CartSheetProps> = ({ open, onOpenChange }) => {
    const { cartItems, updateQuantity, removeFromCart } = useCart ? useCart() : { cartItems: [], updateQuantity: () => { }, removeFromCart: () => { } };
    const total = cartItems.reduce((sum, item) => sum + ((item.product.price || 0) * item.quantity), 0);
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        Shopping Cart ({itemCount})
                    </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col h-full">
                    {cartItems.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                                <p className="text-gray-500">Add some medical supplies to get started</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex-1 overflow-y-auto py-4">
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div key={item.product._id} className="flex items-center gap-3 p-3 border rounded-lg">
                                            <img
                                                src={item.product.imageUrl || '/placeholder.png'}
                                                alt={item.product.name || 'Product'}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-sm truncate">{item.product.name || 'Product'}</h4>
                                                <p className="text-sm text-gray-600">KES {(item.product.price || 0).toFixed(2)} each</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-1">
                                                    <Button variant="outline" size="sm" className="h-6 w-6 p-0" onClick={() => updateQuantity(item.product._id, Math.max(1, item.quantity - 1))}>
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                    <Button variant="outline" size="sm" className="h-6 w-6 p-0" onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-600" onClick={() => removeFromCart(item.product._id)}>
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t pt-4 space-y-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold">Subtotal:</span>
                                    <span className="font-bold text-lg">KES {total.toLocaleString('en-KE', { minimumFractionDigits: 0 })}</span>
                                </div>
                                <div className="text-sm text-muted-foreground mb-2">
                                    Shipping fee will be calculated at checkout based on your delivery location.<br />
                                    Free delivery for Nairobi CBD and Kiambu Town.
                                </div>
                                <Link to="/checkout" className="block">
                                    <Button className="w-full" size="lg">
                                        Proceed to Checkout
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

export default CartSheet;
