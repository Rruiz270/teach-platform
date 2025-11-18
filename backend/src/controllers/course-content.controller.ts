import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

const prisma = new PrismaClient();

export const courseContentController = {
  // Create course content from n8n workflow
  async create(req: Request, res: Response) {
    try {
      const { course_content } = req.body;
      const { metadata, content } = course_content;
      
      logger.info('Creating course content', { 
        nivel: metadata.nivel,
        tipo_conteudo: metadata.tipo_conteudo,
        ferramenta_foco: metadata.ferramenta_foco 
      });

      // Find or create the module based on level
      let module = await prisma.module.findUnique({
        where: { type: metadata.nivel.toUpperCase() as any }
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
            type: metadata.nivel.toUpperCase() as any,
            title: `${metadata.nivel.toUpperCase()} - Fundamentos de IA`,
            description: `Módulo ${metadata.nivel} do curso TEACH`,
            duration: Math.ceil(metadata.duracao / 60), 
            order: moduleOrder[metadata.nivel.toUpperCase() as keyof typeof moduleOrder] || 1,
            isPublished: false
          }
        });
      }

      // Create lesson for this course content
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
          order: 1, // Can be enhanced based on content type
          isPublished: false
        }
      });

      // Create resources for course materials
      if (content.recursos_necessarios) {
        const resources = content.recursos_necessarios.map((recurso: string, index: number) => ({
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

      // Create assessment for gamification elements
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

      // Track AI usage
      await prisma.aIUsage.create({
        data: {
          userId: req.user?.id || 'system',
          tool: metadata.ai_provider_used.toUpperCase(),
          endpoint: 'course_content_generation',
          promptTokens: Math.ceil(metadata.duracao * 10), // Estimate
          completionTokens: Math.ceil(JSON.stringify(content).length / 4),
          totalCost: 0.001, // Estimate - can be calculated based on actual usage
          metadata: {
            content_type: 'course',
            nivel: metadata.nivel,
            tipo_conteudo: metadata.tipo_conteudo
          }
        }
      });

      logger.info('Course content created successfully', { 
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

    } catch (error) {
      logger.error('Error creating course content:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao criar conteúdo do curso',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  },

  // Get course content by level
  async getByLevel(req: Request, res: Response) {
    try {
      const { level } = req.params;
      
      const module = await prisma.module.findUnique({
        where: { type: level.toUpperCase() as any },
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

    } catch (error) {
      logger.error('Error fetching course content:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar conteúdo do curso'
      });
    }
  },

  // Get course content statistics
  async getStats(req: Request, res: Response) {
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

    } catch (error) {
      logger.error('Error fetching course stats:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar estatísticas'
      });
    }
  }
};