import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';
import { setupRoutes } from './routes';
import { prisma } from './config/database';
import { initializeRedis } from './config/redis';
import { initializeQueues } from './config/queues';

dotenv.config();

const app: Application = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3001;

// Trust proxy for Railway (more secure configuration)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // Trust first proxy (Railway)
}

// Middleware
app.use(helmet());

// Dynamic CORS configuration to accept all Vercel preview deployments
const corsOptions = {
  origin: function (origin: any, callback: any) {
    const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || [];
    
    // Log for debugging in production
    if (process.env.NODE_ENV === 'production') {
      logger.info(`CORS request from origin: ${origin}`);
    }
    
    // Allow all teach-platform Vercel deployments
    if (!origin || 
        allowedOrigins.includes(origin) || 
        (origin && origin.includes('teach-platform') && origin.includes('vercel.app')) ||
        (origin && origin.includes('localhost'))) {
      callback(null, true);
    } else {
      logger.warn(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['X-Total-Count']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(rateLimiter);

// Health check
app.get('/health', async (req, res) => {
  try {
    // Try to count users in database
    const userCount = await prisma.user.count();
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      database: 'connected',
      userCount
    });
  } catch (error: any) {
    res.json({ 
      status: 'error', 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      database: 'error',
      error: error.message
    });
  }
});

// Migration status check
app.get('/db-status', async (req, res) => {
  try {
    // Check if tables exist by listing them
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;
    
    res.json({
      databaseUrl: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
      tables,
      tableCount: Array.isArray(tables) ? tables.length : 0
    });
  } catch (error: any) {
    res.json({
      error: error.message,
      code: error.code,
      databaseUrl: process.env.DATABASE_URL ? 'SET' : 'NOT SET'
    });
  }
});

// Create essential tables manually (TEMPORARY - REMOVE AFTER USE)
app.post('/create-tables-emergency', async (req, res) => {
  try {
    const { secretKey } = req.body;
    
    // Simple security check
    if (secretKey !== 'teach-platform-setup-2025') {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    // Create essential tables for auth to work
    // PostgreSQL doesn't support IF NOT EXISTS for types, so we'll handle errors
    try {
      await prisma.$executeRaw`
        CREATE TYPE "Role" AS ENUM ('TEACHER', 'ADMIN', 'PARENT', 'AI_MAESTRO', 'SUPER_ADMIN');
      `;
    } catch (e) {}
    
    try {
      await prisma.$executeRaw`
        CREATE TYPE "TeachingLevel" AS ENUM ('EARLY_YEARS', 'ELEMENTARY', 'JUNIOR_HIGH', 'HIGH_SCHOOL', 'UNIVERSITY');
      `;
    } catch (e) {}
    
    try {
      await prisma.$executeRaw`
        CREATE TYPE "SubscriptionType" AS ENUM ('FREE', 'INDIVIDUAL', 'SCHOOL', 'GOVERNMENT');
      `;
    } catch (e) {}
    
    try {
      await prisma.$executeRaw`
        CREATE TYPE "SubscriptionPlan" AS ENUM ('STARTER', 'FULL', 'PREMIUM');
      `;
    } catch (e) {}
    
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
        "email" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "role" "Role" NOT NULL DEFAULT 'TEACHER',
        "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
        "emailVerifiedAt" TIMESTAMP(3),
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "lastLoginAt" TIMESTAMP(3),
        CONSTRAINT "User_pkey" PRIMARY KEY ("id")
      );
    `;
    
    await prisma.$executeRaw`
      CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
    `;
    
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Profile" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
        "userId" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "phone" TEXT,
        "photoUrl" TEXT,
        "schoolId" TEXT,
        "teachingLevel" "TeachingLevel" NOT NULL,
        "subjects" TEXT[],
        "state" TEXT NOT NULL,
        "city" TEXT NOT NULL,
        "bio" TEXT,
        "yearsTeaching" INTEGER,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Profile_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "Profile_userId_key" UNIQUE ("userId"),
        CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
    `;
    
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Subscription" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
        "userId" TEXT NOT NULL,
        "schoolId" TEXT,
        "type" "SubscriptionType" NOT NULL,
        "plan" "SubscriptionPlan" NOT NULL,
        "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "endDate" TIMESTAMP(3) NOT NULL,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "autoRenew" BOOLEAN NOT NULL DEFAULT true,
        "paymentMethod" TEXT,
        "amount" DECIMAL(65,30),
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "Subscription_userId_key" UNIQUE ("userId"),
        CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
    `;
    
    res.json({
      success: true,
      message: 'Essential tables created successfully!'
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
      detail: error.detail || error.hint
    });
  }
});

// Test registration endpoint (TEMPORARY)
app.post('/test-simple-register', async (req, res) => {
  try {
    // Create a basic user
    const user = await prisma.user.create({
      data: {
        email: 'test' + Date.now() + '@example.com',
        password: 'hashedpassword',
        role: 'TEACHER'
      }
    });
    
    res.json({ success: true, userId: user.id });
  } catch (error: any) {
    res.status(500).json({ 
      error: error.message,
      code: error.code,
      detail: error.detail || 'No detail'
    });
  }
});

// Debug: List all users (TEMPORARY - REMOVE AFTER DEBUG)
app.get('/debug-users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.json({ 
      userCount: users.length,
      users: users.map(u => ({
        id: u.id.substring(0, 8) + '...',
        email: u.email,
        role: u.role,
        created: u.createdAt
      }))
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// EMERGENCY: Migrate Role enum to add AI_MAESTRO (TEMPORARY - REMOVE AFTER USE)
app.post('/emergency-migrate-role', async (req, res) => {
  try {
    // Add AI_MAESTRO to the Role enum
    await prisma.$executeRaw`
      ALTER TYPE "public"."Role" ADD VALUE IF NOT EXISTS 'AI_MAESTRO';
    `;
    
    res.json({ 
      success: true, 
      message: 'AI_MAESTRO role added to enum successfully' 
    });
  } catch (error: any) {
    console.error('Migration error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      code: error.code,
      detail: error.detail || 'No detail'
    });
  }
});

// API Routes
setupRoutes(app);

// Error handling
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  httpServer.close(() => {
    logger.info('HTTP server closed');
  });
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
const startServer = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    logger.info('Database connected successfully');

    // Initialize Redis (optional for development)
    try {
      await initializeRedis();
      logger.info('Redis connected successfully');
    } catch (error) {
      logger.warn('Redis connection failed, continuing without cache:', error);
    }

    // Initialize job queues (optional for development)
    try {
      await initializeQueues();
      logger.info('Job queues initialized');
    } catch (error) {
      logger.warn('Job queues initialization failed, continuing without queues:', error);
    }

    httpServer.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();