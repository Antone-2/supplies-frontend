import React from 'react';
import { LuPlus, LuMinus, LuTrash2, LuShoppingCart } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
// ...existing code...
import { useCart } from '@/context/cartContext';
// import { formatCurrency } from '@/lib/utils';
// import { formatCurrency } from '@/lib/utils';

interface CartSheetProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const CartSheet: React.FC<CartSheetProps> = ({ open: externalOpen, onOpenChange: externalOnOpenChange }) => {
    const { cartItems, updateQuantity, removeFromCart } = useCart();
    const [internalOpen, setInternalOpen] = React.useState(false);

    // Use external open state if provided, otherwise use internal state
    const open = externalOpen !== undefined ? externalOpen : internalOpen;
    const setOpen = externalOnOpenChange || setInternalOpen;

    const cartTotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    // ...existing code...

    if (externalOpen === undefined) {
        return (
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="cart-icon">
                        <LuShoppingCart className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                    <SheetHeader>
                        <SheetTitle>Shopping Cart</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 flex-1 overflow-y-auto">
                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64">
                                <LuShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
                                <p className="text-gray-500">Your cart is empty</p>
                            </div>
                        ) : (
                            <>
                                <div className="overflow-y-auto" style={{ maxHeight: '60vh' }}>
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
                                                    <LuMinus size={16} />
                                                </Button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                                >
                                                    <LuPlus size={16} />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => removeFromCart(item.product._id)}
                                                >
                                                    <LuTrash2 size={16} />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Fixed subtotal and button at bottom, full width of cart */}
                                <div className="sticky bottom-0 bg-white border-t shadow-lg p-4 z-50 w-full">
                                    <div className="flex justify-between items-center mb-2 w-full">
                                        <span className="font-semibold">Subtotal:</span>
                                        <span className="font-bold">KES {cartTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="text-sm text-gray-600 mb-4 w-full">
                                        Shipping fee will be calculated at checkout based on your delivery location.<br />
                                        Free delivery for Nairobi CBD and Kiambu Town.
                                    </div>
                                    <Button className="w-full" onClick={() => {
                                        setOpen(false);
                                        window.location.href = '/checkout';
                                    }}>
                                        Proceed to Checkout
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        );
    } else {
        return (
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent className="w-full sm:max-w-lg">
                    <SheetHeader>
                        <SheetTitle>Shopping Cart</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 flex-1 overflow-y-auto">
                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64">
                                <LuShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
                                <p className="text-gray-500">Your cart is empty</p>
                            </div>
                        ) : (
                            <>
                                <div className="overflow-y-auto" style={{ maxHeight: '60vh' }}>
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
                                                    <LuMinus size={16} />
                                                </Button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                                >
                                                    <LuPlus size={16} />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => removeFromCart(item.product._id)}
                                                >
                                                    <LuTrash2 size={16} />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Fixed subtotal and button at bottom, full width of cart */}
                                <div className="sticky bottom-0 bg-white border-t shadow-lg p-4 z-50 w-full">
                                    <div className="flex justify-between items-center mb-2 w-full">
                                        <span className="font-semibold">Subtotal:</span>
                                        <span className="font-bold">KES {cartTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="text-sm text-gray-600 mb-4 w-full">
                                        Shipping fee will be calculated at checkout based on your delivery location.<br />
                                        Free delivery for Nairobi CBD and Kiambu Town.
                                    </div>
                                    <Button className="w-full" onClick={() => {
                                        setOpen(false);
                                        window.location.href = '/checkout';
                                    }}>
                                        Proceed to Checkout
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        );
    }
};

export default CartSheet;
