#!/bin/bash

echo "🔍 CropCare Setup Validation"
echo "============================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if file/directory exists
check_exists() {
    if [ -e "$1" ]; then
        echo -e "${GREEN}✅ $2${NC}"
        return 0
    else
        echo -e "${RED}❌ $2${NC}"
        return 1
    fi
}

# Track validation status
validation_failed=0

echo "Checking project structure..."
check_exists "ai" "AI service directory" || validation_failed=1
check_exists "backend" "Backend directory" || validation_failed=1
check_exists "frontend" "Frontend directory" || validation_failed=1
check_exists "docs" "Documentation directory" || validation_failed=1

echo ""
echo "Checking key files..."
check_exists "README.md" "README.md" || validation_failed=1
check_exists "PROJECT_STRUCTURE.md" "PROJECT_STRUCTURE.md" || validation_failed=1
check_exists "CHANGELOG.md" "CHANGELOG.md" || validation_failed=1
check_exists "docker-compose.yml" "docker-compose.yml" || validation_failed=1

echo ""
echo "Checking AI service..."
check_exists "ai/app.py" "AI service main file" || validation_failed=1
check_exists "ai/requirements.txt" "AI service requirements" || validation_failed=1

echo ""
echo "Checking backend..."
check_exists "backend/index.js" "Backend main file" || validation_failed=1
check_exists "backend/package.json" "Backend package.json" || validation_failed=1
check_exists "backend/.env.example" "Backend environment example" || validation_failed=1

echo ""
echo "Checking frontend..."
check_exists "frontend/package.json" "Frontend package.json" || validation_failed=1
check_exists "frontend/index.html" "Frontend index.html" || validation_failed=1
check_exists "frontend/src/App.jsx" "Frontend App.jsx" || validation_failed=1

echo ""
echo "Checking documentation..."
check_exists "docs/API.md" "API documentation" || validation_failed=1
check_exists "docs/SETUP.md" "Setup documentation" || validation_failed=1
check_exists "docs/DEPLOYMENT.md" "Deployment documentation" || validation_failed=1

echo ""
echo "Checking startup scripts..."
check_exists "start-cropcare.bat" "Windows startup script" || validation_failed=1
check_exists "start-cropcare.sh" "Linux/Mac startup script" || validation_failed=1

echo ""
echo "============================"

if [ $validation_failed -eq 0 ]; then
    echo -e "${GREEN}🎉 VALIDATION SUCCESSFUL!${NC}"
    echo "============================"
    echo ""
    echo "Your CropCare project is properly set up and ready to use!"
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo "1. Install dependencies:"
    echo "   cd backend && npm install"
    echo "   cd ../frontend && npm install"
    echo "   cd ../ai && pip install -r requirements.txt"
    echo ""
    echo "2. Configure environment:"
    echo "   cp backend/.env.example backend/.env"
    echo "   # Edit backend/.env with your configuration"
    echo ""
    echo "3. Start the application:"
    echo "   chmod +x start-cropcare.sh"
    echo "   ./start-cropcare.sh"
    echo ""
    echo "For detailed instructions, see README.md"
    echo ""
    exit 0
else
    echo -e "${RED}❌ VALIDATION FAILED!${NC}"
    echo "============================"
    echo ""
    echo "Please check the missing files and try again."
    echo "For setup instructions, see README.md"
    echo ""
    exit 1
fi