"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiApiRateLimiter = exports.authRateLimiter = exports.rateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const redis_1 = require("../config/redis");
const REDIS_DISABLED = process.env.REDIS_URL === 'disabled' || process.env.REDIS_URL === 'false';
class RedisStore {
    windowMs;
    constructor(windowMs) {
        this.windowMs = windowMs;
    }
    async increment(key) {
        if (REDIS_DISABLED || !redis_1.redis) {
            return {
                totalHits: 1,
                resetTime: new Date(Date.now() + this.windowMs),
            };
        }
        const multi = redis_1.redis.multi();
        const redisKey = `rate_limit:${key}`;
        multi.incr(redisKey);
        multi.expire(redisKey, Math.round(this.windowMs / 1000));
        const results = await multi.exec();
        const totalHits = results?.[0] || 1;
        return {
            totalHits,
            resetTime: new Date(Date.now() + this.windowMs),
        };
    }
    async decrement(key) {
        if (REDIS_DISABLED || !redis_1.redis) {
            return;
        }
        await redis_1.redis.decr(`rate_limit:${key}`);
    }
    async resetKey(key) {
        if (REDIS_DISABLED || !redis_1.redis) {
            return;
        }
        await redis_1.redis.del(`rate_limit:${key}`);
    }
}
exports.rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
    standardHeaders: true,
    legacyHeaders: false,
    ...(process.env.NODE_ENV === 'production' && !REDIS_DISABLED && {
        store: new RedisStore(parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000')),
    }),
    handler: (req, res) => {
        res.status(429).json({
            error: 'Too many requests, please try again later.',
        });
    },
    keyGenerator: (req) => {
        return req.user?.id || req.ip || 'anonymous';
    },
});
exports.authRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 5,
    skipSuccessfulRequests: false,
    ...(process.env.NODE_ENV === 'production' && !REDIS_DISABLED && {
        store: new RedisStore(15 * 60 * 1000),
    }),
    handler: (req, res) => {
        res.status(429).json({
            error: 'Too many authentication attempts, please try again later.',
        });
    },
});
exports.aiApiRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 10,
    skipSuccessfulRequests: false,
    ...(process.env.NODE_ENV === 'production' && !REDIS_DISABLED && {
        store: new RedisStore(60 * 1000),
    }),
    handler: (req, res) => {
        res.status(429).json({
            error: 'AI API rate limit exceeded, please try again in a minute.',
        });
    },
});
//# sourceMappingURL=rateLimiter.js.map