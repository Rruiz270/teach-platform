'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Settings, 
  Eye, 
  UserCheck, 
  BarChart3, 
  Calendar, 
  MessageSquare, 
  FileText, 
  GraduationCap, 
  Brain, 
  Star, 
  Clock, 
  DollarSign, 
  Video, 
  Download,
  Shield,
  Database,
  Server,
  Activity,
  Zap,
  Crown,
  ArrowRight,
  ExternalLink
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { AuthGuard } from '@/components/AuthGuard'
import { APIStatusDashboard } from '@/components/APIStatusDashboard'

function SuperAdminContent() {
  const { user, logout } = useAuth()

  // System stats - mock data
  const systemStats = {
    totalUsers: 2847,
    totalTeachers: 2156,
    totalAdmins: 45,
    totalMaestros: 12,
    activeUsers: 1924,
    totalSchools: 156,
    systemUptime: '99.9%',
    apiCalls: 45672,
    storageUsed: 67.4,
    monthlyRevenue: 89450
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Crown className="h-6 w-6 text-yellow-600" />
              <h1 className="text-2xl font-bold teach-gradient bg-clip-text text-transparent">
                TEACH SuperAdmin
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                <Shield className="h-3 w-3 mr-1" />
                SUPER ADMIN
              </Badge>
              <span className="text-sm text-gray-600">Olá, {user.name}</span>
              <Button variant="outline" size="sm" onClick={logout}>
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Visão Geral do Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
                    <p className="text-2xl font-bold text-gray-900">{systemStats.totalUsers.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Activity className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
                    <p className="text-2xl font-bold text-gray-900">{systemStats.activeUsers.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Server className="h-8 w-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Uptime do Sistema</p>
                    <p className="text-2xl font-bold text-gray-900">{systemStats.systemUptime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Receita Mensal</p>
                    <p className="text-2xl font-bold text-gray-900">R$ {systemStats.monthlyRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Access Tiles */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🚀 Acesso Rápido às Áreas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Admin Dashboard Tile */}
            <Link href="/admin">
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:shadow-lg transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <Settings className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-900 text-lg">Área do Admin</h3>
                        <p className="text-sm text-blue-700">Gerenciar usuários, escolas e conteúdo</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {systemStats.totalTeachers} Professores
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {systemStats.totalSchools} Escolas
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Professor Dashboard Tile */}
            <Link href="/dashboard">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                        <GraduationCap className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-green-900 text-lg">Área do Professor</h3>
                        <p className="text-sm text-green-700">Módulos, trilhas e gamificação</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            4 Módulos
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            IA Assistant
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-green-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* AI Maestro Dashboard Tile */}
            <Link href="/maestro-dashboard">
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-lg transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                        <Brain className="h-8 w-8 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-purple-900 text-lg">AI Maestro</h3>
                        <p className="text-sm text-purple-700">Aulas ao vivo e mentorias</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {systemStats.totalMaestros} Maestros
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            Calendário
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Calendar Management Tile */}
            <Link href="/calendar">
              <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:shadow-lg transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                        <Calendar className="h-8 w-8 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-orange-900 text-lg">Calendário Global</h3>
                        <p className="text-sm text-orange-700">Gerenciar todos os eventos</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            Criar Eventos
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            Visualizar Tudo
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-orange-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Exclusive SuperAdmin Features */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">👑 Funcionalidades Exclusivas do Super Admin</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 hover:shadow-lg transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Crown className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-yellow-900 text-lg">Gerenciar Super Admins</h3>
                    <p className="text-sm text-yellow-700">Criar e gerenciar outros super admins</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <UserCheck className="h-4 w-4 mr-2" />
                      Gerenciar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200 hover:shadow-lg transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Shield className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-900 text-lg">Configurações Globais</h3>
                    <p className="text-sm text-red-700">Alterar configurações da plataforma</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Settings className="h-4 w-4 mr-2" />
                      Configurar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200 hover:shadow-lg transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <Database className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-indigo-900 text-lg">Backup & Restore</h3>
                    <p className="text-sm text-indigo-700">Backup completo do sistema</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Download className="h-4 w-4 mr-2" />
                      Backup
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Management Tools */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🔧 Ferramentas de Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Database className="h-6 w-6 text-gray-600" />
                  <div>
                    <h4 className="font-medium">Banco de Dados</h4>
                    <p className="text-xs text-gray-600">Monitorar performance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-yellow-600" />
                  <div>
                    <h4 className="font-medium">API Analytics</h4>
                    <p className="text-xs text-gray-600">{systemStats.apiCalls.toLocaleString()} chamadas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-red-600" />
                  <div>
                    <h4 className="font-medium">Segurança</h4>
                    <p className="text-xs text-gray-600">Logs e auditoria</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <div>
                    <h4 className="font-medium">Relatórios</h4>
                    <p className="text-xs text-gray-600">Exportar dados</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Role Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Usuários</CardTitle>
              <CardDescription>Breakdown por tipo de usuário</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Professores</span>
                  <span className="text-sm text-gray-600">{systemStats.totalTeachers}</span>
                </div>
                <Progress value={75.7} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Administradores</span>
                  <span className="text-sm text-gray-600">{systemStats.totalAdmins}</span>
                </div>
                <Progress value={1.6} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">AI Maestros</span>
                  <span className="text-sm text-gray-600">{systemStats.totalMaestros}</span>
                </div>
                <Progress value={0.4} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Pais/Responsáveis</span>
                  <span className="text-sm text-gray-600">634</span>
                </div>
                <Progress value={22.3} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* System Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Recursos do Sistema</CardTitle>
              <CardDescription>Monitoramento de infraestrutura</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Armazenamento</span>
                  <span className="text-sm text-gray-600">{systemStats.storageUsed}%</span>
                </div>
                <Progress value={systemStats.storageUsed} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">CPU</span>
                  <span className="text-sm text-gray-600">23%</span>
                </div>
                <Progress value={23} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Memória</span>
                  <span className="text-sm text-gray-600">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Bandwidth</span>
                  <span className="text-sm text-gray-600">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* API Status Dashboard */}
        <div className="mt-8">
          <APIStatusDashboard />
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Criar Usuário Admin
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Backup do Sistema
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações Globais
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function SuperAdminDashboard() {
  return (
    <AuthGuard requireAuth={true} allowedRoles={['SUPER_ADMIN']} fallbackPath="/dashboard">
      <SuperAdminContent />
    </AuthGuard>
  )
}