import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    LuFacebook,
    LuInstagram,
    LuLinkedin,
    LuPhone,
    LuMail,
    LuMapPin,
    LuClock,
    LuSend
} from 'react-icons/lu';

import { FaPaypal, FaCreditCard } from 'react-icons/fa';

// Official M-Pesa SVG Icon (logo and text only, no box)
const MpesaIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="30" y="32" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#43B02A" style={{ fontFamily: 'Roboto,Arial,sans-serif' }}>M-Pesa</text>
        <circle cx="48" cy="16" r="6" fill="#43B02A" />
        <text x="48" y="20" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fff">S</text>
    </svg>
);

// Official Airtel Money SVG Icon (logo and text only, no box)
const AirtelIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="30" y="32" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#ED1C24" style={{ fontFamily: 'Roboto,Arial,sans-serif' }}>Airtel</text>
        <path d="M44 16c-3-3-8.5-3-11.5 0 3 3 8.5 3 11.5 0z" fill="#ED1C24" />
    </svg>
);

// PayPal SVG Icon (logo and text only, no box)
const PaypalIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 70 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="35" y="32" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#003087" style={{ fontFamily: 'Roboto,Arial,sans-serif' }}>PayPal</text>
        <rect x="55" y="10" width="10" height="10" rx="2" fill="#009CDE" />
        <text x="60" y="18" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff">P</text>
    </svg>
);

