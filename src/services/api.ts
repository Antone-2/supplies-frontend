import {
  DashboardStats,
  Order,
  Customer,
  Category,
  Review,
  Payment,
  ShippingMethod,
  Notification,
  ContentPage,
  ShopSettings,
  ProductFilters,
  OrderFilters,
  CustomerFilters,
  ApiResponse,
  PaginatedResponse,
  ProductForm,
  OrderUpdateForm,
  CustomerForm
} from '@/types/admin';
import { Product } from '@/data/products';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL;

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        // Add authentication headers here
        'Authorization': `Bearer ${this.getAuthToken()}`,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  private getAuthToken(): string {
    // Get auth token from localStorage, sessionStorage, or context
    return localStorage.getItem('adminToken') || '';
  }

  // Dashboard APIs
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await this.request<DashboardStats>('/admin/dashboard/stats');
    return response.data;
  }

  // Products APIs
  async getProducts(filters?: ProductFilters, page = 1, limit = 10): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    // Add filters if they exist and are not empty
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
    }

    const response = await this.request<PaginatedResponse<Product>>(`/admin/products?${params}`);
    return response.data;
  }

  async getProduct(id: number): Promise<Product> {
    const response = await this.request<Product>(`/admin/products/${id}`);
    return response.data;
  }

  async createProduct(product: ProductForm): Promise<Product> {
    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      if (key === 'images') {
        (value as File[]).forEach(file => formData.append('images', file));
      } else if (key === 'features') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value.toString());
      }
    });

    const response = await this.request<Product>('/admin/products', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
    return response.data;
  }

  async updateProduct(id: number, product: Partial<ProductForm>): Promise<Product> {
    const response = await this.request<Product>(`/admin/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
    return response.data;
  }

  async deleteProduct(id: number): Promise<void> {
    await this.request(`/admin/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Orders APIs
  async getOrders(filters?: OrderFilters, page = 1, limit = 10): Promise<PaginatedResponse<Order>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    // Add filters if they exist and are not empty
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
    }

    const response = await this.request<PaginatedResponse<Order>>(`/admin/orders?${params}`);
    return response.data;
  }

  async getOrder(id: string): Promise<Order> {
    const response = await this.request<Order>(`/admin/orders/${id}`);
    return response.data;
  }

  async updateOrder(id: string, update: OrderUpdateForm): Promise<Order> {
    const response = await this.request<Order>(`/admin/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(update),
    });
    return response.data;
  }

  // Customers APIs
  async getCustomers(filters?: CustomerFilters, page = 1, limit = 10): Promise<PaginatedResponse<Customer>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    // Add filters if they exist and are not empty
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
    }

    const response = await this.request<PaginatedResponse<Customer>>(`/admin/customers?${params}`);
    return response.data;
  }

  async getCustomer(id: string): Promise<Customer> {
    const response = await this.request<Customer>(`/admin/customers/${id}`);
    return response.data;
  }

  async createCustomer(customer: CustomerForm): Promise<Customer> {
    const response = await this.request<Customer>('/admin/customers', {
      method: 'POST',
      body: JSON.stringify(customer),
    });
    return response.data;
  }

  async updateCustomer(id: string, customer: Partial<CustomerForm>): Promise<Customer> {
    const response = await this.request<Customer>(`/admin/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(customer),
    });
    return response.data;
  }

  async deleteCustomer(id: string): Promise<void> {
    await this.request(`/admin/customers/${id}`, {
      method: 'DELETE',
    });
  }

  // Categories APIs
  async getCategories(): Promise<Category[]> {
    const response = await this.request<Category[]>('/admin/categories');
    return response.data;
  }

  async createCategory(category: Partial<Category>): Promise<Category> {
    const response = await this.request<Category>('/admin/categories', {
      method: 'POST',
      body: JSON.stringify(category),
    });
    return response.data;
  }

  async updateCategory(id: string, category: Partial<Category>): Promise<Category> {
    const response = await this.request<Category>(`/admin/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(category),
    });
    return response.data;
  }

  async deleteCategory(id: string): Promise<void> {
    await this.request(`/admin/categories/${id}`, {
      method: 'DELETE',
    });
  }

  // Reviews APIs
  async getReviews(page = 1, limit = 10): Promise<PaginatedResponse<Review>> {
    const response = await this.request<PaginatedResponse<Review>>(`/admin/reviews?page=${page}&limit=${limit}`);
    return response.data;
  }

  async updateReviewStatus(id: string, status: 'approved' | 'rejected'): Promise<Review> {
    const response = await this.request<Review>(`/admin/reviews/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    return response.data;
  }

  async respondToReview(id: string, content: string): Promise<Review> {
    const response = await this.request<Review>(`/admin/reviews/${id}/respond`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
    return response.data;
  }

  // Payments APIs
  async getPayments(page = 1, limit = 10): Promise<PaginatedResponse<Payment>> {
    const response = await this.request<PaginatedResponse<Payment>>(`/admin/payments?page=${page}&limit=${limit}`);
    return response.data;
  }

  async refundPayment(id: string, amount: number): Promise<Payment> {
    const response = await this.request<Payment>(`/admin/payments/${id}/refund`, {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
    return response.data;
  }

  // Shipping APIs
  async getShippingMethods(): Promise<ShippingMethod[]> {
    const response = await this.request<ShippingMethod[]>('/admin/shipping/methods');
    return response.data;
  }

  async updateShippingMethod(id: string, method: Partial<ShippingMethod>): Promise<ShippingMethod> {
    const response = await this.request<ShippingMethod>(`/admin/shipping/methods/${id}`, {
      method: 'PUT',
      body: JSON.stringify(method),
    });
    return response.data;
  }

  // Notifications APIs
  async getNotifications(): Promise<Notification[]> {
    const response = await this.request<Notification[]>('/admin/notifications');
    return response.data;
  }

  async markNotificationAsRead(id: string): Promise<void> {
    await this.request(`/admin/notifications/${id}/read`, {
      method: 'PUT',
    });
  }

  // Content Management APIs
  async getContentPages(): Promise<ContentPage[]> {
    const response = await this.request<ContentPage[]>('/admin/content/pages');
    return response.data;
  }

  async createContentPage(page: Partial<ContentPage>): Promise<ContentPage> {
    const response = await this.request<ContentPage>('/admin/content/pages', {
      method: 'POST',
      body: JSON.stringify(page),
    });
    return response.data;
  }

  async updateContentPage(id: string, page: Partial<ContentPage>): Promise<ContentPage> {
    const response = await this.request<ContentPage>(`/admin/content/pages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(page),
    });
    return response.data;
  }

  // Settings APIs
  async getShopSettings(): Promise<ShopSettings> {
    const response = await this.request<ShopSettings>('/admin/settings');
    return response.data;
  }

  async updateShopSettings(settings: Partial<ShopSettings>): Promise<ShopSettings> {
    const response = await this.request<ShopSettings>('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
    return response.data;
  }

  // Authentication APIs
  async adminLogin(email: string, password: string): Promise<{ token: string; user: any }> {
    const response = await this.request<{ token: string; user: any }>('/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return response.data;
  }

  async adminLogout(): Promise<void> {
    await this.request('/admin/auth/logout', {
      method: 'POST',
    });
  }

  async refreshToken(): Promise<{ token: string }> {
    const response = await this.request<{ token: string }>('/admin/auth/refresh', {
      method: 'POST',
    });
    return response.data;
  }
}

export const apiService = new ApiService();