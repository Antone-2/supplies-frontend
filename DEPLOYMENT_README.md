# Medhelm Supplies - Deployment Guide

## 🚀 Quick Deployment

### Prerequisites
- Docker and Docker Compose installed
- Node.js 18+ (for local development)
- MongoDB Atlas account (for production database)

### 1. Environment Setup

Copy the production environment template:
```bash
cp .env.production .env
```

Update the `.env` file with your actual values:
```env
MONGO_URI=mongodb+srv://medhelmsupplies:33524872@cluster0.nd1neo1.mongodb.net/medhelm?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_secure_jwt_secret_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PESAPAL_CONSUMER_KEY=your_pesapal_consumer_key
PESAPAL_CONSUMER_SECRET=your_pesapal_consumer_secret
```

### 2. One-Click Deployment

Make the deployment script executable and run it:
```bash
chmod +x deploy.sh
./deploy.sh
```

This will:
- Build the frontend
- Start both frontend and backend services
- Set up health checks
- Provide access URLs

### 3. Manual Deployment

If you prefer manual control:

```bash
# Build frontend
npm run build

# Start services
docker-compose up --build -d

# Check logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🌐 Production URLs

- **Frontend**: https://medhelmsupplies.co.ke
- **Backend API**: https://backend.medhelmsupplies.co.ke
- **Health Check**: https://backend.medhelmsupplies.co.ke/api/health

## 🏗️ Architecture

### Services
- **Frontend**: React + Vite (served by Nginx)
- **Backend**: Node.js + Express (Docker container)
- **Database**: MongoDB Atlas (cloud)

### Key Features
- ✅ Production-ready Docker containers
- ✅ Optimized build configurations
- ✅ Security headers and gzip compression
- ✅ Health checks and monitoring
- ✅ Environment-based configuration
- ✅ Code splitting and lazy loading

## 🔧 Configuration Files

### Docker Files
- `Dockerfile` - Frontend containerization
- `eCommerce-Backend/Dockerfile` - Backend containerization
- `docker-compose.yml` - Multi-service orchestration
- `nginx.conf` - Web server configuration

### Environment Files
- `.env.production` - Production environment template
- Update with your actual credentials before deployment

## 📊 Monitoring & Health Checks

### Health Endpoints
- Frontend: `https://medhelmsupplies.co.ke`
- Backend: `https://backend.medhelmsupplies.co.ke/api/health`

### Docker Commands
```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Scale services (if needed)
docker-compose up -d --scale backend=2
```

## 🔒 Security Features

- Environment variables for sensitive data
- Security headers (XSS protection, CSRF, etc.)
- Non-root Docker containers
- Input validation and sanitization
- Rate limiting and CORS protection

## 🚀 Deployment Options

### Option 1: Docker Compose (Recommended)
- Easy to deploy and manage
- Automatic service discovery
- Built-in health checks

### Option 2: Cloud Platforms
- **Vercel/Netlify**: For frontend-only deployment
- **Heroku/Railway**: For full-stack deployment
- **AWS/DigitalOcean**: For custom infrastructure

### Option 3: Manual Server
- Deploy backend to your server
- Serve frontend via CDN or web server
- Configure reverse proxy (nginx/apache)

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 80 and 5000 are available
2. **Environment variables**: Check `.env` file exists and is properly configured
3. **MongoDB connection**: Verify MongoDB Atlas IP whitelist includes your server IP
4. **Build failures**: Clear Docker cache with `docker system prune`

### Logs and Debugging
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend

# Follow logs in real-time
docker-compose logs -f
```

## 📈 Performance Optimization

- Frontend code splitting and lazy loading
- Backend API response compression
- Static asset caching (1 year for JS/CSS/images)
- Docker layer caching for faster builds
- Optimized bundle sizes with manual chunks

## 🔄 Updates and Maintenance

### Updating the Application
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up --build -d
```

### Database Backups
- MongoDB Atlas provides automatic backups
- Configure backup retention policies in Atlas dashboard
- Export data using `mongodump` if needed

## 📞 Support

For deployment issues:
1. Check the logs using `docker-compose logs`
2. Verify environment variables are set correctly
3. Ensure MongoDB Atlas connection is working
4. Check network connectivity and firewall rules

---

**🎉 Your Medhelm Supplies e-commerce platform is now ready for production deployment!**
