'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Users, 
  School, 
  Building2, 
  Upload, 
  Download,
  UserPlus,
  GraduationCap, 
  TrendingUp,
  Calendar,
  FileText,
  Brain,
  BarChart3,
  Settings,
  Shield,
  Database,
  BookOpen,
  Award,
  DollarSign,
  Clock,
  Target,
  AlertCircle,
  CheckCircle2,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  Calendar as CalendarIcon,
  Zap,
  MessageSquare,
  Star,
  Briefcase,
  Globe,
  Activity
} from 'lucide-react'

interface ComprehensiveAdminProps {
  organizationType: 'school' | 'government' | 'university'
  organizationName: string
  userRole: 'SUPER_ADMIN' | 'ADMIN' | 'COORDINATOR'
}

export default function ComprehensiveAdminDashboard({ organizationType, organizationName, userRole }: ComprehensiveAdminProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null)

  // Mock data - would come from API
  const platformStats = {
    totalSchools: 145,
    totalTeachers: 2847,
    totalStudents: 12450,
    totalAdmins: 67,
    activeUsers: 8924,
    monthlyRevenue: 245600,
    coursesCompleted: 5642,
    aiUsageHours: 15420,
    supportTickets: 23,
    systemUptime: 99.97
  }

  const schools = [
    { id: 1, name: 'E.E. Dom Pedro II', state: 'SP', teachers: 45, students: 850, status: 'active', plan: 'Premium' },
    { id: 2, name: 'EMEF Santos Dumont', state: 'RJ', teachers: 32, students: 620, status: 'active', plan: 'Standard' },
    { id: 3, name: 'Colégio Tiradentes', state: 'MG', teachers: 67, students: 1200, status: 'inactive', plan: 'Premium' },
    { id: 4, name: 'Instituto Federal', state: 'RS', teachers: 89, students: 1600, status: 'active', plan: 'Enterprise' }
  ]

  const recentUsers = [
    { name: 'Maria Silva', email: 'maria@escola.com', role: 'TEACHER', school: 'E.E. Dom Pedro II', lastActive: '2 min ago', status: 'online' },
    { name: 'João Santos', email: 'joao@ifrs.edu.br', role: 'ADMIN', school: 'Instituto Federal', lastActive: '15 min ago', status: 'away' },
    { name: 'Ana Costa', email: 'ana@santos.sp.gov.br', role: 'TEACHER', school: 'EMEF Santos Dumont', lastActive: '1h ago', status: 'offline' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="text-gray-600">Gerenciamento completo da plataforma TEACH</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar Dados
          </Button>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Activity className="w-3 h-3 mr-1" />
            Sistema Online
          </Badge>
        </div>
      </div>

      {/* Platform Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Escolas</p>
                <p className="text-2xl font-bold">{platformStats.totalSchools}</p>
                <p className="text-xs text-green-600">+8 este mês</p>
              </div>
              <School className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Professores</p>
                <p className="text-2xl font-bold">{platformStats.totalTeachers.toLocaleString()}</p>
                <p className="text-xs text-green-600">+156 este mês</p>
              </div>
              <GraduationCap className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Alunos</p>
                <p className="text-2xl font-bold">{platformStats.totalStudents.toLocaleString()}</p>
                <p className="text-xs text-blue-600">+892 este mês</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Receita</p>
                <p className="text-2xl font-bold">R$ {(platformStats.monthlyRevenue / 1000).toFixed(0)}k</p>
                <p className="text-xs text-green-600">+23% vs anterior</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uptime</p>
                <p className="text-2xl font-bold">{platformStats.systemUptime}%</p>
                <p className="text-xs text-green-600">Últimos 30 dias</p>
              </div>
              <Zap className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Admin Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="schools">Escolas</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="maestros">AI MAESTROS</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Cadastrar Nova Escola
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Importar Usuários em Massa
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Adicionar Professor/Aluno
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar AI MAESTRO
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Gerar Relatório Completo
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Atividade Recente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.school}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.status === 'online' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                      <span className="text-xs text-gray-500">{user.lastActive}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Platform Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Engajamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Usuários Ativos</span>
                      <span>{Math.round((platformStats.activeUsers / (platformStats.totalTeachers + platformStats.totalStudents)) * 100)}%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Cursos Concluídos</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Uso de IA</span>
                      <span>89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI MAESTROS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Maestros Ativos</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Aulas Esta Semana</span>
                    <span className="font-medium">48</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Próxima Aula</span>
                    <span className="font-medium">14:30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avaliação Média</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">4.8</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Alertas do Sistema
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Todos os serviços operacionais</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>{platformStats.supportTickets} tickets pendentes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Backup concluído às 03:00</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Performance: Excelente</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Schools Management Tab */}
        <TabsContent value="schools" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Gerenciamento de Escolas</h2>
              <p className="text-gray-600">Cadastre e gerencie instituições de ensino</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nova Escola
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* School Registration Form */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Cadastro Rápido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Nome da Escola</p>
                  <Input placeholder="Ex: E.E. Santos Dumont" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Estado</p>
                  <Input placeholder="Ex: SP" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Tipo</p>
                  <Input placeholder="Ex: Estadual, Municipal" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Email do Administrador</p>
                  <Input type="email" placeholder="admin@escola.com" />
                </div>
                <Button className="w-full">Cadastrar Escola</Button>
              </CardContent>
            </Card>

            {/* Schools List */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Escolas Cadastradas</CardTitle>
                <div className="flex gap-2">
                  <Input placeholder="Buscar escolas..." className="flex-1" />
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {schools.map((school) => (
                    <div key={school.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <School className="w-8 h-8 text-blue-500" />
                        <div>
                          <h3 className="font-medium">{school.name}</h3>
                          <p className="text-sm text-gray-600">{school.teachers} professores • {school.students} alunos</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={school.status === 'active' ? 'default' : 'secondary'}>
                          {school.status === 'active' ? 'Ativa' : 'Inativa'}
                        </Badge>
                        <Badge variant="outline">{school.plan}</Badge>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users Management Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Gerenciamento de Usuários</h2>
              <p className="text-gray-600">Cadastre professores, alunos e administradores</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Importar CSV
              </Button>
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Novo Usuário
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* User Stats */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <GraduationCap className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{platformStats.totalTeachers.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Professores</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Users className="w-12 h-12 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{platformStats.totalStudents.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Alunos</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Shield className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{platformStats.totalAdmins}</p>
                  <p className="text-sm text-gray-600">Administradores</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Activity className="w-12 h-12 text-orange-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{platformStats.activeUsers.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Usuários Ativos</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bulk Import Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Importação em Massa
              </CardTitle>
              <CardDescription>
                Importe professores e alunos usando planilhas CSV
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-24 flex-col">
                  <GraduationCap className="w-8 h-8 mb-2" />
                  Importar Professores
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Users className="w-8 h-8 mb-2" />
                  Importar Alunos
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Download className="w-8 h-8 mb-2" />
                  Baixar Template
                </Button>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>Dica:</strong> Use nosso template CSV para garantir que todos os campos necessários estejam preenchidos corretamente.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Management Tab */}
        <TabsContent value="content" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Gestão de Conteúdo</h2>
              <p className="text-gray-600">Módulos, aulas e recursos educacionais</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Conteúdo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-gray-600">Módulos Ativos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-gray-600">Aulas Publicadas</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-gray-600">Certificados Emitidos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Brain className="w-12 h-12 text-orange-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">89%</p>
                <p className="text-sm text-gray-600">Uso de IA</p>
              </CardContent>
            </Card>
          </div>

          {/* Content Management Tools */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Módulos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Starter', 'Survivor', 'Explorer', 'Expert'].map((module, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-medium">{module} - Fundamentos de IA</p>
                        <p className="text-sm text-gray-600">6 aulas • {Math.floor(Math.random() * 1000)} usuários</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recursos e Ferramentas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-16 flex-col">
                    <Brain className="w-6 h-6 mb-1" />
                    AI Tools
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <MessageSquare className="w-6 h-6 mb-1" />
                    Fórum
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <Award className="w-6 h-6 mb-1" />
                    Certificados
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <BarChart3 className="w-6 h-6 mb-1" />
                    Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI MAESTROS Tab */}
        <TabsContent value="maestros" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">AI MAESTROS</h2>
              <p className="text-gray-600">Gerenciar aulas ao vivo e agenda</p>
            </div>
            <Button>
              <Calendar className="w-4 h-4 mr-2" />
              Agendar Aula
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>MAESTROS Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">12</p>
                  <p className="text-sm text-gray-600">Especialistas disponíveis</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Aulas Esta Semana</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">48</p>
                  <p className="text-sm text-gray-600">Sessions agendadas</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Avaliação Média</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-3xl font-bold text-yellow-600">4.8</p>
                  <p className="text-sm text-gray-600">Baseado em 1,247 avaliações</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Schedule Management */}
          <Card>
            <CardHeader>
              <CardTitle>Agenda de Aulas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: '09:00', title: 'Fundamentos de IA para Iniciantes', maestro: 'AI MAESTRO Alpha', attendees: 45 },
                  { time: '14:30', title: 'Ferramentas Avançadas de IA', maestro: 'AI MAESTRO Beta', attendees: 32 },
                  { time: '19:00', title: 'IA na Educação Brasileira', maestro: 'AI MAESTRO Gamma', attendees: 67 }
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="font-bold text-purple-600">{session.time}</p>
                        <p className="text-xs text-gray-500">Hoje</p>
                      </div>
                      <div>
                        <p className="font-medium">{session.title}</p>
                        <p className="text-sm text-gray-600">{session.maestro} • {session.attendees} participantes</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Analytics Avançado</h2>
            <p className="text-gray-600">Insights detalhados sobre o uso da plataforma</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">+34%</p>
                <p className="text-sm text-gray-600">Crescimento Mensal</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">8.5h</p>
                <p className="text-sm text-gray-600">Tempo Médio/Semana</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">89%</p>
                <p className="text-sm text-gray-600">Taxa de Conclusão</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">R$ 245k</p>
                <p className="text-sm text-gray-600">Receita Mensal</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance por Estado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { state: 'São Paulo', schools: 45, users: 2840, engagement: 92 },
                    { state: 'Rio de Janeiro', schools: 32, users: 1950, engagement: 87 },
                    { state: 'Minas Gerais', schools: 28, users: 1680, engagement: 84 },
                    { state: 'Rio Grande do Sul', schools: 25, users: 1420, engagement: 89 }
                  ].map((state, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{state.state}</p>
                        <p className="text-sm text-gray-600">{state.schools} escolas • {state.users} usuários</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{state.engagement}%</p>
                        <p className="text-xs text-gray-500">Engajamento</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ROI por Escola</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">+340%</p>
                    <p className="text-sm text-green-800">ROI Médio da Plataforma</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Economia em Ferramentas</span>
                      <span className="font-medium">R$ 89k/mês</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Aumento de Produtividade</span>
                      <span className="font-medium">+67%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Redução de Custos</span>
                      <span className="font-medium">R$ 156k/mês</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Configurações do Sistema</h2>
            <p className="text-gray-600">Gerencie configurações globais da plataforma</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Nome da Plataforma</p>
                  <Input defaultValue="TEACH" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Email de Suporte</p>
                  <Input defaultValue="suporte@teach.com.br" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Limite de Usuários por Escola</p>
                  <Input type="number" defaultValue="1000" />
                </div>
                <Button>Salvar Configurações</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Segurança e Backup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Backup Automático</span>
                  <Badge variant="default">Ativo</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>2FA Obrigatório</span>
                  <Badge variant="secondary">Administradores</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Logs de Auditoria</span>
                  <Badge variant="default">Habilitado</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Último Backup</span>
                  <span className="text-sm text-gray-600">Hoje, 03:00</span>
                </div>
                <Button variant="outline" className="w-full">
                  <Database className="w-4 h-4 mr-2" />
                  Executar Backup Manual
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}