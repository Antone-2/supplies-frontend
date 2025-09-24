const mongoose = require('mongoose');
const Category = require('../models/Category');

// Connect to MongoDB (use production URI from environment variable, fallback to localhost)
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/medhelm';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const categories = [
    {
        name: "Diagnostic Equipment",
        description: "Stethoscopes, BP monitors, thermometers, and diagnostic tools",
        icon: "Stethoscope",
        color: "text-blue-600",
        productCount: 0,
        isActive: true,
        sortOrder: 1
    },
    {
        name: "Surgical Instruments",
        description: "Syringes, scalpels, surgical tools and operating room equipment",
        icon: "Syringe",
        color: "text-red-600",
        productCount: 0,
        isActive: true,
        sortOrder: 2
    },
    {
        name: "Patient Care",
        description: "Bed sheets, gowns, comfort items and patient care supplies",
        icon: "Heart",
        color: "text-pink-600",
        productCount: 0,
        isActive: true,
        sortOrder: 3
    },
    {
        name: "Safety & PPE",
        description: "Gloves, masks, protective equipment and safety supplies",
        icon: "Shield",
        color: "text-green-600",
        productCount: 0,
        isActive: true,
        sortOrder: 4
    },
    {
        name: "Pharmaceuticals",
        description: "Over-the-counter medications and pharmaceutical products",
        icon: "Pill",
        color: "text-purple-600",
        productCount: 0,
        isActive: true,
        sortOrder: 5
    },
    {
        name: "Medical Supplies",
        description: "Bandages, gauze, first aid supplies and general medical equipment",
        icon: "Package",
        color: "text-orange-600",
        productCount: 0,
        isActive: true,
        sortOrder: 6
    }
];

async function seedCategories() {
    try {
        // Clear existing categories
        await Category.deleteMany({});

        // Insert new categories
        await Category.insertMany(categories);

        // ...existing code...
        process.exit(0);
    } catch (error) {
        console.error('Error seeding categories:', error);
        process.exit(1);
    }
}

seedCategories();
