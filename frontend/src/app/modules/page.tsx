'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Play, CheckCircle, Lock, Clock, BookOpen } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function ModulesPage() {
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

  const modules = [
    {
      id: 1,
      title: 'Starter - Fundamentos de IA',
      description: 'Aprenda os conceitos básicos de Inteligência Artificial para educação',
      progress: 100,
      status: 'completed',
      lessons: 12,
      duration: '6 horas',
      color: 'green'
    },
    {
      id: 2,
      title: 'Survivor - IA na Prática',
      description: 'Aplicações práticas de IA em sala de aula e no dia a dia',
      progress: 75,
      status: 'in-progress',
      lessons: 15,
      duration: '8 horas',
      color: 'blue'
    },
    {
      id: 3,
      title: 'Explorer - IA Avançada',
      description: 'Técnicas avançadas e personalização com IA',
      progress: 30,
      status: 'in-progress',
      lessons: 18,
      duration: '10 horas',
      color: 'purple'
    },
    {
      id: 4,
      title: 'Expert - Liderança em IA',
      description: 'Torne-se um líder em educação com IA',
      progress: 0,
      status: 'locked',
      lessons: 20,
      duration: '12 horas',
      color: 'gray'
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Módulos de Aprendizado</h2>
          <p className="text-lg text-gray-600">
            Explore nossa jornada estruturada de aprendizado em IA para educação
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module) => (
            <Card key={module.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{module.title}</CardTitle>
                    <CardDescription className="text-base">
                      {module.description}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant={
                      module.status === 'completed' ? 'default' :
                      module.status === 'in-progress' ? 'secondary' : 'outline'
                    }
                    className="ml-4"
                  >
                    {module.status === 'completed' ? (
                      <><CheckCircle className="w-3 h-3 mr-1" /> Completo</>
                    ) : module.status === 'in-progress' ? (
                      <><Play className="w-3 h-3 mr-1" /> Em andamento</>
                    ) : (
                      <><Lock className="w-3 h-3 mr-1" /> Bloqueado</>
                    )}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {module.lessons} aulas
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {module.duration}
                  </div>
                </div>
                
                {module.status !== 'locked' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span>{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                  </div>
                )}
                
                <div className="pt-2">
                  {module.status === 'locked' ? (
                    <Button disabled className="w-full">
                      <Lock className="mr-2 h-4 w-4" />
                      Bloqueado
                    </Button>
                  ) : (
                    <Link href={`/modules/${module.id}`}>
                      <Button 
                        className="w-full" 
                        variant={module.status === 'completed' ? 'outline' : 'default'}
                      >
                        {module.status === 'completed' ? (
                          <><CheckCircle className="mr-2 h-4 w-4" /> Revisar Módulo</>
                        ) : (
                          <><Play className="mr-2 h-4 w-4" /> Continuar Aprendendo</>
                        )}
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}