import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// ...existing code...
import React, { useState } from 'react';
import {
    Phone,
    MapPin,
    Clock,
    MessageCircle,
    Send,
    Car,
    Users,
    Package
} from 'lucide-react';

const Contact = () => {
    // Removed unused contactMethods

    const services = [
        {
            icon: Package,
            title: "Bulk Orders",
            description: "Special pricing for large quantity orders"
        },
        {
            icon: Car,
            title: "Emergency Delivery",
            description: "Same-day delivery for urgent medical needs"
        },
        {
            icon: Users,
            title: "Account Management",
            description: "Dedicated support for institutional clients"
        }
    ];

    // Contact form state
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organization: '',
        subject: '',
        message: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccess(false);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setSuccess(true);
                setForm({
                    firstName: '', lastName: '', email: '', phone: '', organization: '', subject: '', message: ''
                });
            } else {
                setError('Failed to send message. Please try again.');
            }
        } catch (err) {
            setError('Failed to send message. Please try again.');
        }
        setSubmitting(false);
    };

    return (
        <div className="min-h-screen">
            <Header />
            {/* ...existing code... */}
            {/* Contact Form & Info */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Send className="h-5 w-5" />
                                    Send us a Message
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium mb-1 block">First Name</label>
                                            <Input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Your first name" required />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium mb-1 block">Last Name</label>
                                            <Input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Your last name" required />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">Email</label>
                                        <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your.email@example.com" required />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">Phone Number</label>
                                        <Input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+254 700 000 000" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">Organization</label>
                                        <Input name="organization" value={form.organization} onChange={handleChange} placeholder="Hospital/Clinic name (optional)" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">Subject</label>
                                        <Input name="subject" value={form.subject} onChange={handleChange} placeholder="What is your inquiry about?" required />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">Message</label>
                                        <Textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="Please provide details about your medical supply needs..."
                                            rows={4}
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-primary hover:bg-primary-light" disabled={submitting}>
                                        <Send className="mr-2 h-4 w-4" />
                                        {submitting ? 'Sending...' : 'Send Message'}
                                    </Button>
                                    {success && <div className="text-green-600 text-center">Message sent successfully!</div>}
                                    {error && <div className="text-red-600 text-center">{error}</div>}
                                </form>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            {/* Office Location */}
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <MapPin className="h-6 w-6 text-primary mt-1" />
                                        <div>
                                            <h3 className="font-semibold mb-2">Our Location</h3>
                                            <p className="text-muted-foreground mb-2">
                                                Kiambu Town, Kenya<br />
                                                Opposite Kiambu Level 5 Hospital
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Easily accessible location for healthcare providers in the area
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Business Hours */}
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <Clock className="h-6 w-6 text-primary mt-1" />
                                        <div>
                                            <h3 className="font-semibold mb-2">Business Hours</h3>
                                            <div className="space-y-1 text-muted-foreground">
                                                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                                                <p>Saturday: 9:00 AM - 4:00 PM</p>
                                                <p>Sunday: Emergency orders only</p>
                                            </div>
                                            <p className="text-sm text-primary mt-2">
                                                24/7 WhatsApp support for urgent medical needs
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Special Services */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold mb-4">Special Services</h3>
                                    <div className="space-y-4">
                                        {services.map((service, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <service.icon className="h-5 w-5 text-primary mt-0.5" />
                                                <div>
                                                    <h4 className="font-medium text-sm">{service.title}</h4>
                                                    <p className="text-xs text-muted-foreground">{service.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Emergency Contact */}
            <section className="py-16 bg-accent text-accent-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-2xl font-bold mb-4">Emergency Medical Supply Needs?</h3>
                    <p className="mb-6 opacity-90">
                        For urgent medical supply requirements outside business hours, contact us immediately
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="outline" className="border-white text-secondary-foreground hover:bg-white hover:text-primary">
                            <Phone className="mr-2 h-4 w-4" />
                            Call Emergency Line
                        </Button>
                        <Button variant="outline" className="border-white text-secondary-foreground hover:bg-white hover:text-primary">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            WhatsApp 24/7
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
            <MobileBottomNav />
            <div className="lg:hidden h-20"></div>
        </div>
    );
};

export default Contact;