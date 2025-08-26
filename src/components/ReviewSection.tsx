import React, { useEffect, useState } from 'react';
import { useFetch } from '@/hooks/use-fetch';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Review {
    id: string;
    productId: string;
    userId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    isEditableByAdmin: boolean;
}

const ReviewSection = ({ productId }: { productId: string }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReview, setNewReview] = useState<string>('');
    const { data: fetchedReviews, loading: reviewsLoading } = useFetch<Review[]>(`/api/reviews/${productId}`);

    useEffect(() => {
        if (!reviewsLoading && fetchedReviews) {
            setReviews(fetchedReviews);
        }
    }, [fetchedReviews, reviewsLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newReview.trim()) {
            // Call API to submit the new review
            await fetch(`/api/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, content: newReview }),
            });
            setNewReview('');
            // Optionally, refetch reviews or update state
        }
    };

    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-4">User Reviews</h2>
                <form onSubmit={handleSubmit} className="mb-4">
                    <textarea
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        placeholder="Write your review here..."
                        className="w-full p-2 border rounded"
                        rows={4}
                    />
                    <Button type="submit" className="mt-2">Submit Review</Button>
                </form>
                <div className="grid grid-cols-1 gap-4">
                    {reviews.map((review) => (
                        <Card key={review.id}>
                            <CardContent>
                                <p>{review.content}</p>
                                <p className="text-gray-500 text-sm">Posted on: {new Date(review.createdAt).toLocaleDateString()}</p>
                                {review.isEditableByAdmin && <Button>Edit</Button>}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewSection;
