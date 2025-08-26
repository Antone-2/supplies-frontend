
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ReviewsPage = () => {
    // You can fetch and display all reviews here
    return (
        <div className="min-h-screen">
            <Header />
            <main className="container mx-auto px-4 py-12">
                <Card>
                    <CardHeader>
                        <CardTitle>All Customer Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* TODO: Render all reviews here, or import and use your Reviews component */}
                        <p>All reviews will be displayed here.</p>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
};

export default ReviewsPage;
