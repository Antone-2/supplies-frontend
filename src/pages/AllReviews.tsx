import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Star,
  User,
  Calendar,
  ArrowLeft,
  Search,
  Filter,
  MessageSquare
} from 'lucide-react';
import { generalReviewService, type GeneralReview } from '@/services/generalReviewService';
import { toast } from '@/hooks/use-toast';

const AllReviews: React.FC = () => {
  const [reviews, setReviews] = useState<GeneralReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const reviewsPerPage = 12;

  useEffect(() => {
    fetchReviews();
  }, [currentPage, selectedRating]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (selectedRating) {
        params.append('rating', selectedRating.toString());
      }

      params.append('page', currentPage.toString());
      params.append('limit', reviewsPerPage.toString());

      const response = await generalReviewService.getGeneralReviews(params.toString());
      setReviews(response.reviews);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Error Loading Reviews",
        description: "Failed to load reviews. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredReviews = reviews.filter(review =>
    review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-medical-heading">
                All Customer Reviews
              </h1>
              <p className="text-medical-body mt-2">
                {reviews.length} reviews • Average rating: {averageRating.toFixed(1)} ⭐
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search reviews by name, title, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Filter by rating:</span>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant={selectedRating === null ? "default" : "outline"}
                  onClick={() => setSelectedRating(null)}
                >
                  All
                </Button>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <Button
                    key={rating}
                    size="sm"
                    variant={selectedRating === rating ? "default" : "outline"}
                    onClick={() => setSelectedRating(rating)}
                  >
                    {rating}⭐
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        {filteredReviews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReviews.map((review) => (
                <Card key={review._id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">{review.name}</h4>
                            {review.isApproved && (
                              <Badge variant="secondary" className="text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {formatDate(review.createdAt)}
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                    </div>

                    <h5 className="font-medium text-foreground mb-2">{review.title}</h5>
                    <p className="text-muted-foreground leading-relaxed line-clamp-4">
                      {review.comment}
                    </p>

                    {review.isFeatured && (
                      <Badge variant="outline" className="mt-3 text-xs border-yellow-400 text-yellow-600">
                        Featured Review
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>

                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        size="sm"
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <MessageSquare className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Reviews Found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || selectedRating
                ? "Try adjusting your search or filter criteria."
                : "Be the first to share your experience!"
              }
            </p>
            <Link to="/#reviews">
              <Button className="bg-primary hover:bg-primary-light">
                Write a Review
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReviews;