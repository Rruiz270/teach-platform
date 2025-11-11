'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Bot, Send, CheckCircle, AlertCircle, Sparkles, FileText } from 'lucide-react'

interface EmbeddedActivityAssistantProps {
  activityTitle: string
  projectRequirements?: string[]
}

export default function EmbeddedActivityAssistant({ 
  activityTitle,
  projectRequirements = []
}: EmbeddedActivityAssistantProps) {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
    {
      role: 'assistant',
      content: 'Olá! Estou aqui para ajudar você com sua atividade. Como posso orientar você?'
    }
  ])
  const [projectProgress, setProjectProgress] = useState(25)

  const handleSendMessage = async () => {
    if (!message.trim()) return

    const userMessage = message.trim()
    setConversation([...conversation, { role: 'user', content: userMessage }])
    setMessage('')
    setIsTyping(true)

    try {
      // Import aiService dynamically to avoid SSR issues
      const { aiService } = await import('@/services/aiService')
      
      const response = await aiService.chat({
        message: userMessage,
        context: {
          lessonTitle: activityTitle,
          moduleLevel: 'ACTIVITY_ASSISTANCE',
          previousMessages: conversation.slice(-6) // Last 6 messages for context
        }
      })

      setConversation(prev => [...prev, {
        role: 'assistant',
        content: response.data.response
      }])
      setProjectProgress(prev => Math.min(prev + 10, 100))
    } catch (error) {
      console.error('AI Chat Error:', error)
      setConversation(prev => [...prev, {
        role: 'assistant',
        content: 'Desculpe, estou com dificuldades técnicas no momento. Tente novamente em alguns instantes ou continue com a atividade - estou aqui para ajudar quando precisar!'
      }])
    } finally {
      setIsTyping(false)
    }
  }

  const quickActions = [
    { label: 'Como começar?', icon: '🚀' },
    { label: 'Estou travado', icon: '🤔' },
    { label: 'Verificar progresso', icon: '✅' }
  ]

  return (
    <div className="space-y-4">
      {/* Project Progress Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-lg">{activityTitle}</CardTitle>
            </div>
            <Badge 
              variant="outline" 
              className={`${
                projectProgress === 100 
                  ? 'bg-green-100 text-green-800 border-green-300' 
                  : 'bg-blue-100 text-blue-800 border-blue-300'
              }`}
            >
              {projectProgress === 100 ? (
                <>
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Concluído
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Em Progresso
                </>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Progresso do Projeto</span>
                <span className="font-medium">{projectProgress}%</span>
              </div>
              <Progress value={projectProgress} className="h-2" />
            </div>
            
            {projectProgress === 100 && (
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="text-sm text-green-800 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Projeto salvo automaticamente! Continue praticando ou explore outras atividades.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Embedded AI Assistant */}
      <Card className="border-purple-200">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">Assistente de Atividade</CardTitle>
              <CardDescription>
                Orientação personalizada para completar seu projeto
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Chat Messages */}
          <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto space-y-3">
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-1">
                      <Bot className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-medium text-purple-600">AI Assistente</span>
                    </div>
                  )}
                  <p className={`text-sm ${msg.role === 'assistant' ? 'text-gray-700' : ''}`}>
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-gray-500">
                <Bot className="w-4 h-4" />
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setMessage(action.label)}
                className="text-xs"
              >
                <span className="mr-1">{action.icon}</span>
                {action.label}
              </Button>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              placeholder="Digite sua dúvida ou peça ajuda..."
              className="resize-none h-20"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* AI Attribution */}
          <div className="text-center text-xs text-gray-500">
            Powered by <strong>Claude (Anthropic)</strong> • Fallback: <strong>GPT-4 (OpenAI)</strong>
          </div>
        </CardContent>
      </Card>

      {/* Project Requirements Checklist */}
      {projectRequirements.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              Requisitos do Projeto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {projectRequirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}