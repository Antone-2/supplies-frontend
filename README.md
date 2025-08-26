# Medhelm Supplies - Medical Equipment E-Commerce Platform

A full-stack e-commerce platform specializing in medical equipment and supplies, built with React, TypeScript, Node.js, and MongoDB.

## 🏗️ Project Structure

```
medhelm-supplies/
├── 📁 Root Configuration Files
│   ├── .gitignore
│   ├── .dockerignore
│   ├── docker-compose.yml
│   ├── nginx.conf
│   ├── vite.config.ts
│   ├── jest.config.js
│   ├── cypress.config.ts
│   └── package.json

├── 📁 Frontend (React + TypeScript)
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── ui/
│   │   │   │   ├── accordion.tsx
│   │   │   │   └── [UI components]
│   │   │   ├── AddToCartButton.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── ButtonActions.tsx
│   │   │   ├── Cart.css
│   │   │   ├── CartDisplay.tsx
│   │   │   ├── CartSheet.tsx
│   │   │   ├── Categories.tsx
│   │   │   ├── FeaturedProducts.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── MobileBottomNav.tsx
│   │   │   ├── PageLoader.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductList.tsx
│   │   │   ├── Reviews.tsx
│   │   │   ├── SearchFilter.tsx
│   │   │   ├── WhatsAppChat.tsx
│   │   │   ├── Wishlist.ts
│   │   │   └── WishlistSheet.tsx
│   │   ├── 📁 pages/
│   │   │   ├── About.tsx
│   │   │   ├── Auth.tsx
│   │   │   ├── Category.tsx
│   │   │   ├── Checkout.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Cookies.tsx
│   │   │   ├── DeliveryPolicy.tsx
│   │   │   ├── Index.tsx
│   │   │   ├── NotFound.tsx
│   │   │   ├── OrderHistory.tsx
│   │   │   ├── Privacy.tsx
│   │   │   ├── productDetail.tsx
│   │   │   ├── ProductList.tsx
│   │   │   ├── Returns.tsx
│   │   │   ├── Shop.tsx
│   │   │   ├── Terms.tsx
│   │   │   └── TrackOrder.tsx
│   │   ├── 📁 services/
│   │   │   ├── authService.ts
│   │   │   ├── cartService.ts
│   │   │   ├── emailService.ts
│   │   │   ├── orderService.ts
│   │   │   ├── pesapalService.ts
│   │   │   └── productService.ts
│   │   ├── 📁 context/
│   │   │   ├── AuthContext.tsx
│   │   │   ├── CartContext.tsx
│   │   │   ├── ThemeContext.tsx
│   │   │   └── wishlistController.tsx
│   │   ├── 📁 hooks/
│   │   │   ├── use-auth.ts
│   │   │   ├── use-cart.ts
│   │   │   ├── use-fetch.ts
│   │   │   ├── use-mobile.tsx
│   │   │   ├── use-toast.ts
│   │   │   ├── use-wishlist.ts
│   │   │   └── use-wishlist.ts
│   │   ├── 📁 providers/
│   │   │   ├── AuthProvider.tsx
│   │   │   ├── CartProvider.tsx
│   │   │   ├── NotificationProvider.tsx
│   │   │   └── ThemeProvider.tsx
│   │   ├── 📁 utils/
│   │   │   ├── constants.ts
│   │   │   ├── errorMessages.ts
│   │   │   ├── formatters.ts
│   │   │   ├── tokenUtils.ts
│   │   │   ├── validators.ts
│   │   │   ├── auth.js
│   │   │   ├── emailService.js
│   │   │   └── constants.ts
│   │   ├── 📁 data/
│   │   │   └── products.ts
│   │   ├── 📁 lib/
│   │   │   └── utils.ts
│   │   ├── 📁 models/
│   │   │   ├── Category.ts
│   │   │   ├── Order.ts
│   │   │   ├── Product.ts
│   │   │   └── User.js
│   │   └── 📁 config/
│   │       ├── db.js
│   │       ├── default.js
│   │       ├── emailConfig.js
│   │       ├── index.js
│   │       ├── pesaPalConfig.js
│   │       └── [config files]
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx

├── 📁 Backend (Node.js + Express)
│   ├── 📁 server/
│   │   ├── index.js
│   │   ├── package.json
│   │   ├── jest.config.js
│   │   ├── POSTMAN_COLLECTION.json
│   │   ├── 📁 config/
│   │   │   ├── auth.js
│   │   │   └── database.js
│   │   ├── 📁 controllers/
│   │   │   ├── adminController.js
│   │   │   ├── authController.js
│   │   │   ├── cartController.js
│   │   │   ├── paymentController.js
│   │   │   └── productController.js
│   │   ├── 📁 middleware/
│   │   │   ├── auth.js
│   │   │   ├── security.js
│   │   │   ├── validation.js
│   │   │   └── [middleware files]
│   │   ├── 📁 models/
│   │   │   ├── Cart.js
│   │   │   ├── Order.js
│   │   │   ├── Product.js
│   │   │   └── User.js
│   │   ├── 📁 routes/
│   │   │   ├── adminRoutes.js
│   │   │   ├── authRoutes.js
│   │   │   ├── auth_routes.js
│   │   │   ├── paymentRoutes.js
│   │   │   └── productRoutes.js
│   │   ├── 📁 services/
│   │   │   └── pesapalService.js
│   │   ├── 📁 utils/
│   │   │   ├── emailService.js
│   │   │   ├── errorHandler.js
│   │   │   ├── upload.js
│   │   │   └── validation.js
│   │   └── 📁 tests/
│   │       ├── setup.js
│   │       └── [test files]

├── 📁 Testing
│   ├── 📁 cypress/
│   │   ├── fixtures/
│   │   └── support/
│   ├── 📁 tests/
│   │   └── auth.test.js

├── 📁 Docker Configuration
│   ├── Dockerfile
│   ├── server/Dockerfile
│   ├── docker-compose.yml
│   ├── nginx.conf
│   └── .dockerignore

├── 📁 Public Assets
│   ├── public/
│   │   └── medhelm-hero-van.jpg
│   ├── src/assets/
│   │   ├── Medhelm Logo.png
│   │   └── medhelm-logo.svg

└── 📁 Configuration Files
    ├── .eslintrc.cjs
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── vite.config.ts
    └── [other config files]
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**

```bash
git clone [repository-url]
cd medhelm-supplies
```

2. **Install dependencies**

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install
```

