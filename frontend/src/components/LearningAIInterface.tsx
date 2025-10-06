'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Lightbulb, Target, CheckCircle, Clock, Sparkles } from 'lucide-react'

interface LearningAITool {
  id: string
  name: string
  icon: string
  description: string
  lessonFocus: string
  difficulty: 'Fácil' | 'Médio' | 'Avançado'
  timeEstimate: string
  learningGoal: string
  examples: string[]
}

interface LearningAIInterfaceProps {
  lessonTitle: string
  lessonType: 'introduction' | 'practice' | 'project' | 'assessment'
  moduleType: 'starter' | 'survivor' | 'explorer' | 'expert'
  activityContext?: string
}

export default function LearningAIInterface({ 
  lessonTitle, 
  lessonType, 
  moduleType,
  activityContext 
}: LearningAIInterfaceProps) {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [prompt, setPrompt] = useState('')
  const [isLearning, setIsLearning] = useState(false)

  // Get tools specific to this lesson
  const getLessonSpecificTools = (): LearningAITool[] => {
    const lowerTitle = lessonTitle.toLowerCase()
    
    // For "O que é Inteligência Artificial?" - First lesson
    if (lowerTitle.includes('inteligência artificial') || lowerTitle.includes('o que é')) {
      return [
        {
          id: 'chat-basics',
          name: 'ChatGPT Explorador',
          icon: '🎯',
          description: 'Aprenda fazendo perguntas básicas sobre IA',
          lessonFocus: 'Conceitos fundamentais',
          difficulty: 'Fácil',
          timeEstimate: '10 min',
          learningGoal: 'Entender como a IA responde perguntas',
          examples: [
            'O que é inteligência artificial?',
            'Como a IA funciona de forma simples?',
            'Quais são exemplos de IA no dia a dia?'
          ]
        },
        {
          id: 'concept-builder',
          name: 'Construtor de Conceitos',
          icon: '🧠',
          description: 'Crie definições simples e exemplos',
          lessonFocus: 'Definições e exemplos',
          difficulty: 'Fácil',
          timeEstimate: '15 min',
          learningGoal: 'Criar suas próprias explicações sobre IA',
          examples: [
            'Explique IA como se fosse para uma criança',
            'Dê 3 exemplos de IA que uso todo dia',
            'Compare IA com inteligência humana'
          ]
        }
      ]
    }
    
    // Default tools for other lessons
    return [
      {
        id: 'lesson-assistant',
        name: 'Assistente da Aula',
        icon: '📚',
        description: 'Tire dúvidas sobre o conteúdo desta aula',
        lessonFocus: 'Suporte ao aprendizado',
        difficulty: 'Fácil',
        timeEstimate: '5 min',
        learningGoal: 'Esclarecer conceitos da aula',
        examples: [
          'Não entendi este conceito...',
          'Pode dar um exemplo prático?',
          'Como isso se aplica na educação?'
        ]
      }
    ]
  }

  // Get tools specific to activities
  const getActivitySpecificTools = (): LearningAITool[] => {
    if (!activityContext) return []
    
    return [
      {
        id: 'project-helper',
        name: 'Ajudante do Projeto',
        icon: '🚀',
        description: 'Orientação passo a passo para sua atividade',
        lessonFocus: 'Execução de projeto',
        difficulty: 'Médio',
        timeEstimate: '20 min',
        learningGoal: 'Completar a atividade com sucesso',
        examples: [
          'Como começar este projeto?',
          'Estou travado nesta etapa...',
          'Meu resultado está correto?'
        ]
      }
    ]
  }

  const tools = activityContext ? getActivitySpecificTools() : getLessonSpecificTools()
  
  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId)
    setIsLearning(true)
  }

  const handlePromptSubmit = () => {
    // Simulate AI learning interaction
    console.log('Learning interaction:', { selectedTool, prompt })
  }

  return (
    <div className="space-y-6">
      {/* Learning Context Header */}
      <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-emerald-900">
                  🎓 Área de Aprendizagem - {lessonTitle}
                </CardTitle>
                <CardDescription className="text-emerald-700">
                  {activityContext ? '🎯 Ferramentas para sua atividade' : '📚 Ferramentas para aprender nesta aula'}
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
              APRENDENDO
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Learning Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <Card 
            key={tool.id} 
            className={`cursor-pointer transition-all hover:shadow-md border-2 ${
              selectedTool === tool.id 
                ? 'border-emerald-300 bg-emerald-50' 
                : 'border-gray-200 hover:border-emerald-200'
            }`}
            onClick={() => handleToolSelect(tool.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{tool.icon}</span>
                  <div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {tool.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {tool.timeEstimate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <CardDescription className="text-sm mt-2">
                {tool.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Target className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-blue-700">Objetivo:</span>
                <span className="text-gray-600">{tool.learningGoal}</span>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  Exemplos para começar:
                </div>
                <div className="space-y-1">
                  {tool.examples.slice(0, 2).map((example, index) => (
                    <div key={index} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                      "{example}"
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                className={`w-full ${
                  selectedTool === tool.id 
                    ? 'bg-emerald-600 hover:bg-emerald-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                size="sm"
              >
                {selectedTool === tool.id ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Selecionado
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Usar para Aprender
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Learning Interface */}
      {selectedTool && (
        <Card className="border-2 border-emerald-300 bg-gradient-to-b from-emerald-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-900">
              <span className="text-xl">
                {tools.find(t => t.id === selectedTool)?.icon}
              </span>
              {tools.find(t => t.id === selectedTool)?.name}
            </CardTitle>
            <CardDescription className="text-emerald-700">
              {tools.find(t => t.id === selectedTool)?.lessonFocus}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Learning Progress */}
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Progresso da Aprendizagem</span>
                <span className="text-emerald-600">Iniciante</span>
              </div>
              <Progress value={isLearning ? 25 : 0} className="h-2" />
            </div>
            
            {/* Guided Learning Prompts */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Sugestões para começar:
              </h4>
              <div className="space-y-2">
                {tools.find(t => t.id === selectedTool)?.examples.map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-3 bg-white hover:bg-blue-50"
                    onClick={() => setPrompt(example)}
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Learning Input */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                💭 Sua pergunta ou desafio de aprendizagem:
              </label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Digite sua pergunta ou o que gostaria de aprender..."
                className="min-h-[100px] resize-none"
              />
              
              <Button 
                onClick={handlePromptSubmit}
                className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                disabled={!prompt.trim()}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Aprender com IA
              </Button>
            </div>
            
            {/* Learning Tip */}
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                💡 <strong>Dica de Aprendizagem:</strong> Seja específico em suas perguntas. 
                Quanto mais detalhes você der, melhor a IA pode ajudar você a aprender!
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}