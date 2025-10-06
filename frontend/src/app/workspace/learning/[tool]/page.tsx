'use client'

import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Sparkles, Bot, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function LearningToolPage() {
  const params = useParams()
  const tool = params.tool as string
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const toolConfig = {
    'chatgpt-edu': {
      name: 'ChatGPT Educacional',
      icon: '💬',
      description: 'Assistente para tirar dúvidas sobre conceitos da aula',
      placeholder: 'Digite sua pergunta sobre a aula...\n\nExemplo: "O que é inteligência artificial e como ela aprende?"',
      color: 'from-green-500 to-emerald-600'
    },
    'claude-prof': {
      name: 'Claude Professor',
      icon: '🧑‍🏫', 
      description: 'Gere exemplos práticos relacionados ao conteúdo',
      placeholder: 'Descreva o tipo de exemplo que você precisa...\n\nExemplo: "Me dê 3 exemplos de como a IA é usada na educação"',
      color: 'from-blue-500 to-indigo-600'
    },
    'dall-e-edu': {
      name: 'DALL-E Educacional',
      icon: '🎨',
      description: 'Crie visualizações para entender melhor os conceitos',
      placeholder: 'Descreva a imagem que ajudaria você a entender o conceito...\n\nExemplo: "Crie um infográfico mostrando como a IA processa informações"',
      color: 'from-purple-500 to-pink-600'
    }
  }

  const currentTool = toolConfig[tool as keyof typeof toolConfig] || toolConfig['chatgpt-edu']

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsGenerating(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <Link href="javascript:history.back()">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para a aula
            </Button>
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${currentTool.color} shadow-lg`}>
                <span className="text-2xl">{currentTool.icon}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{currentTool.name}</h1>
                <p className="text-gray-600">{currentTool.description}</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
              <BookOpen className="w-3 h-3 mr-1" />
              Modo Aprendizagem
            </Badge>
          </div>
        </div>

        {/* Main Interface */}
        <Card className="border-2 border-purple-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-600" />
              Como posso ajudar você hoje?
            </CardTitle>
            <CardDescription>
              Esta ferramenta foi configurada especialmente para sua jornada de aprendizagem
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            {/* Simple Input Area */}
            <div>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={currentTool.placeholder}
                className="min-h-[200px] resize-none text-base"
                autoFocus
              />
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className={`w-full h-12 text-base bg-gradient-to-r ${currentTool.color} hover:opacity-90`}
              size="lg"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full" />
                  Gerando resposta personalizada...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Gerar com IA
                </>
              )}
            </Button>

            {/* Learning Tips */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2">💡 Dicas para melhores resultados:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Seja específico sobre o que você quer aprender</li>
                <li>• Faça referência ao conteúdo da aula quando possível</li>
                <li>• Não tenha medo de pedir exemplos ou explicações mais simples</li>
              </ul>
            </div>

            {/* Attribution */}
            <div className="text-center text-xs text-gray-500 pt-4 border-t">
              Powered by <strong>{tool === 'claude-prof' ? 'Claude (Anthropic)' : tool === 'dall-e-edu' ? 'DALL-E (OpenAI)' : 'GPT-4 (OpenAI)'}</strong>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}