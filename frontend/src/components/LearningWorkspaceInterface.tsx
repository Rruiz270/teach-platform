'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Sparkles, Target, Brain, Lightbulb, Clock, CheckCircle, Zap } from 'lucide-react'

interface LearningWorkspaceInterfaceProps {
  context: 'lesson' | 'activity' | 'workspace'
  lessonTitle?: string
  activityTitle?: string
}

export default function LearningWorkspaceInterface({ 
  context, 
  lessonTitle, 
  activityTitle 
}: LearningWorkspaceInterfaceProps) {
  const [selectedTool, setSelectedTool] = useState<string>('lesson-helper')
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const getLearningTools = () => {
    if (context === 'lesson' && lessonTitle?.includes('Inteligência Artificial')) {
      return [
        {
          id: 'lesson-helper',
          name: 'Assistente da Aula',
          icon: '🎓',
          description: 'Tire dúvidas sobre conceitos de IA desta aula',
          color: 'from-emerald-500 to-green-600',
          examples: [
            'O que é inteligência artificial de forma simples?',
            'Como a IA funciona no dia a dia?',
            'Quais são os tipos de IA que existem?'
          ]
        },
        {
          id: 'concept-explorer',
          name: 'Explorador de Conceitos',
          icon: '🧠',
          description: 'Explore conceitos com exemplos práticos',
          color: 'from-blue-500 to-cyan-600',
          examples: [
            'Me dê 5 exemplos de IA que uso todo dia',
            'Compare IA com inteligência humana',
            'Como explicar IA para uma criança?'
          ]
        },
        {
          id: 'scenario-creator',
          name: 'Criador de Cenários',
          icon: '🎨',
          description: 'Crie situações práticas para entender IA',
          color: 'from-purple-500 to-pink-600',
          examples: [
            'Crie um cenário onde IA ajuda na educação',
            'Imagine o futuro da IA em 10 anos',
            'Como seria uma escola com IA?'
          ]
        }
      ]
    }

    // Default tools for activities
    return [
      {
        id: 'activity-guide',
        name: 'Guia da Atividade',
        icon: '🚀',
        description: 'Orientação passo a passo para completar sua atividade',
        color: 'from-orange-500 to-red-600',
        examples: [
          'Como começar esta atividade?',
          'Estou com dificuldade nesta etapa',
          'Meu resultado está correto?'
        ]
      },
      {
        id: 'example-generator',
        name: 'Gerador de Exemplos',
        icon: '💡',
        description: 'Gere exemplos práticos para sua atividade',
        color: 'from-yellow-500 to-orange-600',
        examples: [
          'Me dê exemplos para esta situação',
          'Como aplicar isso na prática?',
          'Quais são os melhores casos de uso?'
        ]
      }
    ]
  }

  const tools = getLearningTools()
  const currentTool = tools.find(t => t.id === selectedTool)

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsGenerating(false)
    setShowResult(true)
  }

  const getContextTitle = () => {
    if (context === 'lesson' && lessonTitle) return `📚 Aprendendo: ${lessonTitle}`
    if (context === 'activity' && activityTitle) return `🎯 Atividade: ${activityTitle}`
    return '🎓 Espaço de Aprendizagem'
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Learning Context Header */}
      <Card className="bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 border-emerald-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-emerald-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                {getContextTitle()}
              </CardTitle>
              <CardDescription className="text-emerald-700 mt-1">
                Ferramentas de IA especializadas para seu aprendizado
              </CardDescription>
            </div>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
              MODO APRENDIZAGEM
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Learning Tools Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Card 
            key={tool.id}
            className={`cursor-pointer transition-all hover:shadow-md border-2 ${
              selectedTool === tool.id 
                ? 'border-emerald-300 bg-emerald-50 shadow-md' 
                : 'border-gray-200 hover:border-emerald-200'
            }`}
            onClick={() => setSelectedTool(tool.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${tool.color}`}>
                  <span className="text-xl text-white">{tool.icon}</span>
                </div>
                <div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {tool.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <Button 
                className={`w-full ${
                  selectedTool === tool.id 
                    ? 'bg-emerald-600 hover:bg-emerald-700' 
                    : `bg-gradient-to-r ${tool.color} hover:opacity-90`
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
      {currentTool && (
        <Card className="border-2 border-emerald-300 bg-gradient-to-b from-emerald-50 to-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${currentTool.color}`}>
                  <span className="text-xl text-white">{currentTool.icon}</span>
                </div>
                <div>
                  <CardTitle className="text-emerald-900">{currentTool.name}</CardTitle>
                  <CardDescription className="text-emerald-700">
                    {currentTool.description}
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-300">
                Ativo
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Learning Progress */}
            <div className="bg-white p-4 rounded-lg border border-emerald-200">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-medium text-gray-700 flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-600" />
                  Progresso de Aprendizagem
                </span>
                <span className="text-emerald-600 font-medium">Em desenvolvimento</span>
              </div>
              <Progress value={30} className="h-3" />
              <p className="text-xs text-gray-600 mt-2">Continue praticando para dominar os conceitos!</p>
            </div>

            {/* Quick Start Examples */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Comece com estes exemplos:
              </h4>
              <div className="space-y-2">
                {currentTool.examples.map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-3 bg-white hover:bg-blue-50 border-blue-200"
                    onClick={() => setPrompt(example)}
                  >
                    <span className="text-blue-600 mr-2">💭</span>
                    {example}
                  </Button>
                ))}
              </div>
            </div>

            {/* Learning Input */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-purple-600" />
                  💭 Descreva sua dúvida ou o que quer aprender:
                </label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ex: Não entendo como a IA aprende... ou Quero saber mais sobre..."
                  className="min-h-[120px] resize-none"
                />
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                    Criando resposta personalizada...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    ✨ Gerar Aprendizagem com IA
                  </>
                )}
              </Button>
            </div>

            {/* AI Attribution */}
            <div className="bg-gray-50 p-3 rounded-lg border">
              <p className="text-xs text-gray-600 text-center">
                🤖 Gerado com <strong>Claude (Anthropic)</strong> • Fallback: <strong>GPT-4 (OpenAI)</strong>
              </p>
            </div>

            {/* Learning Tips */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-900 mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                💡 Dicas para Aprender Melhor:
              </h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Seja específico: "Como a IA reconhece imagens?" é melhor que "Como IA funciona?"</li>
                <li>• Faça conexões: "Como isso se relaciona com o que vi na aula?"</li>
                <li>• Peça exemplos: "Pode dar um exemplo prático disso?"</li>
                <li>• Explore cenários: "E se eu quisesse usar isso na minha escola?"</li>
              </ul>
            </div>

            {/* Show Result */}
            {showResult && (
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    🎉 Resposta Personalizada Gerada!
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <p className="text-gray-700">
                      [Aqui apareceria a resposta personalizada da IA, adaptada ao nível de aprendizagem do aluno e ao contexto da aula...]
                    </p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline">
                      👍 Útil
                    </Button>
                    <Button size="sm" variant="outline">
                      🤔 Preciso de mais
                    </Button>
                    <Button size="sm" variant="outline">
                      📚 Salvar para revisão
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}