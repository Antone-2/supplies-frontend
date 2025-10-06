import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Terms & Conditions</h1>
          <p className="text-muted-foreground mb-8">Last updated: August 9, 2025</p>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  By accessing and using MEDHELM Supplies website and services, you accept and agree to be bound by the terms and provision of this agreement. These terms apply to all visitors, users and others who access or use the service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Use License</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p>Permission is granted to temporarily download one copy of the materials on MEDHELM Supplies website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>modify or copy the materials</li>
                    <li>use the materials for any commercial purpose or for any public display</li>
                    <li>attempt to reverse engineer any software contained on the website</li>
                    <li>remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Product Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p>MEDHELM Supplies provides medical supplies and equipment. All products listed are subject to availability. We reserve the right to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Limit quantities of any products or services offered</li>
                    <li>Discontinue any product at any time</li>
                    <li>Refuse service to anyone at our sole discretion</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Pricing and Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p>All prices are listed in Kenya Shillings (KSh) and are subject to change without notice. We accept the following payment methods:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>M-Pesa</li>
                    <li>Airtel Money</li>
                    <li>Bank Transfer</li>
                    <li>PayPal (for international orders)</li>
                  </ul>
                  <p>Payment must be received before order processing begins.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Medical Disclaimer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p><strong>Important:</strong> MEDHELM Supplies is a medical supply distributor. We do not provide medical advice or diagnosis. All medical supplies should be used under the guidance of qualified healthcare professionals.</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Consult healthcare professionals before using any medical equipment</li>
                    <li>Follow all manufacturer instructions and safety guidelines</li>
                    <li>Ensure proper training before using specialized medical equipment</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Privacy and Data Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Your privacy is important to us. We collect and process personal information in accordance with our Privacy Policy. By using our services, you consent to the collection and use of information as outlined in our Privacy Policy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  MEDHELM Supplies shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of our products or services. Our liability is limited to the purchase price of the products.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Governing Law</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  These terms and conditions are governed by and construed in accordance with the laws of Kenya. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Kenya.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p>If you have any questions about these Terms & Conditions, please contact us:</p>
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

export default Terms;