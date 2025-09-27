'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Send, Bot, User, Sparkles, BookOpen, Brain, Lightbulb } from 'lucide-react'
import { aiAPI } from '@/lib/api'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  tool?: string
  timestamp: Date
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
  cost?: number
}

interface AIChatProps {
  defaultTool?: string
  context?: string
  placeholder?: string
  className?: string
}

const AI_TOOLS = [
  { id: 'chatgpt', name: 'ChatGPT', icon: Brain, color: 'bg-green-500' },
  { id: 'claude', name: 'Claude', icon: Sparkles, color: 'bg-orange-500' },
  { id: 'gemini', name: 'Gemini', icon: Lightbulb, color: 'bg-blue-500' },
]

const QUICK_PROMPTS = [
  {
    title: 'Criar Plano de Aula',
    prompt: 'Crie um plano de aula de 50 minutos sobre [TÓPICO] para alunos do [ANO].',
    category: 'Planejamento',
  },
  {
    title: 'Gerar Quiz',
    prompt: 'Crie um quiz de 10 questões sobre [TÓPICO] para [ANO].',
    category: 'Avaliação',
  },
  {
    title: 'Explicar Conceito',
    prompt: 'Explique [CONCEITO] de forma simples para alunos do [ANO].',
    category: 'Ensino',
  },
  {
    title: 'Atividade Prática',
    prompt: 'Sugira uma atividade prática sobre [TÓPICO] para [ANO].',
    category: 'Atividades',
  },
]

export function AIChat({ 
  defaultTool = 'chatgpt', 
  context,
  placeholder = 'Digite sua pergunta sobre educação...',
  className = ''
}: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [selectedTool, setSelectedTool] = useState(defaultTool)
  const [isLoading, setIsLoading] = useState(false)
  const [totalCost, setTotalCost] = useState(0)

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await aiAPI.chat(selectedTool, inputValue, context)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.response,
        tool: selectedTool,
        timestamp: new Date(),
        usage: response.usage,
        cost: response.cost,
      }

      setMessages(prev => [...prev, assistantMessage])
      
      if (response.cost) {
        setTotalCost(prev => prev + response.cost)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
        timestamp: new Date(),
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const selectedToolConfig = AI_TOOLS.find(tool => tool.id === selectedTool)

  return (
    <div className={`flex flex-col h-full max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white rounded-t-lg">
        <div className="flex items-center space-x-3">
          <Bot className="w-6 h-6 text-primary" />
          <div>
            <h3 className="font-semibold">Assistente IA TEACH</h3>
            <p className="text-sm text-muted-foreground">
              Escolha uma ferramenta de IA e faça sua pergunta
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {totalCost > 0 && (
            <Badge variant="outline" className="text-xs">
              Custo: ${totalCost.toFixed(4)}
            </Badge>
          )}
        </div>
      </div>

      {/* AI Tool Selector */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex space-x-2">
          {AI_TOOLS.map((tool) => {
            const IconComponent = tool.icon
            return (
              <Button
                key={tool.id}
                variant={selectedTool === tool.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTool(tool.id)}
                className="flex items-center space-x-2"
              >
                <IconComponent className="w-4 h-4" />
                <span>{tool.name}</span>
              </Button>
            )
          })}
        </div>
      </div>

      {/* Quick Prompts */}
      {messages.length === 0 && (
        <div className="p-4 border-b">
          <h4 className="text-sm font-medium mb-3">Prompts Rápidos:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {QUICK_PROMPTS.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="justify-start text-left h-auto p-3"
                onClick={() => handleQuickPrompt(prompt.prompt)}
              >
                <div>
                  <div className="font-medium text-xs text-primary mb-1">
                    {prompt.category}
                  </div>
                  <div className="text-sm">{prompt.title}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Comece uma conversa com a IA para obter ajuda educacional.</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex space-x-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback className={selectedToolConfig?.color}>
                    <Bot className="w-4 h-4 text-white" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-white border shadow-sm'
                }`}
              >
                {message.role === 'assistant' && message.tool && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {AI_TOOLS.find(t => t.id === message.tool)?.name}
                    </Badge>
                    {message.usage && (
                      <span className="text-xs text-muted-foreground">
                        {message.usage.totalTokens} tokens
                      </span>
                    )}
                  </div>
                )}
                
                <div className="prose prose-sm max-w-none">
                  {message.content.split('\n').map((line, index) => (
                    <p key={index} className={message.role === 'user' ? 'text-primary-foreground' : ''}>
                      {line}
                    </p>
                  ))}
                </div>

                <div className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>

              {message.role === 'user' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className={selectedToolConfig?.color}>
                <Bot className="w-4 h-4 text-white" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-white border rounded-lg p-3 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white rounded-b-lg">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isLoading}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}