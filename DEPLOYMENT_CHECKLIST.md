# 🚀 TEACH Platform Deployment Checklist

## 📋 Pre-Deployment Verification

### Backend Changes
- [x] Added Event, EventRegistration, EventResource models to schema.prisma
- [x] Created events.routes.ts with full CRUD operations
- [x] Updated routes/index.ts to include event routes
- [x] Added EventType and RegistrationStatus enums

### Frontend Changes
- [x] Created Calendar.tsx component
- [x] Created SuperAdmin dashboard page
- [x] Created calendar page
- [x] Created eventService.ts for API integration
- [x] Updated dashboard with calendar link
- [x] Added Calendar icon import

## 🔧 Step 1: Backend Deployment (Railway)

### 1.1 Prepare and Push Code
```bash
cd backend

# Check current status
git status

# Add all changes
git add .

# Commit with descriptive message
git commit -m "feat: Add calendar system with event management API

- Add Event, EventRegistration, EventResource models
- Create complete event management API endpoints
- Add role-based permissions for event creation
- Support for live classes, workshops, mentoring, etc."

# Push to main branch (Railway auto-deploys from main)
git push origin main
```

### 1.2 Run Database Migration on Railway

**Option A: Using Railway CLI (Recommended)**
```bash
# Install Railway CLI if not installed
npm install -g @railway/cli

# Login to Railway
railway login

# Link to your project
railway link

# Run migration
railway run npx prisma migrate deploy
```

**Option B: Using Railway Web Console**
1. Go to Railway dashboard
2. Select your backend service
3. Go to "Settings" → "Deploy" → "Run Command"
4. Run: `npx prisma migrate deploy`

**Option C: Create Migration First (if needed)**
```bash
# If you haven't created the migration file yet
npx prisma migrate dev --name add_calendar_system

# This will create a migration file, then push and deploy
```

### 1.3 Verify Backend Deployment
- Check Railway logs for successful deployment
- Test API endpoint: `https://your-railway-url.railway.app/api/v1/events`
- Should return empty events array if working

## 🎨 Step 2: Frontend Deployment (Vercel)

### 2.1 Prepare and Push Code
```bash
cd ../frontend

# Check current status
git status

# Add all changes
git add .

# Commit with descriptive message
git commit -m "feat: Add calendar UI and superadmin dashboard

- Add full calendar component with month/week/list views
- Create superadmin dashboard with role-based tiles
- Add event registration/unregistration functionality
- Integrate with backend event API"

# Push to main branch (Vercel auto-deploys from main)
git push origin main
```

### 2.2 Verify Frontend Deployment
- Check Vercel dashboard for build status
- Wait for "Ready" status
- Test new routes:
  - `/calendar` - Calendar page
  - `/superadmin` - SuperAdmin dashboard

## ✅ Step 3: Post-Deployment Testing

### 3.1 Test Calendar Functionality
1. Login as a teacher/professor
2. Navigate to Dashboard → "Calendário de Eventos"
3. Verify mock events appear
4. Test registration/unregistration
5. Check event filters work

### 3.2 Test SuperAdmin Access
1. Login with SUPER_ADMIN role user
2. Should auto-redirect to /superadmin
3. Test navigation tiles:
   - Admin Area → /admin
   - Professor Area → /dashboard
   - AI Maestro Area → /maestro-dashboard

### 3.3 Test Event API (Admin/AI_Maestro only)
1. Login as ADMIN or AI_MAESTRO
2. Try creating an event via calendar
3. Verify it appears for other users
4. Test registration limits

## ⚠️ Troubleshooting

### If Backend Fails
```bash
# Check logs
railway logs

# Common issues:
# 1. Migration not run - run: railway run npx prisma migrate deploy
# 2. Environment variables - check DATABASE_URL is set
# 3. Build errors - check package.json scripts
```

### If Frontend Fails
```bash
# Common issues:
# 1. API URL mismatch - verify NEXT_PUBLIC_API_URL in Vercel env
# 2. Build errors - check for TypeScript errors
# 3. Missing dependencies - verify all imports
```

### Database Migration Issues
```bash
# Reset and reapply migrations (CAUTION: may lose data)
railway run npx prisma migrate reset

# Generate Prisma client
railway run npx prisma generate
```

## 📝 Environment Variables to Verify

### Railway (Backend)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - For authentication
- `ANTHROPIC_API_KEY` - For AI features
- `NODE_ENV` - Should be "production"
- `CORS_ORIGIN` - Should include your Vercel URLs

### Vercel (Frontend)
- `NEXT_PUBLIC_API_URL` - Your Railway backend URL
- Should be format: `https://your-app.railway.app` (without /api/v1)

## 🎯 Quick Commands Summary

```bash
# Backend deployment
cd backend && git add . && git commit -m "feat: Calendar system" && git push origin main

# Run migration
railway run npx prisma migrate deploy

# Frontend deployment  
cd ../frontend && git add . && git commit -m "feat: Calendar UI" && git push origin main

# Check deployments
echo "Railway: https://your-app.railway.app"
echo "Vercel: https://teach-platform.vercel.app"
```

## 📅 Expected Timeline
- Backend push → Railway deployment: ~2-3 minutes
- Database migration: ~30 seconds
- Frontend push → Vercel deployment: ~1-2 minutes
- Total deployment time: ~5-6 minutes

## 🔍 Final Verification
- [ ] Backend API responding at /api/v1/events
- [ ] Frontend calendar page loading
- [ ] SuperAdmin dashboard accessible
- [ ] Event creation working (Admin/AI_Maestro)
- [ ] Event registration working (Teachers)
- [ ] No console errors in browser
- [ ] No errors in Railway/Vercel logs

---

**Note**: Always backup your database before running migrations in production!