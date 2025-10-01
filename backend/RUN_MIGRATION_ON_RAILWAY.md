# ⚠️ CRITICAL: Run Database Migration on Railway

After the backend deploys, you MUST run this command in Railway:

```bash
npx prisma migrate deploy
```

## How to run:

### Option 1: Railway CLI (Recommended)
```bash
# If not installed:
npm install -g @railway/cli

# Login and link:
railway login
railway link

# Run migration:
railway run npx prisma migrate deploy
```

### Option 2: Railway Web Console
1. Go to Railway dashboard
2. Select your backend service
3. Go to "Settings" → "Deploy" → "Run Command"
4. Enter: `npx prisma migrate deploy`
5. Click "Run"

### Option 3: Generate migration first
If the migration file doesn't exist yet:
```bash
railway run npx prisma migrate dev --name add_calendar_system
```

## What this creates:
- Event table (for calendar events)
- EventRegistration table (for user registrations)
- EventResource table (for event materials)
- EventType and RegistrationStatus enums

## Verify it worked:
After migration, test the API:
```
GET https://your-app.railway.app/api/v1/events
```

Should return: `{"success": true, "data": {"events": [], ...}}`

## If migration fails:
Check Railway logs for errors. Common issues:
- Database connection issues
- Permissions problems
- Schema conflicts

**WITHOUT THIS MIGRATION, THE CALENDAR API WILL NOT WORK!**