'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft, Calendar, Users, Video, Clock, Star, Award, BookOpen, Brain } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function MaestroPage() {
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

  const maestroProfile = {
    name: "AI MAESTRO",
    title: "Especialista em IA Educacional",
    avatar: "/api/placeholder/150/150", // Placeholder for AI avatar
    bio: "Especialista mundial em Inteligência Artificial aplicada à educação. Mestrado em Machine Learning pela Stanford University e PhD em Educação Digital pela MIT. Mais de 15 anos transformando o ensino através da tecnologia.",
    credentials: [
      "PhD em Educação Digital - MIT",
      "Mestrado em Machine Learning - Stanford", 
      "Certificação Google AI for Education",
      "Microsoft AI for Good Ambassador",
      "Consultor UNESCO para IA na Educação"
    ],
    specializations: [
      "Prompting Avançado para Educação",
      "Automação de Processos Pedagógicos", 
      "Personalização de Aprendizagem com IA",
      "Análise Preditiva de Desempenho",
      "Criação de Conteúdo Adaptativos"
    ],
    stats: {
      studentsImpacted: "50.000+",
      sessionsDelivered: "2.500+",
      satisfactionRate: "98.7%",
      yearsExperience: "15+"
    }
  }

  const upcomingSessions = [
    {
      id: 1,
      title: "Starter - Introdução à IA na Educação",
      date: "2024-12-15",
      time: "19:00",
      duration: "90 min",
      level: "Iniciante",
      participants: 147,
      maxParticipants: 200,
      description: "Fundamentos essenciais de IA para professores iniciantes"
    },
    {
      id: 2, 
      title: "Survivor - Criação de Conteúdo com IA",
      date: "2024-12-18",
      time: "19:30", 
      duration: "120 min",
      level: "Intermediário",
      participants: 89,
      maxParticipants: 150,
      description: "Técnicas avançadas para criação automática de materiais didáticos"
    },
    {
      id: 3,
      title: "Explorer - Automação Pedagógica Avançada", 
      date: "2024-12-22",
      time: "20:00",
      duration: "150 min", 
      level: "Avançado",
      participants: 34,
      maxParticipants: 100,
      description: "Implementação de sistemas automatizados de ensino e avaliação"
    },
    {
      id: 4,
      title: "Expert - Liderança em Transformação Digital",
      date: "2024-12-28",
      time: "19:00",
      duration: "180 min",
      level: "Expert", 
      participants: 12,
      maxParticipants: 50,
      description: "Estratégias de liderança para implementação institucional de IA"
    }
  ]

  const pastSessions = [
    {
      title: "Workshop: Prompts Eficazes para Planos de Aula",
      date: "2024-12-10",
      participants: 234,
      rating: 4.9,
      recording: true
    },
    {
      title: "Masterclass: Avaliação Automatizada Inteligente", 
      date: "2024-12-05",
      participants: 198,
      rating: 4.8,
      recording: true
    },
    {
      title: "Seminário: Futuro da Educação com IA",
      date: "2024-11-28", 
      participants: 456,
      rating: 4.9,
      recording: true
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <Link href="/" className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold teach-gradient bg-clip-text text-transparent">
                  TEACH
                </h1>
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
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-blue-500">
                <AvatarImage src={maestroProfile.avatar} alt={maestroProfile.name} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  <Brain className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>
              <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-yellow-900">
                <Star className="w-3 h-3 mr-1" />
                AI MAESTRO
              </Badge>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{maestroProfile.name}</h1>
          <p className="text-xl text-gray-600 mb-4">{maestroProfile.title}</p>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {maestroProfile.bio}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{maestroProfile.stats.studentsImpacted}</p>
              <p className="text-sm text-gray-600">Professores Impactados</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Video className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{maestroProfile.stats.sessionsDelivered}</p>
              <p className="text-sm text-gray-600">Aulas Ministradas</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{maestroProfile.stats.satisfactionRate}</p>
              <p className="text-sm text-gray-600">Satisfação dos Alunos</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{maestroProfile.stats.yearsExperience}</p>
              <p className="text-sm text-gray-600">Anos de Experiência</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Sessions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Próximas Aulas Síncronas
                </CardTitle>
                <CardDescription>
                  Participe das aulas ao vivo com o AI MAESTRO
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{session.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{session.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(session.date).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {session.time} ({session.duration})
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {session.participants}/{session.maxParticipants}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          session.level === 'Iniciante' ? 'default' :
                          session.level === 'Intermediário' ? 'secondary' :
                          session.level === 'Avançado' ? 'destructive' : 'outline'
                        }>
                          {session.level}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        Inscrever-se
                      </Button>
                      <Button size="sm" variant="outline">
                        Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Credentials */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Credenciais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {maestroProfile.credentials.map((credential, index) => (
                  <div key={index} className="flex items-start">
                    <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{credential}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Specializations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5" />
                  Especializações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {maestroProfile.specializations.map((spec, index) => (
                  <Badge key={index} variant="outline" className="text-xs w-full justify-start">
                    {spec}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            {/* Past Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Aulas Anteriores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pastSessions.map((session, index) => (
                  <div key={index} className="text-sm">
                    <h4 className="font-medium text-gray-900 mb-1">{session.title}</h4>
                    <div className="flex justify-between text-gray-600 mb-1">
                      <span>{new Date(session.date).toLocaleDateString('pt-BR')}</span>
                      <span className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-500 mr-1" />
                        {session.rating}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">{session.participants} participantes</span>
                      {session.recording && (
                        <Button size="sm" variant="ghost" className="text-xs">
                          Ver Gravação
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}