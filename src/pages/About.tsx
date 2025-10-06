import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Award, Users, MapPin, Clock, ShieldCheck, Heart, Target, Eye } from 'lucide-react';
import medhelmLogo from '../assets/medhelm-logo.svg';

const About = () => {
  const values = [
    { icon: Heart, title: 'Patient Care', description: 'Focused on improving patient outcomes.' },
    { icon: ShieldCheck, title: 'Quality First', description: 'Highest standards in product quality.' },
    { icon: Users, title: 'Trusted Partners', description: 'Building lasting healthcare relationships.' },
    { icon: Target, title: 'Innovation', description: 'Seeking solutions for healthcare needs.' },
  ];
  const stats = [
    { icon: Award, value: '2+', label: 'Years' },
    { icon: Users, value: '10+', label: 'Partners' },
    { icon: MapPin, value: '45+', label: 'Counties' },
    { icon: Clock, value: '24/7', label: 'Support' },
  ];
  const milestones = [
    { year: '24', event: 'Founded in Kiambu' },
    { year: '24', event: 'Expanded to Nairobi' },
    { year: '24', event: '10+ healthcare clients' },
    { year: '24', event: '24/7 emergency service' },
    { year: '24', event: 'ISO certified' },
    { year: '25', event: 'Online platform launched' },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      {/* Logo and Tagline */}
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary to-blue-500 py-20 text-white text-center relative">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <img src={medhelmLogo} alt="Medhelm Supplies Logo" className="h-12 mb-4 mx-auto" />
          <span className="inline-block bg-white/20 text-white px-6 py-2 rounded-full font-medium mb-6 text-base tracking-wide">About MEDHELM</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">Trusted Medical Partner</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Since 2024, serving Kenya with quality medical supplies.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-[#f6faff] py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-foreground">Our Story</h2>
            <p className="text-muted-foreground mb-4 max-w-xl">
              Started in Kiambu. Now trusted across Kenya for fast, quality medical supplies.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <Card key={idx} className="text-center shadow-md border border-blue-100 bg-white">
                <CardContent className="p-6 flex flex-col items-center">
                  <stat.icon className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-2xl font-bold text-primary">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <Card className="bg-[#f6faff] border border-blue-100 shadow-none hover:shadow-md transition-shadow">
            <CardContent className="p-6 md:p-8 flex flex-col items-center text-center">
              <Target className="h-8 w-8 md:h-10 md:w-10 text-primary mb-3 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold mb-2">Our Mission</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Reliable medical supplies for Kenya's healthcare providers.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-[#f6faff] border border-blue-100 shadow-none hover:shadow-md transition-shadow">
            <CardContent className="p-6 md:p-8 flex flex-col items-center text-center">
              <Eye className="h-8 w-8 md:h-10 md:w-10 text-primary mb-3 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold mb-2">Our Vision</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Kenya's most trusted medical supply partner.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-[#f6faff] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-2">Our Values</h2>
          <p className="text-muted-foreground text-center mb-8 text-base">Core principles guiding our service to healthcare partners.</p>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {values.map((value, idx) => (
              <Card key={idx} className="text-center border border-blue-100 shadow-none bg-white hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-4 md:p-6 lg:p-8 flex flex-col items-center">
                  <value.icon className="h-8 w-8 md:h-10 md:w-10 text-primary mb-2 md:mb-3" />
                  <h3 className="text-sm md:text-base lg:text-lg font-bold mb-1 md:mb-2">{value.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-tight">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-2">Our Journey</h2>
          <p className="text-muted-foreground text-center mb-8 text-base">Key milestones in our healthcare service growth.</p>
          <div className="max-w-2xl mx-auto">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="flex gap-4 mb-8 last:mb-0 items-center">
                <div className="flex flex-col items-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-md">
                    {milestone.year}
                  </div>
                  {idx < milestones.length - 1 && (
                    <div className="w-0.5 bg-blue-200 h-12"></div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground text-base">{milestone.event}</p>
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