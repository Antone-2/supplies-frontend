export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  category: string;
  subcategory?: string;
  images: Array<{ url: string; alt: string }>;
  imageUrl?: string; // Add imageUrl for compatibility
  stock: number;
  sku: string;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  isActive: boolean;
  discount?: number;
  features?: string[];
  specifications?: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartProduct extends Product {
  quantity: number;
}

export interface WishlistProduct extends Product {
  addedAt: string;
}
