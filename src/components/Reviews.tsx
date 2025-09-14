import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { LuStar, LuUser, LuCalendar, LuMessageSquare } from 'react-icons/lu';
import { useToast } from '@/hooks/use-toast';

const Reviews = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rating: 5,
        title: '',
        comment: ''
    });
    const { toast } = useToast();

    // Sample reviews data
    const reviews = [
        {
            id: 1,
            name: "Dr. Sarah Mwangi",
            date: "January 2025",
            rating: 5,
            title: "Excellent Medical Equipment",
            comment: "Outstanding quality medical supplies. Fast delivery and excellent customer service. Our clinic has been ordering from MEDHELM for over a year and we're very satisfied.",
            verified: true
        },
        {
            id: 2,
            name: "James Kimani",
            date: "December 2024",
            rating: 5,
            title: "Reliable Healthcare Partner",
            comment: "MEDHELM has been our trusted supplier for the past 2 years. Their products are genuine and delivery is always on time. Highly recommended for healthcare facilities.",
            verified: true
        },
        {
            id: 3,
            name: "Grace Achieng",
            date: "December 2024",
            rating: 4,
            title: "Good Service",
            comment: "Great customer support and quality products. The only suggestion would be to expand the product range for specialized equipment.",
            verified: false
        },
        {
            id: 4,
            name: "Dr. Michael Ochieng",
            date: "November 2024",
            rating: 5,
            title: "Professional Service",
            comment: "Professional handling of orders and excellent quality control. The team is knowledgeable about medical equipment specifications.",
            verified: true
        }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Here you would typically send the review to your backend
        toast({
            title: "Review Submitted!",
            description: "Thank you for your feedback. Your review will be published after verification.",
        });

        setFormData({
            name: '',
            email: '',
            rating: 5,
            title: '',
            comment: ''
        });
        setShowForm(false);
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <LuStar
                key={i}
                className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
            />
        ));
    };

    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    const totalReviews = reviews.length;

    return (
        <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-medical-heading">
                        Client Reviews
                    </h2>
                    <p className="text-medical-body text-lg max-w-2xl mx-auto mb-6">
                        See what healthcare professionals say about our medical supplies and services
                    </p>

                    {/* Rating Summary */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="text-center">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-3xl font-bold text-primary">{averageRating.toFixed(1)}</span>
                                <div className="flex">
                                    {renderStars(Math.round(averageRating))}
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Based on {totalReviews} reviews
                            </p>
                        </div>
                    </div>

                    <Button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-secondary hover:bg-secondary-light text-secondary-foreground"
                    >
                        <LuMessageSquare className="mr-2 h-4 w-4" />
                        Write a Review
                    </Button>
                </div>

                {/* Review Form */}
                {showForm && (
                    <Card className="max-w-2xl mx-auto mb-12">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <LuMessageSquare className="h-5 w-5 text-primary" />
                                Share Your Experience
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Name *</label>
                                        <Input
                                            value={formData.name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            required
                                            placeholder="Enter Your Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Email *</label>
                                        <Input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                            required
                                            placeholder="Your Email Address"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Rating *</label>
                                    <div className="flex gap-1">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, rating: i + 1 }))}
                                                className="p-1"
                                            >
                                                <LuStar
                                                    className={`h-6 w-6 ${i < formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Review Title *</label>
                                    <Input
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                        required
                                        placeholder="Brief title for your review"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Your Review *</label>
                                    <Textarea
                                        value={formData.comment}
                                        onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                                        required
                                        placeholder="Share your experience with our products and services..."
                                        rows={4}
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <Button type="submit" className="bg-primary hover:bg-primary-light">
                                        Submit Review
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowForm(false)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reviews.map((review) => (
                        <Card key={review.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 p-2 rounded-full">
                                            <LuUser className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold text-foreground">{review.name}</h4>
                                                {review.verified && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        Verified
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <LuCalendar className="h-3 w-3" />
                                                {review.date}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        {renderStars(review.rating)}
                                    </div>
                                </div>

                                <h5 className="font-medium text-foreground mb-2">{review.title}</h5>
                                <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* View More Reviews */}
                <div className="text-center mt-8">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
                        <Link to="/reviews">View All Reviews</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Reviews;