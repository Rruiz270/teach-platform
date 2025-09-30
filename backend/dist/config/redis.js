"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheFlush = exports.cacheDelete = exports.cacheSet = exports.cacheGet = exports.initializeRedis = exports.redis = void 0;
const redis_1 = require("redis");
const logger_1 = require("../utils/logger");
const REDIS_DISABLED = process.env.REDIS_URL === 'disabled' || process.env.REDIS_URL === 'false';
exports.redis = REDIS_DISABLED ? null : (0, redis_1.createClient)({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});
if (exports.redis && !REDIS_DISABLED) {
    exports.redis.on('error', (err) => {
        logger_1.logger.error('Redis Client Error', err);
    });
    exports.redis.on('connect', () => {
        logger_1.logger.info('Redis Client Connected');
    });
}
const initializeRedis = async () => {
    if (REDIS_DISABLED) {
        logger_1.logger.info('Redis is disabled via REDIS_URL environment variable');
        return;
    }
    if (exports.redis && !exports.redis.isOpen) {
        await exports.redis.connect();
    }
};
exports.initializeRedis = initializeRedis;
const cacheGet = async (key) => {
    if (REDIS_DISABLED || !exports.redis) {
        return null;
    }
    try {
        const value = await exports.redis.get(key);
        return value ? JSON.parse(value) : null;
    }
    catch (error) {
        logger_1.logger.error(`Cache get error for key ${key}:`, error);
        return null;
    }
};
exports.cacheGet = cacheGet;
const cacheSet = async (key, value, expirationInSeconds = 3600) => {
    if (REDIS_DISABLED || !exports.redis) {
        return;
    }
    try {
        await exports.redis.setEx(key, expirationInSeconds, JSON.stringify(value));
    }
    catch (error) {
        logger_1.logger.error(`Cache set error for key ${key}:`, error);
    }
};
exports.cacheSet = cacheSet;
const cacheDelete = async (key) => {
    if (REDIS_DISABLED || !exports.redis) {
        return;
    }
    try {
        await exports.redis.del(key);
    }
    catch (error) {
        logger_1.logger.error(`Cache delete error for key ${key}:`, error);
    }
};
exports.cacheDelete = cacheDelete;
const cacheFlush = async (pattern) => {
    if (REDIS_DISABLED || !exports.redis) {
        return;
    }
    try {
        const keys = await exports.redis.keys(pattern);
        if (keys.length > 0) {
            await exports.redis.del(keys);
        }
    }
    catch (error) {
        logger_1.logger.error(`Cache flush error for pattern ${pattern}:`, error);
    }
};
exports.cacheFlush = cacheFlush;
//# sourceMappingURL=redis.js.map