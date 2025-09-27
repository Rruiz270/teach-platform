# Railway Deployment Guide for TEACH Backend

## Step 1: Setup Railway Account
1. Go to https://railway.app/
2. Sign up/login with GitHub
3. Connect your GitHub account

## Step 2: Create New Project
1. Click "New Project" 
2. Select "Deploy from GitHub repo"
3. Choose `Rruiz270/teach-platform`
4. Select the `backend` folder

## Step 3: Add PostgreSQL Database
1. In your Railway project dashboard
2. Click "New Service" → "Database" → "PostgreSQL"
3. Railway will automatically create a PostgreSQL instance

## Step 4: Configure Environment Variables
In Railway dashboard → Variables tab, add these:

### Required Variables:
```
NODE_ENV=production
PORT=3001
JWT_SECRET=teach-platform-jwt-secret-production-2024-change-this
JWT_ACCESS_EXPIRATION_MINUTES=30
JWT_REFRESH_EXPIRATION_DAYS=30
CORS_ORIGIN=https://teach-platform-chhik49tw-raphael-ruizs-projects.vercel.app
FRONTEND_URL=https://teach-platform-chhik49tw-raphael-ruizs-projects.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Database (Auto-populated by Railway):
```
DATABASE_URL=postgresql://postgres:password@hostname:port/database
```

## Step 5: Deploy
1. Railway will automatically build and deploy
2. Wait for deployment to complete
3. Note the deployment URL (e.g., `https://teach-backend-production.up.railway.app`)

## Step 6: Update Vercel Environment Variables
Go back to Vercel dashboard and update:
```
NEXT_PUBLIC_API_URL=https://your-railway-url.up.railway.app/api/v1
```

## Step 7: Run Database Migrations
In Railway dashboard:
1. Go to your service
2. Open the terminal/console
3. Run: `npm run migrate:prod`

## Alternative: Manual GitHub Deployment
If you have Railway CLI installed:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Link to project
railway link

# Deploy
railway up
```

## Troubleshooting
- If build fails, check the build logs in Railway dashboard
- Ensure all environment variables are set
- Database URL should be automatically provided by Railway
- Check that PORT is set to 3001 or use Railway's PORT variable

## Expected API Endpoints
Once deployed, your API will be available at:
- `https://your-domain.up.railway.app/api/v1/auth/register`
- `https://your-domain.up.railway.app/api/v1/auth/login`
- `https://your-domain.up.railway.app/api/v1/health`