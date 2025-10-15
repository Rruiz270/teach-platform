# 🚀 TEACH Platform - Deployment Setup Guide

## Current Status
- ✅ GitHub Repository: https://github.com/Rruiz270/teach-platform
- ✅ Deployment configurations ready
- ⏳ Awaiting deployment to Railway (Backend) and Vercel (Frontend)

## 📋 Quick Deployment Steps

### 1️⃣ Deploy Frontend to Vercel (5 minutes)

1. **Go to Vercel**
   - Visit https://vercel.com
   - Click "Sign Up" or "Log In" (use GitHub)

2. **Import Project**
   - Click "New Project"
   - Import from GitHub
   - Select `Rruiz270/teach-platform`

3. **Configure Project**
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend` ⚠️ IMPORTANT
   - **Build Command**: (leave default)
   - **Output Directory**: (leave default)

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   NEXT_PUBLIC_API_URL = https://your-railway-backend.up.railway.app/api/v1
   ```
   (Update this after deploying backend)

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - You'll get a URL like: `teach-platform-frontend.vercel.app`

### 2️⃣ Deploy Backend to Railway (10 minutes)

1. **Go to Railway**
   - Visit https://railway.app
   - Click "Login with GitHub"

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `Rruiz270/teach-platform`

3. **Configure Service**
   - **Service Name**: teach-backend
   - **Root Directory**: `/backend` ⚠️ IMPORTANT
   - Railway will auto-detect the build settings

4. **Add Database Services**
   In Railway dashboard:
   - Click "+ New" → "Database" → "PostgreSQL"
   - Click "+ New" → "Database" → "Redis"

5. **Configure Environment Variables**
   Go to your service → Variables tab and add:

   ```env
   # Copy these from your PostgreSQL service
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   
   # Copy these from your Redis service  
   REDIS_URL=${{Redis.REDIS_URL}}
   
   # Add these manually
   NODE_ENV=production
   PORT=3001
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   # AI APIs (Add the ones you have)
   ANTHROPIC_API_KEY=your-claude-api-key
   OPENAI_API_KEY=your-openai-api-key
   GOOGLE_AI_API_KEY=your-google-ai-api-key
   
   # Frontend URL (update after Vercel deployment)
   FRONTEND_URL=https://teach-platform-frontend.vercel.app
   ALLOWED_ORIGINS=https://teach-platform-frontend.vercel.app
   
   # Optional (can add later)
   AWS_ACCESS_KEY_ID=your-aws-key
   AWS_SECRET_ACCESS_KEY=your-aws-secret
   S3_BUCKET_NAME=teach-platform-content
   SENDGRID_API_KEY=your-sendgrid-key
   FROM_EMAIL=noreply@teach.edu.br
   ```

6. **Deploy**
   - Railway will automatically deploy
   - Get your backend URL (e.g., `teach-backend.up.railway.app`)

7. **Run Database Migrations**
   In Railway dashboard:
   - Go to your backend service
   - Click "Settings" → "Deploy" → "Run Command"
   - Run: `npm run migrate`
   - Then run: `npm run seed`

### 3️⃣ Update Frontend with Backend URL

1. **Go back to Vercel**
   - Project Settings → Environment Variables
   - Update: `NEXT_PUBLIC_API_URL = https://teach-backend.up.railway.app/api/v1`
   - Redeploy by going to Deployments → Redeploy

### 4️⃣ Test Your Deployment

1. **Test Backend Health**
   ```bash
   curl https://teach-backend.up.railway.app/health
   ```

2. **Test Frontend**
   - Visit your Vercel URL
   - Should see the TEACH platform homepage

3. **Test Login**
   - Email: `admin@teach.edu.br`
   - Password: `admin123`

## 🔧 Troubleshooting

### Frontend Issues
- **Build fails**: Check Node version (needs 18+)
- **API connection fails**: Verify NEXT_PUBLIC_API_URL is correct
- **Blank page**: Check browser console for errors

### Backend Issues
- **Database connection fails**: Verify DATABASE_URL in Railway
- **Migration fails**: Run `npm run generate` first, then `npm run migrate`
- **Redis connection fails**: Check REDIS_URL is set correctly

### Common Fixes
```bash
# If migrations fail, try:
npm run generate
npm run migrate:deploy

# If seed fails, check if database is empty first
npm run seed
```

## 📊 Post-Deployment Checklist

- [ ] Frontend loads without errors
- [ ] Can navigate between pages
- [ ] Login works with test credentials
- [ ] AI Chat interface appears (may show API key errors)
- [ ] Backend health check returns OK
- [ ] Database has seed data

## 🎯 Next Steps After Deployment

1. **Add Custom Domain** (Optional)
   - Vercel: Settings → Domains
   - Railway: Settings → Domains

2. **Configure AI APIs**
   - Add your API keys to Railway environment variables
   - Test each AI endpoint

3. **Set up Monitoring**
   - Add Sentry DSN for error tracking
   - Enable Vercel Analytics

4. **Security**
   - Change default JWT_SECRET
   - Update admin password
   - Configure CORS for your domains

## 💰 Estimated Costs

### Free Tier Limits
- **Vercel**: Free for personal use
- **Railway**: $5 credit/month free
- **PostgreSQL**: ~500MB free
- **Redis**: ~100MB free

### For Pilot (1,000 users)
- **Vercel**: ~$20/month (Pro plan)
- **Railway**: ~$20-50/month
- **Total**: ~$40-70/month

## 🚨 Important URLs to Save

After deployment, save these URLs:

```
Frontend URL: https://[your-app].vercel.app
Backend URL: https://[your-app].up.railway.app
API Base URL: https://[your-app].up.railway.app/api/v1
Health Check: https://[your-app].up.railway.app/health
```

## 📞 Need Help?

1. **Vercel Issues**: https://vercel.com/docs
2. **Railway Issues**: https://docs.railway.app
3. **TEACH Platform**: Check the README.md and DEPLOYMENT.md

---

**Ready to deploy? The whole process should take about 15-20 minutes!** 🚀