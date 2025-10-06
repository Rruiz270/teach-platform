export interface AIUsageQuota {
  userId: string;
  subscriptionPlan: 'FREE' | 'INDIVIDUAL' | 'SCHOOL' | 'GOVERNMENT';
  monthly: {
    textTokens: number;
    imageGenerations: number;
    videoMinutes: number;
    audioMinutes: number;
  };
  used: {
    textTokens: number;
    imageGenerations: number;
    videoMinutes: number;
    audioMinutes: number;
  };
  resetDate: Date;
}

export interface AIServiceConfig {
  provider: string;
  apiKey: string;
  endpoint: string;
  rateLimit: {
    requestsPerMinute: number;
    tokensPerMinute: number;
  };
  costPer1000Tokens?: number;
  fallbackProvider?: string;
}

export interface AITaskResult {
  taskId: string;
  provider: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'automation';
  input: string;
  output: any;
  tokensUsed: number;
  timeElapsed: number;
  timestamp: Date;
  userId: string;
  moduleId?: string;
  lessonId?: string;
}