import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cookies = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Cookie Notice</h1>
          <p className="text-muted-foreground mb-8">Last updated: August 9, 2025</p>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>What Are Cookies?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better browsing experience by remembering your preferences and analyzing how you use our site.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Types of Cookies We Use</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="default">Essential</Badge>
                      <h3 className="font-medium">Strictly Necessary Cookies</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      These cookies are essential for the website to function properly. They enable basic functions like page navigation and access to secure areas.
                    </p>
                    <p className="text-xs"><strong>Examples:</strong> Session management, security tokens, shopping cart functionality</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">Performance</Badge>
                      <h3 className="font-medium">Analytics Cookies</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                    </p>
                    <p className="text-xs"><strong>Examples:</strong> Google Analytics, page views, bounce rate, traffic sources</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">Functional</Badge>
                      <h3 className="font-medium">Functionality Cookies</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      These cookies enable enhanced functionality and personalization, such as remembering your preferences and choices.
                    </p>
                    <p className="text-xs"><strong>Examples:</strong> Language preferences, remembered login details, customized content</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="destructive">Marketing</Badge>
                      <h3 className="font-medium">Marketing Cookies</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      These cookies track your browsing habits to enable us to show advertising which is more likely to be of interest to you.
                    </p>
                    <p className="text-xs"><strong>Examples:</strong> Social media cookies, advertising network cookies, retargeting pixels</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Third-Party Cookies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p>We may use third-party services that set cookies on our website:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Google Analytics:</strong> Website analytics and performance tracking</li>
                    <li><strong>Facebook Pixel:</strong> Social media advertising and conversion tracking</li>
                    <li><strong>Payment Processors:</strong> Secure payment processing (M-Pesa, PayPal)</li>
                    <li><strong>Customer Support:</strong> Live chat and support features</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Managing Your Cookie Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm">
                    <h4 className="font-medium mb-2">Browser Settings</h4>
                    <p className="mb-2">You can control cookies through your browser settings:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Block all cookies</li>
                      <li>Allow only first-party cookies</li>
                      <li>Delete existing cookies</li>
                      <li>Set cookies to expire when you close your browser</li>
                    </ul>
                  </div>

                  <div className="text-sm">
                    <h4 className="font-medium mb-2">Cookie Banner</h4>
                    <p>When you first visit our website, you'll see a cookie banner where you can:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Accept all cookies</li>
                      <li>Reject non-essential cookies</li>
                      <li>Customize your preferences</li>
                    </ul>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button>Manage Preferences</Button>
                    <Button variant="outline">Clear All Cookies</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Impact of Disabling Cookies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p>Disabling certain cookies may impact your experience on our website:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Essential Cookies:</strong> Website may not function properly</li>
                    <li><strong>Analytics Cookies:</strong> We cannot improve our website based on usage data</li>
                    <li><strong>Functional Cookies:</strong> You may need to re-enter information on each visit</li>
                    <li><strong>Marketing Cookies:</strong> You may see less relevant advertisements</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Updates to This Notice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  We may update this Cookie Notice from time to time to reflect changes in our practices or applicable laws. We encourage you to review this notice periodically for any updates.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p>If you have questions about our use of cookies, please contact us:</p>
                  <div className="mt-3 space-y-1">
                    <p><strong>Email:</strong> {import.meta.env.VITE_COMPANY_EMAIL || 'info@medhelmsupplies.co.ke'}</p>
                    <p><strong>Phone:</strong> +254 746 020 323</p>
                    <p><strong>Address:</strong> Kiambu Town, Kenya</p>
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

export default Cookies;