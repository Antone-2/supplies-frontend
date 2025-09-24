import { useState, useEffect } from 'react';
import medhelmSuppliesImg from '@/assets/medhelm-supplies.jpg';
import equipmentImg from '@/assets/equipment.jpg';
import productsImg from '@/assets/products-image.jpg';
import transportImg from '@/assets/transport-vehicle.jpg';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// ...existing code...
import {
    LuShieldCheck,
    LuTruck,
    LuAward,
    LuArrowRight
} from 'react-icons/lu';
// ...existing code...

const Hero = () => {
    // ...existing code...

    const heroSlides = [
        {
            image: { src: medhelmSuppliesImg, alt: "Medical supplies warehouse" },
            title: "Quality Medical Supplies",
            subtitle: "for Kenya",
            description: "Your trusted partner for medical equipment and supplies. Serving healthcare providers across the country with excellence.",
            badge: "Trusted Medical Supplier Since 2024",
            cta: "Shop Medical Supplies",
            features: [
                {
                    icon: LuTruck,
                    title: "Free Delivery",
                    subtitle: "Kiambu & Nairobi CBD",
                    color: "text-green-300"
                },
                {
                    icon: LuShieldCheck,
                    title: "ISO Certified",
                    subtitle: "International Standards",
                    color: "text-blue-300"
                },
                {
                    icon: LuAward,
                    title: "Quality Assured",
                    subtitle: "Premium Products",
                    color: "text-pink-300"
                }
            ]
        },
        {
            image: { src: equipmentImg, alt: "Healthcare professionals" },
            title: "Advanced Healthcare",
            subtitle: "Equipment",
            description: "State-of-the-art medical equipment and diagnostic tools. Ensuring accurate results and reliable performance for healthcare professionals.",
            badge: "ISO Certified Equipment",
            cta: "Explore Equipment",
            features: [
                {
                    icon: LuShieldCheck,
                    title: "ISO Certified",
                    subtitle: "International Standards",
                    color: "text-blue-300"
                },
                {
                    icon: LuAward,
                    title: "Quality Assured",
                    subtitle: "Premium Products",
                    color: "text-pink-300"
                },
                {
                    icon: LuTruck,
                    title: "Fast Delivery",
                    subtitle: "Nationwide Coverage",
                    color: "text-green-300"
                }
            ]
        },
        {
            image: { src: productsImg, alt: "Medical laboratory" },
            title: "Laboratory Solutions",
            subtitle: "& Diagnostics",
            description: "Comprehensive laboratory supplies and diagnostic equipment. Supporting accurate testing and reliable healthcare outcomes.",
            badge: "Quality Assured Products",
            cta: "View Lab Supplies",
            features: [
                {
                    icon: LuAward,
                    title: "Quality Assured",
                    subtitle: "Premium Products",
                    color: "text-pink-300"
                },
                {
                    icon: LuShieldCheck,
                    title: "Certified Labs",
                    subtitle: "Medical Standards",
                    color: "text-blue-300"
                },
                {
                    icon: LuTruck,
                    title: "Express Delivery",
                    subtitle: "Same Day Service",
                    color: "text-green-300"
                }
            ]
        },
        {
            image: { src: transportImg, alt: "Medical delivery service" },
            title: "Reliable Delivery",
            subtitle: "Services",
            description: "Fast and secure delivery of medical supplies across Kenya. Same-day delivery available for Nairobi and Kiambu regions.",
            badge: "Nationwide Coverage",
            cta: "Order Now",
            features: [
                {
                    icon: LuTruck,
                    title: "Free Delivery",
                    subtitle: "Kiambu & Nairobi CBD",
                    color: "text-green-300"
                },
                {
                    icon: LuShieldCheck,
                    title: "Secure Transport",
                    subtitle: "Temperature Controlled",
                    color: "text-blue-300"
                },
                {
                    icon: LuAward,
                    title: "24/7 Support",
                    subtitle: "Always Available",
                    color: "text-pink-300"
                }
            ]
        }
    ];

    // ...existing code...

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEndX(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStartX || !touchEndX) return;
        const distance = touchStartX - touchEndX;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;
        if (isLeftSwipe) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === heroSlides.length - 1 ? 0 : prevIndex + 1
            );
        }
        if (isRightSwipe) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? heroSlides.length - 1 : prevIndex - 1
            );
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === heroSlides.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000); // Change image every 4 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section
            className="relative text-white min-h-[500px] md:min-h-[750px] lg:min-h-[900px] flex items-stretch overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Full-screen carousel background */}
            <div className="absolute inset-0 z-0">
                {heroSlides.map((slide, index) => (
                    <img
                        key={index}
                        src={slide.image.src}
                        alt={slide.image.alt}
                        className={`absolute inset-0 w-full h-full object-contain md:object-cover transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                ))}
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content overlay */}
            <div className="container mx-auto px-4 py-8 md:py-14 relative z-10 h-full flex items-center">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
                    {/* Content */}
                    <div className="space-y-6 md:space-y-8 animate-slide-up">
                        <div className="space-y-4 md:space-y-6">
                            <Badge className="bg-secondary/90 backdrop-blur-sm text-secondary-foreground px-4 py-2 text-sm font-medium shadow-lg border border-white/20 font-['Roboto']">
                                {heroSlides[currentImageIndex].badge}
                            </Badge>
                            <div className="space-y-2">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white sm:bg-gradient-to-r sm:from-white sm:via-red-400 sm:to-pink-500 sm:bg-clip-text sm:text-transparent">
                                    {heroSlides[currentImageIndex].title}
                                    <span className="block text-red-400 mt-1 sm:text-red-400 sm:via-pink-500" style={{ color: '#E53935' }}>{heroSlides[currentImageIndex].subtitle}</span>
                                </h1>
                            </div>
                            {/* Show description on all screens with better mobile formatting */}
                            <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-lg font-light font-['Roboto']">
                                {heroSlides[currentImageIndex].description}
                            </p>
                        </div>

                        {/* CTA button - mobile optimized */}
                        <div className="flex justify-center pt-4">
                            <Button
                                className="bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-secondary-foreground text-base font-semibold h-12 sm:h-14 px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl hover:shadow-secondary/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 border-2 border-white/20 backdrop-blur-sm w-full sm:w-auto"
                                onClick={() => {
                                    const el = document.getElementById('products');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                aria-label={heroSlides[currentImageIndex].cta}
                            >
                                <span className="flex items-center justify-center gap-2 whitespace-nowrap">
                                    {heroSlides[currentImageIndex].cta}
                                    <LuArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Button>
                        </div>

                        {/* Single Icon - interchanging with carousel - mobile only */}
                        <div className="flex justify-center pt-8 md:pt-12 lg:hidden">
                            {(() => {
                                const feature = heroSlides[currentImageIndex].features[0];
                                const IconComponent = feature.icon;
                                return (
                                    <div className="text-center flex flex-col items-center group animate-fade-in">
                                        <div className="bg-white/20 backdrop-blur-md rounded-full p-4 w-14 h-14 md:w-16 md:h-16 mb-4 flex items-center justify-center shadow-lg border border-white/20 group-hover:bg-white/30 transition-all duration-300 transform group-hover:scale-110">
                                            <IconComponent className={`h-6 w-6 md:h-7 md:w-7 ${feature.color}`} />
                                        </div>
                                        <p className="text-sm md:text-base text-white font-semibold mb-1 group-hover:text-white transition-colors font-['Roboto']">{feature.title}</p>
                                        <p className="text-xs text-white/70 group-hover:text-white/90 transition-colors font-['Roboto']">{feature.subtitle}</p>
                                    </div>
                                );
                            })()}
                        </div>
                    </div>

                    {/* All Icons - arranged for desktop */}
                    <div className="hidden lg:flex flex-col items-center justify-center space-y-6">
                        {/* Dynamic Key features - cycling with carousel */}
                        <div className="flex justify-between pt-8 md:pt-12 w-full relative">
                            {heroSlides[currentImageIndex].features.map((feature, index) => {
                                const IconComponent = feature.icon;
                                let positionClass = "";
                                if (index === 0) {
                                    positionClass = "absolute left-5 top-0";
                                } else if (index === 1) {
                                    positionClass = "absolute left-1/2 top-0 transform -translate-x-1/2";
                                } else if (index === 2) {
                                    positionClass = "absolute right-5 top-0";
                                }
                                return (
                                    <div key={index} className={`text-center flex flex-col items-center min-w-[110px] md:min-w-[120px] group animate-fade-in ${positionClass}`} style={{ animationDelay: `${index * 0.2}s` }}>
                                        <div className="bg-white/20 backdrop-blur-md rounded-full p-4 w-14 h-14 md:w-16 md:h-16 mb-4 flex items-center justify-center shadow-lg border border-white/20 group-hover:bg-white/30 transition-all duration-300 transform group-hover:scale-110">
                                            <IconComponent className={`h-6 w-6 md:h-7 md:w-7 ${feature.color}`} />
                                        </div>
                                        <p className="text-sm md:text-base text-white font-semibold mb-1 group-hover:text-white transition-colors font-['Roboto']">{feature.title}</p>
                                        <p className="text-xs text-white/70 group-hover:text-white/90 transition-colors font-['Roboto']">{feature.subtitle}</p>
                                    </div>
                                );
                            })}
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

            {/* Custom animations */}
            <style>{`
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes pulse-glow {
                    0%, 100% {
                        box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
                    }
                    50% {
                        box-shadow: 0 0 30px rgba(59, 130, 246, 0.8);
                    }
                }

                .animate-slide-up {
                    animation: slide-up 0.8s ease-out;
                }

                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }

                .animate-pulse-glow {
                    animation: pulse-glow 2s infinite;
                }

                /* Enhanced button hover effects */
                .hero-button:hover {
                    transform: translateY(-2px);
                }

                /* Smooth transitions for all interactive elements */
                .hero-interactive {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                /* Improved text shadows for better readability */
                .hero-text-shadow {
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }
            `}</style>
        </section >
    );
};

export default Hero;
