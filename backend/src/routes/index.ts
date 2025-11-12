import { Application, Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import moduleRoutes from './module.routes';
import lessonRoutes from './lesson.routes';
import assessmentRoutes from './assessment.routes';
import progressRoutes from './progress.routes';
import forumRoutes from './forum.routes';
import aiRoutes from './ai.routes';
import aiAssistantRoutes from './ai-assistant.routes';
import eventRoutes from './events.routes';
// import workspaceRoutes from './workspace.routes'; // Temporarily disabled due to Bull queue issue

export const setupRoutes = (app: Application) => {
  const apiRouter = Router();

  // API version prefix
  const API_PREFIX = '/api/v1';

  // Mount routes
  apiRouter.use('/auth', authRoutes);
  apiRouter.use('/users', userRoutes);
  apiRouter.use('/modules', moduleRoutes);
  apiRouter.use('/lessons', lessonRoutes);
  apiRouter.use('/assessments', assessmentRoutes);
  apiRouter.use('/progress', progressRoutes);
  apiRouter.use('/forum', forumRoutes);
  apiRouter.use('/ai', aiRoutes);
  apiRouter.use('/ai-assistant', aiAssistantRoutes);
  apiRouter.use('/events', eventRoutes);
  // apiRouter.use('/workspace', workspaceRoutes); // Temporarily disabled due to Bull queue issue

  // Apply API router
  app.use(API_PREFIX, apiRouter);
};