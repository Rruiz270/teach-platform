# Vercel Environment Variables Setup

To make authentication work in production, you need to set these environment variables in your Vercel dashboard:

## Required Environment Variables

### 1. Go to your Vercel dashboard
- Visit: https://vercel.com/dashboard
- Select your `teach-platform` project
- Go to Settings → Environment Variables

### 2. Add these variables:

```
NEXT_PUBLIC_API_URL=https://your-backend-api.railway.app/api/v1
NEXT_PUBLIC_APP_URL=https://teach-platform-chhik49tw-raphael-ruizs-projects.vercel.app
NEXTAUTH_SECRET=teach-platform-secret-2024-change-in-production-secure-random-string
NEXTAUTH_URL=https://teach-platform-chhik49tw-raphael-ruizs-projects.vercel.app
```

### 3. Optional AI API Keys (for future AI features):
```
NEXT_PUBLIC_OPENAI_API_KEY=sk-...
NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_GOOGLE_AI_API_KEY=...
```

### 4. Feature Flags:
```
NEXT_PUBLIC_ENABLE_AI_CHAT=true
NEXT_PUBLIC_ENABLE_VIDEO_STREAMING=true
NEXT_PUBLIC_ENABLE_COMMUNITY=true
```

## Backend API Setup

Since we don't have the backend deployed yet, you have two options:

### Option A: Deploy Backend to Railway/Heroku
1. Deploy the backend code to Railway or Heroku
2. Update `NEXT_PUBLIC_API_URL` with the deployed URL

### Option B: Use Mock Authentication (for testing)
- Keep `NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1`
- The frontend will show connection errors, but you can test the UI

## Current Status
- ✅ Frontend authentication UI complete
- ✅ JWT token management implemented
- ✅ Form validation and error handling
- ⏳ Backend deployment needed for full functionality

## Next Steps
1. Set environment variables in Vercel
2. Deploy backend API
3. Test complete authentication flow