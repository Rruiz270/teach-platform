"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeQueues = exports.analyticsQueue = exports.notificationQueue = exports.videoProcessingQueue = exports.emailQueue = void 0;
const bull_1 = __importDefault(require("bull"));
const logger_1 = require("../utils/logger");
const REDIS_DISABLED = process.env.REDIS_URL === 'disabled' || process.env.REDIS_URL === 'false';
const redisConfig = {
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD,
    },
};
exports.emailQueue = REDIS_DISABLED ? null : new bull_1.default('email', redisConfig);
exports.videoProcessingQueue = REDIS_DISABLED ? null : new bull_1.default('video-processing', redisConfig);
exports.notificationQueue = REDIS_DISABLED ? null : new bull_1.default('notifications', redisConfig);
exports.analyticsQueue = REDIS_DISABLED ? null : new bull_1.default('analytics', redisConfig);
const setupQueueEvents = (queue, queueName) => {
    queue.on('error', (error) => {
        logger_1.logger.error(`${queueName} queue error:`, error);
    });
    queue.on('active', (job) => {
        logger_1.logger.debug(`${queueName} job ${job.id} started`);
    });
    queue.on('completed', (job) => {
        logger_1.logger.debug(`${queueName} job ${job.id} completed`);
    });
    queue.on('failed', (job, error) => {
        logger_1.logger.error(`${queueName} job ${job.id} failed:`, error);
    });
};
const initializeQueues = async () => {
    if (REDIS_DISABLED) {
        logger_1.logger.info('Job queues are disabled via REDIS_URL environment variable');
        return;
    }
    const queues = [
        { queue: exports.emailQueue, name: 'email' },
        { queue: exports.videoProcessingQueue, name: 'video-processing' },
        { queue: exports.notificationQueue, name: 'notifications' },
        { queue: exports.analyticsQueue, name: 'analytics' },
    ].filter(({ queue }) => queue !== null);
    queues.forEach(({ queue, name }) => {
        if (queue) {
            setupQueueEvents(queue, name);
        }
    });
    if (exports.emailQueue) {
        exports.emailQueue.process(async (job) => {
            const { to, subject, template, data } = job.data;
            logger_1.logger.info(`Sending email to ${to} with subject: ${subject}`);
        });
    }
    if (exports.notificationQueue) {
        exports.notificationQueue.process(async (job) => {
            const { userId, title, message, type } = job.data;
            logger_1.logger.info(`Sending notification to user ${userId}: ${title}`);
        });
    }
    if (exports.analyticsQueue) {
        exports.analyticsQueue.process(async (job) => {
            const { event, userId, data } = job.data;
            logger_1.logger.info(`Tracking analytics event ${event} for user ${userId}`);
        });
    }
    logger_1.logger.info('All job queues initialized');
};
exports.initializeQueues = initializeQueues;
//# sourceMappingURL=queues.js.map