"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceController = void 0;
const ai_orchestrator_service_1 = require("../services/ai-orchestrator.service");
const client_1 = require("@prisma/client");
const logger_1 = require("../utils/logger");
class WorkspaceController {
    aiOrchestrator;
    prisma;
    constructor() {
        this.aiOrchestrator = new ai_orchestrator_service_1.AIOrchestrator();
        this.prisma = new client_1.PrismaClient();
    }
    createLesson = async (req, res) => {
        try {
            const userId = req.user.id;
            const { topic, grade, duration, objectives } = req.body;
            const outline = await this.aiOrchestrator.executeTask(userId, 'text', {
                prompt: `Create a detailed lesson outline for teaching "${topic}" to grade ${grade} students. Duration: ${duration} minutes. Learning objectives: ${objectives}`,
                maxTokens: 1000
            });
            const content = await this.aiOrchestrator.executeTask(userId, 'text', {
                prompt: `Based on this outline, create the full lesson content with introduction, main activities, and conclusion: ${JSON.stringify(outline.output)}`,
                maxTokens: 2000
            });
            const images = await Promise.all([
                this.aiOrchestrator.executeTask(userId, 'image', {
                    prompt: `Educational illustration for ${topic}, suitable for grade ${grade} students`,
                    size: '1024x1024'
                }),
                this.aiOrchestrator.executeTask(userId, 'image', {
                    prompt: `Infographic showing key concepts of ${topic}`,
                    size: '1024x1024'
                })
            ]);
            const assessment = await this.aiOrchestrator.executeTask(userId, 'text', {
                prompt: `Create 5 multiple choice questions to assess understanding of: ${topic}. Include correct answers and explanations.`,
                maxTokens: 800
            });
            const lesson = await this.prisma.lesson.create({
                data: {
                    title: topic,
                    description: outline.output.summary || `AI-generated lesson on ${topic}`,
                    content: content.output,
                    duration,
                    moduleId: req.body.moduleId,
                    resources: {
                        create: [
                            {
                                title: 'Lesson Illustration',
                                type: 'IMAGE',
                                url: images[0].output.url,
                                metadata: { generatedBy: 'DALL-E 3', prompt: images[0].input }
                            },
                            {
                                title: 'Concept Infographic',
                                type: 'IMAGE',
                                url: images[1].output.url,
                                metadata: { generatedBy: 'DALL-E 3', prompt: images[1].input }
                            },
                            {
                                title: 'Lesson Outline',
                                type: 'DOCUMENT',
                                content: JSON.stringify(outline.output),
                                metadata: { generatedBy: 'Claude', prompt: outline.input }
                            }
                        ]
                    },
                    aiGenerated: true,
                    aiMetadata: {
                        providers: ['anthropic', 'dall-e-3'],
                        tokensUsed: outline.tokensUsed + content.tokensUsed + assessment.tokensUsed,
                        generationTime: new Date()
                    }
                },
                include: { resources: true }
            });
            await this.prisma.teacherProject.create({
                data: {
                    userId,
                    title: `AI Lesson: ${topic}`,
                    description: 'Created with TEACH AI Workspace',
                    type: 'AI_LESSON',
                    status: 'COMPLETED',
                    metadata: {
                        lessonId: lesson.id,
                        aiProviders: ['anthropic', 'dall-e-3'],
                        generatedContent: true
                    }
                }
            });
            res.json({
                success: true,
                lesson,
                usage: {
                    textTokens: outline.tokensUsed + content.tokensUsed + assessment.tokensUsed,
                    images: 2,
                    providers: {
                        text: 'Claude (Anthropic)',
                        images: 'DALL-E 3 (OpenAI)'
                    }
                }
            });
        }
        catch (error) {
            logger_1.logger.error('Lesson creation failed', error);
            if (error.message.includes('Quota exceeded')) {
                return res.status(403).json({
                    error: 'Usage limit reached',
                    message: error.message,
                    suggestion: 'Try using more specific prompts to reduce token usage, or upgrade your plan.'
                });
            }
            if (error.message.includes('unavailable')) {
                return res.status(503).json({
                    error: 'AI service temporarily unavailable',
                    message: 'We\'re experiencing high demand. Please try again in a few moments.',
                    retryAfter: 60
                });
            }
            res.status(500).json({ error: 'Failed to create lesson' });
        }
    };
    createVideo = async (req, res) => {
        try {
            const userId = req.user.id;
            const { script, avatarId, background, duration } = req.body;
            const job = await this.aiOrchestrator.queueVideoGeneration({
                userId,
                script,
                avatarId: avatarId || 'anna_teacher_casual',
                background: background || 'classroom',
                duration
            });
            res.json({
                success: true,
                jobId: job.id,
                status: 'processing',
                estimatedTime: '3-5 minutes',
                message: 'Your video is being generated. You\'ll receive a notification when it\'s ready.',
                provider: 'Synthesia'
            });
        }
        catch (error) {
            logger_1.logger.error('Video creation failed', error);
            res.status(500).json({ error: 'Failed to create video' });
        }
    };
    getUsageAnalytics = async (req, res) => {
        try {
            const userId = req.user.id;
            const { period = 'month' } = req.query;
            const startDate = this.getStartDate(period);
            const aiUsage = await this.prisma.aiUsage.groupBy({
                by: ['toolName'],
                where: {
                    userId,
                    createdAt: { gte: startDate }
                },
                _sum: {
                    tokensUsed: true,
                    creditsUsed: true
                },
                _count: {
                    id: true
                }
            });
            const contentCreated = await this.prisma.teacherProject.count({
                where: {
                    userId,
                    createdAt: { gte: startDate },
                    metadata: {
                        path: ['generatedContent'],
                        equals: true
                    }
                }
            });
            const timeSaved = aiUsage.reduce((total, usage) => total + usage._count.id * 15, 0);
            const quotaStatus = await this.aiOrchestrator.getUserQuotaStatus(userId);
            res.json({
                period,
                usage: {
                    byTool: aiUsage,
                    totalTasks: aiUsage.reduce((sum, u) => sum + u._count.id, 0),
                    totalTokens: aiUsage.reduce((sum, u) => sum + (u._sum.tokensUsed || 0), 0),
                    contentCreated,
                    estimatedTimeSaved: `${Math.round(timeSaved / 60)} hours`
                },
                quota: quotaStatus,
                topTools: aiUsage
                    .sort((a, b) => b._count.id - a._count.id)
                    .slice(0, 5)
                    .map(tool => ({
                    name: tool.toolName,
                    uses: tool._count.id,
                    provider: this.getProviderName(tool.toolName)
                }))
            });
        }
        catch (error) {
            logger_1.logger.error('Failed to get usage analytics', error);
            res.status(500).json({ error: 'Failed to retrieve analytics' });
        }
    };
    getContentSuggestions = async (req, res) => {
        try {
            const userId = req.user.id;
            const { moduleId, lessonType } = req.query;
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                include: {
                    profile: {
                        include: { school: true }
                    },
                    progress: {
                        where: { moduleId: moduleId },
                        orderBy: { updatedAt: 'desc' },
                        take: 5
                    }
                }
            });
            const suggestions = await this.aiOrchestrator.executeTask(userId, 'text', {
                prompt: `Suggest 5 lesson topics for a ${user?.profile?.gradesTaught} teacher in Brazil. 
                  Subject areas: ${user?.profile?.subjectsTaught}. 
                  School type: ${user?.profile?.school?.type}.
                  Previous lessons: ${user?.progress.map(p => p.lastLesson).join(', ')}.
                  Make suggestions relevant and engaging.`,
                maxTokens: 500
            });
            res.json({
                suggestions: suggestions.output,
                context: {
                    grade: user?.profile?.gradesTaught,
                    subjects: user?.profile?.subjectsTaught,
                    schoolType: user?.profile?.school?.type
                },
                generatedBy: 'Claude (Anthropic)'
            });
        }
        catch (error) {
            logger_1.logger.error('Failed to get content suggestions', error);
            res.status(500).json({ error: 'Failed to get suggestions' });
        }
    };
    getStartDate(period) {
        const now = new Date();
        switch (period) {
            case 'week':
                return new Date(now.setDate(now.getDate() - 7));
            case 'month':
                return new Date(now.setMonth(now.getMonth() - 1));
            case 'year':
                return new Date(now.setFullYear(now.getFullYear() - 1));
            default:
                return new Date(now.setMonth(now.getMonth() - 1));
        }
    }
    getProviderName(toolName) {
        const providerMap = {
            'text-anthropic': 'Claude (Anthropic)',
            'text-openai': 'GPT-4 (OpenAI)',
            'image-dall-e-3': 'DALL-E 3 (OpenAI)',
            'video-synthesia': 'Synthesia',
            'automation-lindy': 'Lindy AI'
        };
        return providerMap[toolName] || toolName;
    }
}
exports.WorkspaceController = WorkspaceController;
//# sourceMappingURL=workspace.controller.js.map