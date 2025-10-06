// Direct database seeder using server's database connection
const mongoose = require('mongoose');

// Import the Product model
const Product = require('./Database/models/product.model');

// Sample products data
const sampleProducts = [
    {
        name: "Digital Thermometer",
        description: "Accurate digital thermometer for medical use. Easy to read display and quick results.",
        price: 29.99,
        countInStock: 50,
        category: "Medical Devices",
        isFeatured: true,
        rating: 4.5,
        numReviews: 12,
        image: "https://images.unsplash.com/photo-1584362917165-526a968579a8?w=400",
        images: ["https://images.unsplash.com/photo-1584362917165-526a968579a8?w=400"],
        brand: "MedTech",
        featured: true
    },
    {
        name: "Medical Face Masks (Pack of 50)",
        description: "High-quality disposable medical face masks. 3-layer protection with comfortable ear loops.",
        price: 15.99,
        countInStock: 100,
        category: "PPE",
        isFeatured: true,
        rating: 4.7,
        numReviews: 35,
        image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400",
        images: ["https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400"],
        brand: "SafeGuard",
        featured: true
    },
    {
        name: "Blood Pressure Monitor",
        description: "Digital blood pressure monitor with large LCD display. Memory for multiple readings.",
        price: 89.99,
        countInStock: 25,
        category: "Medical Devices",
        isFeatured: true,
        rating: 4.6,
        numReviews: 28,
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
        images: ["https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400"],
        brand: "HealthCheck",
        featured: true
    },
    {
        name: "Hand Sanitizer (500ml)",
        description: "Antibacterial hand sanitizer with 70% alcohol. Kills 99.9% of germs and bacteria.",
        price: 12.99,
        countInStock: 80,
        category: "Hygiene",
        isFeatured: false,
        rating: 4.3,
        numReviews: 45,
        image: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400",
        images: ["https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400"],
        brand: "CleanHands"
    },
    {
        name: "First Aid Kit",
        description: "Comprehensive first aid kit for home and office use. Includes bandages, antiseptic, and emergency supplies.",
        price: 39.99,
        countInStock: 30,
        category: "Medical Supplies",
        isFeatured: false,
        rating: 4.8,
        numReviews: 20,
        image: "https://images.unsplash.com/photo-1603398938745-e7c1f3c4c4b8?w=400",
        images: ["https://images.unsplash.com/photo-1603398938745-e7c1f3c4c4b8?w=400"],
        brand: "Emergency Plus"
    },
    {
        name: "Disposable Gloves (Box of 100)",
        description: "Nitrile disposable gloves, powder-free and latex-free. Suitable for medical and food handling.",
        price: 19.99,
        countInStock: 60,
        category: "PPE",
        isFeatured: false,
        rating: 4.4,
        numReviews: 18,
        image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400",
        images: ["https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400"],
        brand: "GlovePro"
    }
];

async function seedProductsDirectly() {
    try {
        // Check if mongoose is already connected (from the running server)
        if (mongoose.connection.readyState === 1) {
            console.log('Using existing MongoDB connection from server');
        } else {
            console.log('No existing connection found. The server might not be running.');
            console.log('Please make sure your server is running first (npm start)');
            return;
        }

        // Check existing products
        const existingProducts = await Product.countDocuments();
        console.log(`Current products in database: ${existingProducts}`);

        if (existingProducts === 0) {
            console.log('No products found, adding sample products...');

            // Insert sample products
            const insertedProducts = await Product.insertMany(sampleProducts);
            console.log(`✅ Successfully inserted ${insertedProducts.length} products`);

            // Show the inserted products
            insertedProducts.forEach((product, index) => {
                console.log(`${index + 1}. ${product.name} - $${product.price} (ID: ${product._id})`);
            });

        } else {
            console.log('✅ Products already exist in database');

            // Show existing products
            const products = await Product.find().select('name price category').limit(10);
            console.log('Existing products:');
            products.forEach((product, index) => {
                console.log(`${index + 1}. ${product.name} - $${product.price} (${product.category})`);
            });
        }

        console.log('✅ Seeding completed successfully');

    } catch (error) {
        console.error('❌ Error seeding products:', error.message);
        if (error.message.includes('buffering timed out')) {
            console.log('💡 Hint: Make sure your server is running and connected to the database');
        }
    }
}

// Export for use by other modules
module.exports = { seedProductsDirectly, sampleProducts };

// Run directly if this file is executed
if (require.main === module) {
    seedProductsDirectly();
}