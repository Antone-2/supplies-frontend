import Header from '@/components/Header';
import medHelmLogo from '@/assets/medhelm-logo.svg';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
    Award,
    Users,
    MapPin,
    Clock,
    ShieldCheck,
    Heart,
    Target,
    Eye
} from 'lucide-react';

const About = () => {
    const values = [
        {
            icon: Heart,
            title: "Patient-Centered Care",
            description: "Everything we do is focused on improving patient outcomes and healthcare delivery."
        },
        {
            icon: ShieldCheck,
            title: "Quality Assurance",
            description: "We maintain the highest standards in product quality and regulatory compliance."
        },
        {
            icon: Users,
            title: "Partnership",
            description: "We build lasting relationships with healthcare providers through trust and reliability."
        },
        {
            icon: Target,
            title: "Innovation",
            description: "We continuously seek innovative solutions to meet evolving healthcare needs."
        }
    ];

    const milestones = [
        { year: "2024", event: "MEDHELM Supplies founded in Kiambu" },
        { year: "2024", event: "Expanded to serve Nairobi CBD area" },
        { year: "2024", event: "Reached 10+ healthcare provider clients" },
        { year: "2024", event: "Launched 24/7 emergency supply service" },
        { year: "2024", event: "ISO certification achieved" },
        { year: "2025", event: "Online platform launch" }
    ];

    return (
        <div className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary-light to-accent text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <img src={medHelmLogo} alt="Medhelm Supplies Logo" className="mx-auto mb-6 h-20" />
                        <Badge className="bg-secondary text-secondary-foreground mb-6">
                            About MEDHELM SUPPLIES
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Your Trusted Medical Supply Partner
                        </h1>
                        <p className="text-xl text-white/90 leading-relaxed">
                            Since 2024, we've been dedicated to providing healthcare providers in Kenya
                            with premium medical supplies and equipment, ensuring quality care reaches every patient.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    MEDHELM SUPPLIES was born from a simple observation: healthcare providers
                                    needed a reliable partner who understood their challenges and could deliver
                                    quality medical supplies when they needed them most.
                                </p>
                                <p>
                                    Starting from our base in Kiambu Town, opposite the Level 5 Hospital,
                                    we've grown to serve healthcare facilities countrywide,
                                    building relationships based on trust, quality, and reliability.
                                </p>
                                <p>
                                    Today, we're proud to be a key partner in Kenya's healthcare ecosystem,
                                    supporting everything from small clinics to major hospitals with our
                                    comprehensive range of medical supplies and equipment.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                                    <h3 className="text-2xl font-bold text-primary">2+</h3>
                                    <p className="text-sm text-muted-foreground">Years Experience</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                                    <h3 className="text-2xl font-bold text-primary">10+</h3>
                                    <p className="text-sm text-muted-foreground">Healthcare Partners</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                                    <h3 className="text-2xl font-bold text-primary">45+</h3>
                                    <p className="text-sm text-muted-foreground">Counties Served</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                                    <h3 className="text-2xl font-bold text-primary">24/7</h3>
                                    <p className="text-sm text-muted-foreground">Support Available</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        <Card className="border-primary/20">
                            <CardContent className="p-8">
                                <Target className="h-12 w-12 text-primary mb-4" />
                                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                                <p className="text-muted-foreground">
                                    To provide healthcare providers in Kenya with reliable access to quality
                                    medical supplies and equipment, enabling them to deliver exceptional patient
                                    care while building sustainable healthcare systems in our communities.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/20">
                            <CardContent className="p-8">
                                <Eye className="h-12 w-12 text-primary mb-4" />
                                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                                <p className="text-muted-foreground">
                                    To be Kenya's most trusted medical supply partner, known for our commitment
                                    to quality, reliability, and innovation in supporting healthcare excellence
                                    across the nation.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            These core principles guide everything we do and shape how we serve
                            our healthcare partners and their patients.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                                    <p className="text-sm text-muted-foreground">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">Our Journey</h2>
                        <p className="text-muted-foreground">
                            Key milestones in our growth and service to Kenya's healthcare community
                        </p>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        {milestones.map((milestone, index) => (
                            <div key={index} className="flex gap-4 mb-8 last:mb-0">
                                <div className="flex flex-col items-center">
                                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm">
                                        {milestone.year}
                                    </div>
                                    {index < milestones.length - 1 && (
                                        <div className="w-0.5 bg-border h-16 mt-2"></div>
                                    )}
                                </div>
                                <div className="flex-1 pb-8">
                                    <p className="text-muted-foreground">{milestone.event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
            <MobileBottomNav />
            <div className="lg:hidden h-20"></div>
        </div>
    );
};

export default About;