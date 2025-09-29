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

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || process.env.FRONTEND_URL?.split(',') || ['http://localhost:3000'],
  credentials: true
}));
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
        CREATE TYPE "Role" AS ENUM ('TEACHER', 'ADMIN', 'PARENT', 'SUPER_ADMIN');
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