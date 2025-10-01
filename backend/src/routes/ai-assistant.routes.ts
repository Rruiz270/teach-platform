import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { validate } from '../utils/validation';
import { z } from 'zod';
import { claudeService } from '../services/claude.service';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// Validation schemas
const chatSchema = z.object({
  body: z.object({
    message: z.string().min(1).max(1000),
    context: z.object({
      lessonId: z.string().optional(),
      lessonTitle: z.string().optional(),
      moduleLevel: z.string().optional(),
      previousMessages: z.array(z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string()
      })).optional()
    }).optional()
  })
});

const assessmentSchema = z.object({
  body: z.object({
    topic: z.string().min(1),
    level: z.string(),
    questionCount: z.number().min(1).max(20).default(5),
    questionTypes: z.array(z.enum(['multiple_choice', 'true_false', 'short_answer', 'essay'])).default(['multiple_choice'])
  })
});

const recommendationsSchema = z.object({
  body: z.object({
    skills: z.array(z.object({
      name: z.string(),
      level: z.number().min(0).max(100)
    })),
    learningSpeed: z.enum(['slow', 'normal', 'fast']),
    goals: z.array(z.string()),
    completedLessons: z.array(z.string())
  })
});

const lessonContentSchema = z.object({
  body: z.object({
    topic: z.string().min(1),
    duration: z.number().min(15).max(180),
    targetAudience: z.string(),
    includeActivities: z.boolean().default(true)
  })
});

// Chat with AI Teaching Assistant
router.post(
  '/chat',
  authenticate,
  validate(chatSchema),
  asyncHandler(async (req, res) => {
    // Debug logging
    logger.info('AI Chat request received:', {
      body: req.body,
      user: req.user?.id,
      headers: {
        'content-type': req.headers['content-type'],
        authorization: req.headers.authorization ? 'Bearer [REDACTED]' : 'None'
      }
    });

    const { message, context } = req.body;
    const userId = req.user!.id;

    // Add user level from profile
    const enrichedContext = {
      ...context,
      userLevel: req.user!.profile?.teachingLevel || 'ELEMENTARY'
    };

    const response = await claudeService.generateTeachingResponse(message, enrichedContext);

    // TODO: Save conversation to database for analytics

    res.json({
      success: true,
      data: {
        response: response.content,
        usage: response.usage,
        timestamp: new Date()
      }
    });
  })
);

// Generate AI Assessment
router.post(
  '/generate-assessment',
  authenticate,
  validate(assessmentSchema),
  asyncHandler(async (req, res) => {
    const { topic, level, questionCount, questionTypes } = req.body;
    const userId = req.user!.id;

    const assessment = await claudeService.generateAssessment(
      topic,
      level,
      questionCount,
      questionTypes
    );

    // TODO: Save assessment to database

    res.json({
      success: true,
      data: assessment
    });
  })
);

// Get Learning Recommendations
router.post(
  '/recommendations',
  authenticate,
  validate(recommendationsSchema),
  asyncHandler(async (req, res) => {
    const userProfile = req.body;
    const userId = req.user!.id;

    const recommendations = await claudeService.generateLearningRecommendations(userProfile);

    // TODO: Save recommendations to user profile

    res.json({
      success: true,
      data: recommendations
    });
  })
);

// Generate Lesson Content
router.post(
  '/generate-lesson',
  authenticate,
  validate(lessonContentSchema),
  asyncHandler(async (req, res) => {
    const { topic, duration, targetAudience, includeActivities } = req.body;
    const userId = req.user!.id;

    const lessonContent = await claudeService.generateLessonContent(
      topic,
      duration,
      targetAudience,
      includeActivities
    );

    // TODO: Save generated lesson to database

    res.json({
      success: true,
      data: lessonContent
    });
  })
);

// Get suggested prompts for a specific context
router.post(
  '/suggest-prompts',
  authenticate,
  asyncHandler(async (req, res) => {
    const { context, goal } = req.body;

    const prompts = await claudeService.generateTeachingResponse(
      `Suggest 3 effective prompts for ${goal} in the context of ${context}. Format as a numbered list.`,
      { moduleLevel: 'PROMPT_ASSISTANCE' }
    );

    res.json({
      success: true,
      data: {
        prompts: prompts.content,
        timestamp: new Date()
      }
    });
  })
);

export default router;