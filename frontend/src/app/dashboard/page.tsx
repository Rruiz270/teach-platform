'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Users, Trophy, Clock, Star, ArrowRight, Bot, Target, Gamepad2, Calendar, Sparkles, Wand2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { AuthGuard } from '@/components/AuthGuard'
import AITeachingAssistant from '@/components/AITeachingAssistant'
import PersonalizedLearningPath from '@/components/PersonalizedLearningPath'
import GamificationSystem from '@/components/GamificationSystem'

function DashboardContent() {
  const { user, logout } = useAuth()
  const router = useRouter()
  
  // New feature states
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [isAIAssistantMinimized, setIsAIAssistantMinimized] = useState(false)
  const [showLearningPath, setShowLearningPath] = useState(false)
  const [showGamification, setShowGamification] = useState(false)
  const [currentLesson, setCurrentLesson] = useState(null)

  // Mock data for demo - in production this would come from API
  const userStats = {
    level: 'Explorer',
    progress: 65,
    badges: 8,
    studyHours: 24
  }

  // Mock user data for new features
  const mockUser = {
    id: user.id || '1',
    name: user.name || 'Professor Demo',
    school: 'E.E. Dom Pedro II',
    region: 'São Paulo',
    currentLevel: 'Explorer',
    skillLevels: [
      { skill: 'ChatGPT', level: 75, category: 'intermediate' as const, lastAssessed: new Date(), confidence: 80 },
      { skill: 'Prompts Eficazes', level: 60, category: 'intermediate' as const, lastAssessed: new Date(), confidence: 70 },
      { skill: 'IA na Educação', level: 45, category: 'beginner' as const, lastAssessed: new Date(), confidence: 65 },
      { skill: 'Avaliação com IA', level: 30, category: 'beginner' as const, lastAssessed: new Date(), confidence: 50 }
    ],
    learningSpeed: 'normal' as const,
    preferredLearningStyle: 'visual' as const,
    availableTime: '3-5 horas/semana',
    goals: ['ChatGPT', 'Criação de Conteúdo', 'Avaliação Automatizada']
  }

  const modules = [
    {
      id: 1,
      title: 'Starter - Fundamentos de IA',
      description: 'Aprenda os conceitos básicos de Inteligência Artificial',
      progress: 100,
      status: 'completed',
      lessons: 12,
      duration: '6 horas'
    },
    {
      id: 2,
      title: 'Survivor - IA na Prática',
      description: 'Aplicações práticas de IA em sala de aula',
      progress: 75,
      status: 'in-progress',
      lessons: 15,
      duration: '8 horas'
    },
    {
      id: 3,
      title: 'Explorer - IA Avançada',
      description: 'Técnicas avançadas e personalização com IA',
      progress: 30,
      status: 'in-progress',
      lessons: 18,
      duration: '10 horas'
    },
    {
      id: 4,
      title: 'Expert - Liderança em IA',
      description: 'Torne-se um líder em educação com IA',
      progress: 0,
      status: 'locked',
      lessons: 20,
      duration: '12 horas'
    }
  ]

  const recentBadges = [
    { name: 'Primeiro Login', icon: '🎯' },
    { name: 'Módulo Completo', icon: '🏆' },
    { name: 'Semana Consecutiva', icon: '🔥' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold teach-gradient bg-clip-text text-transparent">
                TEACH
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Olá, {user.name}</span>
              <Button variant="outline" size="sm" onClick={logout}>
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Trophy className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Nível Atual</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.level}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Progresso Geral</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.progress}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Badges</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.badges}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Horas de Estudo</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.studyHours}h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning vs Production Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Learning Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold text-gray-900">📚 Meu Aprendizado</h2>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">CURSO</Badge>
            </div>
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => router.push('/modules')}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Curso IA para Educadores</h3>
                    <p className="text-blue-700 mb-3">Continue sua jornada de aprendizado</p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="border-blue-300 text-blue-700">
                        🎯 Explorer
                      </Badge>
                      <Badge variant="outline" className="border-blue-300 text-blue-700">
                        65% Completo
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Production Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold text-gray-900">⚡ Meu Workspace</h2>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">PRODUÇÃO</Badge>
            </div>
            <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white border-0 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => {
              console.log('Navigating to workspace...')
              router.push('/workspace')
            }}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Criar Conteúdo com IA</h3>
                    <p className="text-purple-100 mb-3">Ferramentas profissionais para suas aulas</p>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        📝 Aulas
                      </Badge>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        🎨 Imagens
                      </Badge>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        📊 Avaliações
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Other Features Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🚀 Outros Recursos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowAIAssistant(true)}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Bot className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">Assistente IA</h3>
                    <p className="text-sm text-blue-700">Chat inteligente para dúvidas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowLearningPath(true)}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-900">Trilha Personalizada</h3>
                    <p className="text-sm text-purple-700">Caminho adaptado ao seu perfil</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowGamification(true)}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Gamepad2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900">Gamificação</h3>
                    <p className="text-sm text-green-700">Conquistas e ranking</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Modules Progress */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Seus Módulos</CardTitle>
                    <CardDescription>
                      Continue sua jornada de aprendizado em IA
                    </CardDescription>
                  </div>
                  <Link href="/modules">
                    <Button variant="outline" size="sm">
                      Ver Todos
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {modules.map((module) => (
                  <div key={module.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{module.title}</h3>
                        <p className="text-sm text-gray-600">{module.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>{module.lessons} aulas</span>
                          <span>{module.duration}</span>
                        </div>
                      </div>
                      <Badge 
                        variant={
                          module.status === 'completed' ? 'default' :
                          module.status === 'in-progress' ? 'secondary' : 'outline'
                        }
                      >
                        {module.status === 'completed' ? 'Completo' :
                         module.status === 'in-progress' ? 'Em andamento' : 'Bloqueado'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>
                    
                    {module.status !== 'locked' && (
                      <Link href={`/modules/${module.id}`}>
                        <Button 
                          className="mt-3 w-full" 
                          variant={module.status === 'completed' ? 'outline' : 'default'}
                        >
                          {module.status === 'completed' ? 'Revisar' : 'Continuar'}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Badges */}
            <Card>
              <CardHeader>
                <CardTitle>Badges Recentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentBadges.map((badge, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-2xl">{badge.icon}</span>
                    <span className="text-sm font-medium">{badge.name}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/workspace">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Workspace IA
                  </Button>
                </Link>
                <Link href="/forum">
                  <Button className="w-full" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Fórum da Comunidade
                  </Button>
                </Link>
                <Link href="/library">
                  <Button className="w-full" variant="outline">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Biblioteca de Recursos
                  </Button>
                </Link>
                <Link href="/calendar">
                  <Button className="w-full" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Calendário de Eventos
                  </Button>
                </Link>
                <Link href="/certificates">
                  <Button className="w-full teach-gradient text-white">
                    <Trophy className="mr-2 h-4 w-4" />
                    Ver Certificados
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Conditional Feature Displays */}
        {showLearningPath && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">Trilha Personalizada de Aprendizagem</h2>
                <Button variant="outline" onClick={() => setShowLearningPath(false)}>
                  Fechar
                </Button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[80vh]">
                <PersonalizedLearningPath 
                  user={mockUser}
                  onStartAssessment={() => alert('Avaliação de skills em desenvolvimento!')}
                />
              </div>
            </div>
          </div>
        )}

        {showGamification && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">Sistema de Gamificação</h2>
                <Button variant="outline" onClick={() => setShowGamification(false)}>
                  Fechar
                </Button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[80vh]">
                <GamificationSystem user={mockUser} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Teaching Assistant - Always available when activated */}
      {showAIAssistant && (
        <AITeachingAssistant
          currentLesson={currentLesson}
          isMinimized={isAIAssistantMinimized}
          onToggleMinimize={() => setIsAIAssistantMinimized(!isAIAssistantMinimized)}
        />
      )}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <AuthGuard requireAuth={true}>
      <DashboardContent />
    </AuthGuard>
  )
}