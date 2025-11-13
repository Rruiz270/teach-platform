import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { logger } from '../utils/logger';

export interface APIStatus {
  name: string;
  provider: string;
  status: 'connected' | 'error' | 'no_api_key';
  lastChecked: Date;
  responseTime?: number;
  errorMessage?: string;
}

export class APIHealthService {
  
  /**
   * Check all API providers health status
   */
  async checkAllAPIs(): Promise<APIStatus[]> {
    const results: APIStatus[] = [];
    
    // Check Anthropic (Claude)
    results.push(await this.checkAnthropic());
    
    // Check OpenAI (GPT-4, DALL-E)
    results.push(await this.checkOpenAI());
    
    // Check Synthesia
    results.push(await this.checkSynthesia());
    
    // Check ElevenLabs
    results.push(await this.checkElevenLabs());
    
    return results;
  }

  /**
   * Check Anthropic Claude API
   */
  private async checkAnthropic(): Promise<APIStatus> {
    const startTime = Date.now();
    
    if (!process.env.ANTHROPIC_API_KEY) {
      return {
        name: 'Claude (Text Generation)',
        provider: 'Anthropic',
        status: 'no_api_key',
        lastChecked: new Date()
      };
    }

    try {
      const client = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });

      // Simple health check with minimal token usage
      const response = await client.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'Hi' }],
      });

      const responseTime = Date.now() - startTime;

      if (response.content && response.content.length > 0) {
        return {
          name: 'Claude (Text Generation)',
          provider: 'Anthropic',
          status: 'connected',
          lastChecked: new Date(),
          responseTime
        };
      } else {
        return {
          name: 'Claude (Text Generation)',
          provider: 'Anthropic',
          status: 'error',
          lastChecked: new Date(),
          errorMessage: 'No response content'
        };
      }
    } catch (error: any) {
      logger.error('Anthropic health check failed:', error);
      return {
        name: 'Claude (Text Generation)',
        provider: 'Anthropic',
        status: 'error',
        lastChecked: new Date(),
        errorMessage: error.message || 'Unknown error'
      };
    }
  }

  /**
   * Check OpenAI API (GPT-4 and DALL-E)
   */
  private async checkOpenAI(): Promise<APIStatus> {
    const startTime = Date.now();
    
    if (!process.env.OPENAI_API_KEY) {
      return {
        name: 'GPT-4 & DALL-E',
        provider: 'OpenAI',
        status: 'no_api_key',
        lastChecked: new Date()
      };
    }

    try {
      const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      // Check models endpoint (lightweight check)
      const models = await client.models.list();
      const responseTime = Date.now() - startTime;

      if (models.data && models.data.length > 0) {
        return {
          name: 'GPT-4 & DALL-E',
          provider: 'OpenAI',
          status: 'connected',
          lastChecked: new Date(),
          responseTime
        };
      } else {
        return {
          name: 'GPT-4 & DALL-E',
          provider: 'OpenAI',
          status: 'error',
          lastChecked: new Date(),
          errorMessage: 'No models available'
        };
      }
    } catch (error: any) {
      logger.error('OpenAI health check failed:', error);
      return {
        name: 'GPT-4 & DALL-E',
        provider: 'OpenAI',
        status: 'error',
        lastChecked: new Date(),
        errorMessage: error.message || 'Unknown error'
      };
    }
  }

  /**
   * Check Synthesia API
   */
  private async checkSynthesia(): Promise<APIStatus> {
    const startTime = Date.now();
    
    if (!process.env.SYNTHESIA_API_KEY) {
      return {
        name: 'Video Generation',
        provider: 'Synthesia',
        status: 'no_api_key',
        lastChecked: new Date()
      };
    }

    try {
      // Simple HTTP check to Synthesia API
      const response = await fetch('https://api.synthesia.io/v2/videos', {
        method: 'GET',
        headers: {
          'Authorization': process.env.SYNTHESIA_API_KEY,
          'Content-Type': 'application/json'
        }
      });

      const responseTime = Date.now() - startTime;

      if (response.ok || response.status === 200) {
        return {
          name: 'Video Generation',
          provider: 'Synthesia',
          status: 'connected',
          lastChecked: new Date(),
          responseTime
        };
      } else {
        return {
          name: 'Video Generation',
          provider: 'Synthesia',
          status: 'error',
          lastChecked: new Date(),
          errorMessage: `HTTP ${response.status}: ${response.statusText}`
        };
      }
    } catch (error: any) {
      logger.error('Synthesia health check failed:', error);
      return {
        name: 'Video Generation',
        provider: 'Synthesia',
        status: 'error',
        lastChecked: new Date(),
        errorMessage: error.message || 'Connection failed'
      };
    }
  }

  /**
   * Check ElevenLabs API
   */
  private async checkElevenLabs(): Promise<APIStatus> {
    const startTime = Date.now();
    
    if (!process.env.ELEVENLABS_API_KEY) {
      return {
        name: 'Voice Generation',
        provider: 'ElevenLabs',
        status: 'no_api_key',
        lastChecked: new Date()
      };
    }

    try {
      // Check ElevenLabs user info endpoint
      const response = await fetch('https://api.elevenlabs.io/v1/user', {
        method: 'GET',
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY,
          'Content-Type': 'application/json'
        }
      });

      const responseTime = Date.now() - startTime;

      if (response.ok) {
        return {
          name: 'Voice Generation',
          provider: 'ElevenLabs',
          status: 'connected',
          lastChecked: new Date(),
          responseTime
        };
      } else {
        return {
          name: 'Voice Generation',
          provider: 'ElevenLabs',
          status: 'error',
          lastChecked: new Date(),
          errorMessage: `HTTP ${response.status}: ${response.statusText}`
        };
      }
    } catch (error: any) {
      logger.error('ElevenLabs health check failed:', error);
      return {
        name: 'Voice Generation',
        provider: 'ElevenLabs',
        status: 'error',
        lastChecked: new Date(),
        errorMessage: error.message || 'Connection failed'
      };
    }
  }
}

export const apiHealthService = new APIHealthService();