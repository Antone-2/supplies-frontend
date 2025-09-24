import Header from '@/components/Header';
import medHelmLogo from '../assets/medhelm-logo.svg';
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
            title: "Patient Care",
            description: "Focused on improving patient outcomes."
        },
        {
            icon: ShieldCheck,
            title: "Quality First",
            description: "Highest standards in product quality."
        },
        {
            icon: Users,
            title: "Trusted Partners",
            description: "Building lasting healthcare relationships."
        },
        {
            icon: Target,
            title: "Innovation",
            description: "Seeking solutions for healthcare needs."
        }
    ];

    const milestones = [
        { year: "2020", event: "MEDHELM Supplies founded in Kiambu" },
        { year: "2021", event: "Expanded to serve Nairobi CBD area" },
        { year: "2022", event: "Reached 100+ healthcare provider clients" },
        { year: "2023", event: "Launched 24/7 emergency supply service" },
        { year: "2024", event: "ISO certification achieved" },
        { year: "2025", event: "Online platform launch" }
    ];

    return (
        <div className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary-light to-accent text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
                        <img src={medHelmLogo} alt="Medhelm Supplies Logo" className="h-24 w-auto mb-4 drop-shadow-lg" />
                        <Badge className="bg-secondary text-secondary-foreground mb-6 font-['Roboto']">
                            About MEDHELM
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Roboto']">
                            MEDHELM Supplies
                        </h1>
                        <p className="text-base text-white/90 leading-relaxed mb-2 font-['Roboto']">
                            Trusted medical supplies for Kenya since 2024.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-foreground mb-6 font-['Roboto']">Our Story</h2>
                            <div className="space-y-2 text-muted-foreground">
                                <p className="font-['Roboto']">Solving supply challenges for Kenya's healthcare.</p>
                                <p className="font-['Roboto']">From Kiambu to nationwide service.</p>
                                <p className="font-['Roboto']">Supporting clinics and hospitals.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                                    <h3 className="text-2xl font-bold text-primary font-['Roboto']">2+</h3>
                                    <p className="text-sm text-muted-foreground font-['Roboto']">Years</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                                    <h3 className="text-2xl font-bold text-primary font-['Roboto']">10+</h3>
                                    <p className="text-sm text-muted-foreground font-['Roboto']">Partners</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                                    <h3 className="text-2xl font-bold text-primary font-['Roboto']">45+</h3>
                                    <p className="text-sm text-muted-foreground font-['Roboto']">Counties</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                                    <h3 className="text-2xl font-bold text-primary font-['Roboto']">24/7</h3>
                                    <p className="text-sm text-muted-foreground font-['Roboto']">Support</p>
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
                                <h3 className="text-2xl font-bold mb-4 font-['Roboto']">Our Mission</h3>
                                <p className="text-muted-foreground font-['Roboto']">
                                    Provide Kenya's healthcare providers with reliable access to quality medical supplies, enabling exceptional patient care.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-secondary/20">
                            <CardContent className="p-8">
                                <Eye className="h-12 w-12 text-secondary mb-4" />
                                <h3 className="text-2xl font-bold mb-4 font-['Roboto']">Our Vision</h3>
                                <p className="text-muted-foreground font-['Roboto']">
                                    Become Kenya's most trusted medical supply partner, known for quality, reliability, and innovation.
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
                        <h2 className="text-3xl font-bold text-foreground mb-4 font-['Roboto']">Our Values</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto font-['Roboto']">
                            Our principles guide how we serve you.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {values.map((value, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold mb-3 font-['Roboto']">{value.title}</h3>
                                    <p className="text-sm text-muted-foreground font-['Roboto']">{value.description}</p>
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
                        <h2 className="text-3xl font-bold text-foreground mb-4 font-['Roboto']">Our Journey</h2>
                        <p className="text-muted-foreground font-['Roboto']">
                            Milestones in our growth.
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
                                    <p className="text-muted-foreground font-['Roboto']">{milestone.event}</p>
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