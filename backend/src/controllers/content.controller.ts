import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

const prisma = new PrismaClient();

export const contentController = {
  // Bulk create content for all 4 levels from n8n workflow
  async bulkCreate(req: Request, res: Response) {
    try {
      const { content_package } = req.body;
      const { metadata, levels } = content_package;
      
      logger.info('Creating bulk content', { 
        topic: metadata.topico,
        discipline: metadata.disciplina,
        grade: metadata.serie 
      });

      // Create base content record
      const contentResults = [];
      
      // Create content for each level (STARTER, SURVIVOR, EXPLORER, EXPERT)
      for (const [moduleType, content] of Object.entries(levels)) {
        
        // First, ensure the module exists
        let module = await prisma.module.findUnique({
          where: { type: moduleType as any }
        });
        
        if (!module) {
          module = await prisma.module.create({
            data: {
              type: moduleType as any,
              title: `${moduleType} - ${metadata.disciplina}`,
              description: `Conteúdo ${moduleType.toLowerCase()} para ${metadata.disciplina}`,
              duration: Math.ceil(metadata.duracao / 60), // Convert to weeks
              order: moduleType === 'STARTER' ? 1 : 
                     moduleType === 'SURVIVOR' ? 2 :
                     moduleType === 'EXPLORER' ? 3 : 4,
              isPublished: false
            }
          });
        }

        // Create lesson for this level
        const lesson = await prisma.lesson.create({
          data: {
            moduleId: module.id,
            title: (content as any).titulo || `${metadata.topico} - ${moduleType}`,
            description: (content as any).descricao || `Aula sobre ${metadata.topico}`,
            content: JSON.stringify(content), // Store full AI-generated content as JSON
            duration: metadata.duracao,
            order: 1, // Can be enhanced to handle multiple lessons per topic
            isPublished: false
          }
        });

        // Create resources if material_necessario exists
        if ((content as any).material_necessario) {
          const resources = (content as any).material_necessario.map((material: string, index: number) => ({
            lessonId: lesson.id,
            title: material,
            description: `Material necessário: ${material}`,
            type: 'MATERIAL',
            url: '', // Can be enhanced to include actual URLs
            order: index + 1
          }));
          
          await prisma.resource.createMany({
            data: resources
          });
        }

        // Create assessment if avaliacao exists
        if ((content as any).avaliacao) {
          await prisma.assessment.create({
            data: {
              lessonId: lesson.id,
              title: `Avaliação: ${metadata.topico}`,
              description: (content as any).avaliacao,
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

      logger.info('Bulk content created successfully', { 
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

    } catch (error) {
      logger.error('Error creating bulk content:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao criar conteúdo',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  },

  async getByLevelAndTopic(req: Request, res: Response) {
    try {
      const { level, topic } = req.params;
      
      const module = await prisma.module.findUnique({
        where: { type: level as any },
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

    } catch (error) {
      logger.error('Error fetching content:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar conteúdo'
      });
    }
  },

  async updateStatus(req: Request, res: Response) {
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

    } catch (error) {
      logger.error('Error updating content status:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar status'
      });
    }
  }
};