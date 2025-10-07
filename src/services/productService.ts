// Product service for API calls
const API_BASE_URL = import.meta.env.VITE_API_URL;

export interface Product {
  _id?: string;
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice: number;
  image: string;
  images?: Array<{ url: string; alt?: string }> | string[];
  category: string | { _id: string; name: string };
  subcategory?: string;
  brand?: string;
  countInStock: number;
  inStock: boolean;
  rating: number;
  numReviews?: number;
  reviews: number;
  isFeatured?: boolean;
  featured?: boolean;
  isNew?: boolean;
  discount: number;
  sku?: string;
  tags?: string[];
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
  features?: string[];
}

export interface ProductsResponse {
  products: Product[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  inStock?: boolean;
  search?: string;
}

class ProductService {
  private cache = new Map<string, { data: any; expiry: number }>();

  private getCachedData(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && cached.expiry > Date.now()) {
      return cached.data;
    }
    if (cached) {
      this.cache.delete(key);
    }
    return null;
  }

  private setCachedData(key: string, data: any, ttlMs: number): void {
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttlMs
    });
  }

  // Clear all cached data (useful when products are updated)
  clearCache(): void {
    this.cache.clear();
  }

  // Clear specific cache entries
  clearCacheByPattern(pattern: string): void {
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }

  private async makeRequest<T>(url: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get all products with filters
  async getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
    const searchParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const url = `/products${queryString ? `?${queryString}` : ''}`;

    // Create cache key based on filters
    const cacheKey = `products_${queryString}`;

    // Check cache first
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      console.log('Using cached products');
      return cached;
    }

    const response = await this.makeRequest<ProductsResponse>(url);

    // Cache for 3 minutes
    this.setCachedData(cacheKey, response, 3 * 60 * 1000);

    return response;
  }

  // Get featured products
  async getFeaturedProducts(): Promise<Product[]> {
    const cacheKey = 'featured_products';

    // Check cache first
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      console.log('Using cached featured products');
      return cached;
    }

    try {
      const response = await this.makeRequest<{ products: Product[] }>('/products/featured/all');
      // The API returns { products: [...] }, so we need to extract the products array
      const products = response.products || [];

      // Cache for 5 minutes
      this.setCachedData(cacheKey, products, 5 * 60 * 1000);

      return products;
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
      // Fallback to regular products with featured filter
      const productsResponse = await this.getProducts({ limit: 8 });
      const fallbackProducts = productsResponse.products.filter(p => p.isFeatured || p.featured);

      // Cache fallback result for 2 minutes
      this.setCachedData(cacheKey, fallbackProducts, 2 * 60 * 1000);

      return fallbackProducts;
    }
  }

  // Get single product by ID
  async getProductById(id: string): Promise<Product> {
    return this.makeRequest<Product>(`/products/${id}`);
  }

  // Get products by category
  async getProductsByCategory(category: string, filters: ProductFilters = {}): Promise<ProductsResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append('category', category);

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    return this.makeRequest<ProductsResponse>(`/products?${queryString}`);
  }

  // Get categories
  async getCategories(): Promise<string[]> {
    try {
      const response = await this.makeRequest<{ categories: string[] }>('/products/categories');
      return response.categories || [];
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      return [];
    }
  }

  // Get categories with counts
  async getCategoriesWithCounts(): Promise<Array<{ _id: string; name: string; count: number }>> {
    return this.makeRequest<Array<{ _id: string; name: string; count: number }>>('/products/categories/counts');
  }

  // Admin methods - Create, Update, Delete
  async createProduct(product: Partial<Product>, token: string): Promise<Product> {
    return this.makeRequest<Product>('/products', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
  }

  async updateProduct(id: string, product: Partial<Product>, token: string): Promise<Product> {
    return this.makeRequest<Product>(`/products/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
  }

  async deleteProduct(id: string, token: string): Promise<void> {
    return this.makeRequest<void>(`/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // Search products
  async searchProducts(query: string, filters: ProductFilters = {}): Promise<ProductsResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append('search', query);

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    return this.makeRequest<ProductsResponse>(`/products?${queryString}`);
  }

  // Transform product for compatibility with existing UI
  transformProduct(apiProduct: any): Product {
    const discount = apiProduct.discount || 0;
    const basePrice = apiProduct.price || 0;

    return {
      ...apiProduct,
      id: apiProduct._id || apiProduct.id || '',
      image: apiProduct.image || (Array.isArray(apiProduct.images) ? apiProduct.images[0]?.url || apiProduct.images[0] : '') || '/placeholder-product.jpg',
      rating: apiProduct.rating || 0,
      reviews: apiProduct.numReviews || apiProduct.reviews || 0,
      numReviews: apiProduct.numReviews || apiProduct.reviews || 0,
      inStock: (apiProduct.countInStock || 0) > 0,
      originalPrice: discount > 0 ? basePrice / (1 - discount / 100) : basePrice,
      price: basePrice,
      discount: discount,
      isNew: apiProduct.isNew || false,
      category: typeof apiProduct.category === 'string' ? apiProduct.category : apiProduct.category?.name || '',
      brand: apiProduct.brand || '',
      description: apiProduct.description || '',
      features: apiProduct.features || [],
      countInStock: apiProduct.countInStock || 0,
    };
  }
}

// Create and export a singleton instance
export const productService = new ProductService();

// Export helper functions for backward compatibility
export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const products = await productService.getFeaturedProducts();
    return products.map(p => productService.transformProduct(p));
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
};

export const getProducts = async (filters?: ProductFilters): Promise<Product[]> => {
  try {
    const response = await productService.getProducts(filters);
    return response.products.map(p => productService.transformProduct(p));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const product = await productService.getProductById(id);
    return productService.transformProduct(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
};