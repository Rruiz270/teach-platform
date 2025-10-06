# 🚀 TEACH Platform AI Update Deployment Guide

## Overview
This guide will help you deploy the TEACH platform with the new AI Workspace integration to Railway (backend) and Vercel (frontend).

## 📋 What's New
- **AI Orchestration Service**: Multi-provider AI integration (Anthropic, OpenAI, Synthesia, etc.)
- **Unified Workspace**: All-in-one AI content creation interface
- **Auto-tracking**: Automatic project tracking and usage analytics
- **Token Management**: Usage quotas based on subscription plans
- **Fallback System**: Automatic provider switching on failure

## 🔧 Step 1: Railway Backend Deployment

### 1.1 Access Railway Dashboard
1. Go to https://railway.app/
2. Login with your GitHub account
3. Select your existing TEACH platform project or create new

### 1.2 Update Environment Variables
Add these NEW variables to your Railway project:

```bash
# Additional AI Services (Required for new features)
ANTHROPIC_API_KEY=your-anthropic-api-key
SYNTHESIA_API_KEY=your-synthesia-api-key
ELEVENLABS_API_KEY=your-elevenlabs-api-key
LINDY_API_KEY=your-lindy-api-key
D_ID_API_KEY=your-d-id-api-key
STABLE_DIFFUSION_API_KEY=your-stable-diffusion-api-key

# Existing variables (verify these are set)
NODE_ENV=production
DATABASE_URL=postgresql://[auto-provided-by-railway]
JWT_SECRET=your-secure-jwt-secret
OPENAI_API_KEY=your-openai-api-key
```

### 1.3 Deploy from GitHub
Since we've already pushed to GitHub, Railway should auto-deploy. If not:

1. In Railway dashboard → Your project
2. Click "Deploy" → "Deploy from GitHub"
3. Select branch: `main`
4. Railway will automatically:
   - Install dependencies
   - Generate Prisma client
   - Start the backend

### 1.4 Database Schema Updates
**IMPORTANT**: We need to apply the new AI integration schema.

1. In Railway dashboard → Your backend service
2. Go to "Settings" → "Deploy" → "Run Command"
3. First, generate the migration:
```bash
npx prisma migrate dev --name add_ai_workspace_integration
```

4. Then apply it:
```bash
npx prisma migrate deploy
```

## 🎨 Step 2: Vercel Frontend Deployment

### 2.1 Access Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Select your `teach-platform` project
3. Go to Settings → Environment Variables

### 2.2 Update Environment Variables
Add/Update these variables:

```bash
# API URL (update with your Railway URL)
NEXT_PUBLIC_API_URL=https://teach-backend-production.up.railway.app/api/v1

# App URL
NEXT_PUBLIC_APP_URL=https://teach-platform.vercel.app

# Auth
NEXTAUTH_SECRET=your-secure-nextauth-secret
NEXTAUTH_URL=https://teach-platform.vercel.app

# Feature Flags for AI Workspace
NEXT_PUBLIC_ENABLE_AI_WORKSPACE=true
NEXT_PUBLIC_ENABLE_AI_TRACKING=true
```

### 2.3 Deploy from GitHub
Since we've pushed to GitHub, Vercel should auto-deploy. If not:

1. In Vercel dashboard → Your project
2. Click "Redeploy"
3. Select "Redeploy with existing Build Cache cleared"

## ✅ Step 3: Verify Deployment

### 3.1 Test Backend Health
```bash
curl https://your-railway-url.railway.app/health
```

Should return:
```json
{
  "status": "healthy",
  "timestamp": "...",
  "uptime": "...",
  "version": "1.0.0",
  "database": "connected"
}
```

### 3.2 Test New AI Endpoints
```bash
# Get workspace quota
curl https://your-railway-url.railway.app/api/v1/workspace/quota \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Test text generation
curl -X POST https://your-railway-url.railway.app/api/v1/workspace/text/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"prompt": "Create a lesson outline about photosynthesis"}'
```

### 3.3 Test Frontend
1. Visit: https://teach-platform.vercel.app
2. Login with admin credentials: `admin@teach.edu.br` / `admin123`
3. Look for new "AI Workspace" section in dashboard
4. Test creating a lesson with AI

## 📊 Step 4: Monitor AI Usage

### 4.1 Check Logs
In Railway dashboard → Logs tab, look for:
- `AI task completed` messages
- Token usage tracking
- Provider switching events

### 4.2 Database Verification
Connect to your Railway PostgreSQL and verify new tables:

```sql
-- Check AI usage tracking
SELECT * FROM "AIUsage" ORDER BY "createdAt" DESC LIMIT 10;

-- Check teacher projects
SELECT * FROM "TeacherProject" WHERE "aiGenerated" = true;

-- Check user quotas
SELECT * FROM "UserAIQuota";
```

## ⚠️ Troubleshooting

### Backend Issues
```bash
# If migrations fail, reset and reapply
railway run npx prisma migrate reset --force
railway run npx prisma migrate deploy

# Check logs for API key issues
railway logs --tail 100
```

### Frontend Issues
- Clear browser cache and cookies
- Check browser console for API connection errors
- Verify NEXT_PUBLIC_API_URL is correct

### AI Provider Issues
- Verify all API keys are valid
- Check rate limits haven't been exceeded
- Monitor fallback provider activation in logs

## 🎯 Quick Deployment Commands

```bash
# Backend only (if you need to redeploy)
cd teach-platform
git add .
git commit -m "Update AI configuration"
git push origin main

# Force Railway deployment
railway up

# Frontend only (if needed)
vercel --prod
```

## 📝 Post-Deployment Checklist

- [ ] Backend health endpoint responding
- [ ] Database migrations applied successfully
- [ ] AI Workspace routes accessible (/api/v1/workspace/*)
- [ ] Frontend AI Workspace UI visible
- [ ] Test lesson creation with AI
- [ ] Test image generation
- [ ] Verify usage tracking in database
- [ ] Check quota limits working
- [ ] Test fallback providers

## 🚨 Important Notes

1. **API Keys**: You can start with just `ANTHROPIC_API_KEY` and `OPENAI_API_KEY`. Other providers are optional.

2. **Free Tier Limits**: The FREE plan allows 50,000 tokens/month. Monitor usage carefully.

3. **Costs**: Each provider charges differently. Monitor your usage to control costs.

4. **Data Privacy**: All AI-generated content is stored in your database. Ensure LGPD compliance.

## 📞 Support

If deployment fails:
1. Check Railway/Vercel logs
2. Verify all environment variables
3. Ensure database connection is working
4. Check GitHub repository for latest changes

---

**Ready to revolutionize Brazilian education with AI? Deploy now! 🇧🇷🤖✨**