'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Download, Share2, Award, Calendar, CheckCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function CertificatesPage() {
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

  const certificates = [
    {
      id: 1,
      title: 'Fundamentos de IA na Educação',
      module: 'Starter - Fundamentos de IA',
      completedDate: '2024-09-15',
      certificateId: 'TEACH-2024-001',
      status: 'completed',
      hours: 6
    },
    {
      id: 2,
      title: 'IA Aplicada em Sala de Aula',
      module: 'Survivor - IA na Prática',
      completedDate: null,
      certificateId: null,
      status: 'in-progress',
      hours: 8,
      progress: 75
    },
    {
      id: 3,
      title: 'Técnicas Avançadas de IA',
      module: 'Explorer - IA Avançada',
      completedDate: null,
      certificateId: null,
      status: 'available',
      hours: 10,
      progress: 30
    },
    {
      id: 4,
      title: 'Liderança em Educação com IA',
      module: 'Expert - Liderança em IA',
      completedDate: null,
      certificateId: null,
      status: 'locked',
      hours: 12,
      progress: 0
    }
  ]

  const badges = [
    {
      id: 1,
      name: 'Primeiro Login',
      description: 'Fez seu primeiro acesso à plataforma',
      icon: '🎯',
      earnedDate: '2024-09-01'
    },
    {
      id: 2,
      name: 'Módulo Completo',
      description: 'Completou seu primeiro módulo',
      icon: '🏆',
      earnedDate: '2024-09-15'
    },
    {
      id: 3,
      name: 'Semana Consecutiva',
      description: 'Estudou por 7 dias consecutivos',
      icon: '🔥',
      earnedDate: '2024-09-10'
    },
    {
      id: 4,
      name: 'Colaborador Ativo',
      description: 'Participou ativamente no fórum',
      icon: '💬',
      earnedDate: '2024-09-12'
    },
    {
      id: 5,
      name: 'Mentor',
      description: 'Ajudou outros professores',
      icon: '🤝',
      earnedDate: '2024-09-18'
    },
    {
      id: 6,
      name: 'Explorador',
      description: 'Explorou todas as funcionalidades',
      icon: '🧭',
      earnedDate: '2024-09-20'
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Certificados e Badges</h2>
          <p className="text-lg text-gray-600">
            Acompanhe suas conquistas e baixe seus certificados
          </p>
        </div>

        {/* Certificates Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Certificados de Conclusão</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <Card key={cert.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                  <div className="flex items-center justify-between">
                    <Award className="h-8 w-8" />
                    <Badge 
                      variant="secondary" 
                      className={`${
                        cert.status === 'completed' ? 'bg-green-100 text-green-800' :
                        cert.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        cert.status === 'available' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {cert.status === 'completed' ? 'Completo' :
                       cert.status === 'in-progress' ? `${cert.progress}%` :
                       cert.status === 'available' ? 'Disponível' : 'Bloqueado'}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{cert.title}</CardTitle>
                  <CardDescription className="text-blue-100">
                    {cert.module} • {cert.hours} horas
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-6">
                  {cert.status === 'completed' ? (
                    <div className="space-y-4">
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span className="font-medium">Certificado conquistado!</span>
                      </div>
                      
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Concluído em: {new Date(cert.completedDate!).toLocaleDateString('pt-BR')}
                        </div>
                        <div>ID do Certificado: {cert.certificateId}</div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Baixar PDF
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Share2 className="w-4 h-4 mr-2" />
                          Compartilhar
                        </Button>
                      </div>
                    </div>
                  ) : cert.status === 'in-progress' ? (
                    <div className="space-y-4">
                      <div className="text-blue-600">
                        <span className="font-medium">Em andamento - {cert.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${cert.progress}%` }}
                        ></div>
                      </div>
                      <Link href="/modules">
                        <Button size="sm" className="w-full">
                          Continuar Módulo
                        </Button>
                      </Link>
                    </div>
                  ) : cert.status === 'available' ? (
                    <div className="space-y-4">
                      <div className="text-yellow-600">
                        <span className="font-medium">Módulo disponível</span>
                      </div>
                      <Link href="/modules">
                        <Button size="sm" className="w-full">
                          Iniciar Módulo
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-gray-500">
                        <span className="font-medium">Complete os módulos anteriores</span>
                      </div>
                      <Button size="sm" disabled className="w-full">
                        Bloqueado
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Badges Section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Badges Conquistadas</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map((badge) => (
              <Card key={badge.id} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
                  <p className="text-xs text-gray-600 mb-2">{badge.description}</p>
                  <div className="text-xs text-gray-500">
                    {new Date(badge.earnedDate).toLocaleDateString('pt-BR')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}