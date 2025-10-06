'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Play, CheckCircle, Clock, BookOpen, Lock } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function ModuleDetailPage() {
  const { user, isAuthenticated, logout, isLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const moduleId = params.id as string

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Mock module data based on ID
  const moduleData = {
    '1': {
      title: 'Starter - Fundamentos de IA',
      description: 'Aprenda os conceitos básicos de Inteligência Artificial para educação',
      progress: 100,
      status: 'completed',
      duration: '6 horas',
      lessons: [
        { id: 1, title: 'O que é Inteligência Artificial?', duration: '30 min', completed: true },
        { id: 2, title: 'IA na Educação: Panorama Atual', duration: '45 min', completed: true },
        { id: 3, title: 'Principais Ferramentas de IA', duration: '30 min', completed: true },
        { id: 4, title: 'ChatGPT: Primeiros Passos', duration: '60 min', completed: true },
        { id: 5, title: 'Criando Prompts Eficazes', duration: '45 min', completed: true },
        { id: 6, title: 'Projeto Prático: Primeiro Plano de Aula', duration: '90 min', completed: true }
      ]
    },
    '2': {
      title: 'Survivor - IA na Prática',
      description: 'Aplicações práticas de IA em sala de aula e no dia a dia',
      progress: 75,
      status: 'in-progress',
      duration: '8 horas',
      lessons: [
        { id: 1, title: 'Planejamento de Aulas com IA', duration: '45 min', completed: true },
        { id: 2, title: 'Criação de Exercícios Personalizados', duration: '60 min', completed: true },
        { id: 3, title: 'Avaliação Automatizada', duration: '50 min', completed: true },
        { id: 4, title: 'Feedback Personalizado para Alunos', duration: '40 min', completed: false, current: true },
        { id: 5, title: 'IA para Educação Inclusiva', duration: '55 min', completed: false },
        { id: 6, title: 'Projeto Final: Implementação Completa', duration: '120 min', completed: false }
      ]
    },
    '3': {
      title: 'Explorer - IA Avançada',
      description: 'Técnicas avançadas e personalização com IA',
      progress: 30,
      status: 'in-progress',
      duration: '10 horas',
      lessons: [
        { id: 1, title: 'IA Generativa Avançada', duration: '60 min', completed: true },
        { id: 2, title: 'Criação de Chatbots Educacionais', duration: '90 min', completed: true },
        { id: 3, title: 'Análise de Dados Educacionais', duration: '75 min', completed: false, current: true },
        { id: 4, title: 'Machine Learning na Educação', duration: '80 min', completed: false },
        { id: 5, title: 'Ética e Responsabilidade em IA', duration: '45 min', completed: false },
        { id: 6, title: 'Projeto Avançado: Sistema Completo', duration: '150 min', completed: false }
      ]
    },
    '4': {
      title: 'Expert - Liderança em IA',
      description: 'Torne-se um líder em educação com IA',
      progress: 0,
      status: 'locked',
      duration: '12 horas',
      lessons: [
        { id: 1, title: 'Estratégias de Implementação Institucional', duration: '90 min', completed: false },
        { id: 2, title: 'Formação de Equipes', duration: '75 min', completed: false },
        { id: 3, title: 'Gestão de Mudanças Tecnológicas', duration: '60 min', completed: false },
        { id: 4, title: 'Métricas e Avaliação de Impacto', duration: '80 min', completed: false },
        { id: 5, title: 'Futuro da IA na Educação', duration: '45 min', completed: false },
        { id: 6, title: 'Projeto de Liderança', duration: '180 min', completed: false }
      ]
    }
  }

  const module = moduleData[moduleId as keyof typeof moduleData]

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Módulo não encontrado</h2>
          <Link href="/modules">
            <Button>Voltar aos Módulos</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/modules">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar aos Módulos
                </Button>
              </Link>
              <Link href="/" className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold teach-gradient bg-clip-text text-transparent">
                  TEACH
                </h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Olá, {user.name}</span>
              <Button variant="outline" size="sm" onClick={logout}>
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Module Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{module.title}</CardTitle>
                <CardDescription className="text-lg mb-4">
                  {module.description}
                </CardDescription>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {module.lessons.length} aulas
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {module.duration}
                  </span>
                </div>
              </div>
              <Badge 
                variant={
                  module.status === 'completed' ? 'default' :
                  module.status === 'in-progress' ? 'secondary' : 'outline'
                }
                className="ml-4"
              >
                {module.status === 'completed' ? 'Completo' :
                 module.status === 'in-progress' ? 'Em andamento' : 'Bloqueado'}
              </Badge>
            </div>
            
            {module.status !== 'locked' && (
              <div className="space-y-2 mt-4">
                <div className="flex justify-between text-sm">
                  <span>Progresso do Módulo</span>
                  <span>{module.progress}%</span>
                </div>
                <Progress value={module.progress} className="h-3" />
              </div>
            )}
          </CardHeader>
        </Card>

        {/* Course Content - Simplified */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Aulas do Módulo
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 ml-2">IA INTEGRADA</Badge>
            </CardTitle>
            <CardDescription>
              Aprenda conceitos fundamentais e pratique com IA integrada em cada aula
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {module.lessons.map((lesson, index) => (
              <div 
                key={lesson.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                  lesson.completed ? 'bg-green-50 border-green-200' :
                  lesson.current ? 'bg-blue-50 border-blue-200' :
                  module.status === 'locked' ? 'bg-gray-50 border-gray-200' :
                  'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    lesson.completed ? 'bg-green-500 text-white' :
                    lesson.current ? 'bg-blue-500 text-white' :
                    module.status === 'locked' ? 'bg-gray-300 text-gray-500' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {lesson.completed ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : lesson.current ? (
                      <Play className="w-4 h-4" />
                    ) : module.status === 'locked' ? (
                      <Lock className="w-4 h-4" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  
                  <div>
                    <h3 className={`font-medium ${
                      module.status === 'locked' ? 'text-gray-500' : 'text-gray-900'
                    }`}>
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      {lesson.duration}
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        🤖 IA Assistida
                      </span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {lesson.completed ? (
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-green-700 bg-green-100">
                        Concluída
                      </Badge>
                      <Link href={`/lessons/${moduleId === '1' ? 'starter-' : moduleId === '2' ? 'survivor-' : moduleId === '3' ? 'explorer-' : 'expert-'}${lesson.id}`}>
                        <Button size="sm" variant="outline">
                          Revisar
                        </Button>
                      </Link>
                    </div>
                  ) : lesson.current ? (
                    <div className="flex items-center space-x-2">
                      <Badge variant="default">
                        Atual
                      </Badge>
                      <Link href={`/lessons/${moduleId === '1' ? 'starter-' : moduleId === '2' ? 'survivor-' : moduleId === '3' ? 'explorer-' : 'expert-'}${lesson.id}`}>
                        <Button size="sm">
                          Continuar
                        </Button>
                      </Link>
                    </div>
                  ) : module.status === 'locked' ? (
                    <Badge variant="outline" className="text-gray-500">
                      Bloqueada
                    </Badge>
                  ) : (
                    <Link href={`/lessons/${lesson.id}`}>
                      <Button size="sm" variant="outline">
                        Iniciar
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          {module.status === 'locked' ? (
            <Button disabled className="px-8">
              <Lock className="mr-2 h-4 w-4" />
              Módulo Bloqueado
            </Button>
          ) : module.status === 'completed' ? (
            <>
              <Button variant="outline" className="px-8">
                <CheckCircle className="mr-2 h-4 w-4" />
                Revisar Módulo
              </Button>
              <Link href="/certificates">
                <Button className="px-8 teach-gradient text-white">
                  Ver Certificado
                </Button>
              </Link>
            </>
          ) : (
            <Button className="px-8">
              <Play className="mr-2 h-4 w-4" />
              Continuar Aprendendo
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}