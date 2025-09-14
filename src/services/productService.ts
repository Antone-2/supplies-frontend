import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  subcategory?: string;
  images: Array<{ url: string; alt: string }>;
  stock: number;
  sku: string;
  brand?: string;
  rating: {
    average: number;
    count: number;
  };
  isActive: boolean;
  discount?: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ProductsResponse {
  success: boolean;
  data: {
    products: Product[];
    pagination: PaginationInfo;
  };
}

export interface CategoryInfo {
  name: string;
  count: number;
  minPrice: number;
  maxPrice: number;
}

export interface FilterOptions {
  category?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
  brands?: string[];
  features?: string[];
}

class ProductService {
  // Get products by category or all products
  async getProductsByCategory(options: FilterOptions): Promise<ProductsResponse> {
    const params = new URLSearchParams();
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => params.append(key, v.toString()));
        } else {
          params.append(key, value.toString());
        }
      }
    });
    // If a specific category is selected (not 'all'), use /products/category/:category
    if (options.category && options.category !== 'all') {
      const response = await axios.get(`${API_BASE_URL}/products/category/${encodeURIComponent(options.category)}?${params}`);
      return { success: true, data: { products: response.data.data.products, pagination: response.data.data.pagination } };
    } else {
      // Otherwise, get all products with filters
      const response = await axios.get(`${API_BASE_URL}/products?${params}`);
      return { success: true, data: { products: response.data.data.products, pagination: response.data.data.pagination } };
    }
  }

  // Get all categories with product counts
  async getCategoriesWithCounts(): Promise<{ success: boolean; data: CategoryInfo[] }> {
    const response = await axios.get(`${API_BASE_URL}/products/categories/counts`);
    return { success: true, data: response.data.data };
  }

  // Get filtered products
  async getFilteredProducts(options: FilterOptions): Promise<ProductsResponse> {
    const params = new URLSearchParams();

    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => params.append(key, v.toString()));
        } else {
          params.append(key, value.toString());
        }
      }
    });

    const response = await axios.get(`${API_BASE_URL}/products?${params}`);
    return { success: true, data: { products: response.data.data.products, pagination: response.data.data.pagination } };
  }

  // Get single product by ID
  async getProductById(id: string): Promise<Product> {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  }
}

export default new ProductService();
