"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiHealthService = exports.APIHealthService = void 0;
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const openai_1 = __importDefault(require("openai"));
const logger_1 = require("../utils/logger");
class APIHealthService {
    async checkAllAPIs() {
        const results = [];
        results.push(await this.checkAnthropic());
        results.push(await this.checkOpenAI());
        results.push(await this.checkSynthesia());
        results.push(await this.checkElevenLabs());
        return results;
    }
    async checkAnthropic() {
        const startTime = Date.now();
        if (!process.env.ANTHROPIC_API_KEY) {
            return {
                name: 'Claude (Text Generation)',
                provider: 'Anthropic',
                status: 'no_api_key',
                lastChecked: new Date()
            };
        }
        try {
            const client = new sdk_1.default({
                apiKey: process.env.ANTHROPIC_API_KEY,
            });
            const response = await client.messages.create({
                model: 'claude-3-haiku-20240307',
                max_tokens: 10,
                messages: [{ role: 'user', content: 'Hi' }],
            });
            const responseTime = Date.now() - startTime;
            if (response.content && response.content.length > 0) {
                return {
                    name: 'Claude (Text Generation)',
                    provider: 'Anthropic',
                    status: 'connected',
                    lastChecked: new Date(),
                    responseTime
                };
            }
            else {
                return {
                    name: 'Claude (Text Generation)',
                    provider: 'Anthropic',
                    status: 'error',
                    lastChecked: new Date(),
                    errorMessage: 'No response content'
                };
            }
        }
        catch (error) {
            logger_1.logger.error('Anthropic health check failed:', error);
            return {
                name: 'Claude (Text Generation)',
                provider: 'Anthropic',
                status: 'error',
                lastChecked: new Date(),
                errorMessage: error.message || 'Unknown error'
            };
        }
    }
    async checkOpenAI() {
        const startTime = Date.now();
        if (!process.env.OPENAI_API_KEY) {
            return {
                name: 'GPT-4 & DALL-E',
                provider: 'OpenAI',
                status: 'no_api_key',
                lastChecked: new Date()
            };
        }
        try {
            const client = new openai_1.default({
                apiKey: process.env.OPENAI_API_KEY,
            });
            const models = await client.models.list();
            const responseTime = Date.now() - startTime;
            if (models.data && models.data.length > 0) {
                return {
                    name: 'GPT-4 & DALL-E',
                    provider: 'OpenAI',
                    status: 'connected',
                    lastChecked: new Date(),
                    responseTime
                };
            }
            else {
                return {
                    name: 'GPT-4 & DALL-E',
                    provider: 'OpenAI',
                    status: 'error',
                    lastChecked: new Date(),
                    errorMessage: 'No models available'
                };
            }
        }
        catch (error) {
            logger_1.logger.error('OpenAI health check failed:', error);
            return {
                name: 'GPT-4 & DALL-E',
                provider: 'OpenAI',
                status: 'error',
                lastChecked: new Date(),
                errorMessage: error.message || 'Unknown error'
            };
        }
    }
    async checkSynthesia() {
        const startTime = Date.now();
        if (!process.env.SYNTHESIA_API_KEY) {
            return {
                name: 'Video Generation',
                provider: 'Synthesia',
                status: 'no_api_key',
                lastChecked: new Date()
            };
        }
        try {
            const response = await fetch('https://api.synthesia.io/v2/videos', {
                method: 'GET',
                headers: {
                    'Authorization': process.env.SYNTHESIA_API_KEY,
                    'Content-Type': 'application/json'
                }
            });
            const responseTime = Date.now() - startTime;
            if (response.ok || response.status === 200) {
                return {
                    name: 'Video Generation',
                    provider: 'Synthesia',
                    status: 'connected',
                    lastChecked: new Date(),
                    responseTime
                };
            }
            else {
                return {
                    name: 'Video Generation',
                    provider: 'Synthesia',
                    status: 'error',
                    lastChecked: new Date(),
                    errorMessage: `HTTP ${response.status}: ${response.statusText}`
                };
            }
        }
        catch (error) {
            logger_1.logger.error('Synthesia health check failed:', error);
            return {
                name: 'Video Generation',
                provider: 'Synthesia',
                status: 'error',
                lastChecked: new Date(),
                errorMessage: error.message || 'Connection failed'
            };
        }
    }
    async checkElevenLabs() {
        const startTime = Date.now();
        if (!process.env.ELEVENLABS_API_KEY) {
            return {
                name: 'Voice Generation',
                provider: 'ElevenLabs',
                status: 'no_api_key',
                lastChecked: new Date()
            };
        }
        try {
            const response = await fetch('https://api.elevenlabs.io/v1/user', {
                method: 'GET',
                headers: {
                    'xi-api-key': process.env.ELEVENLABS_API_KEY,
                    'Content-Type': 'application/json'
                }
            });
            const responseTime = Date.now() - startTime;
            if (response.ok) {
                return {
                    name: 'Voice Generation',
                    provider: 'ElevenLabs',
                    status: 'connected',
                    lastChecked: new Date(),
                    responseTime
                };
            }
            else {
                return {
                    name: 'Voice Generation',
                    provider: 'ElevenLabs',
                    status: 'error',
                    lastChecked: new Date(),
                    errorMessage: `HTTP ${response.status}: ${response.statusText}`
                };
            }
        }
        catch (error) {
            logger_1.logger.error('ElevenLabs health check failed:', error);
            return {
                name: 'Voice Generation',
                provider: 'ElevenLabs',
                status: 'error',
                lastChecked: new Date(),
                errorMessage: error.message || 'Connection failed'
            };
        }
    }
}
exports.APIHealthService = APIHealthService;
exports.apiHealthService = new APIHealthService();
//# sourceMappingURL=api-health.service.js.map