import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '../components/ui/badge';
import { Truck, Clock, MapPin, Shield } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DeliveryPolicy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Delivery Policy</h1>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Delivery Options
                </CardTitle>
                <CardDescription>
                  We offer multiple delivery options to meet your medical supply needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Standard Delivery</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">3-5 business days</p>
                    <p className="text-sm">Free for orders over KSh 5,000</p>
                    <p className="text-sm">KSh 500 for orders under KSh 5,000</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Truck className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Express Delivery</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">1-2 business days</p>
                    <p className="text-sm">KSh 1,000 flat rate</p>
                    <p className="text-sm">Available in major cities</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Emergency Delivery</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Same day delivery</p>
                    <p className="text-sm">KSh 2,500 flat rate</p>
                    <p className="text-sm">Available for critical medical supplies</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Pickup Service</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Free pickup</p>
                    <p className="text-sm">From our Kiambu location</p>
                    <p className="text-sm">Mon-Sat: 8AM-6PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3 text-green-600">Free Delivery Zones</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Kiambu County</li>
                      <li>• Nairobi County</li>
                      <li>• Thika Town</li>
                      <li>• Ruiru Town</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3 text-blue-600">Standard Delivery Zones</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Central Kenya Region</li>
                      <li>• Mombasa County</li>
                      <li>• Kisumu County</li>
                      <li>• Nakuru County</li>
                      <li>• Other major towns</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Badge variant="outline" className="min-w-8 h-8 flex items-center justify-center">1</Badge>
                    <div>
                      <h3 className="font-medium">Order Confirmation</h3>
                      <p className="text-sm text-muted-foreground">
                        You'll receive an order confirmation email with tracking information.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Badge variant="outline" className="min-w-8 h-8 flex items-center justify-center">2</Badge>
                    <div>
                      <h3 className="font-medium">Processing</h3>
                      <p className="text-sm text-muted-foreground">
                        Orders are processed within 1 business day. Express orders within 2 hours.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Badge variant="outline" className="min-w-8 h-8 flex items-center justify-center">3</Badge>
                    <div>
                      <h3 className="font-medium">Dispatch</h3>
                      <p className="text-sm text-muted-foreground">
                        You'll receive a dispatch notification with tracking details.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Badge variant="outline" className="min-w-8 h-8 flex items-center justify-center">4</Badge>
                    <div>
                      <h3 className="font-medium">Delivery</h3>
                      <p className="text-sm text-muted-foreground">
                        Our delivery team will contact you before delivery. Signature required for all orders.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Important Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Temperature-Controlled Items</h3>
                    <p className="text-sm text-muted-foreground">
                      Medications and temperature-sensitive supplies are delivered in specialized vehicles
                      with temperature monitoring to maintain product integrity.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Delivery Attempts</h3>
                    <p className="text-sm text-muted-foreground">
                      We make up to 3 delivery attempts. If unsuccessful, items will be held at our
                      facility for 7 days before being returned to inventory.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Damaged Items</h3>
                    <p className="text-sm text-muted-foreground">
                      Please inspect items upon delivery. Report any damage within 24 hours for
                      immediate replacement or refund.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DeliveryPolicy;