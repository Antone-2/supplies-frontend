import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/cartContext';
import { useWishlist } from '@/context/wishlistContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Stethoscope,
  Syringe,
  Shield,
  Pill,
  Package,
  AlertCircle
} from 'lucide-react';
import { Heart, ShoppingCart } from 'lucide-react';
import productService from '@/services/productService';

interface CategoryData {
  id: string;
  name: string;
  description: string;
  icon: any;
  productCount: number;
  color: string;
  products: any[];
}

interface CategoriesProps {
  setSelectedCategory?: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = () => {
  const { addToCart, loading: cartLoading, error: cartError } = useCart();
  const { addToWishlist, loading: wishlistLoading, error: wishlistError } = useWishlist();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCategory] = useState<string | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<Record<string, any[] | null>>({});
  const [productsLoading, setProductsLoading] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState('');
  // Feedback handlers
  // Example usage of setSelectedCategory (if provided):
  // setSelectedCategory && setSelectedCategory('SomeCategory');
  const handleAddToCart = async (product: any) => {
    await addToCart(product._id || product.id, 1);
    setSuccessMsg('Added to cart!');
    setShowToast(true);
    setTimeout(() => { setShowToast(false); setSuccessMsg(null); }, 1800);
  };
  const handleAddToWishlist = async (product: any) => {
    await addToWishlist(product._id || product.id);
    setSuccessMsg('Added to wishlist!');
    setShowToast(true);
    setTimeout(() => { setShowToast(false); setSuccessMsg(null); }, 1800);
  };
  // Fetch products for a category
  const fetchProductsForCategory = async (categoryName: string) => {
    setProductsLoading((prev) => ({ ...prev, [categoryName]: true }));
    try {
      const res = await productService.getFilteredProducts({ category: categoryName });
      // If no products returned, but productCount > 0, show a loading message or refetch
      if (res.data.products && res.data.products.length === 0) {
        setCategoryProducts((prev) => ({ ...prev, [categoryName]: null }));
      } else {
        setCategoryProducts((prev) => ({ ...prev, [categoryName]: res.data.products || [] }));
      }
    } catch (err) {
      setCategoryProducts((prev) => ({ ...prev, [categoryName]: null }));
    } finally {
      setProductsLoading((prev) => ({ ...prev, [categoryName]: false }));
    }
  };

  const categoryIcons: Record<string, any> = {
    "Diagnostic Equipment": Stethoscope,
    "Surgical Instruments": Syringe,
    "Patient Care": Heart,
    "Safety & PPE": Shield,
    "Pharmaceuticals": Pill,
    "Medical Supplies": Package
  };

