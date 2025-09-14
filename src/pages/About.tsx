import medHelmLogo from '@/assets/medhelm-logo.svg';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
    LuAward,
    LuUsers,
    LuMapPin,
    LuClock,
    LuShieldCheck,
    LuHeart,
    LuTarget,
    LuEye
} from 'react-icons/lu';

const About = () => {
    const values = [
        {
            icon: LuHeart,
            title: "Patient Care",
            description: "Focused on improving patient outcomes."
        },
        {
            icon: LuShieldCheck,
            title: "Quality First",
            description: "Highest standards in product quality."
        },
        {
            icon: LuUsers,
            title: "Trusted Partners",
            description: "Building lasting healthcare relationships."
        },
        {
            icon: LuTarget,
            title: "Innovation",
            description: "Seeking solutions for healthcare needs."
        }
    ];

    const milestones = [
        { year: "2024", event: "Founded in Kiambu" },
        { year: "2024", event: "Expanded to Nairobi" },
        { year: "2024", event: "10+ healthcare clients" },
        { year: "2024", event: "24/7 emergency service" },
        { year: "2024", event: "ISO certified" },
        { year: "2025", event: "Online platform launched" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <img src={medHelmLogo} alt="Medhelm Supplies Logo" className="mx-auto mb-4 h-16 w-auto" />
                    <Badge className="bg-white/20 text-white border-white/30 mb-4 text-sm">
                        About MEDHELM
                    </Badge>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                        Your Trusted Medical Partner
                    </h1>
                    <p className="text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto">
                        Since 2024, providing Kenya's healthcare providers with premium supplies for quality patient care.
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
                            <div className="space-y-3 text-gray-600 text-sm md:text-base">
                                <p>
                                    MEDHELM was born to solve healthcare supply challenges. We deliver quality medical supplies when needed most.
                                </p>
                                <p>
                                    From Kiambu Town, we've grown to serve Kenya nationwide, building trust through reliability and quality.
                                </p>
                                <p>
                                    Today, we're Kenya's key healthcare partner, supporting clinics to hospitals with comprehensive supplies.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                                <CardContent className="p-4 text-center">
                                    <LuAward className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                                    <h3 className="text-xl font-bold text-blue-600">2+</h3>
                                    <p className="text-xs text-gray-500">Years</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                                <CardContent className="p-4 text-center">
                                    <LuUsers className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                                    <h3 className="text-xl font-bold text-blue-600">10+</h3>
                                    <p className="text-xs text-gray-500">Partners</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                                <CardContent className="p-4 text-center">
                                    <LuMapPin className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                                    <h3 className="text-xl font-bold text-blue-600">45+</h3>
                                    <p className="text-xs text-gray-500">Counties</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                                <CardContent className="p-4 text-center">
                                    <LuClock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                                    <h3 className="text-xl font-bold text-blue-600">24/7</h3>
                                    <p className="text-xs text-gray-500">Support</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision - Optimized for mobile */}
            <section className="py-8 px-4 bg-white">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-sm">
                            <CardContent className="p-4 flex flex-col items-center text-center">
                                <LuTarget className="h-8 w-8 text-blue-600 mb-2" />
                                <h3 className="text-lg font-bold mb-2 text-gray-900">Our Mission</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Provide Kenya's healthcare providers with reliable access to quality medical supplies, enabling exceptional patient care.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-sm">
                            <CardContent className="p-4 flex flex-col items-center text-center">
                                <LuEye className="h-8 w-8 text-blue-600 mb-2" />
                                <h3 className="text-lg font-bold mb-2 text-gray-900">Our Vision</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Become Kenya's most trusted medical supply partner, known for quality, reliability, and innovation.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Our Values</h2>
                        <p className="text-gray-600 text-sm max-w-xl mx-auto">
                            Core principles guiding our service to healthcare partners.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {values.map((value, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 bg-white border-blue-100">
                                <CardContent className="p-4">
                                    <value.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                                    <h3 className="text-sm font-semibold mb-2 text-gray-900">{value.title}</h3>
                                    <p className="text-xs text-gray-600 leading-tight">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Our Journey</h2>
                        <p className="text-gray-600 text-sm">
                            Key milestones in our healthcare service growth.
                        </p>
                    </div>
                    <div className="max-w-md mx-auto">
                        {milestones.map((milestone, index) => (
                            <div key={index} className="flex gap-3 mb-6 last:mb-0">
                                <div className="flex flex-col items-center">
                                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs">
                                        {milestone.year.slice(-2)}
                                    </div>
                                    {index < milestones.length - 1 && (
                                        <div className="w-0.5 bg-blue-200 h-8 mt-1"></div>
                                    )}
                                </div>
                                <div className="flex-1 pb-4">
                                    <p className="text-gray-600 text-sm">{milestone.event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
            <MobileBottomNav />
            <div className="lg:hidden h-16"></div>
        </div>
    );
};

export default About;
