# TEACH Platform - Deployment Guide

## 🚀 Vercel Deployment (Frontend)

### Prerequisites
1. GitHub repository: `https://github.com/Rruiz270/teach-platform`
2. Vercel account
3. Domain (optional)

### Steps

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Select `teach-platform` repository
   - Set framework preset to "Next.js"
   - Set root directory to `frontend`

2. **Environment Variables**
   ```env
   NEXT_PUBLIC_APP_URL=https://teach.vercel.app
   NEXT_PUBLIC_API_URL=https://your-backend-api.com/api/v1
   NEXTAUTH_SECRET=your-nextauth-secret-here
   NEXTAUTH_URL=https://teach.vercel.app
   NEXT_PUBLIC_OPENAI_API_KEY=your-openai-key
   NEXT_PUBLIC_ANTHROPIC_API_KEY=your-anthropic-key
   NEXT_PUBLIC_GOOGLE_AI_API_KEY=your-google-key
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait for build completion
   - Visit your deployment URL

### Domain Setup (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

---

## 🖥️ Backend Deployment Options

### Option 1: Railway (Recommended)
1. **Setup**
   - Go to [railway.app](https://railway.app)
   - Connect GitHub account
   - Click "New Project" → "Deploy from GitHub repo"
   - Select `teach-platform` repository
   - Set root directory to `backend`

2. **Environment Variables**
   ```env
   NODE_ENV=production
   PORT=3001
   DATABASE_URL=postgresql://user:pass@host:5432/teach_db
   REDIS_URL=redis://host:6379
   JWT_SECRET=your-production-jwt-secret
   AWS_ACCESS_KEY_ID=your-aws-key
   AWS_SECRET_ACCESS_KEY=your-aws-secret
   OPENAI_API_KEY=your-openai-key
   ANTHROPIC_API_KEY=your-anthropic-key
   GOOGLE_AI_API_KEY=your-google-key
   FRONTEND_URL=https://teach.vercel.app
   ```

3. **Database Setup**
   - Add PostgreSQL plugin
   - Add Redis plugin
   - Copy connection URLs to environment variables

### Option 2: Heroku
1. **Prerequisites**
   - Heroku CLI installed
   - Heroku account

2. **Deployment**
   ```bash
   # Create Heroku app
   heroku create teach-platform-api
   
   # Add buildpack for monorepo
   heroku buildpacks:set https://github.com/timanovsky/subdir-heroku-buildpack
   heroku config:set PROJECT_PATH=backend
   heroku buildpacks:add heroku/nodejs
   
   # Add database
   heroku addons:create heroku-postgresql:mini
   heroku addons:create heroku-redis:mini
   
   # Set environment variables
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-jwt-secret
   # ... (add all other env vars)
   
   # Deploy
   git subtree push --prefix=backend heroku main
   ```

### Option 3: AWS (Advanced)
1. **Services Needed**
   - EC2 or ECS for application
   - RDS for PostgreSQL
   - ElastiCache for Redis
   - ALB for load balancing
   - Route 53 for DNS

2. **Setup** (using AWS CDK or Terraform recommended)

---

## 🗄️ Database Setup

### Production Database Migration
```bash
# After setting DATABASE_URL
cd backend
npm run generate
npm run migrate
npm run seed
```

### Backup Strategy
- Daily automated backups
- Point-in-time recovery
- Cross-region replication (optional)

---

## 🔐 Security Configuration

### SSL/TLS
- Vercel provides SSL automatically
- Backend: Use SSL termination at load balancer

### CORS Setup
```typescript
// backend/src/index.ts
app.use(cors({
  origin: ['https://teach.vercel.app', 'https://teach.edu.br'],
  credentials: true
}));
```

### Rate Limiting
- Already configured in middleware
- Adjust limits for production load

---

## 📊 Monitoring Setup

### Frontend (Vercel)
- Built-in analytics
- Performance monitoring
- Error tracking with Sentry

### Backend
- Health check endpoint: `/health`
- Application metrics with DataDog
- Error tracking with Sentry
- Log aggregation with CloudWatch

---

## 🚨 Environment Variables Reference

### Frontend (.env.local)
```env
# Required
NEXT_PUBLIC_APP_URL=https://teach.vercel.app
NEXT_PUBLIC_API_URL=https://api.teach.edu.br/api/v1
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://teach.vercel.app

# AI APIs (optional - can be backend-only)
NEXT_PUBLIC_OPENAI_API_KEY=sk-...
NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_GOOGLE_AI_API_KEY=AI...

# Analytics (optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-...
NEXT_PUBLIC_HOTJAR_ID=...
```

### Backend (.env)
```env
# Application
NODE_ENV=production
PORT=3001
API_URL=https://api.teach.edu.br

# Database
DATABASE_URL=postgresql://user:pass@host:5432/teach_db

# Cache
REDIS_URL=redis://host:6379

# Authentication
JWT_SECRET=your-super-secret-jwt-key-256-bits-minimum
JWT_EXPIRES_IN=30d
REFRESH_TOKEN_EXPIRES_IN=90d

# AWS
AWS_REGION=sa-east-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET_NAME=teach-platform-content

# AI APIs
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=AI...

# Email
SENDGRID_API_KEY=SG...
FROM_EMAIL=noreply@teach.edu.br

# Monitoring
SENTRY_DSN=https://...

# CORS
FRONTEND_URL=https://teach.vercel.app
ALLOWED_ORIGINS=https://teach.vercel.app,https://teach.edu.br

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 🧪 Testing Deployment

### Frontend Tests
```bash
cd frontend
npm run build
npm run start
# Visit http://localhost:3000
```

### Backend Tests
```bash
cd backend
npm run build
npm run start
# Visit http://localhost:3001/health
```

### API Tests
```bash
# Test authentication
curl -X POST https://api.teach.edu.br/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@teach.edu.br","password":"admin123"}'

# Test AI endpoint (with token)
curl -X POST https://api.teach.edu.br/api/v1/ai/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-jwt-token" \
  -d '{"tool":"chatgpt","prompt":"Hello!"}'
```

---

## 📈 Scaling Considerations

### Frontend (Vercel)
- Automatic scaling
- Edge caching
- Global CDN

### Backend Scaling
- Horizontal scaling with load balancer
- Database read replicas
- Redis clustering
- Microservices migration (future)

### Database Optimization
- Connection pooling
- Query optimization
- Indexing strategy
- Caching layer

---

## 🔄 CI/CD Pipeline

### GitHub Actions (Recommended)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./frontend
  
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        uses: bervProject/railway-deploy@v1.0.0
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: teach-backend
```

---

## 📞 Support & Maintenance

### Health Monitoring
- Frontend: Vercel dashboard
- Backend: `/health` endpoint
- Database: Connection monitoring
- AI APIs: Usage and error rates

### Backup & Recovery
- Database: Daily automated backups
- File uploads: S3 versioning
- Configuration: Infrastructure as code

### Updates & Patches
- Security updates: Weekly
- Feature updates: Bi-weekly
- Database migrations: Carefully planned

---

**🎉 Your TEACH platform is now ready for production deployment!**

Follow these steps to deploy to Vercel and your chosen backend provider. The platform is designed to scale with your user base and can handle the planned 1,000 teacher pilot launch.