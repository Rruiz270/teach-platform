# TEACH Platform - AI API Endpoints Documentation

## Overview
The TEACH platform provides comprehensive AI integration with multiple tools for educational content generation, multimedia creation, and workflow automation.

## Base URL
```
http://localhost:3001/api/v1
```

## Authentication
All endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Rate Limiting
- Default: 100 requests per 15 minutes
- AI endpoints: 20 requests per 15 minutes

## AI Endpoints

### 1. Chat with AI Tools
**Endpoint:** `POST /ai/chat`

Supports: ChatGPT, Claude, Gemini

**Request Body:**
```json
{
  "tool": "claude",  // "chatgpt", "claude", or "gemini"
  "prompt": "Your question or request",
  "context": "Optional context for the AI"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "response": "AI generated response",
    "tool": "claude",
    "model": "claude-3-sonnet-20240229",
    "usage": {
      "promptTokens": 150,
      "completionTokens": 200,
      "totalTokens": 350
    },
    "cost": 0.00525
  }
}
```

### 2. Generate Lesson Plan
**Endpoint:** `POST /ai/lesson-plan`

Uses Claude API (already configured) by default

**Request Body:**
```json
{
  "subject": "Matemática",
  "grade": "5º ano",
  "topic": "Frações",
  "duration": 50,
  "tool": "claude"  // optional, defaults to "chatgpt"
}
```

### 3. Generate Quiz
**Endpoint:** `POST /ai/quiz`

**Request Body:**
```json
{
  "subject": "Ciências",
  "grade": "7º ano",
  "topic": "Sistema Solar",
  "questionCount": 10,
  "tool": "claude"
}
```

### 4. Explain Concept
**Endpoint:** `POST /ai/explain`

**Request Body:**
```json
{
  "concept": "Fotossíntese",
  "grade": "6º ano",
  "subject": "Biologia",
  "tool": "claude"
}
```

### 5. Generate Activity
**Endpoint:** `POST /ai/activity`

**Request Body:**
```json
{
  "topic": "Verbos",
  "grade": "4º ano",
  "subject": "Português",
  "activityType": "interactive",
  "duration": 30,
  "tool": "claude"
}
```

### 6. Generate Student Feedback
**Endpoint:** `POST /ai/feedback`

**Request Body:**
```json
{
  "studentName": "João Silva",
  "performance": "bom desempenho com algumas dificuldades em geometria",
  "subject": "Matemática",
  "specificAreas": "Precisa melhorar em cálculo de áreas",
  "tool": "claude"
}
```

### 7. Generate Image (DALL-E / Stable Diffusion)
**Endpoint:** `POST /ai/image/generate`

**Request Body (DALL-E):**
```json
{
  "prompt": "Educational illustration of the water cycle",
  "tool": "dalle",
  "size": "1024x1024",  // "256x256", "512x512", "1024x1024"
  "quality": "standard"  // "standard" or "hd"
}
```

**Request Body (Stable Diffusion):**
```json
{
  "prompt": "Classroom scene with students learning",
  "tool": "stable-diffusion",
  "width": 1024,
  "height": 1024
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tool": "dalle",
    "url": "https://...",  // for DALL-E
    "base64": "...",       // for Stable Diffusion
    "revisedPrompt": "...",
    "model": "dall-e-3"
  }
}
```

### 8. Create Video
**Endpoint:** `POST /ai/video/create`

**Request Body (Synthesia):**
```json
{
  "tool": "synthesia",
  "script": "Olá! Hoje vamos aprender sobre frações...",
  "avatarId": "anna_costume1_cameraA"  // optional
}
```

**Request Body (D-ID):**
```json
{
  "tool": "did",
  "imageUrl": "https://example.com/teacher.jpg",
  "audioUrl": "https://example.com/lesson-audio.mp3"
}
```

### 9. Generate Voice
**Endpoint:** `POST /ai/voice/generate`

