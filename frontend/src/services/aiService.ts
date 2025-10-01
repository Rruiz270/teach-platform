const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

interface ChatRequest {
  message: string
  context?: {
    lessonId?: string
    lessonTitle?: string
    moduleLevel?: string
    previousMessages?: Array<{
      role: 'user' | 'assistant'
      content: string
    }>
  }
}

interface ChatResponse {
  success: boolean
  data: {
    response: string
    usage: {
      inputTokens: number
      outputTokens: number
    }
    timestamp: string
  }
}

interface AssessmentRequest {
  topic: string
  level: string
  questionCount?: number
  questionTypes?: ('multiple_choice' | 'true_false' | 'short_answer' | 'essay')[]
}

interface AssessmentResponse {
  success: boolean
  data: {
    questions: Array<{
      questionText: string
      questionType: string
      options?: string[]
      correctAnswer: string
      explanation: string
      difficulty: 'easy' | 'medium' | 'hard'
      learningObjective: string
    }>
    metadata: {
      topic: string
      level: string
      generatedAt: string
      totalQuestions: number
    }
  }
}

interface RecommendationsRequest {
  skills: Array<{
    name: string
    level: number
  }>
  learningSpeed: 'slow' | 'normal' | 'fast'
  goals: string[]
  completedLessons: string[]
}

interface LessonContentRequest {
  topic: string
  duration: number
  targetAudience: string
  includeActivities?: boolean
}

import Cookies from 'js-cookie'

class AIService {
  private async makeRequest<T>(endpoint: string, data: any): Promise<T> {
    const token = Cookies.get('accessToken')
    
    // Handle both cases: API_BASE_URL with or without /api/v1
    const baseUrl = API_BASE_URL.endsWith('/api/v1') ? API_BASE_URL : `${API_BASE_URL}/api/v1`
    
    const response = await fetch(`${baseUrl}/ai-assistant${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'AI service request failed')
    }

    return response.json()
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    return this.makeRequest<ChatResponse>('/chat', request)
  }

  async generateAssessment(request: AssessmentRequest): Promise<AssessmentResponse> {
    return this.makeRequest<AssessmentResponse>('/generate-assessment', request)
  }

  async getLearningRecommendations(request: RecommendationsRequest): Promise<any> {
    return this.makeRequest('/recommendations', request)
  }

  async generateLessonContent(request: LessonContentRequest): Promise<any> {
    return this.makeRequest('/generate-lesson', request)
  }

  async suggestPrompts(context: string, goal: string): Promise<any> {
    return this.makeRequest('/suggest-prompts', { context, goal })
  }
}

export const aiService = new AIService()
export type { ChatRequest, ChatResponse, AssessmentRequest, AssessmentResponse, RecommendationsRequest, LessonContentRequest }