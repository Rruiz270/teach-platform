import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/posts', (req, res) => {
  res.json({ message: 'Get forum posts endpoint - To be implemented' });
});

export default router;