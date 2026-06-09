'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import authService, { User, LoginCredentials, RegisterData } from '@/services/auth.service'
import { DEV_NO_AUTH, DevRole, getDevRole, setDevRole, makeDevUser } from '@/lib/dev-auth'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  refreshUser: () => void
  /** Troca o papel ativo no modo sem-autenticação (no-op se DEV_NO_AUTH=false) */
  switchRole: (role: DevRole) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // ── Modo sem-autenticação: cria um usuário mock com papel selecionável ──
    if (DEV_NO_AUTH) {
      const devUser = makeDevUser(getDevRole())
      setUser(devUser)
      // Mantém o localStorage 'user' coerente (a tela de login lê dele)
      try {
        localStorage.setItem('user', JSON.stringify(devUser))
      } catch {
        /* localStorage indisponível */
      }
      setIsLoading(false)
      return
    }

    // Check if user is already logged in on app start
    const currentUser = authService.getCurrentUser()
    const isAuth = authService.isAuthenticated()
    
    console.log('Auth check on load:', { currentUser: !!currentUser, isAuth, hasToken: !!authService.getAccessToken() })
    
    if (currentUser && isAuth) {
      setUser(currentUser)
    } else {
      // Clear any stale data if authentication fails
      setUser(null)
      // Also clear any invalid tokens without redirect
      if (!isAuth) {
        authService.clearTokens()
      }
    }
    
    setIsLoading(false)
  }, [])

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true)
    try {
      const authData = await authService.login(credentials)
      setUser(authData.user)
    } catch (error) {
      setUser(null)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    try {
      const authData = await authService.register(userData)
      setUser(authData.user)
    } catch (error) {
      setUser(null)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    if (DEV_NO_AUTH) {
      // Sem backend para deslogar — apenas volta para a home pública
      window.location.href = '/'
      return
    }
    authService.logout()
    setUser(null)
  }

  const refreshUser = () => {
    if (DEV_NO_AUTH) {
      setUser(makeDevUser(getDevRole()))
      return
    }
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
  }

  const switchRole = (role: DevRole) => {
    if (!DEV_NO_AUTH) return
    setDevRole(role)
    const devUser = makeDevUser(role)
    setUser(devUser)
    try {
      localStorage.setItem('user', JSON.stringify(devUser))
    } catch {
      /* localStorage indisponível */
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: DEV_NO_AUTH ? true : !!user && authService.isAuthenticated(),
    login,
    register,
    logout,
    refreshUser,
    switchRole
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}