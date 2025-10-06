@echo off
title Medhelm Cart Testing Setup
color 0A

echo.
echo ======================================
echo 🛒 Medhelm Cart Testing Setup
echo ======================================
echo.

echo 📦 Starting Backend Server...
echo.

:: Start backend server in new window
start "Medhelm Backend" cmd /k "cd /d "d:\Medhelm Supplies\eCommerce-Backend" && node server.js"

:: Wait a moment for backend to start
timeout /t 3 /nobreak >nul

echo ✅ Backend server starting on http://localhost:5000
echo.

echo 🎨 Starting Frontend Server...
echo.

:: Start frontend server in new window  
start "Medhelm Frontend" cmd /k "cd /d "d:\Medhelm Supplies" && npm run dev"

echo ✅ Frontend server starting on http://localhost:5173
echo.

echo 🎯 CART TESTING READY!
echo ======================
echo.
echo 🌐 Frontend: http://localhost:5173
echo 🔌 Backend:  http://localhost:5000
echo.
echo 📋 Cart Testing Scenarios:
echo    1. Add products to cart
echo    2. Modify quantities
echo    3. Remove items  
echo    4. Test checkout flow
echo    5. Verify cart persistence
echo.
echo 🔧 Key URLs to test:
echo    • Products: http://localhost:5173/products
echo    • Cart:     http://localhost:5173/cart  
echo    • Checkout: http://localhost:5173/checkout
echo.
echo 📖 See CART_TESTING_GUIDE.md for detailed testing steps
echo.
echo Press any key to open the testing guide...
pause >nul

:: Open the testing guide
start notepad "CART_TESTING_GUIDE.md"

echo.
echo 🚀 Happy testing!
echo Close this window when done testing.
pause