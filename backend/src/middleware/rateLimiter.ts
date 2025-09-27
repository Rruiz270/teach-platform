import rateLimit from 'express-rate-limit';
import { redis } from '../config/redis';
import { Request, Response } from 'express';

// Store for rate limiting using Redis
class RedisStore {
  windowMs: number;

  constructor(windowMs: number) {
    this.windowMs = windowMs;
  }

  async increment(key: string): Promise<{ totalHits: number; resetTime: Date }> {
    const multi = redis.multi();
    const redisKey = `rate_limit:${key}`;
    
    multi.incr(redisKey);
    multi.expire(redisKey, Math.round(this.windowMs / 1000));
    
    const results = await multi.exec();
    const totalHits = results?.[0] as number || 1;
    
    return {
      totalHits,
      resetTime: new Date(Date.now() + this.windowMs),
    };
  }

  async decrement(key: string): Promise<void> {
    await redis.decr(`rate_limit:${key}`);
  }

  async resetKey(key: string): Promise<void> {
    await redis.del(`rate_limit:${key}`);
  }
}

// General rate limiter
export const rateLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  standardHeaders: true,
  legacyHeaders: false,
  // Use Redis store in production
  ...(process.env.NODE_ENV === 'production' && {
    store: new RedisStore(parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000')),
  }),
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      error: 'Too many requests, please try again later.',
    });
  },
  keyGenerator: (req: Request) => {
    // Use user ID if authenticated, otherwise use IP
    return req.user?.id || req.ip || 'anonymous';
  },
});

// Strict rate limiter for auth endpoints
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  skipSuccessfulRequests: false,
  ...(process.env.NODE_ENV === 'production' && {
    store: new RedisStore(15 * 60 * 1000),
  }),
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      error: 'Too many authentication attempts, please try again later.',
    });
  },
});

// AI API rate limiter
export const aiApiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  skipSuccessfulRequests: false,
  ...(process.env.NODE_ENV === 'production' && {
    store: new RedisStore(60 * 1000),
  }),
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      error: 'AI API rate limit exceeded, please try again in a minute.',
    });
  },
});