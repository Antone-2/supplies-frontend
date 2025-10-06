// General Review service for API calls
const API_BASE_URL = import.meta.env.VITE_API_URL;

export interface GeneralReview {
  _id: string;
  name: string;
  email: string;
  rating: number;
  title: string;
  comment: string;
  user?: string;
  isVerified: boolean;
  isApproved: boolean;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGeneralReviewData {
  name: string;
  email: string;
  rating: number;
  title: string;
  comment: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
}

export interface GeneralReviewsResponse {
  reviews: GeneralReview[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalReviews: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  stats: ReviewStats;
}

class GeneralReviewService {
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
      console.error('General Review API request failed:', error);
      throw error;
    }
  }

  // Create a new general review
  async createGeneralReview(reviewData: CreateGeneralReviewData): Promise<{ message: string; review: GeneralReview }> {
    return this.makeRequest<{ message: string; review: GeneralReview }>('/general-reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  // Get all general reviews - supports both parameter styles
  async getGeneralReviews(pageOrQuery?: number | string, limit = 20, featured = false): Promise<GeneralReviewsResponse> {
    let queryString = '';

    if (typeof pageOrQuery === 'string') {
      // If a query string is passed directly
      queryString = pageOrQuery;
    } else {
      // If individual parameters are passed
      const page = pageOrQuery || 1;
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(featured && { featured: 'true' })
      });
      queryString = params.toString();
    }

    return this.makeRequest<GeneralReviewsResponse>(`/general-reviews?${queryString}`);
  }

  // Get user's own general review (requires authentication)
  async getUserGeneralReview(): Promise<GeneralReview | null> {
    try {
      const response = await this.makeRequest<{ review: GeneralReview }>('/general-reviews/my-review');
      return response.review;
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return null; // No review found
      }
      throw error;
    }
  }

  // Update user's general review (requires authentication)
  async updateGeneralReview(reviewData: Partial<CreateGeneralReviewData>): Promise<{ message: string; review: GeneralReview }> {
    return this.makeRequest<{ message: string; review: GeneralReview }>('/general-reviews/my-review', {
      method: 'PUT',
      body: JSON.stringify(reviewData),
    });
  }

  // Delete user's general review (requires authentication)
  async deleteGeneralReview(): Promise<{ message: string }> {
    return this.makeRequest<{ message: string }>('/general-reviews/my-review', {
      method: 'DELETE',
    });
  }

  // Check if user has already submitted a general review
  async hasUserSubmittedReview(): Promise<boolean> {
    try {
      const review = await this.getUserGeneralReview();
      return !!review;
    } catch (error) {
      console.error('Error checking user review status:', error);
      return false;
    }
  }
}

export const generalReviewService = new GeneralReviewService();