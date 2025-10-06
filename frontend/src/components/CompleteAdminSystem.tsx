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
  ExternalLink
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

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <School className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Gestão de Escolas</h3>
            <p className="text-sm text-gray-600">Cadastre e gerencie instituições</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <BookOpen className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Gestão de Conteúdo</h3>
            <p className="text-sm text-gray-600">Gerencie módulos, aulas e recursos</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <MessageSquare className="w-12 h-12 text-teal-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Moderação do Fórum</h3>
            <p className="text-sm text-gray-600">Modere discussões e conteúdo</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
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
    </div>
  )
}