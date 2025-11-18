"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentController = void 0;
const client_1 = require("@prisma/client");
const logger_1 = require("../utils/logger");
const prisma = new client_1.PrismaClient();
exports.contentController = {
    async bulkCreate(req, res) {
        try {
            const { content_package } = req.body;
            const { metadata, levels } = content_package;
            logger_1.logger.info('Creating bulk content', {
                topic: metadata.topico,
                discipline: metadata.disciplina,
                grade: metadata.serie
            });
            const contentResults = [];
            for (const [moduleType, content] of Object.entries(levels)) {
                let module = await prisma.module.findUnique({
                    where: { type: moduleType }
                });
                if (!module) {
                    module = await prisma.module.create({
                        data: {
                            type: moduleType,
                            title: `${moduleType} - ${metadata.disciplina}`,
                            description: `Conteúdo ${moduleType.toLowerCase()} para ${metadata.disciplina}`,
                            duration: Math.ceil(metadata.duracao / 60),
                            order: moduleType === 'STARTER' ? 1 :
                                moduleType === 'SURVIVOR' ? 2 :
                                    moduleType === 'EXPLORER' ? 3 : 4,
                            isPublished: false
                        }
                    });
                }
                const lesson = await prisma.lesson.create({
                    data: {
                        moduleId: module.id,
                        title: content.titulo || `${metadata.topico} - ${moduleType}`,
                        description: content.descricao || `Aula sobre ${metadata.topico}`,
                        content: JSON.stringify(content),
                        duration: metadata.duracao,
                        order: 1,
                        isPublished: false
                    }
                });
                if (content.material_necessario) {
                    const resources = content.material_necessario.map((material, index) => ({
                        lessonId: lesson.id,
                        title: material,
                        description: `Material necessário: ${material}`,
                        type: 'MATERIAL',
                        url: '',
                        order: index + 1
                    }));
                    await prisma.resource.createMany({
                        data: resources
                    });
                }
                if (content.avaliacao) {
                    await prisma.assessment.create({
                        data: {
                            lessonId: lesson.id,
                            title: `Avaliação: ${metadata.topico}`,
                            description: content.avaliacao,
                            type: 'PRACTICAL',
                            passingScore: 70,
                            maxAttempts: 3,
                            isActive: true
                        }
                    });
                }
                contentResults.push({
                    level: moduleType,
                    lessonId: lesson.id,
                    moduleId: module.id,
                    content: content
                });
            }
            logger_1.logger.info('Bulk content created successfully', {
                topic: metadata.topico,
                levelsCreated: Object.keys(levels).length
            });
            res.status(201).json({
                success: true,
                message: 'Conteúdo criado com sucesso para todos os níveis',
                data: {
                    topic: metadata.topico,
                    discipline: metadata.disciplina,
                    grade: metadata.serie,
                    duration: metadata.duracao,
                    levels: contentResults.length,
                    results: contentResults
                }
            });
        }
        catch (error) {
            logger_1.logger.error('Error creating bulk content:', error);
            res.status(500).json({
                success: false,
                message: 'Erro ao criar conteúdo',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    },
    async getByLevelAndTopic(req, res) {
        try {
            const { level, topic } = req.params;
            const module = await prisma.module.findUnique({
                where: { type: level },
                include: {
                    lessons: {
                        where: {
                            title: {
                                contains: topic,
                                mode: 'insensitive'
                            }
                        },
                        include: {
                            resources: true,
                            assessments: true
                        }
                    }
                }
            });
            if (!module) {
                return res.status(404).json({
                    success: false,
                    message: 'Conteúdo não encontrado'
                });
            }
            res.json({
                success: true,
                data: module
            });
        }
        catch (error) {
            logger_1.logger.error('Error fetching content:', error);
            res.status(500).json({
                success: false,
                message: 'Erro ao buscar conteúdo'
            });
        }
    },
    async updateStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const lesson = await prisma.lesson.update({
                where: { id },
                data: {
                    isPublished: status === 'published'
                }
            });
            res.json({
                success: true,
                message: 'Status atualizado com sucesso',
                data: lesson
            });
        }
        catch (error) {
            logger_1.logger.error('Error updating content status:', error);
            res.status(500).json({
                success: false,
                message: 'Erro ao atualizar status'
            });
        }
    }
};
//# sourceMappingURL=content.controller.js.map