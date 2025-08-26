import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

// Custom WhatsApp Icon Component
const WhatsappIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.007-.372-.009-.571-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.077 4.363.71.306 1.263.489 1.695.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 6.107h-.001a8.77 8.77 0 01-4.473-1.231l-.321-.191-3.326.874.889-3.24-.209-.332a8.725 8.725 0 01-1.334-4.626c.001-4.822 3.934-8.754 8.757-8.754 2.338 0 4.529.911 6.18 2.563a8.68 8.68 0 012.575 6.18c-.003 4.822-3.936 8.754-8.757 8.754zm7.149-15.927A10.449 10.449 0 0012.05 1.5C6.228 1.5 1.3 6.428 1.298 12.25c0 2.164.566 4.281 1.641 6.125l-1.749 6.387a1 1 0 001.225 1.225l6.386-1.749a10.43 10.43 0 004.249.964h.004c5.822 0 10.75-4.928 10.752-10.75a10.42 10.42 0 00-3.062-7.637z" />
    </svg>
);

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
import medHelmLogo from '@/assets/medhelm-logo.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('idle');
        setMessage('');
        // Basic email validation
        if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            setStatus('error');
            setMessage('Please enter a valid email address.');
            return;
        }
        setStatus('loading');
        try {
            // Replace with your backend endpoint if available
            const res = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (res.ok) {
                setStatus('success');
                setMessage('Thank you for subscribing!');
                setEmail('');
            } else {
                const data = await res.json().catch(() => ({}));
                setStatus('error');
                setMessage(data.message || 'Subscription failed. Please try again.');
            }
        } catch (err) {
            setStatus('error');
            setMessage('Network error. Please try again.');
        }
    };

    return (
        <footer className="bg-primary text-primary-foreground">
            {/* Newsletter section */}
            <div className="bg-primary/90 py-12">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold mb-4 text-accent-foreground">
                            Stay Updated on Medical Supplies
                        </h3>
                        <p className="text-accent-foreground/80 mb-6">
                            Get the latest updates on new products, special offers, and healthcare tips
                            delivered directly to your inbox.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder="Enter your email address"
                                className="bg-white text-foreground"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                disabled={status === 'loading'}
                                required
                                aria-label="Email address"
                            />
                            <Button
                                type="submit"
                                className="bg-primary hover:bg-primary-light text-white"
                                disabled={status === 'loading'}
                            >
                                <Send className="mr-2 h-4 w-4" />
                                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                            </Button>
                        </form>
                        {message && (
                            <div className={`mt-4 text-sm ${status === 'success' ? 'text-green-300' : 'text-red-300'}`}>{message}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main footer */}
            <div className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {/* Company info */}
                        <div className="lg:col-span-1">
                            <div className="flex items-center gap-3">
                                <img src={medHelmLogo} className="h-24 w-24 drop-shadow-xl" alt="Medhelm Supplies Logo" />
                                <div>
                                    <h3 className="text-xl font-bold">MEDHELM</h3>
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
                                    <a href="https://facebook.co.ke/medhelmsupplies" target="_blank" rel="noopener noreferrer">
                                        <Facebook className="h-4 w-4" />
                                    </a>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hover:bg-white/10 p-2"
                                    asChild
                                >
                                    <a href="https://x.co.ke/medhelmsupplies" target="_blank" rel="noopener noreferrer">
                                        <XIcon className="h-4 w-4" />
                                    </a>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hover:bg-white/10 p-2"
                                    asChild
                                >
                                    <a href="https://instagram.co.ke/medhelmsupplies" target="_blank" rel="noopener noreferrer">
                                        <Instagram className="h-4 w-4" />
                                    </a>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hover:bg-white/10 p-2"
                                    asChild
                                >
                                    <a href="https://linkedin.co.ke/company/medhelmsupplies" target="_blank" rel="noopener noreferrer">
                                        <Linkedin className="h-4 w-4" />
                                    </a>
                                </Button>
                            </div>
                        </div>

                        {/* Quick links */}
                        <div>
                            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                            <ul className="space-y-3">
                                <li><Link to="/" className="text-primary-foreground/80 hover:text-white transition-colors">Home</Link></li>
                                <li><a href="/#products" className="text-primary-foreground/80 hover:text-white transition-colors">Products</a></li>
                                <li><a href="/#categories" className="text-primary-foreground/80 hover:text-white transition-colors">Categories</a></li>
                                <li><Link to="/about" className="text-primary-foreground/80 hover:text-white transition-colors">About Us</Link></li>
                                <li><Link to="/contact" className="text-primary-foreground/80 hover:text-white transition-colors">Contact</Link></li>
                                <li><a href="/#reviews" className="text-primary-foreground/80 hover:text-white transition-colors">Reviews</a></li>
                            </ul>
                        </div>

                        {/* Customer service */}
                        <div>
                            <h4 className="text-lg font-semibold mb-6">Customer Service</h4>
                            <ul className="space-y-3">
                                <li><Link to="/track-order" className="text-primary-foreground/80 hover:text-white transition-colors">Track Your Order</Link></li>
                                <li><Link to="/returns" className="text-primary-foreground/80 hover:text-white transition-colors">Returns & Refunds</Link></li>
                                <li><Link to="/delivery-policy" className="text-primary-foreground/80 hover:text-white transition-colors">Delivery Policy</Link></li>
                                <li><Link to="/terms" className="text-primary-foreground/80 hover:text-white transition-colors">Terms & Conditions</Link></li>
                                <li><Link to="/privacy" className="text-primary-foreground/80 hover:text-white transition-colors">Privacy Policy</Link></li>
                                <li><Link to="/cookies" className="text-primary-foreground/80 hover:text-white transition-colors">Cookie Notice</Link></li>
                            </ul>
                        </div>

                        {/* Contact info */}
                        <div>
                            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 mt-1 text-secondary" />
                                    <div>
                                        <p className="text-primary-foreground/80">
                                            Kiambu Town, Kenya<br />
                                            Opposite Kiambu Level 5 Hospital
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-secondary" />
                                    <p className="text-primary-foreground/80">+254 746 020 323</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-secondary" />
                                    <p className="text-primary-foreground/80">info@medhelmsupplies.co.ke</p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Clock className="h-5 w-5 mt-1 text-secondary" />
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

                        {/* ...existing code... */}
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-primary-foreground/60 text-sm">
                            © 2025 MEDHELM SUPPLIES. All rights reserved.
                        </p>
                        {/* Developer info (moved here) */}
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-lg font-normal text-primary-foreground/60">Developer</span>
                            <a
                                href="https://wa.me/254726238126"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-green-400 transition-colors"
                                title="WhatsApp"
                            >
                                <WhatsappIcon className="h-5 w-5" />
                            </a>
                            <a
                                href="mailto:onyangoantone1@gmail.com"
                                className="hover:text-red-400 transition-colors"
                                title="Gmail"
                            >
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                        <div className="flex gap-6 text-sm text-primary-foreground/60">
                            <span>Payments:</span>
                            <span>M-Pesa</span>
                            <span>Airtel Money</span>
                            <span>PayPal</span>
                            <span>Bank Transfer</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;