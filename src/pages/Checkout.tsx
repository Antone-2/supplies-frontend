import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/cartContext';
import { useAuth } from '@/hooks/use-auth';
import apiClient from '@/config/apiClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { KENYA_LOCATIONS } from '@/data/kenyaLocations';

// Helper to get shipping fee
async function getShippingFee(origin: string, destination: string) {
    try {
        const res = await apiClient.post('/orders/calculate-shipping', { origin, destination });
        return res.data.shippingFee || 0;
    } catch (error) {
        console.error('Failed to calculate shipping fee:', error);
        return 0;
    }
}

// Helper to get query param from URL
function getQueryParam(param: string) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const Checkout: React.FC = () => {
    const { cartItems, clearCart } = useCart();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // ...existing code...

    // Shipping fields
    const [name, setName] = useState(user?.name || '');
    const [address, setAddress] = useState('');
    const [pickupPoint, setPickupPoint] = useState('');
    const [phone, setPhone] = useState('');
    const [shippingFee, setShippingFee] = useState<number>(0);

    // Calculate shipping fee when pickup point changes
    useEffect(() => {
        if (pickupPoint) {
            // Free delivery for Nairobi CBD and Kiambu Town
            if (["Nairobi CBD", "Kiambu Town"].includes(pickupPoint)) {
                setShippingFee(0);
            } else {
                getShippingFee('Nairobi', pickupPoint).then(setShippingFee);
            }
        }
    }, [pickupPoint]);

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + ((item.product?.price || 0) * item.quantity), 0);
    const total = subtotal + shippingFee;

    const handleCheckout = async () => {
        if (!user) {
            setError('You must be logged in to checkout');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Create Pesapal checkout session
            const checkoutData = {
                amount: total,
                description: `Order payment for ${cartItems.length} item(s)`,
                callback_url: `${window.location.origin}/checkout?payment_method=pesapal`,
                email: user.email,
                phone: phone,
                orderData: {
                    items: cartItems.map(item => ({
                        product: item.product._id,
                        quantity: item.quantity,
                        price: item.product.price
                    })),
                    shippingAddress: {
                        name,
                        address,
                        pickupPoint,
                        phone,
                        email: user.email
                    },
                    shippingFee,
                    subtotal,
                    totalAmount: total
                }
            };

            const response = await apiClient.post('/orders/create-checkout-session', checkoutData);

            if (response.data.payment_url) {
                // Store order ID for potential callback handling
                if (response.data.order_id) {
                    localStorage.setItem('pending_order_id', response.data.order_id);
                }

                // Redirect to Pesapal payment page
                console.log('Redirecting to Pesapal payment page:', response.data.payment_url);
                window.location.href = response.data.payment_url;
            } else {
                setError('Failed to create payment session. Please try again.');
            }
        } catch (err: any) {
            console.error('Checkout error:', err);
            setError(err.response?.data?.message || 'Checkout failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle Pesapal callback
    const pesapalStatus = getQueryParam('pesapal_status');
    const pesapalOrder = getQueryParam('orderTrackingId');
    const paymentMethod = getQueryParam('payment_method');

    // Handle successful Pesapal payment callback
    if (pesapalStatus === 'success' && paymentMethod === 'pesapal') {
        // Clear cart on successful payment
        clearCart();

        // Clear pending order ID from localStorage
        localStorage.removeItem('pending_order_id');

        return (
            <div className="max-w-2xl mx-auto p-4 text-center">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h2>
                    <p className="text-green-700 mb-4">Your order has been placed and payment was successful.</p>
                    <p className="text-sm text-gray-600">Order Tracking ID: <span className="font-mono">{pesapalOrder}</span></p>
                    <Button onClick={() => window.location.href = '/'} className="mt-4">
                        Continue Shopping
                    </Button>
                </div>
            </div>
        );
    }

    // Handle failed Pesapal payment callback
    if (pesapalStatus === 'failed' && paymentMethod === 'pesapal') {
        return (
            <div className="max-w-2xl mx-auto p-4 text-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-red-800 mb-2">Payment Failed</h2>
                    <p className="text-red-700 mb-4">Your payment was not successful. Please try again.</p>
                    <p className="text-sm text-gray-600">Order Tracking ID: <span className="font-mono">{pesapalOrder}</span></p>
                    <Button onClick={() => window.location.href = '/checkout'} className="mt-4 mr-2">
                        Try Again
                    </Button>
                    <Button variant="outline" onClick={() => window.location.href = '/'} className="mt-4">
                        Continue Shopping
                    </Button>
                </div>
            </div>
        );
    }


    if (cartItems.length === 0) {
        return (
            <div className="max-w-2xl mx-auto p-4 text-center">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
                    <p className="text-gray-600 mb-4">Add some products to your cart before checking out.</p>
                    <Button onClick={() => window.location.href = '/shop'}>
                        Browse Products
                    </Button>
                </div>
            </div>
        );
    }

    // Block checkout for guests
    if (!user) {
        return (
            <div className="max-w-xl mx-auto p-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-red-800 mb-2">Login Required</h2>
                    <p className="text-red-700 mb-4">You must be logged in to checkout. Please log in or register to complete your purchase.</p>
                    <div className="space-x-4">
                        <Button onClick={() => window.location.href = '/auth'}>
                            Login
                        </Button>
                        <Button variant="outline" onClick={() => window.location.href = '/register'}>
                            Register
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4 pb-32">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-3">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <div className="flex-1">
                                    <p className="font-medium">{item.product?.name}</p>
                                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                </div>
                                <p className="font-semibold">KES {(item.product?.price || 0) * item.quantity}</p>
                            </div>
                        ))}
                    </div>
                    <div className="border-t mt-4 pt-4 space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>KES {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping:</span>
                            <span>KES {shippingFee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                            <span>Total:</span>
                            <span>KES {total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Checkout Form */}
                <div className="bg-white border rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Shipping & Payment</h2>
                    <form
                        className="space-y-4"
                        onSubmit={e => {
                            e.preventDefault();
                            handleCheckout();
                        }}
                    >
                        <div>
                            <label className="block font-medium mb-1">Full Name</label>
                            <Input
                                name="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Delivery Address</label>
                            <Input
                                name="address"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                required
                                placeholder="Enter your delivery address"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Delivery Location</label>
                            <select
                                name="pickupPoint"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={pickupPoint}
                                onChange={e => setPickupPoint(e.target.value)}
                                required
                            >
                                <option value="">Select delivery location</option>
                                {KENYA_LOCATIONS.map(loc => (
                                    <option key={loc} value={loc}>{loc}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Phone Number</label>
                            <Input
                                name="phone"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                required
                                placeholder="Enter your phone number"
                                type="tel"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full block md:inline-block fixed bottom-28 left-4 right-4 z-50 md:static md:z-auto"
                        >
                            {loading ? 'Processing...' : `Pay KES ${total.toLocaleString()}`}
                        </Button>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-md p-3">
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
