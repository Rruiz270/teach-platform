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

// Specialized AI Tools
router.post('/image/generate', 
  authenticate, 
  aiApiRateLimiter,
  aiController.generateImage
);

router.post('/video/create', 
  authenticate, 
  aiApiRateLimiter,
  aiController.createVideo
);

router.post('/voice/generate', 
  authenticate, 
  aiApiRateLimiter,
  aiController.generateVoice
);

router.post('/workflow/create', 
  authenticate, 
  aiApiRateLimiter,
  aiController.createWorkflow
);

// Educational Content Generation
router.post('/content/generate', 
  authenticate, 
  aiApiRateLimiter,
  aiController.generateEducationalContent
);

// TEACH Platform Specific Endpoints
router.post('/teach/course', 
  authenticate, 
  aiApiRateLimiter,
  aiController.generateTeachCourse
);

router.post('/teach/bncc', 
  authenticate, 
  aiApiRateLimiter,
  aiController.generateBNCCLesson
);

router.post('/teach/assessment', 
  authenticate, 
  aiApiRateLimiter,
  aiController.generateAIAssessment
);

// Batch Processing
router.post('/batch', 
  authenticate, 
  aiApiRateLimiter,
  aiController.processBatch
);

export default router;