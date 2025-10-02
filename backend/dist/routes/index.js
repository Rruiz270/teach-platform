"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoutes = void 0;
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const module_routes_1 = __importDefault(require("./module.routes"));
const lesson_routes_1 = __importDefault(require("./lesson.routes"));
const assessment_routes_1 = __importDefault(require("./assessment.routes"));
const progress_routes_1 = __importDefault(require("./progress.routes"));
const forum_routes_1 = __importDefault(require("./forum.routes"));
const ai_routes_1 = __importDefault(require("./ai.routes"));
const ai_assistant_routes_1 = __importDefault(require("./ai-assistant.routes"));
const events_routes_1 = __importDefault(require("./events.routes"));
const setupRoutes = (app) => {
    const apiRouter = (0, express_1.Router)();
    const API_PREFIX = '/api/v1';
    apiRouter.use('/auth', auth_routes_1.default);
    apiRouter.use('/users', user_routes_1.default);
    apiRouter.use('/modules', module_routes_1.default);
    apiRouter.use('/lessons', lesson_routes_1.default);
    apiRouter.use('/assessments', assessment_routes_1.default);
    apiRouter.use('/progress', progress_routes_1.default);
    apiRouter.use('/forum', forum_routes_1.default);
    apiRouter.use('/ai', ai_routes_1.default);
    apiRouter.use('/ai-assistant', ai_assistant_routes_1.default);
    apiRouter.use('/events', events_routes_1.default);
    app.use(API_PREFIX, apiRouter);
};
exports.setupRoutes = setupRoutes;
//# sourceMappingURL=index.js.map