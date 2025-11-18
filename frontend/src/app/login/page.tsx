'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { AlertCircle, RefreshCw } from 'lucide-react'
import authService from '@/services/auth.service'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { login } = useAuth()
  const router = useRouter()

  const clearAuthData = () => {
    authService.clearTokens()
    setError('')
    alert('✅ Dados de autenticação limpos. Tente fazer login novamente.')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      await login({ email, password })
      
      // Get user role from localStorage and redirect accordingly
      const userData = JSON.parse(localStorage.getItem('user') || '{}')
      const userRole = userData.role
      
      switch (userRole) {
        case 'SUPER_ADMIN':
          router.push('/superadmin')
          break
        case 'ADMIN':
          router.push('/admin')
          break
        case 'AI_MAESTRO':
          router.push('/maestro-dashboard')
          break
        case 'TEACHER':
        default:
          router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold teach-gradient bg-clip-text text-transparent">
            TEACH
          </CardTitle>
          <CardDescription>
            Entre na sua conta para continuar aprendendo
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md mb-4">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full teach-gradient text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <Link href="/forgot-password" className="text-blue-600 hover:underline">
              Esqueceu sua senha?
            </Link>
          </div>
          
          <div className="mt-4 text-center text-sm">
            Não tem uma conta?{' '}
            <Link href="/register" className="text-blue-600 hover:underline font-medium">
              Cadastre-se aqui
            </Link>
          </div>
          
          {error && (
            <div className="mt-4 text-center">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearAuthData}
                className="text-xs"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Limpar Dados de Autenticação
              </Button>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-gray-600 hover:underline text-sm">
              ← Voltar para o início
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}