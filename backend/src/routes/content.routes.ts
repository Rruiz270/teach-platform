import { Router } from 'express';
import { auth } from '../middleware/auth';
import { contentController } from '../controllers/content.controller';

const router = Router();

// Bulk content creation endpoint for n8n workflow
router.post('/bulk-create', auth, contentController.bulkCreate);

// Get content by level and topic
router.get('/level/:level/topic/:topic', auth, contentController.getByLevelAndTopic);

// Update content status (draft, published, archived)  
router.patch('/:id/status', auth, contentController.updateStatus);

export default router;