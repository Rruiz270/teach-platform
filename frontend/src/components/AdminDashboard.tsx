'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  GraduationCap, 
  Zap, 
  TrendingUp,
  Calendar,
  Download,
  School,
  Building,
  Target,
  Clock,
  BookOpen,
  Brain,
  BarChart3,
  FileText,
  AlertCircle,
  CheckCircle2
} from 'lucide-react'

interface OrganizationMetrics {
  totalUsers: number
  activeUsers: number
  courseCompletions: number
  toolOnlyUsers: number
  monthlyAIUsage: {
    textTokens: number
    imagesGenerated: number
    lessonsCreated: number
  }
  timeMetrics: {
    avgTimeSaved: number // hours per week
    engagementRate: number // percentage
  }
  roi: {
    costSaving: number // R$ per month
    productivityGain: number // percentage
  }
}

interface AdminDashboardProps {
  organizationType: 'school' | 'government' | 'university'
  organizationName: string
  userRole: 'SUPER_ADMIN' | 'ADMIN' | 'COORDINATOR'
}

export default function AdminDashboard({ organizationType, organizationName, userRole }: AdminDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  
  // Mock data - would come from API
  const metrics: OrganizationMetrics = {
    totalUsers: 150,
    activeUsers: 127,
    courseCompletions: 89,
    toolOnlyUsers: 38,
    monthlyAIUsage: {
      textTokens: 2500000,
      imagesGenerated: 450,
      lessonsCreated: 320
    },
    timeMetrics: {
      avgTimeSaved: 8.5,
      engagementRate: 84.7
    },
    roi: {
      costSaving: 25600,
      productivityGain: 34
    }
  }

  const completionRate = Math.round((metrics.courseCompletions / metrics.totalUsers) * 100)
  const toolOnlyRate = Math.round((metrics.toolOnlyUsers / metrics.totalUsers) * 100)

  const getOrganizationIcon = () => {
    switch (organizationType) {
      case 'school': return <School className="w-8 h-8 text-blue-600" />
      case 'government': return <Building className="w-8 h-8 text-green-600" />
      case 'university': return <GraduationCap className="w-8 h-8 text-purple-600" />
    }
  }

  const exportReport = () => {
    // Generate and download report
    alert('Relatório sendo gerado... Download iniciará em breve!')
  }

  return (
    <div className="space-y-6">
      {/* Debug Header */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
        <p className="text-sm text-green-800">
          <strong>AdminDashboard Component Active</strong> | Role: {userRole} | Org: {organizationName}
        </p>
      </div>
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {getOrganizationIcon()}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{organizationName}</h1>
            <p className="text-gray-600">
              Dashboard Administrativo • {userRole === 'SUPER_ADMIN' ? 'Super Admin' : userRole === 'ADMIN' ? 'Administrador' : 'Coordenador'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={exportReport}>
            <Download className="w-4 h-4 mr-2" />
            Exportar Relatório
          </Button>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {selectedPeriod === '30d' ? 'Últimos 30 dias' : 'Últimos 7 dias'}
          </Badge>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.totalUsers}</p>
                <p className="text-xs text-gray-500">Professores cadastrados</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.activeUsers}</p>
                <p className="text-xs text-green-600">+12% vs mês anterior</p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Curso Concluído</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.courseCompletions}</p>
                <p className="text-xs text-blue-600">{completionRate}% dos usuários</p>
              </div>
              <GraduationCap className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Só Ferramentas</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.toolOnlyUsers}</p>
                <p className="text-xs text-purple-600">{toolOnlyRate}% dos usuários</p>
              </div>
              <Zap className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Engajamento dos Usuários
            </CardTitle>
            <CardDescription>Como os professores estão usando a plataforma</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Completaram o Curso</span>
                <span className="font-medium">{metrics.courseCompletions} usuários ({completionRate}%)</span>
              </div>
              <Progress value={completionRate} className="h-3" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Apenas Ferramentas de Produção</span>
                <span className="font-medium">{metrics.toolOnlyUsers} usuários ({toolOnlyRate}%)</span>
              </div>
              <Progress value={toolOnlyRate} className="h-3 bg-purple-100" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Engajamento Geral</span>
                <span className="font-medium">{metrics.timeMetrics.engagementRate}%</span>
              </div>
              <Progress value={metrics.timeMetrics.engagementRate} className="h-3 bg-green-100" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Uso de IA (Últimos 30 dias)
            </CardTitle>
            <CardDescription>Produtividade com ferramentas de IA</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Aulas Criadas</p>
                    <p className="text-sm text-gray-600">Com IA</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-blue-600">{metrics.monthlyAIUsage.lessonsCreated}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Imagens Geradas</p>
                    <p className="text-sm text-gray-600">DALL-E e outros</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-purple-600">{metrics.monthlyAIUsage.imagesGenerated}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Tempo Economizado</p>
                    <p className="text-sm text-gray-600">Por professor/semana</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-green-600">{metrics.timeMetrics.avgTimeSaved}h</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ROI and Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Retorno sobre Investimento (ROI)
          </CardTitle>
          <CardDescription>
            Impacto financeiro e produtivo da implementação da plataforma TEACH
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                R$ {metrics.roi.costSaving.toLocaleString()}
              </div>
              <p className="text-green-800 font-medium">Economia Mensal</p>
              <p className="text-sm text-green-600 mt-1">
                Redução de custos com ferramentas externas
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                +{metrics.roi.productivityGain}%
              </div>
              <p className="text-blue-800 font-medium">Ganho de Produtividade</p>
              <p className="text-sm text-blue-600 mt-1">
                Aumento na eficiência dos professores
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {Math.round(metrics.timeMetrics.avgTimeSaved * metrics.activeUsers)}h
              </div>
              <p className="text-purple-800 font-medium">Horas Economizadas</p>
              <p className="text-sm text-purple-600 mt-1">
                Por semana em toda organização
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="courses">Cursos</TabsTrigger>
          <TabsTrigger value="tools">Ferramentas IA</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detalhamento de Usuários</CardTitle>
              <CardDescription>Status detalhado de cada professor na plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Maria Santos', status: 'course-completed', lastActive: '2 horas atrás', aiUsage: 'Alto' },
                  { name: 'João Silva', status: 'in-progress', lastActive: '1 dia atrás', aiUsage: 'Médio' },
                  { name: 'Ana Costa', status: 'tools-only', lastActive: '3 horas atrás', aiUsage: 'Alto' },
                  { name: 'Pedro Lima', status: 'course-completed', lastActive: '5 dias atrás', aiUsage: 'Baixo' }
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">Último acesso: {user.lastActive}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        user.status === 'course-completed' ? 'default' :
                        user.status === 'in-progress' ? 'secondary' : 'outline'
                      }>
                        {user.status === 'course-completed' ? 'Curso Completo' :
                         user.status === 'in-progress' ? 'Em Progresso' : 'Só Ferramentas'}
                      </Badge>
                      <Badge variant="outline" className={
                        user.aiUsage === 'Alto' ? 'border-green-300 text-green-700' :
                        user.aiUsage === 'Médio' ? 'border-yellow-300 text-yellow-700' :
                        'border-gray-300 text-gray-700'
                      }>
                        Uso IA: {user.aiUsage}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ferramentas Mais Usadas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { tool: 'Criador de Aulas', usage: 85, count: 320 },
                  { tool: 'Gerador de Imagens', usage: 65, count: 450 },
                  { tool: 'Criador de Avaliações', usage: 45, count: 180 },
                  { tool: 'Assistente IA', usage: 72, count: 890 }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.tool}</span>
                      <span>{item.count} usos</span>
                    </div>
                    <Progress value={item.usage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alertas e Recomendações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">23 professores inativos</p>
                    <p className="text-sm text-yellow-700">Sem uso há mais de 2 semanas</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800">Meta de engajamento atingida</p>
                    <p className="text-sm text-green-700">84% dos usuários ativos mensalmente</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Executivos</CardTitle>
              <CardDescription>
                Relatórios prontos para apresentação a gestores e tomadores de decisão
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: 'Relatório Mensal de Engajamento', description: 'Métricas de uso e produtividade', date: 'Dezembro 2024' },
                { title: 'ROI e Impacto Financeiro', description: 'Análise de retorno sobre investimento', date: 'Dezembro 2024' },
                { title: 'Comparativo de Produtividade', description: 'Antes vs depois da implementação', date: 'Trimestre Q4 2024' }
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div>
                    <h4 className="font-medium">{report.title}</h4>
                    <p className="text-sm text-gray-600">{report.description}</p>
                    <p className="text-xs text-gray-500">{report.date}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Baixar PDF
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}