// Credit Card SVG Icon (logo and text only, no box)
const CreditCardIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 70 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="35" y="32" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#444" style={{ fontFamily: 'Roboto,Arial,sans-serif' }}>Card</text>
        <rect x="55" y="10" width="10" height="10" rx="2" fill="#FFD700" />
        <text x="60" y="18" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#444">💳</text>
    </svg>
);

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
import medHelmLogo from '../assets/medhelm-logo.svg';
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
            // Use correct backend endpoint for newsletter subscription
            const res = await fetch('/api/v1/subscription/subscribe', {
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
        <footer className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
            </div>

            {/* Newsletter section */}
            <div className="relative bg-gradient-to-r from-primary/95 to-primary/85 py-8 md:py-14">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent font-['Roboto']">
                            Newsletter
                        </h3>
                        <p className="text-primary-foreground/90 mb-4 text-base leading-relaxed font-light font-['Roboto']">
                            Get updates and offers in your inbox.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <Input
                                type="email"
                                placeholder="Enter your email address"
                                className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/70 h-12 text-lg rounded-xl focus:bg-white/15 focus:border-white/30 transition-all duration-300"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                disabled={status === 'loading'}
                                required
                                aria-label="Email address"
                            />
                            <Button
                                type="submit"
                                className="bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary text-secondary-foreground h-12 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                disabled={status === 'loading'}
                            >
                                <LuSend className="mr-2 h-5 w-5" />
                                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                            </Button>
                        </form>
                        {message && (
                            <div className={`mt-6 text-lg font-medium ${status === 'success' ? 'text-green-300' : 'text-red-300'}`}>
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main footer */}
            <div className="relative py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {/* Company info */}
                        <div className="lg:col-span-1">
                            <div className="flex items-center gap-4 mb-6">
                                <img src={medHelmLogo} className="h-20 w-auto drop-shadow-lg" alt="Medhelm Supplies Logo" width="80" height="80" />
                                <div>
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent font-['Roboto']">
                                        MEDHELM
                                    </h3>
                                    <p className="text-lg font-semibold font-['Roboto']" style={{ color: '#E53935' }}>
                                        S U P P L I E S
                                    </p>
                                </div>
                            </div>
                            <p className="text-primary-foreground/80 mb-8 leading-relaxed text-sm md:text-base font-light font-['Roboto']">
                                Your trusted partner for quality medical supplies and equipment in Kenya.
                            </p>
                            <div className="flex justify-start gap-3 md:gap-6">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hover:bg-white/20 p-1 md:p-2 rounded-2xl transition-all duration-300 hover:scale-125 hover:shadow-xl hover:shadow-white/20 bg-white/5 backdrop-blur-sm font-light"
                                    asChild
                                >
                                    <a href="https://facebook.com/MedhelmSupplies" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook">
                                        <LuFacebook className="h-4 w-4 md:h-5 md:w-5" />
                                    </a>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hover:bg-white/20 p-1 md:p-2 rounded-2xl transition-all duration-300 hover:scale-125 hover:shadow-xl hover:shadow-white/20 bg-white/5 backdrop-blur-sm font-light"
                                    asChild
                                >
                                    <a href="https://x.com/MedhelmSupplies" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X (Twitter)">
                                        <XIcon className="h-4 w-4 md:h-5 md:w-5" />
                                    </a>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hover:bg-white/20 p-1 md:p-2 rounded-2xl transition-all duration-300 hover:scale-125 hover:shadow-xl hover:shadow-white/20 bg-white/5 backdrop-blur-sm font-light"
                                    asChild
                                >
                                    <a href="https://instagram.com/medhelmsupplies" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
                                        <LuInstagram className="h-4 w-4 md:h-5 md:w-5" />
                                    </a>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hover:bg-white/20 p-1 md:p-2 rounded-2xl transition-all duration-300 hover:scale-125 hover:shadow-xl hover:shadow-white/20 bg-white/5 backdrop-blur-sm font-light"
                                    asChild
                                >
                                    <a href="https://linkedin.com/company/medhelm-supplies" target="_blank" rel="noopener noreferrer" aria-label="Connect with us on LinkedIn">
                                        <LuLinkedin className="h-4 w-4 md:h-5 md:w-5" />
                                    </a>
                                </Button>
                            </div>
                        </div>

                        {/* Quick links - Grid Layout */}
                        <div>
                            <h4 className="text-xl font-bold mb-8 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent font-['Roboto']">
                                Quick Links
                            </h4>
                            <div className="flex flex-col space-y-1">
                                <Link to="/" className="text-primary-foreground/80 hover:text-white transition-all duration-300 hover:translate-x-1 text-sm font-light py-0.5 px-1 rounded hover:bg-white/5 font-['Roboto']">
                                    Home
                                </Link>
                                <a href="/#products" className="text-primary-foreground/80 hover:text-white transition-all duration-300 hover:translate-x-1 text-sm font-light py-0.5 px-1 rounded hover:bg-white/5 font-['Roboto']">
                                    Products
                                </a>
                                <a href="/#categories" className="text-primary-foreground/80 hover:text-white transition-all duration-300 hover:translate-x-1 text-sm font-light py-0.5 px-1 rounded hover:bg-white/5 font-['Roboto']">
                                    Categories
                                </a>
                                <a href="/#reviews" className="text-primary-foreground/80 hover:text-white transition-all duration-300 hover:translate-x-1 text-sm font-light py-0.5 px-1 rounded hover:bg-white/5 font-['Roboto']">
                                    Reviews
                                </a>
                            </div>
                        </div>

                        {/* Customer service - Grid Layout */}
                        <div>
                            <h4 className="text-xl font-bold mb-8 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent font-['Roboto']">
                                Customer Service
                            </h4>
                            <div className="flex flex-col space-y-1">
                                <Link to="/track-order" className="text-primary-foreground/80 hover:text-white transition-all duration-300 hover:translate-x-1 text-sm font-light py-0.5 px-1 rounded hover:bg-white/5 font-['Roboto']">
                                    Track Your Order
                                </Link>
                                <Link to="/returns" className="text-primary-foreground/80 hover:text-white transition-all duration-300 hover:translate-x-1 text-sm font-light py-0.5 px-1 rounded hover:bg-white/5 font-['Roboto']">
                                    Returns & Refunds
                                </Link>
                                <Link to="/delivery-policy" className="text-primary-foreground/80 hover:text-white transition-all duration-300 hover:translate-x-1 text-sm font-light py-0.5 px-1 rounded hover:bg-white/5 font-['Roboto']">
                                    Delivery Policy
                                </Link>
                                <Link to="/terms" className="text-primary-foreground/80 hover:text-white transition-all duration-300 hover:translate-x-1 text-sm font-light py-0.5 px-1 rounded hover:bg-white/5 font-['Roboto']">
                                    Terms & Conditions
                                </Link>
                                <Link to="/privacy" className="text-primary-foreground/80 hover:text-white transition-all duration-300 hover:translate-x-1 text-sm font-light py-0.5 px-1 rounded hover:bg-white/5 font-['Roboto']">
                                    Privacy Policy
                                </Link>
                                <Link to="/cookies" className="text-primary-foreground/80 hover:text-white transition-all duration-300 hover:translate-x-1 text-sm font-light py-0.5 px-1 rounded hover:bg-white/5 font-['Roboto']">
                                    Cookie Notice
                                </Link>
                            </div>
                        </div>

                        {/* Contact info */}
                        <div className="lg:col-span-1">
                            <h4 className="text-lg font-bold mb-8 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent font-['Roboto']">
                                Contact Us
                            </h4>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                                    <LuMapPin className="h-6 w-6 mt-1 text-secondary flex-shrink-0" />
                                    <div>
                                        <p className="text-primary-foreground/90 font-medium text-sm font-['Roboto']">
                                            Kiambu Town, Kenya<br />
                                            Opposite Kiambu Level 5 Hospital
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                                    <LuPhone className="h-6 w-6 text-secondary flex-shrink-0" />
                                    <p className="text-primary-foreground/90 font-medium text-sm font-['Roboto']">+254 746 020 323</p>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                                    <LuMail className="h-6 w-6 text-secondary flex-shrink-0" />
                                    <p className="text-primary-foreground/90 font-medium text-sm font-['Roboto']">info@medhelmsupplies.co.ke</p>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                                    <LuClock className="h-6 w-6 mt-1 text-secondary flex-shrink-0" />
                                    <div>
                                        <p className="text-primary-foreground/90 font-medium text-sm font-['Roboto']">
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
            <div className="relative border-t border-white/20 py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-primary-foreground/80 text-sm font-light font-['Roboto']">
                            © 2025 MEDHELM SUPPLIES. All rights reserved.
                        </p>
                        {/* Payments and Developer grouped closer with Developer first */}
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            {/* Developer info */}
                            <div className="flex items-center gap-6">
                                <span className="text-lg font-medium text-primary-foreground/80">Developer</span>
                                <a
                                    href="https://wa.me/254726238126"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-green-400 transition-all duration-300 hover:scale-125 p-2 rounded-2xl hover:bg-white/20 hover:shadow-xl hover:shadow-green-400/20 bg-white/5 backdrop-blur-sm"
                                    title="Contact via WhatsApp"
                                    aria-label="Contact developer via WhatsApp"
                                >
                                    <WhatsappIcon className="h-4 w-4" />
                                </a>
                                <a
                                    href="mailto:onyangoantone1@gmail.com"
                                    className="hover:text-red-400 transition-all duration-300 hover:scale-125 p-2 rounded-2xl hover:bg-white/20 hover:shadow-xl hover:shadow-red-400/20 bg-white/5 backdrop-blur-sm"
                                    title="Send email"
                                    aria-label="Send email to developer"
                                >
                                    <LuMail className="h-4 w-4" />
                                </a>
                            </div>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-primary-foreground/70 font-medium items-center">
                                <span className="md:w-auto font-semibold text-white mb-1 md:mb-0 text-lg">Payments:</span>
                                <span className="hover:text-white transition-colors cursor-pointer px-3 py-1 rounded-md bg-white/10 shadow-md" aria-label="M-Pesa">
                                    <MpesaIcon className="h-8 w-8" />
                                </span>
                                <span className="hover:text-white transition-colors cursor-pointer px-3 py-1 rounded-md bg-white/10 shadow-md" aria-label="Airtel Money">
                                    <AirtelIcon className="h-8 w-8" />
                                </span>
                                <span className="hover:text-white transition-colors cursor-pointer px-3 py-1 rounded-md bg-white/10 shadow-md" aria-label="PayPal">
                                    <PaypalIcon className="h-8 w-8" />
                                </span>
                                <span className="hover:text-white transition-colors cursor-pointer px-3 py-1 rounded-md bg-white/10 shadow-md" aria-label="Bank Transfer">
                                    <CreditCardIcon className="h-8 w-8" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
