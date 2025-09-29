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
import { ArrowLeft, Play, CheckCircle, Clock, BookOpen, Video, Users, Award, Download, ExternalLink, Calendar, Brain, Globe, BarChart3 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function StarterLesson2Page() {
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
    title: 'IA na Educação: Panorama Atual',
    module: 'Starter - Fundamentos de IA',
    duration: '40 min',
    description: 'Explore o cenário mundial e brasileiro da IA na educação: tendências, casos de sucesso e oportunidades',
    ageGroup: 'Todos os Níveis',
    level: 'Iniciante',
    objectives: [
      'Conhecer o panorama global da IA na educação',
      'Entender o cenário brasileiro e suas especificidades',
      'Identificar tendências e oportunidades emergentes',
      'Reconhecer desafios e barreiras para implementação'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    liveSession: {
      date: '2024-12-16',
      time: '19:30',
      instructor: 'AI MAESTRO',
      duration: '90 min',
      registered: false,
      description: 'Panorama mundial da IA educacional com casos práticos'
    },
    content: {
      theory: `
# IA na Educação: Panorama Atual

## 1. Revolução Global em Andamento

### Transformação Sem Precedentes
A educação mundial está vivenciando sua maior transformação desde a invenção da imprensa. **A Inteligência Artificial** não é mais uma promessa futura - é realidade presente que está redefinindo como ensinamos e aprendemos.

### Números que Impressionam (2024)
- **1.2 bilhão** de estudantes já usam alguma tecnologia com IA
- **67%** das universidades globais adotaram ferramentas de IA
- **$20 bilhões** investidos em EdTech com IA em 2023
- **89%** dos professores relatam interesse em usar IA
- **156 países** têm iniciativas nacionais de IA na educação

## 2. Líderes Mundiais em IA Educacional

### 🇺🇸 Estados Unidos - Pioneirismo Inovador

#### Iniciativas Governamentais
- **Department of Education AI Report 2023** - Diretrizes nacionais
- **NSF AI for Education** - $140 milhões em pesquisas
- **IES Technology Plan** - Integração sistemática

#### Casos de Destaque
**Distrito Escolar de Los Angeles** (650.000 alunos)
- Tutoria personalizada com IA para matemática
- 34% de melhoria em resultados padronizados
- Redução de 50% no tempo de correção

**Khan Academy + GPT-4** - Khanmigo
- Tutor pessoal de IA para 120 milhões de usuários
- Explicações adaptadas ao nível do aluno
- Suporte em 40+ idiomas

**Carnegie Learning** - MATHia
- IA adaptativa para ensino de matemática
- Usada por 600.000+ estudantes americanos
- Melhoria média de 67% na proficiência

### 🇨🇳 China - Escala Massiva e Investimento

#### Estratégia Nacional
- **New Generation AI Plan** - Meta: liderança mundial até 2030
- **Smart Education 2035** - IA em todas as escolas
- **$15 bilhões** investidos anualmente

#### Exemplos Revolucionários
**Squirrel AI** - Tutoria Adaptativa
- **4 milhões** de alunos ativos
- Algoritmo analisa 5.000+ pontos de conhecimento
- Personalização em tempo real
- Resultado: 78% dos alunos melhoram nota em 3 meses

**VIPKID + IA**
- Plataforma de inglês online
- 800.000 alunos chineses
- 100.000 professores nativos
- IA analisa pronúncia e progresso em tempo real

### 🇬🇧 Reino Unido - Excelência e Inovação

#### Política Nacional
- **AI in Education Strategy 2023**
- **£10 milhões** para pesquisa em IA educacional
- Parceria universidade-indústria

#### Líderes do Setor
**Century Tech**
- Plataforma de aprendizado personalizado
- Usada por 500+ escolas britânicas
- IA identifica lacunas de conhecimento
- 89% de satisfação dos professores

**Third Space Learning**
- Tutoria matemática 1:1 com IA
- 300.000+ sessões mensais
- Melhoria média de 18 meses em 14 semanas

### 🇫🇮 Finlândia - Modelo Nórdico

#### Filosofia Educacional
- Foco no bem-estar do aluno
- IA como ferramenta de apoio, não substituição
- Transparência e ética em primeiro lugar

#### Iniciativas Únicas
**Helsinki Education AI**
- IA para reduzir desigualdades
- Suporte multilíngue (30+ idiomas)
- Foco em alunos imigrantes

### 🇸🇬 Singapura - Smart Nation Educacional

#### Visão 2030
- **Smart Nation Initiative** inclui educação
- IA em 100% das escolas até 2025
- S$500 milhões em investimentos

#### Resultados Práticos
**Singapore Student Learning Space**
- Plataforma nacional com IA
- 500.000+ estudantes cadastrados
- Conteúdo adaptativo em tempo real

## 3. Cenário Brasileiro: Potencial e Desafios

### 📊 Dados Atuais do Brasil

#### Penetração da IA na Educação
- **12%** das escolas públicas usam alguma IA
- **34%** das escolas privadas têm iniciativas
- **São Paulo** lidera com 23% de adoção
- **Região Norte** tem apenas 3% de penetração

#### Professores e IA
- **73%** nunca usaram ferramentas de IA
- **45%** têm interesse em aprender
- **67%** se sentem despreparados
- **89%** querem capacitação gratuita

### 🏛️ Iniciativas Governamentais Brasileiras

#### Estratégia Brasileira de IA (2021-2030)
**Eixo Educação:**
- Capacitação de 100.000 professores até 2030
- IA em currículos de pedagogia
- Parcerias público-privadas para inovação

#### MEC - Diretrizes para IA (2023)
1. **Uso Ético**: Transparência e responsabilidade
2. **Formação Docente**: Capacitação continuada
3. **Inclusão Digital**: Acesso equitativo
4. **Pesquisa**: Fomento à inovação nacional

#### Programas Estaduais Pioneiros

**São Paulo - Inova Educação**
- 3.000 escolas piloto
- Plataforma adaptativa de matemática
- Parceria com startups nacionais
- Resultado: 28% melhoria no IDESP

**Rio de Janeiro - Educa+**
- IA para combater evasão escolar
- Algoritmo prediz risco de abandono
- Intervenção precoce personalizada
- Redução de 15% na evasão

**Ceará - Escola Digital**
- Conteúdo adaptativo para EJA
- IA analisa ritmo de aprendizagem
- Foco em alfabetização de adultos

### 🚀 Startups Brasileiras Inovadoras

#### Eleva Educação - Plataforma Adaptativa
- **200.000** alunos atendidos
- IA personaliza trilhas de aprendizagem
- Foco no ensino médio
- Parceria com 400+ escolas
- Melhoria média de 22% no ENEM

#### Geekie - Adaptive Learning
- Plataforma usado por **8 milhões** de estudantes
- IA mapeia conhecimento individual
- Recomendações personalizadas de estudo
- Parceria com governos estaduais

#### Descomplica - IA para Vestibular
- **12 milhões** de usuários cadastrados
- Chatbot educacional 24/7
- Análise preditiva de desempenho
- Conteúdo gerado automaticamente

#### Arvore - Leitura Inteligente
- IA para desenvolver fluência leitora
- **300.000** estudantes ativos
- Recomendação personalizada de livros
- Análise de compreensão em tempo real

### 🎓 Universidades Brasileiras na Vanguarda

#### USP - Centro de IA
- **C4AI** - Research center com IBM
- 50+ projetos de IA educacional
- Formação de pesquisadores
- Parcerias internacionais

#### UFMG - Laboratório de Educação Digital
- IA para educação inclusiva
- Tecnologia assistiva com IA
- Pesquisa em português brasileiro

#### PUC-Rio - Sistemas Inteligentes
- NLP para correção automática
- IA conversacional em português
- Parcerias com setor privado

## 4. Tendências Globais Emergentes

### 🤖 IA Conversacional na Educação

#### Chatbots Educacionais Avançados
- **Resposta instantânea** para dúvidas 24/7
- **Múltiplos idiomas** e dialetos
- **Personalidade adaptável** ao contexto cultural
- **Integração** com sistemas de gestão escolar

#### Exemplos Globais
**Jill Watson (Georgia Tech)**
- IA responde dúvidas de alunos
- 97% não perceberam que era IA
- Redução de 40% na carga de professores

**Ada (University of Toronto)**
- Suporte acadêmico personalizado
- 50.000+ interações mensais
- Satisfação de 92% dos estudantes

### 📱 Realidade Aumentada + IA

#### Aprendizagem Imersiva
- **Visualização 3D** de conceitos abstratos
- **Simulações** científicas realistas
- **Gamificação** inteligente
- **Adaptação** ao ambiente físico

#### Casos Práticos
**Magic Leap Education**
- Anatomia humana em 3D
- IA ajusta complexidade automaticamente
- Usado em 200+ universidades mundiais

**Microsoft HoloLens + AI**
- História imersiva com IA
- Recriação de eventos históricos
- Personalagens virtuais interativos

### 🎯 Micro-Learning Personalizado

#### Fragmentação Inteligente
- **Conteúdo** dividido em pills de 3-5 minutos
- **IA analisa** atenção e retenção
- **Ajuste automático** de dificuldade
- **Notificações** no momento ideal

#### Exemplos Exitosos
**Duolingo**
- 500 milhões de usuários
- IA personaliza lições diárias
- Streaks inteligentes
- Gamificação adaptativa

**Brilliant**
- Matemática e ciências em micro-aulas
- IA identifica pontos de confusão
- Exercícios adaptativos
- 10 milhões de usuários

### 🔬 Análise Preditiva Avançada

#### Early Warning Systems
- **Predição** de risco de evasão
- **Identificação** de dificuldades de aprendizagem
- **Recomendações** de intervenção
- **Acompanhamento** de bem-estar emocional

#### Implementações Reais
**Arizona State University**
- IA prediz sucesso com 85% precisão
- Intervenção proativa para 80.000 alunos
- Redução de 11% na evasão

**Georgia State University**
- Sistema GPS (Graduation Progress Success)
- 800+ alertas automatizados
- Aumento de 17% na graduação

## 5. Desafios Globais e Soluções

### 🚧 Principais Obstáculos

#### 1. Infraestrutura Tecnológica
**Problema:** Desigualdade no acesso à internet banda larga
**Solução:** Parcerias público-privadas para conectividade

#### 2. Capacitação Docente
**Problema:** 68% dos professores mundiais não têm formação em IA
**Solução:** Programas massivos de capacitação online

#### 3. Privacidade e Segurança
**Problema:** Proteção de dados de menores
**Solução:** Frameworks legais específicos (COPPA, GDPR-K)

#### 4. Equidade e Inclusão
**Problema:** IA pode amplificar vieses existentes
**Solução:** Algoritmos auditados e diversos

#### 5. Resistência à Mudança
**Problema:** Cultura educacional conservadora
**Solução:** Demonstração de resultados práticos

### 🛠️ Estratégias de Superação

#### Framework UNESCO para IA na Educação
1. **Planejamento e Gestão** - Políticas nacionais
2. **Currículo e Ensino** - Integração pedagógica
3. **Avaliação** - Métricas de impacto
4. **Capacitação** - Formação continuada
5. **Ética e Inclusão** - Princípios orientadores

## 6. Oportunidades Únicas para o Brasil

### 🇧🇷 Vantagens Competitivas Brasileiras

#### Diversidade Cultural
- **5.570 municípios** com contextos únicos
- Oportunidade para IA multicultural
- Algoritmos adaptados à realidade local

#### Escala de Impacto
- **47 milhões** de estudantes na educação básica
- Maior potencial de transformação da América Latina
- Mercado interno robusto para soluções nacionais

#### Talento Tecnológico
- Fortes universidades em IA e computação
- Setor de tecnologia em crescimento
- Comunidade ativa de desenvolvedores

#### Necessidade de Inovação
- Desafios educacionais urgentes
- Motivação para soluções disruptivas
- Apoio governamental crescente

### 💡 Áreas Prioritárias para Desenvolvimento

#### 1. IA para Alfabetização
- **26 milhões** de brasileiros funcionalmente analfabetos
- IA pode personalizar metodologias
- Potencial impacto social imenso

#### 2. Educação Rural
- **12 milhões** de estudantes em áreas rurais
- IA pode superar limitações geográficas
- Acesso à educação de qualidade

#### 3. Ensino Técnico
- Demanda por 10,5 milhões de técnicos até 2030
- IA pode acelerar capacitação profissional
- Simuladores inteligentes

#### 4. Educação Inclusiva
- **1,3 milhão** de estudantes com deficiência
- IA assistiva personalizada
- Tecnologias adaptativas

## 7. Casos de Sucesso Internacionais

### 📚 Finlândia - Equity através da IA

#### Helsinki AI Tutor
**Desafio:** Integrar alunos imigrantes (40+ nacionalidades)
**Solução:** IA multilíngue que adapta conteúdo cultural
**Resultado:** 
- 78% melhoria na integração
- Redução de 60% no tempo de adaptação
- Modelo replicado em 12 países

#### Metodologia
1. **Análise Cultural** - IA mapeia background do aluno
2. **Conteúdo Adaptado** - Exemplos culturalmente relevantes
3. **Suporte Linguístico** - Tradução contextual automática
4. **Progressão Gradual** - Aumento gradual da complexidade

### 🎯 Singapura - Eficiência Sistêmica

#### MOE AI Tutoring System
**Escala:** 350.000 estudantes
**Tecnologia:** Machine Learning + NLP em inglês/mandarim
**Resultados:**
- 89% dos alunos melhoraram performance
- 45% redução no tempo de estudo necessário
- 92% satisfação dos professores

#### Componentes-chave
- **Diagnostic Assessment** - Avaliação contínua automatizada
- **Adaptive Content** - Ajuste automático de dificuldade
- **Progress Tracking** - Monitoramento em tempo real
- **Teacher Dashboard** - Insights para professores

### 💪 Estônia - Transformação Digital Completa

#### e-Estonia Education
**Visão:** 100% digital até 2025
**Implementação:** IA integrada em todos os níveis
**Características:**
- Carteira digital para todos os estudantes
- IA prediz necessidades de aprendizagem
- Blockchain para certificação
- Realidade virtual em ciências

**Impacto:** Estônia lidera rankings globais de educação digital

## 8. Futuro da IA na Educação Global

### 🔮 Previsões para 2025-2030

#### Tecnologias Emergentes
**GPT-5 e Beyond** (2025)
- Professores virtuais indistinguíveis de humanos
- Geração automática de currículos completos
- Personalização extrema (1:1 verdadeiro)

**Quantum AI Education** (2027)
- Processamento de padrões de aprendizagem complexos
- Simulações educacionais ultra-realistas
- Predições de carreira com 95%+ precisão

**Neural Interfaces** (2030)
- Transferência direta de conhecimento
- Aprendizagem durante o sono
- Memória aumentada artificialmente

#### Transformações Estruturais
1. **Fim das Séries Tradicionais** - Progressão baseada em competências
2. **Escolas Virtuais Globais** - Estudantes de qualquer lugar
3. **Professores Híbridos** - Humanos + IA trabalhando juntos
4. **Avaliação Contínua** - Sem provas tradicionais
5. **Currículo Dinâmico** - Atualização automática

### 🌍 Impacto Social Global

#### Democratização do Conhecimento
- Educação de qualidade para **7,8 bilhões** de pessoas
- Quebra de barreiras geográficas e socioeconômicas
- Acesso universal ao melhor ensino mundial

#### Redução de Desigualdades
- IA compensa limitações de recursos
- Personalização nivela oportunidades
- Suporte multilíngue e multicultural

#### Preparação para o Futuro
- Desenvolvimento de competências do século XXI
- Adaptabilidade para mercado de trabalho dinâmico
- Pensamento crítico sobre tecnologia

## Conclusão: O Brasil no Cenário Mundial

O panorama atual da IA na educação revela um mundo em transformação acelerada. Enquanto países como Estados Unidos, China e Finlândia lideram a vanguarda, o **Brasil possui condições únicas** para se tornar referência global:

### Nossos Diferenciais
- **Diversidade** que exige soluções inovadoras
- **Escala** que permite impacto massivo
- **Necessidade** que impulsiona criatividade
- **Talento** que pode competir globalmente

### Próximos Passos Estratégicos
1. **Investimento** em infraestrutura digital
2. **Capacitação** massiva de educadores
3. **Parcerias** estratégicas internacionais
4. **Inovação** baseada em necessidades locais
5. **Política** nacional integrada

A revolução da IA na educação não é mais uma questão de **"se"**, mas de **"quando"** e **"como"**. O Brasil tem a oportunidade histórica de ser protagonista dessa transformação, criando um modelo educacional que serve de inspiração para o mundo.

**O futuro da educação brasileira começa agora - e você faz parte dessa revolução!** 🚀
      `,
      aiTools: [
        {
          name: 'Khan Academy (Khanmigo)',
          description: 'Tutor pessoal de IA baseado em GPT-4',
          url: 'https://khanacademy.org',
          useCase: 'Tutoria personalizada e explicações adaptativas'
        },
        {
          name: 'Century Tech',
          description: 'Plataforma de aprendizado personalizado britânica',
          url: 'https://century.tech',
          useCase: 'Identificação de lacunas de conhecimento'
        },
        {
          name: 'Squirrel AI',
          description: 'Sistema chinês de tutoria adaptativa',
          url: 'https://squirrelai.com',
          useCase: 'Personalização massiva em escala'
        },
        {
          name: 'Geekie (Brasil)',
          description: 'Plataforma brasileira de adaptive learning',
          url: 'https://geekie.com.br',
          useCase: 'Personalização para estudantes brasileiros'
        },
        {
          name: 'Eleva Educação (Brasil)',
          description: 'IA para personalização de trilhas de aprendizagem',
          url: 'https://eleva.education',
          useCase: 'Preparação para ENEM e vestibulares'
        },
        {
          name: 'UNESCO AI Framework',
          description: 'Diretrizes globais para IA na educação',
          url: 'https://unesco.org/ai-education',
          useCase: 'Planejamento estratégico e políticas'
        }
      ]
    },
    quiz: [
      {
        question: 'Qual país lidera em número de estudantes atendidos por IA educacional?',
        options: [
          'Estados Unidos',
          'China',
          'Reino Unido',
          'Finlândia'
        ],
        correct: 1
      },
      {
        question: 'Qual é o principal desafio da IA educacional no Brasil?',
        options: [
          'Falta de interesse dos professores',
          'Infraestrutura tecnológica limitada',
          'Ausência de políticas governamentais',
          'Resistência dos alunos'
        ],
        correct: 1
      },
      {
        question: 'O Khanmigo (Khan Academy) representa qual tendência global?',
        options: [
          'Realidade Aumentada na educação',
          'IA conversacional para tutoria',
          'Gamificação com blockchain',
          'Avaliação automatizada'
        ],
        correct: 1
      },
      {
        question: 'Qual vantagem competitiva única o Brasil possui para IA educacional?',
        options: [
          'Maior orçamento educacional mundial',
          'Infraestrutura tecnológica avançada',
          'Diversidade cultural e necessidade de inovação',
          'Menor desigualdade social'
        ],
        correct: 2
      },
      {
        question: 'Segundo tendências globais, o que caracteriza o micro-learning?',
        options: [
          'Aulas de 3 horas divididas em módulos',
          'Conteúdo fragmentado em pills de 3-5 minutos',
          'Ensino apenas através de vídeos',
          'Aprendizagem sem uso de tecnologia'
        ],
        correct: 1
      }
    ],
    assignment: {
      title: 'Projeto: Análise Comparativa Global',
      description: 'Compare estratégias de IA educacional entre países e proposta para o Brasil',
      requirements: [
        'Escolha 2 países líderes em IA educacional (EUA, China, Reino Unido, Finlândia)',
        'Analise 3 casos de sucesso específicos de cada país',
        'Identifique 5 lições aplicáveis ao contexto brasileiro',
        'Proponha 3 adaptações necessárias para a realidade nacional',
        'Crie timeline de implementação para sua escola/rede',
        'Inclua análise de custos e benefícios esperados'
      ],
      submission: 'Relatório de 3-4 páginas + apresentação de 10 slides comparando estratégias globais'
    },
    maestroInfo: {
      topic: 'Panorama Global da IA Educacional',
      duration: '90 min',
      agenda: [
        'Tour virtual por implementações globais de IA',
        'Análise comparativa: EUA vs China vs Europa',
        'Oportunidades específicas para o Brasil',
        'Estratégias de implementação prática',
        'Q&A: Adaptando casos globais ao contexto local'
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
                  <span className="flex items-center">
                    <Globe className="w-4 h-4 mr-1" />
                    Panorama Global
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
            <TabsTrigger value="video">🌍 Vídeo</TabsTrigger>
            <TabsTrigger value="content">📊 Conteúdo</TabsTrigger>
            <TabsTrigger value="tools">🚀 Ferramentas</TabsTrigger>
            <TabsTrigger value="quiz">❓ Quiz</TabsTrigger>
            <TabsTrigger value="assignment">📋 Atividade</TabsTrigger>
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
                    Panorama mundial da IA na educação com exemplos práticos
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
                      <p className="text-sm text-gray-600">Especialista IA Global</p>
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
                <CardTitle>Material Completo: Panorama Global da IA na Educação</CardTitle>
                <CardDescription>
                  Análise abrangente do cenário mundial e brasileiro da IA educacional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ 
                    __html: lesson.content.theory
                      .replace(/\n/g, '<br>')
                      .replace(/### /g, '<h3>')
                      .replace(/## /g, '<h2>')
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
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Ver Infográficos
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
                      <Badge variant="secondary" className="text-xs">Global</Badge>
                    </CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        <strong>Aplicação:</strong> {tool.useCase}
                      </p>
                      <div className="flex space-x-2">
                        <Button asChild size="sm" className="flex-1">
                          <a href={tool.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Explorar
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
                  Quiz: Panorama Global da IA
                  <Badge variant="outline">
                    {currentQuestion + 1} de {lesson.quiz.length}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Teste seu conhecimento sobre o cenário mundial da IA educacional
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
                      {quizScore / lesson.quiz.length >= 0.7 ? '🌍' : '📚'}
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
                          🌟 Excelente! Você domina o panorama global da IA
                        </Badge>
                        <p className="text-sm text-gray-600">
                          Pronto para a próxima aula sobre ferramentas práticas!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Badge variant="destructive" className="px-4 py-2">
                          📖 Revise o material - Focus nos casos globais
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
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Como Entregar:</h4>
                  <p className="text-sm text-green-800">{lesson.assignment.submission}</p>
                </div>
                
                <div className="flex space-x-4">
                  <Button className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Enviar Projeto
                  </Button>
                  <Button variant="outline">
                    Ver Exemplos Globais
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