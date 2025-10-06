// Quick product seeder for testing
const mongoose = require('mongoose');
const Product = require('./Database/models/product.model');
const config = require('./config');

// Use the same connection logic as the main server
const { MONGO_URI } = config;

const sampleProducts = [
    {
        name: "Digital Thermometer",
        description: "Accurate digital thermometer for medical use",
        price: 29.99,
        countInStock: 50,
        category: "Medical Devices",
        isFeatured: true,
        featured: true,
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
        featured: true,
        rating: 4.8,
        numReviews: 25,
        image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400",
        images: ["https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400"]
    },
    {
        name: "Blood Pressure Monitor",
        description: "Digital blood pressure monitor with large display",
        price: 89.99,
        countInStock: 30,
        category: "Medical Devices",
        isFeatured: true,
        featured: true,
        rating: 4.3,
        numReviews: 8,
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400",
        images: ["https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400"]
    },
    {
        name: "Stethoscope",
        description: "Professional dual-head stethoscope",
        price: 45.99,
        countInStock: 25,
        category: "Medical Devices",
        isFeatured: true,
        featured: true,
        rating: 4.7,
        numReviews: 15,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
        images: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400"]
    },
    {
        name: "Hand Sanitizer (500ml)",
        description: "70% alcohol-based hand sanitizer",
        price: 8.99,
        countInStock: 75,
        category: "Hygiene",
        isFeatured: false,
        rating: 4.2,
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

// Connection function with fallbacks (same as server)
async function connectWithRetry() {
    const mongoURIs = [
        MONGO_URI,
        MONGO_URI.replace('mongodb+srv://', 'mongodb://'), // Fallback to standard MongoDB
        'mongodb://localhost:27017/medhelm' // Local fallback
    ];

    for (let i = 0; i < mongoURIs.length; i++) {
        const uri = mongoURIs[i];
        console.log(`Trying MongoDB URI ${i + 1}...`);

        for (let attempt = 1; attempt <= 2; attempt++) {
            try {
                console.log(`MongoDB connection attempt ${attempt} of 2 for URI ${i + 1}`);

                await mongoose.connect(uri, {
                    serverSelectionTimeoutMS: 5000, // 5 second timeout
                    socketTimeoutMS: 45000,
                    maxPoolSize: 10,
                    bufferCommands: false
                });

                console.log(`Successfully connected to MongoDB using URI ${i + 1}`);
                return true;
            } catch (error) {
                console.log(`MongoDB connection attempt ${attempt} failed for URI ${i + 1}:`, error.message);
                if (attempt < 2) {
                    console.log('Retrying in 3 seconds...');
                    await new Promise(resolve => setTimeout(resolve, 3000));
                }
            }
        }
    }

    console.error('Failed to connect to MongoDB after trying all URIs and retries');
    return false;
}

async function seedProducts() {
    try {
        // Connect to MongoDB using same logic as server
        const connected = await connectWithRetry();
        if (!connected) {
            throw new Error('Could not connect to any MongoDB instance');
        }

        console.log('Connected to MongoDB');

        // Clear existing products (optional - comment out if you want to keep existing products)
        // await Product.deleteMany({});
        // console.log('Cleared existing products');

        // Check if products already exist
        const existingProducts = await Product.countDocuments();
        console.log('Existing products:', existingProducts);

        if (existingProducts === 0) {
            // Insert sample products
            const insertedProducts = await Product.insertMany(sampleProducts);
            console.log(`Successfully inserted ${insertedProducts.length} products`);
        } else {
            console.log('Products already exist in database');
        }

        // Close connection
        await mongoose.connection.close();
        console.log('Database connection closed');

    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
}

// Run the seeder if this file is executed directly
if (require.main === module) {
    seedProducts();
}

module.exports = { seedProducts, sampleProducts };