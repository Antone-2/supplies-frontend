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

async function seedProductsViaAPI() {
    const baseURL = 'http://localhost:5000/api/v1';

    try {
        console.log('Checking server status...');

        // Check if products already exist
        const productsResponse = await axios.get(`${baseURL}/products`);
        const existingProducts = productsResponse.data.products || productsResponse.data.data || [];

        console.log(`Found ${existingProducts.length} existing products`);

        if (existingProducts.length === 0) {
            console.log('No products found. Seeding sample products...');

            let successCount = 0;
            let errorCount = 0;

            for (const product of sampleProducts) {
                try {
                    console.log(`Creating product: ${product.name}`);
                    const response = await axios.post(`${baseURL}/products`, product);
                    console.log(`✓ Created: ${product.name}`);
                    successCount++;
                } catch (error) {
                    console.error(`✗ Failed to create ${product.name}:`, error.response?.data?.message || error.message);
                    errorCount++;
                }
            }

            console.log(`\nSeeding completed:`);
            console.log(`✓ Successful: ${successCount}`);
            console.log(`✗ Failed: ${errorCount}`);

        } else {
            console.log('Products already exist in database. Skipping seeding.');
            console.log('Existing products:');
            existingProducts.slice(0, 5).forEach((product, index) => {
                console.log(`  ${index + 1}. ${product.name} - $${product.price}`);
            });
            if (existingProducts.length > 5) {
                console.log(`  ... and ${existingProducts.length - 5} more`);
            }
        }

    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.error('❌ Server is not running. Please start your server first:');
            console.error('   npm start');
        } else if (error.response?.status === 404) {
            console.error('❌ API endpoint not found. Make sure your server has the correct routes.');
        } else {
            console.error('❌ Error:', error.response?.data?.message || error.message);
        }
    }
}

// Run the seeder
if (require.main === module) {
    seedProductsViaAPI();
}

module.exports = { seedProductsViaAPI, sampleProducts };