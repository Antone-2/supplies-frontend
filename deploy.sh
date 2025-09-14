#!/bin/bash

# Medhelm Supplies Deployment Script
# This script helps deploy the application to production

set -e

echo "🚀 Starting Medhelm Supplies Deployment..."

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create a .env file with the following variables:"
    echo "MONGO_URI=your_mongodb_atlas_connection_string"
    echo "JWT_SECRET=your_jwt_secret"
    echo "EMAIL_HOST=your_email_host"
    echo "EMAIL_PORT=587"
    echo "EMAIL_USER=your_email@example.com"
    echo "EMAIL_PASS=your_email_password"
    echo "PESAPAL_CONSUMER_KEY=your_pesapal_consumer_key"
    echo "PESAPAL_CONSUMER_SECRET=your_pesapal_consumer_secret"
    exit 1
fi

# Build frontend
echo "📦 Building frontend..."
npm run build

# Build and start services with Docker Compose
echo "🐳 Starting services with Docker Compose..."
docker-compose up --build -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
sleep 30

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Deployment successful!"
    echo "🌐 Frontend: http://localhost"
    echo "🔧 Backend: http://localhost:5000"
    echo "📊 Health check: http://localhost:5000/api/health"
else
    echo "❌ Deployment failed. Check logs with: docker-compose logs"
    exit 1
fi

echo "🎉 Deployment completed successfully!"
