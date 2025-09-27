import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

// Module routes
router.get('/', (req, res) => {
  res.json({ message: 'Get modules endpoint - To be implemented' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get module by id endpoint - To be implemented' });
});

export default router;