**Request Body:**
```json
{
  "text": "Bem-vindo à aula de hoje sobre o sistema solar",
  "voiceId": "pNInz6obpgDQGcFmaJgB",  // optional, default voice
  "tool": "elevenlabs"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tool": "elevenlabs",
    "audio": "base64_encoded_audio",
    "mimeType": "audio/mpeg",
    "voiceId": "pNInz6obpgDQGcFmaJgB",
    "model": "eleven_multilingual_v2"
  }
}
```

### 10. Create Workflow
**Endpoint:** `POST /ai/workflow/create`

**Request Body:**
```json
{
  "tool": "lindy",
  "workflow": {
    "name": "Grade Assignment Workflow",
    "steps": [
      {
        "action": "collect_submissions",
        "params": {...}
      },
      {
        "action": "grade_with_ai",
        "params": {...}
      }
    ]
  }
}
```

### 11. Generate Educational Content
**Endpoint:** `POST /ai/content/generate`

Uses Claude API for all content types

**Request Body:**
```json
{
  "contentType": "worksheet",  // "worksheet", "presentation", "studyGuide", "projectIdeas"
  "params": {
    "topic": "Frações",
    "grade": "5º ano",
    "exerciseCount": 15  // for worksheets
  }
}
```

### 12. Batch Processing
**Endpoint:** `POST /ai/batch`

Process multiple AI requests in parallel (max 10)

**Request Body:**
```json
{
  "requests": [
    {
      "type": "chat",
      "tool": "claude",
      "prompt": "Explain photosynthesis",
      "context": "For 5th grade students"
    },
    {
      "type": "specialized",
      "tool": "dalle",
      "params": {
        "prompt": "Diagram of photosynthesis",
        "size": "512x512"
      }
    }
  ]
}
```

## AI Tool Templates
**Endpoint:** `GET /ai/templates`

Returns pre-configured educational prompt templates.

## AI Usage Statistics
**Endpoint:** `GET /ai/usage?period=month`

Query Parameters:
- `period`: "day", "week", or "month"

**Response:**
```json
{
  "success": true,
  "data": {
    "period": "month",
    "usage": [
      {
        "tool": "CLAUDE",
        "requests": 150,
        "promptTokens": 50000,
        "completionTokens": 75000,
        "totalCost": 3.75
      }
    ]
  }
}
```

## Required Environment Variables

Add these to your `.env` file:

```env
# AI APIs (Already configured)
ANTHROPIC_API_KEY=your-claude-api-key

# Additional AI Services (Need to be configured)
OPENAI_API_KEY=your-openai-api-key  # For ChatGPT and DALL-E
GOOGLE_AI_API_KEY=your-google-ai-api-key  # For Gemini
SYNTHESIA_API_KEY=your-synthesia-api-key
ELEVENLABS_API_KEY=your-elevenlabs-api-key
LINDY_API_KEY=your-lindy-api-key
D_ID_API_KEY=your-d-id-api-key
STABLE_DIFFUSION_API_KEY=your-stable-diffusion-api-key
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "statusCode": 400
  }
}
```

## Cost Tracking

The platform automatically tracks costs for all AI usage:
- Text generation: Based on token usage
- Image generation: Fixed cost per image
- Video generation: Cost per minute/second
- Voice synthesis: Cost per character count

## Best Practices

1. **Use Claude for Educational Content**: Since Claude API is already configured, use it for all educational content generation
2. **Batch Requests**: Use the batch endpoint for multiple operations
3. **Monitor Usage**: Regularly check usage statistics to manage costs
4. **Cache Results**: Implement caching for frequently requested content
5. **Error Handling**: Always handle potential API failures gracefully

## Testing the Endpoints

Example using curl:

```bash
# Login first to get JWT token
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@teach.edu.br",
    "password": "admin123"
  }'

# Use the token for AI requests
curl -X POST http://localhost:3001/api/v1/ai/chat \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "claude",
    "prompt": "Explique o que são frações para alunos do 5º ano"
  }'
```

## Next Steps

1. **Configure API Keys**: Add all required API keys to your `.env` file
2. **Test Claude Integration**: Start with Claude endpoints since the API key is ready
3. **Add Other APIs**: Gradually add other API keys as you obtain them
4. **Frontend Integration**: Update the frontend to use these endpoints
5. **Monitor Costs**: Set up alerts for API usage costs