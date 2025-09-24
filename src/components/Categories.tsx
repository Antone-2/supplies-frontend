import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Stethoscope,
  Syringe,
  Heart,
  Shield,
  Thermometer,
  Pill,
  ArrowRight,
  Package
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { categories as categoryData } from '@/data/products';

const categoryIcons = {
  "Diagnostic Equipment": Stethoscope,
  "Surgical Instruments": Syringe,
  "Patient Care": Heart,
  "Safety & PPE": Shield,
  "Pharmaceuticals": Pill,
  "Medical Supplies": Package
};

const categoryColors = {
  "Diagnostic Equipment": "text-primary",
  "Surgical Instruments": "text-secondary",
  "Patient Care": "text-accent",
  "Safety & PPE": "text-primary",
  "Pharmaceuticals": "text-secondary",
  "Medical Supplies": "text-accent"
};

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/category/${encodeURIComponent(categoryName)}`);
  };

  const handleViewAllCategories = () => {
    navigate('/products');
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-medical-heading mb-4 font-['Roboto']">
            Shop by Category
          </h2>
          <p className="text-lg text-medical-body max-w-2xl mx-auto font-['Roboto']">
            Find exactly what you need with our comprehensive range of medical supplies and equipment,
            organized by specialty for your convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryData.map((category, index) => {
            const IconComponent = categoryIcons[category.name as keyof typeof categoryIcons];
            const iconColor = categoryColors[category.name as keyof typeof categoryColors];

            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-muted/50 hover:scale-105 cursor-pointer"
                onClick={() => handleCategoryClick(category.name)}
              >
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div className="bg-muted rounded-full p-6 w-20 h-20 mx-auto flex items-center justify-center group-hover:bg-white transition-colors duration-300 shadow-md">
                      <IconComponent className={`h-8 w-8 ${iconColor}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                      {category.count}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-medical-heading mb-3 group-hover:text-primary transition-colors font-['Roboto']">
                    {category.name}
                  </h3>

                  <p className="text-medical-body mb-6 font-['Roboto']">
                    {category.description}
                  </p>

                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 font-['Roboto']"
                  >
                    Browse Category
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary-light font-['Roboto']"
            onClick={handleViewAllCategories}
          >
            View All Categories
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Categories;