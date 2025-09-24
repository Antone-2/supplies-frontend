import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

import { toast } from 'sonner';
import ProductService, { Product } from '@/services/productService';
import { useCart } from '@/context/cartContext';
import { LuShoppingCart, LuEye } from 'react-icons/lu';

const formatPrice = (price: number, currency: string) => {
  try {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(price);
  } catch {
    return `KES ${price.toLocaleString()}`;
  }
};

export default function CategoryPage() {
  const params = useParams();
  const selected = decodeURIComponent(params.categoryName || '').trim();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);

  // const { addToCart, loading: cartLoading } = useCart();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    ProductService.getProductsByCategory({
      category: selected || 'all',
      page: 1,
      limit: 50,
      inStock: true,
      sortBy: 'name',
      sortOrder: 'asc'
    })
      .then((response) => {
        if (cancelled) return;
        setProducts(response.data.products);
        setTotalProducts(response.data.pagination.totalProducts);
      })
      .catch((e: any) => {
        if (cancelled) return;
        setError(e?.message || 'Failed to load products');
      })
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [selected]);

  const formatCategoryName = (name: string) => {
    return name
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6 space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-6 w-1/3" />
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-destructive/10 border border-destructive rounded-lg p-8 text-center">
            <p className="text-lg font-medium text-destructive mb-4">{error}</p>
            <Button asChild>
              <a href="/#categories">Browse other categories</a>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {formatCategoryName(selected || 'All Products')}
            </h1>
            <p className="text-gray-600">
              {totalProducts} {totalProducts === 1 ? 'product' : 'products'} available
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/#categories">Back to Categories</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">Home</Link>
            </Button>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="bg-muted/40 border border-border rounded-lg p-8 text-center">
            <p className="text-lg font-medium mb-2">No products found</p>
            <p className="text-medical-body mb-4">
              The category "{formatCategoryName(selected)}" is currently empty.
            </p>
            <Button asChild>
              <Link to="/#categories">Browse other categories</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Enhanced Product Card Component
const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, loading: cartLoading } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart(product._id);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden">
      <div className="relative">
        <img
          src={product.images?.[0]?.url || '/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Stock indicator */}
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive">Out of Stock</Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">{product.brand || 'Medical Supplies'}</p>
            <h3 className="font-semibold text-medical-heading">{product.name}</h3>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-primary">
              {formatPrice(product.price, product.currency || 'KES')}
            </div>
            {product.rating && (
              <div className="text-sm text-muted-foreground">
                {product.rating && typeof product.rating.average === 'number' ? product.rating.average.toFixed(1) : 'N/A'} ★
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              className="flex-1"
              disabled={product.stock <= 0 || isAdding || cartLoading}
              onClick={handleAddToCart}
            >
              <LuShoppingCart className="mr-2 h-4 w-4" />
              {isAdding ? 'Adding...' : 'Add to Cart'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = `/product/${product._id}`}
            >
              <LuEye className="mr-2 h-4 w-4" />
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
