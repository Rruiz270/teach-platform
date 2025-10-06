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
    difficulty: 'medium'
  })

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className=\"min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50\">
        <div className=\"text-center\">
          <div className=\"animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4\"></div>
          <p className=\"text-gray-600\">Carregando Workspace IA...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleLessonGeneration = async () => {
    setIsGenerating(true)
    setGenerationResult(null)
    
    try {
      // Simulate API call - replace with actual API call when backend is ready
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      setGenerationResult({
        type: 'lesson',
        content: {
          title: `Aula: ${lessonForm.topic}`,
          outline: 'Roteiro da aula gerado com IA',
          materials: ['Slides', 'Atividades', 'Avaliação'],
          provider: 'Claude (Anthropic)'
        }
      })
    } catch (error) {
      console.error('Erro ao gerar aula:', error)
    } finally {
      setIsGenerating(false)
    }
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
    <div className=\"min-h-screen bg-gradient-to-br from-purple-50 to-blue-50\">
      {/* Header */}
      <header className=\"bg-white shadow-sm border-b\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
          <div className=\"flex justify-between items-center h-16\">
            <div className=\"flex items-center space-x-4\">
              <Link href=\"/dashboard\">
                <Button variant=\"ghost\" size=\"sm\">
                  <ArrowLeft className=\"mr-2 h-4 w-4\" />
                  Voltar
                </Button>
              </Link>
              <div className=\"flex items-center space-x-2\">
                <Sparkles className=\"h-8 w-8 text-purple-600\" />
                <h1 className=\"text-2xl font-bold text-gray-900\">
                  Workspace IA
                </h1>
              </div>
            </div>
            <div className=\"flex items-center space-x-4\">
              <Badge variant={usageStats.plan === 'FREE' ? 'secondary' : 'default'}>
                Plano {usageStats.plan}
              </Badge>
              <span className=\"text-sm text-gray-600\">Olá, {user.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8\">
        {/* Usage Overview */}
        <div className=\"mb-8\">
          <h2 className=\"text-lg font-semibold text-gray-900 mb-4\">📊 Uso Mensal</h2>
          <div className=\"grid grid-cols-1 md:grid-cols-3 gap-4\">
            <Card>
              <CardContent className=\"p-4\">
                <div className=\"flex justify-between items-center mb-2\">
                  <span className=\"text-sm font-medium\">Tokens de Texto</span>
                  <span className=\"text-sm text-gray-500\">
                    {usageStats.textTokens.toLocaleString()} / {usageStats.textTokensLimit.toLocaleString()}
                  </span>
                </div>
                <Progress value={getUsagePercentage(usageStats.textTokens, usageStats.textTokensLimit)} className=\"h-2\" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className=\"p-4\">
                <div className=\"flex justify-between items-center mb-2\">
                  <span className=\"text-sm font-medium\">Imagens Geradas</span>
                  <span className=\"text-sm text-gray-500\">
                    {usageStats.imageGenerations} / {usageStats.imageGenerationsLimit}
                  </span>
                </div>
                <Progress value={getUsagePercentage(usageStats.imageGenerations, usageStats.imageGenerationsLimit)} className=\"h-2\" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className=\"p-4\">
                <div className=\"flex justify-between items-center mb-2\">
                  <span className=\"text-sm font-medium\">Minutos de Vídeo</span>
                  <span className=\"text-sm text-gray-500\">
                    {usageStats.videoMinutes} / {usageStats.videoMinutesLimit}
                  </span>
                </div>
                <Progress value={getUsagePercentage(usageStats.videoMinutes, usageStats.videoMinutesLimit)} className=\"h-2\" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Workspace */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className=\"space-y-6\">
          <TabsList className=\"grid w-full grid-cols-5 lg:w-[600px]\">
            <TabsTrigger value=\"lessons\" className=\"flex items-center gap-2\">
              <FileText className=\"w-4 h-4\" />
              Aulas
            </TabsTrigger>
            <TabsTrigger value=\"images\" className=\"flex items-center gap-2\">
              <Image className=\"w-4 h-4\" />
              Imagens
            </TabsTrigger>
            <TabsTrigger value=\"videos\" className=\"flex items-center gap-2\">
              <Video className=\"w-4 h-4\" />
              Vídeos
            </TabsTrigger>
            <TabsTrigger value=\"assessments\" className=\"flex items-center gap-2\">
              <Brain className=\"w-4 h-4\" />
              Avaliações
            </TabsTrigger>
            <TabsTrigger value=\"analytics\" className=\"flex items-center gap-2\">
              <BarChart3 className=\"w-4 h-4\" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Lesson Builder */}
          <TabsContent value=\"lessons\" className=\"space-y-6\">
            <Card>
              <CardHeader>
                <CardTitle className=\"flex items-center gap-2\">
                  <FileText className=\"w-5 h-5\" />
                  Criador de Aulas com IA
                </CardTitle>
                <CardDescription>
                  Gere aulas completas com roteiro, atividades e materiais usando Claude (Anthropic)
                </CardDescription>
              </CardHeader>
              <CardContent className=\"space-y-4\">
                <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
                  <div>
                    <Label htmlFor=\"topic\">Tópico da Aula</Label>
                    <Input
                      id=\"topic\"
                      placeholder=\"Ex: Fotossíntese, Guerra Fria, Frações...\"
                      value={lessonForm.topic}
                      onChange={(e) => setLessonForm({...lessonForm, topic: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor=\"grade\">Série/Ano</Label>
                    <Input
                      id=\"grade\"
                      placeholder=\"Ex: 5º ano, 8ª série, 1º colegial...\"
                      value={lessonForm.grade}
                      onChange={(e) => setLessonForm({...lessonForm, grade: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor=\"objectives\">Objetivos de Aprendizagem (Opcional)</Label>
                  <Textarea
                    id=\"objectives\"
                    placeholder=\"Descreva o que os alunos devem aprender...\"
                    value={lessonForm.objectives}
                    onChange={(e) => setLessonForm({...lessonForm, objectives: e.target.value})}
                  />
                </div>

                <Button 
                  onClick={handleLessonGeneration}
                  disabled={!lessonForm.topic || !lessonForm.grade || isGenerating}
                  className=\"w-full\"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className=\"mr-2 h-4 w-4 animate-spin\" />
                      Gerando aula com IA...
                    </>
                  ) : (
                    <>
                      <Wand2 className=\"mr-2 h-4 w-4\" />
                      Gerar Aula com IA
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Image Generator */}
          <TabsContent value=\"images\" className=\"space-y-6\">
            <Card>
              <CardHeader>
                <CardTitle className=\"flex items-center gap-2\">
                  <Image className=\"w-5 h-5\" />
                  Gerador de Imagens Educacionais
                </CardTitle>
                <CardDescription>
                  Crie ilustrações e infográficos educacionais com DALL-E 3
                </CardDescription>
              </CardHeader>
              <CardContent className=\"space-y-4\">
                <div>
                  <Label htmlFor=\"imagePrompt\">Descrição da Imagem</Label>
                  <Textarea
                    id=\"imagePrompt\"
                    placeholder=\"Ex: Ilustração educacional do ciclo da água para crianças...\"
                    value={imageForm.prompt}
                    onChange={(e) => setImageForm({...imageForm, prompt: e.target.value})}
                  />
                </div>

                <Button 
                  onClick={handleImageGeneration}
                  disabled={!imageForm.prompt || isGenerating}
                  className=\"w-full\"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className=\"mr-2 h-4 w-4 animate-spin\" />
                      Gerando imagem...
                    </>
                  ) : (
                    <>
                      <Wand2 className=\"mr-2 h-4 w-4\" />
                      Gerar Imagem com IA
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assessment Creator */}
          <TabsContent value=\"assessments\" className=\"space-y-6\">
            <Card>
              <CardHeader>
                <CardTitle className=\"flex items-center gap-2\">
                  <Brain className=\"w-5 h-5\" />
                  Criador de Avaliações
                </CardTitle>
                <CardDescription>
                  Gere questões e avaliações personalizadas com Claude
                </CardDescription>
              </CardHeader>
              <CardContent className=\"space-y-4\">
                <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
                  <div>
                    <Label htmlFor=\"assessmentTopic\">Tópico da Avaliação</Label>
                    <Input
                      id=\"assessmentTopic\"
                      placeholder=\"Ex: Revolução Industrial\"
                      value={assessmentForm.topic}
                      onChange={(e) => setAssessmentForm({...assessmentForm, topic: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor=\"questionCount\">Número de Questões</Label>
                    <Input
                      id=\"questionCount\"
                      type=\"number\"
                      min=\"3\"
                      max=\"20\"
                      value={assessmentForm.questionCount}
                      onChange={(e) => setAssessmentForm({...assessmentForm, questionCount: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleAssessmentGeneration}
                  disabled={!assessmentForm.topic || isGenerating}
                  className=\"w-full\"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className=\"mr-2 h-4 w-4 animate-spin\" />
                      Gerando avaliação...
                    </>
                  ) : (
                    <>
                      <Wand2 className=\"mr-2 h-4 w-4\" />
                      Gerar Avaliação com IA
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Videos and Analytics tabs */}
          <TabsContent value=\"videos\" className=\"space-y-6\">
            <Card>
              <CardContent className=\"p-8 text-center\">
                <Video className=\"w-12 h-12 text-gray-400 mx-auto mb-4\" />
                <h3 className=\"text-lg font-semibold text-gray-900 mb-2\">Geração de Vídeos</h3>
                <p className=\"text-gray-600 mb-4\">Funcionalidade em desenvolvimento</p>
                <Badge variant=\"outline\">Em Breve</Badge>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value=\"analytics\" className=\"space-y-6\">
            <Card>
              <CardContent className=\"p-8 text-center\">
                <BarChart3 className=\"w-12 h-12 text-gray-400 mx-auto mb-4\" />
                <h3 className=\"text-lg font-semibold text-gray-900 mb-2\">Analytics Avançados</h3>
                <p className=\"text-gray-600 mb-4\">Métricas detalhadas do seu uso de IA</p>
                <Badge variant=\"outline\">Em Breve</Badge>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Generation Result */}
        {generationResult && (
          <Card className=\"mt-8 border-green-200 bg-green-50\">
            <CardContent className=\"p-6\">
              <div className=\"flex items-center gap-2 mb-4\">
                <CheckCircle className=\"w-5 h-5 text-green-600\" />
                <h3 className=\"font-semibold text-green-900\">
                  {generationResult.type === 'lesson' && 'Aula Gerada com Sucesso!'}
                  {generationResult.type === 'image' && 'Imagem Gerada com Sucesso!'}
                  {generationResult.type === 'assessment' && 'Avaliação Gerada com Sucesso!'}
                </h3>
              </div>
              
              <div className=\"bg-white rounded-lg p-4 mb-4\">
                {generationResult.type === 'lesson' && (
                  <div>
                    <h4 className=\"font-medium mb-2\">{generationResult.content.title}</h4>
                    <p className=\"text-gray-600 mb-2\">{generationResult.content.outline}</p>
                    <div className=\"flex gap-2\">
                      {generationResult.content.materials.map((material: string, index: number) => (
                        <Badge key={index} variant=\"outline\">{material}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {generationResult.type === 'image' && (
                  <div>
                    <div className=\"w-full h-48 bg-gray-200 rounded-lg mb-2 flex items-center justify-center\">
                      <span className=\"text-gray-500\">Imagem gerada aqui</span>
                    </div>
                    <p className=\"text-sm text-gray-600\">{generationResult.content.prompt}</p>
                  </div>
                )}
                
                {generationResult.type === 'assessment' && (
                  <div>
                    <h4 className=\"font-medium mb-2\">Questões Geradas:</h4>
                    <ul className=\"space-y-1\">
                      {generationResult.content.questions.map((question: string, index: number) => (
                        <li key={index} className=\"text-gray-600\">• {question}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <p className=\"text-sm text-green-700\">
                Gerado por: {generationResult.content.provider}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Provider Attribution */}
        <div className=\"mt-8 text-center text-sm text-gray-500\">
          <p className=\"mb-2\">Powered by leading AI providers:</p>
          <div className=\"flex items-center justify-center gap-4\">
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
}"