"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.aiUsageSchema = exports.createCommentSchema = exports.createPostSchema = exports.submitProjectSchema = exports.submitAssessmentSchema = exports.createLessonSchema = exports.updateProfileSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email format'),
        password: zod_1.z.string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
            .regex(/[0-9]/, 'Password must contain at least one number'),
        name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
        role: zod_1.z.nativeEnum(client_1.Role).optional(),
        schoolId: zod_1.z.string().optional(),
        teachingLevel: zod_1.z.nativeEnum(client_1.TeachingLevel),
        subjects: zod_1.z.array(zod_1.z.string()),
        state: zod_1.z.string().min(2, 'State is required'),
        city: zod_1.z.string().min(2, 'City is required'),
        phone: zod_1.z.string().optional(),
    }),
}).refine((data) => {
    if (data.body.role !== 'AI_MAESTRO' && data.body.subjects.length === 0) {
        return false;
    }
    return true;
}, {
    message: 'At least one subject is required',
    path: ['body', 'subjects']
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email format'),
        password: zod_1.z.string().min(1, 'Password is required'),
    }),
});
exports.forgotPasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email format'),
    }),
});
exports.resetPasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        token: zod_1.z.string().min(1, 'Token is required'),
        password: zod_1.z.string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
            .regex(/[0-9]/, 'Password must contain at least one number'),
    }),
});
exports.updateProfileSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).optional(),
        phone: zod_1.z.string().optional(),
        bio: zod_1.z.string().optional(),
        yearsTeaching: zod_1.z.number().min(0).optional(),
        subjects: zod_1.z.array(zod_1.z.string()).optional(),
        teachingLevel: zod_1.z.nativeEnum(client_1.TeachingLevel).optional(),
    }),
});
exports.createLessonSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1),
        description: zod_1.z.string().min(1),
        content: zod_1.z.string().min(1),
        videoUrl: zod_1.z.string().url().optional(),
        duration: zod_1.z.number().min(1).optional(),
        order: zod_1.z.number().min(0),
    }),
});
exports.submitAssessmentSchema = zod_1.z.object({
    body: zod_1.z.object({
        assessmentId: zod_1.z.string().uuid(),
        answers: zod_1.z.record(zod_1.z.string(), zod_1.z.string()),
        timeTaken: zod_1.z.number().min(0),
    }),
});
exports.submitProjectSchema = zod_1.z.object({
    body: zod_1.z.object({
        assessmentId: zod_1.z.string().uuid(),
        title: zod_1.z.string().min(1),
        description: zod_1.z.string().min(1),
        fileUrls: zod_1.z.array(zod_1.z.string().url()).min(1),
    }),
});
exports.createPostSchema = zod_1.z.object({
    body: zod_1.z.object({
        categoryId: zod_1.z.string().uuid(),
        title: zod_1.z.string().min(5, 'Title must be at least 5 characters'),
        content: zod_1.z.string().min(20, 'Content must be at least 20 characters'),
    }),
});
exports.createCommentSchema = zod_1.z.object({
    body: zod_1.z.object({
        postId: zod_1.z.string().uuid(),
        parentId: zod_1.z.string().uuid().optional(),
        content: zod_1.z.string().min(1, 'Comment cannot be empty'),
    }),
});
exports.aiUsageSchema = zod_1.z.object({
    body: zod_1.z.object({
        tool: zod_1.z.enum(['CHATGPT', 'CLAUDE', 'GEMINI', 'DALL_E', 'OTHER']),
        prompt: zod_1.z.string().min(1),
        context: zod_1.z.string().optional(),
    }),
});
const zod_2 = require("zod");
const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        }
        catch (error) {
            if (error instanceof zod_2.ZodError) {
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
exports.validate = validate;
//# sourceMappingURL=validation.js.map