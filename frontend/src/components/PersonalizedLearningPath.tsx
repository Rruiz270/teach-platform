'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brain, 
  Target, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Star,
  TrendingUp,
  BookOpen,
  Award,
  Zap,
  Users,
  BarChart3,
  RefreshCw,
  ArrowRight,
  Play,
  Lock,
  Lightbulb
} from 'lucide-react'

interface SkillLevel {
  skill: string
  level: number // 0-100
  category: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  lastAssessed: Date
  confidence: number
}

interface LearningObjective {
  id: string
  title: string
  description: string
  estimatedTime: string
  difficulty: 'easy' | 'medium' | 'hard'
  prerequisites: string[]
  status: 'not_started' | 'in_progress' | 'completed' | 'skipped'
  progress: number
  skills: string[]
}

interface AdaptivePath {
  id: string
  name: string
  description: string
  totalLessons: number
  estimatedDuration: string
  difficulty: string
  objectives: LearningObjective[]
  personalizationReasons: string[]
}

interface User {
  id: string
  name: string
  currentLevel: string
  skillLevels: SkillLevel[]
  learningSpeed: 'slow' | 'normal' | 'fast'
  preferredLearningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed'
  availableTime: string // per week
  goals: string[]
}

interface PersonalizedLearningPathProps {
  user: User
  onStartAssessment?: () => void
}

