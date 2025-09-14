
// ...existing code...
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LuStar, LuUser, LuCalendar } from 'react-icons/lu';

const ReviewsPage = () => {
    // Sample reviews data - same as in Reviews component
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
        },
        {
            id: 5,
            name: "Nurse Mary Wanjiku",
            date: "November 2024",
            rating: 5,
            title: "Trustworthy Medical Supplies",
            comment: "As a nurse, I appreciate the quality and reliability of MEDHELM's products. Their bandages and wound care supplies are always fresh and effective.",
            verified: true
        },
        {
            id: 6,
            name: "Dr. David Kiprop",
            date: "October 2024",
            rating: 4,
            title: "Consistent Quality",
            comment: "MEDHELM consistently delivers quality medical equipment. Their diagnostic tools are reliable and meet all necessary standards.",
            verified: true
        },
        {
            id: 7,
            name: "Hospital Administrator",
            date: "October 2024",
            rating: 5,
            title: "Excellent Partnership",
            comment: "We've been partnering with MEDHELM for our hospital supplies. Their service is exceptional and their products are always top-notch.",
            verified: false
        },
        {
            id: 8,
            name: "Dr. Elizabeth Njoroge",
            date: "September 2024",
            rating: 5,
            title: "Outstanding Support",
            comment: "The customer support team is incredibly helpful and knowledgeable. They helped us choose the right equipment for our clinic.",
            verified: true
        }
    ];

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
        <div className="min-h-screen">
            <main className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-medical-heading">
                        All Customer Reviews
                    </h1>
                    <p className="text-medical-body text-lg max-w-2xl mx-auto mb-6">
                        Read what healthcare professionals say about our medical supplies and services
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
                </div>

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
            </main>
            <Footer />
        </div>
    );
};

export default ReviewsPage;
