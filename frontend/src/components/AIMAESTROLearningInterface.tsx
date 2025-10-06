'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sparkles, Bot, BookOpen, Lightbulb } from 'lucide-react'

interface AIMAESTROLearningInterfaceProps {
  lessonTitle: string
  showTools?: boolean
}

export default function AIMAESTROLearningInterface({ 
  lessonTitle,
  showTools = false
}: AIMAESTROLearningInterfaceProps) {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  const recommendedTools = [
    {
      id: 'chatgpt-edu',
      name: 'ChatGPT Educacional',
      icon: '💬',
      description: 'Para tirar dúvidas sobre a aula',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'claude-prof',
      name: 'Claude Professor',
      icon: '🧑‍🏫',
      description: 'Exemplos práticos do conteúdo',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'dall-e-edu',
      name: 'DALL-E Educacional',
      icon: '🎨',
      description: 'Visualizar conceitos da aula',
      color: 'from-purple-500 to-pink-600'
    }
  ]

  if (!showTools) {
    return (
      <div className="mb-6">
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6 text-purple-600" />
                <div>
                  <CardTitle className="text-lg text-purple-900">
                    AI MAESTRO está preparando sua aula
                  </CardTitle>
                  <CardDescription className="text-purple-700">
                    Ferramentas de IA recomendadas aparecerão conforme necessário
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
                <Sparkles className="w-3 h-3 mr-1" />
                Modo Aprendizagem
              </Badge>
            </div>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="mb-6 space-y-4">
      {/* Simplified header */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Lightbulb className="w-4 h-4 text-yellow-500" />
        <span>Ferramentas recomendadas para complementar sua aprendizagem</span>
      </div>

      {/* Tool pills - much simpler presentation */}
      <div className="flex flex-wrap gap-3">
        {recommendedTools.map((tool) => (
          <Button
            key={tool.id}
            variant={selectedTool === tool.id ? "default" : "outline"}
            size="sm"
            className={`h-auto py-2 px-4 ${
              selectedTool === tool.id 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-0' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => setSelectedTool(selectedTool === tool.id ? null : tool.id)}
          >
            <span className="mr-2">{tool.icon}</span>
            {tool.name}
          </Button>
        ))}
      </div>

      {/* Tool interface - only shows when selected */}
      {selectedTool && (
        <div className="animate-in slide-in-from-top-2 duration-200">
          <Card className="border-purple-200 bg-gradient-to-br from-white to-purple-50">
            <CardContent className="pt-4">
              <p className="text-sm text-gray-600 mb-3">
                {recommendedTools.find(t => t.id === selectedTool)?.description}
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={() => window.open('/workspace/learning/' + selectedTool, '_blank')}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Abrir {recommendedTools.find(t => t.id === selectedTool)?.name}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}