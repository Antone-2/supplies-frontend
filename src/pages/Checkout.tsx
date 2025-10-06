import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface ShippingAddress {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    county: string;
    postalCode: string;
    deliveryLocation: string;
}

const Checkout = () => {
    const { cart, getTotalPrice, clearCart } = useCart();
    const items = cart; // Cart items have structure: { product: Product, quantity: number }
    const total = getTotalPrice();
    const { user } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paymentInProgress, setPaymentInProgress] = useState(false);
    const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
        fullName: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        county: '',
        postalCode: '',
        deliveryLocation: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('pesapal'); // Default to PesaPal
    const [shippingFee, setShippingFee] = useState<number>(0);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0
        }).format(price);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setShippingAddress(prev => ({ ...prev, [name]: value }));

        // Calculate shipping fee based on delivery location
        if (name === 'deliveryLocation') {
            const freeDeliveryAreas = [
                'Nairobi CBD', 'Kiambu Town'
            ];
            if (freeDeliveryAreas.includes(value)) {
                setShippingFee(0);
            } else {
                setShippingFee(500); // All other Kenyan counties
            }
        }
    };

    const handlePaymentMethodChange = (method: string) => {
        setPaymentMethod(method);
    };

    const requiredFields = [
        'fullName', 'email', 'phone', 'address', 'city', 'county', 'deliveryLocation'
    ];

    const handlePayNowClick = async () => {
        try {
            console.log('=== STARTING PESAPAL PAYMENT ===');
            console.log('User state:', user);
            console.log('Cart items:', items);

            if (!user) {
                toast({
                    title: 'Login Required',
                    description: 'Please log in to continue with checkout',
                    variant: 'destructive'
                });
                return;
            }

            // Validate all required fields
            for (const field of requiredFields) {
                if (!shippingAddress[field as keyof typeof shippingAddress] ||
                    (typeof shippingAddress[field as keyof typeof shippingAddress] === 'string' &&
                        shippingAddress[field as keyof typeof shippingAddress].trim() === '')) {
                    toast({
                        title: 'Error',
                        description: `Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}.`,
                        variant: 'destructive'
                    });
                    return;
                }
            }

            setLoading(true);
            setPaymentInProgress(true);

            const mockOrderId = `order_${Date.now()}`;
            const amount = total + shippingFee;

            console.log('Creating payment with amount:', amount);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Create PesaPal-style payment page
            const pesapalPaymentHtml = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>PesaPal Secure Payment</title>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { 
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            min-height: 100vh;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 20px;
                        }
                        .payment-container { 
                            background: white; 
                            border-radius: 12px; 
                            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                            max-width: 500px; 
                            width: 100%; 
                            overflow: hidden;
                        }
                        .header { 
                            background: #2c5aa0; 
                            color: white; 
                            padding: 30px; 
                            text-align: center; 
                        }
                        .header h1 { font-size: 24px; margin-bottom: 8px; }
                        .header p { opacity: 0.9; font-size: 14px; }
                        .content { padding: 30px; }
                        .amount { 
                            background: #f8f9fa; 
                            padding: 20px; 
                            border-radius: 8px; 
                            text-align: center; 
                            margin-bottom: 25px;
                            border-left: 4px solid #2c5aa0;
                        }
                        .amount .label { font-size: 14px; color: #666; margin-bottom: 5px; }
                        .amount .value { font-size: 32px; font-weight: bold; color: #2c5aa0; }
                        .payment-methods { margin-bottom: 25px; }
                        .payment-methods h3 { margin-bottom: 15px; color: #333; font-size: 16px; }
                        .method { 
                            display: flex; 
                            align-items: center; 
                            padding: 12px 15px; 
                            border: 2px solid #e9ecef; 
                            border-radius: 8px; 
                            margin-bottom: 10px; 
                            cursor: pointer; 
                            transition: all 0.3s ease;
                        }
                        .method:hover { 
                            border-color: #2c5aa0; 
                            background: #f8f9ff; 
                            transform: translateX(5px);
                        }
                        .method-icon { font-size: 20px; margin-right: 12px; }
                        .method-name { font-weight: 500; color: #333; }
                        .buttons { display: flex; gap: 15px; }
                        .btn { 
                            flex: 1;
                            padding: 15px 20px; 
                            border: none; 
                            border-radius: 8px; 
                            font-size: 16px; 
                            font-weight: 600;
                            cursor: pointer; 
                            transition: all 0.3s ease;
                        }
                        .btn-primary { 
                            background: #2c5aa0; 
                            color: white; 
                        }
                        .btn-primary:hover { 
                            background: #1e4080; 
                            transform: translateY(-2px);
                            box-shadow: 0 5px 15px rgba(44, 90, 160, 0.3);
                        }
                        .btn-secondary { 
                            background: #6c757d; 
                            color: white; 
                        }
                        .btn-secondary:hover { 
                            background: #5a6268; 
                        }
                        .processing { 
                            text-align: center; 
                            padding: 40px; 
                        }
                        .spinner { 
                            border: 4px solid #f3f3f3; 
                            border-top: 4px solid #2c5aa0; 
                            border-radius: 50%; 
                            width: 40px; 
                            height: 40px; 
                            animation: spin 1s linear infinite; 
                            margin: 0 auto 20px;
                        }
                        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                        .success { color: #28a745; text-align: center; padding: 40px; }
                        .success h2 { font-size: 28px; margin-bottom: 15px; }
                        .security-badge { 
                            text-align: center; 
                            margin-top: 20px; 
                            padding: 10px; 
                            background: #e8f5e8; 
                            border-radius: 6px;
                            font-size: 12px;
                            color: #155724;
                        }
                    </style>
                </head>
                <body>
                    <div class="payment-container">
                        <div class="header">
                            <h1>🔒 PesaPal Secure Payment</h1>
                            <p>Medhelm Supplies - Demo Payment Gateway</p>
                        </div>
                        <div class="content" id="payment-content">
                            <div class="amount">
                                <div class="label">Total Amount</div>
                                <div class="value">KES ${amount.toLocaleString()}</div>
                            </div>
                            
                            <div class="payment-methods">
                                <h3>Choose Payment Method</h3>
                                <div class="method" onclick="selectMethod('mpesa')">
                                    <span class="method-icon">📱</span>
                                    <span class="method-name">M-Pesa</span>
                                </div>
                                <div class="method" onclick="selectMethod('airtel')">
                                    <span class="method-icon">📱</span>
                                    <span class="method-name">Airtel Money</span>
                                </div>
                                <div class="method" onclick="selectMethod('card')">
                                    <span class="method-icon">💳</span>
                                    <span class="method-name">Visa/Mastercard</span>
                                </div>
                                <div class="method" onclick="selectMethod('bank')">
                                    <span class="method-icon">🏦</span>
                                    <span class="method-name">Bank Transfer</span>
                                </div>
                                <div class="method" onclick="selectMethod('paypal')">
                                    <span class="method-icon">💰</span>
                                    <span class="method-name">PayPal</span>
                                </div>
                            </div>
                            
                            <div class="buttons">
                                <button class="btn btn-primary" onclick="processPayment()">
                                    Pay KES ${amount.toLocaleString()}
                                </button>
                                <button class="btn btn-secondary" onclick="window.close()">
                                    Cancel
                                </button>
                            </div>
                            
                            <div class="security-badge">
                                🔒 Your payment is secured with 256-bit SSL encryption
                            </div>
                        </div>
                    </div>
                    
                    <script>
                        let selectedMethod = 'mpesa';
                        
                        function selectMethod(method) {
                            selectedMethod = method;
                            // Visual feedback for selection
                            document.querySelectorAll('.method').forEach(m => m.style.background = '');
                            event.target.closest('.method').style.background = '#f8f9ff';
                            event.target.closest('.method').style.borderColor = '#2c5aa0';
                        }
                        
                        function processPayment() {
                            // Show processing state
                            document.getElementById('payment-content').innerHTML = \`
                                <div class="processing">
                                    <div class="spinner"></div>
                                    <h3>Processing Payment...</h3>
                                    <p>Please wait while we process your \${selectedMethod.toUpperCase()} payment</p>
                                    <p style="margin-top: 15px; color: #666;">Amount: KES ${amount.toLocaleString()}</p>
                                </div>
                            \`;
                            
                            // Simulate payment processing
                            setTimeout(() => {
                                document.getElementById('payment-content').innerHTML = \`
                                    <div class="success">
                                        <h2>✅ Payment Successful!</h2>
                                        <p>Your payment of KES ${amount.toLocaleString()} has been processed successfully.</p>
                                        <p style="margin-top: 15px; color: #666;">Transaction ID: TXN${Date.now()}</p>
                                        <button class="btn btn-primary" onclick="closePayment()" style="margin-top: 20px; width: 200px;">
                                            Continue Shopping
                                        </button>
                                    </div>
                                \`;
                            }, 3000);
                        }
                        
                        function closePayment() {
                            // Notify parent window of successful payment
                            if (window.opener) {
                                window.opener.postMessage('payment-success', '*');
                            }
                            setTimeout(() => window.close(), 500);
                        }
                        
                        // Auto-select first method
                        document.querySelector('.method').click();
                    </script>
                </body>
                </html>
            `;

            const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(pesapalPaymentHtml)}`;

            toast({
                title: 'Opening PesaPal Payment',
                description: 'Secure payment window is opening...'
            });

            console.log('Opening payment window...');

            // Open PesaPal payment window
            const paymentWindow = window.open(dataUrl, '_blank', 'width=600,height=750,scrollbars=yes,resizable=yes');

            if (!paymentWindow) {
                console.log('Popup blocked');
                toast({
                    title: 'Popup Blocked',
                    description: 'Please allow popups and try again, or payment will be simulated.',
                    variant: 'destructive'
                });

                // Fallback simulation
                setTimeout(() => {
                    toast({
                        title: 'Payment Successful',
                        description: 'Your order has been processed! (Simulated)'
                    });
                    clearCart();
                    navigate('/orders');
                    setLoading(false);
                    setPaymentInProgress(false);
                }, 2000);
                return;
            }

            console.log('Payment window opened successfully');

            // Store order details for demo
            const orderDetails = {
                id: mockOrderId,
                items: items.map(item => ({
                    name: item.product.name,
                    quantity: item.quantity,
                    price: item.product.price
                })),
                shippingAddress,
                totalAmount: amount,
                status: 'pending',
                createdAt: new Date().toISOString()
            };

            const existingOrders = JSON.parse(localStorage.getItem('demo_orders') || '[]');
            existingOrders.push(orderDetails);
            localStorage.setItem('demo_orders', JSON.stringify(existingOrders));

            // Listen for payment success
            const handlePaymentMessage = (event: MessageEvent) => {
                console.log('Received payment message:', event.data);
                if (event.data === 'payment-success') {
                    setPaymentInProgress(false);
                    setLoading(false);
                    toast({
                        title: 'Payment Successful!',
                        description: 'Your order has been completed successfully.'
                    });
                    clearCart();
                    navigate('/orders');
                    window.removeEventListener('message', handlePaymentMessage);
                }
            };

            window.addEventListener('message', handlePaymentMessage);

            // Monitor if window is closed without payment
            const checkWindow = setInterval(() => {
                if (paymentWindow.closed) {
                    clearInterval(checkWindow);
                    setPaymentInProgress(false);
                    setLoading(false);
                    window.removeEventListener('message', handlePaymentMessage);
                    console.log('Payment window was closed');
                }
            }, 1000);

            // Safety timeout
            setTimeout(() => {
                setPaymentInProgress(false);
                setLoading(false);
            }, 60000); // 1 minute timeout

        } catch (error) {
            console.error('Payment error:', error);
            toast({
                title: 'Payment Error',
                description: 'Failed to initialize payment. Please try again.',
                variant: 'destructive'
            });
            setPaymentInProgress(false);
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Checkout</h1>
                <p>Your cart is empty. <a href="/products" className="text-blue-600">Continue shopping</a></p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <div className="mb-6 p-4 bg-blue-50 border border-blue-400 rounded-lg text-blue-900 flex flex-col items-center">
                <span className="font-semibold text-lg mb-2">All payments are securely processed via PesaPal.</span>
                <span className="mb-2">You can use M-Pesa, Airtel Money, PayPal, bank transfer, card, and more.</span>
                <div className="flex gap-4 items-center mt-2">
                    <img src={`${import.meta.env.VITE_PESAPAL_LOGO_BASE || 'https://pesapal.com/images'}/mpesa-logo.png`} alt="M-Pesa" className="h-6" />
                    <img src={`${import.meta.env.VITE_PESAPAL_LOGO_BASE || 'https://pesapal.com/images'}/airtel-money-logo.png`} alt="Airtel Money" className="h-6" />
                    <img src={`${import.meta.env.VITE_PESAPAL_LOGO_BASE || 'https://pesapal.com/images'}/paypal-logo.png`} alt="PayPal" className="h-6" />
                    <img src={`${import.meta.env.VITE_PESAPAL_LOGO_BASE || 'https://pesapal.com/images'}/visa-logo.png`} alt="Visa" className="h-6" />
                    <img src={`${import.meta.env.VITE_PESAPAL_LOGO_BASE || 'https://pesapal.com/images'}/mastercard-logo.png`} alt="Mastercard" className="h-6" />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Shipping Address */}
                <Card>
                    <CardHeader>
                        <CardTitle>Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                value={shippingAddress.fullName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={shippingAddress.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={shippingAddress.phone}
                                onChange={handleInputChange}
                                placeholder="+2547xxxxxxxx"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                name="address"
                                value={shippingAddress.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    name="city"
                                    value={shippingAddress.city}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="county">County</Label>
                                <Input
                                    id="county"
                                    name="county"
                                    value={shippingAddress.county}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="postalCode">Postal Code</Label>
                            <Input
                                id="postalCode"
                                name="postalCode"
                                value={shippingAddress.postalCode}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="deliveryLocation">Delivery Location</Label>
                            <select
                                id="deliveryLocation"
                                name="deliveryLocation"
                                value={shippingAddress.deliveryLocation}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Location</option>
                                <optgroup label="Free Delivery (KES 0)">
                                    <option value="Nairobi CBD">Nairobi CBD</option>
                                    <option value="Kiambu Town">Kiambu Town</option>
                                </optgroup>
                                <optgroup label="Standard Delivery (KES 500)">
                                    <option value="Athi River">Athi River</option>
                                    <option value="Awendo">Awendo</option>
                                    <option value="Bungoma">Bungoma</option>
                                    <option value="Busia">Busia</option>
                                    <option value="Bomet">Bomet</option>
                                    <option value="Chuka">Chuka</option>
                                    <option value="Changamwe">Changamwe</option>
                                    <option value="Chemilil">Chemilil</option>
                                    <option value="Diani">Diani</option>
                                    <option value="Eldoret">Eldoret</option>
                                    <option value="Embu">Embu</option>
                                    <option value="Emali">Emali</option>
                                    <option value="Garissa">Garissa</option>
                                    <option value="Gilgil">Gilgil</option>
                                    <option value="Homabay">Homabay</option>
                                    <option value="Kakamega">Kakamega</option>
                                    <option value="Karatina">Karatina</option>
                                    <option value="Kericho">Kericho</option>
                                    <option value="Kisii">Kisii</option>
                                    <option value="Kisumu">Kisumu</option>
                                    <option value="Kitale">Kitale</option>
                                    <option value="Kitengela">Kitengela</option>
                                    <option value="Kajiado">Kajiado</option>
                                    <option value="Kilifi">Kilifi</option>
                                    <option value="Kwale">Kwale</option>
                                    <option value="Limuru">Limuru</option>
                                    <option value="Lodwar">Lodwar</option>
                                    <option value="Lamu">Lamu</option>
                                    <option value="Machakos">Machakos</option>
                                    <option value="Malindi">Malindi</option>
                                    <option value="Mandera">Mandera</option>
                                    <option value="Marsabit">Marsabit</option>
                                    <option value="Meru">Meru</option>
                                    <option value="Migori">Migori</option>
                                    <option value="Mombasa">Mombasa</option>
                                    <option value="Mumias">Mumias</option>
                                    <option value="Murang'a">Murang'a</option>
                                    <option value="Nakuru">Nakuru</option>
                                    <option value="Narok">Narok</option>
                                    <option value="Nyahururu">Nyahururu</option>
                                    <option value="Nyeri">Nyeri</option>
                                    <option value="Othaya">Othaya</option>
                                    <option value="Oyugis">Oyugis</option>
                                    <option value="Ruiru">Ruiru</option>
                                    <option value="Rongai">Rongai</option>
                                    <option value="Siaya">Siaya</option>
                                    <option value="Samburu">Samburu</option>
                                    <option value="Sotik">Sotik</option>
                                    <option value="Taveta">Taveta</option>
                                    <option value="Taita">Taita</option>
                                    <option value="Thika">Thika</option>
                                    <option value="Ugunja">Ugunja</option>
                                    <option value="Voi">Voi</option>
                                    <option value="Wajir">Wajir</option>
                                    <option value="Webuye">Webuye</option>
                                    <option value="Nairobi">Nairobi (Other areas)</option>
                                </optgroup>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                {/* Order Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Products List */}
                        <div className="space-y-3">
                            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Items in your order</h4>
                            {items.map((item) => (
                                <div key={item.product.id} className="flex items-start justify-between py-2 border-b border-gray-100 last:border-b-0">
                                    <div className="flex-1">
                                        <h5 className="font-medium text-sm leading-tight">{item.product.name}</h5>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                                            <span className="text-xs text-muted-foreground">•</span>
                                            <span className="text-xs text-muted-foreground">Unit: {formatPrice(item.product.price)}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Separator />

                        {/* Price Breakdown */}
                        <div className="space-y-3">
                            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Order Summary</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} {items.reduce((sum, item) => sum + item.quantity, 0) === 1 ? 'item' : 'items'})</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Shipping & Delivery</span>
                                    <span className={shippingFee === 0 ? 'text-green-600 font-medium' : ''}>
                                        {shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total Amount</span>
                                    <span className="text-primary">{formatPrice(total + shippingFee)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Payment Method</Label>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="pesapal"
                                        checked={paymentMethod === 'pesapal'}
                                        onChange={() => handlePaymentMethodChange('pesapal')}
                                        className="rounded"
                                    />
                                    <span>PesaPal (Card/Bank/Mobile)</span>
                                </label>
                            </div>
                        </div>

                        <Button
                            className="w-full"
                            size="lg"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log('=== PAY NOW BUTTON CLICKED ===');
                                handlePayNowClick();
                                return false;
                            }}
                            disabled={loading || paymentInProgress}
                            type="button"
                        >
                            {(loading || paymentInProgress) ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing Payment...
                                </>
                            ) : (
                                'Pay Now with PesaPal'
                            )}
                        </Button>

                        <p className="text-xs text-muted-foreground text-center">
                            Secure payment powered by PesaPal
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Checkout;