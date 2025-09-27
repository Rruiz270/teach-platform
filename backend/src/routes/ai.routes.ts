import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { aiApiRateLimiter } from '../middleware/rateLimiter';
import { aiController } from '../controllers/ai.controller';
import { validate } from '../utils/validation';
import { aiUsageSchema } from '../utils/validation';

const router = Router();

// General AI chat endpoint
router.post('/chat', 
  authenticate, 
  aiApiRateLimiter,
  validate(aiUsageSchema),
  aiController.chat
);

// Get prompt templates
router.get('/templates', 
  authenticate,
  aiController.getPromptTemplates
);

// Get user AI usage statistics
router.get('/usage', 
  authenticate,
  aiController.getUserUsage
);

// Educational AI endpoints
router.post('/lesson-plan', 
  authenticate, 
  aiApiRateLimiter,
  aiController.generateLessonPlan
);

router.post('/quiz', 
  authenticate, 
  aiApiRateLimiter,
  aiController.generateQuiz
);

router.post('/explain', 
  authenticate, 
  aiApiRateLimiter,
  aiController.explainConcept
);

router.post('/activity', 
  authenticate, 
  aiApiRateLimiter,
  aiController.generateActivity
);

router.post('/feedback', 
  authenticate, 
  aiApiRateLimiter,
  aiController.generateFeedback
);

export default router;