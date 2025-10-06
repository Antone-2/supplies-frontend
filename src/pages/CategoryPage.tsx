import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import WhatsAppChat from '@/components/WhatsAppChat';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Truck,
  Shield,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { productService, Product } from '@/services/productService';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Connect to cart context
  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    isInCart,
    getCartItemQuantity
  } = useCart();

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (!categoryName) {
        setError('No category specified');
        setLoading(false);
        return;
      }

      try {
        console.log('CategoryPage: Fetching products for category:', categoryName);
        setLoading(true);

        // Decode the category name from URL
        const decodedCategory = decodeURIComponent(categoryName);

        // Fetch products for this category
        const response = await productService.getProductsByCategory(decodedCategory);
        console.log('CategoryPage: Fetched products:', response);

        // Transform products if needed
        const transformedProducts = response.products.map(product =>
          productService.transformProduct(product)
        );

        setProducts(transformedProducts);
        setError(null);
      } catch (err) {
        console.error('CategoryPage: Failed to fetch category products:', err);
        setError('Failed to load products for this category');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  const handleAddToCart = (product: Product) => {
    if (isInCart(product.id)) {
      toast.success(`${product.name} is already in your cart`);
    } else {
      addToCart(product);
      toast.success(`${product.name} added to cart`);
    }
  };

  const handleToggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(price);
  };

  const decodedCategoryName = categoryName ? decodeURIComponent(categoryName) : '';

  return (
    <div className="min-h-screen">
      <SEOHead
        title={`${decodedCategoryName} - MEDHELM`}
        description={`Shop ${decodedCategoryName.toLowerCase()} products and medical supplies.`}
        keywords={`${decodedCategoryName.toLowerCase()}, medical products, equipment, Kenya`}
      />
      <Header />

      <main className="pt-20">
        <div className="bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-medical-heading mb-4">
              {decodedCategoryName}
            </h1>

            <p className="text-lg text-medical-body max-w-2xl">
              Browse our collection of {decodedCategoryName.toLowerCase()} products and medical supplies.
            </p>
          </div>
        </div>

        <section className="py-20">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
                <span className="text-medical-body">Loading products...</span>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-medical-body mb-4">No products found in this category.</p>
                <Button onClick={() => navigate('/products')}>
                  Browse All Products
                </Button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-semibold text-medical-heading">
                    {products.length} Product{products.length !== 1 ? 's' : ''} Found
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <Card
                      key={product.id}
                      className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-muted/50"
                    >
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden rounded-t-lg">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />

                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.isNew && (
                              <Badge className="bg-secondary text-secondary-foreground">
                                NEW
                              </Badge>
                            )}
                            {product.discount > 0 && (
                              <Badge className="bg-red-500 text-white">
                                -{product.discount}%
                              </Badge>
                            )}
                          </div>

                          {/* Action buttons */}
                          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="w-10 h-10 rounded-full p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleWishlist(product);
                              }}
                            >
                              <Heart
                                className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''
                                  }`}
                              />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="w-10 h-10 rounded-full p-0"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < Math.floor(product.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                    }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              ({product.reviews})
                            </span>
                          </div>

                          <h3 className="font-semibold text-medical-heading mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>

                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-primary">
                                {formatPrice(product.price)}
                              </span>
                              {product.originalPrice > product.price && (
                                <span className="text-sm text-muted-foreground line-through">
                                  {formatPrice(product.originalPrice)}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                            <Truck className="h-3 w-3" />
                            <span>Free shipping</span>
                            <Shield className="h-3 w-3 ml-2" />
                            <span>Warranty</span>
                          </div>

                          <Button
                            onClick={() => handleAddToCart(product)}
                            className="w-full"
                            disabled={!product.inStock}
                          >
                            {!product.inStock ? (
                              'Out of Stock'
                            ) : isInCart(product.id) ? (
                              <>
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                In Cart ({getCartItemQuantity(product.id)})
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Add to Cart
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
      <WhatsAppChat />
      <div className="lg:hidden h-20"></div>
    </div>
  );
};

export default CategoryPage;