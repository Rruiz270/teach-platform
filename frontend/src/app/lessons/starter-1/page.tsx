'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft, Play, CheckCircle, Clock, BookOpen, Video, Users, Award, Download, ExternalLink, Calendar, Brain } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function StarterLesson1Page() {
  const { user, isAuthenticated, logout, isLoading } = useAuth()
  const router = useRouter()
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

  const lesson = {
    title: 'O que é Inteligência Artificial?',
    module: 'Starter - Fundamentos de IA',
    duration: '30 min',
    description: 'Fundamentos essenciais da Inteligência Artificial: conceitos, história e aplicações práticas para educadores',
    ageGroup: 'Todos os Níveis',
    level: 'Iniciante',
    objectives: [
      'Compreender o conceito fundamental de Inteligência Artificial',
      'Conhecer a história e evolução da IA',
      'Identificar aplicações práticas da IA no cotidiano',
      'Reconhecer o potencial da IA na educação brasileira'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    liveSession: {
      date: '2024-12-15',
      time: '19:00',
      instructor: 'AI MAESTRO',
      duration: '90 min',
      registered: false,
      description: 'Aula inaugural sobre IA na educação com o AI MAESTRO'
    },
    content: {
      theory: `
# O que é Inteligência Artificial?

## 1. Conceitos Fundamentais

### Definição de Inteligência Artificial
**Inteligência Artificial (IA)** é a capacidade de máquinas realizarem tarefas que normalmente requerem inteligência humana, como:
- **Aprendizagem** - Adquirir conhecimento através da experiência
- **Raciocínio** - Resolver problemas usando lógica
- **Percepção** - Interpretar dados sensoriais
- **Comunicação** - Interagir usando linguagem natural

### Tipos de IA

#### 1. IA Estreita (Narrow AI) - **Atual**
- Especializada em tarefas específicas
- **Exemplos**: Siri, Google Translate, recomendações Netflix
- **Na Educação**: ChatGPT para criar planos de aula

#### 2. IA Geral (AGI) - **Futuro**
- Iguala capacidade humana em todas as tarefas
- Ainda não existe, previsão para 2030-2050

#### 3. Super IA - **Hipotético**
- Supera inteligência humana
- Cenário de ficção científica

## 2. História da Inteligência Artificial

### Timeline Essencial

**1950** - Alan Turing propõe o "Teste de Turing"
**1956** - Termo "Inteligência Artificial" cunhado na Conferência de Dartmouth
**1960s** - Primeiros programas de IA: ELIZA (chatbot)
**1980s** - Sistemas especialistas nas empresas
**1997** - Deep Blue vence campeão mundial de xadrez
**2011** - Watson da IBM vence no Jeopardy!
**2016** - AlphaGo vence campeão mundial de Go
**2020** - GPT-3 revoluciona processamento de linguagem
**2022** - ChatGPT democratiza IA para o público geral
**2023** - Boom da IA Generativa na educação

### Marcos Brasileiros
- **2019** - Estratégia Brasileira de IA lançada pelo governo
- **2020** - Primeiras aplicações de IA em educação pública
- **2023** - Diretrizes do MEC para uso de IA nas escolas
- **2024** - TEACH Platform pioneers IA education for teachers

## 3. Como a IA Funciona (Simplificado)

### Machine Learning (Aprendizado de Máquina)
```
DADOS → ALGORITMO → MODELO → PREDIÇÕES
```

**Exemplo Prático:**
1. **Dados**: 10.000 redações de alunos com notas
2. **Algoritmo**: Analisa padrões entre texto e notas
3. **Modelo**: "Aprende" o que caracteriza uma boa redação
4. **Predição**: Consegue avaliar novas redações automaticamente

### Deep Learning (Aprendizado Profundo)
- Inspirado no cérebro humano
- Redes neurais artificiais com múltiplas camadas
- **Aplicação**: ChatGPT usa 175 bilhões de "neurônios"

### Processamento de Linguagem Natural (NLP)
- IA entende e gera texto humano
- **Exemplos**: Google Translate, ChatGPT, Claude
- **Na Educação**: Correção automática, geração de conteúdo

## 4. IA no Cotidiano Brasileiro

### Aplicações que Você Já Usa
- **Netflix/Spotify** - Recomendações personalizadas
- **WhatsApp** - Detecção de spam
- **Waze/Google Maps** - Rotas otimizadas
- **Bancos** - Detecção de fraude
- **E-commerce** - Recomendações de produtos
- **Redes Sociais** - Curadoria de conteúdo

### Assistentes Virtuais
- **Alexa/Google Assistant** - Controle doméstico
- **Siri** - Assistente pessoal
- **Cortana** - Produtividade empresarial

### Aplicações Profissionais
- **Medicina** - Diagnóstico por imagem
- **Agricultura** - Monitoramento de plantações
- **Transporte** - Carros autônomos
- **Segurança** - Reconhecimento facial

## 5. IA na Educação Mundial

### Casos de Sucesso Internacionais

#### Estados Unidos
- **Carnegie Learning** - Matemática adaptativa
- **Duolingo** - Idiomas personalizados
- **Grammarly** - Correção automática de textos

#### China
- **Squirrel AI** - Tutoria personalizada para 4 milhões de alunos
- **VIPKID** - Aulas de inglês com IA

#### Finlândia
- **Claned** - Plataforma de aprendizado social
- **ViLLE** - Exercícios adaptativos

#### Reino Unido
- **Century Tech** - Aprendizado personalizado
- **Third Space Learning** - Tutoria de matemática

### Resultados Comprovados
- **30% melhoria** na retenção de conteúdo
- **40% redução** no tempo de correção
- **50% aumento** no engajamento dos alunos
- **25% economia** nos custos educacionais

## 6. IA na Educação Brasileira

### Cenário Atual
- **83%** das escolas brasileiras ainda não usam IA
- **67%** dos professores nunca interagiram com IA
- **Apenas 12%** das universidades têm cursos específicos
- **São Paulo e Rio** lideram a adoção

### Iniciativas Pioneiras

#### Setor Público
- **MEC** - Diretrizes para uso ético de IA
- **INEP** - IA para análise do ENEM
- **Secretarias Estaduais** - Pilotos em SP, RJ, MG

#### Setor Privado
- **Eleva Educação** - Plataforma adaptativa
- **Descomplica** - Personalização de conteúdo
- **Kumon** - Sistema adaptativo de matemática

#### Universidades
- **USP** - Centro de IA
- **UFMG** - Laboratório de Educação Digital
- **PUC-Rio** - Pesquisa em NLP educacional

### Desafios Brasileiros
1. **Infraestrutura** - Internet limitada em 40% das escolas
2. **Capacitação** - Professores precisam de formação
3. **Recursos** - Orçamento limitado para tecnologia
4. **Desigualdade** - Gap entre escolas públicas e privadas

## 7. Por que Professores Precisam Conhecer IA?

### Transformação Inevitável
- **87%** dos empregos serão impactados pela IA até 2030
- **Alunos de hoje** viverão em mundo completamente digitalizado
- **Competitividade** - Escolas com IA têm vantagem

### Benefícios Imediatos para Professores
1. **Economia de Tempo**
   - Criação automática de planos de aula
   - Correção assistida de atividades
   - Geração de exercícios personalizados

2. **Melhoria da Qualidade**
   - Conteúdo mais atualizado e relevante
   - Personalização para cada aluno
   - Métricas precisas de progresso

3. **Redução de Estresse**
   - Menos trabalho repetitivo
   - Mais tempo para relacionamento humano
   - Decisões baseadas em dados

### Preparação para o Futuro
- **Alunos precisarão** de competências digitais
- **Mercado de trabalho** exigirá fluência em IA
- **Professores** serão facilitadores de IA + humanidade

## 8. Mitos vs. Realidades sobre IA

### ❌ MITOS

**"IA vai substituir professores"**
- ❌ **Falso**: IA é ferramenta, não substituto
- ✅ **Realidade**: Professores se tornam mais eficazes

**"IA é muito complexa para professores"**
- ❌ **Falso**: Interfaces são cada vez mais simples
- ✅ **Realidade**: É como aprender a usar WhatsApp

**"IA vai tornar alunos preguiçosos"**
- ❌ **Falso**: Bem usada, IA estimula criatividade
- ✅ **Realidade**: Libera tempo para pensamento crítico

**"IA é perfeita e não erra"**
- ❌ **Falso**: IA pode ter vieses e limitações
- ✅ **Realidade**: Requer supervisão humana

### ✅ REALIDADES

**IA democratiza educação personalizada**
- Cada aluno pode ter tutoria individual
- Adaptação automática ao ritmo de aprendizagem

**IA amplifica capacidades humanas**
- Professores fazem mais com menos tempo
- Foco nas competências socioemocionais

**IA gera dados valiosos**
- Insights sobre dificuldades dos alunos
- Evidências para melhorar metodologias

## 9. Primeiros Passos com IA na Educação

### Ferramentas Gratuitas para Começar

#### 1. **ChatGPT** (OpenAI)
- **Use para**: Criar planos de aula, exercícios, explicações
- **Exemplo**: "Crie um plano de aula sobre frações para 6º ano"

#### 2. **Google Bard**
- **Use para**: Pesquisa e síntese de informações
- **Exemplo**: "Resuma os principais conceitos de fotossíntese"

#### 3. **Claude** (Anthropic)
- **Use para**: Análise de textos e feedbacks detalhados
- **Exemplo**: "Analise esta redação e dê feedback construtivo"

#### 4. **Canva Magic Write**
- **Use para**: Criação de materiais visuais
- **Exemplo**: Slides, infográficos, apresentações

### Estratégia de Implementação

#### Semana 1: Exploração
- Crie conta no ChatGPT
- Teste 3 prompts básicos
- Compartilhe resultados com colegas

#### Semana 2: Aplicação
- Use IA para criar um plano de aula
- Aplique com uma turma
- Documente os resultados

#### Semana 3: Refinamento
- Ajuste prompts baseado na experiência
- Teste outras ferramentas
- Crie biblioteca pessoal de prompts

#### Semana 4: Expansão
- Ensine colegas o que aprendeu
- Integre IA em múltiplas disciplinas
- Planeje próximos passos

## 10. Ética e Responsabilidade

### Princípios Fundamentais

#### Transparência
- Sempre informe quando usar IA
- Explique aos alunos como funciona
- Documente processos e decisões

#### Equidade
- Garanta acesso igual para todos os alunos
- Considere limitações socioeconômicas
- Adapte para necessidades especiais

#### Privacidade
- Proteja dados dos alunos
- Use ferramentas confiáveis
- Respeite LGPD

#### Supervisão Humana
- Nunca confie 100% na IA
- Sempre revise conteúdo gerado
- Mantenha julgamento pedagógico

### Marco Legal Brasileiro
- **LGPD** - Proteção de dados pessoais
- **Marco Civil da Internet** - Direitos digitais
- **Diretrizes MEC** - Uso ético em educação

## Conclusão: O Futuro Começou

A Inteligência Artificial não é mais ficção científica - é realidade presente que está transformando a educação mundial. Como educadores brasileiros, temos a oportunidade única de liderar essa transformação, garantindo que nossos alunos estejam preparados para o futuro.

### Próximos Passos
1. **Complete este módulo** para dominar os fundamentos
2. **Pratique** com as ferramentas apresentadas
3. **Compartilhe** conhecimento com colegas
4. **Implemente** gradualmente na sua prática
5. **Continue aprendendo** - a IA evolui rapidamente

**Lembre-se**: Você não precisa ser um especialista técnico. Precisa ser um educador curioso e disposto a explorar novas possibilidades para transformar a vida dos seus alunos.

*"A melhor forma de prever o futuro é criá-lo." - Peter Drucker*

Bem-vindo à revolução da IA na educação! 🚀
      `,
      aiTools: [
        {
          name: 'ChatGPT',
          description: 'Assistente de IA para conversação e criação de conteúdo',
          url: 'https://chat.openai.com',
          useCase: 'Primeira ferramenta para experimentar IA'
        },
        {
          name: 'Google Bard',
          description: 'IA do Google para pesquisa e síntese',
          url: 'https://bard.google.com',
          useCase: 'Pesquisa inteligente e resumos'
        },
        {
          name: 'Claude',
          description: 'IA da Anthropic para análise detalhada',
          url: 'https://claude.ai',
          useCase: 'Feedback educacional aprofundado'
        },
        {
          name: 'Perplexity',
          description: 'Mecanismo de busca com IA',
          url: 'https://perplexity.ai',
          useCase: 'Pesquisa acadêmica e fontes confiáveis'
        }
      ]
    },
    quiz: [
      {
        question: 'O que é Inteligência Artificial?',
        options: [
          'Apenas robôs que falam',
          'Capacidade de máquinas realizarem tarefas que requerem inteligência humana',
          'Computadores muito rápidos',
          'Apenas jogos de computador'
        ],
        correct: 1
      },
      {
        question: 'Qual tipo de IA estamos usando atualmente?',
        options: [
          'IA Geral (AGI)',
          'Super IA',
          'IA Estreita (Narrow AI)',
          'IA Quântica'
        ],
        correct: 2
      },
      {
        question: 'Qual NÃO é um benefício da IA para professores?',
        options: [
          'Economia de tempo na criação de materiais',
          'Substituição completa do professor',
          'Personalização do ensino',
          'Correção automática de atividades'
        ],
        correct: 1
      },
      {
        question: 'Qual princípio ético é fundamental ao usar IA?',
        options: [
          'Usar IA sem informar aos alunos',
          'Confiar 100% nos resultados da IA',
          'Manter transparência e supervisão humana',
          'Usar apenas IA paga'
        ],
        correct: 2
      },
      {
        question: 'O que significa NLP em IA?',
        options: [
          'Programação Linear Numérica',
          'Processamento de Linguagem Natural',
          'Protocolo de Rede Local',
          'Planejamento de Longo Prazo'
        ],
        correct: 1
      }
    ],
    assignment: {
      title: 'Projeto: Primeira Experiência com IA',
      description: 'Explore uma ferramenta de IA e documente sua experiência',
      requirements: [
        'Crie uma conta gratuita em ChatGPT ou Google Bard',
        'Teste 3 prompts diferentes relacionados à sua disciplina',
        'Documente os resultados obtidos',
        'Analise pontos positivos e limitações encontradas',
        'Reflita sobre aplicações práticas na sua sala de aula',
        'Prepare um relato de 1 página sobre a experiência'
      ],
      submission: 'Relatório em PDF com prints das conversas com IA + reflexão pessoal'
    },
    maestroInfo: {
      topic: 'Introdução à IA na Educação',
      duration: '90 min',
      agenda: [
        'Conceitos fundamentais de IA',
        'Demonstração prática de ferramentas',
        'Casos de sucesso no Brasil',
        'Primeiros passos práticos',
        'Sessão de perguntas e respostas'
      ]
    }
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
              <Link href="/modules/1">
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
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="outline">{lesson.module}</Badge>
                  <Badge variant="secondary">{lesson.level}</Badge>
                </div>
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

          {/* Video Content with AI MAESTRO */}
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
                    Fundamentos de IA explicados de forma prática e didática
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center text-white">
                      <Play className="w-16 h-16 mx-auto mb-4 opacity-70" />
                      <p className="text-lg mb-2">{lesson.title}</p>
                      <p className="text-sm opacity-70">Duração: {lesson.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Progress value={videoCompleted ? 100 : 0} className="w-32 h-2" />
                      <span className="text-sm text-gray-600">
                        {videoCompleted ? '100%' : '0%'} concluído
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => setVideoCompleted(true)}
                      disabled={videoCompleted}
                    >
                      {videoCompleted ? <CheckCircle className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                      {videoCompleted ? 'Concluído' : 'Assistir Aula'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Live Session with AI MAESTRO */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Aula Ao Vivo com AI MAESTRO
                  </CardTitle>
                  <CardDescription>
                    {lesson.liveSession.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <Avatar className="w-12 h-12 border-2 border-blue-500">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        <Brain className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{lesson.liveSession.instructor}</p>
                      <p className="text-sm text-gray-600">Especialista IA Educacional</p>
                    </div>
                  </div>

                  <div className="text-sm space-y-2">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(lesson.liveSession.date).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {lesson.liveSession.time} ({lesson.liveSession.duration})
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Agenda da Aula:</h4>
                    <ul className="text-sm space-y-1">
                      {lesson.maestroInfo.agenda.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-4 h-4 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
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
                    <div className="space-y-2">
                      <Button className="w-full">
                        Inscrever-se na Aula
                      </Button>
                      <p className="text-xs text-gray-500 text-center">
                        Vagas limitadas - Inscreva-se já!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Material Completo: Fundamentos de IA</CardTitle>
                <CardDescription>
                  Guia abrangente sobre Inteligência Artificial para educadores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ 
                    __html: lesson.content.theory
                      .replace(/\n/g, '<br>')
                      .replace(/###/g, '<h3>')
                      .replace(/##/g, '<h2>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\`\`\`(.*?)\`\`\`/gs, '<pre style="background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; overflow-x: auto;"><code>$1</code></pre>')
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
                      <Badge variant="secondary" className="text-xs">{tool.useCase.split(' ').slice(0,2).join(' ')}</Badge>
                    </CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        <strong>Ideal para:</strong> {tool.useCase}
                      </p>
                      <div className="flex space-x-2">
                        <Button asChild size="sm" className="flex-1">
                          <a href={tool.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Experimentar
                          </a>
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
                  Quiz: Fundamentos de IA
                  <Badge variant="outline">
                    {currentQuestion + 1} de {lesson.quiz.length}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Teste seus conhecimentos sobre os conceitos fundamentais
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
                      Quiz Finalizado!
                    </h3>
                    <p className="text-lg">
                      Você acertou {quizScore} de {lesson.quiz.length} questões 
                      ({Math.round((quizScore / lesson.quiz.length) * 100)}%)
                    </p>
                    {quizScore / lesson.quiz.length >= 0.7 ? (
                      <div className="space-y-2">
                        <Badge variant="default" className="px-4 py-2">
                          ✅ Parabéns! Você domina os fundamentos de IA
                        </Badge>
                        <p className="text-sm text-gray-600">
                          Pronto para avançar para a próxima aula!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Badge variant="destructive" className="px-4 py-2">
                          📖 Revise o material - Você consegue!
                        </Badge>
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
                  <h4 className="font-medium text-gray-900 mb-3">Requisitos do Projeto:</h4>
                  <ul className="space-y-2">
                    {lesson.assignment.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Como Entregar:</h4>
                  <p className="text-sm text-blue-800">{lesson.assignment.submission}</p>
                </div>
                
                <div className="flex space-x-4">
                  <Button className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Enviar Projeto
                  </Button>
                  <Button variant="outline">
                    Ver Exemplo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}