import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { AppError } from '../middleware/errorHandler';
import { aiService } from '../services/ai.service';
import { logger } from '../utils/logger';

export const aiController = {
  chat: asyncHandler(async (req: Request, res: Response) => {
    const { tool, prompt, context } = req.body;
    const userId = req.user!.id;

    if (!tool || !prompt) {
      throw new AppError('Tool and prompt are required', 400);
    }

    // Validate tool
    const supportedTools = ['chatgpt', 'claude', 'gemini'];
    if (!supportedTools.includes(tool.toLowerCase())) {
      throw new AppError(`Unsupported tool. Supported tools: ${supportedTools.join(', ')}`, 400);
    }

    // Process AI request
    const response = await aiService.processAIRequest(userId, tool, prompt, context);

    res.json({
      success: true,
      data: {
        response: response.content,
        tool,
        model: response.model,
        usage: response.usage,
        cost: response.cost,
      },
    });
  }),

  getPromptTemplates: asyncHandler(async (req: Request, res: Response) => {
    const templates = aiService.getEducationalPrompts();

    res.json({
      success: true,
      data: {
        templates,
      },
    });
  }),

  getUserUsage: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { period = 'month' } = req.query;

    if (!['day', 'week', 'month'].includes(period as string)) {
      throw new AppError('Period must be day, week, or month', 400);
    }

    const usage = await aiService.getUserAIUsage(userId, period as 'day' | 'week' | 'month');

    res.json({
      success: true,
      data: {
        period,
        usage,
      },
    });
  }),

  generateLessonPlan: asyncHandler(async (req: Request, res: Response) => {
    const { subject, grade, topic, duration = 50, tool = 'chatgpt' } = req.body;
    const userId = req.user!.id;

    if (!subject || !grade || !topic) {
      throw new AppError('Subject, grade, and topic are required', 400);
    }

    const prompt = `Crie um plano de aula detalhado para ${subject} para alunos de ${grade}. 
    Tópico: ${topic}. 
    Duração: ${duration} minutos.
    
    Estruture o plano com:
    1. Objetivos de aprendizagem (3-5 objetivos específicos)
    2. Materiais necessários
    3. Introdução (5-10 minutos)
    4. Desenvolvimento (30-40 minutos)
    5. Atividade prática
    6. Conclusão e revisão (5-10 minutos)
    7. Avaliação
    8. Tarefa de casa (opcional)
    
    Use linguagem clara e adequada para professores brasileiros.`;

    const context = `Você é um especialista em educação brasileira, familiarizado com a BNCC e as práticas pedagógicas do Brasil. 
    Crie conteúdo prático e aplicável para o contexto educacional brasileiro.`;

    const response = await aiService.processAIRequest(userId, tool, prompt, context);

    res.json({
      success: true,
      data: {
        lessonPlan: response.content,
        subject,
        grade,
        topic,
        duration,
        usage: response.usage,
        cost: response.cost,
      },
    });
  }),

  generateQuiz: asyncHandler(async (req: Request, res: Response) => {
    const { subject, grade, topic, questionCount = 10, tool = 'chatgpt' } = req.body;
    const userId = req.user!.id;

    if (!subject || !grade || !topic) {
      throw new AppError('Subject, grade, and topic are required', 400);
    }

    const prompt = `Crie um quiz de ${questionCount} questões sobre ${topic} para alunos de ${grade} na disciplina de ${subject}.
    
    Distribua as questões da seguinte forma:
    - 60% questões de múltipla escolha (4 alternativas cada)
    - 30% questões verdadeiro/falso
    - 10% questões dissertativas
    
    Para cada questão de múltipla escolha e verdadeiro/falso, inclua:
    1. A pergunta
    2. As alternativas (se múltipla escolha)
    3. A resposta correta
    4. Uma breve explicação da resposta
    
    Para questões dissertativas, inclua:
    1. A pergunta
    2. Critérios de avaliação
    3. Exemplo de resposta esperada
    
    Formate em JSON estruturado para fácil processamento.`;

    const context = `Você é um especialista em avaliação educacional no Brasil. 
    Crie questões alinhadas com a BNCC e adequadas ao nível de desenvolvimento dos alunos.`;

    const response = await aiService.processAIRequest(userId, tool, prompt, context);

    res.json({
      success: true,
      data: {
        quiz: response.content,
        subject,
        grade,
        topic,
        questionCount,
        usage: response.usage,
        cost: response.cost,
      },
    });
  }),

  explainConcept: asyncHandler(async (req: Request, res: Response) => {
    const { concept, grade, subject, tool = 'chatgpt' } = req.body;
    const userId = req.user!.id;

    if (!concept || !grade) {
      throw new AppError('Concept and grade are required', 400);
    }

    const prompt = `Explique o conceito "${concept}" de forma simples, clara e envolvente para alunos de ${grade}${subject ? ` na disciplina de ${subject}` : ''}.
    
    Sua explicação deve incluir:
    1. Definição simples e direta
    2. 2-3 analogias ou metáforas familiares aos alunos
    3. Exemplos práticos do dia a dia
    4. Uma atividade simples para fixar o conceito
    5. Conexão com outros conceitos que os alunos já conhecem
    
    Use linguagem adequada à faixa etária e torne o aprendizado divertido e memorável.`;

    const context = `Você é um educador experiente que sabe como tornar conceitos complexos acessíveis para crianças e jovens brasileiros. 
    Use referências culturais brasileiras quando apropriado.`;

    const response = await aiService.processAIRequest(userId, tool, prompt, context);

    res.json({
      success: true,
      data: {
        explanation: response.content,
        concept,
        grade,
        subject,
        usage: response.usage,
        cost: response.cost,
      },
    });
  }),

  generateActivity: asyncHandler(async (req: Request, res: Response) => {
    const { topic, grade, subject, activityType = 'interactive', duration = 30, tool = 'chatgpt' } = req.body;
    const userId = req.user!.id;

    if (!topic || !grade) {
      throw new AppError('Topic and grade are required', 400);
    }

    const prompt = `Crie uma atividade ${activityType} sobre "${topic}" para alunos de ${grade}${subject ? ` em ${subject}` : ''}.
    Duração: ${duration} minutos.
    
    A atividade deve incluir:
    1. Objetivo da atividade
    2. Materiais necessários
    3. Instruções passo a passo para o professor
    4. Instruções para os alunos
    5. Variações para diferentes níveis de habilidade
    6. Forma de avaliação/feedback
    7. Extensões ou atividades de follow-up
    
    Torne a atividade engajante, prática e adequada para a faixa etária.
    Inclua elementos de gamificação quando apropriado.`;

    const context = `Você é um especialista em metodologias ativas de aprendizagem, familiarizado com as melhores práticas pedagógicas brasileiras.`;

    const response = await aiService.processAIRequest(userId, tool, prompt, context);

    res.json({
      success: true,
      data: {
        activity: response.content,
        topic,
        grade,
        subject,
        activityType,
        duration,
        usage: response.usage,
        cost: response.cost,
      },
    });
  }),

  generateFeedback: asyncHandler(async (req: Request, res: Response) => {
    const { studentName, performance, subject, specificAreas, tool = 'chatgpt' } = req.body;
    const userId = req.user!.id;

    if (!studentName || !performance || !subject) {
      throw new AppError('Student name, performance, and subject are required', 400);
    }

    const prompt = `Escreva um feedback construtivo e personalizado para o aluno ${studentName} em ${subject}.
    
    Performance geral: ${performance}
    ${specificAreas ? `Áreas específicas: ${specificAreas}` : ''}
    
    O feedback deve:
    1. Começar com aspectos positivos e pontos fortes
    2. Identificar áreas para melhoria de forma construtiva
    3. Oferecer sugestões específicas e acionáveis
    4. Ser encorajador e motivador
    5. Incluir próximos passos ou metas
    6. Ter tom profissional mas caloroso
    
    Mantenha entre 150-250 palavras e use linguagem adequada para comunicação com o aluno e seus pais.`;

    const context = `Você é um educador experiente em dar feedback construtivo que motiva os alunos a melhorar. 
    Use abordagem pedagógica positiva alinhada com as práticas educacionais brasileiras.`;

    const response = await aiService.processAIRequest(userId, tool, prompt, context);

    res.json({
      success: true,
      data: {
        feedback: response.content,
        studentName,
        subject,
        performance,
        usage: response.usage,
        cost: response.cost,
      },
    });
  }),

  // Image Generation Endpoints
  generateImage: asyncHandler(async (req: Request, res: Response) => {
    const { prompt, tool = 'dalle', size, quality, width, height } = req.body;
    const userId = req.user!.id;

    if (!prompt) {
      throw new AppError('Prompt is required', 400);
    }

    const params: any = { prompt };
    
    if (tool === 'dalle') {
      params.size = size || '1024x1024';
      params.quality = quality || 'standard';
    } else if (tool === 'stable-diffusion') {
      params.width = width || 1024;
      params.height = height || 1024;
    }

    const response = await aiService.processSpecializedRequest(userId, tool, params);

    res.json({
      success: true,
      data: {
        tool,
        ...response,
      },
    });
  }),

  // Video Generation Endpoints
  createVideo: asyncHandler(async (req: Request, res: Response) => {
    const { tool = 'synthesia', script, avatarId, imageUrl, audioUrl } = req.body;
    const userId = req.user!.id;

    const params: any = {};

    if (tool === 'synthesia') {
      if (!script) {
        throw new AppError('Script is required for Synthesia', 400);
      }
      params.script = script;
      params.avatarId = avatarId;
    } else if (tool === 'did' || tool === 'd-id') {
      if (!imageUrl || !audioUrl) {
        throw new AppError('Image URL and audio URL are required for D-ID', 400);
      }
      params.imageUrl = imageUrl;
      params.audioUrl = audioUrl;
    }

    const response = await aiService.processSpecializedRequest(userId, tool, params);

    res.json({
      success: true,
      data: {
        tool,
        ...response,
      },
    });
  }),

  // Voice Generation Endpoint
  generateVoice: asyncHandler(async (req: Request, res: Response) => {
    const { text, voiceId, tool = 'elevenlabs' } = req.body;
    const userId = req.user!.id;

    if (!text) {
      throw new AppError('Text is required', 400);
    }

    const params = {
      text,
      voiceId,
    };

    const response = await aiService.processSpecializedRequest(userId, tool, params);

    res.json({
      success: true,
      data: {
        tool,
        ...response,
      },
    });
  }),

  // Workflow Automation Endpoint
  createWorkflow: asyncHandler(async (req: Request, res: Response) => {
    const { workflow, tool = 'lindy' } = req.body;
    const userId = req.user!.id;

    if (!workflow) {
      throw new AppError('Workflow configuration is required', 400);
    }

    const params = {
      workflow,
    };

    const response = await aiService.processSpecializedRequest(userId, tool, params);

    res.json({
      success: true,
      data: {
        tool,
        ...response,
      },
    });
  }),

  // Educational Content Generator using Claude (existing API key)
  generateEducationalContent: asyncHandler(async (req: Request, res: Response) => {
    const { contentType, params } = req.body;
    const userId = req.user!.id;

    if (!contentType || !params) {
      throw new AppError('Content type and parameters are required', 400);
    }

    let prompt = '';
    let context = 'Você é um especialista em educação brasileira criando conteúdo educacional de alta qualidade.';

    switch (contentType) {
      case 'worksheet':
        prompt = `Crie uma folha de exercícios sobre ${params.topic} para alunos de ${params.grade}. 
        Inclua ${params.exerciseCount || 10} exercícios variados com diferentes níveis de dificuldade.
        Formate de forma clara e pronta para impressão.`;
        break;
      
      case 'presentation':
        prompt = `Crie um roteiro de apresentação sobre ${params.topic} para ${params.audience}.
        Duração: ${params.duration || 30} minutos.
        Inclua: introdução, pontos principais, exemplos, atividades interativas e conclusão.
        Sugira recursos visuais para cada slide.`;
        break;
      
      case 'studyGuide':
        prompt = `Crie um guia de estudos completo sobre ${params.subject} focado em ${params.topic}.
        Nível: ${params.grade}.
        Inclua: resumo do conteúdo, conceitos-chave, exemplos resolvidos, dicas de estudo e questões de revisão.`;
        break;
      
      case 'projectIdeas':
        prompt = `Sugira 5 ideias de projetos educacionais sobre ${params.topic} para alunos de ${params.grade}.
        Cada projeto deve incluir: objetivo, materiais necessários, passos, avaliação e variações.
        Projetos devem ser práticos e engajadores.`;
        break;

      default:
        throw new AppError('Invalid content type', 400);
    }

    // Use Claude for educational content generation
    const response = await aiService.processAIRequest(userId, 'claude', prompt, context);

    res.json({
      success: true,
      data: {
        contentType,
        content: response.content,
        params,
        usage: response.usage,
        cost: response.cost,
      },
    });
  }),

  // Batch processing for multiple AI requests
  processBatch: asyncHandler(async (req: Request, res: Response) => {
    const { requests } = req.body;
    const userId = req.user!.id;

    if (!requests || !Array.isArray(requests) || requests.length === 0) {
      throw new AppError('Requests array is required', 400);
    }

    if (requests.length > 10) {
      throw new AppError('Maximum 10 requests per batch', 400);
    }

    const results = await Promise.allSettled(
      requests.map(async (request) => {
        try {
          if (request.type === 'chat') {
            return await aiService.processAIRequest(
              userId,
              request.tool || 'chatgpt',
              request.prompt,
              request.context
            );
          } else if (request.type === 'specialized') {
            return await aiService.processSpecializedRequest(
              userId,
              request.tool,
              request.params
            );
          } else {
            throw new Error('Invalid request type');
          }
        } catch (error) {
          return { error: error.message };
        }
      })
    );

    res.json({
      success: true,
      data: {
        results: results.map((result, index) => ({
          index,
          status: result.status,
          data: result.status === 'fulfilled' ? result.value : null,
          error: result.status === 'rejected' ? result.reason : null,
        })),
      },
    });
  }),
};