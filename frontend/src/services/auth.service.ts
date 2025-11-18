import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  role: 'TEACHER' | 'ADMIN' | 'PARENT'
  teachingLevel: 'EARLY_YEARS' | 'ELEMENTARY' | 'JUNIOR_HIGH' | 'HIGH_SCHOOL' | 'UNIVERSITY'
  subjects: string[]
  state: string
  city: string
  phone?: string
  schoolId?: string
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  isEmailVerified: boolean
  createdAt: string
}

export interface AuthResponse {
  user: User
  tokens: {
    accessToken: string
    refreshToken: string
  }
}

class AuthService {
  private axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  constructor() {
    // Clear any stale tokens from previous platform versions
    this.migrateTokens()
    
    // Add request interceptor to include auth token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getAccessToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Add response interceptor to handle token refresh
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            const newTokens = await this.refreshToken()
            originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`
            return this.axiosInstance(originalRequest)
          } catch (refreshError) {
            this.logout()
            window.location.href = '/login'
            return Promise.reject(refreshError)
          }
        }

        return Promise.reject(error)
      }
    )
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.axiosInstance.post('/auth/login', credentials)
      const authData: AuthResponse = response.data

      // Store tokens in cookies
      this.setTokens(authData.tokens)
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(authData.user))

      return authData
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message)
      throw new Error(error.response?.data?.message || 'Erro ao fazer login')
    }
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await this.axiosInstance.post('/auth/register', userData)
      const authData: AuthResponse = response.data

      // Store tokens in cookies
      this.setTokens(authData.tokens)
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(authData.user))

      return authData
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message)
      
      // Preserve original error structure for better error handling
      if (error.response?.data?.error?.message) {
        const errorMessage = error.response.data.error.message
        const newError = new Error(errorMessage)
        ;(newError as any).response = error.response // Preserve response for detailed error handling
        throw newError
      } else if (error.response?.data?.details) {
        // Validation errors
        const newError = new Error('Validation failed')
        ;(newError as any).response = error.response
        throw newError
      } else {
        throw new Error(error.response?.data?.message || 'Erro ao criar conta')
      }
    }
  }

  async refreshToken(): Promise<AuthResponse['tokens']> {
    try {
      const refreshToken = this.getRefreshToken()
      if (!refreshToken) {
        throw new Error('No refresh token available')
      }

      const response = await axios.post(`${API_URL}/auth/refresh-tokens`, {
        refreshToken,
      })

      const tokens = response.data.tokens
      this.setTokens(tokens)
      
      return tokens
    } catch (error: any) {
      console.error('Token refresh error:', error.response?.data || error.message)
      throw new Error('Falha ao renovar token de acesso')
    }
  }

  logout(): void {
    this.clearTokens()
    
    // Redirect to login page
    window.location.href = '/login'
  }

  clearTokens(): void {
    // Remove tokens from cookies (all possible variations)
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    Cookies.remove('token') // Legacy token name
    
    // Remove user data from localStorage
    localStorage.removeItem('user')
    
    // Clear any other auth-related data that might be cached
    localStorage.removeItem('auth')
    sessionStorage.clear()
  }

  getCurrentUser(): User | null {
    try {
      const userString = localStorage.getItem('user')
      return userString ? JSON.parse(userString) : null
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  getAccessToken(): string | null {
    return Cookies.get('accessToken') || null
  }

  getRefreshToken(): string | null {
    return Cookies.get('refreshToken') || null
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken()
    const user = this.getCurrentUser()
    return !!(token && user)
  }

  private setTokens(tokens: AuthResponse['tokens']): void {
    // Set access token (30 days expiry since backend doesn't provide expires time)
    Cookies.set('accessToken', tokens.accessToken, {
      expires: 30,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })

    // Set refresh token (90 days expiry)
    Cookies.set('refreshToken', tokens.refreshToken, {
      expires: 90,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
  }

  // Verify email
  async verifyEmail(token: string): Promise<void> {
    try {
      await this.axiosInstance.post('/auth/verify-email', { token })
    } catch (error: any) {
      console.error('Email verification error:', error.response?.data || error.message)
      throw new Error(error.response?.data?.message || 'Erro ao verificar email')
    }
  }

  // Forgot password
  async forgotPassword(email: string): Promise<void> {
    try {
      await this.axiosInstance.post('/auth/forgot-password', { email })
    } catch (error: any) {
      console.error('Forgot password error:', error.response?.data || error.message)
      throw new Error(error.response?.data?.message || 'Erro ao enviar email de recuperação')
    }
  }

  // Reset password
  async resetPassword(token: string, password: string): Promise<void> {
    try {
      await this.axiosInstance.post('/auth/reset-password', { token, password })
    } catch (error: any) {
      console.error('Reset password error:', error.response?.data || error.message)
      throw new Error(error.response?.data?.message || 'Erro ao redefinir senha')
    }
  }

  // Migration method to clear stale tokens after platform updates
  private migrateTokens(): void {
    const version = localStorage.getItem('authVersion')
    const currentVersion = '2.0' // Update this when you make auth changes
    
    if (version !== currentVersion) {
      console.log('Auth migration: Clearing stale tokens from previous version')
      this.clearTokens()
      localStorage.setItem('authVersion', currentVersion)
    }
  }
}

export default new AuthService()