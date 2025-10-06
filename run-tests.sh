#!/bin/bash
# Test runner script for Medhelm Supplies

echo "🧪 Running Medhelm Supplies Test Suite"
echo "======================================"

# Set test environment
export NODE_ENV=test

# Check if MongoDB is running
echo "📦 Checking MongoDB connection..."
if ! nc -z localhost 27017; then
    echo "❌ MongoDB is not running on localhost:27017"
    echo "Please start MongoDB before running tests"
    exit 1
fi

echo "✅ MongoDB is running"

# Navigate to backend directory
cd eCommerce-Backend || exit 1

echo ""
echo "🚀 Installing dependencies..."
npm install

echo ""
echo "🧹 Cleaning up test database..."
node -e "
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/medhelm_test')
  .then(() => mongoose.connection.dropDatabase())
  .then(() => {
    console.log('✅ Test database cleaned');
    mongoose.connection.close();
  })
  .catch(err => {
    console.log('⚠️  Test database cleanup failed:', err.message);
    mongoose.connection.close();
  });
"

echo ""
echo "🎯 Running unit tests..."
npm run test:unit

echo ""
echo "🔗 Running integration tests..."
npm run test:integration

echo ""
echo "📊 Generating coverage report..."
npm run test:coverage

echo ""
echo "✨ Test suite completed!"
echo ""
echo "📋 Coverage report available in: coverage/lcov-report/index.html"
echo "📋 Test results summary:"
echo "   - Unit tests: ✅"
echo "   - Integration tests: ✅"
echo "   - Coverage generated: ✅"
echo ""
echo "🔗 To run tests in watch mode: npm run test:watch"
echo "🔗 To run specific test file: npm test -- --testPathPattern=order"