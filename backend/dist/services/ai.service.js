"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiService = void 0;
const axios_1 = __importDefault(require("axios"));
const logger_1 = require("../utils/logger");
const database_1 = require("../config/database");
const errorHandler_1 = require("../middleware/errorHandler");
const AI_TOOLS = {
    chatgpt: {
        name: 'ChatGPT',
        apiKey: process.env.OPENAI_API_KEY || '',
        baseUrl: 'https://api.openai.com/v1',
        model: 'gpt-4',
        maxTokens: 2000,
        temperature: 0.7,
    },
    claude: {
        name: 'Claude',
        apiKey: process.env.ANTHROPIC_API_KEY || '',
        baseUrl: 'https://api.anthropic.com',
        model: 'claude-3-sonnet-20240229',
        maxTokens: 2000,
        temperature: 0.7,
    },
    gemini: {
        name: 'Gemini',
        apiKey: process.env.GOOGLE_AI_API_KEY || '',
        baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
        model: 'gemini-pro',
        maxTokens: 2000,
        temperature: 0.7,
    },
};
exports.aiService = {
    async chatWithOpenAI(prompt, context) {
        const config = AI_TOOLS.chatgpt;
        if (!config.apiKey) {
            throw new errorHandler_1.AppError('OpenAI API key not configured', 500);
        }
        try {
            const messages = [
                {
                    role: 'system',
                    content: context || 'You are an AI assistant helping Brazilian teachers learn to use AI tools effectively in education.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ];
            const response = await axios_1.default.post(`${config.baseUrl}/chat/completions`, {
                model: config.model,
                messages,
                max_tokens: config.maxTokens,
                temperature: config.temperature,
            }, {
                headers: {
                    'Authorization': `Bearer ${config.apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            const usage = response.data.usage;
            const content = response.data.choices[0].message.content;
            return {
                content,
                usage: {
                    promptTokens: usage.prompt_tokens,
                    completionTokens: usage.completion_tokens,
                    totalTokens: usage.total_tokens,
                },
                model: config.model,
                cost: calculateOpenAICost(usage),
            };
        }
        catch (error) {
            logger_1.logger.error('OpenAI API error:', error.response?.data || error.message);
            throw new errorHandler_1.AppError('Failed to get response from ChatGPT', 500);
        }
    },
    async chatWithClaude(prompt, context) {
        const config = AI_TOOLS.claude;
        if (!config.apiKey) {
            throw new errorHandler_1.AppError('Anthropic API key not configured', 500);
        }
        try {
            const systemPrompt = context || 'You are Claude, an AI assistant helping Brazilian teachers learn to use AI tools effectively in education. Respond in Portuguese when appropriate.';
            const response = await axios_1.default.post(`${config.baseUrl}/v1/messages`, {
                model: config.model,
                max_tokens: config.maxTokens,
                temperature: config.temperature,
                system: systemPrompt,
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
            }, {
                headers: {
                    'x-api-key': config.apiKey,
                    'Content-Type': 'application/json',
                    'anthropic-version': '2023-06-01',
                },
            });
            const usage = response.data.usage;
            const content = response.data.content[0].text;
            return {
                content,
                usage: {
                    promptTokens: usage.input_tokens,
                    completionTokens: usage.output_tokens,
                    totalTokens: usage.input_tokens + usage.output_tokens,
                },
                model: config.model,
                cost: calculateClaudeCost(usage),
            };
        }
        catch (error) {
            logger_1.logger.error('Claude API error:', error.response?.data || error.message);
            throw new errorHandler_1.AppError('Failed to get response from Claude', 500);
        }
    },
    async chatWithGemini(prompt, context) {
        const config = AI_TOOLS.gemini;
        if (!config.apiKey) {
            throw new errorHandler_1.AppError('Google AI API key not configured', 500);
        }
        try {
            const systemInstruction = context || 'You are an AI assistant helping Brazilian teachers learn to use AI tools effectively in education. Respond in Portuguese when appropriate.';
            const response = await axios_1.default.post(`${config.baseUrl}/models/${config.model}:generateContent?key=${config.apiKey}`, {
                contents: [
                    {
                        parts: [
                            {
                                text: `${systemInstruction}\n\nUser: ${prompt}`,
                            },
                        ],
                    },
                ],
                generationConfig: {
                    temperature: config.temperature,
                    maxOutputTokens: config.maxTokens,
                },
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const candidate = response.data.candidates[0];
            const content = candidate.content.parts[0].text;
            const usage = response.data.usageMetadata || {};
            return {
                content,
                usage: {
                    promptTokens: usage.promptTokenCount || 0,
                    completionTokens: usage.candidatesTokenCount || 0,
                    totalTokens: usage.totalTokenCount || 0,
                },
                model: config.model,
                cost: calculateGeminiCost(usage),
            };
        }
        catch (error) {
            logger_1.logger.error('Gemini API error:', error.response?.data || error.message);
            throw new errorHandler_1.AppError('Failed to get response from Gemini', 500);
        }
    },
    async processAIRequest(userId, tool, prompt, context) {
        let response;
        switch (tool.toLowerCase()) {
            case 'chatgpt':
            case 'openai':
                response = await this.chatWithOpenAI(prompt, context);
                break;
            case 'claude':
                response = await this.chatWithClaude(prompt, context);
                break;
            case 'gemini':
                response = await this.chatWithGemini(prompt, context);
                break;
            default:
                throw new errorHandler_1.AppError(`Unsupported AI tool: ${tool}`, 400);
        }
        await this.logAIUsage(userId, tool, prompt, response);
        return response;
    },
    async logAIUsage(userId, tool, prompt, response) {
        try {
            await database_1.prisma.aIUsage.create({
                data: {
                    userId,
                    tool: tool.toUpperCase(),
                    endpoint: 'chat',
                    promptTokens: response.usage.promptTokens,
                    completionTokens: response.usage.completionTokens,
                    totalCost: response.cost ? parseFloat(response.cost.toFixed(6)) : null,
                    metadata: {
                        model: response.model,
                        prompt: prompt.substring(0, 500),
                        responseLength: response.content.length,
                    },
                },
            });
        }
        catch (error) {
            logger_1.logger.error('Failed to log AI usage:', error);
        }
    },
    async getUserAIUsage(userId, period = 'month') {
        const startDate = new Date();
        switch (period) {
            case 'day':
                startDate.setDate(startDate.getDate() - 1);
                break;
            case 'week':
                startDate.setDate(startDate.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth(startDate.getMonth() - 1);
                break;
        }
        const usage = await database_1.prisma.aIUsage.groupBy({
            by: ['tool'],
            where: {
                userId,
                createdAt: {
                    gte: startDate,
                },
            },
            _sum: {
                promptTokens: true,
                completionTokens: true,
                totalCost: true,
            },
            _count: {
                id: true,
            },
        });
        return usage.map(item => ({
            tool: item.tool,
            requests: item._count.id,
            promptTokens: item._sum.promptTokens || 0,
            completionTokens: item._sum.completionTokens || 0,
            totalCost: item._sum.totalCost || 0,
        }));
    },
    getEducationalPrompts() {
        return {
            lessonPlan: {
                title: 'Criar Plano de Aula',
                prompt: 'Crie um plano de aula detalhado para {subject} para alunos de {grade}. Tópico: {topic}. Duração: {duration} minutos. Inclua objetivos, atividades, materiais e avaliação.',
                category: 'Planejamento',
            },
            quiz: {
                title: 'Gerar Quiz',
                prompt: 'Crie um quiz de {questionCount} questões sobre {topic} para alunos de {grade}. Inclua questões de múltipla escolha, verdadeiro/falso e discursivas.',
                category: 'Avaliação',
            },
            explanation: {
                title: 'Explicar Conceito',
                prompt: 'Explique o conceito de {concept} de forma simples e envolvente para alunos de {grade}. Use analogias e exemplos práticos.',
                category: 'Ensino',
            },
            activity: {
                title: 'Atividade Interativa',
                prompt: 'Crie uma atividade interativa sobre {topic} para alunos de {grade}. A atividade deve ser envolvente e promover participação ativa.',
                category: 'Atividades',
            },
            feedback: {
                title: 'Feedback para Aluno',
                prompt: 'Escreva um feedback construtivo para um aluno que {performance} em {subject}. Seja encorajador e ofereça sugestões específicas para melhoria.',
                category: 'Avaliação',
            },
        };
    },
};
function calculateOpenAICost(usage) {
    const inputCostPer1K = 0.03;
    const outputCostPer1K = 0.06;
    const inputCost = (usage.prompt_tokens / 1000) * inputCostPer1K;
    const outputCost = (usage.completion_tokens / 1000) * outputCostPer1K;
    return inputCost + outputCost;
}
function calculateClaudeCost(usage) {
    const inputCostPer1K = 0.003;
    const outputCostPer1K = 0.015;
    const inputCost = (usage.input_tokens / 1000) * inputCostPer1K;
    const outputCost = (usage.output_tokens / 1000) * outputCostPer1K;
    return inputCost + outputCost;
}
function calculateGeminiCost(usage) {
    const costPer1K = 0.0005;
    const totalTokens = usage.totalTokenCount || 0;
    return (totalTokens / 1000) * costPer1K;
}
//# sourceMappingURL=ai.service.js.map