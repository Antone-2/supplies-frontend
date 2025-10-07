import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send
} from 'lucide-react';

// Custom X (Twitter) Icon Component
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Custom WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488" />
  </svg>
);
import medHelmLogo from '@/assets/medhelm-logo.svg';
import NewsletterSubscription from '@/components/NewsletterSubscription';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter section */}
      <div className="bg-accent py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <NewsletterSubscription
              variant="footer"
              title="Stay Updated on Medical Supplies"
              description="Get the latest updates on new products, special offers, and healthcare tips delivered directly to your inbox."
              className="bg-white/10 backdrop-blur-sm border-white/20"
            />
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src={medHelmLogo} alt="MEDHELM Supplies" className="h-28 w-28" />
                <div>
                  <h3 className="text-2xl font-bold font-bold">MEDHELM</h3>
                  <p className="text-sm opacity-80">SUPPLIES</p>
                </div>
              </div>
              <p className="text-primary-foreground/80 mb-6 leading-relaxed">
                Your trusted partner for quality medical supplies and equipment in Kenya.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-white/10 p-2"
                  asChild
                >
                  <a href={import.meta.env.VITE_SOCIAL_FACEBOOK} target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-white/10 p-2"
                  asChild
                >
                  <a href={import.meta.env.VITE_SOCIAL_TWITTER} target="_blank" rel="noopener noreferrer">
                    <XIcon className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-white/10 p-2"
                  asChild
                >
                  <a href={import.meta.env.VITE_SOCIAL_INSTAGRAM} target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-white/10 p-2"
                  asChild
                >
                  <a href={import.meta.env.VITE_SOCIAL_LINKEDIN} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white font-playfair">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link to="/" className="text-primary-foreground/80 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/products" className="text-primary-foreground/80 hover:text-white transition-colors">Products</Link></li>
                <li><Link to="/categories" className="text-primary-foreground/80 hover:text-white transition-colors">Categories</Link></li>
                <li><Link to="/reviews" className="text-primary-foreground/80 hover:text-white transition-colors">Reviews</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white font-playfair">Customer Service</h4>
              <ul className="space-y-3">
                <li><Link to="/track-order" className="text-primary-foreground/80 hover:text-white transition-colors">Track Your Order</Link></li>
                <li><Link to="/returns" className="text-primary-foreground/80 hover:text-white transition-colors">Returns & Refunds</Link></li>
                <li><Link to="/delivery-policy" className="text-primary-foreground/80 hover:text-white transition-colors">Delivery Policy</Link></li>
                <li><Link to="/terms" className="text-primary-foreground/80 hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="text-primary-foreground/80 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="text-primary-foreground/80 hover:text-white transition-colors">Cookie Notice</Link></li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white font-playfair">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-1 text-white" />
                  <div>
                    <p className="text-primary-foreground/80">
                      Kiambu Town, Kenya<br />
                      Opposite Kiambu Level 5 Hospital
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-white" />
                  <p className="text-primary-foreground/80">+254 746 020 323</p>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-white" />
                  <p className="text-primary-foreground/80">{import.meta.env.VITE_COMPANY_EMAIL}</p>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 mt-1 text-white" />
                  <div>
                    <p className="text-primary-foreground/80">
                      Mon - Fri: 8:00 AM - 6:00 PM<br />
                      Sat: 9:00 AM - 4:00 PM<br />
                      Sun: Emergency only
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm font-inter">
              © 2025 MEDHELM Supplies. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-sm text-primary-foreground/60">Developer</span>
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '254726238126'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-foreground/60 hover:text-green-400 transition-colors"
                    title="WhatsApp"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:onyangoantone1@gmail.com"
                    className="text-primary-foreground/60 hover:text-red-400 transition-colors"
                    title="Gmail"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-primary-foreground/60">
                <span>Payments:</span>
                <div className="flex gap-3">
                  <span className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    <span>M-Pesa</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    <span>Airtel Money</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>PayPal</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>Bank Transfer</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;