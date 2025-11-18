import { Router } from 'express';
import { auth } from '../middleware/auth';
import { courseContentController } from '../controllers/course-content.controller';

const router = Router();

// Course content creation endpoint for n8n workflow
router.post('/create', auth, courseContentController.create);

// Get course content by level
router.get('/level/:level', auth, courseContentController.getByLevel);

// Get course content statistics
router.get('/stats', auth, courseContentController.getStats);

export default router;