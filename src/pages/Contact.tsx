import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
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
      description: "Call us",
      contact: "+254 746 020 323",
      availability: "Mon-Sat: 8-6"
    },
    {
      icon: Mail,
      title: "Email",
      description: "Email us",
      contact: import.meta.env.VITE_COMPANY_EMAIL || "info@medhelmsupplies.co.ke",
      availability: "Reply in 24h"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Chat quick",
      contact: "+254 746 020 323",
      availability: "24/7"
    }
  ];

  const services = [
    {
      icon: Package,
      title: "Bulk Orders",
      description: "Special pricing for bulk"
    },
    {
      icon: Car,
      title: "Emergency Delivery",
      description: "Same-day urgent delivery"
    },
    {
      icon: Users,
      title: "Account Help",
      description: "Support for institutions"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-light to-accent text-white py-6">
        <div className="container mx-auto px-2 max-w-md">
          <div className="max-w-md mx-auto text-center">
            <Badge className="bg-secondary text-secondary-foreground mb-4 text-xs">
              Contact MEDHELM
            </Badge>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              Contact Our Team
            </h1>
            <p className="text-base text-white/90 leading-relaxed">
              Need help? Reach us anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-6 bg-muted/30">
        <div className="container mx-auto px-2 max-w-4xl">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-foreground mb-2">How to Reach Us</h2>
            <p className="text-xs text-muted-foreground">
              Pick your best way to contact us
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-3 flex flex-col items-center justify-center min-h-[120px]">
                  <method.icon className="h-8 w-8 text-primary mb-1" />
                  <div className="flex flex-col items-center w-full">
                    <h3 className="text-base font-semibold mb-1 w-full truncate">{method.title}</h3>
                    <p className="text-xs text-muted-foreground mb-1 w-full truncate">{method.description}</p>
                    <p className="font-medium text-primary mb-1 text-xs w-full truncate">{method.contact}</p>
                    <p className="text-xs text-muted-foreground w-full truncate">{method.availability}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-10">
        <div className="container mx-auto px-2 max-w-4xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">First Name</label>
                    <Input placeholder="Your first name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Last Name</label>
                    <Input placeholder="Your last name" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <Input type="email" placeholder="Your email address" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Phone Number</label>
                  <Input type="tel" placeholder="Your phone number" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Organization</label>
                  <Input placeholder="Hospital/Clinic name (optional)" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Subject</label>
                  <Input placeholder="What is your inquiry about?" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Message</label>
                  <Textarea
                    placeholder="Please provide details about your medical supply needs..."
                    rows={4}
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-primary-light">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-10">
              {/* Office Location */}
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="bg-primary/10 rounded-lg p-3">
                      <MapPin className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Our Location</h3>
                      <p className="text-muted-foreground mb-3 text-lg">
                        Kiambu Town, Kenya<br />
                        Opposite Kiambu Level 5 Hospital
                      </p>
                      <p className="text-muted-foreground">
                        Easily accessible location for healthcare providers in the area
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="bg-primary/10 rounded-lg p-3">
                      <Clock className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Business Hours</h3>
                      <div className="space-y-2 text-muted-foreground text-lg">
                        <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                        <p>Saturday: 9:00 AM - 4:00 PM</p>
                        <p>Sunday: Emergency orders only</p>
                      </div>
                      <p className="text-secondary mt-4 font-medium">
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
            <Button className="bg-secondary hover:bg-secondary-light text-secondary-foreground">
              <Phone className="mr-2 h-4 w-4" />
              Call Emergency Line
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-accent">
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