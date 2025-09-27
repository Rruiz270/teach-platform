import { createClient } from 'redis';
import { logger } from '../utils/logger';

export const redis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redis.on('error', (err) => {
  logger.error('Redis Client Error', err);
});

redis.on('connect', () => {
  logger.info('Redis Client Connected');
});

export const initializeRedis = async () => {
  if (!redis.isOpen) {
    await redis.connect();
  }
};

// Cache helper functions
export const cacheGet = async (key: string) => {
  try {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    logger.error(`Cache get error for key ${key}:`, error);
    return null;
  }
};

export const cacheSet = async (key: string, value: any, expirationInSeconds = 3600) => {
  try {
    await redis.setEx(key, expirationInSeconds, JSON.stringify(value));
  } catch (error) {
    logger.error(`Cache set error for key ${key}:`, error);
  }
};

export const cacheDelete = async (key: string) => {
  try {
    await redis.del(key);
  } catch (error) {
    logger.error(`Cache delete error for key ${key}:`, error);
  }
};

export const cacheFlush = async (pattern: string) => {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(keys);
    }
  } catch (error) {
    logger.error(`Cache flush error for pattern ${pattern}:`, error);
  }
};