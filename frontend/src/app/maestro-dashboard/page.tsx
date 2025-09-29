'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Brain, Calendar, Users, Video, BookOpen, MessageSquare, Clock, Play, FileText, Award, TrendingUp } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function MaestroDashboard() {
  const { user, isAuthenticated, logout, isLoading } = useAuth()
  const router = useRouter()

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

  // Mock data for AI MAESTRO
  const maestroStats = {
    upcomingSessions: 3,
    totalTeachers: 1247,
    averageRating: 4.9,
    hoursDelivered: 156,
    completionRate: 94
  }

  const upcomingClasses = [
    {
      id: 1,
      title: 'Introdução à IA na Educação',
      date: '2024-12-15',
      time: '19:00',
      duration: '90 min',
      attendees: 45,
      module: 'Starter',
      status: 'confirmado'
    },
    {
      id: 2,
      title: 'Workshop: Ferramentas de IA',
      date: '2024-12-17',
      time: '20:00',
      duration: '90 min',
      attendees: 38,
      module: 'Starter',
      status: 'confirmado'
    },
    {
      id: 3,
      title: 'Avaliação Automatizada',
      date: '2024-12-20',
      time: '20:00',
      duration: '90 min',
      attendees: 42,
      module: 'Survivor',
      status: 'pendente'
    }
  ]

  const recentFeedback = [
    { teacher: 'Prof. Maria Silva', rating: 5, comment: 'Excelente explicação sobre prompts!', module: 'Starter' },
    { teacher: 'Prof. João Santos', rating: 5, comment: 'AI MAESTRO torna a IA muito acessível', module: 'Starter' },
    { teacher: 'Prof. Ana Costa', rating: 4, comment: 'Gostaria de mais exemplos práticos', module: 'Survivor' },
    { teacher: 'Prof. Carlos Lima', rating: 5, comment: 'Transformou minha forma de ensinar!', module: 'Starter' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold teach-gradient bg-clip-text text-transparent">
                  TEACH
                </h1>
                <Badge variant="default" className="bg-gradient-to-r from-blue-500 to-purple-600">
                  AI MAESTRO
                </Badge>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-16 h-16 border-4 border-blue-500">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl">
                <Brain className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Bem-vindo, AI MAESTRO!
              </h1>
              <p className="text-gray-600">
                Sua próxima aula ao vivo: <strong>Hoje às 19:00</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximas Aulas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{maestroStats.upcomingSessions}</div>
              <p className="text-xs text-muted-foreground">Esta semana</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Professores</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{maestroStats.totalTeachers}</div>
              <p className="text-xs text-muted-foreground">Já treinados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avaliação</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{maestroStats.averageRating}</div>
              <p className="text-xs text-muted-foreground">⭐ de 5 estrelas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Horas Ministradas</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{maestroStats.hoursDelivered}h</div>
              <p className="text-xs text-muted-foreground">Este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa Conclusão</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{maestroStats.completionRate}%</div>
              <p className="text-xs text-muted-foreground">Média geral</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Classes */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="mr-2 h-5 w-5" />
                  Próximas Aulas Ao Vivo
                </CardTitle>
                <CardDescription>
                  Gerencie suas sessões síncronas com os professores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((class_item) => (
                    <div key={class_item.id} className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-blue-50 to-purple-50">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium">{class_item.title}</h3>
                          <Badge variant={class_item.status === 'confirmado' ? 'default' : 'secondary'}>
                            {class_item.module}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(class_item.date).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {class_item.time} ({class_item.duration})
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {class_item.attendees} inscritos
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4 mr-1" />
                          Material
                        </Button>
                        <Button size="sm">
                          <Play className="w-4 h-4 mr-1" />
                          Iniciar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Content Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Gestão de Conteúdo
                </CardTitle>
                <CardDescription>
                  Atualize materiais e crie novo conteúdo educacional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col space-y-1">
                    <BookOpen className="h-6 w-6" />
                    <span className="text-xs">Criar Aula</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-1">
                    <FileText className="h-6 w-6" />
                    <span className="text-xs">Editar Material</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-1">
                    <Video className="h-6 w-6" />
                    <span className="text-xs">Gravar Vídeo</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-1">
                    <MessageSquare className="h-6 w-6" />
                    <span className="text-xs">Q&A Fórum</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feedback & Stats */}
          <div className="space-y-6">
            {/* Recent Feedback */}
            <Card>
              <CardHeader>
                <CardTitle>Feedback Recente</CardTitle>
                <CardDescription>
                  Avaliações dos professores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentFeedback.map((feedback, index) => (
                    <div key={index} className="p-3 rounded-lg bg-gray-50 space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium">{feedback.teacher}</span>
                        <div className="flex">
                          {[...Array(feedback.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400">⭐</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">{feedback.comment}</p>
                      <Badge variant="outline" className="text-xs">
                        {feedback.module}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Module Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Progresso dos Módulos</CardTitle>
                <CardDescription>
                  Taxa de conclusão por módulo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Starter</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Survivor</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Explorer</span>
                    <span>56%</span>
                  </div>
                  <Progress value={56} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Expert</span>
                    <span>31%</span>
                  </div>
                  <Progress value={31} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Agendar Nova Aula
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Responder Fórum
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Gerar Relatório
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Ver Todos Professores
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}