# 🚀 Quick Deploy Commands

## Backend (Railway)
```bash
cd backend
./deploy.sh
```

Or manually:
```bash
cd backend
git add .
git commit -m "feat: Add calendar system and event management"
git push origin main

# Then run migration on Railway:
railway run npx prisma migrate deploy
```

## Frontend (Vercel)
```bash
cd frontend
./deploy.sh
```

Or manually:
```bash
cd frontend
git add .
git commit -m "feat: Add calendar UI and superadmin dashboard"
git push origin main
```

## 🔍 What's New After Deploy:

### For Teachers/Professors:
- **Calendar Access**: Dashboard → "Calendário de Eventos" button
- **Event Registration**: Register for AI Maestro classes, workshops, mentoring
- **Meeting Links**: Get meeting URLs after registration

### For SuperAdmins:
- **SuperAdmin Panel**: Auto-redirect to /superadmin when logging in
- **Quick Access Tiles**: Jump to Admin, Professor, or AI Maestro areas
- **System Monitoring**: View user stats, system resources, metrics

### For Admins/AI Maestros:
- **Event Creation**: Create live classes, workshops, webinars
- **Manage Registrations**: Track who's registered for events
- **Link to Modules**: Connect events to specific lessons

## ⚠️ Critical Migration Step:

After pushing backend code, you MUST run:
```bash
railway run npx prisma migrate deploy
```

Without this, the Events tables won't exist and the API will crash!