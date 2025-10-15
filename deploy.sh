#!/bin/bash

echo "🚀 TEACH Platform Deployment Script"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo -e "${RED}Error: Please run this script from the teach-platform root directory${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 1: Frontend Deployment to Vercel${NC}"
echo "--------------------------------------"
echo "1. First, you need to login to Vercel:"
echo "   Run: vercel login"
echo ""
echo "2. Then deploy the frontend:"
echo "   cd frontend"
echo "   vercel --yes"
echo ""
echo "3. When prompted:"
echo "   - Set up and deploy: Y"
echo "   - Which scope: Choose your account"
echo "   - Link to existing project?: N"
echo "   - Project name: teach-platform-frontend"
echo "   - In which directory: ./ (current directory)"
echo "   - Want to override settings?: N"
echo ""
read -p "Press Enter when you've completed Vercel deployment..."

echo -e "${GREEN}✓ Frontend deployment initiated${NC}"
echo ""

echo -e "${YELLOW}Step 2: Backend Deployment to Railway${NC}"
echo "-------------------------------------"
echo "1. First, login to Railway:"
echo "   Run: railway login"
echo ""
echo "2. Create a new project:"
echo "   railway init"
echo "   - Project name: teach-platform-backend"
echo ""
echo "3. Add services:"
echo "   railway add"
echo "   - Choose PostgreSQL"
echo "   railway add" 
echo "   - Choose Redis"
echo ""
echo "4. Deploy the backend:"
echo "   cd backend"
echo "   railway up"
echo ""
read -p "Press Enter when you've completed Railway setup..."

echo -e "${GREEN}✓ Backend deployment initiated${NC}"
echo ""

echo -e "${YELLOW}Step 3: Environment Variables${NC}"
echo "-----------------------------"
echo "Add these to Railway dashboard (railway.app):"
echo ""
cat << 'EOF'
NODE_ENV=production
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=30d
REFRESH_TOKEN_EXPIRES_IN=90d

# Get these from Railway PostgreSQL service
DATABASE_URL=${{Postgres.DATABASE_URL}}

# Get these from Railway Redis service  
REDIS_URL=${{Redis.REDIS_URL}}

# AI APIs (add the ones you have)
ANTHROPIC_API_KEY=your-claude-api-key
OPENAI_API_KEY=your-openai-api-key
GOOGLE_AI_API_KEY=your-google-ai-api-key

# Frontend URL (update after Vercel deployment)
FRONTEND_URL=https://your-app.vercel.app
ALLOWED_ORIGINS=https://your-app.vercel.app

# Email (optional for now)
FROM_EMAIL=noreply@teach.edu.br
EOF

echo ""
read -p "Press Enter when you've added environment variables..."

echo -e "${GREEN}✓ Environment variables configured${NC}"
echo ""

echo -e "${YELLOW}Step 4: Database Migration${NC}"
echo "-------------------------"
echo "Run these commands in your Railway project:"
echo "  cd backend"
echo "  railway run npm run generate"
echo "  railway run npm run migrate"
echo "  railway run npm run seed"
echo ""
read -p "Press Enter when migrations are complete..."

echo -e "${GREEN}✓ Database migrated and seeded${NC}"
echo ""

echo -e "${YELLOW}Step 5: Update Frontend Environment${NC}"
echo "----------------------------------"
echo "In Vercel dashboard, add this environment variable:"
echo "  NEXT_PUBLIC_API_URL = https://your-railway-app.up.railway.app/api/v1"
echo ""
echo "Then redeploy the frontend in Vercel dashboard"
echo ""
read -p "Press Enter when frontend is updated..."

echo -e "${GREEN}✓ Frontend environment updated${NC}"
echo ""

echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo "======================"
echo ""
echo "Test your deployment:"
echo "1. Frontend: Check your Vercel URL"
echo "2. Backend Health: curl https://your-railway-app.up.railway.app/health"
echo "3. Login with: admin@teach.edu.br / admin123"
echo ""
echo "Next steps:"
echo "- Add custom domains"
echo "- Configure additional API keys"
echo "- Set up monitoring"
echo ""