'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '@/contexts/AuthContext'
import { AlertCircle } from 'lucide-react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'TEACHER' as 'TEACHER' | 'ADMIN' | 'PARENT' | 'AI_MAESTRO',
    teachingLevel: 'ELEMENTARY' as 'EARLY_YEARS' | 'ELEMENTARY' | 'JUNIOR_HIGH' | 'HIGH_SCHOOL' | 'UNIVERSITY',
    subjects: [] as string[],
    state: '',
    city: '',
    phone: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem')
      setIsLoading(false)
      return
    }

    // Validate password requirements
    if (formData.password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres')
      setIsLoading(false)
      return
    }
    
    if (!/[A-Z]/.test(formData.password)) {
      setError('A senha deve conter pelo menos uma letra maiúscula')
      setIsLoading(false)
      return
    }
    
    if (!/[a-z]/.test(formData.password)) {
      setError('A senha deve conter pelo menos uma letra minúscula')
      setIsLoading(false)
      return
    }
    
    if (!/[0-9]/.test(formData.password)) {
      setError('A senha deve conter pelo menos um número')
      setIsLoading(false)
      return
    }

    if (formData.subjects.length === 0) {
      setError('Selecione pelo menos uma disciplina')
      setIsLoading(false)
      return
    }
    
    if (!formData.state) {
      setError('Selecione o estado')
      setIsLoading(false)
      return
    }
    
    if (!formData.city.trim()) {
      setError('Digite o nome da cidade')
      setIsLoading(false)
      return
    }
    
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        teachingLevel: formData.teachingLevel,
        subjects: formData.subjects,
        state: formData.state,
        city: formData.city,
        phone: formData.phone || undefined
      }
      
      await register(userData)
      
      // Redirect based on user role
      const userRole = formData.role
      
      switch (userRole) {
        case 'ADMIN':
        case 'SUPER_ADMIN':
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
      console.error('Registration error:', err)
      
      // Handle different types of errors from backend
      if (err.response?.data?.details) {
        // Validation errors (400)
        const validationErrors = err.response.data.details
        const firstError = validationErrors[0]
        setError(`Erro: ${firstError.message}`)
      } else if (err.response?.data?.error?.message) {
        // Other API errors (409, etc.)
        setError(err.response.data.error.message)
      } else {
        // Network or unknown errors
        setError(err.message || 'Erro ao criar conta')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }))
  }

  const subjects = [
    'Matemática', 'Português', 'História', 'Geografia', 'Ciências',
    'Física', 'Química', 'Biologia', 'Inglês', 'Educação Física',
    'Artes', 'Música', 'Filosofia', 'Sociologia', 'Informática'
  ]

  const states = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold teach-gradient bg-clip-text text-transparent">
            TEACH
          </CardTitle>
          <CardDescription>
            Crie sua conta e comece a transformar a educação
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
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Tipo de Conta</Label>
              <Select onValueChange={(value) => handleInputChange('role', value)} defaultValue="TEACHER">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de conta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TEACHER">Professor(a)</SelectItem>
                  <SelectItem value="ADMIN">Administrador(a) Escolar</SelectItem>
                  <SelectItem value="AI_MAESTRO">AI MAESTRO</SelectItem>
                  <SelectItem value="PARENT">Pai/Mãe/Responsável</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="teachingLevel">Nível de Ensino</Label>
              <Select onValueChange={(value) => handleInputChange('teachingLevel', value)} defaultValue="ELEMENTARY">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o nível de ensino" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EARLY_YEARS">Educação Infantil</SelectItem>
                  <SelectItem value="ELEMENTARY">Ensino Fundamental</SelectItem>
                  <SelectItem value="JUNIOR_HIGH">Ensino Fundamental II</SelectItem>
                  <SelectItem value="HIGH_SCHOOL">Ensino Médio</SelectItem>
                  <SelectItem value="UNIVERSITY">Ensino Superior</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Disciplinas (selecione pelo menos uma)</Label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded p-2">
                {subjects.map((subject) => (
                  <label key={subject} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={formData.subjects.includes(subject)}
                      onChange={() => handleSubjectToggle(subject)}
                      className="w-4 h-4"
                    />
                    <span>{subject}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Select onValueChange={(value) => handleInputChange('state', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="UF" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Sua cidade"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone (opcional)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirme a Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full teach-gradient text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Criando conta...' : 'Criar Conta'}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Entre aqui
            </Link>
          </div>
          
          <div className="mt-4 text-center">
            <Link href="/" className="text-gray-600 hover:underline text-sm">
              ← Voltar para o início
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}