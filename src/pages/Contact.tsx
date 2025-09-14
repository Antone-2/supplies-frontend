// ...existing code...
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// ...existing code...
import React, { useState } from 'react';
import { LuPhone, LuMapPin, LuClock, LuMessageCircle, LuSend, LuCar, LuUsers, LuPackage } from 'react-icons/lu';

const Contact = () => {
    // Removed unused contactMethods

    const services = [
        {
            icon: LuPackage,
            title: "Bulk Orders",
            description: "Special pricing for large quantity orders"
        },
        {
            icon: LuCar,
            title: "Emergency Delivery",
            description: "Same-day delivery for urgent medical needs"
        },
        {
            icon: LuUsers,
            title: "Account Management",
            description: "Dedicated support for institutional clients"
        }
    ];

    // Contact form state
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', phone: '', organization: '', subject: '', message: ''
    });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

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
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
                </div>
                <div className="container mx-auto px-4 relative">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent font-['Inter','system-ui','-apple-system','sans-serif']">
                            Get In Touch
                        </h1>
                        <p className="text-xl md:text-2xl text-primary-foreground/90 font-light leading-relaxed">
                            We're here to help with all your medical supply needs
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
                            <CardHeader className="pb-8">
                                <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent font-['Inter','system-ui','-apple-system','sans-serif']">
                                    <LuSend className="h-8 w-8 text-primary" />
                                    Send us a Message
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-lg font-semibold mb-3 block text-foreground/80">First Name</label>
                                            <Input
                                                name="firstName"
                                                value={form.firstName}
                                                onChange={handleChange}
                                                placeholder="Your first name"
                                                required
                                                className="h-12 text-lg rounded-xl border-2 focus:border-primary transition-all duration-300"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-lg font-semibold mb-3 block text-foreground/80">Last Name</label>
                                            <Input
                                                name="lastName"
                                                value={form.lastName}
                                                onChange={handleChange}
                                                placeholder="Your last name"
                                                required
                                                className="h-12 text-lg rounded-xl border-2 focus:border-primary transition-all duration-300"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-lg font-semibold mb-3 block text-foreground/80">Email</label>
                                        <Input
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="your.email@example.com"
                                            required
                                            className="h-12 text-lg rounded-xl border-2 focus:border-primary transition-all duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-lg font-semibold mb-3 block text-foreground/80">Phone Number</label>
                                        <Input
                                            name="phone"
                                            type="tel"
                                            value={form.phone}
                                            onChange={handleChange}
                                            placeholder="+254 700 000 000"
                                            className="h-12 text-lg rounded-xl border-2 focus:border-primary transition-all duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-lg font-semibold mb-3 block text-foreground/80">Organization</label>
                                        <Input
                                            name="organization"
                                            value={form.organization}
                                            onChange={handleChange}
                                            placeholder="Hospital/Clinic name (optional)"
                                            className="h-12 text-lg rounded-xl border-2 focus:border-primary transition-all duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-lg font-semibold mb-3 block text-foreground/80">Subject</label>
                                        <Input
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            placeholder="What is your inquiry about?"
                                            required
                                            className="h-12 text-lg rounded-xl border-2 focus:border-primary transition-all duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-lg font-semibold mb-3 block text-foreground/80">Message</label>
                                        <Textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="Please provide details about your medical supply needs..."
                                            rows={5}
                                            required
                                            className="text-lg rounded-xl border-2 focus:border-primary transition-all duration-300 resize-none"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground h-14 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                        disabled={submitting}
                                    >
                                        <LuSend className="mr-3 h-6 w-6" />
                                        {submitting ? 'Sending...' : 'Send Message'}
                                    </Button>
                                    {success && (
                                        <div className="text-green-600 text-center text-lg font-semibold bg-green-50 p-4 rounded-xl border border-green-200">
                                            Message sent successfully!
                                        </div>
                                    )}
                                    {error && (
                                        <div className="text-red-600 text-center text-lg font-semibold bg-red-50 p-4 rounded-xl border border-red-200">
                                            {error}
                                        </div>
                                    )}
                                </form>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            {/* Office Location */}
                            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                                <CardContent className="p-8">
                                    <div className="flex items-start gap-6">
                                        <div className="p-4 bg-primary/10 rounded-2xl">
                                            <LuMapPin className="h-8 w-8 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold mb-4 text-2xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent font-['Inter','system-ui','-apple-system','sans-serif']">
                                                Our Location
                                            </h3>
                                            <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
                                                Kiambu Town, Kenya<br />
                                                Opposite Kiambu Level 5 Hospital
                                            </p>
                                            <p className="text-sm text-primary font-medium">
                                                Easily accessible location for healthcare providers in the area
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Business Hours */}
                            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                                <CardContent className="p-8">
                                    <div className="flex items-start gap-6">
                                        <div className="p-4 bg-secondary/10 rounded-2xl">
                                            <LuClock className="h-8 w-8 text-secondary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold mb-4 text-2xl bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent font-['Inter','system-ui','-apple-system','sans-serif']">
                                                Business Hours
                                            </h3>
                                            <div className="space-y-2 text-muted-foreground text-lg">
                                                <p className="font-medium">Monday - Friday: 8:00 AM - 6:00 PM</p>
                                                <p className="font-medium">Saturday: 9:00 AM - 4:00 PM</p>
                                                <p className="font-medium">Sunday: Emergency orders only</p>
                                            </div>
                                            <p className="text-primary mt-4 font-semibold text-lg">
                                                24/7 WhatsApp support for urgent medical needs
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Special Services */}
                            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                                <CardContent className="p-8">
                                    <h3 className="font-bold mb-6 text-2xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent font-['Inter','system-ui','-apple-system','sans-serif']">
                                        Special Services
                                    </h3>
                                    <div className="grid gap-6">
                                        {services.map((service, index) => (
                                            <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-accent/20 to-accent/10 hover:from-accent/30 hover:to-accent/20 transition-all duration-300">
                                                <div className="p-3 bg-primary/10 rounded-xl">
                                                    <service.icon className="h-6 w-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-lg text-foreground mb-2">{service.title}</h4>
                                                    <p className="text-muted-foreground text-base leading-relaxed">{service.description}</p>
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
            <section className="py-20 bg-gradient-to-r from-accent via-accent to-accent/90 text-accent-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent font-['Inter','system-ui','-apple-system','sans-serif']">
                        Emergency Medical Supply Needs?
                    </h3>
                    <p className="mb-10 opacity-90 text-xl leading-relaxed font-light max-w-2xl mx-auto">
                        For urgent medical supply requirements outside business hours, contact us immediately
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
                        <Button
                            variant="outline"
                            className="border-2 border-white text-white hover:bg-white hover:text-primary h-14 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                            <LuPhone className="mr-3 h-6 w-6" />
                            Call Emergency Line
                        </Button>
                        <Button
                            variant="outline"
                            className="border-2 border-white text-white hover:bg-white hover:text-primary h-14 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                            <LuMessageCircle className="mr-3 h-6 w-6" />
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
