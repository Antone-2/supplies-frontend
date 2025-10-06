import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Stethoscope,
  Syringe,
  Heart,
  Shield,
  Pill,
  ArrowRight,
  Package,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { productService } from '@/services/productService';

const categoryIcons = {
  "Diagnostic Equipment": Stethoscope,
  "Diagnostics": Stethoscope,
  "Emergency": Heart,
  "Infusion": Syringe,
  "Mobility": ArrowRight,
  "Personal Care": Heart,
  "Safety & PPE": Shield,
  "Surgical Instruments": Syringe,
  "Patient Care": Heart,
  "Pharmaceuticals": Pill,
  "Medical Supplies": Package
};

const categoryColors = {
  "Diagnostic Equipment": "text-primary",
  "Diagnostics": "text-primary",
  "Emergency": "text-red-600",
  "Infusion": "text-secondary",
  "Mobility": "text-blue-600",
  "Personal Care": "text-accent",
  "Safety & PPE": "text-green-600",
  "Surgical Instruments": "text-secondary",
  "Patient Care": "text-accent",
  "Pharmaceuticals": "text-purple-600",
  "Medical Supplies": "text-gray-600"
};

// Default descriptions for categories
const categoryDescriptions = {
  "Diagnostics": "Diagnostic equipment and tools",
  "Emergency": "Emergency medical supplies",
  "Infusion": "Infusion and IV equipment",
  "Mobility": "Mobility aids and equipment",
  "Personal Care": "Personal care products",
  "Safety & PPE": "Safety and protective equipment",
  "Surgical Instruments": "Surgical tools and instruments",
  "Patient Care": "Patient care supplies",
  "Pharmaceuticals": "Pharmaceutical products",
  "Medical Supplies": "General medical supplies"
};

interface CategoryData {
  name: string;
  count: number;
  description: string;
}

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('Categories component: Starting to fetch categories...');
        setLoading(true);
        const fetchedCategories = await productService.getCategories();
        console.log('Categories component: Fetched categories:', fetchedCategories);

        // Transform API categories to match component format
        const transformedCategories: CategoryData[] = fetchedCategories.map(categoryName => ({
          name: categoryName,
          count: 0, // Will be updated when we fix the counts endpoint
          description: categoryDescriptions[categoryName as keyof typeof categoryDescriptions] || `${categoryName} products`
        }));

        console.log('Categories component: Transformed categories:', transformedCategories);
        setCategories(transformedCategories);
        setError(null);
      } catch (err) {
        console.error('Categories component: Failed to fetch categories:', err);
        setError('Failed to load categories');
        // Fallback to empty array
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/category/${encodeURIComponent(categoryName)}`);
  };

  const handleViewAllCategories = () => {
    navigate('/products');
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Hide entire categories container on mobile */}
        <div className="hidden md:block text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-medical-heading mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-medical-body max-w-2xl mx-auto">
            Find exactly what you need with our comprehensive range of medical supplies and equipment,
            organized by specialty for your convenience.
          </p>
        </div>

        {/* Hide category icons section on mobile */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading state
            <div className="col-span-full flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-medical-body">Loading categories...</span>
            </div>
          ) : error ? (
            // Error state
            <div className="col-span-full text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : categories.length === 0 ? (
            // No categories state
            <div className="col-span-full text-center py-12">
              <p className="text-medical-body">No categories available</p>
            </div>
          ) : (
            // Categories loaded successfully
            categories.map((category, index) => {
              const IconComponent = categoryIcons[category.name as keyof typeof categoryIcons] || Package;
              const iconColor = categoryColors[category.name as keyof typeof categoryColors] || "text-gray-600";

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
                      {category.count > 0 && (
                        <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                          {category.count}
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold text-medical-heading mb-3 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>

                    <p className="text-medical-body mb-6">
                      {category.description}
                    </p>

                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                    >
                      Browse Category
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Hide view all categories button on mobile */}
        <div className="hidden md:block text-center mt-12">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary-light"
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