import Bull from 'bull';
import { logger } from '../utils/logger';

// Check if Redis is disabled
const REDIS_DISABLED = process.env.REDIS_URL === 'disabled' || process.env.REDIS_URL === 'false';

const redisConfig = {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
  },
};

// Define queues only if Redis is enabled
export const emailQueue = REDIS_DISABLED ? null : new Bull('email', redisConfig);
export const videoProcessingQueue = REDIS_DISABLED ? null : new Bull('video-processing', redisConfig);
export const notificationQueue = REDIS_DISABLED ? null : new Bull('notifications', redisConfig);
export const analyticsQueue = REDIS_DISABLED ? null : new Bull('analytics', redisConfig);

// Queue event handlers
const setupQueueEvents = (queue: Bull.Queue, queueName: string) => {
  queue.on('error', (error) => {
    logger.error(`${queueName} queue error:`, error);
  });

  queue.on('active', (job) => {
    logger.debug(`${queueName} job ${job.id} started`);
  });

  queue.on('completed', (job) => {
    logger.debug(`${queueName} job ${job.id} completed`);
  });

  queue.on('failed', (job, error) => {
    logger.error(`${queueName} job ${job.id} failed:`, error);
  });
};

// Initialize all queues
export const initializeQueues = async () => {
  if (REDIS_DISABLED) {
    logger.info('Job queues are disabled via REDIS_URL environment variable');
    return;
  }

  const queues = [
    { queue: emailQueue, name: 'email' },
    { queue: videoProcessingQueue, name: 'video-processing' },
    { queue: notificationQueue, name: 'notifications' },
    { queue: analyticsQueue, name: 'analytics' },
  ].filter(({ queue }) => queue !== null);

  queues.forEach(({ queue, name }) => {
    if (queue) {
      setupQueueEvents(queue, name);
    }
  });

  // Process email jobs
  if (emailQueue) {
    emailQueue.process(async (job) => {
      const { to, subject, template, data } = job.data;
      // TODO: Implement email sending logic
      logger.info(`Sending email to ${to} with subject: ${subject}`);
    });
  }

  // Process notification jobs
  if (notificationQueue) {
    notificationQueue.process(async (job) => {
      const { userId, title, message, type } = job.data;
      // TODO: Implement notification logic
      logger.info(`Sending notification to user ${userId}: ${title}`);
    });
  }

  // Process analytics jobs
  if (analyticsQueue) {
    analyticsQueue.process(async (job) => {
      const { event, userId, data } = job.data;
      // TODO: Implement analytics tracking
      logger.info(`Tracking analytics event ${event} for user ${userId}`);
    });
  }

  logger.info('All job queues initialized');
};