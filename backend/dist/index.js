"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const logger_1 = require("./utils/logger");
const errorHandler_1 = require("./middleware/errorHandler");
const rateLimiter_1 = require("./middleware/rateLimiter");
const routes_1 = require("./routes");
const database_1 = require("./config/database");
const redis_1 = require("./config/redis");
const queues_1 = require("./config/queues");
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}
app.use((0, helmet_1.default)());
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || [];
        if (process.env.NODE_ENV === 'production') {
            logger_1.logger.info(`CORS request from origin: ${origin}`);
        }
        if (!origin ||
            allowedOrigins.includes(origin) ||
            (origin && origin.includes('teach-platform') && origin.includes('vercel.app')) ||
            (origin && origin.includes('localhost'))) {
            callback(null, true);
        }
        else {
            logger_1.logger.warn(`CORS blocked origin: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['X-Total-Count']
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use(rateLimiter_1.rateLimiter);
app.get('/health', async (req, res) => {
    try {
        const userCount = await database_1.prisma.user.count();
        res.json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV,
            database: 'connected',
            userCount
        });
    }
    catch (error) {
        res.json({
            status: 'error',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV,
            database: 'error',
            error: error.message
        });
    }
});
app.get('/db-status', async (req, res) => {
    try {
        const tables = await database_1.prisma.$queryRaw `
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
    }
    catch (error) {
        res.json({
            error: error.message,
            code: error.code,
            databaseUrl: process.env.DATABASE_URL ? 'SET' : 'NOT SET'
        });
    }
});
app.post('/create-tables-emergency', async (req, res) => {
    try {
        const { secretKey } = req.body;
        if (secretKey !== 'teach-platform-setup-2025') {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        try {
            await database_1.prisma.$executeRaw `
        CREATE TYPE "Role" AS ENUM ('TEACHER', 'ADMIN', 'PARENT', 'AI_MAESTRO', 'SUPER_ADMIN');
      `;
        }
        catch (e) { }
        try {
            await database_1.prisma.$executeRaw `
        CREATE TYPE "TeachingLevel" AS ENUM ('EARLY_YEARS', 'ELEMENTARY', 'JUNIOR_HIGH', 'HIGH_SCHOOL', 'UNIVERSITY');
      `;
        }
        catch (e) { }
        try {
            await database_1.prisma.$executeRaw `
        CREATE TYPE "SubscriptionType" AS ENUM ('FREE', 'INDIVIDUAL', 'SCHOOL', 'GOVERNMENT');
      `;
        }
        catch (e) { }
        try {
            await database_1.prisma.$executeRaw `
        CREATE TYPE "SubscriptionPlan" AS ENUM ('STARTER', 'FULL', 'PREMIUM');
      `;
        }
        catch (e) { }
        await database_1.prisma.$executeRaw `
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
        await database_1.prisma.$executeRaw `
      CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
    `;
        await database_1.prisma.$executeRaw `
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
        await database_1.prisma.$executeRaw `
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
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
            detail: error.detail || error.hint
        });
    }
});
app.post('/test-simple-register', async (req, res) => {
    try {
        const user = await database_1.prisma.user.create({
            data: {
                email: 'test' + Date.now() + '@example.com',
                password: 'hashedpassword',
                role: 'TEACHER'
            }
        });
        res.json({ success: true, userId: user.id });
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
            code: error.code,
            detail: error.detail || 'No detail'
        });
    }
});
app.get('/debug-users', async (req, res) => {
    try {
        const users = await database_1.prisma.user.findMany({
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
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post('/emergency-migrate-role', async (req, res) => {
    try {
        await database_1.prisma.$executeRaw `
      ALTER TYPE "public"."Role" ADD VALUE IF NOT EXISTS 'AI_MAESTRO';
    `;
        res.json({
            success: true,
            message: 'AI_MAESTRO role added to enum successfully'
        });
    }
    catch (error) {
        console.error('Migration error:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            code: error.code,
            detail: error.detail || 'No detail'
        });
    }
});
(0, routes_1.setupRoutes)(app);
app.use(errorHandler_1.errorHandler);
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
});
process.on('SIGTERM', async () => {
    logger_1.logger.info('SIGTERM signal received: closing HTTP server');
    httpServer.close(() => {
        logger_1.logger.info('HTTP server closed');
    });
    await database_1.prisma.$disconnect();
    process.exit(0);
});
const startServer = async () => {
    try {
        await database_1.prisma.$connect();
        logger_1.logger.info('Database connected successfully');
        try {
            await (0, redis_1.initializeRedis)();
            logger_1.logger.info('Redis connected successfully');
        }
        catch (error) {
            logger_1.logger.warn('Redis connection failed, continuing without cache:', error);
        }
        try {
            await (0, queues_1.initializeQueues)();
            logger_1.logger.info('Job queues initialized');
        }
        catch (error) {
            logger_1.logger.warn('Job queues initialization failed, continuing without queues:', error);
        }
        httpServer.listen(PORT, () => {
            logger_1.logger.info(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
        });
    }
    catch (error) {
        logger_1.logger.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map