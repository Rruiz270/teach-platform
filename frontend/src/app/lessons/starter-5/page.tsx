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
import { ArrowLeft, Play, CheckCircle, Clock, BookOpen, Video, Users, Award, Download, ExternalLink, Calendar, Brain, Target, Lightbulb, Code, Wand2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import LearningAIInterface from '@/components/LearningAIInterface'

export default function StarterLesson5Page() {
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
    title: 'Criando Prompts Eficazes',
    module: 'Starter - Fundamentos de IA',
    duration: '60 min',
    description: 'Domine a arte de criar prompts que geram resultados excepcionais: técnicas avançadas e templates práticos',
    ageGroup: 'Todos os Níveis',
    level: 'Iniciante',
    objectives: [
      'Dominar a ciência por trás de prompts eficazes',
      'Aplicar técnicas avançadas de prompt engineering',
      'Criar templates reutilizáveis para sua disciplina',
      'Resolver problemas comuns de prompting'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    liveSession: {
      date: '2024-12-19',
      time: '20:00',
      instructor: 'AI MAESTRO',
      duration: '120 min',
      registered: false,
      description: 'Masterclass: Prompts que transformam resultados'
    },
    content: {
      theory: `
# Criando Prompts Eficazes: A Arte de Comandar a IA

## 1. A Ciência por Trás dos Prompts Excepcionais

### Por que Alguns Prompts Funcionam e Outros Não?
A diferença entre um **prompt medíocre** e um **prompt extraordinário** pode significar a diferença entre perder 2 horas criando material didático manualmente ou ter conteúdo profissional pronto em 5 minutos. 

**Estatísticas Reveladoras:**
- **87%** dos professores abandonam IA após primeiros resultados ruins
- **Prompts bem estruturados** geram **10x melhores resultados**
- **Templates testados** reduzem **90%** do tempo de tentativa e erro
- **Professores expert** economizam **15+ horas semanais** com prompts otimizados

### Neurociência da IA: Como o ChatGPT "Pensa"
O ChatGPT não pensa como humanos - ele funciona através de **padrões estatísticos** em texto. Entender isso é fundamental:

#### Como a IA Processa Seu Prompt
\`\`\`
1. ANÁLISE → Quebra seu texto em tokens (palavras/partes)
2. CONTEXTO → Busca padrões similares no treinamento 
3. PROBABILIDADE → Calcula próximas palavras mais prováveis
4. GERAÇÃO → Produz resposta baseada em estatísticas
5. REFINAMENTO → Ajusta baseado no contexto completo
\`\`\`

#### Implicações Práticas para Educadores
- **Clareza** é mais importante que brevidade
- **Contexto específico** gera respostas mais precisas
- **Exemplos** ajudam a IA entender o padrão desejado
- **Estrutura** facilita o processamento estatístico

## 2. Anatomia de um Prompt Perfeito

### Framework P.R.E.C.I.S.O

#### **P** - Papel Específico
Defina **exatamente** quem a IA deve ser:

❌ **Vago:** "Você é um professor"
✅ **Específico:** "Você é um professor de matemática do 8º ano com 15 anos de experiência em escolas públicas brasileiras, especialista em dificuldades de aprendizagem"

#### **R** - Realidade Contextual
Forneça **contexto detalhado** da situação:

✅ **Contexto Rico:**
\`\`\`
Contexto: Leciono para 35 alunos de 8º ano em escola pública de Recife. A turma tem perfil misto: 40% com dificuldade em operações básicas, 30% no nível adequado, 30% avançados. Tenho 50 minutos de aula, quadro branco, projetor básico e acesso limitado à internet.
\`\`\`

#### **E** - Especificação da Tarefa
Use **verbos de ação precisos**:

**Verbos Poderosos para Educação:**
- **Criar**: planos, exercícios, avaliações
- **Adaptar**: para diferentes níveis/necessidades
- **Analisar**: trabalhos, desempenho, métodos
- **Explicar**: conceitos complexos simplesmente
- **Sequenciar**: conteúdo por dificuldade
- **Contextualizar**: para realidade brasileira

#### **C** - Critérios de Qualidade
Estabeleça **padrões específicos**:

✅ **Critérios Claros:**
\`\`\`
Critérios:
- Linguagem adequada para 13-14 anos
- Exemplos do cotidiano brasileiro
- Alinhamento com habilidade BNCC EF08MA06
- Progressão gradual de dificuldade
- Inclusão de verificação de compreensão
\`\`\`

#### **I** - Instruções de Formato
Especifique **exatamente** como quer a resposta:

✅ **Formato Estruturado:**
\`\`\`
Formato:
1. Título da atividade
2. Objetivo em 1 frase
3. Material necessário (lista)
4. Passo a passo (numerado)
5. Tempo estimado para cada etapa
6. 3 perguntas de verificação
7. Adaptação para alunos com dificuldade
\`\`\`

#### **S** - Segmentação (se necessário)
Para tarefas complexas, **quebre em etapas**:

✅ **Abordagem Segmentada:**
\`\`\`
Primeira resposta: Foque apenas no planejamento geral
Segunda resposta: Desenvolva a primeira atividade detalhadamente
Terceira resposta: Crie material de apoio visual
\`\`\`

#### **O** - Otimização Específica
Adicione **instruções especiais** para seu contexto:

✅ **Otimizações Práticas:**
\`\`\`
Considerações especiais:
- Alguns alunos têm TDAH (incluir pausas)
- Turma é agitada às 6ª aulas (atividade mais dinâmica)
- Período pós-recreio (começar com ativação)
- Preparar para alunos que terminam mais rápido
\`\`\`

### Template Master P.R.E.C.I.S.O

\`\`\`
PAPEL: Você é um [especialista específico com características detalhadas]

REALIDADE: [Contexto detalhado: onde, quando, com quem, que recursos, que limitações]

ESPECIFICAÇÃO: [Verbo de ação] + [objeto específico] + [quantidade/escopo]

CRITÉRIOS: 
- [Padrão de qualidade 1]
- [Padrão de qualidade 2]
- [Padrão de qualidade 3]

INSTRUÇÕES DE FORMATO:
[Estrutura exata que deseja na resposta]

SEGMENTAÇÃO: [Se aplicável - dividir em etapas]

OTIMIZAÇÃO: [Considerações especiais do seu contexto]
\`\`\`

## 3. Técnicas Avançadas de Prompt Engineering

### Técnica 1: Chain of Thought (Cadeia de Pensamento)

#### O que é?
Pedir para a IA **"mostrar o raciocínio"** passo a passo.

#### Quando Usar?
- Resolução de problemas complexos
- Criação de sequências didáticas
- Análise de casos educacionais
- Tomada de decisões pedagógicas

#### Exemplo Prático:
❌ **Sem Chain of Thought:**
"Crie uma sequência de 3 aulas sobre frações"

✅ **Com Chain of Thought:**
\`\`\`
Crie uma sequência de 3 aulas sobre frações para 6º ano. 

IMPORTANTE: Antes de criar as aulas, explique seu raciocínio:
1. Que conhecimentos prévios os alunos precisam ter?
2. Qual a progressão lógica ideal?
3. Que dificuldades comuns você antecipa?
4. Como cada aula prepara a próxima?

Depois, baseado nesse raciocínio, desenvolva as 3 aulas detalhadamente.
\`\`\`

### Técnica 2: Few-Shot Learning (Aprender com Exemplos)

#### O que é?
Mostrar **2-3 exemplos** do padrão que você quer.

#### Poder desta Técnica:
- IA entende **exatamente** o estilo desejado
- Resultados **10x mais consistentes**
- Elimina **95%** das tentativas de ajuste

#### Template Few-Shot:
\`\`\`
Crie exercícios de [matéria] seguindo este padrão:

EXEMPLO 1:
[Seu exemplo ideal]

EXEMPLO 2:
[Variação do seu padrão]

EXEMPLO 3:
[Outra variação]

Agora crie 5 exercícios seguindo exatamente este padrão para [contexto específico].
\`\`\`

#### Caso Prático - Exercícios de História:
\`\`\`
Crie questões de História seguindo este padrão:

EXEMPLO 1:
CONTEXTO: "Em 1822, D. Pedro I proclamou a independência às margens do Ipiranga"
PERGUNTA: "Que fatores econômicos tornaram a independência inevitável neste período?"
NÍVEL: Análise (Bloom)
RESPOSTA ESPERADA: Pressões comerciais inglesas, crise do sistema colonial, etc.

EXEMPLO 2:
CONTEXTO: "A Semana de Arte Moderna de 1922 marcou o início do Modernismo no Brasil"
PERGUNTA: "Como este movimento refletiu as transformações sociais urbanas da época?"
NÍVEL: Síntese (Bloom)
RESPOSTA ESPERADA: Industrialização, imigração, crescimento urbano, etc.

Agora crie 5 questões neste mesmo padrão sobre a Era Vargas.
\`\`\`

### Técnica 3: Role-Playing Específico

#### Além do Papel Básico
Não apenas "você é um professor", mas **role-playing detalhado**:

✅ **Role-Playing Avançado:**
\`\`\`
Você é Maria Silva, professora de português há 12 anos na EMEF Jardim Primavera em São Paulo. Você conhece bem os desafios de ensinar 35 alunos de 7º ano, muitos filhos de imigrantes bolivianos e haitianos. Sua especialidade é desenvolver leitura crítica usando metodologias ativas. Você sempre adapta o conteúdo para a realidade multicultural da sua turma.

Como a professora Maria Silva, crie...
\`\`\`

#### Por que Funciona?
- IA "incorpora" experiências específicas
- Respostas mais autênticas e realistas
- Considera limitações e oportunidades reais
- Linguagem adequada ao contexto

### Técnica 4: Prompt Iterativo (Refinamento Progressivo)

#### Processo de 3 Etapas:

**Etapa 1 - Brainstorming:**
\`\`\`
Faça um brainstorm de 10 ideias para ensinar [tópico] de forma criativa para [contexto]
\`\`\`

**Etapa 2 - Desenvolvimento:**
\`\`\`
Pegue a ideia #3 da lista anterior e desenvolva completamente, incluindo [especificações]
\`\`\`

**Etapa 3 - Otimização:**
\`\`\`
Agora ajuste essa atividade considerando que alguns alunos têm [característica específica]
\`\`\`

### Técnica 5: Constraint-Based Prompting (Limitações Criativas)

#### O que é?
Dar **limitações específicas** que forçam criatividade.

#### Exemplos Poderosos:
\`\`\`
✅ "Ensine sistema solar usando APENAS objetos da cozinha"
✅ "Explique democracia através de uma receita de bolo"
✅ "Crie exercício de matemática que funcione APENAS com celular"
✅ "Ensine fotossíntese como se fosse uma história de super-herói"
\`\`\`

#### Por que Funciona?
- Limitações estimulam **soluções criativas**
- Força IA a **pensar fora da caixa**
- Gera **ideias originais** e memoráveis
- Adapta automaticamente aos seus **recursos disponíveis**

## 4. Templates Testados por Disciplina

### 📚 Português - Templates Comprovados

#### Template 1: Análise Literária Engajante
\`\`\`
PAPEL: Você é um professor de literatura especialista em conectar clássicos com a realidade dos adolescentes.

REALIDADE: Ensino [obra] para [série] em [tipo de escola]. Meus alunos têm dificuldade para ver relevância nos clássicos e se sentem distantes da linguagem/época.

ESPECIFICAÇÃO: Crie uma atividade que conecte [obra] com [tema atual: redes sociais/relacionamentos/injustiça social/tecnologia].

CRITÉRIOS:
- Manter respeito pela obra original
- Linguagem acessível aos adolescentes  
- Despertar interesse genuíno
- Estimular reflexão crítica
- Ser aplicável em 50 minutos

FORMATO:
1. Gancho inicial (situação atual que ecoa a obra)
2. Ponte explícita entre presente e obra
3. Atividade interativa (debate/encenação/criação)
4. Fechamento reflexivo
5. Avaliação da compreensão
\`\`\`

#### Template 2: Produção Textual Contextualizada
\`\`\`
Crie uma proposta de redação que:

CONTEXTO: [Gênero textual] sobre [tema relevante] para [série]

ESTRUTURA OBRIGATÓRIA:
- Situação comunicativa real (não escolar)
- Público-alvo específico
- Propósito claro e motivador
- Critérios de avaliação transparentes
- Banco de repertório para consulta

DIFERENCIAL: A redação deve ter aplicação prática na vida dos alunos (será realmente enviada/publicada/usada).

Exemplo: Carta para prefeito sobre problema real do bairro da escola.
\`\`\`

### 🔢 Matemática - Templates de Alta Performance

#### Template 1: Problemas Contextualizados Brasileiros
\`\`\`
PAPEL: Você é um especialista em contextualização matemática para a realidade brasileira.

TAREFA: Crie [quantidade] problemas de [conteúdo] para [série] usando dados REAIS do Brasil.

OBRIGATÓRIO:
- Usar dados de IBGE, INEP, ou órgãos oficiais
- Situações que alunos reconhecem do cotidiano
- Números realistas (não astronômicos ou irreais)
- Conexão clara entre matemática e realidade social

FORMATO PARA CADA PROBLEMA:
1. Contexto (situação brasileira real)
2. Dados fornecidos (com fonte)
3. Pergunta clara
4. Nível de dificuldade
5. Competência BNCC
6. Resolução comentada
7. Possível discussão social/cidadã

EXEMPLOS DE CONTEXTOS: Bolsa família, SUS, transporte público, energia elétrica, inflação, eleições, censo demográfico
\`\`\`

#### Template 2: Sequência Didática Concreta-Abstrato
\`\`\`
Crie sequência de 4 atividades para ensinar [conceito] seguindo progressão:

ATIVIDADE 1 - CONCRETO: Manipulação física com objetos
ATIVIDADE 2 - PICTÓRICO: Representação visual/desenhos  
ATIVIDADE 3 - SIMBÓLICO: Introdução de símbolos matemáticos
ATIVIDADE 4 - ABSTRATO: Aplicação formal do conceito

PARA CADA ATIVIDADE:
- Materiais necessários (acessíveis)
- Tempo estimado
- Instruções passo a passo
- Perguntas orientadoras
- Possíveis dificuldades e soluções
- Critério de "pronto para próxima etapa"
\`\`\`

### 🧪 Ciências - Templates de Investigação

#### Template 1: Experimento Adaptado
\`\`\`
PAPEL: Você é um professor de ciências especialista em experimentos com recursos limitados.

DESAFIO: Adapte o experimento clássico de [conceito científico] para:
- Escola sem laboratório
- Materiais encontráveis em casa brasileira típica
- Orçamento máximo de R$20 para turma
- Segurança total (menores de idade)

ENTREGUE:
1. Lista de compras (com preços médios)
2. Protocolo de segurança
3. Passo a passo ilustrado
4. Resultados esperados vs possíveis variações
5. Explicação científica acessível
6. Conexões com cotidiano brasileiro
7. Variações para diferentes idades

BÔNUS: Como transformar em competição saudável entre grupos
\`\`\`

#### Template 2: Ciência e Problemas Locais
\`\`\`
Conecte [conceito científico] com problema ambiental/social real de [sua região]:

INVESTIGAÇÃO ORIENTADA:
1. Problema local identificado
2. Ciência por trás do problema
3. Dados coletáveis pelos alunos
4. Hipóteses testáveis
5. Método de investigação simples
6. Apresentação dos resultados
7. Propostas de ação cidadã

EXEMPLO: Poluição do ar + química atmosférica + medições na escola + propostas para secretaria de meio ambiente
\`\`\`

### 🌍 História/Geografia - Templates Críticos

#### Template 1: Passado-Presente-Futuro
\`\`\`
Crie aula sobre [evento/período histórico] usando estrutura:

PARTE 1 - PASSADO (25%):
Contexto histórico essencial

PARTE 2 - PRESENTE (50%):
Conexões explícitas com Brasil/mundo atual
Exemplos: política, economia, sociedade, cultura

PARTE 3 - FUTURO (25%):
"E se...?" - Cenários possíveis baseados em padrões históricos

OBRIGATÓRIO:
- Fontes primárias acessíveis
- Múltiplas perspectivas (não só "versão oficial")
- Protagonismo de grupos marginalizados
- Pensamento crítico estimulado

PRODUTO FINAL: Alunos criam linha do tempo: passado → presente → cenários futuros
\`\`\`

## 5. Troubleshooting Avançado - Soluções para Problemas Reais

### 🚫 Problema: "IA Não Entende Meu Contexto Específico"

#### Sintomas:
- Respostas genéricas demais
- Exemplos americanos/europeus
- Não considera limitações brasileiras
- Ignora especificidades da sua escola

#### Solução: Técnica do "Contexto Expandido"

❌ **Prompt Vago:**
"Crie atividade para ensinar adição de frações"

✅ **Contexto Expandido:**
\`\`\`
CONTEXTO ESPECÍFICO EXPANDIDO:

ESCOLA: EMEF João da Silva, periferia de Salvador/BA
ALUNOS: 32 crianças de 11-12 anos, 7º ano
PERFIL SOCIOECONÔMICO: 80% famílias com renda até 2 salários mínimos
RECURSOS: Quadro branco, giz colorido, 1 projetor compartilhado
TEMPO: 50 minutos (6ª aula, pós-recreio, turma agitada)
CONHECIMENTO PRÉVIO: Dominam frações simples, dificuldade com denominadores diferentes
DESAFIOS: 8 alunos com defasagem em multiplicação básica
OPORTUNIDADES: Turma colaborativa, gosta de competições

Crie atividade para ensinar adição de frações com denominadores diferentes considerando TODOS esses aspectos.
\`\`\`

### 🚫 Problema: "Respostas Muito Longas ou Muito Curtas"

#### Controle Preciso de Extensão:

\`\`\`
✅ Para respostas concisas:
"Em exatamente 3 parágrafos"
"Máximo 200 palavras"
"5 itens, cada um com 1 frase"

✅ Para respostas detalhadas:
"Desenvolva cada ponto com exemplo prático"
"Incluir sub-itens explicativos"
"Fornecer justificativa para cada escolha"

✅ Para formato específico:
"Em forma de checklist numerado"
"Como conversa entre professor e aluno"
"Formato de roteiro de aula passo a passo"
\`\`\`

### 🚫 Problema: "IA Sugere Recursos que Não Tenho"

#### Solução: Limitação Prévia de Recursos

\`\`\`
✅ Especificação de Recursos:
"Usando APENAS: quadro branco, papel sulfite, lápis colorido"
"Sem acesso à internet durante a aula"
"Máximo 1 fotocópia por aluno"
"Recursos gratuitos disponíveis online"
"Materiais recicláveis comuns"

✅ Orçamento Explícito:
"Orçamento total: R$30 para 35 alunos"
"Sem custo adicional para escola"
"Materiais que alunos têm em casa"
\`\`\`

### 🚫 Problema: "Linguagem Inadequada para Minha Turma"

#### Calibração Precisa de Linguagem:

\`\`\`
✅ Para Alunos:
"Linguagem de adolescente de 14 anos da periferia de São Paulo"
"Como você explicaria para seu irmão mais novo"
"Sem termos técnicos, use analogias do futebol"
"Como youtuber educativo popular brasileiro"

✅ Para Professores:
"Nível técnico de coordenação pedagógica"
"Como em artigo de revista Nova Escola"
"Linguagem de formação continuada do MEC"
\`\`\`

### 🚫 Problema: "Não Alinha com BNCC"

#### Template BNCC-Compliance:

\`\`\`
OBRIGATÓRIO - ALINHAMENTO BNCC:

Habilidade específica: [Código BNCC]
Competência geral: [1-10]
Competência específica: [área do conhecimento]

Para cada atividade criada, explicite:
1. Como desenvolve a habilidade específica
2. Qual competência geral é trabalhada
3. Como se conecta com outras habilidades
4. Critérios de avaliação alinhados
5. Progressão esperada do aluno

Modelo: "Esta atividade desenvolve EF07MA09 ao exigir que alunos [ação específica], contribuindo para competência geral 2 [raciocínio lógico] através de [metodologia específica]"
\`\`\`

## 6. Criando Seu Arsenal Pessoal de Templates

### Sistema de Organização P.A.D.R.Ã.O

#### **P** - Pasta por Disciplina
Organize templates por área de conhecimento

#### **A** - Arquivo por Tipo de Atividade
- Planos de aula
- Exercícios
- Avaliações  
- Explicações
- Projetos

#### **D** - Documento com Variações
Para cada template, crie versões para:
- Diferentes séries/idades
- Contextos diversos (rural/urbano, público/privado)
- Recursos variados (high-tech/low-tech)

#### **R** - Registro de Resultados
Documente:
- Quais templates funcionaram melhor
- Ajustes necessários por turma
- Feedback dos alunos
- Tempo real de aplicação

#### **Ã** - Atualização Constante
- Refine baseado na experiência
- Adapte para mudanças curriculares
- Incorpore feedback dos colegas
- Teste variações

#### **O** - Otimização Contínua
- Combine templates que funcionam
- Elimine partes que não agregam
- Simplifique processos repetitivos
- Automatize o que for possível

### Template para Criar Templates

\`\`\`
NOME DO TEMPLATE: [Título descritivo]

QUANDO USAR:
- Situação específica onde aplica
- Tipo de conteúdo ideal
- Nível de dificuldade dos alunos

TEMPLATE:
[Estrutura P.R.E.C.I.S.O específica]

VARIAÇÕES TESTADAS:
- Para turmas agitadas: [ajustes]
- Para alunos com dificuldade: [adaptações]  
- Para recursos limitados: [alternativas]

RESULTADOS HISTÓRICOS:
- Taxa de engajamento: [%]
- Tempo médio de aplicação: [min]
- Qualidade dos resultados: [1-10]
- Feedback dos alunos: [resumo]

MELHORIAS POSSÍVEIS:
[Lista de ajustes para testar]
\`\`\`

## 7. Prompts Avançados para Situações Específicas

### Categoria: Diferenciação Pedagógica

#### Template para Múltiplos Níveis
\`\`\`
DESAFIO DIFERENCIAÇÃO:

Turma: [descrição]
Perfil de aprendizagem:
- Grupo A (30%): Acima do esperado
- Grupo B (50%): No nível adequado  
- Grupo C (20%): Abaixo do esperado

CRIE 3 VERSÕES da mesma atividade:
- VERSÃO A: Complexidade ampliada, autonomia total
- VERSÃO B: Nível padrão com suporte moderado
- VERSÃO C: Simplificada com suporte intensivo

REQUISITOS:
- Mesmo objetivo final para todos
- Atividades visualmente similares (sem constrangimento)
- Possibilidade de colaboração entre grupos
- Critérios de avaliação adaptados
- Transição possível entre níveis durante atividade
\`\`\`

### Categoria: Gestão de Sala

#### Template para Turmas Desafiadoras
\`\`\`
PERFIL DA TURMA DESAFIADORA:
[Descreva comportamentos específicos]

CONTEXTO SITUACIONAL:
- Horário da aula: [período]
- Pós/pré eventos: [recreio/educação física/prova]
- Tamanho da turma: [número]
- Espaço físico: [limitações]

CRIE ESTRATÉGIA que inclua:
1. Gancho de atenção (primeiros 3 min)
2. Atividade de alta energia (5-10 min)
3. Transição para foco (técnica específica)
4. Atividade principal adaptada (máx 20 min blocos)
5. Pausas estratégicas (quando e como)
6. Fechamento memorável (últimos 5 min)

BACKUP PLANS: 3 estratégias se a turma não colaborar
\`\`\`

### Categoria: Inclusão e Acessibilidade

#### Template Universal Design
\`\`\`
CRIAÇÃO INCLUSIVA:

Inclua automaticamente:

DIVERSIDADE COGNITIVA:
- TDAH: [adaptações específicas]
- Dislexia: [suportes visuais/auditivos]  
- Altas habilidades: [desafios extras]
- TEA: [estrutura previsível]

DIVERSIDADE FÍSICA:
- Mobilidade reduzida: [alternativas motoras]
- Visual: [descrições detalhadas]
- Auditiva: [suportes visuais]

DIVERSIDADE SOCIOCULTURAL:
- Diferentes ritmos: [flexibilidade temporal]
- Recursos limitados: [alternativas gratuitas]
- Diversidade cultural: [exemplos inclusivos]

PRODUTO FINAL: Atividade naturalmente acessível a todos, sem segregação
\`\`\`

### Categoria: Avaliação Formativa

#### Template para Feedback Contínuo
\`\`\`
SISTEMA DE AVALIAÇÃO CONTÍNUA:

Crie 5 pontos de verificação durante a aula:

CHECKPOINT 1 (min 10): [método rápido]
CHECKPOINT 2 (min 20): [técnica diferente]
CHECKPOINT 3 (min 30): [peer assessment]  
CHECKPOINT 4 (min 40): [autoavaliação]
CHECKPOINT 5 (min 50): [síntese]

PARA CADA CHECKPOINT:
- Técnica específica (não repetir)
- Tempo máximo: 2 minutos
- Ação baseada no resultado
- Ajuste possível na aula

OBJETIVO: Nunca chegar ao fim sem saber se aprenderam
\`\`\`

## 8. Prompts para Colaboração e Interdisciplinaridade

### Template para Projetos Interdisciplinares

\`\`\`
PROJETO INTERDISCIPLINAR:

TEMA CENTRAL: [Problema real/atual]
DISCIPLINAS ENVOLVIDAS: [2-4 matérias]
PERÍODO: [duração]

PARA CADA DISCIPLINA, DEFINA:
- Conceitos específicos abordados
- Metodologia particular
- Produto parcial esperado
- Critérios de avaliação próprios

INTEGRAÇÃO:
- Momentos de encontro entre disciplinas
- Produto final interdisciplinar
- Apresentação unificada
- Avaliação colaborativa

CONEXÃO REAL:
- Problema autêntico da comunidade
- Possibilidade de impacto real
- Parceiros externos (se possível)
- Documentação do processo
\`\`\`

### Template para Trabalho em Equipe

\`\`\`
FORMAÇÃO DE GRUPOS ESTRATÉGICA:

CRITÉRIO DE AGRUPAMENTO: [heterogêneo/homogêneo por habilidade/interesse/aleatório]

ESTRUTURA DE PAPÉIS:
- Coordenador: [responsabilidades]
- Pesquisador: [funções específicas]  
- Redator: [tarefas definidas]
- Apresentador: [atribuições claras]

ROTAÇÃO: Papéis mudam a cada [período]

PRESTAÇÃO DE CONTAS:
- Individual: [% da nota]
- Grupal: [% da nota]
- Peer assessment: [método]
- Autoavaliação: [critérios]

CONFLITOS: Protocolo para resolução de problemas
\`\`\`

## 9. Ética Avançada em Prompting

### Vieses Inconscientes em Prompts

#### Tipos de Vieses para Evitar:

**Viés de Confirmação:**
❌ "Prove que metodologia ativa é melhor"
✅ "Compare metodologia ativa e tradicional objetivamente"

**Viés Cultural:**
❌ "Crie exercícios universais"
✅ "Crie exercícios considerando diversidade cultural brasileira"

**Viés de Gênero:**
❌ Assumir profissões por gênero
✅ Usar exemplos diversificados conscientemente

**Viés Socioeconômico:**
❌ Assumir recursos que nem todos têm
✅ Especificar limitações reais

### Checklist Ético para Prompts

✅ **Antes de enviar prompts:**
- [ ] Inclui diversidade (gênero, etnia, classe)
- [ ] Considera limitações reais dos alunos
- [ ] Evita estereótipos inconscientes
- [ ] Promove pensamento crítico (não doutrinação)
- [ ] Respeita diferentes perspectivas
- [ ] É adequado para desenvolvimento da faixa etária

### Transparência com Alunos

#### Template para Explicar IA aos Alunos:
\`\`\`
CONVERSA SOBRE IA:

"Pessoal, vou explicar como uso inteligência artificial para melhorar nossas aulas:

O QUE EU USO:
- ChatGPT para criar exercícios personalizados
- IA para pesquisar informações atualizadas
- Ferramentas para adaptar conteúdo ao nosso nível

O QUE EU NÃO FAÇO:
- Corrigir provas sem revisar
- Aceitar tudo que IA fala como verdade
- Substituir minha experiência como professor

VOCÊS PODEM:
- Fazer perguntas sobre como uso IA
- Aprender a usar IA de forma ética
- Me ajudar a melhorar materiais criados

IMPORTANTE: IA é ferramenta, professor é quem ensina"
\`\`\`

## 10. Medindo o Sucesso dos Seus Prompts

### Métricas de Eficácia

#### Tempo de Produção:
- **Antes da IA**: X horas para criar material
- **Depois da IA**: Y minutos para mesmo resultado
- **Economia**: % de tempo poupado

#### Qualidade do Conteúdo:
- **Engajamento dos alunos**: observação qualitativa
- **Adequação ao nível**: feedback dos alunos
- **Alinhamento curricular**: checklist BNCC
- **Diversidade e inclusão**: análise crítica

#### Iterações Necessárias:
- **Prompts iniciantes**: 3-5 tentativas por resultado
- **Prompts otimizados**: 1-2 tentativas por resultado
- **Templates testados**: resultado na primeira tentativa

### Dashboard Pessoal de Prompts

\`\`\`
TEMPLATE DE AVALIAÇÃO:

PROMPT USADO: [copiar prompt completo]
DATA: [quando usado]
CONTEXTO: [turma, aula, objetivo]

RESULTADO:
- Adequação: [1-10]
- Economia de tempo: [horas poupadas]
- Engajamento dos alunos: [observação]
- Necessidade de ajustes: [quais]

STATUS:
[ ] Manter como está
[ ] Pequenos ajustes
[ ] Reformulação necessária
[ ] Descartar

MELHORIAS IDENTIFICADAS:
[Lista de ajustes para próxima vez]
\`\`\`

## Conclusão: Dominando a Arte dos Prompts Transformadores

Parabéns! Você acabou de adquirir uma **superpotência pedagógica**: a capacidade de comunicar-se efetivamente com inteligência artificial para criar recursos educacionais excepcionais.

### Sua Nova Realidade
Com domínio de prompts eficazes, você agora pode:

✅ **Criar** planos de aula personalizados em 10 minutos
✅ **Gerar** exercícios contextualizados instantaneamente  
✅ **Adaptar** qualquer conteúdo para diferentes níveis
✅ **Resolver** problemas pedagógicos com criatividade
✅ **Economizar** 15+ horas semanais de preparação
✅ **Multiplicar** sua eficácia educacional por 10x

### O Poder Está em Suas Mãos
Cada prompt que você domina é uma **ferramenta permanente** no seu arsenal pedagógico. Nos próximos 20 anos de carreira, essas habilidades irão:

- **Potencializar** seu impacto em milhares de alunos
- **Liberar** tempo para o que realmente importa: conexão humana
- **Manter** você na vanguarda da educação moderna
- **Transformar** você em referência para colegas educadores

### Sua Jornada Continua
Esta aula é o **trampolim** para sua maestria em IA educacional. Na próxima aula do módulo Starter, você criará seu **primeiro projeto prático completo**, aplicando todos os conceitos aprendidos.

E depois, nos módulos **Survivor, Explorer e Expert**, você se tornará um verdadeiro **mestre da IA educacional**, capaz de:
- Automatizar processos complexos
- Criar sistemas personalizados de ensino
- Liderar transformação digital na sua escola
- Formar outros professores em IA

### Seu Compromisso com a Excelência
Agora você tem o **conhecimento**. O que fará a diferença é a **prática constante**:

1. **Use** pelo menos 1 prompt novo por dia
2. **Documente** seus melhores descobertas
3. **Compartilhe** sucessos com colegas
4. **Refine** continuamente seus templates
5. **Mantenha** curiosidade e experimentação

### A Revolução Começa Agora
Você não está apenas aprendendo uma nova ferramenta - você está se tornando parte da **revolução educacional** que definirá o futuro da aprendizagem no Brasil e no mundo.

**Cada prompt eficaz que você cria não beneficia apenas seus alunos hoje, mas contribui para formar a geração que construirá o futuro da humanidade.**

**Sua missão está clara: Use essa superpotência para transformar vidas através da educação.** 

**O futuro da educação brasileira depende de professores como você!** 🚀✨

*"A diferença entre um professor bom e um professor extraordinário não está apenas no que ele sabe, mas em como ele usa as ferramentas certas para multiplicar seu impacto."*
      `,
      aiTools: [
        {
          name: 'ChatGPT Prompt Library',
          description: 'Biblioteca oficial de prompts educacionais',
          url: 'https://platform.openai.com/examples',
          useCase: 'Inspiração e exemplos de prompts eficazes'
        },
        {
          name: 'PromptBase Education',
          description: 'Marketplace de prompts educacionais premium',
          url: 'https://promptbase.com/category/education',
          useCase: 'Templates profissionais testados'
        },
        {
          name: 'Notion Template Gallery',
          description: 'Templates para organizar prompts',
          url: 'https://notion.so/templates',
          useCase: 'Organização de biblioteca pessoal de prompts'
        },
        {
          name: 'Claude (Anthropic)',
          description: 'IA alternativa para comparar resultados',
          url: 'https://claude.ai',
          useCase: 'Validação cruzada de prompts'
        },
        {
          name: 'Prompt Perfect',
          description: 'Ferramenta para otimizar prompts automaticamente',
          url: 'https://promptperfect.jina.ai',
          useCase: 'Refinamento automático de prompts'
        },
        {
          name: 'ShareGPT',
          description: 'Compartilhe conversas de ChatGPT',
          url: 'https://sharegpt.com',
          useCase: 'Documentar e compartilhar prompts sucessos'
        }
      ]
    },
    quiz: [
      {
        question: 'Qual é o framework recomendado para criar prompts estruturados?',
        options: [
          'SMART',
          'P.R.E.C.I.S.O',
          'PDCA',
          'SWOT'
        ],
        correct: 1
      },
      {
        question: 'A técnica "Chain of Thought" é mais útil para:',
        options: [
          'Prompts simples e diretos',
          'Problemas complexos que requerem raciocínio passo a passo',
          'Criação de listas básicas',
          'Perguntas de múltipla escolha'
        ],
        correct: 1
      },
      {
        question: 'Para evitar respostas genéricas, o elemento mais importante é:',
        options: [
          'Usar prompts muito curtos',
          'Evitar especificar o contexto',
          'Fornecer contexto detalhado e específico',
          'Usar apenas perguntas diretas'
        ],
        correct: 2
      },
      {
        question: 'Few-Shot Learning significa:',
        options: [
          'Fazer poucas perguntas',
          'Usar prompts curtos',
          'Mostrar 2-3 exemplos do padrão desejado',
          'Limitar o número de tentativas'
        ],
        correct: 2
      },
      {
        question: 'Para adequar a linguagem da IA à sua turma, você deve:',
        options: [
          'Não especificar nada sobre linguagem',
          'Pedir linguagem técnica sempre',
          'Especificar idade, contexto e nível adequado',
          'Usar apenas linguagem formal'
        ],
        correct: 2
      }
    ],
    assignment: {
      title: 'Projeto: Arsenal Pessoal de Prompts',
      description: 'Crie sua biblioteca personalizada de prompts eficazes testados na prática',
      requirements: [
        'Criar 10 prompts usando framework P.R.E.C.I.S.O para sua disciplina',
        'Testar cada prompt 3 vezes com variações diferentes',
        'Documentar resultados: tempo economizado, qualidade, adequação',
        'Aplicar 5 materiais gerados com seus alunos reais',
        'Criar 3 templates reutilizáveis para situações recorrentes',
        'Desenvolver sistema pessoal de organização de prompts',
        'Refinar prompts baseado no feedback dos alunos',
        'Criar guia de troubleshooting para problemas comuns'
      ],
      submission: 'Biblioteca digital organizada + relatório de testes + evidências de aplicação em sala + templates finais otimizados'
    },
    maestroInfo: {
      topic: 'Masterclass: Prompts que Transformam Resultados',
      duration: '120 min',
      agenda: [
        'Demonstração ao vivo: prompt básico vs P.R.E.C.I.S.O',
        'Workshop: criando prompts para casos reais dos participantes',
        'Técnicas avançadas: Chain of Thought e Few-Shot Learning',
        'Troubleshooting ao vivo: resolvendo prompts problemáticos',
        'Q&A intensivo: casos específicos e dúvidas avançadas'
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
                    <Target className="w-4 h-4 mr-1" />
                    Avançado
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

        {/* Learning AI Interface */}
        <LearningAIInterface 
          lessonTitle={lesson.title}
          lessonType="practice"
          moduleType="starter"
        />

        {/* Main Content */}
        <Tabs defaultValue="video" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="video">🎯 Vídeo</TabsTrigger>
            <TabsTrigger value="content">📚 Conteúdo</TabsTrigger>
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
                    Masterclass Completa
                  </CardTitle>
                  <CardDescription>
                    Da teoria à prática: dominando a arte dos prompts eficazes
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
                      {videoCompleted ? 'Concluído' : 'Iniciar Masterclass'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Live Session with AI MAESTRO */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Masterclass Ao Vivo
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
                      <p className="text-sm text-gray-600">Master em Prompt Engineering</p>
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
                    <h4 className="font-medium text-sm">Agenda Intensiva:</h4>
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
                        Inscrever-se na Masterclass
                      </Button>
                      <p className="text-xs text-gray-500 text-center">
                        Edição limitada - 120 minutos intensivos!
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
                <CardTitle>Guia Definitivo: A Arte dos Prompts Eficazes</CardTitle>
                <CardDescription>
                  Manual completo de prompt engineering para educadores: da ciência à prática avançada
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
                    Baixar Guia Completo
                  </Button>
                  <Button variant="outline">
                    <Code className="w-4 h-4 mr-2" />
                    Templates P.R.E.C.I.S.O
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
                  Quiz: Maestria em Prompts
                  <Badge variant="outline">
                    {currentQuestion + 1} de {lesson.quiz.length}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Teste seu domínio das técnicas avançadas de prompt engineering
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
                      {quizScore / lesson.quiz.length >= 0.7 ? '🎯' : '📚'}
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
                          🏆 Mestre em Prompts! Você domina as técnicas avançadas
                        </Badge>
                        <p className="text-sm text-gray-600">
                          Pronto para o projeto final do módulo Starter!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Badge variant="destructive" className="px-4 py-2">
                          📖 Revise - Foque no framework P.R.E.C.I.S.O
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
          <TabsContent value="assignment" className="space-y-6">
            {/* Activity-Specific AI Tools */}
            <LearningAIInterface 
              lessonTitle={lesson.title}
              lessonType="project"
              moduleType="starter"
              activityContext={lesson.assignment.title}
            />
            
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
                  <h4 className="font-medium text-gray-900 mb-3">Missões do Arsenal:</h4>
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
                  <h4 className="font-medium text-blue-900 mb-2">Arsenal Final:</h4>
                  <p className="text-sm text-blue-800">{lesson.assignment.submission}</p>
                </div>
                
                <div className="flex space-x-4">
                  <Button className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Enviar Arsenal
                  </Button>
                  <Button variant="outline">
                    <Wand2 className="w-4 h-4 mr-2" />
                    Ver Exemplos Master
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