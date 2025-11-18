"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseContentController = void 0;
const client_1 = require("@prisma/client");
const logger_1 = require("../utils/logger");
const prisma = new client_1.PrismaClient();
exports.courseContentController = {
    async create(req, res) {
        try {
            const { course_content } = req.body;
            const { metadata, content } = course_content;
            logger_1.logger.info('Creating course content', {
                nivel: metadata.nivel,
                tipo_conteudo: metadata.tipo_conteudo,
                ferramenta_foco: metadata.ferramenta_foco
            });
            let module = await prisma.module.findUnique({
                where: { type: metadata.nivel.toUpperCase() }
            });
            if (!module) {
                const moduleOrder = {
                    'STARTER': 1,
                    'SURVIVOR': 2,
                    'EXPLORER': 3,
                    'EXPERT': 4
                };
                module = await prisma.module.create({
                    data: {
                        type: metadata.nivel.toUpperCase(),
                        title: `${metadata.nivel.toUpperCase()} - Fundamentos de IA`,
                        description: `Módulo ${metadata.nivel} do curso TEACH`,
                        duration: Math.ceil(metadata.duracao / 60),
                        order: moduleOrder[metadata.nivel.toUpperCase()] || 1,
                        isPublished: false
                    }
                });
            }
            const lesson = await prisma.lesson.create({
                data: {
                    moduleId: module.id,
                    title: content.titulo || `${metadata.ferramenta_foco} - ${metadata.tipo_conteudo}`,
                    description: content.descricao || `Conteúdo sobre ${metadata.ferramenta_foco}`,
                    content: JSON.stringify({
                        ...content,
                        metadata: {
                            ...metadata,
                            ai_generated: true,
                            content_type: 'course'
                        }
                    }),
                    duration: metadata.duracao,
                    order: 1,
                    isPublished: false
                }
            });
            if (content.recursos_necessarios) {
                const resources = content.recursos_necessarios.map((recurso, index) => ({
                    lessonId: lesson.id,
                    title: recurso,
                    description: `Recurso necessário: ${recurso}`,
                    type: 'MATERIAL',
                    url: '',
                    order: index + 1
                }));
                await prisma.resource.createMany({
                    data: resources
                });
            }
            if (content.gamificacao_elementos) {
                await prisma.assessment.create({
                    data: {
                        lessonId: lesson.id,
                        title: `Avaliação: ${content.titulo}`,
                        description: `Avaliação baseada em: ${content.gamificacao_elementos.join(', ')}`,
                        type: 'PRACTICAL',
                        passingScore: 70,
                        maxAttempts: 3,
                        isActive: true
                    }
                });
            }
            await prisma.aIUsage.create({
                data: {
                    userId: req.user?.id || 'system',
                    tool: metadata.ai_provider_used.toUpperCase(),
                    endpoint: 'course_content_generation',
                    promptTokens: Math.ceil(metadata.duracao * 10),
                    completionTokens: Math.ceil(JSON.stringify(content).length / 4),
                    totalCost: 0.001,
                    metadata: {
                        content_type: 'course',
                        nivel: metadata.nivel,
                        tipo_conteudo: metadata.tipo_conteudo
                    }
                }
            });
            logger_1.logger.info('Course content created successfully', {
                lessonId: lesson.id,
                moduleId: module.id,
                nivel: metadata.nivel
            });
            res.status(201).json({
                success: true,
                message: 'Conteúdo do curso criado com sucesso',
                data: {
                    lesson_id: lesson.id,
                    module_id: module.id,
                    nivel: metadata.nivel,
                    tipo_conteudo: metadata.tipo_conteudo,
                    ferramenta_foco: metadata.ferramenta_foco,
                    titulo: content.titulo,
                    ai_provider: metadata.ai_provider_used
                }
            });
        }
        catch (error) {
            logger_1.logger.error('Error creating course content:', error);
            res.status(500).json({
                success: false,
                message: 'Erro ao criar conteúdo do curso',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    },
    async getByLevel(req, res) {
        try {
            const { level } = req.params;
            const module = await prisma.module.findUnique({
                where: { type: level.toUpperCase() },
                include: {
                    lessons: {
                        include: {
                            resources: true,
                            assessments: true
                        },
                        where: {
                            content: {
                                path: ['metadata', 'content_type'],
                                equals: 'course'
                            }
                        }
                    }
                }
            });
            if (!module) {
                return res.status(404).json({
                    success: false,
                    message: 'Módulo não encontrado'
                });
            }
            res.json({
                success: true,
                data: module
            });
        }
        catch (error) {
            logger_1.logger.error('Error fetching course content:', error);
            res.status(500).json({
                success: false,
                message: 'Erro ao buscar conteúdo do curso'
            });
        }
    },
    async getStats(req, res) {
        try {
            const stats = await prisma.lesson.groupBy({
                by: ['moduleId'],
                where: {
                    content: {
                        path: ['metadata', 'content_type'],
                        equals: 'course'
                    }
                },
                _count: {
                    id: true
                }
            });
            const aiUsageStats = await prisma.aIUsage.groupBy({
                by: ['tool'],
                where: {
                    endpoint: 'course_content_generation'
                },
                _count: {
                    id: true
                },
                _sum: {
                    totalCost: true
                }
            });
            res.json({
                success: true,
                data: {
                    content_by_module: stats,
                    ai_usage: aiUsageStats
                }
            });
        }
        catch (error) {
            logger_1.logger.error('Error fetching course stats:', error);
            res.status(500).json({
                success: false,
                message: 'Erro ao buscar estatísticas'
            });
        }
    }
};
//# sourceMappingURL=course-content.controller.js.map