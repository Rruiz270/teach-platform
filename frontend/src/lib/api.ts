import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'

// Create axios instance
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const isAIEndpoint = error.config?.url?.includes('/ai/')
      const isLoginEndpoint = error.config?.url?.includes('/auth/login')
      const currentPath = window.location.pathname
      
      // Don't redirect if:
      // 1. It's an AI endpoint (let component handle it)
      // 2. It's a login attempt (let login form handle it)
      // 3. We're already on the login page
      if (!isAIEndpoint && !isLoginEndpoint && currentPath !== '/login') {
        // Clear token and redirect to login
        Cookies.remove('token')
        Cookies.remove('refreshToken')
        window.location.href = '/login'
      }
      // For AI endpoints and login attempts, just reject the promise
    }
    return Promise.reject(error)
  }
)

// API Types
export interface User {
  id: string
  email: string
  role: string
  isEmailVerified: boolean
  profile: {
    name: string
    phone?: string
    photoUrl?: string
    teachingLevel: string
    subjects: string[]
    state: string
    city: string
    bio?: string
    yearsTeaching?: number
    school?: {
      id: string
      name: string
      type: string
    }
  }
  subscription: {
    type: string
    plan: string
    endDate: string
    isActive: boolean
  }
  progress: Array<{
    moduleId: string
    progressPercent: number
    completedAt?: string
  }>
  badges: Array<{
    badge: {
      name: string
      description: string
      iconUrl: string
      points: number
    }
    earnedAt: string
  }>
}

export interface Module {
  id: string
  type: string
  title: string
  description: string
  duration: number
  order: number
  thumbnailUrl?: string
  isPublished: boolean
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  description: string
  content: string
  videoUrl?: string
  duration?: number
  order: number
  isPublished: boolean
  resources: Resource[]
}

export interface Resource {
  id: string
  title: string
  description?: string
  type: string
  url: string
}

export interface Assessment {
  id: string
  title: string
  description: string
  type: string
  passingScore: number
  maxAttempts: number
  timeLimit?: number
  questions: Question[]
}

export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: string
  explanation?: string
  points: number
}

// Auth API
export const authAPI = {
  async register(data: {
    email: string
    password: string
    name: string
    teachingLevel: string
    subjects: string[]
    state: string
    city: string
    phone?: string
    schoolId?: string
  }) {
    const response: AxiosResponse<{ user: User; tokens: { accessToken: string; refreshToken: string } }> = 
      await api.post('/auth/register', data)
    return response.data
  },

  async login(email: string, password: string) {
    const response: AxiosResponse<{ user: User; tokens: { accessToken: string; refreshToken: string } }> = 
      await api.post('/auth/login', { email, password })
    return response.data
  },

  async logout() {
    await api.post('/auth/logout')
  },

  async getCurrentUser() {
    const response: AxiosResponse<{ user: User }> = await api.get('/auth/me')
    return response.data
  },

  async forgotPassword(email: string) {
    await api.post('/auth/forgot-password', { email })
  },

  async resetPassword(token: string, password: string) {
    await api.post('/auth/reset-password', { token, password })
  },

  async refreshToken(refreshToken: string) {
    const response: AxiosResponse<{ tokens: { accessToken: string; refreshToken: string } }> = 
      await api.post('/auth/refresh-token', { refreshToken })
    return response.data
  },
}

// Modules API
export const modulesAPI = {
  async getModules() {
    const response: AxiosResponse<{ modules: Module[] }> = await api.get('/modules')
    return response.data
  },

  async getModule(id: string) {
    const response: AxiosResponse<{ module: Module }> = await api.get(`/modules/${id}`)
    return response.data
  },
}

// Lessons API
export const lessonsAPI = {
  async getLessons(moduleId?: string) {
    const params = moduleId ? { moduleId } : {}
    const response: AxiosResponse<{ lessons: Lesson[] }> = await api.get('/lessons', { params })
    return response.data
  },

  async getLesson(id: string) {
    const response: AxiosResponse<{ lesson: Lesson }> = await api.get(`/lessons/${id}`)
    return response.data
  },

  async markLessonComplete(lessonId: string, timeSpent: number) {
    await api.post(`/lessons/${lessonId}/complete`, { timeSpent })
  },
}

// Progress API
export const progressAPI = {
  async getProgress(userId?: string) {
    const params = userId ? { userId } : {}
    const response: AxiosResponse<{ progress: any[] }> = await api.get('/progress', { params })
    return response.data
  },

  async updateProgress(moduleId: string, lessonId: string, progressPercent: number) {
    await api.put('/progress', { moduleId, lessonId, progressPercent })
  },
}

// Assessments API
export const assessmentsAPI = {
  async getAssessments(lessonId?: string) {
    const params = lessonId ? { lessonId } : {}
    const response: AxiosResponse<{ assessments: Assessment[] }> = await api.get('/assessments', { params })
    return response.data
  },

  async submitAssessment(assessmentId: string, answers: Record<string, string>, timeTaken: number) {
    const response: AxiosResponse<{ result: any }> = await api.post('/assessments/submit', {
      assessmentId,
      answers,
      timeTaken,
    })
    return response.data
  },

  async submitProject(assessmentId: string, title: string, description: string, fileUrls: string[]) {
    const response: AxiosResponse<{ submission: any }> = await api.post('/assessments/project', {
      assessmentId,
      title,
      description,
      fileUrls,
    })
    return response.data
  },
}

// AI API
export const aiAPI = {
  async chat(tool: string, prompt: string, context?: string) {
    try {
      const response: AxiosResponse<{ response: string; usage: any }> = await api.post('/ai/chat', {
        tool,
        prompt,
        context,
      })
      return response.data
    } catch (error) {
      // If "No token provided" error, the backend might expect the API key differently
      if (error.response?.data?.message === 'No token provided') {
        console.log('Trying with token in request body...')
        
        // Get the auth token from cookies
        const token = Cookies.get('token')
        
        // Try sending token in the request body
        const response: AxiosResponse<{ response: string; usage: any }> = await api.post('/ai/chat', {
          tool,
          prompt,
          context,
          token: token, // Add token to request body
        })
        return response.data
      }
      throw error
    }
  },
}

// Users API
export const usersAPI = {
  async updateProfile(data: Partial<User['profile']>) {
    const response: AxiosResponse<{ user: User }> = await api.put('/users/profile', data)
    return response.data
  },

  async getLeaderboard(limit?: number, teachingLevel?: string, state?: string) {
    const params = { limit, teachingLevel, state }
    const response: AxiosResponse<{ leaderboard: any[] }> = await api.get('/users/leaderboard', { params })
    return response.data
  },

  async getStatistics() {
    const response: AxiosResponse<{ statistics: any }> = await api.get('/users/statistics')
    return response.data
  },
}