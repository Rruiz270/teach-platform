'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { aiService, type ChatRequest } from '@/services/aiService'
import { 
  MessageSquare, 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  User, 
  Lightbulb, 
  BookOpen, 
  Zap,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Minimize2,
  Maximize2
} from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'ai' | 'suggestion'
  content: string
  timestamp: Date
  context?: string
  helpful?: boolean
}

interface Suggestion {
  id: string
  title: string
  description: string
  type: 'content' | 'activity' | 'assessment' | 'tip'
  context: string
}

interface AITeachingAssistantProps {
  currentLesson?: {
    id: string
    title: string
    module: string
    content: string
  }
  isMinimized?: boolean
  onToggleMinimize?: () => void
}

export default function AITeachingAssistant({ 
  currentLesson, 
  isMinimized = false, 
  onToggleMinimize 
}: AITeachingAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '👋 Olá! Sou seu assistente de IA para ensino. Posso ajudar com dúvidas sobre IA, criar conteúdo personalizado, ou sugerir atividades práticas. Como posso te ajudar hoje?',
      timestamp: new Date(),
      context: 'greeting'
    }
  ])
  
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [activeTab, setActiveTab] = useState('chat')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  // Smart suggestions based on current lesson
  useEffect(() => {
    if (currentLesson) {
      generateContextualSuggestions(currentLesson)
    }
  }, [currentLesson])

  const generateContextualSuggestions = (lesson: any) => {
    const lessonSuggestions: Suggestion[] = [
      {
        id: '1',
        title: '🎯 Atividade Prática',
        description: `Criar um exercício hands-on para ${lesson.title}`,
        type: 'activity',
        context: lesson.module
      },
      {
        id: '2', 
        title: '📝 Quiz Personalizado',
        description: 'Gerar perguntas de verificação de aprendizagem',
        type: 'assessment',
        context: lesson.module
      },
      {
        id: '3',
        title: '💡 Dica de Ensino',
        description: 'Estratégias para explicar conceitos complexos',
        type: 'tip',
        context: lesson.module
      },
      {
        id: '4',
        title: '📚 Conteúdo Extra',
        description: 'Materiais complementares e exemplos reais',
        type: 'content',
        context: lesson.module
      }
    ]
    setSuggestions(lessonSuggestions)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Voice recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'pt-BR'

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputValue(transcript)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  const handleVoiceInput = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop()
      } else {
        recognitionRef.current.start()
        setIsListening(true)
      }
    }
  }

  const generateAIResponse = async (userMessage: string, context?: string): Promise<string> => {
    setIsLoading(true)
    
    try {
      // Build conversation context from previous messages
      const previousMessages = messages
        .filter(m => m.type !== 'suggestion')
        .slice(-6) // Last 6 messages for context
        .map(m => ({
          role: m.type === 'user' ? 'user' as const : 'assistant' as const,
          content: m.content
        }))

      // Prepare request for Claude API
      const chatRequest: ChatRequest = {
        message: userMessage,
        context: {
          lessonId: currentLesson?.id,
          lessonTitle: currentLesson?.title,
          moduleLevel: currentLesson?.module,
          previousMessages
        }
      }

      // Call real Claude API
      const response = await aiService.chat(chatRequest)
      
      if (response.success) {
        return response.data.response
      } else {
        throw new Error('Failed to get AI response')
      }
    } catch (error) {
      console.error('AI response error:', error)
      
      // Fallback response
      return `😅 Desculpe, tive um problema técnico. Mas posso sugerir algumas abordagens práticas para "${userMessage}". 

A IA é uma ferramenta poderosa para personalizar o ensino. Algumas estratégias que sempre funcionam:

• **Prompts específicos**: Seja detalhado sobre o que precisa
• **Contexto claro**: Informe o nível dos alunos e objetivo
• **Iteração**: Refine as respostas conforme necessário

Quer tentar novamente? Posso ajudar com prompts mais específicos! 🤖✨`
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      context: currentLesson?.id
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    const aiResponse = await generateAIResponse(inputValue, currentLesson?.id)
    setIsLoading(false)

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: aiResponse,
      timestamp: new Date(),
      context: currentLesson?.id
    }

    setMessages(prev => [...prev, aiMessage])
  }

  const handleSuggestionClick = async (suggestion: Suggestion) => {
    const suggestionMessage: Message = {
      id: Date.now().toString(),
      type: 'suggestion',
      content: `💡 ${suggestion.title}: ${suggestion.description}`,
      timestamp: new Date(),
      context: suggestion.context
    }

    setMessages(prev => [...prev, suggestionMessage])

    // Generate specific response based on suggestion type
    let responseContent = ''
    switch (suggestion.type) {
      case 'activity':
        responseContent = `🎯 **Atividade Personalizada para ${currentLesson?.title}**\n\n**Objetivo:** Aplicar conceitos de IA de forma prática\n\n**Passo a passo:**\n1. **Aquecimento (5 min):** Discussão sobre experiências com IA\n2. **Atividade Principal (15 min):** Criar prompts eficazes em grupos\n3. **Teste Prático (10 min):** Usar ChatGPT para testar os prompts\n4. **Reflexão (5 min):** Compartilhar resultados e aprendizados\n\n**Materiais:** Computador/tablet, acesso à internet\n**Avaliação:** Qualidade dos prompts e reflexões dos alunos`
        break
      case 'assessment':
        responseContent = `📝 **Quiz Personalizado - ${currentLesson?.title}**\n\n**Pergunta 1:** O que é um prompt eficaz?\na) Uma pergunta qualquer para IA\nb) Uma instrução clara e específica\nc) Um texto longo e detalhado\nd) Uma palavra-chave simples\n\n**Pergunta 2:** Qual a melhor prática ao usar IA em sala?\na) Aceitar tudo que a IA gera\nb) Revisar e adaptar o conteúdo\nc) Usar apenas para tarefas simples\nd) Evitar mostrar aos alunos\n\n**Pergunta 3:** Como avaliar se uma resposta de IA é confiável?\n(Resposta dissertativa - 3 linhas)`
        break
      case 'tip':
        responseContent = `💡 **Dica de Ouro para ${currentLesson?.title}**\n\n**Estratégia: "Método Sanduíche"**\n\n🥪 **Camada 1:** Contextualize (conte uma história real)\n🥪 **Camada 2:** Conceito de IA (explique de forma simples)\n🥪 **Camada 3:** Aplicação prática (deixe eles testarem)\n\n**Exemplo:**\n"Vocês sabiam que médicos usam IA para detectar doenças em exames? Isso funciona porque a IA reconhece padrões... Agora vamos treinar uma 'IA' nossa para reconhecer diferentes tipos de música!"\n\n✨ **Resultado:** Aprendizado significativo e engajamento máximo!`
        break
      case 'content':
        responseContent = `📚 **Conteúdo Extra - ${currentLesson?.title}**\n\n**🎥 Vídeos Recomendados:**\n• "IA na Vida Real" - 3 min\n• "Como a IA Aprende" - 5 min\n\n**📖 Artigos (Linguagem Simples):**\n• "IA no Dia a Dia das Crianças"\n• "Profissões do Futuro com IA"\n\n**🎮 Atividades Interativas:**\n• Quick, Draw! (Google) - IA que reconhece desenhos\n• AI Experiments - Ferramentas educativas do Google\n\n**📊 Infográficos:**\n• "Timeline da IA" - História em imagens\n• "IA vs Humanos" - Comparativo visual`
        break
    }

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: responseContent,
      timestamp: new Date(),
      context: suggestion.context
    }

    setMessages(prev => [...prev, aiMessage])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const markAsHelpful = (messageId: string, helpful: boolean) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, helpful } : msg
      )
    )
  }

  if (isMinimized) {
    return (
      <Card className="fixed bottom-4 right-4 w-80 z-50 shadow-2xl">
        <CardHeader 
          className="cursor-pointer flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
          onClick={onToggleMinimize}
        >
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <CardTitle className="text-sm">Assistente IA</CardTitle>
          </div>
          <Maximize2 className="h-4 w-4" />
        </CardHeader>
        <CardContent className="p-3">
          <p className="text-sm text-gray-600">
            {messages.length > 1 ? `${messages.length - 1} mensagens` : 'Pronto para ajudar!'}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[600px] z-50 shadow-2xl flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <CardTitle className="text-sm">Assistente IA de Ensino</CardTitle>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-xs">
            {currentLesson ? currentLesson.module : 'Geral'}
          </Badge>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onToggleMinimize}
            className="h-6 w-6 p-0 text-white hover:bg-white/20"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 m-2">
          <TabsTrigger value="chat" className="flex items-center space-x-1">
            <MessageSquare className="h-4 w-4" />
            <span>Chat</span>
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex items-center space-x-1">
            <Lightbulb className="h-4 w-4" />
            <span>Sugestões</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col m-2 mt-0">
          <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-gray-50 rounded-lg">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : message.type === 'suggestion'
                    ? 'bg-purple-100 text-purple-800 border border-purple-200'
                    : 'bg-white text-gray-800 shadow-sm border'
                }`}>
                  <div className="flex items-start space-x-2">
                    {message.type === 'ai' && <Bot className="h-4 w-4 mt-0.5 text-blue-500" />}
                    {message.type === 'user' && <User className="h-4 w-4 mt-0.5" />}
                    {message.type === 'suggestion' && <Lightbulb className="h-4 w-4 mt-0.5" />}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString('pt-BR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                  
                  {message.type === 'ai' && (
                    <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-gray-200">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard(message.content)}
                        className="h-6 px-2 text-xs"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copiar
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => markAsHelpful(message.id, true)}
                        className={`h-6 px-2 text-xs ${message.helpful === true ? 'text-green-600' : ''}`}
                      >
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => markAsHelpful(message.id, false)}
                        className={`h-6 px-2 text-xs ${message.helpful === false ? 'text-red-600' : ''}`}
                      >
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-lg p-3 shadow-sm border">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-blue-500" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center space-x-2 mt-2">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua dúvida sobre IA ou ensino..."
                className="pr-10"
                disabled={isLoading}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVoiceInput}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 ${
                  isListening ? 'text-red-500' : 'text-gray-400'
                }`}
                disabled={isLoading}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
            <Button 
              onClick={handleSendMessage} 
              disabled={isLoading || !inputValue.trim()}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="suggestions" className="flex-1 m-2 mt-0">
          <div className="space-y-3">
            <div className="text-sm text-gray-600 p-2 bg-blue-50 rounded-lg">
              💡 Sugestões personalizadas baseadas na sua aula atual
            </div>
            
            {suggestions.map((suggestion) => (
              <Card 
                key={suggestion.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      suggestion.type === 'activity' ? 'bg-green-100' :
                      suggestion.type === 'assessment' ? 'bg-yellow-100' :
                      suggestion.type === 'tip' ? 'bg-purple-100' :
                      'bg-blue-100'
                    }`}>
                      {suggestion.type === 'activity' && <Zap className="h-4 w-4 text-green-600" />}
                      {suggestion.type === 'assessment' && <BookOpen className="h-4 w-4 text-yellow-600" />}
                      {suggestion.type === 'tip' && <Lightbulb className="h-4 w-4 text-purple-600" />}
                      {suggestion.type === 'content' && <BookOpen className="h-4 w-4 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{suggestion.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{suggestion.description}</p>
                      <Badge variant="outline" className="text-xs mt-2">
                        {suggestion.context}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="p-4 text-center">
                <RefreshCw className="h-6 w-6 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  Mais sugestões serão geradas baseadas na sua interação
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}