import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LuPackage, LuTruck, LuMapPin, LuCheck } from 'react-icons/lu';
// ...existing code...
import Footer from '@/components/Footer';

const TrackOrder = () => {
    const [orderNumber, setOrderNumber] = useState('');
    const [orderStatus, setOrderStatus] = useState<any>(null);

    const handleTrack = () => {
        // Simulate order tracking
        if (orderNumber) {
            setOrderStatus({
                orderNumber: orderNumber,
                status: 'In Transit',
                estimatedDelivery: '2025-08-12',
                currentLocation: 'Nairobi Distribution Center',
                trackingSteps: [
                    { step: 'Order Placed', completed: true, date: '2025-08-09' },
                    { step: 'Payment Confirmed', completed: true, date: '2025-08-09' },
                    { step: 'Processing', completed: true, date: '2025-08-10' },
                    { step: 'Shipped', completed: true, date: '2025-08-11' },
                    { step: 'In Transit', completed: true, date: '2025-08-11' },
                    { step: 'Out for Delivery', completed: false, date: '2025-08-12' },
                    { step: 'Delivered', completed: false, date: '2025-08-12' }
                ]
            });
        }
    };

    return (
        <div className="min-h-screen">
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Track Your Order</h1>

                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Enter Order Details</CardTitle>
                            <CardDescription>
                                Enter your order number to track its status
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4">
                                <Input
                                    placeholder="Order Number (e.g. MH-2025-001)"
                                    value={orderNumber}
                                    onChange={(e) => setOrderNumber(e.target.value)}
                                    className="flex-1"
                                />
                                <Button onClick={handleTrack}>
                                    <LuPackage className="mr-2 h-4 w-4" />
                                    Track Order
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {orderStatus && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Status</CardTitle>
                                <div className="flex items-center gap-4">
                                    <Badge variant="secondary">{orderStatus.status}</Badge>
                                    <span className="text-sm text-muted-foreground">
                                        Order: {orderStatus.orderNumber}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-6">
                                    <div className="flex items-center gap-3">
                                        <LuTruck className="h-5 w-5 text-primary" />
                                        <div>
                                            <p className="font-medium">Current Location</p>
                                            <p className="text-sm text-muted-foreground">{orderStatus.currentLocation}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <LuMapPin className="h-5 w-5 text-primary" />
                                        <div>
                                            <p className="font-medium">Estimated Delivery</p>
                                            <p className="text-sm text-muted-foreground">{orderStatus.estimatedDelivery}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-medium">Tracking History</h3>
                                    {orderStatus.trackingSteps.map((step: any, index: number) => (
                                        <div key={index} className="flex items-center gap-4">
                                            {step.completed ? (
                                                <LuCheck className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
                                            )}
                                            <div className="flex-1">
                                                <p className={`font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                    {step.step}
                                                </p>
                                                <p className="text-sm text-muted-foreground">{step.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TrackOrder;