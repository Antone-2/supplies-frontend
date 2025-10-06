import { useState, useEffect, useCallback, useMemo } from 'react';
import { productService, Product, ProductFilters } from '@/services/productService';
import { debounce } from '@/lib/performance';

interface UseProductsOptions extends ProductFilters {
  debounceMs?: number;
  autoFetch?: boolean;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  totalCount: number;
}

export const useProducts = (options: UseProductsOptions = {}): UseProductsReturn => {
  const {
    debounceMs = 300,
    autoFetch = true,
    page = 1,
    limit = 100, // Default to 100 to show all products including featured ones
    ...filters
  } = options;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(page);
  const [totalCount, setTotalCount] = useState(0);

  // Memoize filters to prevent unnecessary re-renders
  const memoizedFilters = useMemo(() => filters, [JSON.stringify(filters)]);

  const fetchProducts = useCallback(async (resetPage = false) => {
    try {
      setLoading(true);
      setError(null);

      const pageToFetch = resetPage ? 1 : currentPage;
      const response = await productService.getProducts({
        ...memoizedFilters,
        page: pageToFetch,
        limit
      });

      const transformedProducts = response.products.map(p =>
        productService.transformProduct(p)
      );

      if (resetPage) {
        setProducts(transformedProducts);
        setCurrentPage(1);
      } else {
        setProducts(prev => [...prev, ...transformedProducts]);
      }

      setTotalCount(response.pagination?.totalProducts || response.products.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [memoizedFilters, currentPage, limit]);

  // Debounced fetch function for search
  const debouncedFetch = useMemo(
    () => debounce(() => fetchProducts(true), debounceMs),
    [fetchProducts, debounceMs]
  );

  const refetch = useCallback(() => fetchProducts(true), [fetchProducts]);

  const loadMore = useCallback(async () => {
    if (!loading) {
      setCurrentPage(prev => prev + 1);
      await fetchProducts(false);
    }
  }, [fetchProducts, loading]);

  const hasMore = useMemo(() => {
    return products.length < totalCount;
  }, [products.length, totalCount]);

  // Auto-fetch when filters change
  useEffect(() => {
    if (autoFetch) {
      debouncedFetch();
    }
  }, [debouncedFetch, autoFetch]);

  return {
    products,
    loading,
    error,
    refetch,
    hasMore,
    loadMore,
    totalCount
  };
};

// Hook for featured products with caching
export const useFeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await productService.getFeaturedProducts();
      const transformedProducts = response.map(p => productService.transformProduct(p));
      setProducts(transformedProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load featured products');
      console.error('Error fetching featured products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchFeaturedProducts
  };
};

// Hook for single product with caching
export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const response = await productService.getProductById(id);
      const transformedProduct = productService.transformProduct(response);
      setProduct(transformedProduct);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load product');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct
  };
};