export default function PersonalizedLearningPath({ user, onStartAssessment }: PersonalizedLearningPathProps) {
  const [adaptivePath, setAdaptivePath] = useState<AdaptivePath | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [recommendations, setRecommendations] = useState<string[]>([])

  useEffect(() => {
    generatePersonalizedPath()
  }, [user])

  const generatePersonalizedPath = async () => {
    setIsGenerating(true)
    
    // Simulate AI-powered path generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Analyze user's skill levels to determine path
    const avgSkillLevel = user.skillLevels.reduce((sum, skill) => sum + skill.level, 0) / user.skillLevels.length
    
    let pathDifficulty = 'Iniciante'
    let moduleSuggestion = 'Starter'
    
    if (avgSkillLevel >= 75) {
      pathDifficulty = 'Avançado'
      moduleSuggestion = 'Expert'
    } else if (avgSkillLevel >= 50) {
      pathDifficulty = 'Intermediário'
      moduleSuggestion = 'Explorer'
    } else if (avgSkillLevel >= 25) {
      pathDifficulty = 'Básico'
      moduleSuggestion = 'Survivor'
    }

    const personalizedObjectives: LearningObjective[] = [
      {
        id: '1',
        title: 'Introdução à IA na Educação',
        description: 'Compreenda os fundamentos da Inteligência Artificial aplicada ao ensino',
        estimatedTime: '45 min',
        difficulty: 'easy',
        prerequisites: [],
        status: 'not_started',
        progress: 0,
        skills: ['IA Básica', 'Conceitos Educacionais']
      },
      {
        id: '2',
        title: 'Primeiros Passos com ChatGPT',
        description: 'Aprenda a criar prompts eficazes para gerar conteúdo educacional',
        estimatedTime: '60 min',
        difficulty: avgSkillLevel < 30 ? 'easy' : 'medium',
        prerequisites: ['1'],
        status: 'not_started',
        progress: 0,
        skills: ['Prompts', 'ChatGPT', 'Criação de Conteúdo']
      },
      {
        id: '3',
        title: 'Personalizando Aprendizagem com IA',
        description: 'Descubra como adaptar conteúdo para diferentes perfis de alunos',
        estimatedTime: '90 min',
        difficulty: 'medium',
        prerequisites: ['1', '2'],
        status: 'not_started',
        progress: 0,
        skills: ['Personalização', 'Adaptação Curricular']
      },
      {
        id: '4',
        title: 'Avaliação Automatizada',
        description: 'Implemente sistemas de avaliação assistidos por IA',
        estimatedTime: '75 min',
        difficulty: avgSkillLevel > 50 ? 'medium' : 'hard',
        prerequisites: ['2', '3'],
        status: 'not_started',
        progress: 0,
        skills: ['Avaliação', 'Automação', 'Feedback']
      },
      {
        id: '5',
        title: 'Ética em IA Educacional',
        description: 'Entenda os aspectos éticos e responsáveis do uso de IA',
        estimatedTime: '60 min',
        difficulty: 'medium',
        prerequisites: ['1'],
        status: 'not_started',
        progress: 0,
        skills: ['Ética', 'Responsabilidade Digital']
      }
    ]

    // Adjust path based on learning speed
    if (user.learningSpeed === 'fast') {
      personalizedObjectives.forEach(obj => {
        obj.estimatedTime = `${Math.round(parseInt(obj.estimatedTime) * 0.8)} min`
      })
    } else if (user.learningSpeed === 'slow') {
      personalizedObjectives.forEach(obj => {
        obj.estimatedTime = `${Math.round(parseInt(obj.estimatedTime) * 1.3)} min`
      })
    }

    const path: AdaptivePath = {
      id: 'personalized-path-1',
      name: `Trilha Personalizada - Nível ${pathDifficulty}`,
      description: `Caminho de aprendizagem adaptado ao seu perfil e objetivos em ${moduleSuggestion}`,
      totalLessons: personalizedObjectives.length,
      estimatedDuration: calculateTotalDuration(personalizedObjectives),
      difficulty: pathDifficulty,
      objectives: personalizedObjectives,
      personalizationReasons: generatePersonalizationReasons(user, avgSkillLevel)
    }

    setAdaptivePath(path)
    generateRecommendations(user, avgSkillLevel)
    setIsGenerating(false)
  }

  const calculateTotalDuration = (objectives: LearningObjective[]): string => {
    const totalMinutes = objectives.reduce((sum, obj) => sum + parseInt(obj.estimatedTime), 0)
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${hours}h ${minutes}min`
  }

  const generatePersonalizationReasons = (user: User, avgLevel: number): string[] => {
    const reasons = []
    
    if (user.learningSpeed === 'fast') {
      reasons.push('⚡ Ritmo acelerado detectado - conteúdo condensado')
    } else if (user.learningSpeed === 'slow') {
      reasons.push('🐢 Ritmo pausado detectado - mais tempo para assimilação')
    }

    if (avgLevel < 25) {
      reasons.push('🌱 Iniciante em IA - foco em conceitos fundamentais')
    } else if (avgLevel > 75) {
      reasons.push('🎯 Nível avançado - desafios práticos e casos complexos')
    }

    if (user.preferredLearningStyle === 'visual') {
      reasons.push('👁️ Estilo visual - mais infográficos e diagramas')
    } else if (user.preferredLearningStyle === 'kinesthetic') {
      reasons.push('✋ Estilo cinestésico - atividades hands-on priorizadas')
    }

    if (user.goals.includes('ChatGPT')) {
      reasons.push('💬 Foco em ChatGPT conforme seus objetivos')
    }

    return reasons
  }

  const generateRecommendations = (user: User, avgLevel: number) => {
    const recs = []
    
    if (avgLevel < 40) {
      recs.push('💡 Dedique 15 min diários para prática de prompts')
      recs.push('📚 Comece com exemplos simples antes de casos complexos')
    }
    
    if (user.availableTime === 'low') {
      recs.push('⏰ Estude em micro-sessões de 15-20 minutos')
      recs.push('📱 Use momentos livres para revisar conceitos')
    }
    
    recs.push('🎯 Aplique imediatamente o que aprender em suas aulas')
    recs.push('👥 Participe do fórum para compartilhar experiências')
    
    setRecommendations(recs)
  }

  const startObjective = (objectiveId: string) => {
    if (!adaptivePath) return
    
    setAdaptivePath(prev => ({
      ...prev!,
      objectives: prev!.objectives.map(obj =>
        obj.id === objectiveId ? { ...obj, status: 'in_progress', progress: 10 } : obj
      )
    }))
  }

  const getSkillColor = (level: number) => {
    if (level >= 80) return 'text-green-600 bg-green-100'
    if (level >= 60) return 'text-blue-600 bg-blue-100'
    if (level >= 40) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-600" />
      case 'skipped': return <XCircle className="h-4 w-4 text-gray-400" />
      default: return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const isObjectiveUnlocked = (objective: LearningObjective) => {
    if (!adaptivePath) return false
    if (objective.prerequisites.length === 0) return true
    
    return objective.prerequisites.every(prereqId =>
      adaptivePath.objectives.find(obj => obj.id === prereqId)?.status === 'completed'
    )
  }

  if (isGenerating) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold mb-2">Gerando sua trilha personalizada...</h3>
          <p className="text-gray-600">Analisando seu perfil e criando o caminho ideal para você</p>
          <div className="mt-4 space-y-2 text-sm text-gray-500">
            <p>🧠 Avaliando níveis de conhecimento...</p>
            <p>🎯 Identificando objetivos de aprendizagem...</p>
            <p>⚡ Adaptando ao seu ritmo de estudo...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!adaptivePath) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Trilha não disponível</h3>
          <p className="text-gray-600 mb-4">
            Para criar sua trilha personalizada, precisamos de uma avaliação de skills
          </p>
          <Button onClick={onStartAssessment}>
            <Brain className="h-4 w-4 mr-2" />
            Fazer Avaliação de Skills
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-blue-600" />
                <span>{adaptivePath.name}</span>
              </CardTitle>
              <CardDescription className="mt-2">
                {adaptivePath.description}
              </CardDescription>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="mb-2">
                {adaptivePath.difficulty}
              </Badge>
              <p className="text-sm text-gray-600">
                {adaptivePath.totalLessons} objetivos • {adaptivePath.estimatedDuration}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Personalization Reasons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-purple-600" />
            <span>Por que esta trilha é ideal para você</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {adaptivePath.personalizationReasons.map((reason, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-purple-50 rounded-lg">
                <span className="text-sm">{reason}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="objectives">Objetivos</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="recommendations">Dicas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Progresso Geral</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completados</span>
                    <span>0/{adaptivePath.totalLessons}</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Tempo Estimado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="text-lg font-semibold">{adaptivePath.estimatedDuration}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Baseado no seu ritmo</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Próximo Objetivo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium text-sm">{adaptivePath.objectives[0].title}</p>
                  <Button size="sm" onClick={() => startObjective(adaptivePath.objectives[0].id)}>
                    <Play className="h-4 w-4 mr-1" />
                    Começar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Path Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Trilha de Aprendizagem</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {adaptivePath.objectives.map((objective, index) => (
                  <div key={objective.id} className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      objective.status === 'completed' ? 'bg-green-100 text-green-700' :
                      objective.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                      isObjectiveUnlocked(objective) ? 'bg-gray-100 text-gray-700' :
                      'bg-gray-50 text-gray-400'
                    }`}>
                      {objective.status === 'completed' ? <CheckCircle className="h-4 w-4" /> : index + 1}
                    </div>
                    <span className={`text-sm ${
                      isObjectiveUnlocked(objective) ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {objective.title}
                    </span>
                    {index < adaptivePath.objectives.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-gray-300" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="objectives" className="space-y-4">
          {adaptivePath.objectives.map((objective) => {
            const isUnlocked = isObjectiveUnlocked(objective)
            return (
              <Card key={objective.id} className={`${!isUnlocked ? 'opacity-60' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getStatusIcon(objective.status)}
                        <h3 className="font-semibold">{objective.title}</h3>
                        <Badge variant={
                          objective.difficulty === 'easy' ? 'secondary' :
                          objective.difficulty === 'medium' ? 'default' : 'destructive'
                        }>
                          {objective.difficulty === 'easy' ? 'Fácil' :
                           objective.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                        </Badge>
                        {!isUnlocked && <Lock className="h-4 w-4 text-gray-400" />}
                      </div>
                      
                      <p className="text-gray-600 mb-3">{objective.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{objective.estimatedTime}</span>
                        </span>
                        <span>Skills: {objective.skills.join(', ')}</span>
                      </div>

                      {objective.progress > 0 && (
                        <div className="space-y-1 mb-3">
                          <div className="flex justify-between text-sm">
                            <span>Progresso</span>
                            <span>{objective.progress}%</span>
                          </div>
                          <Progress value={objective.progress} className="h-2" />
                        </div>
                      )}

                      {objective.prerequisites.length > 0 && (
                        <div className="text-sm text-gray-500 mb-3">
                          <span>Pré-requisitos: </span>
                          {objective.prerequisites.map(prereqId => {
                            const prereq = adaptivePath.objectives.find(obj => obj.id === prereqId)
                            return prereq?.title
                          }).join(', ')}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2">
                      {isUnlocked && objective.status === 'not_started' && (
                        <Button onClick={() => startObjective(objective.id)}>
                          <Play className="h-4 w-4 mr-2" />
                          Iniciar
                        </Button>
                      )}
                      {objective.status === 'in_progress' && (
                        <Button variant="outline">
                          <ArrowRight className="h-4 w-4 mr-2" />
                          Continuar
                        </Button>
                      )}
                      {objective.status === 'completed' && (
                        <Button variant="secondary" disabled>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Concluído
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Avaliação de Skills Atual</CardTitle>
              <CardDescription>
                Baseado na sua última avaliação. Recomendamos reavaliação a cada 30 dias.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.skillLevels.map((skill) => (
                  <div key={skill.skill} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.skill}</span>
                      <Badge className={getSkillColor(skill.level)}>
                        {skill.category}
                      </Badge>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{skill.level}% de domínio</span>
                      <span>Confiança: {skill.confidence}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills que Você Vai Desenvolver</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Array.from(new Set(adaptivePath.objectives.flatMap(obj => obj.skills))).map((skill) => (
                  <div key={skill} className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                    <Star className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                <span>Recomendações Personalizadas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <span className="text-sm">{rec}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Seu Perfil de Aprendizagem</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Ritmo de Aprendizagem:</span>
                    <Badge variant="outline">
                      {user.learningSpeed === 'fast' ? '⚡ Rápido' :
                       user.learningSpeed === 'slow' ? '🐢 Pausado' : '🚶 Normal'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Estilo Preferido:</span>
                    <Badge variant="outline">
                      {user.preferredLearningStyle === 'visual' ? '👁️ Visual' :
                       user.preferredLearningStyle === 'auditory' ? '👂 Auditivo' :
                       user.preferredLearningStyle === 'kinesthetic' ? '✋ Cinestésico' : '🎯 Misto'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Tempo Disponível:</span>
                    <Badge variant="outline">{user.availableTime}</Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">Seus Objetivos:</span>
                    <div className="mt-2 space-y-1">
                      {user.goals.map((goal, index) => (
                        <Badge key={index} variant="secondary" className="mr-2">
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full" onClick={() => startObjective(adaptivePath.objectives[0].id)}>
                  <Play className="h-4 w-4 mr-2" />
                  Começar Primeiro Objetivo
                </Button>
                <Button variant="outline" className="w-full" onClick={onStartAssessment}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refazer Avaliação de Skills
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}