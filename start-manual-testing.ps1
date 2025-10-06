# Manual Testing Setup Script for Medhelm Supplies (PowerShell)
# This script prepares the development environment for comprehensive manual testing

Write-Host "🧪 Setting up Medhelm Supplies for Manual Testing" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green

function Write-Info {
    param($Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param($Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param($Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param($Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check if MongoDB is running
Write-Info "Checking MongoDB connection..."
try {
    $connection = Test-NetConnection -ComputerName localhost -Port 27017 -InformationLevel Quiet
    if ($connection.TcpTestSucceeded) {
        Write-Success "MongoDB is running locally"
    } else {
        Write-Warning "Local MongoDB not detected, will use cloud database"
    }
} catch {
    Write-Warning "Local MongoDB not detected, will use cloud database"
}

# Navigate to backend directory
if (Test-Path "eCommerce-Backend") {
    Set-Location "eCommerce-Backend"
} else {
    Write-Error "Backend directory not found"
    exit 1
}

# Install backend dependencies
Write-Info "Installing backend dependencies..."
npm install

Write-Success "Starting backend server..."
Write-Host ""
Write-Host "🚀 Backend server will start on http://localhost:5000" -ForegroundColor Cyan
Write-Host "📊 API Documentation available at http://localhost:5000/api-docs (if Swagger is configured)" -ForegroundColor Cyan
Write-Host ""

# Start the server in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal

# Wait for server to start
Start-Sleep 3

# Navigate back to frontend directory
Set-Location ".."

Write-Info "Installing frontend dependencies..."
npm install

Write-Success "Development environment is ready!"
Write-Host ""
Write-Host "🎯 MANUAL TESTING GUIDE" -ForegroundColor Green
Write-Host "=======================" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "🔌 Backend API: http://localhost:5000/api/v1" -ForegroundColor Cyan
Write-Host "📧 Email Service: Configured with Brevo" -ForegroundColor Cyan
Write-Host "💳 Payment: PesaPal test mode enabled" -ForegroundColor Cyan
Write-Host ""
Write-Host "🧪 TEST SCENARIOS TO VERIFY:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1️⃣  USER AUTHENTICATION" -ForegroundColor White
Write-Host "   • Register new account"
Write-Host "   • Login with credentials"
Write-Host "   • Profile updates"
Write-Host "   • Password reset"
Write-Host ""
Write-Host "2️⃣  PRODUCT BROWSING" -ForegroundColor White
Write-Host "   • Browse categories"
Write-Host "   • Search products"
Write-Host "   • Filter and sort"
Write-Host "   • Product details"
Write-Host ""
Write-Host "3️⃣  SHOPPING CART" -ForegroundColor White
Write-Host "   • Add products to cart"
Write-Host "   • Update quantities"
Write-Host "   • Remove items"
Write-Host "   • Cart persistence"
Write-Host ""
Write-Host "4️⃣  CHECKOUT PROCESS" -ForegroundColor White
Write-Host "   • Guest checkout"
Write-Host "   • Shipping information"
Write-Host "   • PesaPal payment"
Write-Host "   • Order confirmation"
Write-Host ""
Write-Host "5️⃣  ORDER MANAGEMENT" -ForegroundColor White
Write-Host "   • View order history"
Write-Host "   • Order status tracking"
Write-Host "   • Order details"
Write-Host ""
Write-Host "6️⃣  ADMIN PANEL" -ForegroundColor White
Write-Host "   • Product management (CRUD)"
Write-Host "   • Order management"
Write-Host "   • User management"
Write-Host "   • Analytics dashboard"
Write-Host ""
Write-Host "7️⃣  NOTIFICATIONS" -ForegroundColor White
Write-Host "   • Email confirmations"
Write-Host "   • Order status updates"
Write-Host "   • In-app notifications"
Write-Host ""
Write-Host "8️⃣  SECURITY FEATURES" -ForegroundColor White
Write-Host "   • Rate limiting"
Write-Host "   • Input validation"
Write-Host "   • Authentication protection"
Write-Host ""

# Start the frontend server in a new window
Write-Success "Starting frontend development server..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal

Write-Host ""
Write-Success "Both servers are now starting in separate windows!"
Write-Host ""
Write-Host "📱 QUICK TEST URLS:" -ForegroundColor Cyan
Write-Host "   🏠 Homepage: http://localhost:5173"
Write-Host "   🔐 Login: http://localhost:5173/login"
Write-Host "   📝 Register: http://localhost:5173/register"
Write-Host "   🛒 Products: http://localhost:5173/products"
Write-Host "   👤 Admin: http://localhost:5173/admin"
Write-Host ""
Write-Host "🔧 API ENDPOINTS TO TEST:" -ForegroundColor Cyan
Write-Host "   📊 Health Check: http://localhost:5000/health"
Write-Host "   🛍️  Products API: http://localhost:5000/api/v1/products"
Write-Host "   🔐 Auth API: http://localhost:5000/api/v1/auth"
Write-Host "   📦 Orders API: http://localhost:5000/api/v1/orders"
Write-Host ""
Write-Host "⚡ TESTING TIPS:" -ForegroundColor Yellow
Write-Host "   • Use browser developer tools to monitor API calls"
Write-Host "   • Check email notifications (check spam folder)"
Write-Host "   • Test both guest and authenticated user flows"
Write-Host "   • Verify responsive design on different screen sizes"
Write-Host "   • Test payment flow with PesaPal test cards"
Write-Host ""
Write-Host "🛑 To stop servers: Close the PowerShell windows or press Ctrl+C in each" -ForegroundColor Red
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Green
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")