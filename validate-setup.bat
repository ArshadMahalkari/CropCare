@echo off
echo 🔍 CropCare Setup Validation
echo ============================
echo.

echo Checking project structure...
if not exist "ai\" (
    echo ❌ AI service directory missing
    goto :error
)
if not exist "backend\" (
    echo ❌ Backend directory missing
    goto :error
)
if not exist "frontend\" (
    echo ❌ Frontend directory missing
    goto :error
)
if not exist "docs\" (
    echo ❌ Documentation directory missing
    goto :error
)
echo ✅ Project structure is correct

echo.
echo Checking key files...
if not exist "README.md" (
    echo ❌ README.md missing
    goto :error
)
if not exist "PROJECT_STRUCTURE.md" (
    echo ❌ PROJECT_STRUCTURE.md missing
    goto :error
)
if not exist "CHANGELOG.md" (
    echo ❌ CHANGELOG.md missing
    goto :error
)
if not exist "docker-compose.yml" (
    echo ❌ docker-compose.yml missing
    goto :error
)
echo ✅ Key files are present

echo.
echo Checking AI service...
if not exist "ai\app.py" (
    echo ❌ AI service main file missing
    goto :error
)
if not exist "ai\requirements.txt" (
    echo ❌ AI service requirements missing
    goto :error
)
echo ✅ AI service files are present

echo.
echo Checking backend...
if not exist "backend\index.js" (
    echo ❌ Backend main file missing
    goto :error
)
if not exist "backend\package.json" (
    echo ❌ Backend package.json missing
    goto :error
)
if not exist "backend\.env.example" (
    echo ❌ Backend environment example missing
    goto :error
)
echo ✅ Backend files are present

echo.
echo Checking frontend...
if not exist "frontend\package.json" (
    echo ❌ Frontend package.json missing
    goto :error
)
if not exist "frontend\index.html" (
    echo ❌ Frontend index.html missing
    goto :error
)
if not exist "frontend\src\App.jsx" (
    echo ❌ Frontend App.jsx missing
    goto :error
)
echo ✅ Frontend files are present

echo.
echo Checking documentation...
if not exist "docs\API.md" (
    echo ❌ API documentation missing
    goto :error
)
if not exist "docs\SETUP.md" (
    echo ❌ Setup documentation missing
    goto :error
)
if not exist "docs\DEPLOYMENT.md" (
    echo ❌ Deployment documentation missing
    goto :error
)
echo ✅ Documentation files are present

echo.
echo Checking startup scripts...
if not exist "start-cropcare.bat" (
    echo ❌ Windows startup script missing
    goto :error
)
if not exist "start-cropcare.sh" (
    echo ❌ Linux/Mac startup script missing
    goto :error
)
echo ✅ Startup scripts are present

echo.
echo ============================
echo 🎉 VALIDATION SUCCESSFUL!
echo ============================
echo.
echo Your CropCare project is properly set up and ready to use!
echo.
echo Next steps:
echo 1. Install dependencies: cd backend ^&^& npm install ^&^& cd ../frontend ^&^& npm install ^&^& cd ../ai ^&^& pip install -r requirements.txt
echo 2. Configure environment: Copy backend/.env.example to backend/.env and configure
echo 3. Start the application: Run start-cropcare.bat
echo.
echo For detailed instructions, see README.md
echo.
pause
exit /b 0

:error
echo.
echo ============================
echo ❌ VALIDATION FAILED!
echo ============================
echo.
echo Please check the missing files and try again.
echo For setup instructions, see README.md
echo.
pause
exit /b 1