import Anthropic from '@anthropic-ai/sdk';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

interface AIResponse {
  content: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
}

interface ConversationContext {
  lessonTitle?: string;
  lessonContent?: string;
  moduleLevel?: string;
  userLevel?: string;
  previousMessages?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

class ClaudeService {
  private client: Anthropic | null = null;

  private initializeClient(): Anthropic {
    if (!this.client) {
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) {
        throw new AppError('ANTHROPIC_API_KEY is not configured. Please set up the API key in your environment variables.', 500);
      }
      
      // Log API key format for debugging (first/last 4 chars only)
      logger.info(`Initializing Claude with API key: ${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`);
      
      this.client = new Anthropic({
        apiKey: apiKey,
      });
    }
    return this.client;
  }

  /**
   * Generate response for teaching assistant chat
   */
  async generateTeachingResponse(
    userMessage: string,
    context: ConversationContext
  ): Promise<AIResponse> {
    try {
      const client = this.initializeClient();
      const systemPrompt = this.buildTeachingAssistantPrompt(context);
      
      const messages = [
        ...(context.previousMessages || []),
        { role: 'user' as const, content: userMessage }
      ];

      const response = await client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        temperature: 0.7,
        system: systemPrompt,
        messages: messages,
      });

      const content = response.content[0].type === 'text' 
        ? response.content[0].text 
        : '';

      return {
        content,
        usage: {
          inputTokens: response.usage.input_tokens,
          outputTokens: response.usage.output_tokens,
        },
      };
    } catch (error: any) {
      logger.error('Claude API error:', {
        message: error.message,
        status: error.status,
        type: error.type,
        error: error.error,
        stack: error.stack
      });
      
      // More specific error handling
      if (error.status === 401) {
        throw new AppError('Claude API authentication failed. Please check API key.', 401);
      } else if (error.status === 429) {
        throw new AppError('Claude API rate limit exceeded. Please try again later.', 429);
      } else if (error.status === 400) {
        throw new AppError('Invalid request to Claude API. Please check your input.', 400);
      } else {
        throw new AppError(`Claude API error: ${error.message || 'Unknown error'}`, 500);
      }
    }
  }

  /**
   * Generate personalized assessment questions
   */
  async generateAssessment(
    topic: string,
    level: string,
    questionCount: number = 5,
    questionTypes: string[] = ['multiple_choice', 'true_false', 'short_answer']
  ): Promise<any> {
    try {
      const client = this.initializeClient();
      const prompt = `You are an expert educational assessment creator. Create ${questionCount} assessment questions about "${topic}" for ${level} level students.

Question types to include: ${questionTypes.join(', ')}

For each question, provide:
1. The question text
2. Question type
3. Options (for multiple choice)
4. Correct answer
5. Explanation of the answer
6. Difficulty level (easy/medium/hard)
7. Learning objective being assessed

Format the response as a JSON array of questions.`;

      const response = await client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        temperature: 0.8,
        system: 'You are an expert educator specializing in creating assessments for AI education. Always respond with valid JSON.',
        messages: [{ role: 'user', content: prompt }],
      });

      const content = response.content[0].type === 'text' 
        ? response.content[0].text 
        : '';

      // Parse the JSON response
      try {
        const assessment = JSON.parse(content);
        return {
          questions: assessment,
          metadata: {
            topic,
            level,
            generatedAt: new Date(),
            totalQuestions: assessment.length,
          },
        };
      } catch (parseError) {
        logger.error('Failed to parse assessment JSON:', parseError);
        throw new AppError('Failed to generate valid assessment format', 500);
      }
    } catch (error) {
      logger.error('Assessment generation error:', error);
      throw new AppError('Failed to generate assessment', 500);
    }
  }

  /**
   * Generate personalized learning recommendations
   */
  async generateLearningRecommendations(
    userProfile: {
      skills: Array<{ name: string; level: number }>;
      learningSpeed: string;
      goals: string[];
      completedLessons: string[];
    }
  ): Promise<any> {
    try {
      const prompt = `Based on the following user profile, generate personalized learning recommendations:

Skills: ${JSON.stringify(userProfile.skills)}
Learning Speed: ${userProfile.learningSpeed}
Goals: ${userProfile.goals.join(', ')}
Completed Lessons: ${userProfile.completedLessons.join(', ')}

Provide:
1. Next recommended lessons (3-5)
2. Skills to focus on
3. Estimated time to reach goals
4. Personalized study tips
5. Challenge suggestions

Format as JSON.`;

      const client = this.initializeClient();
      const response = await client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1500,
        temperature: 0.7,
        system: 'You are an AI learning path advisor. Provide personalized, actionable recommendations.',
        messages: [{ role: 'user', content: prompt }],
      });

      const content = response.content[0].type === 'text' 
        ? response.content[0].text 
        : '';

      try {
        return JSON.parse(content);
      } catch (parseError) {
        // If JSON parsing fails, return structured text response
        return {
          recommendations: content,
          generated: true,
        };
      }
    } catch (error) {
      logger.error('Recommendation generation error:', error);
      throw new AppError('Failed to generate recommendations', 500);
    }
  }

  /**
   * Generate lesson content suggestions
   */
  async generateLessonContent(
    topic: string,
    duration: number,
    targetAudience: string,
    includeActivities: boolean = true
  ): Promise<any> {
    try {
      const prompt = `Create a comprehensive lesson plan for teaching "${topic}" to ${targetAudience}.

Duration: ${duration} minutes
Include practical activities: ${includeActivities}

Provide:
1. Learning objectives (3-5)
2. Introduction/Hook (5 minutes)
3. Main content with key concepts
4. Interactive activities
5. Assessment ideas
6. Resources and materials needed
7. Homework suggestions

Format as structured JSON.`;

      const client = this.initializeClient();
      const response = await client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2500,
        temperature: 0.8,
        system: 'You are an expert curriculum designer specializing in AI education. Create engaging, practical lesson content.',
        messages: [{ role: 'user', content: prompt }],
      });

      const content = response.content[0].type === 'text' 
        ? response.content[0].text 
        : '';

      try {
        return JSON.parse(content);
      } catch (parseError) {
        return {
          lessonPlan: content,
          generated: true,
        };
      }
    } catch (error) {
      logger.error('Lesson content generation error:', error);
      throw new AppError('Failed to generate lesson content', 500);
    }
  }

  /**
   * Build system prompt for teaching assistant
   */
  private buildTeachingAssistantPrompt(context: ConversationContext): string {
    return `You are an AI Teaching Assistant for the TEACH platform, specializing in helping educators learn and implement AI tools in their classrooms.

Current Context:
- Lesson: ${context.lessonTitle || 'General AI Education'}
- Module Level: ${context.moduleLevel || 'Not specified'}
- User Level: ${context.userLevel || 'Intermediate'}

Your role:
1. Provide clear, practical advice about using AI in education
2. Suggest specific activities and implementations for classrooms
3. Help with creating prompts for AI tools like ChatGPT
4. Address concerns about AI ethics and responsible use
5. Offer examples relevant to Brazilian education context
6. Be encouraging and supportive

Guidelines:
- Keep responses concise and actionable
- Use examples specific to the current lesson when possible
- Suggest hands-on activities teachers can try immediately
- Always consider the teacher's time constraints
- Respond in Portuguese (Brazil) unless asked otherwise
- Include emoji occasionally to make responses friendly 😊

Remember: You're helping teachers transform education with AI, making it accessible and practical!`;
  }
}

// Export singleton instance
export const claudeService = new ClaudeService();