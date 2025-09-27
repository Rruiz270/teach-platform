import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { aiApiRateLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/chat', authenticate, aiApiRateLimiter, (req, res) => {
  res.json({ message: 'AI chat endpoint - To be implemented' });
});

export default router;