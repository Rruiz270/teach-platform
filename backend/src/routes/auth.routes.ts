import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { validate } from '../utils/validation';
import { 
  registerSchema, 
  loginSchema, 
  forgotPasswordSchema, 
  resetPasswordSchema 
} from '../utils/validation';
import { authRateLimiter } from '../middleware/rateLimiter';
import { authenticate } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/register', 
  // authRateLimiter, // Temporarily disabled for testing
  validate(registerSchema),
  authController.register
);

router.post('/login', 
  authRateLimiter,
  validate(loginSchema),
  authController.login
);

router.post('/refresh-token',
  authRateLimiter,
  authController.refreshToken
);

router.post('/forgot-password',
  authRateLimiter,
  validate(forgotPasswordSchema),
  authController.forgotPassword
);

router.post('/reset-password',
  authRateLimiter,
  validate(resetPasswordSchema),
  authController.resetPassword
);

router.get('/verify-email/:token',
  authController.verifyEmail
);

// Protected routes
router.post('/logout',
  authenticate,
  authController.logout
);

router.get('/me',
  authenticate,
  authController.getCurrentUser
);

router.post('/change-password',
  authenticate,
  authController.changePassword
);

export default router;