  // Assign unique gradient colors for each category icon
  const categoryIconBg: Record<string, string> = {
    "Diagnostic Equipment": "from-blue-500 to-cyan-400",
    "Surgical Instruments": "from-red-500 to-pink-400",
    "Patient Care": "from-pink-500 to-fuchsia-400",
    "Safety & PPE": "from-green-500 to-emerald-400",
    "Pharmaceuticals": "from-purple-500 to-indigo-400",
    "Medical Supplies": "from-orange-500 to-yellow-400"
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await productService.getCategoriesWithCounts();
      if (response.success && Array.isArray(response.data) && response.data.length > 0) {
        const mappedCategories = response.data.map((cat) => {
          const icon = categoryIcons[cat.name] || Package;
          const color = categoryIconBg[cat.name] || "text-gray-600";
          return {
            id: cat.name.toLowerCase().replace(/\s+/g, '-'),
            name: cat.name,
            description: (cat as any).description || '',
            icon,
            productCount: cat.count,
            color,
            products: [],
          };
        });
        setCategories(mappedCategories.sort((a, b) => b.productCount - a.productCount));
      } else {
        // Fallback demo categories
        setCategories([
          {
            id: 'diagnostic-equipment',
            name: 'Diagnostic Equipment',
            description: 'Stethoscopes, BP monitors, thermometers & more',
            icon: Stethoscope,
            productCount: 12,
            color: 'text-blue-600',
            products: [],
          },
          {
            id: 'surgical-instruments',
            name: 'Surgical Instruments',
            description: 'Precision tools for medical procedures',
            icon: Syringe,
            productCount: 8,
            color: 'text-red-600',
            products: [],
          },
          {
            id: 'patient-care',
            name: 'Patient Care',
            description: 'Comfort items, beddings, and care essentials',
            icon: Heart,
            productCount: 15,
            color: 'text-pink-600',
            products: [],
          },
          {
            id: 'safety-ppe',
            name: 'Safety & PPE',
            description: 'Protective equipment for healthcare safety',
            icon: Shield,
            productCount: 10,
            color: 'text-green-600',
            products: [],
          },
          {
            id: 'pharmaceuticals',
            name: 'Pharmaceuticals',
            description: 'Medications and therapeutic solutions',
            icon: Pill,
            productCount: 20,
            color: 'text-purple-600',
            products: [],
          },
          {
            id: 'medical-supplies',
            name: 'Medical Supplies',
            description: 'First aid, bandages, and essential supplies',
            icon: Package,
            productCount: 18,
            color: 'text-orange-600',
            products: [],
          },
        ]);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Fallback demo categories on error
      setCategories([
        {
          id: 'diagnostic-equipment',
          name: 'Diagnostic Equipment',
          description: 'Stethoscopes, BP monitors, thermometers & more',
          icon: Stethoscope,
          productCount: 12,
          color: 'text-blue-600',
          products: [],
        },
        {
          id: 'surgical-instruments',
          name: 'Surgical Instruments',
          description: 'Precision tools for medical procedures',
          icon: Syringe,
          productCount: 8,
          color: 'text-red-600',
          products: [],
        },
        {
          id: 'patient-care',
          name: 'Patient Care',
          description: 'Comfort items, beddings, and care essentials',
          icon: Heart,
          productCount: 15,
          color: 'text-pink-600',
          products: [],
        },
        {
          id: 'safety-ppe',
          name: 'Safety & PPE',
          description: 'Protective equipment for healthcare safety',
          icon: Shield,
          productCount: 10,
          color: 'text-green-600',
          products: [],
        },
        {
          id: 'pharmaceuticals',
          name: 'Pharmaceuticals',
          description: 'Medications and therapeutic solutions',
          icon: Pill,
          productCount: 20,
          color: 'text-purple-600',
          products: [],
        },
        {
          id: 'medical-supplies',
          name: 'Medical Supplies',
          description: 'First aid, bandages, and essential supplies',
          icon: Package,
          productCount: 18,
          color: 'text-orange-600',
          products: [],
        },
      ]);
      setError('');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="hover:shadow-lg">
                <CardContent className="p-8">
                  <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-6 w-32 mx-auto mb-2" />
                  <Skeleton className="h-4 w-48 mx-auto mb-4" />
                  <Skeleton className="h-4 w-24 mx-auto mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <Alert variant="destructive" className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

  // Filter categories by search
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase()) ||
    cat.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in">Shop by Category</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
            Discover our comprehensive range of medical supplies organized by specialty. Find exactly what you need with our expertly curated categories.
          </p>
        </div>
        {/* Search/filter bar */}
        <div className="flex justify-center mb-10 animate-fade-in">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search categories..."
            className="w-full max-w-md px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>

        {filteredCategories.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 text-lg">No categories found.</p>
            <Button className="mt-4" onClick={() => setSearch('')}>
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCategories.map((category) => {
              const IconComponent = category.icon;
              const isExpanded = expandedCategory === category.name;
              return (
                <div
                  key={category.id}
                  className="block group cursor-pointer"
                >
                  <Card className="hover:shadow-2xl transition-all duration-300 group-hover:scale-105 border-0 bg-gradient-to-br from-white to-blue-50 animate-fade-in">
                    <CardContent className="p-8 text-center">
                      {IconComponent ? (
                        <div className={`bg-gradient-to-br ${categoryIconBg[category.name] || 'from-gray-400 to-gray-600'} rounded-full p-5 w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="h-10 w-10 text-white drop-shadow-lg" />
                        </div>
                      ) : null}

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>

                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {category.description}
                      </p>

                      <div className="flex items-center justify-center gap-2 mb-4">
                        {(() => {
                          const products = categoryProducts[category.name];
                          if (typeof products !== 'undefined' && Array.isArray(products)) {
                            return (
                              <>
                                <span className={`text-2xl font-bold ${products.length > 0 ? 'text-blue-700' : 'text-gray-400'}`}>
                                  {products.length}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {products.length === 1 ? 'Product' : 'Products'}
                                </span>
                              </>
                            );
                          } else {
                            return (
                              <>
                                <span className="text-2xl font-bold text-gray-400">?</span>
                                <span className="text-sm text-gray-400">Products</span>
                              </>
                            );
                          }
                        })()}
                      </div>

                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 mb-2"
                        onClick={() => {
                          if (typeof categoryProducts[category.name] === 'undefined') {
                            fetchProductsForCategory(category.name);
                          }
                          const products = categoryProducts[category.name];
                          if (Array.isArray(products) && products.length > 0) {
                            // Redirect to product catalog filtered by category
                            window.location.href = `/shop?category=${encodeURIComponent(category.name)}`;
                          } else {
                            alert('No available products in this category.');
                          }
                        }}
                        disabled={productsLoading[category.name]}
                      >
                        View Products
                      </Button>

                      {isExpanded && (() => {
                        const products = categoryProducts[category.name];
                        return (
                          <div className="mt-4 animate-fade-in">
                            {productsLoading[category.name] ? (
                              <div className="text-blue-600 font-medium">Loading products...</div>
                            ) : (Array.isArray(products) && products.length > 0) ? (
                              <>
                                {showToast && (
                                  <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-2 rounded shadow-lg animate-fade-in-out">
                                    {successMsg}
                                  </div>
                                )}
                                {cartError && <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-red-600 text-white px-6 py-2 rounded shadow-lg animate-fade-in-out">{cartError}</div>}
                                {wishlistError && <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-red-600 text-white px-6 py-2 rounded shadow-lg animate-fade-in-out">{wishlistError}</div>}
                                <ul className="space-y-2">
                                  {products.map((product: any) => (
                                    <li key={product._id || product.id} className="border rounded p-2 text-left flex items-center justify-between gap-2 bg-white shadow-sm hover:shadow-md transition-all">
                                      <span className="font-semibold">{product.name}</span> - <span className="text-primary font-bold">KES {product.price}</span>
                                      <div className="flex gap-2">
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              size="icon"
                                              variant="ghost"
                                              className="hover:bg-pink-100"
                                              disabled={wishlistLoading}
                                              onClick={() => handleAddToWishlist(product)}
                                              aria-label="Add to Wishlist"
                                            >
                                              <Heart className="h-5 w-5 text-pink-500" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            Add to Wishlist
                                          </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              size="icon"
                                              variant="ghost"
                                              className="hover:bg-primary/10"
                                              disabled={cartLoading}
                                              onClick={() => handleAddToCart(product)}
                                              aria-label="Add to Cart"
                                            >
                                              <ShoppingCart className="h-5 w-5 text-primary" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            Add to Cart
                                          </TooltipContent>
                                        </Tooltip>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            ) : (
                              <div className="text-gray-500">{category.productCount > 0 ? 'Products are being loaded, please try again.' : 'No products found in this category.'}</div>
                            )}
                          </div>
                        );
                      })()}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for?
          </p>
          <Button variant="outline" asChild>
            <Link to={{ pathname: "/shop" }} state={{ resetFilters: true }}>View All Products</Link>
          </Button>
        </div>
      </div>
      {/* Animations */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.7s ease; }
        @keyframes fade-in-out { 0% { opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { opacity: 0; } }
        .animate-fade-in-out { animation: fade-in-out 2s; }
      `}</style>
    </section>
  );
};

export default Categories;
