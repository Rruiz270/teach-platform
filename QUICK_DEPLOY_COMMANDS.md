# 🚀 Quick Deploy Commands - TEACH Platform

## Frontend (Vercel) - 5 minutes

```bash
# 1. Login to Vercel
vercel login

# 2. Deploy frontend
cd frontend
vercel

# 3. Follow prompts:
# - Setup and deploy? Y
# - Scope: (select your account)
# - Link to existing? N
# - Project name: teach-platform-frontend
# - Directory: ./ (just press enter)
# - Override settings? N
```

Your frontend will be deployed to: `https://teach-platform-frontend-[random].vercel.app`

## Backend (Railway) - 10 minutes

```bash
# 1. Login to Railway
railway login

# 2. Initialize new project
cd ../backend
railway init
# Project name: teach-platform-backend

# 3. Add PostgreSQL
railway add
# Select: PostgreSQL

# 4. Add Redis
railway add
# Select: Redis

# 5. Link and deploy
railway link
railway up
```

## Configure Railway Environment

1. Go to https://railway.app/dashboard
2. Click on your project
3. Click on your backend service
4. Go to "Variables" tab
5. Add these variables:

```env
NODE_ENV=production
PORT=3001
JWT_SECRET=change-this-to-a-random-string-at-least-32-chars
JWT_EXPIRES_IN=30d
REFRESH_TOKEN_EXPIRES_IN=90d

# These will auto-populate from your services
DATABASE_URL=${{Postgres.DATABASE_URL}}
REDIS_URL=${{Redis.REDIS_URL}}

# Add your API keys
ANTHROPIC_API_KEY=your-claude-api-key
OPENAI_API_KEY=sk-...
GOOGLE_AI_API_KEY=AI...

# Update with your Vercel URL
FRONTEND_URL=https://teach-platform-frontend-xxx.vercel.app
ALLOWED_ORIGINS=https://teach-platform-frontend-xxx.vercel.app

# Email (optional)
FROM_EMAIL=noreply@teach.edu.br
```

## Run Database Migrations

```bash
# In backend directory
railway run npm run generate
railway run npm run migrate
railway run npm run seed
```

## Update Vercel Frontend

1. Go to https://vercel.com/dashboard
2. Click on your frontend project
3. Go to Settings → Environment Variables
4. Add:
   ```
   NEXT_PUBLIC_API_URL = https://teach-platform-backend-production.up.railway.app/api/v1
   ```
5. Go to Deployments → Redeploy

## Test Your Deployment

```bash
# Test backend
curl https://teach-platform-backend-production.up.railway.app/health

# Test frontend
# Visit your Vercel URL in browser

# Login credentials
# Email: admin@teach.edu.br
# Password: admin123
```

## Troubleshooting

### Vercel Issues
- If login fails: `npx vercel login`
- If deploy fails: Check Node version (needs 18+)

### Railway Issues
- If login fails: `npx @railway/cli login`
- If deploy fails: Check logs in Railway dashboard
- Database connection issues: Wait 2-3 minutes for services to start

### Common Fixes
```bash
# If migrations fail
railway run npx prisma generate
railway run npx prisma migrate deploy

# Check Railway logs
railway logs

# Restart service
railway restart
```

## Success Checklist
- [ ] Frontend loads without errors
- [ ] Can see TEACH homepage
- [ ] Backend health check returns {"status":"ok"}
- [ ] Can login with admin credentials
- [ ] AI chat shows (may have API errors if keys not set)

## 🎉 That's it! Your platform is deployed!