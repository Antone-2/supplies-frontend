import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, MessageSquare, ThumbsUp, Flag } from 'lucide-react';
import { reviewService, Review } from '@/services/reviewService';

// Simple date formatting function (alternative to date-fns)
const formatDistanceToNow = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    return diffInMinutes <= 1 ? '1 minute ago' : `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
  } else if (diffInDays < 30) {
    return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
  } else {
    return date.toLocaleDateString();
  }
};

interface ProductReviewsProps {
  productId: string;
  showWriteReview?: boolean;
  onWriteReviewClick?: () => void;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  showWriteReview = true,
  onWriteReviewClick
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      const fetchedReviews = await reviewService.getProductReviews(productId);
      setReviews(fetchedReviews);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError(err instanceof Error ? err.message : 'Failed to load reviews');
      // Fallback to empty array on error
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }
          />
        ))}
      </div>
    );
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex space-x-3">
                  <div className="rounded-full bg-gray-200 h-8 w-8"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-red-600 mb-4">Error loading reviews: {error}</p>
          <Button onClick={fetchReviews} variant="outline" size="sm">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const averageRating = getAverageRating();
  const distribution = getRatingDistribution();

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Customer Reviews</h3>
              <div className="flex items-center gap-2 mt-1">
                {renderStars(Math.round(averageRating))}
                <span className="text-sm font-medium">{averageRating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">
                  ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                </span>
              </div>
            </div>
            {showWriteReview && (
              <Button onClick={onWriteReviewClick} size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Write Review
              </Button>
            )}
          </div>
        </CardHeader>

        {reviews.length > 0 && (
          <CardContent>
            {/* Rating Distribution */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-1 text-sm">
                  <span>{stars}</span>
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{
                        width: `${reviews.length > 0 ? (distribution[stars as keyof typeof distribution] / reviews.length) * 100 : 0}%`
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {distribution[stars as keyof typeof distribution]}
                  </span>
                </div>
              ))}
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review._id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">
                        {review.user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{review.user.name}</span>
                        {renderStars(review.rating)}
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(review.createdAt))}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {review.comment}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-gray-700 transition-colors">
                          <ThumbsUp size={12} />
                          Helpful
                        </button>
                        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-gray-700 transition-colors">
                          <Flag size={12} />
                          Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {reviews.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-muted-foreground mb-4">
              No reviews yet. Be the first to review this product!
            </p>
            {showWriteReview && (
              <Button onClick={onWriteReviewClick}>
                Write First Review
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductReviews;