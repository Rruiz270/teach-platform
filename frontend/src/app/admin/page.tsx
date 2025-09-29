'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Users, BookOpen, Award, TrendingUp, Settings, Eye, UserCheck, BarChart3, Calendar, MessageSquare, FileText, GraduationCap } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function AdminDashboard() {
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

  // Admin statistics - mock data
  const adminStats = {
    totalTeachers: 156,
    activeUsers: 134,
    completedModules: 89,
    avgProgress: 73,
    totalStudents: 2840,
    monthlyGrowth: 12
  }

  const recentActivity = [
    { teacher: 'Prof. Maria Silva', action: 'Completou módulo Starter', time: '2 horas atrás' },
    { teacher: 'Prof. João Santos', action: 'Iniciou módulo Survivor', time: '4 horas atrás' },
    { teacher: 'Prof. Ana Costa', action: 'Participou do fórum', time: '6 horas atrás' },
    { teacher: 'Prof. Carlos Lima', action: 'Baixou certificado', time: '1 dia atrás' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold teach-gradient bg-clip-text text-transparent">
                  TEACH
                </h1>
                <Badge variant="secondary">Admin</Badge>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Painel Administrativo
          </h1>
          <p className="text-gray-600">
            Gerencie e monitore o progresso dos educadores na plataforma TEACH
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Professores</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalTeachers}</div>
              <p className="text-xs text-muted-foreground">+{adminStats.monthlyGrowth}% este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Módulos Completos</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.completedModules}</div>
              <p className="text-xs text-muted-foreground">Total de conclusões</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progresso Médio</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.avgProgress}%</div>
              <p className="text-xs text-muted-foreground">Todos os módulos</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Management Tools */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ferramentas de Gestão</CardTitle>
                <CardDescription>
                  Acesso rápido às principais funcionalidades administrativas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-24 flex flex-col space-y-2">
                    <Users className="h-8 w-8" />
                    <span className="text-sm">Gerenciar Usuários</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col space-y-2">
                    <BarChart3 className="h-8 w-8" />
                    <span className="text-sm">Relatórios</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col space-y-2">
                    <BookOpen className="h-8 w-8" />
                    <span className="text-sm">Gerenciar Conteúdo</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col space-y-2">
                    <MessageSquare className="h-8 w-8" />
                    <span className="text-sm">Fórum</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col space-y-2">
                    <Calendar className="h-8 w-8" />
                    <span className="text-sm">Eventos</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col space-y-2">
                    <Settings className="h-8 w-8" />
                    <span className="text-sm">Configurações</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>
                  Últimas ações dos professores na plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.teacher}</p>
                        <p className="text-xs text-gray-600">{activity.action}</p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats & Actions */}
          <div className="space-y-6">
            {/* Module Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Progresso por Módulo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Starter</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Survivor</span>
                    <span>67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Explorer</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Expert</span>
                    <span>23%</span>
                  </div>
                  <Progress value={23} className="h-2" />
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
                  <FileText className="mr-2 h-4 w-4" />
                  Exportar Relatório
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <UserCheck className="mr-2 h-4 w-4" />
                  Aprovar Novos Usuários
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Emitir Certificados
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="mr-2 h-4 w-4" />
                  Visualizar como Professor
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status do Sistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Servidor</span>
                  <Badge variant="default">Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Banco de Dados</span>
                  <Badge variant="default">Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">APIs IA</span>
                  <Badge variant="default">Funcionais</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Backup</span>
                  <Badge variant="secondary">Executado</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}