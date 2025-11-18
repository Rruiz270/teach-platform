"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../utils/validation");
const zod_1 = require("zod");
const claude_service_1 = require("../services/claude.service");
const errorHandler_1 = require("../middleware/errorHandler");
const logger_1 = require("../utils/logger");
const router = (0, express_1.Router)();
const chatSchema = zod_1.z.object({
    body: zod_1.z.object({
        message: zod_1.z.string().min(1).max(1000),
        context: zod_1.z.object({
            lessonId: zod_1.z.string().optional(),
            lessonTitle: zod_1.z.string().optional(),
            moduleLevel: zod_1.z.string().optional(),
            previousMessages: zod_1.z.array(zod_1.z.object({
                role: zod_1.z.enum(['user', 'assistant']),
                content: zod_1.z.string()
            })).optional()
        }).optional()
    })
});
const assessmentSchema = zod_1.z.object({
    body: zod_1.z.object({
        topic: zod_1.z.string().min(1),
        level: zod_1.z.string(),
        questionCount: zod_1.z.number().min(1).max(20).default(5),
        questionTypes: zod_1.z.array(zod_1.z.enum(['multiple_choice', 'true_false', 'short_answer', 'essay'])).default(['multiple_choice'])
    })
});
const recommendationsSchema = zod_1.z.object({
    body: zod_1.z.object({
        skills: zod_1.z.array(zod_1.z.object({
            name: zod_1.z.string(),
            level: zod_1.z.number().min(0).max(100)
        })),
        learningSpeed: zod_1.z.enum(['slow', 'normal', 'fast']),
        goals: zod_1.z.array(zod_1.z.string()),
        completedLessons: zod_1.z.array(zod_1.z.string())
    })
});
const lessonContentSchema = zod_1.z.object({
    body: zod_1.z.object({
        topic: zod_1.z.string().min(1),
        duration: zod_1.z.number().min(15).max(180),
        targetAudience: zod_1.z.string(),
        includeActivities: zod_1.z.boolean().default(true)
    })
});
router.post('/chat', auth_1.authenticate, (0, validation_1.validate)(chatSchema), (0, errorHandler_1.asyncHandler)(async (req, res) => {
    logger_1.logger.info('AI Chat request received:', {
        body: req.body,
        user: req.user?.id,
        headers: {
            'content-type': req.headers['content-type'],
            authorization: req.headers.authorization ? 'Bearer [REDACTED]' : 'None'
        }
    });
    const { message, context } = req.body;
    const userId = req.user.id;
    const enrichedContext = {
        ...context,
        userLevel: 'ELEMENTARY'
    };
    const response = await claude_service_1.claudeService.generateTeachingResponse(message, enrichedContext);
    res.json({
        success: true,
        data: {
            response: response.content,
            usage: response.usage,
            timestamp: new Date()
        }
    });
}));
router.post('/generate-assessment', auth_1.authenticate, (0, validation_1.validate)(assessmentSchema), (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { topic, level, questionCount, questionTypes } = req.body;
    const userId = req.user.id;
    const assessment = await claude_service_1.claudeService.generateAssessment(topic, level, questionCount, questionTypes);
    res.json({
        success: true,
        data: assessment
    });
}));
router.post('/recommendations', auth_1.authenticate, (0, validation_1.validate)(recommendationsSchema), (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const userProfile = req.body;
    const userId = req.user.id;
    const recommendations = await claude_service_1.claudeService.generateLearningRecommendations(userProfile);
    res.json({
        success: true,
        data: recommendations
    });
}));
router.post('/generate-lesson', auth_1.authenticate, (0, validation_1.validate)(lessonContentSchema), (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { topic, duration, targetAudience, includeActivities } = req.body;
    const userId = req.user.id;
    const lessonContent = await claude_service_1.claudeService.generateLessonContent(topic, duration, targetAudience, includeActivities);
    res.json({
        success: true,
        data: lessonContent
    });
}));
router.post('/suggest-prompts', auth_1.authenticate, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { context, goal } = req.body;
    const prompts = await claude_service_1.claudeService.generateTeachingResponse(`Suggest 3 effective prompts for ${goal} in the context of ${context}. Format as a numbered list.`, { moduleLevel: 'PROMPT_ASSISTANCE' });
    res.json({
        success: true,
        data: {
            prompts: prompts.content,
            timestamp: new Date()
        }
    });
}));
exports.default = router;
//# sourceMappingURL=ai-assistant.routes.js.map