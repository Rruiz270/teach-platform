import { AIServiceConfig, AITaskResult, AIUsageQuota } from '../types/ai-usage';
import { PrismaClient } from '@prisma/client';
import { Queue } from 'bull';
import { logger } from '../utils/logger';

export class AIOrchestrator {
  private prisma: PrismaClient;
  private taskQueue: Queue;
  private providers: Map<string, AIServiceConfig>;

  constructor() {
    this.prisma = new PrismaClient();
    this.taskQueue = new Queue('ai-tasks');
    this.providers = new Map();
    this.initializeProviders();
  }

  private initializeProviders() {
    // Text Generation
    this.providers.set('anthropic', {
      provider: 'anthropic',
      apiKey: process.env.ANTHROPIC_API_KEY!,
      endpoint: 'https://api.anthropic.com/v1',
      rateLimit: { requestsPerMinute: 50, tokensPerMinute: 100000 },
      costPer1000Tokens: 0.008,
      fallbackProvider: 'openai'
    });

    this.providers.set('openai', {
      provider: 'openai',
      apiKey: process.env.OPENAI_API_KEY!,
      endpoint: 'https://api.openai.com/v1',
      rateLimit: { requestsPerMinute: 60, tokensPerMinute: 150000 },
      costPer1000Tokens: 0.01
    });

    // Image Generation
    this.providers.set('dall-e-3', {
      provider: 'dall-e-3',
      apiKey: process.env.OPENAI_API_KEY!,
      endpoint: 'https://api.openai.com/v1/images/generations',
      rateLimit: { requestsPerMinute: 50, tokensPerMinute: 0 }
    });

    // Video Generation
    this.providers.set('synthesia', {
      provider: 'synthesia',
      apiKey: process.env.SYNTHESIA_API_KEY!,
      endpoint: 'https://api.synthesia.io/v2',
      rateLimit: { requestsPerMinute: 10, tokensPerMinute: 0 },
      fallbackProvider: 'd-id'
    });
  }

  async executeTask(
    userId: string,
    taskType: 'text' | 'image' | 'video' | 'audio' | 'automation',
    input: any,
    options: { priority?: 'high' | 'normal' | 'low'; context?: any } = {}
  ): Promise<AITaskResult> {
    // Check user quota
    const quota = await this.checkUserQuota(userId, taskType);
    if (!quota.allowed) {
      throw new Error(`Quota exceeded: ${quota.message}`);
    }

    // Get appropriate provider
    const provider = this.selectProvider(taskType);
    
    try {
      // Execute task with primary provider
      const result = await this.executeWithProvider(provider.primary, taskType, input);
      
      // Track usage
      await this.trackUsage(userId, taskType, result);
      
      return result;
    } catch (error) {
      logger.error(`Primary provider failed: ${provider.primary}`, error);
      
      // Try fallback if available
      if (provider.fallback) {
        try {
          const result = await this.executeWithProvider(provider.fallback, taskType, input);
          await this.trackUsage(userId, taskType, result);
          return result;
        } catch (fallbackError) {
          logger.error(`Fallback provider also failed: ${provider.fallback}`, fallbackError);
          throw new Error('All AI providers are currently unavailable. Please try again later.');
        }
      }
      
      throw error;
    }
  }

  private async checkUserQuota(userId: string, taskType: string): Promise<{ allowed: boolean; message?: string }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { subscription: true }
    });

    const limits = this.getQuotaLimits(user?.subscription?.plan || 'FREE');
    const usage = await this.getCurrentUsage(userId);

    // Check specific limits based on task type
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

  private getQuotaLimits(plan: string) {
    const limits = {
      FREE: {
        textTokens: 50000,      // ~25 lessons
        imageGenerations: 10,
        videoMinutes: 2,
        audioMinutes: 10
      },
      INDIVIDUAL: {
        textTokens: 500000,     // ~250 lessons
        imageGenerations: 100,
        videoMinutes: 30,
        audioMinutes: 120
      },
      SCHOOL: {
        textTokens: 2000000,    // ~1000 lessons
        imageGenerations: 500,
        videoMinutes: 120,
        audioMinutes: 600
      },
      GOVERNMENT: {
        textTokens: 10000000,   // ~5000 lessons
        imageGenerations: 2000,
        videoMinutes: 600,
        audioMinutes: 3000
      }
    };

    return limits[plan] || limits.FREE;
  }

  private async getCurrentUsage(userId: string) {
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

    // Get specific counts by type
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
      videoMinutes: 0, // TODO: Implement video tracking
      audioMinutes: 0  // TODO: Implement audio tracking
    };
  }

  private selectProvider(taskType: string) {
    const providerMap = {
      text: { primary: 'anthropic', fallback: 'openai' },
      image: { primary: 'dall-e-3', fallback: 'stable-diffusion' },
      video: { primary: 'synthesia', fallback: 'd-id' },
      audio: { primary: 'elevenlabs', fallback: 'azure-speech' },
      automation: { primary: 'lindy', fallback: 'zapier' }
    };

    return providerMap[taskType];
  }

  private async executeWithProvider(providerName: string, taskType: string, input: any): Promise<AITaskResult> {
    const config = this.providers.get(providerName);
    if (!config) {
      throw new Error(`Provider ${providerName} not configured`);
    }

    const startTime = Date.now();
    
    // Provider-specific implementation
    let result: any;
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
        tokensUsed = 0; // Image generation doesn't use tokens
        break;
      // Add more providers as needed
      default:
        throw new Error(`Provider ${providerName} not implemented`);
    }

    return {
      taskId: `task_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      provider: providerName,
      type: taskType,
      input: JSON.stringify(input).substring(0, 500), // Store first 500 chars
      output: result,
      tokensUsed,
      timeElapsed: Date.now() - startTime,
      timestamp: new Date(),
      userId: input.userId
    };
  }

  private async trackUsage(userId: string, taskType: string, result: AITaskResult) {
    // Store in database
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

    // Emit analytics event
    logger.info('AI task completed', {
      userId,
      taskType,
      provider: result.provider,
      tokensUsed: result.tokensUsed,
      timeElapsed: result.timeElapsed
    });
  }

  private calculateCredits(result: AITaskResult): number {
    const config = this.providers.get(result.provider);
    if (!config || !config.costPer1000Tokens) return 0;
    
    return (result.tokensUsed / 1000) * config.costPer1000Tokens;
  }

  // Provider-specific implementations
  private async executeAnthropicTask(config: AIServiceConfig, input: any) {
    // Implementation for Anthropic API
    // This would use the actual Anthropic SDK
    return { success: true, usage: { total_tokens: 100 } };
  }

  private async executeOpenAITask(config: AIServiceConfig, taskType: string, input: any) {
    // Implementation for OpenAI API
    return { success: true, usage: { total_tokens: 150 } };
  }

  private async executeDallETask(config: AIServiceConfig, input: any) {
    // Implementation for DALL-E API
    return { success: true, url: 'generated-image-url' };
  }

  // Additional public methods
  async getUserQuotaStatus(userId: string) {
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

  async queueVideoGeneration(params: any) {
    const job = await this.taskQueue.add('video-generation', params, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000
      }
    });
    return job;
  }

  async getJobStatus(jobId: string) {
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