3. **Set up environment variables**

```bash
# Create .env file in root directory
cp .env.example .env

# Create .env file in server directory
cp server/.env.example server/.env
```

4. **Configure environment variables**

```bash
# Frontend (.env)
VITE_API_URL=https://api.medhelmsupplies.co.ke/api/v1
VITE_PESAPAL_CONSUMER_KEY=your_pesapal_key
VITE_PESAPAL_CONSUMER_SECRET=your_pesapal_secret

# Backend (server/.env)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medhelm
JWT_SECRET=your_jwt_secret
PESAPAL_CONSUMER_KEY=your_pesapal_key
PESAPAL_CONSUMER_SECRET=your_pesapal_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

5. **Start the development servers**

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
npm run dev
```

## 🧪 Testing

### Run Tests

```bash
# Frontend tests
npm test

# Backend tests
cd server && npm test

# E2E tests
npm run cypress:open
```

### Test Coverage

```bash
# Generate coverage reports
npm run coverage
```

## 🐳 Docker Deployment

### Using Docker Compose

```bash
# Build and run with Docker
docker-compose up --build

# Access the application
# Frontend: http://localhost:5173
# Backend: https://api.medhelmsupplies.co.ke
```

## 📈 Tech Stack

### Frontend

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **React Router** for navigation
- **Context API** for state management
- **Cypress** for E2E testing

### Backend

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **PesaPal** for payment processing
- **Nodemailer** for email services
- **Multer** for file uploads

### DevOps

- **Docker** for containerization
- **Nginx** for reverse proxy
- **GitHub Actions** for CI/CD

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@medhelm-supplies.com or join our Slack channel.

## 🔄 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes.

---

**Built with ❤️ by the Medhelm Supplies Team**
#   m e d h e l m - b a c k e n d  
 #   e C o m m e r c e - B a c k e n d  
 #   e C o m m e r c e - B a c k e n d  
 #   e c o m m e r c e - b a c k e n d  
 #   m e d h e l m - s u p p l i e s  
 