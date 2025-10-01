#!/bin/bash

# TEACH Platform Frontend Deployment Script
# This script automates the frontend deployment process

echo "🚀 Starting TEACH Platform Frontend Deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the frontend directory
if [ ! -f "package.json" ] || [ ! -d "src/app" ]; then
    echo -e "${RED}Error: Not in frontend directory. Please run from frontend folder.${NC}"
    exit 1
fi

# Step 1: Check for TypeScript errors
echo -e "\n${YELLOW}Checking for TypeScript errors...${NC}"
npm run type-check 2>/dev/null || npx tsc --noEmit
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ No TypeScript errors found${NC}"
else
    echo -e "${RED}✗ TypeScript errors found. Fix them before deploying.${NC}"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Step 2: Check for uncommitted changes
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

# Step 3: Build locally to check for errors (optional)
read -p "Do you want to test the build locally first? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "\n${YELLOW}Building project...${NC}"
    npm run build
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Build successful${NC}"
    else
        echo -e "${RED}✗ Build failed${NC}"
        exit 1
    fi
fi

# Step 4: Push to GitHub
echo -e "\n${YELLOW}Pushing to GitHub...${NC}"
git push origin main
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Code pushed to GitHub successfully${NC}"
else
    echo -e "${RED}✗ GitHub push failed${NC}"
    exit 1
fi

# Step 5: Check Vercel deployment (if Vercel CLI is installed)
if command -v vercel &> /dev/null; then
    echo -e "\n${YELLOW}Vercel CLI detected.${NC}"
    read -p "Do you want to check deployment status? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        vercel --prod --yes
    fi
else
    echo -e "\n${YELLOW}Vercel will automatically deploy from GitHub.${NC}"
    echo "Check deployment status at: https://vercel.com/dashboard"
fi

echo -e "\n${GREEN}🎉 Deployment process completed!${NC}"
echo -e "${YELLOW}Check Vercel dashboard for deployment status.${NC}"
echo -e "${YELLOW}Frontend will be available at: https://teach-platform.vercel.app${NC}"

# Remind about environment variables
echo -e "\n${YELLOW}⚠️  Remember to verify environment variables in Vercel:${NC}"
echo "- NEXT_PUBLIC_API_URL should point to your Railway backend"