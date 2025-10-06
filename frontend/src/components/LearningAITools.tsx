'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Bot, 
  Brain, 
  Image, 
  FileText, 
  Clock, 
  Target, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Lightbulb,
  Star,
  Trophy,
  BookOpen,
  Zap
} from 'lucide-react'

interface LearningExercise {
  id: string
  title: string
  description: string
  type: 'prompt' | 'image-analysis' | 'lesson-critique' | 'ai-comparison'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  maxAttempts: number
  estimatedTime: string
  learningObjectives: string[]
  isUnlocked: boolean
  isCompleted: boolean
  currentAttempts: number
  bestScore?: number
}

interface LearningAIToolsProps {
  moduleId: string
  userLevel: 'Starter' | 'Survivor' | 'Explorer' | 'Expert'
}

export default function LearningAITools({ moduleId, userLevel }: LearningAIToolsProps) {
  const [selectedExercise, setSelectedExercise] = useState<LearningExercise | null>(null)
  const [userInput, setUserInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<any>(null)

  // Mock exercises data - would come from API based on module and user level
  const exercises: LearningExercise[] = [
    {
      id: 'prompt-basics-1',
      title: 'Criando Prompts Eficazes',
      description: 'Aprenda a criar prompts claros e específicos para ChatGPT',
      type: 'prompt',
      difficulty: 'beginner',
      maxAttempts: 3,
      estimatedTime: '10 min',
      learningObjectives: [
        'Estruturar prompts de forma clara',
        'Incluir contexto adequado',
        'Especificar o formato de resposta desejado'
      ],
      isUnlocked: true,
      isCompleted: false,
      currentAttempts: 0
    },
    {
      id: 'image-analysis-1',
      title: 'Análise de Imagens Geradas por IA',
      description: 'Avalie a qualidade e adequação de imagens educacionais criadas por IA',
      type: 'image-analysis',
      difficulty: 'intermediate',
      maxAttempts: 2,
      estimatedTime: '15 min',
      learningObjectives: [
        'Identificar elementos visuais educacionalmente relevantes',
        'Avaliar clareza e precisão de ilustrações',
        'Reconhecer limitações da IA em imagens'
      ],
      isUnlocked: userLevel !== 'Starter',
      isCompleted: false,
      currentAttempts: 1
    },
    {
      id: 'lesson-critique-1',
      title: 'Refinando Aulas Geradas por IA',
      description: 'Melhore e personalize planos de aula criados por IA',
      type: 'lesson-critique',
      difficulty: 'advanced',
      maxAttempts: 2,
      estimatedTime: '20 min',
      learningObjectives: [
        'Identificar pontos fortes e fracos em conteúdo gerado',
        'Adaptar conteúdo para contexto específico',
        'Integrar conhecimento pedagógico próprio'
      ],
      isUnlocked: userLevel === 'Explorer' || userLevel === 'Expert',
      isCompleted: true,
      currentAttempts: 1,
      bestScore: 85
    },
    {
      id: 'ai-comparison-1',
      title: 'Comparando Diferentes IAs',
      description: 'Compare respostas do ChatGPT, Claude e Gemini para a mesma tarefa',
      type: 'ai-comparison',
      difficulty: 'advanced',
      maxAttempts: 1,
      estimatedTime: '25 min',
      learningObjectives: [
        'Reconhecer forças e fraquezas de cada IA',
        'Escolher a IA adequada para cada tarefa',
        'Combinar resultados de múltiplas IAs'
      ],
      isUnlocked: userLevel === 'Expert',
      isCompleted: false,
      currentAttempts: 0
    }
  ]

  const handleExerciseStart = (exercise: LearningExercise) => {
    if (!exercise.isUnlocked || exercise.currentAttempts >= exercise.maxAttempts) {
      return
    }
    setSelectedExercise(exercise)
    setUserInput('')
    setFeedback(null)
  }

  const handleSubmitExercise = async () => {
    if (!selectedExercise || !userInput.trim()) return

    setIsSubmitting(true)
    
    try {
      // Simulate AI evaluation - would be real API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock feedback based on exercise type
      const mockFeedback = {
        score: Math.floor(Math.random() * 40) + 60, // 60-100
        strengths: [
          'Contexto bem definido',
          'Linguagem apropriada para o nível'
        ],
        improvements: [
          'Poderia ser mais específico sobre o formato de resposta',
          'Considere adicionar exemplo do resultado esperado'
        ],
        aiTips: [
          'Use frases como "Explique de forma simples" para públicos iniciantes',
          'Sempre inclua o contexto educacional na sua solicitação'
        ],
        nextSteps: 'Tente refazer o exercício incorporando as sugestões de melhoria.'
      }
      
      setFeedback(mockFeedback)
    } catch (error) {
      console.error('Erro ao avaliar exercício:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (exercise: LearningExercise) => {
    if (!exercise.isUnlocked) return <XCircle className="w-5 h-5 text-gray-400" />
    if (exercise.isCompleted) return <CheckCircle className="w-5 h-5 text-green-500" />
    if (exercise.currentAttempts > 0) return <Clock className="w-5 h-5 text-yellow-500" />
    return <Target className="w-5 h-5 text-blue-500" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Brain className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Laboratório de IA</h2>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">APRENDIZADO</Badge>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Pratique o uso de ferramentas de IA em exercícios guiados. Cada exercício tem tentativas limitadas 
          e feedback personalizado para maximizar seu aprendizado.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {exercises.filter(ex => ex.isCompleted).length}
              </p>
              <p className="text-sm text-gray-600">Exercícios Completos</p>
            </div>
            <div className="text-center">
              <Star className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(exercises.filter(ex => ex.bestScore).reduce((acc, ex) => acc + (ex.bestScore || 0), 0) / exercises.filter(ex => ex.bestScore).length) || 0}
              </p>
              <p className="text-sm text-gray-600">Pontuação Média</p>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {exercises.filter(ex => ex.isUnlocked).length}
              </p>
              <p className="text-sm text-gray-600">Exercícios Liberados</p>
            </div>
            <div className="text-center">
              <BookOpen className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{userLevel}</p>
              <p className="text-sm text-gray-600">Nível Atual</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercise List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exercises.map((exercise) => (
          <Card 
            key={exercise.id} 
            className={`transition-all duration-200 ${
              exercise.isUnlocked 
                ? 'hover:shadow-lg cursor-pointer border-2 hover:border-blue-200' 
                : 'opacity-60 cursor-not-allowed'
            } ${exercise.isCompleted ? 'bg-green-50 border-green-200' : ''}`}
            onClick={() => handleExerciseStart(exercise)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(exercise)}
                  <CardTitle className="text-lg">{exercise.title}</CardTitle>
                </div>
                <Badge className={getDifficultyColor(exercise.difficulty)}>
                  {exercise.difficulty === 'beginner' && 'Iniciante'}
                  {exercise.difficulty === 'intermediate' && 'Intermediário'}
                  {exercise.difficulty === 'advanced' && 'Avançado'}
                </Badge>
              </div>
              <CardDescription>{exercise.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Exercise Info */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {exercise.estimatedTime}
                  </span>
                  <span>
                    Tentativas: {exercise.currentAttempts}/{exercise.maxAttempts}
                  </span>
                </div>

                {/* Learning Objectives */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Objetivos de Aprendizagem:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {exercise.learningObjectives.slice(0, 2).map((objective, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-blue-500">•</span>
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Progress */}
                {exercise.isCompleted && exercise.bestScore && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Melhor Pontuação</span>
                      <span className="font-medium">{exercise.bestScore}/100</span>
                    </div>
                    <Progress value={exercise.bestScore} className="h-2" />
                  </div>
                )}

                {/* Action Button */}
                <Button 
                  className="w-full" 
                  disabled={!exercise.isUnlocked || exercise.currentAttempts >= exercise.maxAttempts}
                  variant={exercise.isCompleted ? 'outline' : 'default'}
                >
                  {!exercise.isUnlocked && '🔒 Bloqueado'}
                  {exercise.isUnlocked && exercise.currentAttempts >= exercise.maxAttempts && '❌ Tentativas Esgotadas'}
                  {exercise.isUnlocked && exercise.currentAttempts < exercise.maxAttempts && exercise.isCompleted && '🔄 Refazer'}
                  {exercise.isUnlocked && exercise.currentAttempts < exercise.maxAttempts && !exercise.isCompleted && '▶️ Iniciar'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Exercise Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-600" />
                    {selectedExercise.title}
                  </CardTitle>
                  <CardDescription>{selectedExercise.description}</CardDescription>
                </div>
                <Button variant="outline" onClick={() => setSelectedExercise(null)}>
                  Fechar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Exercise Instructions */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Instruções do Exercício
                </h4>
                <div className="text-blue-800 text-sm space-y-2">
                  {selectedExercise.type === 'prompt' && (
                    <div>
                      <p>Crie um prompt para o ChatGPT que peça para explicar o conceito de "Fotossíntese" para alunos do 5º ano.</p>
                      <p className="font-medium mt-2">Critérios de avaliação:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Clareza e especificidade</li>
                        <li>Adequação ao público-alvo</li>
                        <li>Inclusão de contexto educacional</li>
                        <li>Formato de resposta desejado</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* User Input */}
              <div>
                <Label htmlFor="exercise-input">Sua Resposta:</Label>
                <Textarea
                  id="exercise-input"
                  placeholder="Digite seu prompt aqui..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  rows={6}
                  className="mt-2"
                />
              </div>

              {/* Feedback */}
              {feedback && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-green-900">
                        Avaliação Completa - Pontuação: {feedback.score}/100
                      </h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-green-900 mb-2">✅ Pontos Fortes:</h5>
                        <ul className="text-green-800 text-sm space-y-1">
                          {feedback.strengths.map((strength: string, index: number) => (
                            <li key={index}>• {strength}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-green-900 mb-2">📈 Melhorias:</h5>
                        <ul className="text-green-800 text-sm space-y-1">
                          {feedback.improvements.map((improvement: string, index: number) => (
                            <li key={index}>• {improvement}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h5 className="font-medium text-green-900 mb-2">💡 Dicas de IA:</h5>
                      <ul className="text-green-800 text-sm space-y-1">
                        {feedback.aiTips.map((tip: string, index: number) => (
                          <li key={index}>• {tip}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-4 p-3 bg-white rounded border">
                      <p className="text-sm text-gray-700">
                        <strong>Próximos Passos:</strong> {feedback.nextSteps}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={handleSubmitExercise}
                  disabled={!userInput.trim() || isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <Bot className="mr-2 h-4 w-4 animate-pulse" />
                      Avaliando com IA...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Enviar para Avaliação
                    </>
                  )}
                </Button>
                
                {feedback && (
                  <Button variant="outline" onClick={() => setSelectedExercise(null)}>
                    Finalizar Exercício
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}