'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
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
  ChevronRight,
  X,
  ExternalLink,
  PieChart,
  TrendingDown,
  Users2,
  BookMarked,
  FileSpreadsheet,
  PlayCircle,
  PauseCircle,
  RefreshCw
} from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface CompleteAdminProps {
  organizationType: 'school' | 'government' | 'university'
  organizationName: string
  userRole: 'SUPER_ADMIN' | 'ADMIN' | 'COORDINATOR'
}

export default function CompleteAdminSystem({ organizationType, organizationName, userRole }: CompleteAdminProps) {
  const [activeTab, setActiveTab] = useState('users')
  const [searchTerm, setSearchTerm] = useState('')
  
  // Modal states
  const [showMaestroModal, setShowMaestroModal] = useState(false)
  const [showReportsModal, setShowReportsModal] = useState(false)
  const [showUsersModal, setShowUsersModal] = useState(false)
  const [showCertificatesModal, setShowCertificatesModal] = useState(false)
  const [showSchoolsModal, setShowSchoolsModal] = useState(false)
  const [showContentModal, setShowContentModal] = useState(false)
  const [showForumModal, setShowForumModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  
  // Sub-tab states for modals
  const [maestroTab, setMaestroTab] = useState('overview')
  const [reportsTab, setReportsTab] = useState('dashboard')
  const [usersTab, setUsersTab] = useState('all')
  const [certificatesTab, setCertificatesTab] = useState('pending')

  const maestros = [
    { 
      id: 1, 
      name: 'Dr. Ana Silva', 
      email: 'ana.silva@teach.com',
      rating: 4.9,
      hourlyRate: 200,
      classesGiven: 47,
      satisfaction: 96,
      specializations: ['Implementação de IA na Educação', 'ChatGPT para Educadores', 'Avaliação Automatizada'],
      availability: {
        seg: 'Noite', ter: 'Noite', qua: 'Noite', qui: 'Noite', sex: 'Noite', sab: 'Indisponível', dom: 'Indisponível'
      },
      status: 'active'
    },
    {
      id: 2,
      name: 'Prof. Carlos Oliveira',
      email: 'carlos.oliveira@teach.com', 
      rating: 4.7,
      hourlyRate: 180,
      classesGiven: 32,
      satisfaction: 94,
      specializations: ['IA para Educação Básica', 'Ferramentas Digitais'],
      availability: {
        seg: 'Manhã', ter: 'Manhã', qua: 'Manhã', qui: 'Manhã', sex: 'Indisponível', sab: 'Indisponível', dom: 'Indisponível'
      },
      status: 'active'
    },
    {
      id: 3,
      name: 'Dra. Mariana Costa',
      email: 'mariana.costa@teach.com',
      rating: 4.8,
      hourlyRate: 220,
      classesGiven: 28,
      satisfaction: 98,
      specializations: ['IA Avançada', 'Machine Learning'],
      availability: {
        seg: 'Tarde', ter: 'Tarde', qua: 'Tarde', qui: 'Tarde', sex: 'Tarde', sab: 'Manhã', dom: 'Indisponível'
      },
      status: 'active'
    }
  ]

  const users = [
    { id: 1, name: 'Prof. Maria Silva', email: 'maria.silva@escola.com', role: 'TEACHER', progress: 45, status: 'active', lastActivity: '2 horas atrás', modules: '3/4' },
    { id: 2, name: 'João Santos', email: 'joao.santos@escola.com', role: 'ADMIN', progress: 89, status: 'active', lastActivity: '1 dia atrás', modules: '4/4' },
    { id: 3, name: 'Ana Costa', email: 'ana.costa@escola.com', role: 'TEACHER', progress: 23, status: 'inactive', lastActivity: '1 semana atrás', modules: '2/4' },
    { id: 4, name: 'Carlos Lima', email: 'carlos.lima@escola.com', role: 'TEACHER', progress: 89, status: 'active', lastActivity: '3 horas atrás', modules: '4/4' },
    { id: 5, name: 'Patricia Oliveira', email: 'patricia.oliveira@escola.com', role: 'PARENT', progress: 34, status: 'active', lastActivity: '2 dias atrás', modules: '1/4' }
  ]

  const pendingCertificates = [
    { id: 1, name: 'Prof. Carlos Lima', module: 'Starter', completion: '15/12/2024', grade: 92 },
    { id: 2, name: 'Prof. Ana Costa', module: 'Survivor', completion: '14/12/2024', grade: 87 },
    { id: 3, name: 'Prof. Maria Silva', module: 'Explorer', completion: '13/12/2024', grade: 95 },
    { id: 4, name: 'Prof. João Santos', module: 'Starter', completion: '12/12/2024', grade: 88 }
  ]

  // AI MAESTRO Modal Component
  const MaestroModal = () => (
    <Dialog open={showMaestroModal} onOpenChange={setShowMaestroModal}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Gerenciamento de AI MAESTROs
          </DialogTitle>
          <DialogDescription>
            Gerencie os especialistas em IA que ministram treinamentos para os professores
          </DialogDescription>
        </DialogHeader>

        <Tabs value={maestroTab} onValueChange={setMaestroTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="maestros">MAESTROs (4)</TabsTrigger>
            <TabsTrigger value="attributes">Atribuições</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Brain className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-gray-600">Total MAESTROs</p>
                  <p className="text-xs text-green-600">+2 este mês</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">6</p>
                  <p className="text-sm text-gray-600">MAESTROs Ativos</p>
                  <p className="text-xs text-blue-600">75% da capacidade</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">4.8</p>
                  <p className="text-sm text-gray-600">Avaliação Média</p>
                  <p className="text-xs text-yellow-600">⭐ de 5 estrelas</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">R$ 162</p>
                  <p className="text-sm text-gray-600">Taxa Horária Média</p>
                  <p className="text-xs text-green-600">Por hora/aula</p>
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
                    {maestros.map((maestro) => (
                      <div key={maestro.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {maestro.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{maestro.name}</p>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm">{maestro.rating}</span>
                              <span className="text-xs text-gray-500">({maestro.classesGiven} aulas)</span>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Ativo</Badge>
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
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>ChatGPT para Educadores</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Implementação de IA</span>
                        <span>72%</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Avaliação Automatizada</span>
                        <span>68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
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

          <TabsContent value="maestros" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Input
                  placeholder="Buscar MAESTROs por nome ou email..."
                  className="w-80"
                />
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Todas Especializações" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas Especializações</SelectItem>
                    <SelectItem value="chatgpt">ChatGPT para Educadores</SelectItem>
                    <SelectItem value="implementation">Implementação de IA</SelectItem>
                    <SelectItem value="assessment">Avaliação Automatizada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {maestros.map((maestro) => (
                <Card key={maestro.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-lg font-medium text-blue-600">
                          {maestro.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{maestro.name}</h3>
                          <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{maestro.email}</p>
                        <p className="text-sm text-gray-700 mb-3">
                          Doutora em Educação com 15 anos de experiência em tecnologia educacional. Especialista em implementação de IA em ambientes de aprendizagem.
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{maestro.rating}</p>
                            <p className="text-xs text-gray-600">Avaliação</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">R$ {maestro.hourlyRate}</p>
                            <p className="text-xs text-gray-600">Por hora</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-purple-600">{maestro.classesGiven}</p>
                            <p className="text-xs text-gray-600">Aulas dadas</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-orange-600">{maestro.satisfaction}%</p>
                            <p className="text-xs text-gray-600">Satisfação</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Especializações:</p>
                          <div className="flex flex-wrap gap-2">
                            {maestro.specializations.map((spec, index) => (
                              <Badge key={index} variant="outline">{spec}</Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Disponibilidade:</p>
                          <div className="grid grid-cols-7 gap-2 text-xs">
                            {Object.entries(maestro.availability).map(([day, time]) => (
                              <div key={day} className="text-center">
                                <p className="font-medium mb-1">{day.charAt(0).toUpperCase() + day.slice(1)}:</p>
                                <Badge variant={time === 'Indisponível' ? 'secondary' : 'default'} className="text-xs">
                                  {time}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">Ver Detalhes</Button>
                      <Button size="sm" variant="outline">Atribuir Aula</Button>
                      <Button size="sm" variant="outline">Editar</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance dos MAESTROs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {maestros.map((maestro) => (
                      <div key={maestro.id} className="flex justify-between items-center">
                        <span className="text-sm">{maestro.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-blue-500 rounded-full" 
                              style={{ width: `${maestro.satisfaction}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{maestro.satisfaction}%</span>
                        </div>
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
                    {maestros.map((maestro) => (
                      <div key={maestro.id} className="flex justify-between items-center">
                        <span className="text-sm">{maestro.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-green-500 rounded-full" 
                              style={{ width: `${(maestro.classesGiven / 50) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{Math.floor(maestro.classesGiven / 10)} dias/semana</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )

  // Reports Modal Component
  const ReportsModal = () => (
    <Dialog open={showReportsModal} onOpenChange={setShowReportsModal}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Central de Relatórios
          </DialogTitle>
          <DialogDescription>
            Gere e visualize relatórios detalhados sobre o desempenho da plataforma
          </DialogDescription>
        </DialogHeader>

        <Tabs value={reportsTab} onValueChange={setReportsTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="progress">Progresso</TabsTrigger>
            <TabsTrigger value="engagement">Engajamento</TabsTrigger>
            <TabsTrigger value="export">Exportar</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">73%</p>
                  <p className="text-sm text-gray-600">Taxa de Conclusão Geral</p>
                  <p className="text-xs text-green-600">+5% este mês</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">2.4h</p>
                  <p className="text-sm text-gray-600">Tempo Médio de Estudo</p>
                  <p className="text-xs text-blue-600">Por semana</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-600">89</p>
                  <p className="text-sm text-gray-600">Certificados Emitidos</p>
                  <p className="text-xs text-purple-600">Este mês</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-yellow-600">4.8</p>
                  <p className="text-sm text-gray-600">Satisfação Geral</p>
                  <p className="text-xs text-yellow-600">⭐ de 5</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Desempenho por Módulo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Starter</span>
                        <span className="text-sm text-gray-600">Pontuação média: 92%</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">142</div>
                          <span>Completaram</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">12</div>
                          <span>Em progresso</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center text-white text-xs font-bold">2</div>
                          <span>Não iniciaram</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Survivor</span>
                        <span className="text-sm text-gray-600">Pontuação média: 85%</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">98</div>
                          <span>Completaram</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">34</div>
                          <span>Em progresso</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center text-white text-xs font-bold">24</div>
                          <span>Não iniciaram</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Explorer</span>
                        <span className="text-sm text-gray-600">Pontuação média: 78%</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">45</div>
                          <span>Completaram</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">23</div>
                          <span>Em progresso</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center text-white text-xs font-bold">88</div>
                          <span>Não iniciaram</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Progresso Detalhado por Professor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.filter(u => u.role === 'TEACHER').map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-sm text-gray-600">Módulos: {user.modules}</span>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">Última atividade: {user.lastActivity}</div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-blue-500 rounded-full" 
                            style={{ width: `${user.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <span className="text-2xl font-bold">{user.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Participação no Fórum</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Posts criados</span>
                      <span className="font-bold">234</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Respostas</span>
                      <span className="font-bold">567</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Usuários ativos</span>
                      <span className="font-bold">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxa de resposta</span>
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
                    <div className="flex justify-between">
                      <span>Quiz IA Básico</span>
                      <span className="font-bold">145 participantes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Workshop ChatGPT</span>
                      <span className="font-bold">132 participantes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fórum de Dúvidas</span>
                      <span className="font-bold">98 participantes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Desafio Semanal</span>
                      <span className="font-bold">87 participantes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Exportar Relatórios</CardTitle>
                <CardDescription>Selecione o tipo de relatório e o período desejado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Tipo de Relatório</label>
                  <Select defaultValue="general">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Relatório Geral</SelectItem>
                      <SelectItem value="progress">Progresso dos Usuários</SelectItem>
                      <SelectItem value="engagement">Engajamento</SelectItem>
                      <SelectItem value="certificates">Certificados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Data Inicial</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Data Final</label>
                    <Input type="date" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-4 block">Formato de Exportação</label>
                  <div className="grid grid-cols-3 gap-4">
                    <Button variant="outline" className="h-16 flex-col">
                      <FileText className="w-6 h-6 mb-1" />
                      PDF
                    </Button>
                    <Button variant="outline" className="h-16 flex-col">
                      <BarChart3 className="w-6 h-6 mb-1" />
                      Excel
                    </Button>
                    <Button variant="outline" className="h-16 flex-col">
                      <Database className="w-6 h-6 mb-1" />
                      CSV
                    </Button>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  <Download className="w-4 h-4 mr-2" />
                  Gerar e Baixar Relatório
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )

  // Users Modal Component
  const UsersModal = () => (
    <Dialog open={showUsersModal} onOpenChange={setShowUsersModal}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Gerenciamento de Usuários
          </DialogTitle>
          <DialogDescription>
            Gerencie professores, administradores e outros usuários da plataforma
          </DialogDescription>
        </DialogHeader>

        <Tabs value={usersTab} onValueChange={setUsersTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Todos Usuários</TabsTrigger>
            <TabsTrigger value="teachers">Professores</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Input
                  placeholder="Buscar usuários por nome ou email..."
                  className="w-80"
                />
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Todos os Tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Tipos</SelectItem>
                    <SelectItem value="TEACHER">Professores</SelectItem>
                    <SelectItem value="ADMIN">Administradores</SelectItem>
                    <SelectItem value="PARENT">Pais/Responsáveis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Adicionar Usuário
              </Button>
            </div>

            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{user.name}</h3>
                        <Badge className={
                          user.role === 'TEACHER' ? 'bg-blue-100 text-blue-800' :
                          user.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
                          'bg-green-100 text-green-800'
                        }>
                          {user.role === 'TEACHER' ? 'TEACHER' : 
                           user.role === 'ADMIN' ? 'ADMIN' : 
                           'PARENT'}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">{user.progress}%</span>
                          <span className="text-xs text-gray-500">Progresso</span>
                        </div>
                        <Badge className={user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {user.status === 'active' ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500">{user.lastActivity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">Ver Detalhes</Button>
                    <Button size="sm" variant="outline">Editar</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Atividade por Tipo de Usuário</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Professores</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-blue-500 rounded-full" style={{ width: '75%' }} />
                        </div>
                        <span className="text-sm font-medium">156 usuários</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Administradores</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-red-500 rounded-full" style={{ width: '15%' }} />
                        </div>
                        <span className="text-sm font-medium">12 usuários</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>AI MAESTROs</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-purple-500 rounded-full" style={{ width: '10%' }} />
                        </div>
                        <span className="text-sm font-medium">8 usuários</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Pais/Responsáveis</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-green-500 rounded-full" style={{ width: '40%' }} />
                        </div>
                        <span className="text-sm font-medium">32 usuários</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Taxa de Engajamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Diário</span>
                      <span className="font-bold">45%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: '45%' }} />
                    </div>
                    <div className="flex justify-between">
                      <span>Semanal</span>
                      <span className="font-bold">78%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '78%' }} />
                    </div>
                    <div className="flex justify-between">
                      <span>Mensal</span>
                      <span className="font-bold">92%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-purple-500 rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )

  // Certificates Modal Component
  const CertificatesModal = () => (
    <Dialog open={showCertificatesModal} onOpenChange={setShowCertificatesModal}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Emissão de Certificados
          </DialogTitle>
          <DialogDescription>
            Emita certificados para professores que completaram módulos
          </DialogDescription>
        </DialogHeader>

        <Tabs value={certificatesTab} onValueChange={setCertificatesTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="issued">Emitidos</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Professores elegíveis para certificação</p>
              <Button>
                <Award className="w-4 h-4 mr-2" />
                Emitir em Lote
              </Button>
            </div>

            <div className="space-y-4">
              {pendingCertificates.map((cert) => (
                <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {cert.name.split(' ').slice(1).map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium">{cert.name}</h3>
                      <p className="text-sm text-gray-600">Módulo: {cert.module} • Conclusão: {cert.completion} • Nota: {cert.grade}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm">Emitir Certificado</Button>
                    <Button size="sm" variant="outline">Preview</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )

  // Schools Modal Component
  const SchoolsModal = () => (
    <Dialog open={showSchoolsModal} onOpenChange={setShowSchoolsModal}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <School className="w-6 h-6" />
            Gestão de Escolas
          </DialogTitle>
          <DialogDescription>
            Cadastre e gerencie instituições de ensino da plataforma
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="list">Lista de Escolas</TabsTrigger>
            <TabsTrigger value="add">Cadastrar Nova</TabsTrigger>
            <TabsTrigger value="bulk">Importação em Lote</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <div className="flex justify-between items-center">
              <Input placeholder="Buscar escolas..." className="w-80" />
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nova Escola
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { id: 1, name: 'E.E. Dom Pedro II', state: 'SP', city: 'São Paulo', users: 145, plan: 'Premium' },
                { id: 2, name: 'EMEF Santos Dumont', state: 'RJ', city: 'Rio de Janeiro', users: 89, plan: 'Standard' },
                { id: 3, name: 'Instituto Federal RS', state: 'RS', city: 'Porto Alegre', users: 267, plan: 'Enterprise' }
              ].map((school) => (
                <Card key={school.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <School className="w-8 h-8 text-blue-500" />
                      <div>
                        <h3 className="font-semibold">{school.name}</h3>
                        <p className="text-sm text-gray-600">{school.city}, {school.state}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Usuários:</span>
                        <span className="font-medium">{school.users}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Plano:</span>
                        <Badge variant="outline">{school.plan}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="flex-1">Ver Detalhes</Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="add" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Cadastrar Nova Escola</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Nome da Instituição</label>
                    <Input placeholder="Ex: E.E. Dom Pedro II" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Tipo</label>
                    <Input placeholder="Ex: Estadual, Municipal, Federal" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Estado</label>
                    <Input placeholder="Ex: São Paulo" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Cidade</label>
                    <Input placeholder="Ex: São Paulo" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">E-mail Institucional</label>
                    <Input placeholder="contato@escola.edu.br" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Telefone</label>
                    <Input placeholder="(11) 99999-9999" />
                  </div>
                </div>
                <Button className="w-full">Cadastrar Escola</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bulk" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Importação em Lote</CardTitle>
                <CardDescription>Importe múltiplas escolas via arquivo CSV</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Arraste o arquivo CSV aqui ou clique para selecionar</p>
                  <Button variant="outline">Selecionar Arquivo</Button>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium mb-2">Formato do CSV esperado:</p>
                  <p>nome,tipo,estado,cidade,email,telefone</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Estado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { state: 'São Paulo', count: 45, percentage: 31 },
                      { state: 'Rio de Janeiro', count: 32, percentage: 22 },
                      { state: 'Minas Gerais', count: 28, percentage: 19 },
                      { state: 'Rio Grande do Sul', count: 25, percentage: 17 }
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.state}</span>
                          <span>{item.count} escolas</span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tipos de Instituição</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: 'Estadual', count: 58, color: 'bg-blue-500' },
                      { type: 'Municipal', count: 42, color: 'bg-green-500' },
                      { type: 'Federal', count: 31, color: 'bg-purple-500' },
                      { type: 'Particular', count: 14, color: 'bg-orange-500' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded ${item.color}`}></div>
                          <span>{item.type}</span>
                        </div>
                        <span className="font-medium">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )

  // Content Modal Component
  const ContentModal = () => (
    <Dialog open={showContentModal} onOpenChange={setShowContentModal}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Gestão de Conteúdo
          </DialogTitle>
          <DialogDescription>
            Gerencie módulos, aulas e recursos educacionais
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="modules" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="modules">Módulos</TabsTrigger>
            <TabsTrigger value="lessons">Aulas</TabsTrigger>
            <TabsTrigger value="resources">Recursos</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Módulos Disponíveis</h3>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Módulo
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { id: 1, name: 'Starter', lessons: 6, students: 2847, status: 'Ativo' },
                { id: 2, name: 'Survivor', lessons: 8, students: 1567, status: 'Ativo' },
                { id: 3, name: 'Explorer', lessons: 10, students: 892, status: 'Ativo' },
                { id: 4, name: 'Master', lessons: 12, students: 234, status: 'Em Desenvolvimento' }
              ].map((module) => (
                <Card key={module.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <BookOpen className="w-8 h-8 text-orange-500" />
                      <div>
                        <h3 className="font-semibold">{module.name}</h3>
                        <p className="text-sm text-gray-600">{module.lessons} aulas</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Estudantes:</span>
                        <span className="font-medium">{module.students.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Status:</span>
                        <Badge variant={module.status === 'Ativo' ? 'default' : 'secondary'}>
                          {module.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="flex-1">Gerenciar</Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lessons" className="space-y-4">
            <div className="space-y-4">
              {[
                { id: 1, module: 'Starter', name: 'Introdução à IA', duration: '45min', completion: 92 },
                { id: 2, module: 'Starter', name: 'ChatGPT Básico', duration: '60min', completion: 87 },
                { id: 3, module: 'Starter', name: 'Criação de Conteúdo', duration: '50min', completion: 94 }
              ].map((lesson) => (
                <Card key={lesson.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <FileText className="w-8 h-8 text-blue-500" />
                        <div>
                          <h3 className="font-semibold">{lesson.name}</h3>
                          <p className="text-sm text-gray-600">
                            {lesson.module} • {lesson.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{lesson.completion}% conclusão</p>
                          <Progress value={lesson.completion} className="w-24 h-2" />
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">1,234</p>
                  <p className="text-sm text-gray-600">PDFs</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <PlayCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">567</p>
                  <p className="text-sm text-gray-600">Vídeos</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Upload className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-sm text-gray-600">Atividades</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Database className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">2.1GB</p>
                  <p className="text-sm text-gray-600">Armazenamento</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Conteúdo Mais Acessado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { content: 'Introdução à IA', views: 2847, type: 'Aula' },
                      { content: 'ChatGPT Guia Completo', views: 2156, type: 'PDF' },
                      { content: 'Workshop Prático', views: 1892, type: 'Vídeo' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.content}</p>
                          <p className="text-sm text-gray-600">{item.type}</p>
                        </div>
                        <span className="font-bold">{item.views.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Taxa de Conclusão por Módulo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { module: 'Starter', completion: 92 },
                      { module: 'Survivor', completion: 78 },
                      { module: 'Explorer', completion: 65 }
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.module}</span>
                          <span>{item.completion}%</span>
                        </div>
                        <Progress value={item.completion} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )

  // Forum Modal Component
  const ForumModal = () => (
    <Dialog open={showForumModal} onOpenChange={setShowForumModal}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            Moderação do Fórum
          </DialogTitle>
          <DialogDescription>
            Gerencie discussões, posts e moderação do fórum
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="posts">Posts Recentes</TabsTrigger>
            <TabsTrigger value="reports">Denúncias</TabsTrigger>
            <TabsTrigger value="moderation">Ações de Moderação</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            <div className="flex justify-between items-center">
              <Input placeholder="Buscar posts..." className="w-80" />
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
            
            <div className="space-y-4">
              {[
                { 
                  id: 1, 
                  title: 'Como usar ChatGPT para criar atividades?', 
                  author: 'Prof. Maria Silva', 
                  replies: 12, 
                  time: '2 horas atrás',
                  category: 'Dúvidas'
                },
                { 
                  id: 2, 
                  title: 'Compartilhando templates de aula com IA', 
                  author: 'Prof. João Santos', 
                  replies: 8, 
                  time: '4 horas atrás',
                  category: 'Compartilhamento'
                },
                { 
                  id: 3, 
                  title: 'Problemas com a ferramenta de imagem', 
                  author: 'Prof. Ana Costa', 
                  replies: 15, 
                  time: '6 horas atrás',
                  category: 'Suporte'
                }
              ].map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{post.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Por {post.author}</span>
                          <span>•</span>
                          <span>{post.replies} respostas</span>
                          <span>•</span>
                          <span>{post.time}</span>
                          <Badge variant="outline">{post.category}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="space-y-4">
              {[
                { id: 1, type: 'Spam', post: 'Oferecendo curso particular...', reporter: 'User123', status: 'Pendente' },
                { id: 2, type: 'Conteúdo Inapropriado', post: 'Este professor não sabe nada...', reporter: 'User456', status: 'Analisando' }
              ].map((report) => (
                <Card key={report.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="destructive">{report.type}</Badge>
                          <Badge variant="outline">{report.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-800 mb-2">"{report.post}"</p>
                        <p className="text-xs text-gray-600">Denunciado por {report.reporter}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Aprovar</Button>
                        <Button size="sm" variant="destructive">Remover</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="moderation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Moderação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Moderação Automática</p>
                    <p className="text-sm text-gray-600">Filtra automaticamente spam e conteúdo inadequado</p>
                  </div>
                  <Badge variant="default">Ativo</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Aprovação Manual</p>
                    <p className="text-sm text-gray-600">Posts de novos usuários passam por aprovação</p>
                  </div>
                  <Badge variant="secondary">Inativo</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Filtro de Palavras</p>
                    <p className="text-sm text-gray-600">Bloqueia automaticamente palavras impróprias</p>
                  </div>
                  <Badge variant="default">Ativo</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <MessageSquare className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">1,234</p>
                  <p className="text-sm text-gray-600">Posts Totais</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">456</p>
                  <p className="text-sm text-gray-600">Usuários Ativos</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-sm text-gray-600">Denúncias</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">89%</p>
                  <p className="text-sm text-gray-600">Taxa Engajamento</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )

  // Settings Modal Component
  const SettingsModal = () => (
    <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-6 h-6" />
            Configurações do Sistema
          </DialogTitle>
          <DialogDescription>
            Configure aspectos gerais da plataforma e segurança
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="integration">Integrações</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nome da Plataforma</label>
                  <Input defaultValue="TEACH" />
                </div>
                <div>
                  <label className="text-sm font-medium">URL Base</label>
                  <Input defaultValue="https://teach-platform.vercel.app" />
                </div>
                <div>
                  <label className="text-sm font-medium">Email de Suporte</label>
                  <Input defaultValue="suporte@teach.com.br" />
                </div>
                <div>
                  <label className="text-sm font-medium">Timezone</label>
                  <Input defaultValue="America/Sao_Paulo" />
                </div>
                <Button>Salvar Configurações</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Segurança</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Autenticação de Dois Fatores</p>
                    <p className="text-sm text-gray-600">Obrigatório para administradores</p>
                  </div>
                  <Badge variant="default">Ativo</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Backup Automático</p>
                    <p className="text-sm text-gray-600">Backup diário dos dados</p>
                  </div>
                  <Badge variant="default">Ativo</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Log de Auditoria</p>
                    <p className="text-sm text-gray-600">Registra todas as ações administrativas</p>
                  </div>
                  <Badge variant="default">Ativo</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  <Database className="w-4 h-4 mr-2" />
                  Executar Backup Manual
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Notificações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { name: 'Novos Usuários', description: 'Notificar quando novos usuários se cadastrarem', enabled: true },
                    { name: 'Certificados Pendentes', description: 'Alertar sobre certificados aguardando aprovação', enabled: true },
                    { name: 'Problemas de Sistema', description: 'Notificações de erros e problemas técnicos', enabled: true },
                    { name: 'Relatórios Mensais', description: 'Enviar relatórios automáticos mensalmente', enabled: false }
                  ].map((notification, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{notification.name}</p>
                        <p className="text-sm text-gray-600">{notification.description}</p>
                      </div>
                      <Badge variant={notification.enabled ? 'default' : 'secondary'}>
                        {notification.enabled ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integration" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Integrações Externas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { name: 'OpenAI API', status: 'Conectado', type: 'IA' },
                    { name: 'Google Workspace', status: 'Desconectado', type: 'Produtividade' },
                    { name: 'Microsoft Teams', status: 'Conectado', type: 'Comunicação' },
                    { name: 'Zoom', status: 'Conectado', type: 'Videoconferência' }
                  ].map((integration, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <ExternalLink className="w-6 h-6 text-gray-500" />
                        <div>
                          <p className="font-medium">{integration.name}</p>
                          <p className="text-sm text-gray-600">{integration.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={integration.status === 'Conectado' ? 'default' : 'secondary'}>
                          {integration.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          {integration.status === 'Conectado' ? 'Configurar' : 'Conectar'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie todos os aspectos da plataforma TEACH</p>
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

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowUsersModal(true)}>
          <CardContent className="p-6 text-center">
            <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Gerenciamento de Usuários</h3>
            <p className="text-sm text-gray-600">Gerencie professores, administradores e outros usuários</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowMaestroModal(true)}>
          <CardContent className="p-6 text-center">
            <Brain className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">AI MAESTROs</h3>
            <p className="text-sm text-gray-600">Gerencie especialistas e aulas ao vivo</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowReportsModal(true)}>
          <CardContent className="p-6 text-center">
            <BarChart3 className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Central de Relatórios</h3>
            <p className="text-sm text-gray-600">Visualize e exporte relatórios detalhados</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowCertificatesModal(true)}>
          <CardContent className="p-6 text-center">
            <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Emissão de Certificados</h3>
            <p className="text-sm text-gray-600">Emita certificados para usuários qualificados</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowSchoolsModal(true)}>
          <CardContent className="p-6 text-center">
            <School className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Gestão de Escolas</h3>
            <p className="text-sm text-gray-600">Cadastre e gerencie instituições</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowContentModal(true)}>
          <CardContent className="p-6 text-center">
            <BookOpen className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Gestão de Conteúdo</h3>
            <p className="text-sm text-gray-600">Gerencie módulos, aulas e recursos</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowForumModal(true)}>
          <CardContent className="p-6 text-center">
            <MessageSquare className="w-12 h-12 text-teal-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Moderação do Fórum</h3>
            <p className="text-sm text-gray-600">Modere discussões e conteúdo</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowSettingsModal(true)}>
          <CardContent className="p-6 text-center">
            <Settings className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Configurações</h3>
            <p className="text-sm text-gray-600">Ajustes gerais da plataforma</p>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <MaestroModal />
      <ReportsModal />
      <UsersModal />
      <CertificatesModal />
      <SchoolsModal />
      <ContentModal />
      <ForumModal />
      <SettingsModal />
    </div>
  )
}