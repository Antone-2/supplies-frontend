import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    ShieldCheck,
    Truck,
    Award,
    ArrowRight,
    Star
} from 'lucide-react';
const Hero = () => {
    const heroImages = [
        { src: "medhelm-supplies.jpg", alt: "Medical supplies warehouse" },
        { src: "equipment.jpg", alt: "Healthcare professionals" },
        { src: "products-image.jpg", alt: "Medical laboratory" },
        { src: "transport-vehicle.jpg", alt: "Medical delivery service" }
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000); // Change image every 4 seconds

        return () => clearInterval(interval);
    }, [heroImages.length]);
    return (
        <section className="relative bg-gradient-to-br from-[#2574e9] to-[#5fa8f5] text-white min-h-[750px] lg:min-h-[900px] flex items-stretch">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-black/10"></div>

            <div className="container mx-auto px-4 py-14 relative z-10 h-full flex items-center">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Content */}
                    <div className="space-y-6 animate-slide-up">
                        <div className="space-y-4">
                            <Badge className="bg-secondary text-secondary-foreground">
                                Trusted Medical Supplier Since 2024
                            </Badge>

                            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                                Quality Medical
                                <span className="block text-secondary">Supplies</span>
                                <span className="block">for Kenya</span>
                            </h1>

                            <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                                Your trusted partner for premium medical equipment and supplies.
                                Serving healthcare providers country with excellence.
                            </p>
                        </div>

                        {/* Trust indicators */}
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-white/90">
                                <Star className="h-5 w-5 text-secondary" />
                                <span className="text-sm">4.9/5 Customer Rating</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/90">
                                <ShieldCheck className="h-5 w-5 text-secondary" />
                                <span className="text-sm">ISO Certified</span>
                            </div>
                        </div>

                        {/* CTA buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                className="bg-secondary hover:bg-secondary-light text-secondary-foreground text-sm md:text-base h-10 md:h-12 px-4 md:px-8"
                                onClick={() => {
                                    const el = document.getElementById('products');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                aria-label="Shop Medical Supplies"
                            >
                                Shop Medical Supplies
                                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                            </Button>

                            <Button
                                variant="outline"
                                className="border-white text-black hover:bg-white hover:text-primary text-sm md:text-base h-10 md:h-12 px-4 md:px-8"
                                onClick={() => {
                                    const el = document.getElementById('categories');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                aria-label="View All Categories"
                            >
                                View All Categories
                            </Button>

                            <Button
                                variant="outline"
                                className="border-white text-black hover:bg-white hover:text-primary text-sm md:text-base h-10 md:h-12 px-4 md:px-8"
                                onClick={() => {
                                    // Replace with actual catalog download logic
                                    window.open('/catalog.pdf', '_blank');
                                }}
                                aria-label="Download Catalog"
                            >
                                Download Catalog
                            </Button>
                        </div>

                        {/* Key features - always show all on desktop */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8 w-full max-w-2xl">
                            <div className="text-center">
                                <div className="bg-white/10 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                                    <Truck className="h-6 w-6" />
                                </div>
                                <p className="text-sm text-white/90">Free Delivery</p>
                                <p className="text-xs text-white/70">Kiambu & Nairobi CBD</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-white/10 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                                <p className="text-sm text-white/90">ISO Certified</p>
                                <p className="text-xs text-white/70">International Standards</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-white/10 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                                    <Award className="h-6 w-6" />
                                </div>
                                <p className="text-sm text-white/90">Quality Assured</p>
                                <p className="text-xs text-white/70">Premium Products</p>
                            </div>
                        </div>
                    </div>

                    {/* Hero image carousel */}
                    <div className="relative">
                        <div className="rounded-2xl overflow-hidden">
                            <div className="relative">
                                {heroImages.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.src}
                                        alt={image.alt}
                                        className={`w-full h-auto transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
                                            }`}
                                    />
                                ))}

                                {/* Image indicators */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                                    {heroImages.map((_, index) => (
                                        <button
                                            key={index}
                                            aria-label={`Select hero image ${index + 1}`}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex
                                                ? 'bg-secondary scale-125'
                                                : 'bg-white/50 hover:bg-white/75'
                                                }`}
                                            onClick={() => setCurrentImageIndex(index)}
                                        />
                                    ))}
                                </div>

                                {/* Floating badges */}
                                <div className="absolute top-4 left-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                                    1000+ Products
                                </div>

                                <div className="absolute bottom-4 right-4 bg-white text-primary px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                                    Same Day Delivery*
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1200 120" className="w-full h-auto">
                    <path
                        d="M1200 120L0 120L0 40.5C0 40.5 150 0 400 40.5C650 81 950 0 1200 40.5V120Z"
                        fill="hsl(var(--background))"
                    />
                </svg>
            </div>
        </section>
    );
};

export default Hero;