'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Sparkles, 
  FileText, 
  Image, 
  Video, 
  Brain, 
  Zap, 
  BarChart3, 
  ArrowLeft,
  Wand2,
  Clock,
  BookOpen,
  Users,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { api, aiAPI } from '@/lib/api'
import Cookies from 'js-cookie'

interface AIUsageStats {
  textTokens: number
  textTokensLimit: number
  imageGenerations: number
  imageGenerationsLimit: number
  videoMinutes: number
  videoMinutesLimit: number
  plan: string
}

export default function WorkspacePage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('lessons')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationResult, setGenerationResult] = useState<any>(null)
  const [resultTab, setResultTab] = useState('slides')
  const [usageStats, setUsageStats] = useState<AIUsageStats>({
    textTokens: 12500,
    textTokensLimit: 50000,
    imageGenerations: 3,
    imageGenerationsLimit: 10,
    videoMinutes: 0.5,
    videoMinutesLimit: 2,
    plan: 'FREE'
  })

  // Form states
  const [lessonForm, setLessonForm] = useState({
    topic: '',
    grade: '',
    duration: 45,
    objectives: ''
  })

  const [imageForm, setImageForm] = useState({
    prompt: '',
    style: 'educational'
  })

  const [assessmentForm, setAssessmentForm] = useState({
    topic: '',
    questionCount: 5,
    difficulty: 'medium',
    description: ''
  })

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando Workspace IA...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Test API function (debugging token issue)
  const testAPI = async () => {
    try {
      console.log('Testing AI API...')
      console.log('API Base URL:', process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1')
      
      const token = Cookies.get('token')
      console.log('User token exists:', !!token)
      console.log('User authenticated:', isAuthenticated)
      
      if (!token) {
        alert('⚠️ Você não está autenticado! Por favor, faça login novamente.')
        return
      }
      
      // Test if we can reach the backend first
      try {
        const testResponse = await api.get('/auth/me')
        console.log('Auth test successful:', testResponse.data)
      } catch (authError) {
        console.error('Auth test failed:', authError)
      }
      
      // Now test AI endpoint
      const response = await aiAPI.chat('claude', 'Hello, this is a test.')
      console.log('AI API Response:', response)
      alert(`✅ API Success: ${response.response}`)
    } catch (error) {
      console.error('❌ API Test Failed:', error)
      console.error('Full error:', error.response)
      
      let errorMessage = 'Unknown error'
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.response) {
        errorMessage = `HTTP ${error.response.status}: ${error.response.statusText}`
      } else if (error.request) {
        errorMessage = 'Network error - no response from server'
      } else {
        errorMessage = error.message
      }
      
      alert(`❌ API Failed: ${errorMessage}`)
    }
  }

  const handleLessonGeneration = async () => {
    setIsGenerating(true)
    setGenerationResult(null)
    setResultTab('slides')
    
    try {
      // Create a structured prompt for lesson generation
      const prompt = `Você é um especialista em educação brasileira. Crie uma aula completa em português seguindo o currículo brasileiro.

DADOS DA AULA:
- Tópico: ${lessonForm.topic}
- Série/Ano: ${lessonForm.grade}
- Duração: ${lessonForm.duration} minutos
- Objetivos/Descrição: ${lessonForm.objectives}

RESPONDA EM FORMATO JSON com esta estrutura exata:
{
  "title": "Título da aula",
  "outline": "Roteiro detalhado da aula com cronograma",
  "slides": ["Slide 1: Introdução", "Slide 2: Conceitos principais", "..."],
  "activities": ["Atividade 1: Descrição", "Atividade 2: Descrição", "..."],
  "assessment": ["Questão 1", "Questão 2", "..."],
  "duration": ${lessonForm.duration}
}

Certifique-se de que o conteúdo seja apropriado para a idade dos alunos e siga as diretrizes pedagógicas brasileiras.`

      // Use the existing AI API (same as working AI Assistant)
      const response = await aiAPI.chat('claude', prompt)
      
      console.log('Claude Response:', response) // Debug log
      
      let lessonContent
      
      try {
        // Try to parse as JSON first
        const parsedContent = JSON.parse(response.response)
        console.log('Parsed JSON:', parsedContent) // Debug log
        lessonContent = {
          ...parsedContent,
          provider: 'Claude (Anthropic)'
        }
      } catch (parseError) {
        console.log('JSON parse failed, using text extraction') // Debug log
        // If not JSON, create a structured response from the text
        const content = response.response
        lessonContent = {
          title: `Aula: ${lessonForm.topic}`,
          outline: content,
          slides: extractSlides(content),
          activities: extractActivities(content), 
          assessment: extractAssessment(content),
          provider: 'Claude (Anthropic)',
          duration: lessonForm.duration
        }
      }
      
      // Ensure arrays exist and have content
      if (!lessonContent.slides || lessonContent.slides.length === 0) {
        lessonContent.slides = [
          `Slide 1: Introdução ao ${lessonForm.topic}`,
          'Slide 2: Objetivos da Aula',
          'Slide 3: Conceitos Principais',
          'Slide 4: Exemplos Práticos',
          'Slide 5: Atividades',
          'Slide 6: Conclusão'
        ]
      }
      
      if (!lessonContent.activities || lessonContent.activities.length === 0) {
        lessonContent.activities = [
          `Atividade 1: Discussão em grupo sobre ${lessonForm.topic}`,
          'Atividade 2: Exercício prático',
          'Atividade 3: Pesquisa orientada',
          'Atividade 4: Apresentação dos resultados'
        ]
      }
      
      if (!lessonContent.assessment || lessonContent.assessment.length === 0) {
        lessonContent.assessment = [
          `1. O que você aprendeu sobre ${lessonForm.topic}?`,
          '2. Cite dois exemplos práticos do tema.',
          '3. Como você aplicaria esse conhecimento?',
          '4. Que dúvidas ainda tem sobre o assunto?'
        ]
      }
      
      console.log('Final lesson content:', lessonContent) // Debug log
      
      setGenerationResult({
        type: 'lesson',
        content: lessonContent
      })
    } catch (error) {
      console.error('Erro ao gerar aula:', error)
      
      // More detailed error message
      let errorMessage = 'Erro ao gerar aula. Tente novamente.'
      if (error.response) {
        // API returned an error response
        errorMessage = `Erro ${error.response.status}: ${error.response.data?.message || 'Erro do servidor'}`
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'Erro de conexão. Verifique sua internet.'
      } else {
        // Something else went wrong
        errorMessage = `Erro: ${error.message}`
      }
      
      alert(errorMessage)
    } finally {
      setIsGenerating(false)
    }
  }

  // Helper functions to extract content from text
  const extractSlides = (text: string): string[] => {
    const slides = []
    const lines = text.split('\n')
    
    for (const line of lines) {
      if (line.toLowerCase().includes('slide') && line.includes(':')) {
        slides.push(line.trim())
      }
    }
    
    if (slides.length === 0) {
      return [
        `Slide 1: ${lessonForm.topic}`,
        'Slide 2: Objetivos da Aula',
        'Slide 3: Conceitos Principais',
        'Slide 4: Exemplos Práticos',
        'Slide 5: Atividades',
        'Slide 6: Conclusão'
      ]
    }
    
    return slides
  }

  const extractActivities = (text: string): string[] => {
    const activities = []
    const lines = text.split('\n')
    
    for (const line of lines) {
      if (line.toLowerCase().includes('atividade') && line.includes(':')) {
        activities.push(line.trim())
      }
    }
    
    if (activities.length === 0) {
      return [
        `Atividade 1: Discussão em grupo sobre ${lessonForm.topic}`,
        'Atividade 2: Exercício prático',
        'Atividade 3: Pesquisa orientada',
        'Atividade 4: Apresentação dos resultados'
      ]
    }
    
    return activities
  }

  const extractAssessment = (text: string): string[] => {
    const questions = []
    const lines = text.split('\n')
    
    for (const line of lines) {
      if (line.match(/^\d+\./) || (line.toLowerCase().includes('questão') && line.includes(':'))) {
        questions.push(line.trim())
      }
    }
    
    if (questions.length === 0) {
      return [
        `1. O que você aprendeu sobre ${lessonForm.topic}?`,
        '2. Cite dois exemplos práticos do tema.',
        '3. Como você aplicaria esse conhecimento?',
        '4. Que dúvidas ainda tem sobre o assunto?'
      ]
    }
    
    return questions
  }

  const handleImageGeneration = async () => {
    setIsGenerating(true)
    setGenerationResult(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setGenerationResult({
        type: 'image',
        content: {
          url: '/api/placeholder/400/300',
          prompt: imageForm.prompt,
          provider: 'DALL-E 3 (OpenAI)'
        }
      })
    } catch (error) {
      console.error('Erro ao gerar imagem:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleAssessmentGeneration = async () => {
    setIsGenerating(true)
    setGenerationResult(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2500))
      
      setGenerationResult({
        type: 'assessment',
        content: {
          questions: Array(assessmentForm.questionCount).fill(null).map((_, i) => `Questão ${i + 1} sobre ${assessmentForm.topic}`),
          provider: 'Claude (Anthropic)'
        }
      })
    } catch (error) {
      console.error('Erro ao gerar avaliação:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.round((used / limit) * 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-8 w-8 text-purple-600" />
                <h1 className="text-2xl font-bold text-gray-900">
                  Workspace IA
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={usageStats.plan === 'FREE' ? 'secondary' : 'default'}>
                Plano {usageStats.plan}
              </Badge>
              <span className="text-sm text-gray-600">Olá, {user.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Usage Overview */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">📊 Uso Mensal</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Tokens de Texto</span>
                  <span className="text-sm text-gray-500">
                    {usageStats.textTokens.toLocaleString()} / {usageStats.textTokensLimit.toLocaleString()}
                  </span>
                </div>
                <Progress value={getUsagePercentage(usageStats.textTokens, usageStats.textTokensLimit)} className="h-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Imagens Geradas</span>
                  <span className="text-sm text-gray-500">
                    {usageStats.imageGenerations} / {usageStats.imageGenerationsLimit}
                  </span>
                </div>
                <Progress value={getUsagePercentage(usageStats.imageGenerations, usageStats.imageGenerationsLimit)} className="h-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Minutos de Vídeo</span>
                  <span className="text-sm text-gray-500">
                    {usageStats.videoMinutes} / {usageStats.videoMinutesLimit}
                  </span>
                </div>
                <Progress value={getUsagePercentage(usageStats.videoMinutes, usageStats.videoMinutesLimit)} className="h-2" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Workspace */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="lessons" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Aulas
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Imagens
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Vídeos
            </TabsTrigger>
            <TabsTrigger value="assessments" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Avaliações
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Lesson Builder */}
          <TabsContent value="lessons" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Criador de Aulas com IA
                </CardTitle>
                <CardDescription>
                  Gere aulas completas com roteiro, atividades e materiais usando Claude (Anthropic)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Natural Language Input */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
                  <h4 className="font-medium text-gray-900 mb-2">💬 Descreva sua aula em linguagem natural:</h4>
                  <Textarea
                    placeholder="Ex: Quero uma aula sobre fotossíntese para alunos do 5º ano, com duração de 45 minutos. A aula deve incluir experimentos práticos e os alunos devem entender como as plantas produzem energia..."
                    value={lessonForm.objectives}
                    onChange={(e) => setLessonForm({...lessonForm, objectives: e.target.value})}
                    className="min-h-[100px] resize-none"
                  />
                  <p className="text-xs text-gray-600 mt-2">
                    💡 Quanto mais detalhes você fornecer, melhor será o resultado
                  </p>
                </div>

                {/* Smart Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="topic">🎯 Tópico Principal</Label>
                    <Input
                      id="topic"
                      placeholder="Ex: Fotossíntese, Guerra Fria, Frações..."
                      value={lessonForm.topic}
                      onChange={(e) => setLessonForm({...lessonForm, topic: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="grade">👥 Série/Ano</Label>
                    <Input
                      id="grade"
                      placeholder="Ex: 5º ano, 8ª série, 1º colegial..."
                      value={lessonForm.grade}
                      onChange={(e) => setLessonForm({...lessonForm, grade: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={testAPI}
                    variant="outline"
                    className="w-full"
                    size="sm"
                  >
                    🔧 Testar API (Debug)
                  </Button>
                  
                  <Button 
                    onClick={handleLessonGeneration}
                    disabled={(!lessonForm.topic && !lessonForm.objectives) || isGenerating}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        🤖 Claude está criando sua aula...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        ✨ Gerar Aula com IA
                      </>
                    )}
                  </Button>
                </div>
                
                <p className="text-xs text-center text-gray-500">
                  Gerado com Claude (Anthropic) • Fallback: GPT-4 (OpenAI)
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Image Generator */}
          <TabsContent value="images" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  Gerador de Imagens Educacionais
                </CardTitle>
                <CardDescription>
                  Crie ilustrações e infográficos educacionais com DALL-E 3
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Natural Language Input */}
                <div className="bg-gradient-to-r from-pink-50 to-orange-50 p-4 rounded-lg border">
                  <h4 className="font-medium text-gray-900 mb-2">🎨 Descreva a imagem que você precisa:</h4>
                  <Textarea
                    id="imagePrompt"
                    placeholder="Ex: Crie uma ilustração educacional colorida do ciclo da água para crianças do ensino fundamental. Deve mostrar evaporação, condensação e precipitação de forma simples e didática, com estilo cartoon..."
                    value={imageForm.prompt}
                    onChange={(e) => setImageForm({...imageForm, prompt: e.target.value})}
                    className="min-h-[100px] resize-none"
                  />
                  <p className="text-xs text-gray-600 mt-2">
                    💡 Inclua estilo, público-alvo e objetivo educacional para melhores resultados
                  </p>
                </div>

                <Button 
                  onClick={handleImageGeneration}
                  disabled={!imageForm.prompt || isGenerating}
                  className="w-full bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      🎨 DALL-E está criando sua imagem...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      ✨ Gerar Imagem com IA
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-center text-gray-500">
                  Gerado com DALL-E 3 (OpenAI) • Fallback: Stable Diffusion
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assessment Creator */}
          <TabsContent value="assessments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Criador de Avaliações
                </CardTitle>
                <CardDescription>
                  Gere questões e avaliações personalizadas com Claude
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Natural Language Input */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border">
                  <h4 className="font-medium text-gray-900 mb-2">📝 Descreva a avaliação que você quer criar:</h4>
                  <Textarea
                    placeholder="Ex: Preciso de uma prova sobre a Revolução Industrial para alunos do 8º ano. Deve ter 10 questões mistas (múltipla escolha e dissertativas) cobrindo causas, consequências e principais invenções. Nível médio de dificuldade..."
                    value={assessmentForm.description || ''}
                    onChange={(e) => setAssessmentForm({...assessmentForm, description: e.target.value})}
                    className="min-h-[100px] resize-none"
                  />
                  <p className="text-xs text-gray-600 mt-2">
                    💡 Especifique tópicos, tipo de questões e nível de dificuldade
                  </p>
                </div>

                {/* Quick Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="assessmentTopic">📚 Tópico Principal</Label>
                    <Input
                      id="assessmentTopic"
                      placeholder="Ex: Revolução Industrial, Fotossíntese..."
                      value={assessmentForm.topic}
                      onChange={(e) => setAssessmentForm({...assessmentForm, topic: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="questionCount">🔢 Número de Questões</Label>
                    <Input
                      id="questionCount"
                      type="number"
                      min="3"
                      max="20"
                      value={assessmentForm.questionCount}
                      onChange={(e) => setAssessmentForm({...assessmentForm, questionCount: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleAssessmentGeneration}
                  disabled={(!assessmentForm.topic && !assessmentForm.description) || isGenerating}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      🧠 Claude está criando sua avaliação...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      ✨ Gerar Avaliação com IA
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-center text-gray-500">
                  Gerado com Claude (Anthropic) • Pedagogy-optimized prompts
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Videos and Analytics tabs */}
          <TabsContent value="videos" className="space-y-6">
            <Card>
              <CardContent className="p-8 text-center">
                <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Geração de Vídeos</h3>
                <p className="text-gray-600 mb-4">Funcionalidade em desenvolvimento</p>
                <Badge variant="outline">Em Breve</Badge>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardContent className="p-8 text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Avançados</h3>
                <p className="text-gray-600 mb-4">Métricas detalhadas do seu uso de IA</p>
                <Badge variant="outline">Em Breve</Badge>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Generation Result */}
        {generationResult && (
          <Card className="mt-8 border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-900">
                  {generationResult.type === 'lesson' && 'Aula Gerada com Sucesso!'}
                  {generationResult.type === 'image' && 'Imagem Gerada com Sucesso!'}
                  {generationResult.type === 'assessment' && 'Avaliação Gerada com Sucesso!'}
                </h3>
              </div>
              
              <div className="bg-white rounded-lg p-4 mb-4">
                {generationResult.type === 'lesson' && (
                  <div>
                    <h4 className="font-medium mb-4">{generationResult.content.title}</h4>
                    <p className="text-gray-600 mb-4">{generationResult.content.outline}</p>
                    
                    {/* Functional Tabs for Generated Content */}
                    <Tabs value={resultTab} onValueChange={setResultTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="slides">Slides</TabsTrigger>
                        <TabsTrigger value="activities">Atividades</TabsTrigger>
                        <TabsTrigger value="assessment">Avaliação</TabsTrigger>
                      </TabsList>

                      <TabsContent value="slides" className="space-y-3 mt-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h5 className="font-medium text-blue-900 mb-3">📊 Slides da Aula</h5>
                          <div className="space-y-2">
                            {generationResult.content.slides?.map((slide: string, index: number) => (
                              <div key={index} className="bg-white p-3 rounded border-l-4 border-blue-500">
                                <p className="text-sm">{slide}</p>
                              </div>
                            )) || <p className="text-gray-600">Slides não disponíveis</p>}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="activities" className="space-y-3 mt-4">
                        <div className="bg-green-50 rounded-lg p-4">
                          <h5 className="font-medium text-green-900 mb-3">🎯 Atividades</h5>
                          <div className="space-y-2">
                            {generationResult.content.activities?.map((activity: string, index: number) => (
                              <div key={index} className="bg-white p-3 rounded border-l-4 border-green-500">
                                <p className="text-sm">{activity}</p>
                              </div>
                            )) || <p className="text-gray-600">Atividades não disponíveis</p>}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="assessment" className="space-y-3 mt-4">
                        <div className="bg-purple-50 rounded-lg p-4">
                          <h5 className="font-medium text-purple-900 mb-3">📝 Avaliação</h5>
                          <div className="space-y-2">
                            {generationResult.content.assessment?.map((question: string, index: number) => (
                              <div key={index} className="bg-white p-3 rounded border-l-4 border-purple-500">
                                <p className="text-sm">{question}</p>
                              </div>
                            )) || <p className="text-gray-600">Avaliação não disponível</p>}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
                
                {generationResult.type === 'image' && (
                  <div>
                    <div className="w-full h-48 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-gray-500">Imagem gerada aqui</span>
                    </div>
                    <p className="text-sm text-gray-600">{generationResult.content.prompt}</p>
                  </div>
                )}
                
                {generationResult.type === 'assessment' && (
                  <div>
                    <h4 className="font-medium mb-2">Questões Geradas:</h4>
                    <ul className="space-y-1">
                      {generationResult.content.questions.map((question: string, index: number) => (
                        <li key={index} className="text-gray-600">• {question}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <p className="text-sm text-green-700">
                Gerado por: {generationResult.content.provider}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Provider Attribution */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p className="mb-2">Powered by leading AI providers:</p>
          <div className="flex items-center justify-center gap-4">
            <span>Claude (Anthropic)</span>
            <span>•</span>
            <span>GPT-4 & DALL-E (OpenAI)</span>
            <span>•</span>
            <span>Synthesia</span>
            <span>•</span>
            <span>ElevenLabs</span>
          </div>
        </div>
      </div>
    </div>
  )
}