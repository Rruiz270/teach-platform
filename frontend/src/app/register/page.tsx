'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '@/contexts/AuthContext'
import { AlertCircle, Clock, Award, Users } from 'lucide-react'

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
    phone: '',
    // AI MAESTRO specific fields
    bio: '',
    yearsExperience: '',
    qualifications: [] as string[],
    specializations: [] as string[],
    availability: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    } as Record<string, string[]>,
    hourlyRate: '',
    maxStudentsPerSession: '50',
    languagesSpoken: [] as string[],
    certifications: [] as string[]
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

  const handleArrayFieldToggle = (field: 'qualifications' | 'specializations' | 'languagesSpoken' | 'certifications', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const handleAvailabilityToggle = (day: string, timeSlot: string) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: prev.availability[day].includes(timeSlot)
          ? prev.availability[day].filter(slot => slot !== timeSlot)
          : [...prev.availability[day], timeSlot]
      }
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

  // AI MAESTRO specific data
  const qualifications = [
    'Doutorado em Educação', 'Mestrado em Educação', 'Especialização em Tecnologia Educacional',
    'Graduação em Pedagogia', 'Graduação em Letras', 'MBA em Gestão Educacional',
    'Certificação Google for Education', 'Certificação Microsoft Educator', 'Certificação Apple Teacher',
    'Especialização em IA', 'Curso de Machine Learning', 'Certificação em Data Science'
  ]

  const specializations = [
    'Implementação de IA na Educação', 'Ferramentas de IA para Professores', 'ChatGPT para Educadores',
    'Automação de Tarefas Educacionais', 'Avaliação Automatizada', 'Personalização do Ensino',
    'Criação de Conteúdo com IA', 'Gamificação com IA', 'Análise de Dados Educacionais',
    'Desenvolvimento de Chatbots Educacionais', 'IA para Educação Inclusiva', 'Ética em IA Educacional'
  ]

  const languagesSpoken = [
    'Português (Nativo)', 'Inglês (Fluente)', 'Inglês (Intermediário)', 'Inglês (Básico)',
    'Espanhol (Fluente)', 'Espanhol (Intermediário)', 'Francês (Intermediário)',
    'Alemão (Básico)', 'Italiano (Básico)', 'Mandarim (Básico)'
  ]

  const certificationsList = [
    'Certificação AWS Cloud Practitioner', 'Google Cloud Digital Leader', 'Microsoft Azure Fundamentals',
    'OpenAI API Certification', 'Coursera AI for Everyone', 'edX MIT Introduction to AI',
    'Stanford CS229 Machine Learning', 'Deep Learning Specialization', 'TensorFlow Developer Certificate',
    'Certified Ethical Hacker (CEH)', 'Project Management Professional (PMP)', 'Scrum Master Certified'
  ]

  const timeSlots = [
    '07:00-08:00', '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00',
    '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00',
    '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00'
  ]

  const weekDays = [
    { key: 'monday', label: 'Segunda-feira' },
    { key: 'tuesday', label: 'Terça-feira' },
    { key: 'wednesday', label: 'Quarta-feira' },
    { key: 'thursday', label: 'Quinta-feira' },
    { key: 'friday', label: 'Sexta-feira' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' }
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <Card className={`w-full ${formData.role === 'AI_MAESTRO' ? 'max-w-4xl' : 'max-w-lg'}`}>
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

            {formData.role !== 'AI_MAESTRO' && (
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
            )}

            {/* AI MAESTRO Specific Fields */}
            {formData.role === 'AI_MAESTRO' && (
              <div className="space-y-6 border-t pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-blue-600 flex items-center justify-center space-x-2">
                    <Award className="h-5 w-5" />
                    <span>Informações do AI MAESTRO</span>
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Complete seu perfil profissional para ministrar aulas aos professores</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biografia Profissional</Label>
                  <Textarea
                    id="bio"
                    placeholder="Descreva sua experiência, formação e expertise em IA aplicada à educação..."
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="yearsExperience">Anos de Experiência</Label>
                    <Input
                      id="yearsExperience"
                      type="number"
                      placeholder="5"
                      value={formData.yearsExperience}
                      onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                      min="0"
                      max="50"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Taxa por Hora (R$)</Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      placeholder="150"
                      value={formData.hourlyRate}
                      onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                      min="50"
                      max="1000"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxStudentsPerSession">Máximo de Professores por Sessão</Label>
                  <Select onValueChange={(value) => handleInputChange('maxStudentsPerSession', value)} defaultValue="50">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o limite" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20">20 professores</SelectItem>
                      <SelectItem value="30">30 professores</SelectItem>
                      <SelectItem value="50">50 professores</SelectItem>
                      <SelectItem value="100">100 professores</SelectItem>
                      <SelectItem value="200">200 professores</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Qualificações Acadêmicas (selecione todas que se aplicam)</Label>
                  <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto border rounded p-2">
                    {qualifications.map((qualification) => (
                      <label key={qualification} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.qualifications.includes(qualification)}
                          onChange={() => handleArrayFieldToggle('qualifications', qualification)}
                          className="w-4 h-4"
                        />
                        <span>{qualification}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Especializações em IA (selecione suas áreas de expertise)</Label>
                  <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto border rounded p-2">
                    {specializations.map((specialization) => (
                      <label key={specialization} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.specializations.includes(specialization)}
                          onChange={() => handleArrayFieldToggle('specializations', specialization)}
                          className="w-4 h-4"
                        />
                        <span>{specialization}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Idiomas Falados</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-24 overflow-y-auto border rounded p-2">
                    {languagesSpoken.map((language) => (
                      <label key={language} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.languagesSpoken.includes(language)}
                          onChange={() => handleArrayFieldToggle('languagesSpoken', language)}
                          className="w-4 h-4"
                        />
                        <span>{language}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Certificações Técnicas</Label>
                  <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto border rounded p-2">
                    {certificationsList.map((certification) => (
                      <label key={certification} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.certifications.includes(certification)}
                          onChange={() => handleArrayFieldToggle('certifications', certification)}
                          className="w-4 h-4"
                        />
                        <span>{certification}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Disponibilidade por Semana</span>
                  </Label>
                  <div className="space-y-3 border rounded p-3 bg-gray-50">
                    {weekDays.map((day) => (
                      <div key={day.key} className="space-y-2">
                        <Label className="text-sm font-medium">{day.label}</Label>
                        <div className="grid grid-cols-3 gap-1">
                          {timeSlots.map((slot) => (
                            <label key={`${day.key}-${slot}`} className="flex items-center space-x-1 text-xs">
                              <input
                                type="checkbox"
                                checked={formData.availability[day.key].includes(slot)}
                                onChange={() => handleAvailabilityToggle(day.key, slot)}
                                className="w-3 h-3"
                              />
                              <span>{slot}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

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