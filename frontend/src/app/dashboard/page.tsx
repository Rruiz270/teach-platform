'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Users, Trophy, Clock, Star, ArrowRight } from 'lucide-react'

export default function DashboardPage() {
  const [user] = useState({
    name: 'Professor João Silva',
    level: 'Explorer',
    progress: 65,
    badges: 8,
    studyHours: 24
  })

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
              <Button variant="outline" size="sm">
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
                  <p className="text-2xl font-bold text-gray-900">{user.level}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{user.progress}%</p>
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
                  <p className="text-2xl font-bold text-gray-900">{user.badges}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{user.studyHours}h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Modules Progress */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Seus Módulos</CardTitle>
                <CardDescription>
                  Continue sua jornada de aprendizado em IA
                </CardDescription>
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
                      <Button 
                        className="mt-3 w-full" 
                        variant={module.status === 'completed' ? 'outline' : 'default'}
                      >
                        {module.status === 'completed' ? 'Revisar' : 'Continuar'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
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
                <Button className="w-full" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Fórum da Comunidade
                </Button>
                <Button className="w-full" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Biblioteca de Recursos
                </Button>
                <Button className="w-full teach-gradient text-white">
                  <Trophy className="mr-2 h-4 w-4" />
                  Ver Certificados
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}