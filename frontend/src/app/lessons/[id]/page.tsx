'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Play, CheckCircle, Clock, BookOpen, Video, Users, Award, Download, ExternalLink, Calendar } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function LessonDetailPage() {
  const { user, isAuthenticated, logout, isLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const lessonId = params.id as string
  const [videoCompleted, setVideoCompleted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Mock lesson data - in production this would come from API
  const lessonsData = {
    '1': {
      title: 'Planejamento de Aulas com IA',
      module: 'Survivor - IA na Prática',
      duration: '45 min',
      description: 'Aprenda a usar ChatGPT, Claude e outras ferramentas para criar planos de aula eficazes e personalizados',
      ageGroup: 'Ensino Fundamental',
      objectives: [
        'Dominar prompts eficazes para criação de planos de aula',
        'Personalizar conteúdo para diferentes níveis de aprendizado',
        'Integrar múltiplas ferramentas de IA no planejamento',
        'Criar avaliações alinhadas com BNCC'
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
      liveSession: {
        date: '2024-12-15',
        time: '19:00',
        instructor: 'Prof. Ana Silva',
        registered: true
      },
      content: {
        theory: `
# Planejamento de Aulas com IA

## 1. Introdução às Ferramentas de IA para Educação

### ChatGPT para Planos de Aula
O ChatGPT é uma das ferramentas mais versáteis para criação de conteúdo educacional. Aqui estão os principais usos:

**Prompts Eficazes:**
- "Crie um plano de aula de 50 minutos sobre [TÓPICO] para alunos do [ANO], incluindo objetivos BNCC, atividades práticas e avaliação"
- "Adapte este conteúdo para alunos com dificuldades de aprendizagem: [CONTEÚDO]"
- "Sugira 5 atividades lúdicas para ensinar [CONCEITO] para crianças de [IDADE]"

### Claude para Análise Pedagógica
Claude excele em análise detalhada e estruturação pedagógica:

**Exemplos de Uso:**
- Análise de competências BNCC
- Criação de rubricas de avaliação
- Desenvolvimento de sequências didáticas

### Ferramentas Complementares
1. **Gamma** - Apresentações automáticas
2. **Canva + IA** - Materiais visuais
3. **Notion AI** - Organização de planos
4. **Grammarly** - Correção de textos

## 2. Implementação Prática

### Passo 1: Definir Objetivos
Antes de usar IA, tenha claro:
- Faixa etária dos alunos
- Competências da BNCC a desenvolver
- Tempo disponível
- Recursos materiais

### Passo 2: Prompts Estruturados
Use esta estrutura base:

\`\`\`
CONTEXTO: Sou professor(a) de [DISCIPLINA] para [ANO/SÉRIE]
OBJETIVO: Criar plano de aula sobre [TÓPICO]
DURAÇÃO: [TEMPO] minutos
RECURSOS: [MATERIAIS DISPONÍVEIS]
COMPETÊNCIAS BNCC: [CÓDIGOS ESPECÍFICOS]

Por favor, crie um plano detalhado incluindo:
1. Objetivos específicos
2. Metodologia ativa
3. Recursos necessários  
4. Avaliação formativa
5. Adaptações para inclusão
\`\`\`

### Passo 3: Personalização
Adapte o conteúdo gerado para:
- Realidade local dos alunos
- Recursos disponíveis na escola
- Particularidades da turma
- Calendário escolar

## 3. Ferramentas Práticas por Disciplina

### Matemática
- **Photomath** - Resolução de problemas
- **GeoGebra + IA** - Visualizações
- **Khan Academy** - Exercícios adaptativos

### Português  
- **QuillBot** - Paráfrases e escritura
- **Wordtune** - Melhoria de textos
- **GPT-4** - Análise literária

### Ciências
- **Wolfram Alpha** - Cálculos científicos
- **ChemSketch** - Moléculas 3D
- **NASA Eyes** - Simulações espaciais

### História
- **TimelineJS** - Linhas do tempo interativas
- **Historypin** - Mapas históricos
- **AI Dungeon** - Simulações históricas

## 4. Avaliação e Acompanhamento

### Métricas de Sucesso
- Engajamento dos alunos
- Tempo economizado no planejamento
- Qualidade das atividades criadas
- Alinhamento com BNCC

### Próximos Passos
1. Pratique os prompts apresentados
2. Teste com uma aula piloto
3. Colete feedback dos alunos
4. Refine sua abordagem
        `,
        aiTools: [
          {
            name: 'ChatGPT',
            description: 'Criação de planos de aula detalhados',
            url: 'https://chat.openai.com',
            useCase: 'Planejamento geral e atividades'
          },
          {
            name: 'Claude',
            description: 'Análise pedagógica profunda',
            url: 'https://claude.ai',
            useCase: 'Estruturação didática e BNCC'
          },
          {
            name: 'Gamma',
            description: 'Apresentações automáticas',
            url: 'https://gamma.app',
            useCase: 'Slides para aulas'
          },
          {
            name: 'Notion AI',
            description: 'Organização de conteúdo',
            url: 'https://notion.so',
            useCase: 'Banco de planos de aula'
          }
        ]
      },
      quiz: [
        {
          question: 'Qual é a estrutura básica de um prompt eficaz para planejamento de aulas?',
          options: [
            'Apenas o tópico da aula',
            'Contexto, objetivo, duração, recursos e competências BNCC',
            'Só os objetivos de aprendizagem',
            'Apenas a metodologia'
          ],
          correct: 1
        },
        {
          question: 'Para qual tipo de análise o Claude é mais recomendado?',
          options: [
            'Criação de jogos',
            'Análise pedagógica e estruturação didática',
            'Edição de vídeos',
            'Criação de músicas'
          ],
          correct: 1
        },
        {
          question: 'Quais elementos devem ser personalizados após gerar conteúdo com IA?',
          options: [
            'Apenas o título da aula',
            'Somente os objetivos',
            'Realidade local, recursos, particularidades da turma e calendário',
            'Apenas a duração'
          ],
          correct: 2
        }
      ],
      assignment: {
        title: 'Projeto Prático: Seu Primeiro Plano com IA',
        description: 'Crie um plano de aula completo usando as técnicas aprendidas',
        requirements: [
          'Escolha um tópico da sua disciplina',
          'Use pelo menos 2 ferramentas de IA diferentes',
          'Inclua objetivos alinhados à BNCC',
          'Crie atividades práticas e avaliação',
          'Documente o processo usado'
        ],
        submission: 'Upload do plano em PDF + relatório do processo'
      }
    },
    '2': {
      title: 'Feedback Personalizado para Alunos',
      module: 'Survivor - IA na Prática',
      duration: '40 min',
      description: 'Aprenda a usar IA para criar feedback construtivo e personalizado que acelera o aprendizado',
      ageGroup: 'Ensino Fundamental',
      objectives: [
        'Gerar feedback específico e construtivo',
        'Personalizar comentários por perfil de aluno',
        'Usar IA para identificar padrões de erro',
        'Criar planos de desenvolvimento individual'
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      liveSession: {
        date: '2024-12-18',
        time: '19:30',
        instructor: 'Prof. Carlos Mendes',
        registered: false
      },
      content: {
        theory: `
# Feedback Personalizado com IA

## 1. A Importância do Feedback Personalizado

### Por que Personalizar?
- Cada aluno tem ritmo único de aprendizagem
- Feedback genérico não gera engajamento
- IA permite escala sem perder qualidade
- Dados comportamentais melhoram precisão

### Ferramentas Principais
1. **ChatGPT** - Feedback narrativo personalizado
2. **Claude** - Análise comportamental detalhada
3. **Gemini** - Sugestões de melhoria específicas
4. **Grammarly** - Feedback em português

## 2. Técnicas de Prompting para Feedback

### Template Base
\`\`\`
CONTEXTO: Sou professor(a) de [DISCIPLINA] avaliando [ATIVIDADE]
PERFIL DO ALUNO: [CARACTERÍSTICAS: tímido/extrovertido, visual/auditivo, etc.]
DESEMPENHO: [NOTA/CONCEITO] com [PONTOS FORTES] e [DIFICULDADES]
OBJETIVO: Feedback que motive e oriente próximos passos

Crie feedback personalizado incluindo:
1. Reconhecimento dos pontos fortes
2. Orientações específicas para melhoria  
3. Próximos passos práticos
4. Tom encorajador e construtivo
\`\`\`

### Exemplos Práticos

**Aluno Visual com Dificuldade em Matemática:**
"João, percebi que você compreende melhor quando usa desenhos! Seus gráficos no problema 3 estavam perfeitos. Para melhorar nas equações, que tal criar esquemas visuais para cada passo? Experimente desenhar balança para equações de 1º grau."

**Aluna Perfeccionista com Ansiedade:**
"Maria, sua redação tem argumentação excelente! Vi que você domina a estrutura dissertativa. Para a próxima, que tal focar em apenas 2 argumentos bem desenvolvidos? Qualidade vale mais que quantidade, e você já mostra isso nos seus textos."

## 3. IA para Análise de Padrões

### Identificação de Erros Recorrentes
Use IA para analisar conjunto de atividades:

\`\`\`
Analise estas 5 atividades do aluno:
[ANEXAR TRABALHOS]

Identifique:
1. Padrões de erro
2. Conceitos não compreendidos
3. Estratégias que funcionaram
4. Recomendações específicas
\`\`\`

### Planos de Desenvolvimento Individual
Após análise, gere planos personalizados:

\`\`\`
Com base na análise, crie plano de 4 semanas para este aluno:
- Semana 1: [FOCO PRINCIPAL]
- Semana 2: [DESENVOLVIMENTO]
- Semana 3: [PRÁTICA]
- Semana 4: [CONSOLIDAÇÃO]

Inclua atividades específicas e marcos de progresso.
\`\`\`

## 4. Implementação em Diferentes Disciplinas

### Português
- Análise de produção textual
- Feedback sobre coesão e coerência
- Sugestões de vocabulário
- Correção gramatical contextualizada

### Matemática
- Identificação de erros conceituais
- Estratégias alternativas de resolução
- Conexão com aplicações práticas
- Progressão de dificuldade personalizada

### Ciências
- Feedback sobre hipóteses e experimentos
- Correção de conceitos científicos
- Incentivo à curiosidade investigativa
- Conexão teoria-prática

### História
- Análise de argumentação histórica
- Feedback sobre fontes e evidências
- Desenvolvimento de pensamento crítico
- Contextualização temporal

## 5. Automatização e Escala

### Formulários Inteligentes
Crie templates que se adaptam automaticamente:

1. **Input**: Tipo de atividade + desempenho
2. **Processamento**: IA analisa e personaliza
3. **Output**: Feedback específico e acionável

### Banco de Dados de Feedback
Construa biblioteca de:
- Frases motivacionais por perfil
- Sugestões específicas por dificuldade
- Próximos passos por competência
- Recursos complementares

### Métricas de Efetividade
Acompanhe:
- Taxa de melhoria pós-feedback
- Engajamento dos alunos
- Tempo economizado na correção
- Satisfação familiar

## 6. Ética e Cuidados

### Privacidade
- Nunca compartilhe dados individuais
- Use termos genéricos em exemplos
- Respeite LGPD

### Bias e Inclusão
- Teste feedback com perfis diversos
- Evite estereótipos
- Inclua perspectivas múltiplas

### Transparência
- Explique aos alunos uso de IA
- Mantenha o toque humano
- Combine IA com interação presencial
        `,
        aiTools: [
          {
            name: 'ChatGPT',
            description: 'Feedback narrativo personalizado',
            url: 'https://chat.openai.com',
            useCase: 'Comentários detalhados e motivacionais'
          },
          {
            name: 'Claude',
            description: 'Análise comportamental profunda',
            url: 'https://claude.ai',
            useCase: 'Identificação de padrões de aprendizagem'
          },
          {
            name: 'Grammarly',
            description: 'Correção contextualizada',
            url: 'https://grammarly.com',
            useCase: 'Feedback linguístico preciso'
          },
          {
            name: 'Turnitin',
            description: 'Feedback automatizado para redações',
            url: 'https://turnitin.com',
            useCase: 'Análise de originalidade e estrutura'
          }
        ]
      },
      quiz: [
        {
          question: 'Qual é o elemento mais importante para feedback eficaz com IA?',
          options: [
            'Usar linguagem técnica',
            'Personalizar para o perfil do aluno',
            'Ser sempre crítico',
            'Focar apenas nos erros'
          ],
          correct: 1
        },
        {
          question: 'Como a IA pode ajudar a identificar padrões de erro?',
          options: [
            'Apenas corrigindo gramática',
            'Analisando conjunto de atividades do aluno',
            'Substituindo o professor',
            'Criando provas mais difíceis'
          ],
          correct: 1
        },
        {
          question: 'Qual cuidado ético é essencial ao usar IA para feedback?',
          options: [
            'Sempre criticar o aluno',
            'Usar dados de outros alunos como exemplo',
            'Respeitar privacidade e evitar estereótipos',
            'Nunca dar feedback positivo'
          ],
          correct: 2
        }
      ],
      assignment: {
        title: 'Projeto: Sistema de Feedback Personalizado',
        description: 'Desenvolva um sistema de feedback para sua disciplina',
        requirements: [
          'Crie 3 templates de feedback para diferentes perfis',
          'Teste com atividades reais de alunos',
          'Documente os resultados',
          'Desenvolva métricas de acompanhamento',
          'Apresente casos de sucesso'
        ],
        submission: 'Portfólio com templates + relatório de implementação'
      }
    }
  }

  const lesson = lessonsData[lessonId as keyof typeof lessonsData]

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Aula não encontrada</h2>
          <Link href="/modules">
            <Button>Voltar aos Módulos</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleQuizAnswer = (answerIndex: number) => {
    if (answerIndex === lesson.quiz[currentQuestion].correct) {
      setQuizScore(quizScore + 1)
    }
    
    if (currentQuestion < lesson.quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/modules/2">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Módulo
                </Button>
              </Link>
              <Link href="/" className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold teach-gradient bg-clip-text text-transparent">
                  TEACH
                </h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Olá, {user.name}</span>
              <Button variant="outline" size="sm" onClick={logout}>
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Lesson Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Badge variant="outline" className="mb-2">{lesson.module}</Badge>
                <CardTitle className="text-2xl mb-2">{lesson.title}</CardTitle>
                <CardDescription className="text-lg mb-4">
                  {lesson.description}
                </CardDescription>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {lesson.duration}
                  </span>
                  <span className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {lesson.ageGroup}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-2">Objetivos da Aula:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                {lesson.objectives.map((obj, index) => (
                  <li key={index}>{obj}</li>
                ))}
              </ul>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="video" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="video">📹 Vídeo</TabsTrigger>
            <TabsTrigger value="content">📚 Conteúdo</TabsTrigger>
            <TabsTrigger value="tools">🤖 Ferramentas</TabsTrigger>
            <TabsTrigger value="quiz">❓ Quiz</TabsTrigger>
            <TabsTrigger value="assignment">📝 Atividade</TabsTrigger>
          </TabsList>

          {/* Video Content */}
          <TabsContent value="video" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Async Video */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Video className="mr-2 h-5 w-5" />
                    Aula Gravada (Assíncrona)
                  </CardTitle>
                  <CardDescription>
                    Assista quando quiser, pause e retome conforme necessário
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                    <iframe
                      width="100%"
                      height="100%"
                      src={lesson.videoUrl}
                      title={lesson.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Progress value={videoCompleted ? 100 : 45} className="w-32 h-2" />
                      <span className="text-sm text-gray-600">
                        {videoCompleted ? '100%' : '45%'} concluído
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => setVideoCompleted(true)}
                      disabled={videoCompleted}
                    >
                      {videoCompleted ? <CheckCircle className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                      {videoCompleted ? 'Concluído' : 'Marcar como Assistido'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Live Session */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Aula Ao Vivo (Síncrona)
                  </CardTitle>
                  <CardDescription>
                    Interação direta com o instrutor
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm space-y-2">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(lesson.liveSession.date).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {lesson.liveSession.time}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {lesson.liveSession.instructor}
                    </div>
                  </div>
                  
                  {lesson.liveSession.registered ? (
                    <div className="space-y-2">
                      <Badge variant="default" className="w-full justify-center">
                        ✅ Inscrito
                      </Badge>
                      <Button className="w-full" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Adicionar ao Calendário
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full">
                      Inscrever-se na Aula
                    </Button>
                  )}
                  
                  <p className="text-xs text-gray-500">
                    A gravação ficará disponível após a aula ao vivo
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Material de Estudo</CardTitle>
                <CardDescription>
                  Conteúdo detalhado da aula com exemplos práticos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ 
                    __html: lesson.content.theory.replace(/\n/g, '<br>').replace(/###/g, '<h3>').replace(/##/g, '<h2>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                  }} />
                </div>
                
                <div className="mt-8 flex space-x-4">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Baixar PDF
                  </Button>
                  <Button variant="outline">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Imprimir Material
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Tools Tab */}
          <TabsContent value="tools">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lesson.content.aiTools.map((tool, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {tool.name}
                      <Badge variant="secondary">{tool.useCase}</Badge>
                    </CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        <strong>Caso de Uso:</strong> {tool.useCase}
                      </p>
                      <div className="flex space-x-2">
                        <Button asChild size="sm" className="flex-1">
                          <a href={tool.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Acessar Ferramenta
                          </a>
                        </Button>
                        <Button variant="outline" size="sm">
                          Ver Tutorial
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Quiz Tab */}
          <TabsContent value="quiz">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Quiz de Verificação
                  <Badge variant="outline">
                    {currentQuestion + 1} de {lesson.quiz.length}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Teste seus conhecimentos sobre o conteúdo da aula
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentQuestion < lesson.quiz.length ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        {lesson.quiz[currentQuestion].question}
                      </h3>
                      <div className="space-y-2">
                        {lesson.quiz[currentQuestion].options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full justify-start text-left h-auto py-3"
                            onClick={() => handleQuizAnswer(index)}
                          >
                            <span className="mr-3 font-bold">{String.fromCharCode(65 + index)})</span>
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="text-6xl">
                      {quizScore / lesson.quiz.length >= 0.7 ? '🎉' : '📚'}
                    </div>
                    <h3 className="text-xl font-bold">
                      Quiz Concluído!
                    </h3>
                    <p className="text-lg">
                      Você acertou {quizScore} de {lesson.quiz.length} questões 
                      ({Math.round((quizScore / lesson.quiz.length) * 100)}%)
                    </p>
                    {quizScore / lesson.quiz.length >= 0.7 ? (
                      <div className="space-y-2">
                        <Badge variant="default" className="px-4 py-2">
                          ✅ Aprovado! Nota mínima atingida (70%)
                        </Badge>
                        <p className="text-sm text-gray-600">
                          Parabéns! Você pode prosseguir para a próxima aula.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Badge variant="destructive" className="px-4 py-2">
                          📖 Continue Estudando (Mínimo: 70%)
                        </Badge>
                        <p className="text-sm text-gray-600">
                          Revise o material e tente novamente.
                        </p>
                        <Button 
                          onClick={() => {
                            setCurrentQuestion(0)
                            setQuizScore(0)
                          }}
                        >
                          Tentar Novamente
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assignment Tab */}
          <TabsContent value="assignment">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  {lesson.assignment.title}
                </CardTitle>
                <CardDescription>{lesson.assignment.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Requisitos:</h4>
                  <ul className="space-y-2">
                    {lesson.assignment.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Entrega:</h4>
                  <p className="text-sm text-blue-800">{lesson.assignment.submission}</p>
                </div>
                
                <div className="flex space-x-4">
                  <Button className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Enviar Atividade
                  </Button>
                  <Button variant="outline">
                    Ver Exemplos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Progress Actions */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="font-medium">Progresso da Aula:</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <Progress value={75} className="w-32 h-2" />
                    <span className="text-gray-600">75%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Aula Anterior
                </Button>
                <Button>
                  Próxima Aula
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}