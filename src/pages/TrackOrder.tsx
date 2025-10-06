import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Truck, MapPin, CheckCircle, AlertCircle, Clock, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { trackingService, TrackingData } from '../services/trackingApi';

const statusDisplayNames: { [key: string]: string } = {
  'pending': 'Order Placed',
  'processing': 'Processing',
  'confirmed': 'Confirmed',
  'shipped': 'Shipped',
  'out_for_delivery': 'Out for Delivery',
  'delivered': 'Delivered',
  'cancelled': 'Cancelled'
};

const statusColors: { [key: string]: string } = {
  'pending': 'bg-yellow-100 text-yellow-800',
  'processing': 'bg-blue-100 text-blue-800',
  'confirmed': 'bg-green-100 text-green-800',
  'shipped': 'bg-purple-100 text-purple-800',
  'out_for_delivery': 'bg-orange-100 text-orange-800',
  'delivered': 'bg-green-100 text-green-800',
  'cancelled': 'bg-red-100 text-red-800'
};

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderData, setOrderData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async () => {
    if (!orderNumber.trim()) {
      setError('Please enter an order ID');
      return;
    }

    setLoading(true);
    setError(null);
    setOrderData(null);

    try {
      const data = await trackingService.trackOrder(orderNumber.trim());
      setOrderData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to track order');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Track Your Order</h1>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Enter Order Details</CardTitle>
              <CardDescription>
                Enter your order ID to track its current status and delivery progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="Order ID (e.g. 676a1b2c3d4e5f6789012345)"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                />
                <Button onClick={handleTrack} disabled={loading}>
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Package className="mr-2 h-4 w-4" />
                  )}
                  Track Order
                </Button>
              </div>
              {error && (
                <div className="mt-4 flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {orderData && (
            <div className="space-y-6">
              {/* Order Summary Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Information</CardTitle>
                  <div className="flex items-center gap-4">
                    <Badge className={statusColors[orderData.status] || 'bg-gray-100 text-gray-800'}>
                      {statusDisplayNames[orderData.status] || orderData.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Order ID: {orderData.orderId}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Total Amount</p>
                        <p className="text-sm text-muted-foreground">KES {orderData.totalAmount.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Order Date</p>
                        <p className="text-sm text-muted-foreground">{formatDate(orderData.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Delivery Address</p>
                        <p className="text-sm text-muted-foreground">
                          {orderData.shippingAddress.city}, {orderData.shippingAddress.county}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Items Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderData.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium">KES {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Timeline Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Tracking Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderData.timeline.length > 0 ? (
                      orderData.timeline.map((event, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                          <div className="flex-1">
                            <p className="font-medium">{statusDisplayNames[event.status] || event.status}</p>
                            <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
                            {event.note && (
                              <p className="text-xs text-muted-foreground mt-1">{event.note}</p>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-muted-foreground py-4">
                        <Clock className="h-8 w-8 mx-auto mb-2" />
                        <p>No tracking events yet. Your order is being processed.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">{orderData.shippingAddress.fullName}</p>
                    <p className="text-sm text-muted-foreground">{orderData.shippingAddress.deliveryLocation}</p>
                    <p className="text-sm text-muted-foreground">
                      {orderData.shippingAddress.city}, {orderData.shippingAddress.county}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackOrder;