// Review service for API calls
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Validate that API URL is configured
if (!API_BASE_URL) {
  console.error('❌ ERROR: VITE_API_URL is not configured in environment variables');
  throw new Error('Missing API configuration. Please set VITE_API_URL in your .env file.');
}

export interface Review {
  _id?: string;
  product: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewData {
  productId: string;
  rating: number;
  comment: string;
}

class ReviewService {
  private async makeRequest<T>(url: string, options?: RequestInit): Promise<T> {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Review API request failed:', error);
      throw error;
    }
  }

  // Create a new review
  async createReview(reviewData: CreateReviewData): Promise<{ message: string; review: Review }> {
    return this.makeRequest<{ message: string; review: Review }>('/users/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  // Get reviews for a specific product
  async getProductReviews(productId: string): Promise<Review[]> {
    const response = await this.makeRequest<{ reviews: Review[] }>(`/products/${productId}/reviews`);
    return response.reviews || [];
  }

  // Get user's reviews
  async getUserReviews(): Promise<Review[]> {
    const response = await this.makeRequest<{ reviews: Review[] }>('/users/reviews');
    return response.reviews || [];
  }

  // Update a review
  async updateReview(reviewId: string, reviewData: Partial<CreateReviewData>): Promise<Review> {
    return this.makeRequest<Review>(`/reviews/${reviewId}`, {
      method: 'PUT',
      body: JSON.stringify(reviewData),
    });
  }

  // Delete a review
  async deleteReview(reviewId: string): Promise<{ message: string }> {
    return this.makeRequest<{ message: string }>(`/reviews/${reviewId}`, {
      method: 'DELETE',
    });
  }

  // Check if user has already reviewed a product
  async hasUserReviewedProduct(productId: string): Promise<boolean> {
    try {
      const userReviews = await this.getUserReviews();
      return userReviews.some(review => review.product === productId);
    } catch (error) {
      console.error('Error checking user review status:', error);
      return false;
    }
  }
}

export const reviewService = new ReviewService();