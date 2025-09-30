"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const rateLimiter_1 = require("../middleware/rateLimiter");
const ai_controller_1 = require("../controllers/ai.controller");
const validation_1 = require("../utils/validation");
const validation_2 = require("../utils/validation");
const router = (0, express_1.Router)();
router.post('/chat', auth_1.authenticate, rateLimiter_1.aiApiRateLimiter, (0, validation_1.validate)(validation_2.aiUsageSchema), ai_controller_1.aiController.chat);
router.get('/templates', auth_1.authenticate, ai_controller_1.aiController.getPromptTemplates);
router.get('/usage', auth_1.authenticate, ai_controller_1.aiController.getUserUsage);
router.post('/lesson-plan', auth_1.authenticate, rateLimiter_1.aiApiRateLimiter, ai_controller_1.aiController.generateLessonPlan);
router.post('/quiz', auth_1.authenticate, rateLimiter_1.aiApiRateLimiter, ai_controller_1.aiController.generateQuiz);
router.post('/explain', auth_1.authenticate, rateLimiter_1.aiApiRateLimiter, ai_controller_1.aiController.explainConcept);
router.post('/activity', auth_1.authenticate, rateLimiter_1.aiApiRateLimiter, ai_controller_1.aiController.generateActivity);
router.post('/feedback', auth_1.authenticate, rateLimiter_1.aiApiRateLimiter, ai_controller_1.aiController.generateFeedback);
exports.default = router;
//# sourceMappingURL=ai.routes.js.map