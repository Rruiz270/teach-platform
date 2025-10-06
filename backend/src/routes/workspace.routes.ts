import { Router } from 'express';
import { WorkspaceController } from '../controllers/workspace.controller';
import { AIOrchestrator } from '../services/ai-orchestrator.service';
import { authMiddleware } from '../middleware/auth';
import { z } from 'zod';

const router = Router();
const workspaceController = new WorkspaceController();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Validation middleware
const validateRequest = (schema: z.ZodType<any>) => {
  return async (req: any, res: any, next: any) => {
    try {
      const validated = await schema.parseAsync(req.body);
      req.body = validated;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.errors
        });
      }
      next(error);
    }
  };
};

// Validation schemas
const createLessonSchema = z.object({
  topic: z.string().min(3).max(200),
  grade: z.string(),
  duration: z.number().min(15).max(180),
  objectives: z.string().optional(),
  moduleId: z.string().uuid()
});

const createVideoSchema = z.object({
  script: z.string().min(10).max(5000),
  avatarId: z.string().optional(),
  background: z.string().optional(),
  duration: z.number().min(30).max(600) // 30 seconds to 10 minutes
});

const createImageSchema = z.object({
  prompt: z.string().min(10).max(500),
  style: z.enum(['realistic', 'cartoon', 'abstract', 'educational']).optional(),
  size: z.enum(['1024x1024', '1024x1792', '1792x1024']).optional()
});

// Lesson creation with AI
router.post(
  '/lessons/create',
  validateRequest(createLessonSchema),
  workspaceController.createLesson
);

// Video generation
router.post(
  '/videos/create',
  validateRequest(createVideoSchema),
  workspaceController.createVideo
);

// Image generation
router.post(
  '/images/create',
  validateRequest(createImageSchema),
  async (req: any, res) => {
    try {
      const aiOrchestrator = new AIOrchestrator();
      const result = await aiOrchestrator.executeTask(
        req.user!.id,
        'image',
        req.body
      );
      res.json({
        success: true,
        image: result.output,
        provider: 'DALL-E 3 (OpenAI)'
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Assessment generation
router.post(
  '/assessments/create',
  async (req: any, res) => {
    try {
      const { topic, questionCount = 5, difficulty = 'medium', type = 'multiple_choice' } = req.body;
      
      const aiOrchestrator = new AIOrchestrator();
      const result = await aiOrchestrator.executeTask(
        req.user!.id,
        'text',
        {
          prompt: `Create ${questionCount} ${type} questions about "${topic}" at ${difficulty} difficulty level. Include correct answers and explanations.`,
          maxTokens: 1500
        }
      );

      res.json({
        success: true,
        assessment: result.output,
        provider: 'Claude (Anthropic)',
        tokensUsed: result.tokensUsed
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get AI-powered content suggestions
router.get(
  '/suggestions',
  workspaceController.getContentSuggestions
);

// Get usage analytics
router.get(
  '/analytics',
  workspaceController.getUsageAnalytics
);

// Get quota status
router.get(
  '/quota',
  async (req: any, res) => {
    try {
      const aiOrchestrator = new AIOrchestrator();
      const quotaStatus = await aiOrchestrator.getUserQuotaStatus(
        req.user!.id
      );
      res.json(quotaStatus);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get quota status' });
    }
  }
);

// Get job status (for async tasks like video generation)
router.get(
  '/jobs/:jobId',
  async (req, res) => {
    try {
      const aiOrchestrator = new AIOrchestrator();
      const job = await aiOrchestrator.getJobStatus(
        req.params.jobId
      );
      res.json(job);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get job status' });
    }
  }
);

// Automation workflows
router.post(
  '/automations/create',
  async (req: any, res) => {
    try {
      const { workflowType, parameters } = req.body;
      
      // Example: Auto-grade assignments
      if (workflowType === 'auto_grading') {
        const aiOrchestrator = new AIOrchestrator();
        const result = await aiOrchestrator.executeTask(
          req.user!.id,
          'automation',
          {
            action: 'create_grading_workflow',
            parameters
          }
        );
        
        res.json({
          success: true,
          automation: result.output,
          provider: 'Lindy AI'
        });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Text generation/enhancement
router.post(
  '/text/generate',
  async (req: any, res) => {
    try {
      const { prompt, type = 'general', maxTokens = 1000 } = req.body;
      
      const aiOrchestrator = new AIOrchestrator();
      const result = await aiOrchestrator.executeTask(
        req.user!.id,
        'text',
        {
          prompt,
          maxTokens,
          temperature: type === 'creative' ? 0.8 : 0.3
        }
      );

      res.json({
        success: true,
        text: result.output,
        provider: 'Claude (Anthropic)',
        tokensUsed: result.tokensUsed
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;