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
    dalle: {
        name: 'DALL-E',
        apiKey: process.env.OPENAI_API_KEY || '',
        baseUrl: 'https://api.openai.com/v1',
        model: 'dall-e-3',
        maxTokens: 0,
        temperature: 0,
    },
    synthesia: {
        name: 'Synthesia',
        apiKey: process.env.SYNTHESIA_API_KEY || '',
        baseUrl: 'https://api.synthesia.io/v2',
        model: 'default',
        maxTokens: 0,
        temperature: 0,
    },
    elevenlabs: {
        name: 'ElevenLabs',
        apiKey: process.env.ELEVENLABS_API_KEY || '',
        baseUrl: 'https://api.elevenlabs.io/v1',
        model: 'eleven_multilingual_v2',
        maxTokens: 0,
        temperature: 0,
    },
    lindy: {
        name: 'Lindy',
        apiKey: process.env.LINDY_API_KEY || '',
        baseUrl: 'https://api.lindy.ai/v1',
        model: 'default',
        maxTokens: 0,
        temperature: 0,
    },
    did: {
        name: 'D-ID',
        apiKey: process.env.D_ID_API_KEY || '',
        baseUrl: 'https://api.d-id.com',
        model: 'default',
        maxTokens: 0,
        temperature: 0,
    },
    stableDiffusion: {
        name: 'Stable Diffusion',
        apiKey: process.env.STABLE_DIFFUSION_API_KEY || '',
        baseUrl: 'https://api.stability.ai/v1',
        model: 'stable-diffusion-xl-1024-v1-0',
        maxTokens: 0,
        temperature: 0,
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
    async generateImageWithDallE(prompt, size = '1024x1024', quality = 'standard') {
        const config = AI_TOOLS.dalle;
        if (!config.apiKey) {
            throw new errorHandler_1.AppError('OpenAI API key not configured for DALL-E', 500);
        }
        try {
            const response = await axios_1.default.post(`${config.baseUrl}/images/generations`, {
                model: config.model,
                prompt,
                n: 1,
                size,
                quality,
            }, {
                headers: {
                    'Authorization': `Bearer ${config.apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            return {
                url: response.data.data[0].url,
                revisedPrompt: response.data.data[0].revised_prompt,
                model: config.model,
            };
        }
        catch (error) {
            logger_1.logger.error('DALL-E API error:', error.response?.data || error.message);
            throw new errorHandler_1.AppError('Failed to generate image with DALL-E', 500);
        }
    },
    async generateImageWithStableDiffusion(prompt, width = 1024, height = 1024) {
        const config = AI_TOOLS.stableDiffusion;
        if (!config.apiKey) {
            throw new errorHandler_1.AppError('Stable Diffusion API key not configured', 500);
        }
        try {
            const response = await axios_1.default.post(`${config.baseUrl}/generation/${config.model}/text-to-image`, {
                text_prompts: [{ text: prompt, weight: 1 }],
                cfg_scale: 7,
                height,
                width,
                samples: 1,
                steps: 30,
            }, {
                headers: {
                    'Authorization': `Bearer ${config.apiKey}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            if (response.data.artifacts && response.data.artifacts.length > 0) {
                return {
                    base64: response.data.artifacts[0].base64,
                    finishReason: response.data.artifacts[0].finishReason,
                    seed: response.data.artifacts[0].seed,
                    model: config.model,
                };
            }
            throw new errorHandler_1.AppError('No image generated', 500);
        }
        catch (error) {
            logger_1.logger.error('Stable Diffusion API error:', error.response?.data || error.message);
            throw new errorHandler_1.AppError('Failed to generate image with Stable Diffusion', 500);
        }
    },
    async createVideoWithSynthesia(script, avatarId = 'anna_costume1_cameraA') {
        const config = AI_TOOLS.synthesia;
        if (!config.apiKey) {
            throw new errorHandler_1.AppError('Synthesia API key not configured', 500);
        }
        try {
            const response = await axios_1.default.post(`${config.baseUrl}/videos`, {
                test: false,
                title: 'Educational Video',
                description: 'AI-generated educational content',
                visibility: 'private',
                input: [
                    {
                        avatarId,
                        scriptText: script,
                        language: 'pt-BR',
                    },
                ],
            }, {
                headers: {
                    'Authorization': config.apiKey,
                    'Content-Type': 'application/json',
                },
            });
            return {
                videoId: response.data.id,
                status: response.data.status,
                createdAt: response.data.createdAt,
            };
        }
        catch (error) {
            logger_1.logger.error('Synthesia API error:', error.response?.data || error.message);
            throw new errorHandler_1.AppError('Failed to create video with Synthesia', 500);
        }
    },
    async createTalkingAvatarWithDID(imageUrl, audioUrl) {
        const config = AI_TOOLS.did;
        if (!config.apiKey) {
            throw new errorHandler_1.AppError('D-ID API key not configured', 500);
        }
        try {
            const response = await axios_1.default.post(`${config.baseUrl}/talks`, {
                source_url: imageUrl,
                script: {
                    type: 'audio',
                    audio_url: audioUrl,
                },
            }, {
                headers: {
                    'Authorization': `Basic ${config.apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            return {
                talkId: response.data.id,
                status: response.data.status,
                resultUrl: response.data.result_url,
            };
        }
        catch (error) {
            logger_1.logger.error('D-ID API error:', error.response?.data || error.message);
            throw new errorHandler_1.AppError('Failed to create talking avatar with D-ID', 500);
        }
    },
    async generateVoiceWithElevenLabs(text, voiceId = 'pNInz6obpgDQGcFmaJgB') {
        const config = AI_TOOLS.elevenlabs;
        if (!config.apiKey) {
            throw new errorHandler_1.AppError('ElevenLabs API key not configured', 500);
        }
        try {
            const response = await axios_1.default.post(`${config.baseUrl}/text-to-speech/${voiceId}`, {
                text,
                model_id: config.model,
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75,
                },
            }, {
                headers: {
                    'xi-api-key': config.apiKey,
                    'Content-Type': 'application/json',
                    'Accept': 'audio/mpeg',
                },
                responseType: 'arraybuffer',
            });
            const audioBase64 = Buffer.from(response.data).toString('base64');
            return {
                audio: audioBase64,
                mimeType: 'audio/mpeg',
                voiceId,
                model: config.model,
            };
        }
        catch (error) {
            logger_1.logger.error('ElevenLabs API error:', error.response?.data || error.message);
            throw new errorHandler_1.AppError('Failed to generate voice with ElevenLabs', 500);
        }
    },
    async createWorkflowWithLindy(workflow) {
        const config = AI_TOOLS.lindy;
        if (!config.apiKey) {
            throw new errorHandler_1.AppError('Lindy API key not configured', 500);
        }
        try {
            const response = await axios_1.default.post(`${config.baseUrl}/workflows`, workflow, {
                headers: {
                    'Authorization': `Bearer ${config.apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            return {
                workflowId: response.data.id,
                status: response.data.status,
                executionUrl: response.data.executionUrl,
            };
        }
        catch (error) {
            logger_1.logger.error('Lindy API error:', error.response?.data || error.message);
            throw new errorHandler_1.AppError('Failed to create workflow with Lindy', 500);
        }
    },
    async processSpecializedRequest(userId, tool, params) {
        let response;
        switch (tool.toLowerCase()) {
            case 'dalle':
                response = await this.generateImageWithDallE(params.prompt, params.size, params.quality);
                break;
            case 'stable-diffusion':
            case 'stablediffusion':
                response = await this.generateImageWithStableDiffusion(params.prompt, params.width, params.height);
                break;
            case 'synthesia':
                response = await this.createVideoWithSynthesia(params.script, params.avatarId);
                break;
            case 'did':
            case 'd-id':
                response = await this.createTalkingAvatarWithDID(params.imageUrl, params.audioUrl);
                break;
            case 'elevenlabs':
                response = await this.generateVoiceWithElevenLabs(params.text, params.voiceId);
                break;
            case 'lindy':
                response = await this.createWorkflowWithLindy(params.workflow);
                break;
            default:
                throw new errorHandler_1.AppError(`Unsupported specialized tool: ${tool}`, 400);
        }
        await this.logSpecializedUsage(userId, tool, params, response);
        return response;
    },
    async logSpecializedUsage(userId, tool, params, response) {
        try {
            await database_1.prisma.aIUsage.create({
                data: {
                    userId,
                    tool: tool.toUpperCase(),
                    endpoint: 'specialized',
                    promptTokens: 0,
                    completionTokens: 0,
                    totalCost: this.calculateSpecializedCost(tool, params),
                    metadata: {
                        params,
                        response: response,
                    },
                },
            });
        }
        catch (error) {
            logger_1.logger.error('Failed to log specialized AI usage:', error);
        }
    },
    calculateSpecializedCost(tool, params) {
        const costs = {
            dalle: 0.02,
            'stable-diffusion': 0.002,
            synthesia: 5.00,
            did: 0.10,
            elevenlabs: 0.30,
            lindy: 0.05,
        };
        return costs[tool.toLowerCase()] || 0;
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