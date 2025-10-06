"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workspace_controller_1 = require("../controllers/workspace.controller");
const ai_orchestrator_service_1 = require("../services/ai-orchestrator.service");
const auth_1 = require("../middleware/auth");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
const workspaceController = new workspace_controller_1.WorkspaceController();
router.use(auth_1.authMiddleware);
const validateRequest = (schema) => {
    return async (req, res, next) => {
        try {
            const validated = await schema.parseAsync(req.body);
            req.body = validated;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({
                    error: 'Validation error',
                    details: error.errors
                });
            }
            next(error);
        }
    };
};
const createLessonSchema = zod_1.z.object({
    topic: zod_1.z.string().min(3).max(200),
    grade: zod_1.z.string(),
    duration: zod_1.z.number().min(15).max(180),
    objectives: zod_1.z.string().optional(),
    moduleId: zod_1.z.string().uuid()
});
const createVideoSchema = zod_1.z.object({
    script: zod_1.z.string().min(10).max(5000),
    avatarId: zod_1.z.string().optional(),
    background: zod_1.z.string().optional(),
    duration: zod_1.z.number().min(30).max(600)
});
const createImageSchema = zod_1.z.object({
    prompt: zod_1.z.string().min(10).max(500),
    style: zod_1.z.enum(['realistic', 'cartoon', 'abstract', 'educational']).optional(),
    size: zod_1.z.enum(['1024x1024', '1024x1792', '1792x1024']).optional()
});
router.post('/lessons/create', validateRequest(createLessonSchema), workspaceController.createLesson);
router.post('/videos/create', validateRequest(createVideoSchema), workspaceController.createVideo);
router.post('/images/create', validateRequest(createImageSchema), async (req, res) => {
    try {
        const aiOrchestrator = new ai_orchestrator_service_1.AIOrchestrator();
        const result = await aiOrchestrator.executeTask(req.user.id, 'image', req.body);
        res.json({
            success: true,
            image: result.output,
            provider: 'DALL-E 3 (OpenAI)'
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/assessments/create', async (req, res) => {
    try {
        const { topic, questionCount = 5, difficulty = 'medium', type = 'multiple_choice' } = req.body;
        const aiOrchestrator = new ai_orchestrator_service_1.AIOrchestrator();
        const result = await aiOrchestrator.executeTask(req.user.id, 'text', {
            prompt: `Create ${questionCount} ${type} questions about "${topic}" at ${difficulty} difficulty level. Include correct answers and explanations.`,
            maxTokens: 1500
        });
        res.json({
            success: true,
            assessment: result.output,
            provider: 'Claude (Anthropic)',
            tokensUsed: result.tokensUsed
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/suggestions', workspaceController.getContentSuggestions);
router.get('/analytics', workspaceController.getUsageAnalytics);
router.get('/quota', async (req, res) => {
    try {
        const aiOrchestrator = new ai_orchestrator_service_1.AIOrchestrator();
        const quotaStatus = await aiOrchestrator.getUserQuotaStatus(req.user.id);
        res.json(quotaStatus);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get quota status' });
    }
});
router.get('/jobs/:jobId', async (req, res) => {
    try {
        const aiOrchestrator = new ai_orchestrator_service_1.AIOrchestrator();
        const job = await aiOrchestrator.getJobStatus(req.params.jobId);
        res.json(job);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get job status' });
    }
});
router.post('/automations/create', async (req, res) => {
    try {
        const { workflowType, parameters } = req.body;
        if (workflowType === 'auto_grading') {
            const aiOrchestrator = new ai_orchestrator_service_1.AIOrchestrator();
            const result = await aiOrchestrator.executeTask(req.user.id, 'automation', {
                action: 'create_grading_workflow',
                parameters
            });
            res.json({
                success: true,
                automation: result.output,
                provider: 'Lindy AI'
            });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/text/generate', async (req, res) => {
    try {
        const { prompt, type = 'general', maxTokens = 1000 } = req.body;
        const aiOrchestrator = new ai_orchestrator_service_1.AIOrchestrator();
        const result = await aiOrchestrator.executeTask(req.user.id, 'text', {
            prompt,
            maxTokens,
            temperature: type === 'creative' ? 0.8 : 0.3
        });
        res.json({
            success: true,
            text: result.output,
            provider: 'Claude (Anthropic)',
            tokensUsed: result.tokensUsed
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=workspace.routes.js.map