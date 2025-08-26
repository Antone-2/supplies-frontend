import React, { useState } from 'react';
import { useCart } from '@/context/cartContext';
import { useAuth } from '@/hooks/use-auth';
import apiClient from '@/config/apiClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PAYMENT_METHODS } from '@/utils/constants';
import { KENYA_LOCATIONS } from '@/data/kenyaLocations';

// Helper to get shipping fee
async function getShippingFee(origin: string, destination: string) {
    const res = await apiClient.post('/orders/calculate-shipping', { origin, destination });
    return res.data.shippingFee;
}

// Helper to get query param from URL
function getQueryParam(param: string) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const Checkout: React.FC = () => {

    const { cartItems } = useCart();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    // Removed unused orderId and setOrderId

    // Shipping fields
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city] = useState(''); // setCity unused, keep city for shipping object
    const [pickupPoint, setPickupPoint] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0] || '');
    const [shippingFee, setShippingFee] = useState<number>(0);
    const [showPin, setShowPin] = useState(false);
    const [pin, setPin] = useState('');


    // Calculate shipping fee when address/city changes
    React.useEffect(() => {
        if (pickupPoint) {
            // Free delivery for Nairobi CBD and Kiambu Town
            if (["Nairobi CBD", "Kiambu Town"].includes(pickupPoint)) {
                setShippingFee(0);
            } else {
                getShippingFee('Nairobi', pickupPoint).then(setShippingFee).catch(() => setShippingFee(0));
            }
        }
    }, [pickupPoint]);

    // Handle payment method change
    function handlePaymentMethodChange(method: string) {
        setPaymentMethod(method);
        setShowPin(method === 'MPESA' || method === 'AIRTEL');
    }

    // Calculate subtotal
    // Fix: Use correct property for price if available, fallback to 0 if not present
    // Use item.product.price for subtotal calculation
    const subtotal = cartItems.reduce((sum, item) => sum + ((item.product?.price || 0) * item.quantity), 0);
    const total = subtotal + (shippingFee || 0);

    const handleCheckout = async () => {
        setLoading(true);
        setError(null);
        try {
            // 1. Create order (simulate, or use your real endpoint)
            const orderRes = await apiClient.post('/orders', {
                shipping: { name, address, city, phone, pickupPoint },
                paymentMethod,
                shippingFee,
                subtotal,
                total,
            });
            const order = orderRes.data.order || orderRes.data;
            // Removed setOrderId (unused)

            // 2. Handle payment by method
            if (paymentMethod === 'MPESA' || paymentMethod === 'AIRTEL') {
                const url = paymentMethod === 'MPESA' ? '/orders/pay/mpesa' : '/orders/pay/airtel';
                const payRes = await apiClient.post(url, {
                    phone,
                    pin,
                    amount: total,
                    orderId: order._id || order.id,
                });
                if (payRes.data && payRes.data.message?.includes('successful')) {
                    setSuccess(true);
                    return;
                } else {
                    setError('Payment failed.');
                    return;
                }
            } else if (paymentMethod === 'CARD' || paymentMethod === 'BANK TRANSFER') {
                // Integrate Pesapal for card and bank transfer
                const pesapalRes = await apiClient.post('/payments/pesapal', {
                    orderId: order._id || order.id,
                    amount: total,
                    phone,
                    email: user?.email ?? '',
                });
                if (pesapalRes.data && pesapalRes.data.paymentUrl) {
                    window.location.href = pesapalRes.data.paymentUrl;
                    return;
                } else {
                    setError('Failed to initiate payment.');
                    return;
                }
            } else if (paymentMethod.startsWith('PAYPAL')) {
                // TODO: Integrate PayPal payment
                setSuccess(true); // Simulate success for now
                return;
            }

            // Default: just show success
            setSuccess(true);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Checkout failed');
        } finally {
            setLoading(false);
        }
    };


    // Handle Pesapal callback (order confirmation)
    const pesapalStatus = getQueryParam('pesapal_status');
    const pesapalOrder = getQueryParam('orderTrackingId');
    if (pesapalStatus === 'success') {
        return (
            <div className="text-green-600">
                <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
                <p>Your order has been placed and payment was successful.</p>
                <p>Order Tracking ID: {pesapalOrder}</p>
            </div>
        );
    }
    if (success) {
        return <p className="text-green-600">Order placed successfully!</p>;
    }


    if (cartItems.length === 0) return <p>Your cart is empty.</p>;

    // Block checkout for unverified users
    if (!user) {
        return <p>You must be logged in to checkout.</p>;
    }
    if (user && (user as any).verified === false) {
        return (
            <div className="text-red-600 max-w-xl mx-auto p-4">
                <h2 className="text-xl font-bold mb-2">Email Verification Required</h2>
                <p>Your email address is not verified. Please check your inbox for a verification link before proceeding to checkout.</p>
                <p className="mt-2">If you did not receive the email, please check your spam folder or <a href="/resend-verification" className="underline text-blue-600">resend verification email</a>.</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <form
                className="space-y-4"
                onSubmit={e => {
                    e.preventDefault();
                    // Double check user is verified before allowing checkout
                    if (!user || (user as any).verified === false) return;
                    handleCheckout();
                }}
            >
                <div>
                    <label className="block font-medium mb-1">Full Name</label>
                    <Input value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div>
                    <label className="block font-medium mb-1">Address</label>
                    <Input value={address} onChange={e => setAddress(e.target.value)} required />
                </div>
                <div>
                    <label className="block font-medium mb-1">Delivery Location / Pickup Point</label>
                    <select
                        className="w-full border rounded-md px-3 py-2"
                        value={pickupPoint}
                        onChange={e => setPickupPoint(e.target.value)}
                        required
                        title="Select delivery location or pickup point"
                    >
                        <option value="">Select location</option>
                        {KENYA_LOCATIONS.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block font-medium mb-1">Phone Number</label>
                    <Input value={phone} onChange={e => setPhone(e.target.value)} required />
                </div>
                <div>
                    <label className="block font-medium mb-1">Payment Method</label>
                    <select
                        className="w-full border rounded-md px-3 py-2"
                        value={paymentMethod}
                        onChange={e => handlePaymentMethodChange(e.target.value)}
                        required
                        title="Select payment method"
                    >
                        {PAYMENT_METHODS.map(method => (
                            <option key={method} value={method}>{method}</option>
                        ))}
                    </select>
                </div>
                {showPin && (
                    <>
                        <div>
                            <label className="block font-medium mb-1">Mobile Money PIN</label>
                            <Input type="password" value={pin} onChange={e => setPin(e.target.value)} required />
                        </div>
                    </>
                )}
                <div className="border-t pt-4 mt-4">
                    <p>Subtotal: <b>KES {subtotal.toLocaleString()}</b></p>
                    <p>Shipping: <b>KES {shippingFee.toLocaleString()}</b></p>
                    <p>Total: <b>KES {total.toLocaleString()}</b></p>
                </div>
                <p>Number of items: {cartItems.length}</p>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Confirm and Pay'}
                </Button>
                {error && <p className="text-red-600 mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default Checkout;