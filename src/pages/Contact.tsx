import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    MessageCircle,
    Send,
    Car,
    Users,
    Package
} from 'lucide-react';

const Contact = () => {
    const contactMethods = [
        {
            icon: Phone,
            title: "Phone",
            description: "Call us now",
            contact: "+254 746 020 323",
            availability: "Mon-Sat: 8AM-6PM"
        },
        {
            icon: Mail,
            title: "Email",
            description: "Email us",
            contact: "info@medhelmsupplies.co.ke",
            availability: "Reply within 24h"
        },
        {
            icon: MessageCircle,
            title: "WhatsApp",
            description: "Chat instantly",
            contact: "+254 746 020 323",
            availability: "24/7"
        }
    ];

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
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organization: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState('');

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setFeedback('');
        try {
            const res = await fetch('/api/v1/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                setFeedback('Message sent! We will get back to you soon.');
                setFormData({
                    firstName: '', lastName: '', email: '', phone: '', organization: '', subject: '', message: ''
                });
            } else {
                setFeedback('Failed to send message. Please try again.');
            }
        } catch (err) {
            setFeedback('Failed to send message. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary-light to-accent text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <Badge className="bg-secondary text-secondary-foreground mb-6 font-['Roboto']">
                            Contact MEDHELM Supplies
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 font-['Roboto']">
                            Contact Us
                        </h1>
                        <p className="text-base text-white/90 leading-relaxed font-['Roboto']">
                            We're here to help. Choose your preferred contact method.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4 font-['Roboto']">Reach Us</h2>
                        <p className="text-muted-foreground font-['Roboto']">
                            Pick a contact option below.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                        {contactMethods.map((method, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <method.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold mb-2 font-['Roboto']">{method.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-3 font-['Roboto']">{method.description}</p>
                                    <p className="font-medium text-primary mb-2 font-['Roboto']">{method.contact}</p>
                                    <p className="text-xs text-muted-foreground font-['Roboto']">{method.availability}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 font-['Roboto']">
                                    <Send className="h-5 w-5" />
                                    Send us a Message
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium mb-1 block font-['Roboto']">First Name</label>
                                            <Input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Your first name" className="rounded-lg shadow-sm font-['Roboto'] focus:ring-2 focus:ring-primary focus:border-none transition-all" required />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium mb-1 block font-['Roboto']">Last Name</label>
                                            <Input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Your last name" className="rounded-lg shadow-sm font-['Roboto'] focus:ring-2 focus:ring-primary focus:border-none transition-all" required />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1 block font-['Roboto']">Email</label>
                                        <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" className="rounded-lg shadow-sm font-['Roboto'] focus:ring-2 focus:ring-primary focus:border-none transition-all" required />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1 block font-['Roboto']">Phone Number</label>
                                        <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+254 700 000 000" className="rounded-lg shadow-sm font-['Roboto'] focus:ring-2 focus:ring-primary focus:border-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1 block font-['Roboto']">Organization</label>
                                        <Input name="organization" value={formData.organization} onChange={handleChange} placeholder="Hospital/Clinic name (optional)" className="rounded-lg shadow-sm font-['Roboto'] focus:ring-2 focus:ring-primary focus:border-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1 block font-['Roboto']">Subject</label>
                                        <Input name="subject" value={formData.subject} onChange={handleChange} placeholder="What is your inquiry about?" className="rounded-lg shadow-sm font-['Roboto'] focus:ring-2 focus:ring-primary focus:border-none transition-all" />
                                    </div>
                                    <div className="w-full">
                                        <label className="text-sm font-medium mb-1 block font-['Roboto']">Message</label>
                                        <Textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Please provide details about your medical supply needs..."
                                            rows={4}
                                            className="rounded-lg shadow-sm font-['Roboto'] focus:ring-2 focus:ring-primary focus:border-none transition-all w-full min-h-[80px] text-base placeholder:text-gray-500"
                                            required
                                        />
                                    </div>
                                    <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-light font-['Roboto'] rounded-lg shadow-md text-base py-3 transition-all">
                                        <Send className="mr-2 h-4 w-4" />
                                        {loading ? 'Sending...' : 'Send Message'}
                                    </Button>
                                    {feedback && (
                                        <div className="text-center text-sm mt-2 text-primary font-['Roboto']">{feedback}</div>
                                    )}
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
                                            <h3 className="font-semibold mb-2 font-['Roboto']">Our Location</h3>
                                            <p className="text-muted-foreground mb-2 font-['Roboto']">
                                                Kiambu Town, Kenya<br />
                                                Opposite Kiambu Level 5 Hospital
                                            </p>
                                            <p className="text-sm text-muted-foreground font-['Roboto']">
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
                                            <h3 className="font-semibold mb-2 font-['Roboto']">Business Hours</h3>
                                            <div className="space-y-1 text-muted-foreground">
                                                <p className="font-['Roboto']">Monday - Friday: 8:00 AM - 6:00 PM</p>
                                                <p className="font-['Roboto']">Saturday: 9:00 AM - 4:00 PM</p>
                                                <p className="font-['Roboto']">Sunday: Emergency orders only</p>
                                            </div>
                                            <p className="text-sm text-secondary mt-2 font-['Roboto']">
                                                24/7 WhatsApp support for urgent medical needs
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Special Services */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold mb-4 font-['Roboto']">Special Services</h3>
                                    <div className="space-y-4">
                                        {services.map((service, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <service.icon className="h-5 w-5 text-primary mt-0.5" />
                                                <div>
                                                    <h4 className="font-medium text-sm font-['Roboto']">{service.title}</h4>
                                                    <p className="text-xs text-muted-foreground font-['Roboto']">{service.description}</p>
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
                    <h3 className="text-2xl font-bold mb-4 font-['Roboto']">Emergency?</h3>
                    <p className="mb-6 opacity-90 font-['Roboto']">
                        For urgent needs, contact us now.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="tel:+254746020323"
                            className="bg-secondary hover:bg-secondary-light text-secondary-foreground font-['Roboto'] flex items-center justify-center rounded-lg shadow-md text-base py-3 px-6 transition-all"
                            style={{ textDecoration: 'none' }}
                        >
                            <Phone className="mr-2 h-4 w-4" />
                            Call Emergency Line
                        </a>
                        <a
                            href="https://wa.me/254746020323?text=Hello%20MEDHELM%20Supplies%2C%20I%20have%20an%20emergency%20medical%20supply%20need."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-white text-white hover:bg-white hover:text-accent font-['Roboto'] flex items-center justify-center rounded-lg shadow-md text-base py-3 px-6 transition-all"
                            style={{ textDecoration: 'none' }}
                        >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            WhatsApp 24/7
                        </a>
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