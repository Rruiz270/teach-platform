'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Users, BookOpen, Award, TrendingUp, Settings, Eye, UserCheck, BarChart3, Calendar, MessageSquare, FileText, GraduationCap, Brain, Star, Clock, DollarSign } from 'lucide-react'
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
                  <Button variant="outline" className="h-24 flex flex-col space-y-2">
                    <Users className="h-8 w-8" />
                    <span className="text-sm">Gerenciar Usuários</span>
                  </Button>
                  
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