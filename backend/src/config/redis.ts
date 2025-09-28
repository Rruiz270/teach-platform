import { createClient } from 'redis';
import { logger } from '../utils/logger';

// Check if Redis is disabled
const REDIS_DISABLED = process.env.REDIS_URL === 'disabled' || process.env.REDIS_URL === 'false';

export const redis = REDIS_DISABLED ? null : createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

if (redis && !REDIS_DISABLED) {
  redis.on('error', (err) => {
    logger.error('Redis Client Error', err);
  });

  redis.on('connect', () => {
    logger.info('Redis Client Connected');
  });
}

export const initializeRedis = async () => {
  if (REDIS_DISABLED) {
    logger.info('Redis is disabled via REDIS_URL environment variable');
    return;
  }
  
  if (redis && !redis.isOpen) {
    await redis.connect();
  }
};

// Cache helper functions
export const cacheGet = async (key: string) => {
  if (REDIS_DISABLED || !redis) {
    return null;
  }
  
  try {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    logger.error(`Cache get error for key ${key}:`, error);
    return null;
  }
};

export const cacheSet = async (key: string, value: any, expirationInSeconds = 3600) => {
  if (REDIS_DISABLED || !redis) {
    return;
  }
  
  try {
    await redis.setEx(key, expirationInSeconds, JSON.stringify(value));
  } catch (error) {
    logger.error(`Cache set error for key ${key}:`, error);
  }
};

export const cacheDelete = async (key: string) => {
  if (REDIS_DISABLED || !redis) {
    return;
  }
  
  try {
    await redis.del(key);
  } catch (error) {
    logger.error(`Cache delete error for key ${key}:`, error);
  }
};

export const cacheFlush = async (pattern: string) => {
  if (REDIS_DISABLED || !redis) {
    return;
  }
  
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(keys);
    }
  } catch (error) {
    logger.error(`Cache flush error for pattern ${pattern}:`, error);
  }
};