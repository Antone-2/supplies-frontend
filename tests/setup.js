const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Set test database
process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/medhelm_test';

// Silence console during tests (optional)
if (process.env.NODE_ENV === 'test') {
    console.log = () => { };
    console.warn = () => { };
    console.error = () => { };
}

let mongoConnection;

// Global test setup
beforeAll(async () => {
    try {
        // Clear any existing connections
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        mongoConnection = mongoose.connection;
        console.log('Test database connected');
    } catch (error) {
        console.error('Test database connection failed:', error);
        throw error;
    }
});

// Global test teardown
afterAll(async () => {
    try {
        // Clear all test data
        if (mongoConnection) {
            await clearDatabase();
            await mongoose.connection.close();
        }
        console.log('Test database disconnected');
    } catch (error) {
        console.error('Error closing test database connection:', error);
    }
});

// Clear database between tests
beforeEach(async () => {
    await clearDatabase();
});

// Helper function to clear all collections
const clearDatabase = async () => {
    try {
        const collections = await mongoose.connection.db.collections();

        for (let collection of collections) {
            await collection.deleteMany({});
        }
    } catch (error) {
        console.error('Error clearing database:', error);
    }
};
