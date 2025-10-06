import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { reviewService, CreateReviewData } from '@/services/reviewService';
import { useAuth } from '@/context/AuthContext';

interface WriteReviewProps {
  productId: string;
  productName: string;
  onReviewSubmitted?: () => void;
  onClose?: () => void;
}

const WriteReview: React.FC<WriteReviewProps> = ({
  productId,
  productName,
  onReviewSubmitted,
  onClose
}) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to write a review');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (comment.trim().length < 10) {
      toast.error('Please write at least 10 characters in your review');
      return;
    }

    setLoading(true);

    try {
      const reviewData: CreateReviewData = {
        productId,
        rating,
        comment: comment.trim()
      };

      await reviewService.createReview(reviewData);

      toast.success('Review submitted successfully!', {
        description: 'Thank you for your feedback. Your review helps other customers.'
      });

      // Reset form
      setRating(0);
      setComment('');

      // Call callbacks
      onReviewSubmitted?.();
      onClose?.();

    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review', {
        description: error instanceof Error ? error.message : 'Please try again later'
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="p-1 transition-colors"
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => setRating(star)}
          >
            <Star
              size={24}
              className={`transition-colors ${star <= (hoveredRating || rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300 hover:text-yellow-400'
                }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-muted-foreground">
          {rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : 'Select rating'}
        </span>
      </div>
    );
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground mb-4">
            Please login to write a review for this product.
          </p>
          <Button onClick={() => window.location.href = '/auth'}>
            Login to Review
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Write a Review for {productName}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Share your experience with this product to help other customers
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating Selection */}
          <div>
            <Label className="text-sm font-medium mb-2 block">
              Rating *
            </Label>
            {renderStars()}
          </div>

          {/* Comment */}
          <div>
            <Label htmlFor="comment" className="text-sm font-medium mb-2 block">
              Your Review *
            </Label>
            <Textarea
              id="comment"
              placeholder="Tell others about your experience with this product..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="resize-none"
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Minimum 10 characters ({comment.length}/10)
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={loading || rating === 0 || comment.trim().length < 10}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Review
                </>
              )}
            </Button>
            {onClose && (
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default WriteReview;