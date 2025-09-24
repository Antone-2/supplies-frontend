import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import ProductList from '@/components/ProductList';
import SEOHead from '@/components/SEOHead';
import { filterProductsByCategory, categories } from '@/data/products';

const CategoryProducts = () => {
    const { category } = useParams<{ category: string }>();
    const decodedCategory = category ? decodeURIComponent(category) : '';

    const categoryData = categories.find(cat => cat.name === decodedCategory);
    const categoryProducts = filterProductsByCategory(decodedCategory);

    if (!categoryData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-medical-heading mb-4 font-['Roboto']">Category Not Found</h1>
                    <p className="text-medical-body font-['Roboto']">The requested category does not exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <SEOHead
                title={`${categoryData.name} - MEDHELM Supplies Ltd`}
                description={`Shop ${categoryData.name.toLowerCase()} at MEDHELM Supplies. ${categoryData.description}. Quality medical equipment in Kenya.`}
                keywords={`${categoryData.name.toLowerCase()}, medical supplies Kenya, healthcare equipment, ${categoryData.description.toLowerCase()}`}
            />
            <Header />

            <main className="pt-20">
                <div className="bg-muted/30 py-12">
                    <div className="container mx-auto px-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-medical-heading mb-4 text-center font-['Roboto']">
                            {categoryData.name}
                        </h1>
                        <p className="text-lg text-medical-body max-w-2xl mx-auto text-center font-['Roboto']">
                            {categoryData.description}
                        </p>
                        <div className="text-center mt-4">
                            <span className="text-sm text-muted-foreground font-['Roboto']">
                                {categoryData.count} products available
                            </span>
                        </div>
                    </div>
                </div>

                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <ProductList products={categoryProducts} />
                    </div>
                </section>
            </main>

            <Footer />
            <MobileBottomNav />
            <div className="lg:hidden h-20"></div>
        </div>
    );
};

export default CategoryProducts;