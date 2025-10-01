#!/bin/bash

# TEACH Platform Backend Deployment Script
# This script automates the backend deployment process

echo "🚀 Starting TEACH Platform Backend Deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the backend directory
if [ ! -f "package.json" ] || [ ! -f "prisma/schema.prisma" ]; then
    echo -e "${RED}Error: Not in backend directory. Please run from backend folder.${NC}"
    exit 1
fi

# Step 1: Check for uncommitted changes
echo -e "\n${YELLOW}Checking for uncommitted changes...${NC}"
if [[ -n $(git status -s) ]]; then
    echo -e "${YELLOW}Uncommitted changes found:${NC}"
    git status -s
    
    read -p "Do you want to commit these changes? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        echo "Enter commit message:"
        read commit_message
        git commit -m "$commit_message"
    else
        echo -e "${RED}Deployment cancelled. Please commit or stash your changes first.${NC}"
        exit 1
    fi
fi

# Step 2: Generate Prisma Client
echo -e "\n${YELLOW}Generating Prisma Client...${NC}"
npx prisma generate
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Prisma Client generated successfully${NC}"
else
    echo -e "${RED}✗ Prisma Client generation failed${NC}"
    exit 1
fi

# Step 3: Push to GitHub
echo -e "\n${YELLOW}Pushing to GitHub...${NC}"
git push origin main
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Code pushed to GitHub successfully${NC}"
else
    echo -e "${RED}✗ GitHub push failed${NC}"
    exit 1
fi

# Step 4: Deploy migrations (if Railway CLI is installed)
if command -v railway &> /dev/null; then
    echo -e "\n${YELLOW}Railway CLI detected. Running database migration...${NC}"
    read -p "Do you want to run database migrations? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        railway run npx prisma migrate deploy
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ Database migration completed${NC}"
        else
            echo -e "${RED}✗ Database migration failed${NC}"
            echo -e "${YELLOW}You may need to run manually: railway run npx prisma migrate deploy${NC}"
        fi
    fi
else
    echo -e "\n${YELLOW}Railway CLI not found. Please run migrations manually:${NC}"
    echo "1. Install Railway CLI: npm install -g @railway/cli"
    echo "2. Login: railway login"
    echo "3. Link project: railway link"
    echo "4. Run migration: railway run npx prisma migrate deploy"
fi

echo -e "\n${GREEN}🎉 Deployment process completed!${NC}"
echo -e "${YELLOW}Please check Railway dashboard for deployment status.${NC}"
echo -e "${YELLOW}API will be available at: https://your-app.railway.app/api/v1${NC}"