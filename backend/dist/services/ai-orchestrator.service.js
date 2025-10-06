"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIOrchestrator = void 0;
const client_1 = require("@prisma/client");
const logger_1 = require("../utils/logger");
class AIOrchestrator {
    prisma;
    taskQueue;
    providers;
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.taskQueue = new bull_1.Queue('ai-tasks');
        this.providers = new Map();
        this.initializeProviders();
    }
    initializeProviders() {
        this.providers.set('anthropic', {
            provider: 'anthropic',
            apiKey: process.env.ANTHROPIC_API_KEY,
            endpoint: 'https://api.anthropic.com/v1',
            rateLimit: { requestsPerMinute: 50, tokensPerMinute: 100000 },
            costPer1000Tokens: 0.008,
            fallbackProvider: 'openai'
        });
        this.providers.set('openai', {
            provider: 'openai',
            apiKey: process.env.OPENAI_API_KEY,
            endpoint: 'https://api.openai.com/v1',
            rateLimit: { requestsPerMinute: 60, tokensPerMinute: 150000 },
            costPer1000Tokens: 0.01
        });
        this.providers.set('dall-e-3', {
            provider: 'dall-e-3',
            apiKey: process.env.OPENAI_API_KEY,
            endpoint: 'https://api.openai.com/v1/images/generations',
            rateLimit: { requestsPerMinute: 50, tokensPerMinute: 0 }
        });
        this.providers.set('synthesia', {
            provider: 'synthesia',
            apiKey: process.env.SYNTHESIA_API_KEY,
            endpoint: 'https://api.synthesia.io/v2',
            rateLimit: { requestsPerMinute: 10, tokensPerMinute: 0 },
            fallbackProvider: 'd-id'
        });
    }
    async executeTask(userId, taskType, input, options = {}) {
        const quota = await this.checkUserQuota(userId, taskType);
        if (!quota.allowed) {
            throw new Error(`Quota exceeded: ${quota.message}`);
        }
        const provider = this.selectProvider(taskType);
        try {
            const result = await this.executeWithProvider(provider.primary, taskType, input);
            await this.trackUsage(userId, taskType, result);
            return result;
        }
        catch (error) {
            logger_1.logger.error(`Primary provider failed: ${provider.primary}`, error);
            if (provider.fallback) {
                try {
                    const result = await this.executeWithProvider(provider.fallback, taskType, input);
                    await this.trackUsage(userId, taskType, result);
                    return result;
                }
                catch (fallbackError) {
                    logger_1.logger.error(`Fallback provider also failed: ${provider.fallback}`, fallbackError);
                    throw new Error('All AI providers are currently unavailable. Please try again later.');
                }
            }
            throw error;
        }
    }
    async checkUserQuota(userId, taskType) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { subscription: true }
        });
        const limits = this.getQuotaLimits(user?.subscription?.plan || 'FREE');
        const usage = await this.getCurrentUsage(userId);
        switch (taskType) {
            case 'text':
                if (usage.textTokens >= limits.textTokens) {
                    return { allowed: false, message: 'Monthly text generation limit reached' };
                }
                break;
            case 'image':
                if (usage.imageGenerations >= limits.imageGenerations) {
                    return { allowed: false, message: 'Monthly image generation limit reached' };
                }
                break;
            case 'video':
                if (usage.videoMinutes >= limits.videoMinutes) {
                    return { allowed: false, message: 'Monthly video generation limit reached' };
                }
                break;
        }
        return { allowed: true };
    }
    getQuotaLimits(plan) {
        const limits = {
            FREE: {
                textTokens: 50000,
                imageGenerations: 10,
                videoMinutes: 2,
                audioMinutes: 10
            },
            INDIVIDUAL: {
                textTokens: 500000,
                imageGenerations: 100,
                videoMinutes: 30,
                audioMinutes: 120
            },
            SCHOOL: {
                textTokens: 2000000,
                imageGenerations: 500,
                videoMinutes: 120,
                audioMinutes: 600
            },
            GOVERNMENT: {
                textTokens: 10000000,
                imageGenerations: 2000,
                videoMinutes: 600,
                audioMinutes: 3000
            }
        };
        return limits[plan] || limits.FREE;
    }
    async getCurrentUsage(userId) {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const usage = await this.prisma.aiUsage.aggregate({
            where: {
                userId,
                createdAt: { gte: startOfMonth }
            },
            _sum: {
                tokensUsed: true,
                creditsUsed: true
            },
            _count: {
                id: true
            }
        });
        const imageCount = await this.prisma.aiUsage.count({
            where: {
                userId,
                toolName: 'image-generation',
                createdAt: { gte: startOfMonth }
            }
        });
        return {
            textTokens: usage._sum.tokensUsed || 0,
            imageGenerations: imageCount,
            videoMinutes: 0,
            audioMinutes: 0
        };
    }
    selectProvider(taskType) {
        const providerMap = {
            text: { primary: 'anthropic', fallback: 'openai' },
            image: { primary: 'dall-e-3', fallback: 'stable-diffusion' },
            video: { primary: 'synthesia', fallback: 'd-id' },
            audio: { primary: 'elevenlabs', fallback: 'azure-speech' },
            automation: { primary: 'lindy', fallback: 'zapier' }
        };
        return providerMap[taskType];
    }
    async executeWithProvider(providerName, taskType, input) {
        const config = this.providers.get(providerName);
        if (!config) {
            throw new Error(`Provider ${providerName} not configured`);
        }
        const startTime = Date.now();
        let result;
        let tokensUsed = 0;
        switch (providerName) {
            case 'anthropic':
                result = await this.executeAnthropicTask(config, input);
                tokensUsed = result.usage?.total_tokens || 0;
                break;
            case 'openai':
                result = await this.executeOpenAITask(config, taskType, input);
                tokensUsed = result.usage?.total_tokens || 0;
                break;
            case 'dall-e-3':
                result = await this.executeDallETask(config, input);
                tokensUsed = 0;
                break;
            default:
                throw new Error(`Provider ${providerName} not implemented`);
        }
        return {
            taskId: `task_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            provider: providerName,
            type: taskType,
            input: JSON.stringify(input).substring(0, 500),
            output: result,
            tokensUsed,
            timeElapsed: Date.now() - startTime,
            timestamp: new Date(),
            userId: input.userId
        };
    }
    async trackUsage(userId, taskType, result) {
        await this.prisma.aiUsage.create({
            data: {
                userId,
                toolName: `${taskType}-${result.provider}`,
                featureUsed: taskType,
                inputPrompt: result.input,
                outputContent: JSON.stringify(result.output).substring(0, 1000),
                tokensUsed: result.tokensUsed,
                creditsUsed: this.calculateCredits(result),
                responseTime: result.timeElapsed
            }
        });
        logger_1.logger.info('AI task completed', {
            userId,
            taskType,
            provider: result.provider,
            tokensUsed: result.tokensUsed,
            timeElapsed: result.timeElapsed
        });
    }
    calculateCredits(result) {
        const config = this.providers.get(result.provider);
        if (!config || !config.costPer1000Tokens)
            return 0;
        return (result.tokensUsed / 1000) * config.costPer1000Tokens;
    }
    async executeAnthropicTask(config, input) {
        return { success: true, usage: { total_tokens: 100 } };
    }
    async executeOpenAITask(config, taskType, input) {
        return { success: true, usage: { total_tokens: 150 } };
    }
    async executeDallETask(config, input) {
        return { success: true, url: 'generated-image-url' };
    }
    async getUserQuotaStatus(userId) {
        const usage = await this.getCurrentUsage(userId);
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { subscription: true }
        });
        const limits = this.getQuotaLimits(user?.subscription?.plan || 'FREE');
        return {
            plan: user?.subscription?.plan || 'FREE',
            usage,
            limits,
            percentageUsed: {
                textTokens: Math.round((usage.textTokens / limits.textTokens) * 100),
                imageGenerations: Math.round((usage.imageGenerations / limits.imageGenerations) * 100),
                videoMinutes: Math.round((usage.videoMinutes / limits.videoMinutes) * 100),
                audioMinutes: Math.round((usage.audioMinutes / limits.audioMinutes) * 100)
            }
        };
    }
    async queueVideoGeneration(params) {
        const job = await this.taskQueue.add('video-generation', params, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 2000
            }
        });
        return job;
    }
    async getJobStatus(jobId) {
        const job = await this.taskQueue.getJob(jobId);
        if (!job) {
            throw new Error('Job not found');
        }
        return {
            id: job.id,
            status: await job.getState(),
            progress: job.progress,
            result: job.returnvalue,
            failedReason: job.failedReason
        };
    }
}
exports.AIOrchestrator = AIOrchestrator;
//# sourceMappingURL=ai-orchestrator.service.js.map