// Admin Dashboard Types
export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  salesGrowth: number;
  ordersGrowth: number;
  customersGrowth: number;
  productsGrowth: number;
  pendingOrders: number;
  lowStockProducts: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: string;
  updatedAt: string;
  deliveryDate?: string;
  trackingNumber?: string;
}

export interface OrderItem {
  id: string;
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
}

export type OrderStatus = 
  | 'pending' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled' 
  | 'refunded';

export type PaymentStatus = 
  | 'pending' 
  | 'paid' 
  | 'failed' 
  | 'refunded' 
  | 'partially_refunded';

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  status: 'active' | 'inactive' | 'suspended';
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  createdAt: string;
  addresses: Address[];
  preferences: CustomerPreferences;
}

export interface Address {
  id?: string;
  type: 'billing' | 'shipping';
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface CustomerPreferences {
  emailMarketing: boolean;
  smsMarketing: boolean;
  newsletter: boolean;
  language: string;
  currency: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  parentId?: string;
  isActive: boolean;
  productCount: number;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: number;
  customerId: string;
  customerName: string;
  rating: number;
  title: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  isVerifiedPurchase: boolean;
  helpful: number;
  createdAt: string;
  updatedAt: string;
  response?: ReviewResponse;
}

export interface ReviewResponse {
  id: string;
  content: string;
  respondedBy: string;
  respondedAt: string;
}

export interface Payment {
  id: string;
  orderId: string;
  customerId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId: string;
  gatewayResponse?: any;
  createdAt: string;
  processedAt?: string;
  refundedAt?: string;
  refundAmount?: number;
}

export type PaymentMethod = 
  | 'credit_card' 
  | 'mpesa' 
  | 'bank_transfer' 
  | 'cash_on_delivery';

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  provider: string;
  estimatedDays: number;
  cost: number;
  isActive: boolean;
  zones: ShippingZone[];
}

export interface ShippingZone {
  id: string;
  name: string;
  countries: string[];
  regions?: string[];
  baseCost: number;
  perKgCost: number;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  status: 'unread' | 'read';
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  createdAt: string;
  readAt?: string;
}

export type NotificationType = 
  | 'order' 
  | 'payment' 
  | 'inventory' 
  | 'customer' 
  | 'system' 
  | 'marketing';

export interface ContentPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaDescription?: string;
  metaKeywords?: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  author: string;
}

export interface ShopSettings {
  id: string;
  name: string;
  description: string;
  logo?: string;
  favicon?: string;
  primaryColor: string;
  secondaryColor: string;
  currency: string;
  timezone: string;
  address: Address;
  contactEmail: string;
  contactPhone: string;
  socialMedia: SocialMediaLinks;
  seoSettings: SEOSettings;
  emailSettings: EmailSettings;
}

export interface SocialMediaLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage?: string;
}

export interface EmailSettings {
  fromName: string;
  fromEmail: string;
  replyToEmail: string;
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Types
export interface ProductForm {
  name: string;
  brand: string;
  description: string;
  price: number;
  originalPrice: number;
  categoryId: string;
  images: File[];
  features: string[];
  inStock: boolean;
  isNew: boolean;
  discount: number;
}

export interface OrderUpdateForm {
  status: OrderStatus;
  trackingNumber?: string;
  notes?: string;
}

export interface CustomerForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  status: 'active' | 'inactive' | 'suspended';
}

// Filter and Search Types
export interface ProductFilters {
  category?: string;
  brand?: string;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  isNew?: boolean;
  search?: string;
}

export interface OrderFilters {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface CustomerFilters {
  status?: 'active' | 'inactive' | 'suspended';
  totalSpentMin?: number;
  totalSpentMax?: number;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}