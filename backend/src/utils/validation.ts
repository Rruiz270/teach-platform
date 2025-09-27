import { z } from 'zod';
import { TeachingLevel } from '@prisma/client';

// Auth schemas
export const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    schoolId: z.string().optional(),
    teachingLevel: z.nativeEnum(TeachingLevel),
    subjects: z.array(z.string()).min(1, 'At least one subject is required'),
    state: z.string().min(2, 'State is required'),
    city: z.string().min(2, 'City is required'),
    phone: z.string().optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(1, 'Token is required'),
    password: z.string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
  }),
});

// User profile schemas
export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    phone: z.string().optional(),
    bio: z.string().optional(),
    yearsTeaching: z.number().min(0).optional(),
    subjects: z.array(z.string()).optional(),
    teachingLevel: z.nativeEnum(TeachingLevel).optional(),
  }),
});

// Module and lesson schemas
export const createLessonSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    content: z.string().min(1),
    videoUrl: z.string().url().optional(),
    duration: z.number().min(1).optional(),
    order: z.number().min(0),
  }),
});

// Assessment schemas
export const submitAssessmentSchema = z.object({
  body: z.object({
    assessmentId: z.string().uuid(),
    answers: z.record(z.string(), z.string()),
    timeTaken: z.number().min(0),
  }),
});

export const submitProjectSchema = z.object({
  body: z.object({
    assessmentId: z.string().uuid(),
    title: z.string().min(1),
    description: z.string().min(1),
    fileUrls: z.array(z.string().url()).min(1),
  }),
});

// Forum schemas
export const createPostSchema = z.object({
  body: z.object({
    categoryId: z.string().uuid(),
    title: z.string().min(5, 'Title must be at least 5 characters'),
    content: z.string().min(20, 'Content must be at least 20 characters'),
  }),
});

export const createCommentSchema = z.object({
  body: z.object({
    postId: z.string().uuid(),
    parentId: z.string().uuid().optional(),
    content: z.string().min(1, 'Comment cannot be empty'),
  }),
});

// AI usage schemas
export const aiUsageSchema = z.object({
  body: z.object({
    tool: z.enum(['CHATGPT', 'CLAUDE', 'GEMINI', 'DALL_E', 'OTHER']),
    prompt: z.string().min(1),
    context: z.string().optional(),
  }),
});

// Validation middleware
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        return res.status(400).json({ 
          error: 'Validation failed',
          details: errors,
        });
      }
      next(error);
    }
  };
};