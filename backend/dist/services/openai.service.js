"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openaiService = void 0;
const openai_1 = __importDefault(require("openai"));
const errorHandler_1 = require("../middleware/errorHandler");
const logger_1 = require("../utils/logger");
class OpenAIService {
    client = null;
    initializeClient() {
        if (!this.client) {
            const apiKey = process.env.OPENAI_API_KEY;
            if (!apiKey) {
                throw new errorHandler_1.AppError('OPENAI_API_KEY is not configured. Please set up the API key in your environment variables.', 500);
            }
            logger_1.logger.info(`Initializing OpenAI with API key: ${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`);
            this.client = new openai_1.default({
                apiKey: apiKey,
            });
        }
        return this.client;
    }
    async generateCourseContent(request) {
        try {
            const client = this.initializeClient();
            const levelPrompts = {
                starter: 'Linguagem simples e acessível. Conceitos fundamentais sobre IA. Exemplos práticos e cotidianos. Foco em desmistificar a IA.',
                survivor: 'Aplicações práticas da IA. Projetos colaborativos. Integração de ferramentas. Casos de uso reais em educação.',
                explorer: 'Análise crítica e pensamento complexo. Uso avançado de múltiplas IAs. Projetos interdisciplinares. Metodologias inovadoras.',
                expert: 'Liderança em educação com IA. Facilitação da aprendizagem autônoma. Criação de conteúdo avançado. Mentoria e coaching.'
            };
            const prompt = `Você é um especialista em educação sobre IA criando conteúdo para o curso TEACH.

CONTEXTO:
- Nível: ${request.nivel}
- Ferramenta Foco: ${request.ferramenta_foco}
- Tipo: ${request.tipo_conteudo}
- Objetivo: ${request.objetivo}
- Duração: ${request.duracao} minutos
- Gamificação: ${request.gamificacao || 'Básico'}

DIRETRIZES PARA ${request.nivel.toUpperCase()}:
${levelPrompts[request.nivel.toLowerCase()] || levelPrompts.starter}

RETORNE APENAS UM JSON VÁLIDO com esta estrutura exata:
{
  "titulo": "Título do conteúdo",
  "descricao": "Descrição breve e atrativa",
  "objetivos_especificos": ["objetivo específico 1", "objetivo específico 2", "objetivo específico 3"],
  "conteudo_principal": "Conteúdo detalhado da aula em formato HTML",
  "atividades_praticas": ["Atividade prática 1", "Atividade prática 2"],
  "recursos_necessarios": ["Computador", "Internet", "Outro recurso"],
  "avaliacao": "Método de avaliação do aprendizado",
  "gamificacao_elementos": ["badge", "pontos", "desafio"],
  "proximos_passos": "Como conectar com próximo módulo",
  "tempo_estimado": "${request.duracao} minutos"
}

Garanta que o conteúdo seja específico para ${request.ferramenta_foco} e apropriado para professores brasileiros.`;
            const response = await client.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: 'Você é um especialista em educação brasileira especializado em IA e tecnologia educacional. Sempre responda em português brasileiro com conteúdo pedagógico de alta qualidade.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 2500,
                temperature: 0.7,
            });
            const content = response.choices[0]?.message?.content || '';
            return {
                content,
                usage: {
                    inputTokens: response.usage?.prompt_tokens || 0,
                    outputTokens: response.usage?.completion_tokens || 0,
                }
            };
        }
        catch (error) {
            logger_1.logger.error('OpenAI API Error:', {
                error: error.message,
                stack: error.stack,
            });
            if (error.code === 'insufficient_quota') {
                throw new errorHandler_1.AppError('OpenAI quota exceeded. Please check your billing.', 429);
            }
            if (error.code === 'invalid_api_key') {
                throw new errorHandler_1.AppError('OpenAI API key is invalid.', 401);
            }
            throw new errorHandler_1.AppError(`OpenAI service error: ${error.message}`, 500);
        }
    }
    async generateBNCCLesson(request) {
        try {
            const client = this.initializeClient();
            const prompt = `Você é um especialista em educação brasileira criando aulas alinhadas com a BNCC.

CONTEXTO DA AULA:
- Disciplina: ${request.disciplina}
- Ano/Série: ${request.ano_serie}
- Tópico: ${request.topico}
- Duração: ${request.duracao} minutos
- Objetivos: ${request.objetivos}
- Código BNCC: ${request.codigo_bncc || 'A definir'}
- Recursos: ${request.recursos?.join(', ') || 'Recursos básicos'}

RETORNE APENAS UM JSON VÁLIDO com esta estrutura:
{
  "titulo": "Título da aula",
  "descricao": "Descrição da aula",
  "competencias_bncc": ["Competência 1", "Competência 2"],
  "habilidades_bncc": ["EF05MA02", "EF05MA03"],
  "objetivos_especificos": ["objetivo1", "objetivo2"],
  "metodologia": "Metodologia da aula",
  "introducao": "Como iniciar a aula (10-15% do tempo)",
  "desenvolvimento": "Atividades principais (70-80% do tempo)",
  "conclusao": "Fechamento e síntese (10-15% do tempo)",
  "atividades_detalhadas": ["atividade1", "atividade2"],
  "material_necessario": ["material1", "material2"],
  "avaliacao_formativa": "Como avaliar durante a aula",
  "avaliacao_somativa": "Como avaliar o aprendizado",
  "diferenciacoes_pedagogicas": "Adaptações para diferentes níveis",
  "cronograma_detalhado": "Divisão temporal das atividades"
}

Garanta que o conteúdo esteja alinhado com a BNCC e seja apropriado para a idade dos alunos.`;
            const response = await client.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: 'Você é um especialista em educação brasileira e BNCC. Sempre responda em português brasileiro com conteúdo pedagógico alinhado com as diretrizes nacionais.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 3500,
                temperature: 0.8,
            });
            const content = response.choices[0]?.message?.content || '';
            return {
                content,
                usage: {
                    inputTokens: response.usage?.prompt_tokens || 0,
                    outputTokens: response.usage?.completion_tokens || 0,
                }
            };
        }
        catch (error) {
            logger_1.logger.error('OpenAI BNCC API Error:', error);
            throw new errorHandler_1.AppError(`OpenAI BNCC service error: ${error.message}`, 500);
        }
    }
    async generateAssessment(topic, level, questionCount = 5) {
        try {
            const client = this.initializeClient();
            const prompt = `Crie ${questionCount} questões de avaliação sobre "${topic}" para nível "${level}".

RETORNE APENAS UM JSON VÁLIDO:
{
  "questions": [
    {
      "questionText": "Texto da pergunta",
      "questionType": "multiple_choice",
      "options": ["A) Opção 1", "B) Opção 2", "C) Opção 3", "D) Opção 4"],
      "correctAnswer": "A",
      "explanation": "Explicação da resposta correta",
      "difficulty": "medium",
      "learningObjective": "Objetivo de aprendizagem"
    }
  ],
  "metadata": {
    "topic": "${topic}",
    "level": "${level}",
    "generatedAt": "${new Date().toISOString()}",
    "totalQuestions": ${questionCount}
  }
}`;
            const response = await client.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: 'Você é um especialista em avaliação educacional. Crie questões pedagógicas de alta qualidade.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 2000,
                temperature: 0.7,
            });
            const content = response.choices[0]?.message?.content || '';
            return JSON.parse(content);
        }
        catch (error) {
            logger_1.logger.error('OpenAI Assessment Error:', error);
            throw new errorHandler_1.AppError(`Assessment generation error: ${error.message}`, 500);
        }
    }
}
exports.openaiService = new OpenAIService();
//# sourceMappingURL=openai.service.js.map