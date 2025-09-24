export interface ProductImage {
    url: string;
}

export interface Product {
    _id?: string;
    id?: string;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    image?: string;
    category?: string;
    rating?: number;
    images?: ProductImage[] | string[];
    isNew?: boolean;
    isOnSale?: boolean;
    isOutOfStock?: boolean;
    isLowStock?: boolean;
    stock?: number;
    reviewCount?: number;
    originalPrice?: number;
    discount?: number;
}
