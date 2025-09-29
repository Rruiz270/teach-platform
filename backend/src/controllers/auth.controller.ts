import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { asyncHandler } from '../middleware/errorHandler';
import { AppError } from '../middleware/errorHandler';
import { authService } from '../services/auth.service';
import { userService } from '../services/user.service';
import { emailQueue } from '../config/queues';
import { 
  generateTokens, 
  generateEmailVerificationToken,
  verifyEmailToken,
  generatePasswordResetToken,
  verifyPasswordResetToken,
  verifyToken
} from '../utils/jwt';
import { logger } from '../utils/logger';
import { analyticsQueue } from '../config/queues';

export const authController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    const { email, password, name, role, schoolId, teachingLevel, subjects, state, city, phone } = req.body;

    // Check if user exists
    const existingUser = await userService.findByEmail(email);
    if (existingUser) {
      throw new AppError('User already exists with this email', 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user and profile
    const user = await authService.createUserWithProfile({
      email,
      password: hashedPassword,
      name,
      role,
      schoolId,
      teachingLevel,
      subjects,
      state,
      city,
      phone,
    });

    // Generate tokens
    const tokens = generateTokens(user);

    // Generate email verification token
    const verificationToken = generateEmailVerificationToken(email);

    // Send verification email (only if queue is available)
    if (emailQueue) {
      await emailQueue.add('send-email', {
        to: email,
        subject: 'Verify your TEACH account',
        template: 'email-verification',
        data: {
          name,
          verificationUrl: `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`,
        },
      });
    } else {
      logger.info(`Email verification would be sent to ${email} (email queue disabled)`);
    }

    // Track registration (only if queue is available)
    if (analyticsQueue) {
      await analyticsQueue.add('track-event', {
        event: 'user_registered',
        userId: user.id,
        data: { teachingLevel, state, city },
      });
    } else {
      logger.info(`Registration tracked for user ${user.id} (analytics queue disabled)`);
    }

    logger.info(`New user registered: ${email}`);

    res.status(201).json({
      message: 'Registration successful. Please check your email to verify your account.',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        profile: user.profile,
      },
      tokens,
    });
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Find user with profile
    const user = await userService.findByEmailWithProfile(email);
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    // Check if email is verified (skip if email queue is disabled)
    if (!user.isEmailVerified && emailQueue) {
      throw new AppError('Please verify your email before logging in', 403);
    }

    // Update last login
    await userService.updateLastLogin(user.id);

    // Generate tokens
    const tokens = generateTokens(user);

    // Track login (only if queue is available)
    if (analyticsQueue) {
      await analyticsQueue.add('track-event', {
        event: 'user_login',
        userId: user.id,
        data: { method: 'email' },
      });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        profile: user.profile,
      },
      tokens,
    });
  }),

  refreshToken: asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError('Refresh token is required', 400);
    }

    try {
      const decoded = verifyToken(refreshToken);
      const user = await userService.findById(decoded.id);

      if (!user) {
        throw new AppError('User not found', 404);
      }

      const tokens = generateTokens(user);

      res.json({ tokens });
    } catch (error) {
      throw new AppError('Invalid refresh token', 401);
    }
  }),

  verifyEmail: asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.params;

    const { email } = verifyEmailToken(token);

    const user = await userService.findByEmail(email);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.isEmailVerified) {
      return res.json({ message: 'Email already verified' });
    }

    await userService.verifyEmail(user.id);

    // Send welcome email (only if queue is available)
    if (emailQueue) {
      await emailQueue.add('send-email', {
        to: email,
        subject: 'Welcome to TEACH!',
        template: 'welcome',
        data: {
          name: user.profile?.name || 'Teacher',
          },
      });
    }

    res.json({ message: 'Email verified successfully' });
  }),

  forgotPassword: asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await userService.findByEmailWithProfile(email);
    if (!user) {
      // Don't reveal if user exists
      return res.json({ 
        message: 'If an account exists with this email, you will receive password reset instructions.' 
      });
    }

    const resetToken = generatePasswordResetToken(user.id, email);

    // Send reset email (only if queue is available)
    if (emailQueue) {
      await emailQueue.add('send-email', {
        to: email,
        subject: 'Reset your TEACH password',
        template: 'password-reset',
        data: {
          name: user.profile?.name || 'Teacher',
          resetUrl: `${process.env.FRONTEND_URL}/reset-password/${resetToken}`,
        },
      });
    }

    res.json({ 
      message: 'If an account exists with this email, you will receive password reset instructions.' 
    });
  }),

  resetPassword: asyncHandler(async (req: Request, res: Response) => {
    const { token, password } = req.body;

    const { userId } = verifyPasswordResetToken(token);

    const hashedPassword = await bcrypt.hash(password, 12);
    await userService.updatePassword(userId, hashedPassword);

    // Track password reset (only if queue is available)
    if (analyticsQueue) {
      await analyticsQueue.add('track-event', {
        event: 'password_reset',
        userId,
        data: {},
      });
    }

    res.json({ message: 'Password reset successful' });
  }),

  changePassword: asyncHandler(async (req: Request, res: Response) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user!.id;

    const user = await userService.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new AppError('Current password is incorrect', 401);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await userService.updatePassword(userId, hashedPassword);

    res.json({ message: 'Password changed successfully' });
  }),

  logout: asyncHandler(async (req: Request, res: Response) => {
    // In a real implementation, you might want to blacklist the token
    // For now, we'll just log the logout event
    if (analyticsQueue) {
      await analyticsQueue.add('track-event', {
        event: 'user_logout',
        userId: req.user!.id,
        data: {},
      });
    }

    res.json({ message: 'Logged out successfully' });
  }),

  getCurrentUser: asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.findByIdWithDetails(req.user!.id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        profile: user.profile,
        subscription: user.subscription,
        progress: user.progress,
        badges: user.badges,
      },
    });
  }),
};