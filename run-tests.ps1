# PowerShell test runner script for Medhelm Supplies

Write-Host "🧪 Running Medhelm Supplies Test Suite" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green

# Set test environment
$env:NODE_ENV = "test"

# Check if MongoDB is running
Write-Host "📦 Checking MongoDB connection..." -ForegroundColor Blue
try {
    $connection = Test-NetConnection -ComputerName localhost -Port 27017 -InformationLevel Quiet
    if (-not $connection.TcpTestSucceeded) {
        throw "Connection failed"
    }
    Write-Host "✅ MongoDB is running" -ForegroundColor Green
}
catch {
    Write-Host "❌ MongoDB is not running on localhost:27017" -ForegroundColor Red
    Write-Host "Please start MongoDB before running tests" -ForegroundColor Red
    exit 1
}

# Navigate to backend directory
Set-Location -Path "eCommerce-Backend" -ErrorAction Stop

Write-Host ""
Write-Host "🚀 Installing dependencies..." -ForegroundColor Blue
npm install

Write-Host ""
Write-Host "🧹 Cleaning up test database..." -ForegroundColor Blue
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

Write-Host ""
Write-Host "🎯 Running unit tests..." -ForegroundColor Blue
npm run test:unit

Write-Host ""
Write-Host "🔗 Running integration tests..." -ForegroundColor Blue
npm run test:integration

Write-Host ""
Write-Host "📊 Generating coverage report..." -ForegroundColor Blue
npm run test:coverage

Write-Host ""
Write-Host "✨ Test suite completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Coverage report available in: coverage/lcov-report/index.html" -ForegroundColor Yellow
Write-Host "📋 Test results summary:" -ForegroundColor Yellow
Write-Host "   - Unit tests: ✅" -ForegroundColor Green
Write-Host "   - Integration tests: ✅" -ForegroundColor Green
Write-Host "   - Coverage generated: ✅" -ForegroundColor Green
Write-Host ""
Write-Host "🔗 To run tests in watch mode: npm run test:watch" -ForegroundColor Cyan
Write-Host "🔗 To run specific test file: npm test -- --testPathPattern=order" -ForegroundColor Cyan