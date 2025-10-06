import { useMemo, useState, useEffect } from 'react';
import { Star, ShoppingCart, Heart, Eye, Truck, Shield } from 'lucide-react';
import { Product } from '@/services/productService';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { productService } from '@/services/productService';
import ProductDetails from './ProductDetails';

interface ProductListProps {
  searchQuery?: string;
  selectedCategory?: string;
  selectedPriceRange?: string;
  products?: Product[];
}

const ProductList = ({
  searchQuery = '',
  selectedCategory = '',
  selectedPriceRange = '',
  products: _providedProducts
}: ProductListProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    isInCart,
    getCartItemQuantity
  } = useCart();

  // Parse price range for filters
  const priceFilters = useMemo(() => {
    if (!selectedPriceRange || selectedPriceRange === 'all') return {};
    const [min, max] = selectedPriceRange.split('-').map(Number);
    return {
      ...(min && { minPrice: min }),
      ...(max && { maxPrice: max })
    };
  }, [selectedPriceRange]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const filters: any = { limit: 100 };
        if (searchQuery) filters.search = searchQuery;
        if (selectedCategory && selectedCategory !== 'all') filters.category = selectedCategory;
        Object.assign(filters, priceFilters);
        const response = await productService.getProducts(filters);
        setProducts(response.products.map(productService.transformProduct));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchQuery, selectedCategory, priceFilters]);

  const formatCurrency = (price: number) =>
    new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0 }).format(price);

  const handleAddToCart = (product: Product) => {
    if (!product.inStock) {
      toast.error('Out of Stock', { description: `${product.name} is currently out of stock` });
      return;
    }
    if (isInCart(product.id)) {
      const currentQuantity = getCartItemQuantity(product.id);
      toast.info('Already in Cart', {
        description: `${product.name} is already in cart (${currentQuantity})`,
        action: { label: 'View Cart', onClick: () => window.location.href = '/cart' }
      });
      return;
    }
    addToCart(product);
  };

  const toggleWishlist = (product: Product) => {
    isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowDetails(true);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-2xl mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-2">Error loading products</div>
        <p className="text-sm text-muted-foreground mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground text-lg">No products found matching your criteria.</div>
        <p className="text-sm text-muted-foreground mt-2">Try adjusting your search terms or filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-medical-heading">{products.length} Products Found</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden rounded-2xl hover:-translate-y-2">
            <div className="relative">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.isNew && (
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-2 py-1 rounded-full shadow-lg">NEW</Badge>
                )}
                {product.discount > 0 && (
                  <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs px-2 py-1 rounded-full shadow-lg">
                    -{product.discount}%
                  </Badge>
                )}
              </div>
              <div className="absolute top-2 right-2 flex flex-col gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white shadow-md"
                  onClick={() => toggleWishlist(product)}
                >
                  <Heart className={`h-3 w-3 ${isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white shadow-md"
                  onClick={() => handleViewDetails(product)}
                >
                  <Eye className="h-3 w-3 text-gray-600" />
                </Button>
              </div>
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                  <Badge variant="destructive" className="rounded-full">Out of Stock</Badge>
                </div>
              )}
              <div className="md:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <div className="text-white font-bold text-sm">
                  {formatCurrency(product.price)}
                  {product.discount > 0 && (
                    <span className="text-xs text-gray-300 line-through ml-2">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="space-y-2 sm:space-y-3">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">{product.brand}</p>
                  <h3 className="font-semibold text-sm sm:text-base text-medical-heading group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                </div>
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
                  <span className="text-xs sm:text-sm text-muted-foreground">{product.rating}</span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">{formatCurrency(product.price)}</span>
                  {product.discount > 0 && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="hidden sm:flex items-center gap-2 md:gap-4 text-xs text-muted-foreground">
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
                <Button
                  className="w-full text-xs sm:text-sm py-2 sm:py-2.5 rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg"
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
      <ProductDetails
        product={selectedProduct}
        open={showDetails}
        onOpenChange={setShowDetails}
      />
    </div>
  );
};

export default ProductList;