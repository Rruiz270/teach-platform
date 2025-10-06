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
import { ArrowLeft, Play, CheckCircle, Clock, BookOpen, Video, Users, Award, Download, ExternalLink, Calendar, Brain, Wrench, Zap } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import ContextualAIToolsSuggestions from '@/components/ContextualAIToolsSuggestions'

export default function StarterLesson3Page() {
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
    title: 'Principais Ferramentas de IA',
    module: 'Starter - Fundamentos de IA',
    duration: '45 min',
    description: 'Conheça e aprenda a usar as ferramentas de IA mais importantes para educadores brasileiros',
    ageGroup: 'Todos os Níveis',
    level: 'Iniciante',
    objectives: [
      'Dominar as 5 ferramentas essenciais de IA para educação',
      'Criar prompts eficazes para diferentes situações',
      'Aplicar IA na criação de materiais didáticos',
      'Usar IA para planejamento e avaliação'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    liveSession: {
      date: '2024-12-17',
      time: '20:00',
      instructor: 'AI MAESTRO',
      duration: '90 min',
      registered: false,
      description: 'Workshop prático: criando materiais com IA'
    },
    content: {
      theory: `
# Principais Ferramentas de IA para Educadores

## 1. Panorama das Ferramentas Essenciais

### Por que Conhecer as Ferramentas Certas?
Na vasta selva de ferramentas de IA disponíveis, **escolher as certas** faz toda a diferença entre frustração e sucesso. Como educadores brasileiros, precisamos de soluções que sejam:

- **Gratuitas ou acessíveis** 💰
- **Em português ou fáceis de usar** 🇧🇷
- **Focadas em educação** 🎓
- **Confiáveis e seguras** 🔒
- **Simples de implementar** ⚡

### As 5 Categorias Fundamentais
1. **Criação de Conteúdo** - Textos, planos, exercícios
2. **Comunicação e Tradução** - Multilingual, acessibilidade  
3. **Visuais e Apresentações** - Imagens, slides, vídeos
4. **Avaliação e Feedback** - Correção, análise, relatórios
5. **Planejamento e Organização** - Cronogramas, currículos

## 2. Ferramentas de Criação de Conteúdo

### 🤖 ChatGPT (OpenAI) - A Ferramenta Fundamental

#### Por que é Essencial?
- **Gratuito** na versão básica
- **Interface em português**
- **Versátil** para qualquer disciplina
- **Comunidade ativa** de educadores

#### Primeiros Passos
1. **Criar conta gratuita** em chat.openai.com
2. **Explorar** a interface básica
3. **Testar** prompts simples
4. **Evoluir** para prompts complexos

#### Prompts Essenciais para Professores

**🎯 Criação de Planos de Aula**
\`\`\`
Você é um especialista em pedagogia brasileira. Crie um plano de aula de [DISCIPLINA] para [ANO/SÉRIE] sobre [TÓPICO].

Inclua:
- Objetivo geral e específicos alinhados à BNCC
- Metodologia ativa apropriada
- Recursos necessários
- Avaliação formativa
- Duração: [X] minutos
- Adaptações para diferentes ritmos de aprendizagem

Contexto: escola [pública/privada] em [cidade/região]
\`\`\`

**📝 Geração de Exercícios**
\`\`\`
Crie 10 exercícios de [DISCIPLINA] para [SÉRIE] sobre [CONTEÚDO]:

Formato:
- 3 questões fáceis (fixação)
- 4 questões médias (aplicação)  
- 3 questões difíceis (análise/síntese)

Cada questão deve:
- Ter contexto brasileiro
- Incluir situação-problema real
- Variar tipos (múltipla escolha, discursiva, prática)
- Indicar habilidade BNCC correspondente
\`\`\`

**📖 Explicações Didáticas**
\`\`\`
Explique [CONCEITO] para alunos de [IDADE/SÉRIE] usando:

1. Linguagem adequada à faixa etária
2. Analogias com situações do cotidiano brasileiro
3. Exemplos práticos e visuais
4. Estrutura: introdução → desenvolvimento → síntese
5. Perguntas reflexivas ao final

Foque na compreensão, não memorização.
\`\`\`

#### Dicas Avançadas ChatGPT
- **Role Definition**: Sempre defina o papel da IA ("Você é um professor experiente...")
- **Context Setting**: Forneça contexto específico (série, região, tipo de escola)
- **Output Structure**: Especifique o formato desejado
- **Iteration**: Refine respostas com "Agora adapte para..." ou "Melhore o aspecto..."

### 🎨 Claude (Anthropic) - Análise Profunda

#### Pontos Fortes Únicos
- **Análise detalhada** de textos longos
- **Feedback construtivo** para alunos
- **Raciocínio complexo** para projetos
- **Ética integrada** nas respostas

#### Melhor Uso para Educadores
**Correção de Redações**
\`\`\`
Analise esta redação de um aluno do [ANO]:

[TEXTO DO ALUNO]

Forneça:
1. Nota de 0-10 com critérios claros
2. 3 pontos positivos específicos
3. 3 aspectos para melhorar com sugestões práticas
4. Exercícios específicos para evolução
5. Feedback motivacional personalizado

Critérios: estrutura textual, gramática, coerência, criatividade, atendimento ao tema
\`\`\`

### 🔍 Perplexity - Pesquisa Inteligente

#### Vantagem Competitiva
- **Fontes atualizadas** com citações
- **Pesquisa acadêmica** confiável  
- **Múltiplas perspectivas**
- **Gratuito** com limitações razoáveis

#### Uso Prático
**Atualização de Conteúdo**
\`\`\`
Pesquise as descobertas mais recentes sobre [TÓPICO] adequadas para ensino médio. 

Inclua:
- 5 descobertas dos últimos 2 anos
- Explicação simplificada de cada uma
- Aplicações práticas
- Fontes acadêmicas citadas
- Sugestões de experimentos/atividades
\`\`\`

### 📊 Google Bard - Integração Google

#### Benefícios Exclusivos
- **Integração** com Google Workspace
- **Pesquisa em tempo real**
- **Multilíngue nativo**
- **Geração de código** (Sheets, Docs)

#### Aplicação Educacional
- Criação de formulários Google automatizados
- Análise de dados de turma
- Integração com Google Classroom
- Geração de planilhas educacionais

## 3. Ferramentas de Comunicação e Tradução

### 🌍 DeepL - Tradução Precisa

#### Por que é Superior?
- **Qualidade** superior ao Google Translate
- **Contexto preservado**
- **Nuances linguísticas** respeitadas
- **Versão gratuita robusta**

#### Uso Educacional
- Traduzir **artigos acadêmicos** internacionais
- Adaptar **recursos educacionais** estrangeiros
- Criar **materiais multilíngues** para alunos imigrantes
- **Verificar traduções** de alunos de idiomas

### 🗣️ Speechify - Texto para Fala

#### Acessibilidade Educacional
- **Inclusão** para estudantes com dislexia
- **Aprendizagem auditiva** personalizada
- **Múltiplas vozes** e velocidades
- **Destaque visual** sincronizado

#### Implementação Prática
1. **Converter** textos didáticos em áudio
2. **Criar podcasts** educacionais
3. **Auxiliar** estudantes com necessidades especiais
4. **Desenvolver** habilidades de escuta

## 4. Ferramentas Visuais e Apresentações

### 🎨 Canva Magic Design - Criação Visual

#### IA Integrada para Educação
- **Templates** educacionais automatizados
- **Sugestões** de design baseadas em conteúdo
- **Redimensionamento** automático
- **Biblioteca** de recursos pedagógicos

#### Casos de Uso Essenciais
**Infográficos Educacionais**
- Transformar dados em visuais compreensíveis
- Criar resumos visuais de conteúdo
- Desenvolver mapas mentais interativos

**Apresentações Dinâmicas**
- Slides automaticamente formatados
- Animações educacionais relevantes
- Elementos visuais contextualizados

### 🎥 Loom com IA - Vídeos Explicativos

#### Recursos IA-Powered
- **Transcrição automática** multilíngue
- **Resumos** inteligentes de vídeos
- **Legendas** geradas automaticamente
- **Análise** de engajamento

#### Aplicações Pedagógicas
1. **Micro-aulas** explicativas gravadas
2. **Feedback** personalizado em vídeo
3. **Tutoriais** de procedimentos
4. **Revisões** de conteúdo assíncronas

### 🖼️ DALL-E 2 / Midjourney - Geração de Imagens

#### Potencial Criativo Educacional
- **Ilustrações** personalizadas para conceitos abstratos
- **Personagens** didáticos únicos
- **Cenários históricos** recriados
- **Diagramas** científicos customizados

#### Prompts Educacionais Eficazes
\`\`\`
"Ilustração didática mostrando [CONCEITO] para crianças de [IDADE], estilo cartoon colorido, fundo simples, elementos educacionais claros"

"Infográfico sobre [PROCESSO CIENTÍFICO], diagrama limpo, cores contrastantes, texto legível, apropriado para sala de aula"
\`\`\`

## 5. Ferramentas de Avaliação e Feedback

### 📋 Google Forms + IA - Avaliações Inteligentes

#### Recursos Automatizados
- **Correção automática** com explicações
- **Análise estatística** de respostas
- **Feedback** personalizado baseado em desempenho
- **Relatórios** visuais automáticos

#### Setup Otimizado
1. **Configurar** correção automática
2. **Criar** banco de questões classificadas
3. **Implementar** feedback por nível de acerto
4. **Analisar** dados para ajustar ensino

### 🔍 Turnitin - Originalidade e Feedback

#### IA para Integridade Acadêmica
- **Detecção** de plágio avançada
- **Análise** de originalidade
- **Feedback** automático de escrita
- **Relatórios** detalhados de similaridade

#### Uso Pedagógico Construtivo
- **Ensinar** sobre citação e referência
- **Desenvolver** originalidade de pensamento
- **Melhorar** qualidade de escrita
- **Promover** integridade acadêmica

### 📊 Socrative - Avaliação Formativa

#### Interação em Tempo Real
- **Quizzes** instantâneos
- **Polls** de opinião
- **Exit tickets** automáticos
- **Relatórios** imediatos de compreensão

## 6. Ferramentas de Planejamento e Organização

### 🗓️ Notion AI - Planejamento Inteligente

#### Capacidades Educacionais
- **Geração** automática de cronogramas
- **Templates** educacionais personalizados
- **Organização** de recursos por tópico
- **Colaboração** com equipe pedagógica

#### Estruturas Úteis
**Database de Aulas**
- Conteúdo, objetivos, recursos, avaliação
- Filtros por série, disciplina, competência BNCC
- Relacionamentos entre tópicos

**Tracker de Progresso**
- Acompanhamento individual de alunos
- Metas de aprendizagem automatizadas
- Alertas de intervenção necessária

### 📱 Todoist com IA - Gestão de Tarefas

#### Organização Pedagógica
- **Priorização** automática de tarefas
- **Sugestões** de cronograma
- **Lembretes** contextuais
- **Análise** de produtividade

## 7. Implementação Prática: Roteiro de 30 Dias

### Semana 1: Fundamentos
**Dias 1-2: ChatGPT Básico**
- Criar conta e explorar interface
- Testar 5 prompts básicos fornecidos
- Criar primeiro plano de aula

**Dias 3-4: Canva Magic Design**
- Configurar conta educacional
- Criar 3 materiais visuais simples
- Explorar templates pedagógicos

**Dias 5-7: Google Forms IA**
- Montar primeira avaliação automatizada
- Configurar feedback personalizado
- Testar com grupo pequeno

### Semana 2: Expansão
**Dias 8-10: Claude/Perplexity**
- Comparar respostas com ChatGPT
- Usar para correção de texto
- Pesquisar conteúdo atualizado

**Dias 11-12: Loom**
- Gravar primeira micro-aula
- Testar transcrição automática
- Criar biblioteca de vídeos

**Dias 13-14: Notion AI**
- Estruturar sistema de organização
- Criar templates personalizados
- Implementar tracker de progresso

### Semana 3: Integração
**Dias 15-17: Workflow Combinado**
- Usar 3+ ferramentas em sequência
- Criar projeto educacional completo
- Documentar processo otimizado

**Dias 18-21: Teste em Sala**
- Aplicar ferramentas com alunos
- Coletar feedback real
- Ajustar abordagem

### Semana 4: Otimização
**Dias 22-24: Análise de Resultados**
- Comparar eficiência antes/depois
- Identificar melhores práticas pessoais
- Refinar prompts e processos

**Dias 25-28: Capacitação de Colegas**
- Ensinar 2 colegas principais ferramentas
- Documentar dúvidas comuns
- Criar guia rápido personalizado

**Dias 29-30: Planejamento Futuro**
- Definir metas para próximo mês
- Explorar ferramentas avançadas
- Planejar expandir uso

## 8. Dicas de Segurança e Ética

### 🔒 Proteção de Dados

#### Boas Práticas Essenciais
- **Nunca inserir** dados pessoais de alunos
- **Anonimizar** informações sensíveis
- **Usar** versões pagas para dados críticos
- **Verificar** políticas de privacidade

#### Compliance LGPD
1. **Consentimento** explícito para uso de dados
2. **Minimização** - usar apenas dados necessários
3. **Transparência** sobre como dados são usados
4. **Direito** ao esquecimento respeitado

### ⚖️ Uso Ético em Sala

#### Princípios Fundamentais
- **Transparência** - sempre informar uso de IA
- **Educação** - ensinar sobre IA aos alunos
- **Supervisão** - revisar todo conteúdo gerado
- **Complemento** - IA auxilia, não substitui professor

#### Evitar Dependência
- Manter **habilidades tradicionais** de ensino
- **Variar** metodologias e ferramentas
- **Questionar** sempre resultados da IA
- **Desenvolver** senso crítico nos alunos

## 9. Casos Práticos por Disciplina

### 📚 Português
**Ferramentas Principais:** ChatGPT + Claude + Turnitin

**Workflow Completo:**
1. **ChatGPT** - Gerar exercícios de gramática personalizados
2. **Claude** - Analisar redações com feedback detalhado
3. **Turnitin** - Verificar originalidade de trabalhos
4. **Canva** - Criar infográficos sobre literatura

**Exemplo Prático:**
- Criar 20 questões sobre figuras de linguagem com exemplos da MPB
- Corrigir redações do ENEM com rubrica personalizada
- Gerar cronograma de leitura adaptado por aluno

### 🔢 Matemática
**Ferramentas Principais:** ChatGPT + Google Forms + Loom

**Workflow Optimizado:**
1. **ChatGPT** - Gerar problemas contextualizados
2. **Google Forms** - Criar avaliações com correção automática
3. **Loom** - Explicar resoluções em vídeo
4. **Canva** - Visualizar conceitos abstratos

**Exemplo Aplicado:**
- Problemas de função usando dados de crescimento populacional brasileiro
- Quiz adaptativo que aumenta dificuldade automaticamente
- Vídeos explicativos personalizados por dúvida comum

### 🧪 Ciências
**Ferramentas Principais:** Perplexity + DALL-E + Notion

**Abordagem Integrada:**
1. **Perplexity** - Pesquisar descobertas científicas recentes
2. **DALL-E** - Gerar ilustrações de processos biológicos
3. **Notion** - Organizar experimentos e resultados
4. **Loom** - Documentar experimentos práticos

### 🌍 História/Geografia
**Ferramentas Principais:** ChatGPT + Canva + DeepL

**Metodologia Ativa:**
1. **ChatGPT** - Simular personagens históricos para debates
2. **Canva** - Criar linhas do tempo interativas
3. **DeepL** - Traduzir fontes primárias
4. **Notion** - Mapear conexões entre eventos

## 10. Recursos Gratuitos e Acessíveis

### 💰 Análise de Custos

#### Ferramentas Totalmente Gratuitas
- **ChatGPT** - Versão básica robusta
- **Google Bard** - Ilimitado com conta Google
- **Canva** - Templates educacionais gratuitos
- **Loom** - 25 vídeos grátis por mês
- **Google Forms** - Completamente gratuito

#### Investimentos Que Valem a Pena
- **ChatGPT Plus** - R$ 100/mês - Prioridade e GPT-4
- **Canva Pro** - R$ 54/mês - Templates premium
- **Notion Pro** - R$ 40/mês - IA ilimitada
- **Claude Pro** - R$ 100/mês - Análises avançadas

#### Estratégia Escalonada
**Mês 1-2:** Usar apenas versões gratuitas
**Mês 3-4:** Investir em 1 ferramenta premium
**Mês 5+:** Expandir conforme necessidade específica

### 🇧🇷 Adaptações para Realidade Brasileira

#### Contexto Socioeconômico
- **Priorizar** ferramentas gratuitas
- **Considerar** limitações de internet
- **Focar** em celular como plataforma principal
- **Criar** conteúdo offline quando possível

#### Relevância Cultural
- **Exemplos** com realidade brasileira
- **Referências** à cultura local
- **Dados** estatísticos nacionais
- **Problemas** sociais contemporâneos

## Conclusão: Sua Caixa de Ferramentas IA

Dominar essas ferramentas não é mais opcional - é **essencial** para o educador moderno. Cada ferramenta tem seu momento e propósito:

### Para Começar Hoje
1. **ChatGPT** - Sua base fundamental
2. **Google Forms** - Avaliações imediatas
3. **Canva** - Visuais impactantes

### Para Evoluir
1. **Claude** - Análises profundas
2. **Notion** - Organização total
3. **Loom** - Comunicação eficaz

### Para Dominar
1. **Perplexity** - Pesquisa avançada
2. **DALL-E** - Criatividade visual
3. **Turnitin** - Excelência acadêmica

**Lembre-se:** A melhor ferramenta é aquela que você **domina** e usa **consistentemente**. Comece devagar, seja constante, e logo você estará criando experiências educacionais que seus alunos nunca esquecerão.

**O futuro da educação está em suas mãos - literalmente!** 🚀📱
      `,
      aiTools: [
        {
          name: 'ChatGPT',
          description: 'IA conversacional para criação de conteúdo educacional',
          url: 'https://chat.openai.com',
          useCase: 'Geração de planos de aula e exercícios'
        },
        {
          name: 'Claude',
          description: 'IA especializada em análise detalhada e feedback',
          url: 'https://claude.ai',
          useCase: 'Correção de redações e análise profunda'
        },
        {
          name: 'Canva Magic Design',
          description: 'Criação visual com IA para materiais didáticos',
          url: 'https://canva.com',
          useCase: 'Infográficos e apresentações educacionais'
        },
        {
          name: 'Google Forms + IA',
          description: 'Avaliações automatizadas com feedback inteligente',
          url: 'https://forms.google.com',
          useCase: 'Quizzes e avaliações formativas'
        },
        {
          name: 'Perplexity',
          description: 'Pesquisa inteligente com fontes acadêmicas',
          url: 'https://perplexity.ai',
          useCase: 'Atualização de conteúdo e pesquisa'
        },
        {
          name: 'Notion AI',
          description: 'Organização e planejamento pedagógico inteligente',
          url: 'https://notion.so',
          useCase: 'Gestão de cronogramas e recursos'
        },
        {
          name: 'Loom',
          description: 'Gravação de vídeos com transcrição automática',
          url: 'https://loom.com',
          useCase: 'Micro-aulas e feedback em vídeo'
        },
        {
          name: 'DeepL',
          description: 'Tradução precisa para recursos multilíngues',
          url: 'https://deepl.com',
          useCase: 'Tradução de materiais acadêmicos'
        }
      ]
    },
    quiz: [
      {
        question: 'Qual ferramenta é mais indicada para criar planos de aula personalizados?',
        options: [
          'Google Forms',
          'ChatGPT',
          'Canva',
          'Loom'
        ],
        correct: 1
      },
      {
        question: 'Para correção detalhada de redações, qual IA oferece melhor análise?',
        options: [
          'ChatGPT',
          'Google Bard',
          'Claude',
          'Perplexity'
        ],
        correct: 2
      },
      {
        question: 'Qual é o primeiro passo ao implementar IA na educação?',
        options: [
          'Comprar todas as versões premium',
          'Começar com ferramentas gratuitas essenciais',
          'Usar apenas ferramentas brasileiras',
          'Aplicar imediatamente com todos os alunos'
        ],
        correct: 1
      },
      {
        question: 'Para pesquisar conteúdo acadêmico atualizado, qual ferramenta é ideal?',
        options: [
          'ChatGPT',
          'Canva',
          'Perplexity',
          'Loom'
        ],
        correct: 2
      },
      {
        question: 'Qual cuidado ético é fundamental ao usar IA em educação?',
        options: [
          'Nunca informar aos alunos sobre o uso de IA',
          'Usar dados pessoais para personalização',
          'Substituir completamente métodos tradicionais',
          'Sempre revisar e supervisionar conteúdo gerado'
        ],
        correct: 3
      }
    ],
    assignment: {
      title: 'Projeto: Kit de Ferramentas Personalizado',
      description: 'Crie seu toolkit pessoal de IA e teste na prática',
      requirements: [
        'Escolha 3 ferramentas do curso mais adequadas à sua disciplina',
        'Crie conta e configure cada ferramenta selecionada',
        'Desenvolva 1 material didático usando cada ferramenta',
        'Teste os materiais com pelo menos 5 alunos',
        'Documente facilidades, dificuldades e resultados',
        'Crie guia rápido personalizado para uso futuro',
        'Apresente comparativo: antes vs depois da IA'
      ],
      submission: 'Portfolio digital com materiais criados + relatório de testes + guia personalizado (formato livre)'
    },
    maestroInfo: {
      topic: 'Workshop Prático: Dominando Ferramentas de IA',
      duration: '90 min',
      agenda: [
        'Demonstração ao vivo: ChatGPT para planos de aula',
        'Hands-on: Criando visuais no Canva Magic Design',
        'Tutorial: Configurando avaliações automatizadas',
        'Prática dirigida: Testando 3 ferramentas essenciais',
        'Troubleshooting: Resolvendo problemas comuns'
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
                    <Wrench className="w-4 h-4 mr-1" />
                    Hands-on
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

        {/* Contextual AI Tools Suggestions */}
        <ContextualAIToolsSuggestions 
          lessonTitle={lesson.title}
          lessonContent={lesson.content.theory}
          moduleType="starter"
        />

        {/* Main Content */}
        <Tabs defaultValue="video" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="video">🛠️ Vídeo</TabsTrigger>
            <TabsTrigger value="content">📚 Conteúdo</TabsTrigger>
            <TabsTrigger value="quiz">❓ Quiz</TabsTrigger>
            <TabsTrigger value="assignment">🔧 Atividade</TabsTrigger>
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
                    Tutorial completo das ferramentas de IA mais importantes
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
                      {videoCompleted ? 'Concluído' : 'Assistir Tutorial'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Live Session with AI MAESTRO */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Workshop Ao Vivo
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
                      <p className="text-sm text-gray-600">Especialista em Ferramentas IA</p>
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
                    <h4 className="font-medium text-sm">Agenda Prática:</h4>
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
                        Inscrever-se no Workshop
                      </Button>
                      <p className="text-xs text-gray-500 text-center">
                        Limite: 50 participantes - Hands-on garantido!
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
                <CardTitle>Guia Completo: Ferramentas de IA para Educadores</CardTitle>
                <CardDescription>
                  Manual prático com tutoriais passo a passo das principais ferramentas
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
                    Baixar Guia PDF
                  </Button>
                  <Button variant="outline">
                    <Zap className="w-4 h-4 mr-2" />
                    Checklist de Implementação
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quiz Tab */}
          <TabsContent value="quiz">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Quiz: Ferramentas de IA
                  <Badge variant="outline">
                    {currentQuestion + 1} de {lesson.quiz.length}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Teste seu conhecimento sobre as principais ferramentas de IA educacional
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
                      {quizScore / lesson.quiz.length >= 0.7 ? '🛠️' : '📚'}
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
                          🚀 Perfeito! Você está pronto para usar as ferramentas
                        </Badge>
                        <p className="text-sm text-gray-600">
                          Hora de colocar a mão na massa com o projeto prático!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Badge variant="destructive" className="px-4 py-2">
                          📖 Revise as ferramentas - Foque nos casos de uso
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
                  <h4 className="font-medium text-gray-900 mb-3">Etapas do Projeto:</h4>
                  <ul className="space-y-2">
                    {lesson.assignment.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">Entrega Final:</h4>
                  <p className="text-sm text-purple-800">{lesson.assignment.submission}</p>
                </div>
                
                <div className="flex space-x-4">
                  <Button className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Enviar Toolkit
                  </Button>
                  <Button variant="outline">
                    Ver Template
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