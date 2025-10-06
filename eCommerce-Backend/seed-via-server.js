// Alternative seeder that uses the server's existing connection
const axios = require('axios');

const sampleProducts = [
    {
        name: "Digital Thermometer",
        description: "Accurate digital thermometer for medical use",
        price: 29.99,
        countInStock: 50,
        category: "Medical Devices",
        isFeatured: true,
        rating: 4.5,
        numReviews: 12,
        image: "https://images.unsplash.com/photo-1584362917165-526a968579a8?w=400",
        images: ["https://images.unsplash.com/photo-1584362917165-526a968579a8?w=400"]
    },
    {
        name: "Medical Face Masks (Pack of 50)",
        description: "High-quality disposable medical face masks",
        price: 15.99,
        countInStock: 100,
        category: "PPE",
        isFeatured: true,
        rating: 4.7,
        numReviews: 35,
        image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400",
        images: ["https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400"]
    },
    {
        name: "Blood Pressure Monitor",
        description: "Digital blood pressure monitor with large display",
        price: 89.99,
        countInStock: 25,
        category: "Medical Devices",
        isFeatured: true,
        rating: 4.6,
        numReviews: 28,
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
        images: ["https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400"]
    },
    {
        name: "Hand Sanitizer (500ml)",
        description: "Antibacterial hand sanitizer, 70% alcohol",
        price: 12.99,
        countInStock: 80,
        category: "Hygiene",
        isFeatured: false,
        rating: 4.3,
        numReviews: 45,
        image: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400",
        images: ["https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400"]
    },
    {
        name: "First Aid Kit",
        description: "Comprehensive first aid kit for home and office",
        price: 39.99,
        countInStock: 30,
        category: "Medical Supplies",
        isFeatured: false,
        rating: 4.8,
        numReviews: 20,
        image: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400",
        images: ["https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400"]
    },
    {
        name: "Disposable Gloves (Box of 100)",
        description: "Nitrile disposable gloves, powder-free",
        price: 19.99,
        countInStock: 60,
        category: "PPE",
        isFeatured: false,
        rating: 4.4,
        numReviews: 18,
        image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400",
        images: ["https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400"]
    }
];

async function seedViaAPI() {
    try {
        console.log('Checking if server is running...');

        // First check if server is running
        const healthResponse = await axios.get('http://localhost:5000/api/v1/health');
        console.log('Server is running:', healthResponse.data);

        // Check current product count
        let productsResponse;
        try {
            productsResponse = await axios.get('http://localhost:5000/api/v1/products');
            console.log(`Current products in database: ${productsResponse.data.products?.length || 0}`);
        } catch (error) {
            console.log('Could not fetch existing products, continuing with seeding...');
        }

        // If no products exist, seed them
        if (!productsResponse || !productsResponse.data.products || productsResponse.data.products.length === 0) {
            console.log('No products found, seeding sample products...');

            // We'll need to create products via admin endpoint or direct database
            // For now, let's just show the products that need to be added
            console.log('Sample products to add:');
            sampleProducts.forEach((product, index) => {
                console.log(`${index + 1}. ${product.name} - $${product.price}`);
            });

            console.log('\nTo add these products, you can either:');
            console.log('1. Use the admin panel in your application');
            console.log('2. Or we need to create an admin API endpoint for bulk product creation');

        } else {
            console.log('Products already exist in database');
        }

    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.error('Server is not running. Please start your server first with: npm start');
        } else {
            console.error('Error:', error.message);
        }
    }
}

// Run the seeder
if (require.main === module) {
    seedViaAPI();
}

module.exports = { seedViaAPI, sampleProducts };