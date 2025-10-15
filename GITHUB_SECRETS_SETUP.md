# 🔐 GitHub Secrets Setup for CI/CD

## Required Secrets for Automated Deployment

### 1. Vercel Secrets (Frontend)

1. **Get Vercel Token**
   - Go to https://vercel.com/account/tokens
   - Create new token with name "TEACH Platform"
   - Copy the token

2. **Get Org and Project IDs**
   - Deploy once manually to Vercel first
   - Go to your project settings in Vercel
   - Find these in the URL or project settings:
     - Organization ID
     - Project ID

3. **Add to GitHub Secrets**
   Go to your GitHub repo → Settings → Secrets → Actions → New repository secret
   
   ```
   VERCEL_TOKEN = your-vercel-token
   VERCEL_ORG_ID = your-org-id
   VERCEL_PROJECT_ID = your-project-id
   ```

### 2. Railway Secrets (Backend)

1. **Get Railway Token**
   - Go to https://railway.app/account/tokens
   - Create new token
   - Copy the token

2. **Add to GitHub Secrets**
   ```
   RAILWAY_TOKEN = your-railway-token
   ```

## How to Add Secrets to GitHub

1. Go to https://github.com/Rruiz270/teach-platform
2. Click "Settings" tab
3. Scroll down to "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Add each secret one by one

## Verify Secrets

After adding all secrets, you should have:
- [ ] VERCEL_TOKEN
- [ ] VERCEL_ORG_ID
- [ ] VERCEL_PROJECT_ID
- [ ] RAILWAY_TOKEN

## Testing the Workflow

1. Make a small change to README.md
2. Commit and push to main branch
3. Go to Actions tab in GitHub
4. Watch the deployment workflow run

## Manual Deployment Commands

If you prefer manual deployment:

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend
vercel --prod
```

### Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy backend
cd backend
railway up
```

## Environment Variables for Local Development

Create these files for local development:

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

### Backend (.env)
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://teach_user:teach_pass@localhost:5432/teach_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-dev-secret
ANTHROPIC_API_KEY=your-claude-key
```

## Deployment Checklist

Before pushing to main:
- [ ] All tests pass locally
- [ ] Environment variables are set in Vercel
- [ ] Environment variables are set in Railway
- [ ] GitHub secrets are configured
- [ ] Database is migrated and seeded

## Troubleshooting

### Deployment Failed
- Check GitHub Actions logs
- Verify all secrets are set correctly
- Ensure project builds locally first

### Can't find Vercel Project ID
- Deploy once manually through Vercel dashboard
- Check project URL: `vercel.com/[org]/[project]/...`

### Railway deployment issues
- Make sure you've created the project in Railway first
- Service name must match what's in the workflow

---

Need help? Check the deployment logs in GitHub Actions tab!