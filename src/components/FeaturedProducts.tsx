import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Truck,
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getFeaturedProducts, Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const featuredProducts = getFeaturedProducts();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleViewAllProducts = () => {
    navigate('/products');
  };

  return (
    <section className="py-8 sm:py-12 lg:py-20 bg-background">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-medical-heading mb-3 sm:mb-4">
            Featured Products
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-medical-body max-w-2xl mx-auto px-4">
            Discover our most popular and trusted medical equipment, chosen by healthcare
            professionals across Kenya for their reliability and quality.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 sm:h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-1 sm:top-2 md:top-3 left-1 sm:left-2 md:left-3 flex flex-col gap-1">
                  {product.isNew && (
                    <Badge className="bg-accent text-accent-foreground text-xs">NEW</Badge>
                  )}
                  {product.discount > 0 && (
                    <Badge className="bg-secondary text-secondary-foreground text-xs">
                      -{product.discount}%
                    </Badge>
                  )}
                </div>

                {/* Quick actions */}
                <div className="absolute top-1 sm:top-2 md:top-3 right-1 sm:right-2 md:right-3 flex flex-col gap-1 sm:gap-2 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                    onClick={() => toggleWishlist(product)}
                  >
                    <Heart
                      className={`h-3 w-3 sm:h-4 sm:w-4 ${isInWishlist(product.id) ? 'text-red-500 fill-current' : ''
                        }`}
                    />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>

                {/* Stock indicator */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-2 sm:p-3 md:p-4 lg:p-6">
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">{product.brand}</p>
                    <h3 className="font-semibold text-sm sm:text-base text-medical-heading group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 sm:h-4 sm:w-4 ${i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground hidden sm:inline">
                      {product.rating} ({product.reviews})
                    </span>
                    <span className="text-xs text-muted-foreground sm:hidden">
                      {product.rating}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                    <span className="text-sm sm:text-base lg:text-lg font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    {product.discount > 0 && (
                      <span className="text-xs sm:text-sm text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <div className="hidden sm:flex items-center gap-2 lg:gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Truck className="h-3 w-3" />
                      <span className="hidden md:inline">Free Delivery</span>
                      <span className="md:hidden">Free</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      <span className="hidden md:inline">Warranty</span>
                      <span className="md:hidden">Safe</span>
                    </div>
                  </div>

                  {/* Add to cart button */}
                  <Button
                    className="w-full text-xs sm:text-sm py-1 sm:py-2"
                    disabled={!product.inStock}
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Add to Cart</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10 lg:mt-12">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
            onClick={handleViewAllProducts}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;