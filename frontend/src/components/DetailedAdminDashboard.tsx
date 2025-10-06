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
  Activity,
  ChevronDown,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface DetailedAdminProps {
  organizationType: 'school' | 'government' | 'university'
  organizationName: string
  userRole: 'SUPER_ADMIN' | 'ADMIN' | 'COORDINATOR'
}

export default function DetailedAdminDashboard({ organizationType, organizationName, userRole }: DetailedAdminProps) {
  const [activeTab, setActiveTab] = useState('users')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Mock data for users table
  const users = [
    { id: 1, name: 'Maria Silva Santos', email: 'maria.santos@escola.sp.gov.br', role: 'TEACHER', school: 'E.E. Dom Pedro II', subject: 'Matemática', status: 'active', lastLogin: '2024-10-06 09:15', joinDate: '2024-01-15' },
    { id: 2, name: 'João Carlos Pereira', email: 'joao.pereira@emef.rj.gov.br', role: 'TEACHER', school: 'EMEF Santos Dumont', subject: 'História', status: 'active', lastLogin: '2024-10-06 08:30', joinDate: '2024-02-20' },
    { id: 3, name: 'Ana Paula Costa', email: 'ana.costa@ifrs.edu.br', role: 'ADMIN', school: 'Instituto Federal RS', subject: 'Administração', status: 'active', lastLogin: '2024-10-05 16:45', joinDate: '2024-01-10' },
    { id: 4, name: 'Pedro Henrique Lima', email: 'pedro.lima@colegiotec.com', role: 'TEACHER', school: 'Colégio Técnico MG', subject: 'Física', status: 'inactive', lastLogin: '2024-10-01 14:20', joinDate: '2024-03-05' },
    { id: 5, name: 'Carla Fernanda Oliveira', email: 'carla.oliveira@escola.ce.gov.br', role: 'COORDINATOR', school: 'Centro de Ensino CE', subject: 'Coordenação', status: 'active', lastLogin: '2024-10-06 07:00', joinDate: '2024-01-08' },
    { id: 6, name: 'Roberto Carlos Mendes', email: 'roberto.mendes@unb.br', role: 'TEACHER', school: 'Universidade de Brasília', subject: 'Ciências', status: 'active', lastLogin: '2024-10-05 19:30', joinDate: '2024-02-12' },
    { id: 7, name: 'Juliana Aparecida Silva', email: 'juliana.silva@escola.mg.gov.br', role: 'TEACHER', school: 'E.E. Tiradentes', subject: 'Português', status: 'pending', lastLogin: 'Nunca', joinDate: '2024-10-05' },
    { id: 8, name: 'Fernando José Santos', email: 'fernando.santos@ifsc.edu.br', role: 'TEACHER', school: 'Instituto Federal SC', subject: 'Tecnologia', status: 'active', lastLogin: '2024-10-06 10:15', joinDate: '2024-01-20' }
  ]

  // Mock data for schools
  const schools = [
    { id: 1, name: 'E.E. Dom Pedro II', state: 'SP', city: 'São Paulo', type: 'Estadual', teachers: 45, students: 850, status: 'active', plan: 'Premium', createdAt: '2024-01-15' },
    { id: 2, name: 'EMEF Santos Dumont', state: 'RJ', city: 'Rio de Janeiro', type: 'Municipal', teachers: 32, students: 620, status: 'active', plan: 'Standard', createdAt: '2024-02-01' },
    { id: 3, name: 'Instituto Federal RS', state: 'RS', city: 'Porto Alegre', type: 'Federal', teachers: 89, students: 1600, status: 'active', plan: 'Enterprise', createdAt: '2024-01-10' },
    { id: 4, name: 'Colégio Técnico MG', state: 'MG', city: 'Belo Horizonte', type: 'Técnico', teachers: 67, students: 1200, status: 'active', plan: 'Premium', createdAt: '2024-02-15' },
    { id: 5, name: 'Centro de Ensino CE', state: 'CE', city: 'Fortaleza', type: 'Estadual', teachers: 54, students: 980, status: 'inactive', plan: 'Standard', createdAt: '2024-03-01' }
  ]

  // Filter users based on search
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.school.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Ativo</Badge>
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800 border-red-300">Inativo</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Pendente</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'TEACHER':
        return <Badge className="bg-blue-100 text-blue-800">Professor</Badge>
      case 'ADMIN':
        return <Badge className="bg-purple-100 text-purple-800">Admin</Badge>
      case 'COORDINATOR':
        return <Badge className="bg-orange-100 text-orange-800">Coordenador</Badge>
      case 'STUDENT':
        return <Badge className="bg-green-100 text-green-800">Aluno</Badge>
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie usuários, escolas e conteúdo da plataforma TEACH</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar Dados
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
                <p className="text-2xl font-bold text-gray-900">2,847</p>
                <p className="text-xs text-green-600">+156 este mês</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <School className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Escolas Ativas</p>
                <p className="text-2xl font-bold text-gray-900">145</p>
                <p className="text-xs text-green-600">+8 este mês</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cursos Concluídos</p>
                <p className="text-2xl font-bold text-gray-900">5,642</p>
                <p className="text-xs text-blue-600">73% taxa de conclusão</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">AI MAESTROS</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-xs text-purple-600">48 aulas esta semana</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Admin Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="schools">Escolas</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="maestros">AI MAESTROS</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        {/* Users Management Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Gerenciamento de Usuários</CardTitle>
                  <CardDescription>
                    Gerencie professores, alunos e administradores da plataforma
                  </CardDescription>
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
            </CardHeader>
            <CardContent>
              {/* Search and Filters */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar por nome, email ou escola..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-80"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredUsers.length)} de {filteredUsers.length} usuários
                </p>
              </div>

              {/* Users Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          Usuário
                          <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Função
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Escola
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Último Acesso
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-sm font-medium text-blue-600">
                                  {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col gap-1">
                            {getRoleBadge(user.role)}
                            <span className="text-xs text-gray-500">{user.subject}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.school}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(user.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.lastLogin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Itens por página:</span>
                  <Button variant="outline" size="sm">
                    {itemsPerPage}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </Button>
                  <span className="text-sm text-gray-600">
                    Página {currentPage} de {totalPages}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Próximo
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schools Management Tab */}
        <TabsContent value="schools" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Gerenciamento de Escolas</CardTitle>
                  <CardDescription>
                    Cadastre e gerencie instituições de ensino
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Escola
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Schools Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Escola
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Localização
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usuários
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plano
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {schools.map((school) => (
                      <tr key={school.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <School className="w-8 h-8 text-blue-500 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{school.name}</div>
                              <div className="text-xs text-gray-500">Criado em {new Date(school.createdAt).toLocaleDateString('pt-BR')}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{school.city}, {school.state}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline">{school.type}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {school.teachers} professores
                          </div>
                          <div className="text-xs text-gray-500">
                            {school.students} alunos
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={
                            school.plan === 'Enterprise' ? 'bg-purple-100 text-purple-800' :
                            school.plan === 'Premium' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }>
                            {school.plan}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(school.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Management Tab */}
        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-gray-600">Módulos Ativos</p>
                <Button variant="outline" size="sm" className="mt-3">
                  Gerenciar
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-gray-600">Aulas Publicadas</p>
                <Button variant="outline" size="sm" className="mt-3">
                  Gerenciar
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-gray-600">Certificados</p>
                <Button variant="outline" size="sm" className="mt-3">
                  Gerenciar
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <MessageSquare className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-gray-600">Posts Fórum</p>
                <Button variant="outline" size="sm" className="mt-3">
                  Moderar
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Engajamento Geral
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Usuários Ativos</span>
                      <span>72%</span>
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
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  ROI Financeiro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">+340%</p>
                  <p className="text-sm text-gray-600">Retorno sobre investimento</p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Economia</span>
                      <span className="font-medium">R$ 89k/mês</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Produtividade</span>
                      <span className="font-medium">+67%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Tempo de Uso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">8.5h</p>
                  <p className="text-sm text-gray-600">Média por usuário/semana</p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Tempo em Aulas</span>
                      <span className="font-medium">5.2h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Uso de Ferramentas</span>
                      <span className="font-medium">3.3h</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI MAESTROS Tab */}
        <TabsContent value="maestros" className="space-y-6">
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
                  <p className="text-sm text-gray-600">1,247 avaliações</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
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
                <Button>Salvar Configurações</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Segurança do Sistema</CardTitle>
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
                <Button variant="outline" className="w-full">
                  <Database className="w-4 h-4 mr-2" />
                  Executar Backup
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}