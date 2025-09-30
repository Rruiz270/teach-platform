'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Users, BookOpen, Award, TrendingUp, Settings, Eye, UserCheck, BarChart3, Calendar, MessageSquare, FileText, GraduationCap, Brain, Star, Clock, DollarSign, Video, Download } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AdminDashboard() {
  const { user, isAuthenticated, logout, isLoading } = useAuth()
  const router = useRouter()
  
  // State for Maestro management
  const [isMaestroManagementOpen, setIsMaestroManagementOpen] = useState(false)
  const [selectedMaestro, setSelectedMaestro] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSpecialization, setFilterSpecialization] = useState('all')
  
  // State for other management dialogs
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false)
  const [isReportsOpen, setIsReportsOpen] = useState(false)
  const [isContentManagementOpen, setIsContentManagementOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isApproveUsersOpen, setIsApproveUsersOpen] = useState(false)
  const [isCertificatesOpen, setIsCertificatesOpen] = useState(false)
  const [userSearchTerm, setUserSearchTerm] = useState('')
  const [userFilter, setUserFilter] = useState('all')
  const [selectedUser, setSelectedUser] = useState(null)
  const [reportType, setReportType] = useState('general')
  const [selectedContent, setSelectedContent] = useState(null)
  const [contentSearchTerm, setContentSearchTerm] = useState('')

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
    monthlyGrowth: 12,
    totalMaestros: 8,
    activeMaestros: 6
  }

  // Mock AI MAESTRO data
  const maestros = [
    {
      id: 1,
      name: 'Dr. Ana Silva',
      email: 'ana.silva@teach.com',
      bio: 'Doutora em Educação com 15 anos de experiência em tecnologia educacional. Especialista em implementação de IA em ambientes de aprendizagem.',
      yearsExperience: 15,
      hourlyRate: 200,
      rating: 4.9,
      totalSessions: 47,
      status: 'active',
      specializations: ['Implementação de IA na Educação', 'ChatGPT para Educadores', 'Avaliação Automatizada'],
      qualifications: ['Doutorado em Educação', 'Especialização em IA', 'Certificação Google for Education'],
      languages: ['Português (Nativo)', 'Inglês (Fluente)', 'Espanhol (Intermediário)'],
      availability: {
        monday: ['19:00-20:00', '20:00-21:00'],
        tuesday: ['19:00-20:00'],
        wednesday: ['19:00-20:00', '20:00-21:00'],
        thursday: ['19:00-20:00'],
        friday: ['19:00-20:00']
      },
      upcomingClasses: 3,
      completedClasses: 44,
      studentSatisfaction: 96
    },
    {
      id: 2,
      name: 'Prof. Carlos Oliveira',
      email: 'carlos.oliveira@teach.com',
      bio: 'Especialista em Machine Learning com MBA em Gestão Educacional. Foco em ferramentas práticas de IA para professores do ensino fundamental.',
      yearsExperience: 8,
      hourlyRate: 150,
      rating: 4.7,
      totalSessions: 32,
      status: 'active',
      specializations: ['Ferramentas de IA para Professores', 'Automação de Tarefas Educacionais', 'Personalização do Ensino'],
      qualifications: ['MBA em Gestão Educacional', 'Especialização em Machine Learning', 'Certificação Microsoft Educator'],
      languages: ['Português (Nativo)', 'Inglês (Intermediário)'],
      availability: {
        monday: ['20:00-21:00'],
        wednesday: ['19:00-20:00', '20:00-21:00'],
        friday: ['19:00-20:00', '20:00-21:00'],
        saturday: ['09:00-10:00', '10:00-11:00']
      },
      upcomingClasses: 2,
      completedClasses: 30,
      studentSatisfaction: 94
    },
    {
      id: 3,
      name: 'Dra. Mariana Costa',
      email: 'mariana.costa@teach.com',
      bio: 'Pesquisadora em IA Educacional com foco em ética e inclusão. Desenvolve estratégias para implementação responsável de IA em escolas públicas.',
      yearsExperience: 12,
      hourlyRate: 180,
      rating: 4.8,
      totalSessions: 28,
      status: 'active',
      specializations: ['IA para Educação Inclusiva', 'Ética em IA Educacional', 'Análise de Dados Educacionais'],
      qualifications: ['Doutorado em Educação', 'Especialização em IA', 'Certificação em Data Science'],
      languages: ['Português (Nativo)', 'Inglês (Fluente)', 'Francês (Intermediário)'],
      availability: {
        tuesday: ['19:00-20:00', '20:00-21:00'],
        thursday: ['19:00-20:00', '20:00-21:00'],
        saturday: ['14:00-15:00', '15:00-16:00']
      },
      upcomingClasses: 1,
      completedClasses: 27,
      studentSatisfaction: 98
    },
    {
      id: 4,
      name: 'Prof. Roberto Santos',
      email: 'roberto.santos@teach.com',
      bio: 'Especialista em gamificação e IA educacional. Desenvolve estratégias inovadoras para engajamento estudantil usando tecnologia.',
      yearsExperience: 6,
      hourlyRate: 120,
      rating: 4.6,
      totalSessions: 21,
      status: 'inactive',
      specializations: ['Gamificação com IA', 'Criação de Conteúdo com IA', 'Desenvolvimento de Chatbots Educacionais'],
      qualifications: ['Mestrado em Educação', 'Certificação em Game Design', 'Curso de Machine Learning'],
      languages: ['Português (Nativo)', 'Inglês (Básico)'],
      availability: {
        monday: ['19:00-20:00'],
        wednesday: ['19:00-20:00'],
        friday: ['19:00-20:00']
      },
      upcomingClasses: 0,
      completedClasses: 21,
      studentSatisfaction: 92
    }
  ]

  // Helper functions
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'busy': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch(status) {
      case 'active': return 'Ativo'
      case 'inactive': return 'Inativo'
      case 'busy': return 'Ocupado'
      default: return 'Desconhecido'
    }
  }

  const filteredMaestros = maestros.filter(maestro => {
    const matchesSearch = maestro.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         maestro.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialization = filterSpecialization === 'all' ||
                                 maestro.specializations.some(spec => 
                                   spec.toLowerCase().includes(filterSpecialization.toLowerCase())
                                 )
    return matchesSearch && matchesSpecialization
  })

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
                  <Dialog open={isUserManagementOpen} onOpenChange={setIsUserManagementOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-24 flex flex-col space-y-2">
                        <Users className="h-8 w-8" />
                        <span className="text-sm">Gerenciar Usuários</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                          <Users className="h-6 w-6 text-blue-600" />
                          <span>Gerenciamento de Usuários</span>
                        </DialogTitle>
                        <DialogDescription>
                          Gerencie professores, administradores e outros usuários da plataforma
                        </DialogDescription>
                      </DialogHeader>
                      
                      <Tabs defaultValue="all-users" className="flex-1 overflow-hidden">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="all-users">Todos Usuários</TabsTrigger>
                          <TabsTrigger value="teachers">Professores</TabsTrigger>
                          <TabsTrigger value="pending">Pendentes</TabsTrigger>
                          <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        </TabsList>

                        <div className="overflow-y-auto max-h-[70vh] mt-4">
                          <TabsContent value="all-users" className="space-y-4">
                            <div className="flex space-x-4 items-center">
                              <div className="flex-1">
                                <Input
                                  placeholder="Buscar usuários por nome ou email..."
                                  value={userSearchTerm}
                                  onChange={(e) => setUserSearchTerm(e.target.value)}
                                />
                              </div>
                              <select
                                value={userFilter}
                                onChange={(e) => setUserFilter(e.target.value)}
                                className="px-3 py-2 border rounded-md"
                              >
                                <option value="all">Todos os Tipos</option>
                                <option value="TEACHER">Professores</option>
                                <option value="ADMIN">Administradores</option>
                                <option value="PARENT">Pais/Responsáveis</option>
                                <option value="AI_MAESTRO">AI MAESTROs</option>
                              </select>
                              <Button>
                                <UserCheck className="h-4 w-4 mr-2" />
                                Adicionar Usuário
                              </Button>
                            </div>

                            <div className="space-y-4">
                              {[
                                { id: 1, name: 'Prof. Maria Silva', email: 'maria.silva@escola.com', role: 'TEACHER', status: 'active', progress: 45, lastAccess: '2 horas atrás' },
                                { id: 2, name: 'João Santos', email: 'joao.santos@escola.com', role: 'ADMIN', status: 'active', progress: null, lastAccess: '1 dia atrás' },
                                { id: 3, name: 'Ana Costa', email: 'ana.costa@escola.com', role: 'TEACHER', status: 'inactive', progress: 23, lastAccess: '1 semana atrás' },
                                { id: 4, name: 'Carlos Lima', email: 'carlos.lima@escola.com', role: 'TEACHER', status: 'active', progress: 89, lastAccess: '3 horas atrás' },
                                { id: 5, name: 'Patricia Oliveira', email: 'patricia.oliveira@escola.com', role: 'PARENT', status: 'active', progress: null, lastAccess: '2 dias atrás' }
                              ].map((user) => (
                                <Card key={user.id} className="hover:shadow-md transition-shadow">
                                  <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                          {user.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                          <h4 className="font-medium">{user.name}</h4>
                                          <p className="text-sm text-gray-600">{user.email}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-4">
                                        <Badge variant={user.role === 'TEACHER' ? 'default' : user.role === 'ADMIN' ? 'destructive' : 'secondary'}>
                                          {user.role}
                                        </Badge>
                                        {user.progress !== null && (
                                          <div className="text-center">
                                            <div className="text-sm font-medium">{user.progress}%</div>
                                            <div className="text-xs text-gray-500">Progresso</div>
                                          </div>
                                        )}
                                        <Badge className={user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                          {user.status === 'active' ? 'Ativo' : 'Inativo'}
                                        </Badge>
                                        <div className="text-sm text-gray-500">{user.lastAccess}</div>
                                        <div className="flex space-x-2">
                                          <Button size="sm" variant="outline">Ver Detalhes</Button>
                                          <Button size="sm" variant="outline">Editar</Button>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </TabsContent>

                          <TabsContent value="teachers" className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Estatísticas dos Professores</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600">134</div>
                                    <p className="text-sm text-gray-600">Professores Ativos</p>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600">73%</div>
                                    <p className="text-sm text-gray-600">Taxa de Conclusão</p>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-600">4.7</div>
                                    <p className="text-sm text-gray-600">Satisfação Média</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="pending" className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Usuários Pendentes de Aprovação</CardTitle>
                                <CardDescription>Revise e aprove novos registros</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  {[
                                    { id: 1, name: 'Roberto Ferreira', email: 'roberto.ferreira@escola.com', role: 'TEACHER', requestDate: '2 dias atrás' },
                                    { id: 2, name: 'Juliana Martins', email: 'juliana.martins@escola.com', role: 'TEACHER', requestDate: '3 dias atrás' }
                                  ].map((pendingUser) => (
                                    <div key={pendingUser.id} className="border rounded-lg p-4 bg-yellow-50">
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <h4 className="font-medium">{pendingUser.name}</h4>
                                          <p className="text-sm text-gray-600">{pendingUser.email}</p>
                                          <p className="text-xs text-gray-500">Solicitado {pendingUser.requestDate}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                            <UserCheck className="h-4 w-4 mr-2" />
                                            Aprovar
                                          </Button>
                                          <Button size="sm" variant="destructive">
                                            Rejeitar
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="analytics" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <Card>
                                <CardHeader>
                                  <CardTitle>Atividade por Tipo de Usuário</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-3">
                                    <div>
                                      <div className="flex justify-between text-sm mb-1">
                                        <span>Professores</span>
                                        <span>156 usuários</span>
                                      </div>
                                      <Progress value={75} className="h-2" />
                                    </div>
                                    <div>
                                      <div className="flex justify-between text-sm mb-1">
                                        <span>Administradores</span>
                                        <span>12 usuários</span>
                                      </div>
                                      <Progress value={6} className="h-2" />
                                    </div>
                                    <div>
                                      <div className="flex justify-between text-sm mb-1">
                                        <span>AI MAESTROs</span>
                                        <span>8 usuários</span>
                                      </div>
                                      <Progress value={4} className="h-2" />
                                    </div>
                                    <div>
                                      <div className="flex justify-between text-sm mb-1">
                                        <span>Pais/Responsáveis</span>
                                        <span>32 usuários</span>
                                      </div>
                                      <Progress value={15} className="h-2" />
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardHeader>
                                  <CardTitle>Taxa de Engajamento</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-3">
                                    <div>
                                      <div className="flex justify-between text-sm mb-1">
                                        <span>Diário</span>
                                        <span>45%</span>
                                      </div>
                                      <Progress value={45} className="h-2" />
                                    </div>
                                    <div>
                                      <div className="flex justify-between text-sm mb-1">
                                        <span>Semanal</span>
                                        <span>78%</span>
                                      </div>
                                      <Progress value={78} className="h-2" />
                                    </div>
                                    <div>
                                      <div className="flex justify-between text-sm mb-1">
                                        <span>Mensal</span>
                                        <span>92%</span>
                                      </div>
                                      <Progress value={92} className="h-2" />
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </TabsContent>
                        </div>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog open={isMaestroManagementOpen} onOpenChange={setIsMaestroManagementOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-24 flex flex-col space-y-2 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 hover:from-blue-100 hover:to-purple-100">
                        <Brain className="h-8 w-8 text-blue-600" />
                        <span className="text-sm font-medium">AI MAESTROs</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                          <Brain className="h-6 w-6 text-blue-600" />
                          <span>Gerenciamento de AI MAESTROs</span>
                        </DialogTitle>
                        <DialogDescription>
                          Gerencie os especialistas em IA que ministram treinamentos para os professores
                        </DialogDescription>
                      </DialogHeader>
                      
                      <Tabs defaultValue="overview" className="flex-1 overflow-hidden">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                          <TabsTrigger value="maestros">MAESTROs ({maestros.length})</TabsTrigger>
                          <TabsTrigger value="assignments">Atribuições</TabsTrigger>
                          <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        </TabsList>

                        <div className="overflow-y-auto max-h-[70vh] mt-4">
                          <TabsContent value="overview" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                  <CardTitle className="text-sm font-medium">Total MAESTROs</CardTitle>
                                  <Brain className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold">{adminStats.totalMaestros}</div>
                                  <p className="text-xs text-muted-foreground">+2 este mês</p>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                  <CardTitle className="text-sm font-medium">MAESTROs Ativos</CardTitle>
                                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold">{adminStats.activeMaestros}</div>
                                  <p className="text-xs text-muted-foreground">75% da capacidade</p>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                  <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
                                  <Star className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold">4.8</div>
                                  <p className="text-xs text-muted-foreground">⭐ de 5 estrelas</p>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                  <CardTitle className="text-sm font-medium">Taxa Horária Média</CardTitle>
                                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold">R$ 162</div>
                                  <p className="text-xs text-muted-foreground">Por hora/aula</p>
                                </CardContent>
                              </Card>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <Card>
                                <CardHeader>
                                  <CardTitle>MAESTROs Mais Avaliados</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    {maestros.slice(0, 3).map((maestro) => (
                                      <div key={maestro.id} className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                            {maestro.name.split(' ').map(n => n[0]).join('')}
                                          </div>
                                        </div>
                                        <div className="flex-1">
                                          <p className="text-sm font-medium">{maestro.name}</p>
                                          <div className="flex items-center space-x-2">
                                            <div className="flex items-center">
                                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                              <span className="text-sm">{maestro.rating}</span>
                                            </div>
                                            <span className="text-xs text-gray-500">({maestro.totalSessions} aulas)</span>
                                          </div>
                                        </div>
                                        <Badge className={getStatusColor(maestro.status)}>
                                          {getStatusText(maestro.status)}
                                        </Badge>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardHeader>
                                  <CardTitle>Especializações Mais Demandadas</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-3">
                                    <div>
                                      <div className="flex justify-between text-sm mb-1">
                                        <span>ChatGPT para Educadores</span>
                                        <span>85%</span>
                                      </div>
                                      <Progress value={85} className="h-2" />
                                    </div>
                                    <div>
                                      <div className="flex justify-between text-sm mb-1">
                                        <span>Implementação de IA</span>
                                        <span>72%</span>
                                      </div>
                                      <Progress value={72} className="h-2" />
                                    </div>
                                    <div>
                                      <div className="flex justify-between text-sm mb-1">
                                        <span>Avaliação Automatizada</span>
                                        <span>68%</span>
                                      </div>
                                      <Progress value={68} className="h-2" />
                                    </div>
                                    <div>
                                      <div className="flex justify-between text-sm mb-1">
                                        <span>IA para Educação Inclusiva</span>
                                        <span>45%</span>
                                      </div>
                                      <Progress value={45} className="h-2" />
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </TabsContent>

                          <TabsContent value="maestros" className="space-y-4">
                            <div className="flex space-x-4 items-center">
                              <div className="flex-1">
                                <Input
                                  placeholder="Buscar MAESTROs por nome ou email..."
                                  value={searchTerm}
                                  onChange={(e) => setSearchTerm(e.target.value)}
                                />
                              </div>
                              <select
                                value={filterSpecialization}
                                onChange={(e) => setFilterSpecialization(e.target.value)}
                                className="px-3 py-2 border rounded-md"
                              >
                                <option value="all">Todas Especializações</option>
                                <option value="chatgpt">ChatGPT</option>
                                <option value="implementação">Implementação</option>
                                <option value="avaliação">Avaliação</option>
                                <option value="inclusiva">Educação Inclusiva</option>
                              </select>
                            </div>

                            <div className="grid gap-4">
                              {filteredMaestros.map((maestro) => (
                                <Card key={maestro.id} className="hover:shadow-md transition-shadow">
                                  <CardContent className="p-6">
                                    <div className="flex items-start space-x-4">
                                      <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                          {maestro.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                          <h3 className="text-lg font-semibold">{maestro.name}</h3>
                                          <Badge className={getStatusColor(maestro.status)}>
                                            {getStatusText(maestro.status)}
                                          </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3">{maestro.email}</p>
                                        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{maestro.bio}</p>
                                        
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                          <div className="text-center">
                                            <div className="text-lg font-bold text-blue-600">{maestro.rating}</div>
                                            <div className="text-xs text-gray-500">Avaliação</div>
                                          </div>
                                          <div className="text-center">
                                            <div className="text-lg font-bold text-green-600">R$ {maestro.hourlyRate}</div>
                                            <div className="text-xs text-gray-500">Por hora</div>
                                          </div>
                                          <div className="text-center">
                                            <div className="text-lg font-bold text-purple-600">{maestro.totalSessions}</div>
                                            <div className="text-xs text-gray-500">Aulas dadas</div>
                                          </div>
                                          <div className="text-center">
                                            <div className="text-lg font-bold text-orange-600">{maestro.studentSatisfaction}%</div>
                                            <div className="text-xs text-gray-500">Satisfação</div>
                                          </div>
                                        </div>

                                        <div className="mb-3">
                                          <div className="text-sm font-medium mb-1">Especializações:</div>
                                          <div className="flex flex-wrap gap-1">
                                            {maestro.specializations.slice(0, 3).map((spec, index) => (
                                              <Badge key={index} variant="outline" className="text-xs">
                                                {spec}
                                              </Badge>
                                            ))}
                                            {maestro.specializations.length > 3 && (
                                              <Badge variant="outline" className="text-xs">
                                                +{maestro.specializations.length - 3} mais
                                              </Badge>
                                            )}
                                          </div>
                                        </div>

                                        <div className="flex space-x-2">
                                          <Button 
                                            size="sm" 
                                            onClick={() => setSelectedMaestro(maestro)}
                                          >
                                            Ver Detalhes
                                          </Button>
                                          <Button size="sm" variant="outline">
                                            Atribuir Aula
                                          </Button>
                                          <Button size="sm" variant="outline">
                                            Editar
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </TabsContent>

                          <TabsContent value="assignments" className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Próximas Atribuições de Aulas</CardTitle>
                                <CardDescription>
                                  Aulas agendadas e atribuições de MAESTROs
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  {maestros.filter(m => m.upcomingClasses > 0).map((maestro) => (
                                    <div key={maestro.id} className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                                      <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-medium">{maestro.name}</h4>
                                        <Badge variant="secondary">{maestro.upcomingClasses} aulas</Badge>
                                      </div>
                                      <p className="text-sm text-gray-600 mb-2">
                                        Próximas aulas: Introdução à IA, Workshop de Ferramentas, Avaliação Automatizada
                                      </p>
                                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                                        <span>📅 Próxima: 15/12/2024 19:00</span>
                                        <span>👥 45 professores inscritos</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="analytics" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <Card>
                                <CardHeader>
                                  <CardTitle>Performance dos MAESTROs</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    {maestros.map((maestro) => (
                                      <div key={maestro.id} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                          <span>{maestro.name}</span>
                                          <span>{maestro.studentSatisfaction}%</span>
                                        </div>
                                        <Progress value={maestro.studentSatisfaction} className="h-2" />
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardHeader>
                                  <CardTitle>Distribuição de Carga Horária</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    {maestros.map((maestro) => {
                                      const totalSlots = Object.values(maestro.availability).flat().length
                                      const percentage = (totalSlots / 20) * 100 // Assuming max 20 slots per week
                                      return (
                                        <div key={maestro.id} className="space-y-2">
                                          <div className="flex justify-between text-sm">
                                            <span>{maestro.name}</span>
                                            <span>{totalSlots} slots/semana</span>
                                          </div>
                                          <Progress value={percentage} className="h-2" />
                                        </div>
                                      )
                                    })}
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </TabsContent>
                        </div>
                      </Tabs>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isReportsOpen} onOpenChange={setIsReportsOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-24 flex flex-col space-y-2">
                        <BarChart3 className="h-8 w-8" />
                        <span className="text-sm">Relatórios</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                          <BarChart3 className="h-6 w-6 text-blue-600" />
                          <span>Central de Relatórios</span>
                        </DialogTitle>
                        <DialogDescription>
                          Gere e visualize relatórios detalhados sobre o desempenho da plataforma
                        </DialogDescription>
                      </DialogHeader>
                      
                      <Tabs defaultValue="dashboard" className="flex-1 overflow-hidden">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                          <TabsTrigger value="progress">Progresso</TabsTrigger>
                          <TabsTrigger value="engagement">Engajamento</TabsTrigger>
                          <TabsTrigger value="export">Exportar</TabsTrigger>
                        </TabsList>

                        <div className="overflow-y-auto max-h-[70vh] mt-4">
                          <TabsContent value="dashboard" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <Card>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm">Taxa de Conclusão Geral</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold text-green-600">73%</div>
                                  <p className="text-xs text-gray-600">+5% este mês</p>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm">Tempo Médio de Estudo</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold text-blue-600">2.4h</div>
                                  <p className="text-xs text-gray-600">Por semana</p>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm">Certificados Emitidos</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold text-purple-600">89</div>
                                  <p className="text-xs text-gray-600">Este mês</p>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm">Satisfação Geral</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold text-orange-600">4.8</div>
                                  <p className="text-xs text-gray-600">⭐ de 5</p>
                                </CardContent>
                              </Card>
                            </div>

                            <Card>
                              <CardHeader>
                                <CardTitle>Desempenho por Módulo</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  {[
                                    { module: 'Starter', completed: 142, inProgress: 12, notStarted: 2, avgScore: 92 },
                                    { module: 'Survivor', completed: 98, inProgress: 34, notStarted: 24, avgScore: 85 },
                                    { module: 'Explorer', completed: 67, inProgress: 45, notStarted: 44, avgScore: 78 },
                                    { module: 'Expert', completed: 23, inProgress: 56, notStarted: 77, avgScore: 71 }
                                  ].map((data) => (
                                    <div key={data.module} className="border rounded-lg p-4">
                                      <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-medium">{data.module}</h4>
                                        <span className="text-sm text-gray-600">Pontuação média: {data.avgScore}%</span>
                                      </div>
                                      <div className="grid grid-cols-3 gap-4 text-sm">
                                        <div className="text-center">
                                          <div className="text-lg font-bold text-green-600">{data.completed}</div>
                                          <p className="text-gray-600">Completaram</p>
                                        </div>
                                        <div className="text-center">
                                          <div className="text-lg font-bold text-blue-600">{data.inProgress}</div>
                                          <p className="text-gray-600">Em progresso</p>
                                        </div>
                                        <div className="text-center">
                                          <div className="text-lg font-bold text-gray-600">{data.notStarted}</div>
                                          <p className="text-gray-600">Não iniciaram</p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="progress" className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Progresso Detalhado por Professor</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  {[
                                    { name: 'Prof. Maria Silva', progress: 89, modules: '3/4', lastActivity: '2 horas atrás' },
                                    { name: 'Prof. João Santos', progress: 67, modules: '2/4', lastActivity: '1 dia atrás' },
                                    { name: 'Prof. Ana Costa', progress: 45, modules: '2/4', lastActivity: '3 dias atrás' },
                                    { name: 'Prof. Carlos Lima', progress: 92, modules: '4/4', lastActivity: '5 horas atrás' },
                                    { name: 'Prof. Patricia Oliveira', progress: 34, modules: '1/4', lastActivity: '1 semana atrás' }
                                  ].map((teacher) => (
                                    <div key={teacher.name} className="border rounded-lg p-3">
                                      <div className="flex items-center justify-between mb-2">
                                        <div>
                                          <h4 className="font-medium">{teacher.name}</h4>
                                          <p className="text-xs text-gray-600">Última atividade: {teacher.lastActivity}</p>
                                        </div>
                                        <div className="text-right">
                                          <div className="text-lg font-bold">{teacher.progress}%</div>
                                          <p className="text-xs text-gray-600">Módulos: {teacher.modules}</p>
                                        </div>
                                      </div>
                                      <Progress value={teacher.progress} className="h-2" />
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="engagement" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <Card>
                                <CardHeader>
                                  <CardTitle>Participação no Fórum</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm">Posts criados</span>
                                      <span className="font-bold">234</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm">Respostas</span>
                                      <span className="font-bold">567</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm">Usuários ativos</span>
                                      <span className="font-bold">89</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm">Taxa de resposta</span>
                                      <span className="font-bold">78%</span>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardHeader>
                                  <CardTitle>Atividades Mais Populares</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-3">
                                    {[
                                      { activity: 'Quiz IA Básico', participants: 145 },
                                      { activity: 'Workshop ChatGPT', participants: 132 },
                                      { activity: 'Fórum de Dúvidas', participants: 98 },
                                      { activity: 'Desafio Semanal', participants: 87 }
                                    ].map((item) => (
                                      <div key={item.activity} className="flex justify-between items-center">
                                        <span className="text-sm">{item.activity}</span>
                                        <Badge variant="secondary">{item.participants} participantes</Badge>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </TabsContent>

                          <TabsContent value="export" className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Exportar Relatórios</CardTitle>
                                <CardDescription>Selecione o tipo de relatório e o período desejado</CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="space-y-2">
                                  <Label>Tipo de Relatório</Label>
                                  <select
                                    value={reportType}
                                    onChange={(e) => setReportType(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md"
                                  >
                                    <option value="general">Relatório Geral</option>
                                    <option value="progress">Progresso dos Alunos</option>
                                    <option value="engagement">Engajamento</option>
                                    <option value="maestros">Desempenho dos MAESTROs</option>
                                    <option value="certificates">Certificados Emitidos</option>
                                  </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Data Inicial</Label>
                                    <Input type="date" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Data Final</Label>
                                    <Input type="date" />
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label>Formato de Exportação</Label>
                                  <div className="grid grid-cols-3 gap-2">
                                    <Button variant="outline" className="w-full">
                                      <FileText className="h-4 w-4 mr-2" />
                                      PDF
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                      <FileText className="h-4 w-4 mr-2" />
                                      Excel
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                      <FileText className="h-4 w-4 mr-2" />
                                      CSV
                                    </Button>
                                  </div>
                                </div>

                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                  <Download className="h-4 w-4 mr-2" />
                                  Gerar e Baixar Relatório
                                </Button>
                              </CardContent>
                            </Card>
                          </TabsContent>
                        </div>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={isContentManagementOpen} onOpenChange={setIsContentManagementOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-24 flex flex-col space-y-2">
                        <BookOpen className="h-8 w-8" />
                        <span className="text-sm">Gerenciar Conteúdo</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                          <BookOpen className="h-6 w-6 text-blue-600" />
                          <span>Gerenciamento de Conteúdo</span>
                        </DialogTitle>
                        <DialogDescription>
                          Gerencie módulos, aulas, materiais e recursos educacionais
                        </DialogDescription>
                      </DialogHeader>
                      
                      <Tabs defaultValue="modules" className="flex-1 overflow-hidden">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="modules">Módulos</TabsTrigger>
                          <TabsTrigger value="lessons">Aulas</TabsTrigger>
                          <TabsTrigger value="resources">Recursos</TabsTrigger>
                          <TabsTrigger value="new-content">Criar Conteúdo</TabsTrigger>
                        </TabsList>

                        <div className="overflow-y-auto max-h-[70vh] mt-4">
                          <TabsContent value="modules" className="space-y-4">
                            <div className="flex justify-between items-center mb-4">
                              <Input
                                placeholder="Buscar módulos..."
                                value={contentSearchTerm}
                                onChange={(e) => setContentSearchTerm(e.target.value)}
                                className="max-w-md"
                              />
                              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                <BookOpen className="h-4 w-4 mr-2" />
                                Novo Módulo
                              </Button>
                            </div>

                            <div className="grid gap-4">
                              {[
                                { id: 1, name: 'Starter', description: 'Introdução à IA na Educação', lessons: 6, students: 156, completion: 92, status: 'published' },
                                { id: 2, name: 'Survivor', description: 'Ferramentas Práticas de IA', lessons: 6, students: 134, completion: 67, status: 'published' },
                                { id: 3, name: 'Explorer', description: 'IA Avançada para Educadores', lessons: 6, students: 89, completion: 45, status: 'published' },
                                { id: 4, name: 'Expert', description: 'Liderança e Inovação com IA', lessons: 6, students: 34, completion: 23, status: 'published' },
                                { id: 5, name: 'Master AI', description: 'Desenvolvimento de Soluções IA', lessons: 8, students: 0, completion: 0, status: 'draft' }
                              ].map((module) => (
                                <Card key={module.id} className="hover:shadow-md transition-shadow">
                                  <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-2">
                                          <h3 className="text-lg font-semibold">{module.name}</h3>
                                          <Badge variant={module.status === 'published' ? 'default' : 'secondary'}>
                                            {module.status === 'published' ? 'Publicado' : 'Rascunho'}
                                          </Badge>
                                        </div>
                                        <p className="text-gray-600 mb-3">{module.description}</p>
                                        <div className="grid grid-cols-3 gap-4 text-sm">
                                          <div>
                                            <span className="text-gray-500">Aulas:</span>
                                            <span className="font-medium ml-1">{module.lessons}</span>
                                          </div>
                                          <div>
                                            <span className="text-gray-500">Alunos:</span>
                                            <span className="font-medium ml-1">{module.students}</span>
                                          </div>
                                          <div>
                                            <span className="text-gray-500">Conclusão:</span>
                                            <span className="font-medium ml-1">{module.completion}%</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex space-x-2">
                                        <Button size="sm" variant="outline">Editar</Button>
                                        <Button size="sm" variant="outline">Ver Aulas</Button>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </TabsContent>

                          <TabsContent value="lessons" className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Todas as Aulas</CardTitle>
                                <CardDescription>Gerencie aulas individuais de todos os módulos</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  {[
                                    { id: 1, title: 'Introdução à IA', module: 'Starter', duration: '45 min', type: 'video', views: 156 },
                                    { id: 2, title: 'ChatGPT na Sala de Aula', module: 'Starter', duration: '60 min', type: 'live', views: 134 },
                                    { id: 3, title: 'Ferramentas de IA Gratuitas', module: 'Survivor', duration: '30 min', type: 'video', views: 98 },
                                    { id: 4, title: 'Criando Prompts Eficazes', module: 'Survivor', duration: '45 min', type: 'interactive', views: 87 },
                                    { id: 5, title: 'Análise de Dados com IA', module: 'Explorer', duration: '90 min', type: 'workshop', views: 45 }
                                  ].map((lesson) => (
                                    <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                                      <div className="flex items-center space-x-4">
                                        <div className={`p-2 rounded-lg ${
                                          lesson.type === 'video' ? 'bg-blue-100' :
                                          lesson.type === 'live' ? 'bg-red-100' :
                                          lesson.type === 'interactive' ? 'bg-green-100' :
                                          'bg-purple-100'
                                        }`}>
                                          <Video className="h-5 w-5" />
                                        </div>
                                        <div>
                                          <h4 className="font-medium">{lesson.title}</h4>
                                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                                            <span>{lesson.module}</span>
                                            <span>•</span>
                                            <span>{lesson.duration}</span>
                                            <span>•</span>
                                            <span>{lesson.views} visualizações</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Badge variant="outline">{lesson.type}</Badge>
                                        <Button size="sm" variant="outline">Editar</Button>
                                        <Button size="sm" variant="outline">Preview</Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="resources" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                              <Card>
                                <CardHeader className="pb-3">
                                  <CardTitle className="text-sm">Total de Recursos</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold">234</div>
                                  <p className="text-xs text-gray-600">PDFs, vídeos, templates</p>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardHeader className="pb-3">
                                  <CardTitle className="text-sm">Downloads</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold">1,567</div>
                                  <p className="text-xs text-gray-600">Este mês</p>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardHeader className="pb-3">
                                  <CardTitle className="text-sm">Espaço Usado</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold">2.3 GB</div>
                                  <p className="text-xs text-gray-600">De 10 GB disponíveis</p>
                                </CardContent>
                              </Card>
                            </div>

                            <Card>
                              <CardHeader>
                                <div className="flex items-center justify-between">
                                  <CardTitle>Biblioteca de Recursos</CardTitle>
                                  <Button size="sm">
                                    <FileText className="h-4 w-4 mr-2" />
                                    Upload Novo
                                  </Button>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  {[
                                    { name: 'Template de Prompt ChatGPT.pdf', type: 'PDF', size: '2.3 MB', downloads: 234 },
                                    { name: 'Guia de IA para Educadores.pdf', type: 'PDF', size: '5.1 MB', downloads: 189 },
                                    { name: 'Tutorial Canva com IA.mp4', type: 'Video', size: '45 MB', downloads: 156 },
                                    { name: 'Planilha de Avaliação Automatizada.xlsx', type: 'Excel', size: '1.2 MB', downloads: 98 },
                                    { name: 'Apresentação IA na Educação.pptx', type: 'PPT', size: '8.7 MB', downloads: 67 }
                                  ].map((resource) => (
                                    <div key={resource.name} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                                      <div className="flex items-center space-x-3">
                                        <FileText className="h-5 w-5 text-gray-500" />
                                        <div>
                                          <p className="font-medium text-sm">{resource.name}</p>
                                          <p className="text-xs text-gray-600">{resource.type} • {resource.size} • {resource.downloads} downloads</p>
                                        </div>
                                      </div>
                                      <div className="flex space-x-2">
                                        <Button size="sm" variant="outline">
                                          <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="outline">
                                          <Download className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="new-content" className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Criar Novo Conteúdo</CardTitle>
                                <CardDescription>Adicione novos módulos, aulas ou recursos</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                    <CardContent className="p-6 text-center">
                                      <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                        <BookOpen className="h-8 w-8 text-blue-600" />
                                      </div>
                                      <h3 className="font-semibold mb-2">Novo Módulo</h3>
                                      <p className="text-sm text-gray-600">Crie um novo módulo de aprendizagem</p>
                                    </CardContent>
                                  </Card>

                                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                    <CardContent className="p-6 text-center">
                                      <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                        <Video className="h-8 w-8 text-green-600" />
                                      </div>
                                      <h3 className="font-semibold mb-2">Nova Aula</h3>
                                      <p className="text-sm text-gray-600">Adicione uma nova aula a um módulo</p>
                                    </CardContent>
                                  </Card>

                                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                    <CardContent className="p-6 text-center">
                                      <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                        <FileText className="h-8 w-8 text-purple-600" />
                                      </div>
                                      <h3 className="font-semibold mb-2">Novo Recurso</h3>
                                      <p className="text-sm text-gray-600">Upload de PDFs, vídeos ou templates</p>
                                    </CardContent>
                                  </Card>
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                        </div>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    variant="outline" 
                    className="h-24 flex flex-col space-y-2"
                    onClick={() => router.push('/forum')}
                  >
                    <MessageSquare className="h-8 w-8" />
                    <span className="text-sm">Fórum</span>
                  </Button>
                  <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-24 flex flex-col space-y-2">
                        <Settings className="h-8 w-8" />
                        <span className="text-sm">Configurações</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                          <Settings className="h-6 w-6 text-blue-600" />
                          <span>Configurações do Sistema</span>
                        </DialogTitle>
                        <DialogDescription>
                          Gerencie as configurações gerais da plataforma
                        </DialogDescription>
                      </DialogHeader>
                      
                      <Tabs defaultValue="general" className="flex-1 overflow-hidden">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="general">Geral</TabsTrigger>
                          <TabsTrigger value="notifications">Notificações</TabsTrigger>
                          <TabsTrigger value="integrations">Integrações</TabsTrigger>
                          <TabsTrigger value="security">Segurança</TabsTrigger>
                        </TabsList>

                        <div className="overflow-y-auto max-h-[70vh] mt-4">
                          <TabsContent value="general" className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Configurações Gerais</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="space-y-2">
                                  <Label>Nome da Plataforma</Label>
                                  <Input defaultValue="TEACH - Transforme a Educação com IA" />
                                </div>
                                <div className="space-y-2">
                                  <Label>Email de Suporte</Label>
                                  <Input type="email" defaultValue="suporte@teach.com.br" />
                                </div>
                                <div className="space-y-2">
                                  <Label>Fuso Horário</Label>
                                  <select className="w-full px-3 py-2 border rounded-md">
                                    <option>America/Sao_Paulo (UTC-3)</option>
                                    <option>America/Manaus (UTC-4)</option>
                                    <option>America/Recife (UTC-3)</option>
                                  </select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Idioma Padrão</Label>
                                  <select className="w-full px-3 py-2 border rounded-md">
                                    <option>Português (Brasil)</option>
                                    <option>English</option>
                                    <option>Español</option>
                                  </select>
                                </div>
                                <Button className="mt-4">Salvar Alterações</Button>
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="notifications" className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Configurações de Notificação</CardTitle>
                                <CardDescription>Configure como e quando enviar notificações</CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="space-y-3">
                                  {[
                                    { label: 'Novo usuário registrado', email: true, push: false },
                                    { label: 'Módulo completado', email: true, push: true },
                                    { label: 'Nova mensagem no fórum', email: false, push: true },
                                    { label: 'Certificado emitido', email: true, push: true },
                                    { label: 'Relatório semanal', email: true, push: false }
                                  ].map((item) => (
                                    <div key={item.label} className="flex items-center justify-between p-3 border rounded-lg">
                                      <span className="font-medium">{item.label}</span>
                                      <div className="flex items-center space-x-4">
                                        <label className="flex items-center space-x-2">
                                          <input type="checkbox" defaultChecked={item.email} className="w-4 h-4" />
                                          <span className="text-sm">Email</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                          <input type="checkbox" defaultChecked={item.push} className="w-4 h-4" />
                                          <span className="text-sm">Push</span>
                                        </label>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <Button className="mt-4">Salvar Preferências</Button>
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="integrations" className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Integrações de API</CardTitle>
                                <CardDescription>Configure integrações com serviços externos</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  {[
                                    { service: 'OpenAI API', status: 'connected', lastSync: '2 minutos atrás' },
                                    { service: 'Google Workspace', status: 'connected', lastSync: '1 hora atrás' },
                                    { service: 'Microsoft Teams', status: 'disconnected', lastSync: 'Nunca' },
                                    { service: 'Zoom', status: 'connected', lastSync: '30 minutos atrás' }
                                  ].map((integration) => (
                                    <div key={integration.service} className="flex items-center justify-between p-4 border rounded-lg">
                                      <div>
                                        <h4 className="font-medium">{integration.service}</h4>
                                        <p className="text-sm text-gray-600">Última sincronização: {integration.lastSync}</p>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Badge className={integration.status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                          {integration.status === 'connected' ? 'Conectado' : 'Desconectado'}
                                        </Badge>
                                        <Button size="sm" variant="outline">
                                          {integration.status === 'connected' ? 'Configurar' : 'Conectar'}
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="security" className="space-y-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Configurações de Segurança</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h4 className="font-medium">Autenticação de dois fatores</h4>
                                      <p className="text-sm text-gray-600">Exigir 2FA para todos os administradores</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                      <input type="checkbox" className="sr-only peer" />
                                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h4 className="font-medium">Política de senha</h4>
                                      <p className="text-sm text-gray-600">Mínimo 8 caracteres, incluir números e símbolos</p>
                                    </div>
                                    <Button size="sm" variant="outline">Configurar</Button>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h4 className="font-medium">Sessão de login</h4>
                                      <p className="text-sm text-gray-600">Expirar após 30 dias de inatividade</p>
                                    </div>
                                    <Button size="sm" variant="outline">Alterar</Button>
                                  </div>
                                </div>
                                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                  <h4 className="font-medium text-yellow-800 mb-2">Backup de Dados</h4>
                                  <p className="text-sm text-yellow-700">Último backup: hoje às 03:00</p>
                                  <Button size="sm" className="mt-2" variant="outline">
                                    Fazer Backup Manual
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                        </div>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
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
                <Button 
                  className="w-full justify-start"
                  onClick={() => {
                    setReportType('general')
                    setIsReportsOpen(true)
                  }}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Exportar Relatório
                </Button>
                <Dialog open={isApproveUsersOpen} onOpenChange={setIsApproveUsersOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <UserCheck className="mr-2 h-4 w-4" />
                      Aprovar Novos Usuários
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Aprovar Novos Usuários</DialogTitle>
                      <DialogDescription>
                        Revise e aprove os usuários pendentes de aprovação
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      {[
                        { id: 1, name: 'Roberto Ferreira', email: 'roberto.ferreira@escola.com', role: 'TEACHER', school: 'E.E. Dom Pedro II', requestDate: '2 dias atrás' },
                        { id: 2, name: 'Juliana Martins', email: 'juliana.martins@escola.com', role: 'TEACHER', school: 'Colégio São José', requestDate: '3 dias atrás' },
                        { id: 3, name: 'Pedro Almeida', email: 'pedro.almeida@escola.com', role: 'AI_MAESTRO', school: 'Universidade Federal', requestDate: '1 dia atrás' }
                      ].map((user) => (
                        <Card key={user.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{user.name}</h4>
                                <p className="text-sm text-gray-600">{user.email}</p>
                                <div className="flex items-center space-x-4 mt-1">
                                  <Badge variant="secondary">{user.role}</Badge>
                                  <span className="text-sm text-gray-500">{user.school}</span>
                                  <span className="text-sm text-gray-500">• Solicitado {user.requestDate}</span>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                  onClick={() => alert(`Usuário ${user.name} aprovado com sucesso!`)}
                                >
                                  Aprovar
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => alert(`Solicitação de ${user.name} rejeitada`)}
                                >
                                  Rejeitar
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog open={isCertificatesOpen} onOpenChange={setIsCertificatesOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <GraduationCap className="mr-2 h-4 w-4" />
                      Emitir Certificados
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
                    <DialogHeader>
                      <DialogTitle className="flex items-center space-x-2">
                        <GraduationCap className="h-6 w-6 text-blue-600" />
                        <span>Emissão de Certificados</span>
                      </DialogTitle>
                      <DialogDescription>
                        Emita certificados para professores que completaram módulos
                      </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="pending" className="mt-4">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="pending">Pendentes</TabsTrigger>
                        <TabsTrigger value="issued">Emitidos</TabsTrigger>
                        <TabsTrigger value="templates">Templates</TabsTrigger>
                      </TabsList>

                      <div className="overflow-y-auto max-h-[60vh] mt-4">
                        <TabsContent value="pending" className="space-y-4">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-medium">Professores elegíveis para certificação</h3>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                              <GraduationCap className="h-4 w-4 mr-2" />
                              Emitir em Lote
                            </Button>
                          </div>
                          <div className="space-y-3">
                            {[
                              { id: 1, name: 'Prof. Carlos Lima', module: 'Starter', completedDate: '15/12/2024', score: 92 },
                              { id: 2, name: 'Prof. Ana Costa', module: 'Survivor', completedDate: '14/12/2024', score: 87 },
                              { id: 3, name: 'Prof. Maria Silva', module: 'Explorer', completedDate: '13/12/2024', score: 95 },
                              { id: 4, name: 'Prof. João Santos', module: 'Starter', completedDate: '12/12/2024', score: 88 }
                            ].map((teacher) => (
                              <Card key={teacher.id}>
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                        {teacher.name.split(' ').map(n => n[0]).join('')}
                                      </div>
                                      <div>
                                        <h4 className="font-medium">{teacher.name}</h4>
                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                          <span>Módulo: {teacher.module}</span>
                                          <span>•</span>
                                          <span>Conclusão: {teacher.completedDate}</span>
                                          <span>•</span>
                                          <span>Nota: {teacher.score}%</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Button 
                                        size="sm"
                                        onClick={() => alert(`Certificado emitido para ${teacher.name}`)}
                                      >
                                        Emitir Certificado
                                      </Button>
                                      <Button size="sm" variant="outline">Preview</Button>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="issued" className="space-y-4">
                          <Card>
                            <CardHeader>
                              <CardTitle>Certificados Emitidos</CardTitle>
                              <CardDescription>Histórico de certificados já emitidos</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                {[
                                  { id: 1, name: 'Prof. Roberto Silva', module: 'Starter', issuedDate: '10/12/2024', certificateId: 'CERT-2024-001' },
                                  { id: 2, name: 'Prof. Patricia Oliveira', module: 'Starter', issuedDate: '09/12/2024', certificateId: 'CERT-2024-002' },
                                  { id: 3, name: 'Prof. Marcos Santos', module: 'Survivor', issuedDate: '08/12/2024', certificateId: 'CERT-2024-003' }
                                ].map((cert) => (
                                  <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                      <h4 className="font-medium">{cert.name}</h4>
                                      <p className="text-sm text-gray-600">Módulo {cert.module} • Emitido em {cert.issuedDate}</p>
                                      <p className="text-xs text-gray-500">ID: {cert.certificateId}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                      <Button size="sm" variant="outline">
                                        <Eye className="h-4 w-4 mr-2" />
                                        Visualizar
                                      </Button>
                                      <Button size="sm" variant="outline">
                                        <Download className="h-4 w-4 mr-2" />
                                        Baixar
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>

                        <TabsContent value="templates" className="space-y-4">
                          <Card>
                            <CardHeader>
                              <CardTitle>Templates de Certificado</CardTitle>
                              <CardDescription>Gerencie os modelos de certificado para cada módulo</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                  { module: 'Starter', lastUpdated: '01/12/2024', uses: 156 },
                                  { module: 'Survivor', lastUpdated: '01/12/2024', uses: 98 },
                                  { module: 'Explorer', lastUpdated: '01/12/2024', uses: 45 },
                                  { module: 'Expert', lastUpdated: '01/12/2024', uses: 12 }
                                ].map((template) => (
                                  <Card key={template.module} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-4">
                                      <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-medium">Módulo {template.module}</h4>
                                        <Badge variant="secondary">{template.uses} usos</Badge>
                                      </div>
                                      <p className="text-sm text-gray-600 mb-3">Atualizado em {template.lastUpdated}</p>
                                      <div className="flex space-x-2">
                                        <Button size="sm" variant="outline" className="flex-1">Editar</Button>
                                        <Button size="sm" variant="outline" className="flex-1">Preview</Button>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </div>
                    </Tabs>
                  </DialogContent>
                </Dialog>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    alert('Abrindo visualização como professor...')
                    router.push('/dashboard')
                  }}
                >
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