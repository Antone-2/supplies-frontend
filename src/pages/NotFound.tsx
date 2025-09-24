import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center px-4">
            <Card className="max-w-md w-full text-center">
                <CardContent className="p-8">
                    <div className="mb-8">
                        <div className="text-8xl font-bold text-primary mb-4">404</div>
                        <h1 className="text-2xl font-semibold text-medical-heading mb-2">
                            Page Not Found
                        </h1>
                        <p className="text-medical-body">
                            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Button
                            onClick={() => navigate(-1)}
                            variant="outline"
                            className="w-full"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </Button>

                        <Link to="/" className="block">
                            <Button className="w-full bg-primary hover:bg-primary-light">
                                <Home className="mr-2 h-4 w-4" />
                                Back to Homepage
                            </Button>
                        </Link>

                        <Link to="/#categories" className="block">
                            <Button variant="outline" className="w-full">
                                <Search className="mr-2 h-4 w-4" />
                                Browse Categories
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-8 text-sm text-muted-foreground">
                        <p>Need help finding medical supplies?</p>
                        <p>Contact us at <a href="tel:+254746020323" className="text-primary hover:underline">+254 746 020 323</a></p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default NotFound;