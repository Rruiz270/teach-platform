'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Play, CheckCircle, Clock, BookOpen, Video, Users, Award, Download, ExternalLink, Calendar } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function LessonPage() {
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

  // This is lesson 3 - "Avaliação Automatizada"
  const lesson = {
    title: 'Avaliação Automatizada',
    module: 'Survivor - IA na Prática',
    duration: '50 min',
    description: 'Domine ferramentas de IA para criar, aplicar e corrigir avaliações de forma automatizada e eficiente',
    ageGroup: 'Ensino Fundamental',
    objectives: [
      'Criar testes e questionários automatizados',
      'Configurar correção automática inteligente',
      'Analisar relatórios de desempenho dos alunos',
      'Implementar feedback instantâneo'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    liveSession: {
      date: '2024-12-20',
      time: '20:00',
      instructor: 'Prof. Márcia Santos',
      registered: true
    },
    content: {
      theory: `
# Avaliação Automatizada com IA

## 1. Revolução na Avaliação Educacional

### Por que Automatizar Avaliações?
- **Eficiência**: Correção instantânea para centenas de alunos
- **Consistência**: Critérios padronizados e objetivos
- **Analytics**: Dados detalhados sobre desempenho
- **Personalização**: Adaptação automática por nível

### Tipos de Avaliação Automatizada
1. **Questões Objetivas** - Multiple choice, V/F, associação
2. **Questões Discursivas** - IA analisa texto e conceitos
3. **Avaliações Adaptativas** - Dificuldade ajusta automaticamente
4. **Portfólios Digitais** - Análise contínua de trabalhos

## 2. Ferramentas Essenciais por Categoria

### Plataformas Completas
- **Google Forms + AI** - Gratuito, intuitivo
- **Microsoft Forms** - Integração Office 365
- **Kahoot!** - Gamificação e engajamento
- **Quizizz** - Competição saudável
- **Mentimeter** - Interação em tempo real

### IA Especializada em Avaliação
- **Gradescope** - Correção de provas manuscritas
- **Turnitin** - Detecção de plágio + feedback
- **Socrative** - Avaliação formativa instantânea
- **Edpuzzle** - Questionários em vídeos

### Ferramentas de Análise
- **Google Analytics for Education**
- **Power BI** - Dashboards personalizados  
- **Tableau** - Visualização avançada
- **Python + Pandas** - Análise customizada

## 3. Criação de Avaliações com IA

### Prompts para Geração de Questões

**Template Base:**
\`\`\`
CONTEXTO: Sou professor(a) de [DISCIPLINA] para [ANO/SÉRIE]
TÓPICO: [CONTEÚDO ESPECÍFICO]
COMPETÊNCIA BNCC: [CÓDIGO]
NÍVEL: [BÁSICO/INTERMEDIÁRIO/AVANÇADO]

Crie 10 questões de múltipla escolha:
- 4 alternativas cada
- 1 correta, 3 plausíveis
- Incluir justificativa da resposta
- Variar níveis cognitivos (Bloom)
- Contextualizar com situações reais
\`\`\`

### Exemplo Prático - Matemática 7º Ano

**Prompt:**
"Crie questões sobre equações do 1º grau para 7º ano, focando em situações-problema do cotidiano brasileiro"

**Resposta da IA:**
1. João comprou 3 pacotes de biscoito e ainda ficou com R$ 5,00 de troco de uma nota de R$ 20,00. Se cada pacote custou o mesmo valor, quanto pagou por cada um?
   a) R$ 3,00
   b) R$ 5,00  
   c) R$ 6,00 ✓
   d) R$ 7,00

### Questões Discursivas com IA

**Para Português:**
\`\`\`
Analise esta redação do aluno considerando:
1. Estrutura textual (introdução, desenvolvimento, conclusão)
2. Coesão e coerência
3. Adequação à norma padrão
4. Criatividade e originalidade
5. Atendimento ao tema

Forneça nota de 0-10 e feedback construtivo.
\`\`\`

**Para Ciências:**
\`\`\`
Avalie esta resposta sobre fotossíntese:
[RESPOSTA DO ALUNO]

Critérios:
- Conhecimento científico correto (40%)
- Uso de vocabulário técnico (20%)
- Explicação dos processos (30%)
- Exemplos práticos (10%)

Dê nota e sugestões de melhoria.
\`\`\`

## 4. Implementação Prática Passo a Passo

### Fase 1: Planejamento (Semana 1)
1. **Mapeamento de Conteúdos**
   - Listar todos os tópicos do semestre
   - Definir pesos e importância
   - Alinhar com cronograma escolar

2. **Escolha de Ferramentas**  
   - Avaliar recursos disponíveis na escola
   - Testar 2-3 plataformas
   - Verificar acessibilidade dos alunos

3. **Criação de Banco de Questões**
   - 50+ questões por tópico
   - Diferentes níveis de dificuldade
   - Variedade de formatos

### Fase 2: Desenvolvimento (Semanas 2-3)
1. **Configuração de Plataformas**
   - Criar contas e turmas
   - Configurar parâmetros de correção
   - Testar integrações necessárias

2. **Criação de Avaliações Piloto**
   - 1 avaliação formativa por semana
   - Testes de 10-15 questões
   - Feedback imediato habilitado

3. **Treinamento dos Alunos**
   - Tutorial de 15 min sobre a plataforma
   - Simulado para familiarização
   - FAQ com dúvidas comuns

### Fase 3: Implementação (Semanas 4+)
1. **Avaliações Regulares**
   - Diagnósticas (início de módulo)
   - Formativas (durante aprendizagem)
   - Somativas (fim de módulo)

2. **Análise de Dados**
   - Relatórios semanais de desempenho
   - Identificação de dificuldades comuns
   - Ajustes nas estratégias pedagógicas

3. **Feedback Contínuo**
   - Para alunos: pontos fortes e melhoria
   - Para pais: evolução e recomendações
   - Para gestão: estatísticas da turma

## 5. Correção Automatizada Inteligente

### Questões Objetivas
- Correção instantânea 100% precisa
- Análise estatística automática  
- Identificação de questões problemáticas
- Relatórios por item e por aluno

### Questões Discursivas com IA

**ChatGPT para Correção:**
\`\`\`
Você é um professor experiente. Corrija esta resposta:

PERGUNTA: "Explique o processo de digestão"
RESPOSTA DO ALUNO: [texto do aluno]

CRITÉRIOS DE AVALIAÇÃO:
- Sequência correta dos processos (25%)
- Órgãos mencionados corretamente (25%)  
- Vocabulário científico adequado (25%)
- Clareza na explicação (25%)

FORNEÇA:
1. Nota de 0-10
2. Pontos positivos identificados
3. Erros conceituais (se houver)
4. Sugestões específicas de melhoria
5. Próximos passos de estudo
\`\`\`

### Rubrica Automatizada
Crie critérios específicos para que a IA avalie consistentemente:

**Exemplo - Redação:**
- Estrutura textual (0-2,5 pontos)
- Gramática e ortografia (0-2,5 pontos)  
- Coerência argumentativa (0-2,5 pontos)
- Criatividade e estilo (0-2,5 pontos)

## 6. Analytics e Relatórios Inteligentes

### Dashboard do Professor
- Média da turma por tópico
- Alunos com dificuldades específicas
- Evolução temporal do desempenho
- Comparação entre turmas

### Insights Automáticos
A IA pode gerar relatórios como:
- "78% dos alunos erraram questões sobre frações"
- "Maria melhorou 40% em interpretação textual"  
- "Tópico X precisa ser revisado com a turma"
- "5 alunos precisam de reforço em Y"

### Predições e Alertas
- Risco de reprovação (alertas precoces)
- Recomendações de intervenção
- Identificação de talentos específicos
- Sugestões de agrupamentos para atividades

## 7. Personalização e Adaptação

### Avaliações Adaptativas
- Questões ficam mais difíceis se aluno acerta
- Questões ficam mais fáceis se aluno erra
- Foco automático em lacunas de conhecimento
- Tempo de prova otimizado por perfil

### Caminhos de Aprendizagem
Com base nos resultados, a IA sugere:
- Conteúdos de reforço específicos
- Atividades complementares
- Recursos multimídia adequados
- Agrupamentos colaborativos

## 8. Casos Práticos por Disciplina

### Matemática
- **Photomath** para verificar resolução de problemas
- **GeoGebra** para geometria interativa
- **Khan Academy** para exercícios adaptativos
- **Symbolab** para cálculo avançado

### Português  
- **Turnitin** para originalidade de textos
- **LanguageTool** para correção gramatical
- **Resoomer** para análise de resumos
- **GPT-4** para avaliação dissertativa

### Ciências
- **Labster** para simulações de laboratório
- **PhET** para simulações de física
- **ChemSketch** para química orgânica
- **Google Earth** para geografia

### História
- **Timeline JS** para cronologias
- **StoryMap** para narrativas geográficas
- **Padlet** para colaboração histórica
- **Mentimeter** para debates estruturados

## 9. Boas Práticas e Armadilhas

### ✅ Faça
- Combine avaliação automática com humana
- Varie tipos e formatos de questões  
- Use dados para adaptar ensino
- Dê feedback construtivo e específico
- Mantenha banco de questões atualizado

### ❌ Evite
- Depender 100% de automação
- Ignorar contexto cultural dos alunos
- Usar apenas questões de memorização
- Negligenciar aspectos socioemocionais  
- Confiar cegamente na correção automática

### Dicas de Segurança
- Backup regular de dados
- Conformidade com LGPD
- Acesso seguro de alunos
- Transparência sobre uso de IA
- Plano B para falhas técnicas

## 10. Futuro da Avaliação com IA

### Tendências Emergentes
- **IA Conversacional** para avaliação oral
- **Realidade Aumentada** para avaliações imersivas  
- **Blockchain** para certificação digital
- **Biometria** para segurança de provas
- **Emotional AI** para estado emocional

### Preparando-se para o Futuro
1. Desenvolva fluência digital contínua
2. Mantenha foco na pedagogia, não só na tecnologia
3. Cultive pensamento crítico sobre IA
4. Participe de comunidades de educadores inovadores
5. Experimente novas ferramentas constantemente

A avaliação automatizada não substitui o professor, mas amplifica sua capacidade de personalizar o ensino e otimizar o tempo para o que realmente importa: o desenvolvimento integral dos alunos.
      `,
      aiTools: [
        {
          name: 'Google Forms',
          description: 'Criação de questionários com correção automática',
          url: 'https://forms.google.com',
          useCase: 'Avaliações formativas e somativas básicas'
        },
        {
          name: 'Kahoot!',
          description: 'Gamificação de avaliações em tempo real',
          url: 'https://kahoot.com',
          useCase: 'Revisões interativas e engajamento'
        },
        {
          name: 'Gradescope',
          description: 'IA para correção de provas manuscritas',
          url: 'https://gradescope.com',
          useCase: 'Correção automática de provas tradicionais'
        },
        {
          name: 'ChatGPT',
          description: 'Análise de respostas discursivas',
          url: 'https://chat.openai.com',
          useCase: 'Correção de redações e questões abertas'
        },
        {
          name: 'Turnitin',
          description: 'Detecção de plágio + feedback automático',
          url: 'https://turnitin.com',
          useCase: 'Originalidade e feedback detalhado'
        }
      ]
    },
    quiz: [
      {
        question: 'Qual é a principal vantagem da avaliação automatizada?',
        options: [
          'Substituir completamente o professor',
          'Correção instantânea com dados detalhados',
          'Eliminar a necessidade de estudar',
          'Tornar todas as provas mais fáceis'
        ],
        correct: 1
      },
      {
        question: 'Para correção de questões discursivas, qual abordagem é mais eficaz?',
        options: [
          'Correção 100% automática sem revisão',
          'Apenas correção manual tradicional',
          'IA para primeira correção + revisão humana',
          'Não corrigir questões discursivas'
        ],
        correct: 2
      },
      {
        question: 'O que caracteriza uma avaliação adaptativa?',
        options: [
          'Sempre usar as mesmas questões',
          'Dificuldade ajusta conforme desempenho do aluno',
          'Apenas questões muito difíceis',
          'Provas sem tempo limite'
        ],
        correct: 1
      },
      {
        question: 'Qual cuidado é essencial ao implementar avaliação automatizada?',
        options: [
          'Usar apenas questões objetivas',
          'Ignorar feedback dos alunos',
          'Combinar automação com avaliação humana',
          'Aplicar apenas provas online'
        ],
        correct: 2
      }
    ],
    assignment: {
      title: 'Projeto: Sistema de Avaliação Automatizada',
      description: 'Crie um sistema completo de avaliação para sua disciplina',
      requirements: [
        'Desenvolva banco com 30+ questões de sua matéria',
        'Configure uma plataforma de avaliação automatizada',
        'Teste com grupo piloto de alunos',
        'Crie dashboard de acompanhamento',
        'Documente resultados e ajustes necessários',
        'Apresente comparativo: antes x depois da automação'
      ],
      submission: 'Relatório completo + demonstração prática do sistema'
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

      {/* Content - Same structure as lesson 1 but with different content */}
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

        {/* Tabs with same structure but lesson 3 content */}
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="mr-2 h-5 w-5" />
                  {lesson.title} - Aula Completa
                </CardTitle>
                <CardDescription>
                  Aprenda a implementar avaliação automatizada na prática
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-4 opacity-70" />
                    <p className="text-lg mb-2">Avaliação Automatizada com IA</p>
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
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Material Completo: Avaliação Automatizada</CardTitle>
                <CardDescription>
                  Guia detalhado com exemplos práticos e implementação passo a passo
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
                        <strong>Especialidade:</strong> {tool.useCase}
                      </p>
                      <div className="flex space-x-2">
                        <Button asChild size="sm" className="flex-1">
                          <a href={tool.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Usar Ferramenta
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
                  Avaliação de Conhecimento
                  <Badge variant="outline">
                    {currentQuestion + 1} de {lesson.quiz.length}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Demonstre que domina os conceitos de avaliação automatizada
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
                      Avaliação Finalizada!
                    </h3>
                    <p className="text-lg">
                      Resultado: {quizScore} de {lesson.quiz.length} questões corretas 
                      ({Math.round((quizScore / lesson.quiz.length) * 100)}%)
                    </p>
                    {quizScore / lesson.quiz.length >= 0.7 ? (
                      <div className="space-y-2">
                        <Badge variant="default" className="px-4 py-2">
                          ✅ Excelente! Aprovado com nota {Math.round((quizScore / lesson.quiz.length) * 100)}%
                        </Badge>
                        <p className="text-sm text-gray-600">
                          Você domina os conceitos de avaliação automatizada!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Badge variant="destructive" className="px-4 py-2">
                          📖 Nota insuficiente - Revise o conteúdo
                        </Badge>
                        <Button 
                          onClick={() => {
                            setCurrentQuestion(0)
                            setQuizScore(0)
                          }}
                        >
                          Refazer Avaliação
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
                  <h4 className="font-medium text-gray-900 mb-3">Entregáveis do Projeto:</h4>
                  <ul className="space-y-2">
                    {lesson.assignment.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-medium text-amber-900 mb-2">Formato de Entrega:</h4>
                  <p className="text-sm text-amber-800">{lesson.assignment.submission}</p>
                </div>
                
                <div className="flex space-x-4">
                  <Button className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Submeter Projeto
                  </Button>
                  <Button variant="outline">
                    Ver Rubrica
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