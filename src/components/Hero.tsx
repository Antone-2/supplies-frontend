import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Truck,
  Clock,
  Award,
  ArrowRight
} from 'lucide-react';
import heroImage from '@/assets/hero-medhelm-supplies.jpg';
import heroSupplies from '@/assets/hero-supplies.jpg';
import heroLaboratory from '@/assets/hero-laboratory.jpg';
import heroDelivery from '@/assets/hero-delivery.jpg';

const Hero = () => {
  const navigate = useNavigate();

  const heroSlides = [
    {
      src: heroImage,
      alt: "MEDHELM Supplies",
      badge: "Trusted Medical Supplier Since 2024",
      heading: "Quality Medical Supplies",
      subheading: ["for Kenya"],
      description: "Your trusted partner for medical equipment and supplies. Serving healthcare providers across the country with excellence.",
      cta: {
        label: "Explore Products",
        onClick: () => navigate('/products')
      },
      icon: {
        component: Award,
        title: "Quality Assured",
        subtitle: "Premium Products"
      }
    },
    {
      src: heroSupplies,
      alt: "Medical supplies",
      badge: "State-of-the-art Equipment",
      heading: "Advanced Healthcare",
      subheading: ["Equipment"],
      description: "State-of-the-art medical equipment and diagnostic tools. Ensuring accurate results and reliable performance for healthcare professionals.",
      cta: null,
      icon: {
        component: Truck,
        title: "Fast Delivery",
        subtitle: "Nationwide Shipping"
      }
    },
    {
      src: heroLaboratory,
      alt: "Medical laboratory",
      badge: "Comprehensive Lab Supplies",
      heading: "Laboratory Solutions",
      subheading: ["& Diagnostics"],
      description: "Comprehensive laboratory supplies and diagnostic equipment. Supporting accurate testing and reliable healthcare outcomes.",
      cta: {
        label: "Browse Products",
        onClick: () => navigate('/products')
      },
      icon: {
        component: Clock,
        title: "24/7 Support",
        subtitle: "Emergency Orders"
      }
    },
    {
      src: heroDelivery,
      alt: "Medical delivery service",
      badge: "Fast & Secure",
      heading: "Reliable Delivery",
      subheading: ["Services"],
      description: "Fast and secure delivery of medical supplies across Kenya. Same-day delivery available for Nairobi and Kiambu regions.",
      cta: {
        label: "Contact Us",
        onClick: () => navigate('/contact')
      },
      icon: {
        component: Truck,
        title: "Express Delivery",
        subtitle: "Same Day Available"
      }
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroSlides.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative text-white overflow-hidden min-h-[75svh] md:min-h-screen">
      {/* Full background carousel */}
      <div className="absolute top-0 left-0 right-0 h-[75svh] md:inset-0 h-full w-full">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-contain md:object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
          </div>
        ))}
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-[75svh] md:min-h-screen flex flex-col justify-center px-4 py-16 md:py-24 max-w-7xl mx-auto overflow-hidden">
        <div className="w-full max-w-full md:w-full ml-0 pr-4 md:pr-0">
          {/* Badge */}
          <div className="mb-5 text-left ml-0">
            <span className="inline-block bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold text-gray-900 shadow-lg">
              {heroSlides[currentImageIndex].badge}
            </span>
          </div>

          {/* Content */}
          <div className="animate-slide-up text-left space-y-4 md:space-y-6 ml-0 max-w-full overflow-hidden">
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight ml-0 break-words mb-3">
              <span className="bg-gradient-to-r from-white via-pink-400 to-red-500 bg-clip-text text-transparent drop-shadow-lg ml-0 block mb-2">
                {heroSlides[currentImageIndex].heading}
              </span>
              {heroSlides[currentImageIndex].subheading.map((sub, i) => (
                <span key={i} className="block bg-gradient-to-r from-red-500 via-pink-500 to-red-600 bg-clip-text text-transparent drop-shadow-md font-extrabold ml-0 break-words mb-2">
                  {sub}
                </span>
              ))}
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed md:leading-relaxed max-w-full md:max-w-2xl mb-5 md:mb-8 ml-0 break-words">
              {heroSlides[currentImageIndex].description}
            </p>

            {/* CTA buttons */}
            {heroSlides[currentImageIndex].cta && (
              <div className="mb-7 md:mb-10 ml-0">
                <Button
                  size="default"
                  className="bg-white hover:bg-white/90 text-primary font-semibold px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full text-sm sm:text-base md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 max-w-full"
                  onClick={heroSlides[currentImageIndex].cta?.onClick}
                >
                  {heroSlides[currentImageIndex].cta?.label}
                  <ArrowRight className="ml-1.5 md:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                </Button>
              </div>
            )}
          </div>

          {/* Key features - Mobile: Show current icon only, no container/box, below carousel, with increased spacing */}
          <div className="block md:hidden flex flex-col items-center justify-center" style={{ marginTop: '4rem' }}>
            {(() => {
              const currentSlide = heroSlides[currentImageIndex];
              const IconComponent = currentSlide.icon.component;
              return (
                <>
                  <div style={{ marginTop: '2.5rem' }}></div>
                  <IconComponent className="h-10 w-10 text-white mb-2" />
                  <p className="text-sm font-semibold text-white/95 text-center mb-0">
                    {currentSlide.icon.title}
                  </p>
                  <p className="text-xs text-white/75 text-center mb-0">
                    {currentSlide.icon.subtitle}
                  </p>
                </>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${index === currentImageIndex
              ? 'bg-white scale-125 shadow-lg'
              : 'bg-white/50 hover:bg-white/75'
              }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
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