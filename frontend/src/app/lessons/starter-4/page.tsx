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
import { ArrowLeft, Play, CheckCircle, Clock, BookOpen, Video, Users, Award, Download, ExternalLink, Calendar, Brain, MessageSquare, Zap, Settings } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import ContextualAIToolsSuggestions from '@/components/ContextualAIToolsSuggestions'

export default function StarterLesson4Page() {
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
    title: 'ChatGPT: Primeiros Passos',
    module: 'Starter - Fundamentos de IA',
    duration: '50 min',
    description: 'Domine o ChatGPT do zero: criação de conta, interface, primeiros prompts e aplicações práticas na educação',
    ageGroup: 'Todos os Níveis',
    level: 'Iniciante',
    objectives: [
      'Criar e configurar conta no ChatGPT',
      'Dominar a interface e funcionalidades básicas',
      'Escrever primeiros prompts eficazes para educação',
      'Aplicar ChatGPT em situações educacionais reais'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    liveSession: {
      date: '2024-12-18',
      time: '19:00',
      instructor: 'AI MAESTRO',
      duration: '90 min',
      registered: false,
      description: 'Workshop prático: seus primeiros prompts educacionais'
    },
    content: {
      theory: `
# ChatGPT: Primeiros Passos para Educadores

## 1. Introdução ao ChatGPT

### O que é o ChatGPT?
O **ChatGPT** (Chat Generative Pre-trained Transformer) é um assistente de IA conversacional criado pela OpenAI que revolucionou a forma como interagimos com inteligência artificial. Para educadores brasileiros, representa a **ferramenta mais acessível e poderosa** para transformar a prática pedagógica.

### Por que o ChatGPT é Fundamental para Professores?
- **Gratuito** na versão básica - acessível para todos
- **Interface em português** - sem barreiras linguísticas
- **Versatilidade total** - funciona para qualquer disciplina
- **Aprendizado rápido** - resultados em minutos
- **Comunidade ativa** - milhões de educadores compartilhando experiências

### Números Impressionantes (2024)
- **100 milhões** de usuários ativos mensais
- **13 milhões** de educadores registrados globalmente
- **300.000** professores brasileiros já experimentaram
- **85%** relatam melhoria na qualidade das aulas
- **67%** economizam mais de 2 horas por semana

## 2. Criando Sua Conta - Passo a Passo

### Requisitos Básicos
- **Computador ou celular** com internet
- **Email válido** (Gmail, Hotmail, institucional)
- **Número de telefone** para verificação
- **Navegador atualizado** (Chrome, Firefox, Safari)

### Processo de Criação (5 minutos)

#### Passo 1: Acessar o Site
1. Abra seu navegador
2. Digite: **chat.openai.com**
3. Clique em "Sign up" (Criar conta)

#### Passo 2: Informações Básicas
1. **Email**: Use seu email principal
2. **Senha**: Mínimo 8 caracteres (inclua maiúscula, número)
3. **Nome**: Seu nome real (aparece nas conversas)

#### Passo 3: Verificação
1. **Email**: Verifique sua caixa de entrada
2. **Clique no link** de confirmação
3. **Telefone**: Digite seu número brasileiro (+55)
4. **Código SMS**: Digite o código recebido

#### Passo 4: Configuração Inicial
1. **Objetivo de uso**: Selecione "Educação"
2. **Experiência**: Escolha "Iniciante"
3. **Área**: Sua disciplina principal
4. **Tutorial**: Complete o tour de 3 minutos

### Dicas de Configuração
- **Idioma**: Configure para português brasileiro
- **Notifications**: Ative apenas essenciais
- **Privacy**: Revise configurações de dados
- **Backup**: Anote credenciais em local seguro

## 3. Explorando a Interface

### Layout Principal
\`\`\`
┌─────────────────────────────────────────┐
│ [☰] Nova Conversa        [⚙️] Configurações│
├─────────────────────────────────────────┤
│                                         │
│        Histórico de Conversas           │
│        ┌─────────────────────┐         │
│        │ • Plano de aula     │         │
│        │ • Exercícios mat.   │         │
│        │ • Redação ENEM      │         │
│        └─────────────────────┘         │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│            ÁREA DE CONVERSA             │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Digite sua mensagem aqui...         │ │
│ │                            [Enviar] │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
\`\`\`

### Elementos Principais

#### Barra Lateral Esquerda
- **Nova Conversa**: Inicia chat limpo
- **Histórico**: Todas suas conversas salvas
- **Pastas**: Organize por disciplina/projeto
- **Configurações**: Preferências pessoais

#### Área Central
- **Conversa ativa**: Suas mensagens e respostas
- **Regenerar**: Nova versão da última resposta
- **Copiar**: Copia texto para usar em outros locais
- **Feedback**: Avalia qualidade das respostas

#### Caixa de Entrada
- **Texto livre**: Digite perguntas naturalmente
- **Anexos**: Em breve (imagens, documentos)
- **Comandos**: Atalhos para funções específicas
- **Histórico**: Acesso rápido a prompts anteriores

### Funcionalidades Especiais

#### Modo Conversa
- **Memória**: Lembra do contexto da conversa
- **Seguimento**: Pode refinar e melhorar respostas
- **Clarificação**: Pede esclarecimentos quando necessário
- **Adaptação**: Ajusta tom e complexidade automaticamente

#### Versões Disponíveis
**ChatGPT 3.5 (Gratuito)**
- Conversas ilimitadas
- Resposta em segundos
- Conhecimento até abril 2023
- Ideal para começar

**ChatGPT 4 (Plus - R$ 100/mês)**
- Respostas mais precisas
- Conhecimento mais atualizado
- Acesso prioritário
- Plugins e internet

## 4. Anatomia de um Prompt Eficaz

### O que é um Prompt?
**Prompt** é o comando ou pergunta que você faz ao ChatGPT. A qualidade da resposta depende diretamente da qualidade do seu prompt. É como dar instruções claras para um assistente muito inteligente.

### Estrutura de Prompt Eficaz

#### Template PAPEL-CONTEXTO-TAREFA-FORMATO

\`\`\`
PAPEL: Você é um [especialista em X]
CONTEXTO: Para [público-alvo] em [situação]
TAREFA: [Ação específica que deseja]
FORMATO: [Como quer a resposta organizada]
\`\`\`

#### Exemplo Prático
**Prompt Básico (Ineficaz):**
"Crie exercícios de matemática"

**Prompt Avançado (Eficaz):**
\`\`\`
Você é um professor de matemática especialista em ensino fundamental.

Contexto: Preciso de exercícios para alunos do 7º ano sobre equações do 1º grau, considerando que 40% da turma tem dificuldade com operações básicas.

Tarefa: Crie 6 exercícios graduais - 2 fáceis, 2 médios, 2 difíceis - todos contextualizados com situações do cotidiano brasileiro.

Formato: Para cada exercício inclua:
- Enunciado claro
- Nível de dificuldade
- Habilidade BNCC correspondente
- Gabarito com resolução passo a passo
\`\`\`

### Elementos de um Prompt Poderoso

#### 1. Definição de Papel
- **Específico**: "Professor de biologia" > "Educador"
- **Experiente**: "Professor experiente" vs "Professor iniciante"
- **Contextualizado**: "Professor brasileiro de escola pública"

**Exemplos:**
- "Você é um pedagogo especialista em educação infantil"
- "Você é um professor de história do ensino médio"
- "Você é uma coordenadora pedagógica com 15 anos de experiência"

#### 2. Contexto Detalhado
- **Público-alvo**: Idade, série, características
- **Situação**: Onde, quando, por que
- **Limitações**: Recursos, tempo, dificuldades

**Exemplo Completo:**
\`\`\`
Para alunos de 8º ano de escola pública em Fortaleza, que terão aula de 50 minutos, com acesso limitado à internet, sendo que 30% têm dificuldade de concentração.
\`\`\`

#### 3. Tarefa Clara e Específica
- **Verbo de ação**: Crie, analise, explique, compare
- **Quantidade**: 5 questões, 3 exemplos, 1 página
- **Escopo**: O que incluir e excluir

**Verbos Poderosos para Educação:**
- **Criar**: planos, exercícios, avaliações
- **Adaptar**: conteúdo para diferentes níveis
- **Explicar**: conceitos complexos de forma simples
- **Analisar**: trabalhos de alunos, metodologias
- **Sugerir**: melhorias, recursos, estratégias

#### 4. Formato Estruturado
- **Lista**: Organização clara e escaneável
- **Template**: Padrão para replicar
- **Seções**: Dividir resposta em partes lógicas

**Formatos Úteis:**
\`\`\`
- Lista numerada com subitens
- Tabela com colunas específicas
- Template preenchível
- Passo a passo detalhado
- Checklist para implementação
\`\`\`

## 5. Prompts Essenciais para Educadores

### 🎯 Categoria 1: Planejamento de Aulas

#### Prompt: Plano de Aula Completo
\`\`\`
Você é um pedagogo especialista em planejamento educacional brasileiro.

Contexto: Preciso de um plano de aula para [DISCIPLINA] para [SÉRIE] sobre [TÓPICO], considerando turma de [X] alunos em escola [pública/privada] de [CIDADE/REGIÃO].

Tarefa: Crie um plano de aula completo de [X] minutos seguindo metodologias ativas.

Formato:
1. Objetivo Geral e 3 Específicos (alinhados à BNCC)
2. Recursos Necessários (detalhados e acessíveis)
3. Desenvolvimento da Aula (passo a passo com timings)
4. Atividades Práticas (individuais e em grupo)
5. Avaliação Formativa (como medir aprendizagem)
6. Dever de Casa (conectado ao conteúdo)
7. Adaptações para Alunos com Dificuldades
\`\`\`

#### Exemplo de Uso Real:
**Input:**
"Você é um pedagogo especialista em planejamento educacional brasileiro. Contexto: Preciso de um plano de aula para Geografia para 6º ano sobre 'Coordenadas Geográficas', considerando turma de 30 alunos em escola pública de São Paulo. Tarefa: Crie um plano de aula completo de 50 minutos seguindo metodologias ativas."

**Output esperado:** Plano completo, detalhado, prático e aplicável.

### 📝 Categoria 2: Criação de Exercícios

#### Prompt: Banco de Questões Personalizadas
\`\`\`
Você é um especialista em avaliação educacional.

Contexto: Leciono [DISCIPLINA] para [SÉRIE] e preciso de questões sobre [CONTEÚDO ESPECÍFICO]. Meus alunos têm perfil [DESCREVER: socioeconômico, dificuldades comuns, pontos fortes].

Tarefa: Crie 10 questões variadas (4 objetivas, 3 discursivas curtas, 3 situação-problema) com diferentes níveis cognitivos da Taxonomia de Bloom.

Formato para cada questão:
- Enunciado contextualizado com realidade brasileira
- Nível: Básico/Intermediário/Avançado
- Tipo cognitivo: Lembrar/Entender/Aplicar/Analisar
- Habilidade BNCC correspondente
- Gabarito fundamentado
- Tempo estimado de resolução
\`\`\`

### 🔍 Categoria 3: Explicações Didáticas

#### Prompt: Simplificação de Conceitos
\`\`\`
Você é um especialista em comunicação didática.

Contexto: Preciso explicar [CONCEITO] para alunos de [IDADE/SÉRIE] que [DESCREVER DIFICULDADES/CONHECIMENTOS PRÉVIOS].

Tarefa: Crie uma explicação progressiva do conceito, do mais simples ao mais complexo.

Formato:
1. Analogia com situação do cotidiano brasileiro
2. Explicação básica (2-3 frases simples)
3. Exemplo prático visual
4. Aprofundamento gradual (3 níveis)
5. Exercício mental para fixação
6. Perguntas reflexivas para discussão
7. Conexões com outros conteúdos
\`\`\`

### 📊 Categoria 4: Análise e Feedback

#### Prompt: Correção Inteligente
\`\`\`
Você é um professor experiente em avaliação formativa.

Contexto: Vou compartilhar [TIPO DE TRABALHO] de um aluno de [SÉRIE] sobre [TEMA]. Quero feedback construtivo que motive e oriente melhorias.

Tarefa: Analise o trabalho e forneça feedback personalizado.

Formato:
1. Nota sugerida (0-10) com justificativa
2. 3 pontos muito positivos (específicos)
3. 2 aspectos principais para melhorar (com sugestões práticas)
4. 1 orientação para próximo trabalho
5. Comentário motivacional personalizado
6. Recursos recomendados para aprofundamento
\`\`\`

### 🎨 Categoria 5: Recursos Criativos

#### Prompt: Atividades Lúdicas
\`\`\`
Você é um especialista em gamificação educacional.

Contexto: Ensino [DISCIPLINA] para [SÉRIE] e quero tornar o conteúdo [TÓPICO] mais envolvente e divertido, usando recursos [DISPONÍVEIS: tecnológicos/básicos].

Tarefa: Crie 3 atividades lúdicas diferentes para ensinar este conteúdo.

Formato para cada atividade:
- Nome criativo
- Tipo: jogo/dinâmica/desafio/competição
- Objetivos de aprendizagem
- Materiais necessários (acessíveis)
- Passo a passo detalhado (15-20 min)
- Variações para diferentes perfis de aluno
- Como avaliar participação e aprendizagem
\`\`\`

## 6. Casos Práticos por Disciplina

### 📚 Português - Desenvolvendo Competências Linguísticas

#### Situação Real: Dificuldade em Redação ENEM
**Problema:** Alunos do 3º ano têm dificuldade para estruturar introdução

**Prompt Eficaz:**
\`\`\`
Você é um especialista em redação ENEM com 10 anos de experiência.

Contexto: Meus alunos de 3º ano de escola pública em Salvador têm muita dificuldade para escrever introduções de redação dissertativa. Eles sabem o tema mas não conseguem começar.

Tarefa: Crie um método simples e replicável para ensinar introdução em 3 aulas de 50 min.

Formato:
1. Diagnóstico: principais erros de introdução
2. Método passo a passo (fórmula simples)
3. 5 exemplos de introdução (temas ENEM recentes)
4. Exercício prático progressivo
5. Checklist para autoavaliação
6. Dicas para superar bloqueio criativo
\`\`\`

**Resultado:** Método estruturado, exemplos práticos, aplicação imediata.

#### Aplicação: Análise Literária Criativa
**Prompt para Modernizar Literatura:**
\`\`\`
Transforme a análise de [OBRA CLÁSSICA] em experiência relevante para adolescentes de 2024. Crie 3 atividades que conectem os temas da obra com questões atuais (redes sociais, sustentabilidade, diversidade) sem perder a essência literária.
\`\`\`

### 🔢 Matemática - Contextualizando Conceitos

#### Situação Real: Funções Parecem Abstratas
**Problema:** Alunos do 1º ano não veem utilidade prática de funções

**Prompt Estratégico:**
\`\`\`
Você é um professor de matemática especialista em contextualização.

Contexto: Ensino funções para 1º ano do ensino médio em Recife. Alunos sempre perguntam "onde vou usar isso?". Preciso mostrar aplicações reais e interessantes.

Tarefa: Crie 5 situações-problema brasileiras onde funções são essenciais para resolver problemas reais.

Critérios:
- Situações que adolescentes vivenciam ou conhecem
- Dados reais (preços, distâncias, tempo)
- Resolução que mostra claramente o poder das funções
- Conexão com carreira/profissão
- Nível adequado para iniciantes em função
\`\`\`

**Resultado:** Problemas envolventes: Uber/delivery, investimentos, crescimento de seguidores, consumo de dados, etc.

### 🧪 Ciências - Experimentação Virtual

#### Situação: Laboratório Limitado
**Prompt para Experimentos Caseiros:**
\`\`\`
Crie 3 experimentos de [TÓPICO CIENTÍFICO] que posso fazer com alunos de [SÉRIE] usando apenas materiais encontrados em casa brasileira típica. Cada experimento deve ter hipótese clara, método seguro, resultados esperados e explicação científica acessível.
\`\`\`

### 🌍 História - Conectando Épocas

#### Prompt: História Brasileira Relevante
\`\`\`
Estabeleça 5 paralelos entre [PERÍODO HISTÓRICO] e Brasil atual que mostram como história se repete ou evolui. Use exemplos que adolescentes reconheçam: política, economia, cultura, tecnologia, sociedade.
\`\`\`

## 7. Troubleshooting - Resolvendo Problemas Comuns

### ❌ Problema 1: Respostas Genéricas Demais

**Sintoma:** ChatGPT dá respostas muito básicas e não específicas para sua realidade.

**Causa:** Prompt muito vago ou sem contexto suficiente.

**Solução:**
\`\`\`
❌ Prompt Vago: "Crie exercícios de matemática"

✅ Prompt Específico: "Você é professor de matemática de 7º ano em escola pública de Belo Horizonte. Crie 5 exercícios de equações do 1º grau contextualizados com situações que meus alunos conhecem: transporte público, compras no mercado, economia doméstica. Inclua resolução passo a passo."
\`\`\`

### ❌ Problema 2: Não Entende o Sistema Educacional Brasileiro

**Sintoma:** Referências a sistema americano, termos incorretos, não menciona BNCC.

**Solução:**
- Sempre mencione "Brasil" ou "sistema educacional brasileiro"
- Especifique série/ano brasileiro
- Peça alinhamento com BNCC quando relevante
- Use exemplos nacionais: "como no ENEM", "seguindo BNCC"

### ❌ Problema 3: Linguagem Inadequada para a Idade

**Sintoma:** Texto muito complexo para alunos ou muito simples para o professor.

**Solução:**
\`\`\`
Para alunos: "Use linguagem adequada para [IDADE] anos"
Para professores: "Responda em nível técnico adequado para educador"
\`\`\`

### ❌ Problema 4: Resposta Muito Longa ou Muito Curta

**Controle de Extensão:**
\`\`\`
Para respostas concisas: "Em no máximo 200 palavras"
Para respostas detalhadas: "Desenvolva cada ponto com exemplos"
Para formato específico: "Em forma de lista com 5 itens"
\`\`\`

### ❌ Problema 5: Não Considera Recursos Limitados

**Solução:**
\`\`\`
Sempre especifique recursos disponíveis:
"Considerando escola pública com recursos limitados"
"Usando apenas papel, lápis e criatividade"
"Com acesso limitado à internet"
"Para turma de 35 alunos"
\`\`\`

## 8. Ética e Limitações - Uso Responsável

### 🛡️ Princípios Éticos Fundamentais

#### Transparência Total
- **Sempre informe** quando usar IA para criar conteúdo
- **Ensine alunos** sobre IA e seu funcionamento
- **Seja honesto** sobre capacidades e limitações
- **Documente** uso para prestação de contas

#### Supervisão Humana Constante
- **Nunca confie 100%** no conteúdo gerado
- **Sempre revise** antes de usar com alunos
- **Mantenha julgamento pedagógico** como prioridade
- **Adapte** conforme sua experiência

#### Proteção de Dados
- **Nunca insira** dados pessoais de alunos
- **Anonimize** informações sensíveis
- **Use** configurações de privacidade
- **Cumpra** LGPD em todas as interações

### ⚠️ Limitações Importantes do ChatGPT

#### Conhecimento com Data de Corte
- **Conhecimento até** abril 2023 (versão gratuita)
- **Não sabe** eventos muito recentes
- **Pode ter** informações desatualizadas
- **Verifique** dados importantes

#### Possibilidade de Erros
- **Pode gerar** informações incorretas com confiança
- **Não tem** acesso a internet (versão gratuita)
- **Pode confundir** fatos similares
- **Sempre confirme** informações críticas

#### Vieses Culturais
- **Treinamento** majoritariamente em inglês
- **Pode refletir** vieses americanos/europeus
- **Nem sempre** compreende nuances brasileiras
- **Adapte** conteúdo ao contexto local

#### Falta de Experiência Prática
- **Não vivenciou** sala de aula real
- **Não conhece** sua turma específica
- **Não substitui** experiência pedagógica
- **Use** como ferramenta, não como decisor

### 📋 Checklist de Uso Ético

Antes de usar conteúdo do ChatGPT:

✅ **Revisei** todo o conteúdo gerado?
✅ **Adaptei** para minha realidade escolar?
✅ **Verifiquei** informações factuais importantes?
✅ **Considerei** diversidade da minha turma?
✅ **Alinhei** com objetivos pedagógicos?
✅ **Documentei** o uso para transparência?
✅ **Preparei** explicação sobre IA para alunos?

## 9. Próximos Passos - Sua Jornada com ChatGPT

### Semana 1: Fundação (7 dias)
**Objetivo:** Familiarização básica

**Dia 1-2: Setup Completo**
- Criar conta e configurar perfil
- Completar tutorial oficial
- Fazer 5 perguntas simples sobre sua disciplina

**Dia 3-4: Primeiros Prompts Educacionais**
- Usar 3 templates deste curso
- Gerar 1 plano de aula simples
- Criar 5 exercícios básicos

**Dia 5-7: Experimentação**
- Testar diferentes tipos de prompt
- Comparar resultados com métodos tradicionais
- Documentar descobertas e dificuldades

### Semana 2: Aprofundamento (7 dias)
**Objetivo:** Desenvolvimento de habilidades

**Dia 8-10: Prompts Avançados**
- Dominar estrutura PAPEL-CONTEXTO-TAREFA-FORMATO
- Criar banco pessoal de prompts favoritos
- Experimentar com diferentes estilos de resposta

**Dia 11-13: Aplicação Prática**
- Usar ChatGPT para preparar aula completa
- Aplicar material gerado com turma real
- Coletar feedback dos alunos

**Dia 14: Análise e Ajustes**
- Avaliar eficácia dos materiais criados
- Identificar pontos de melhoria
- Refinar estratégia pessoal

### Semana 3: Integração (7 dias)
**Objetivo:** Incorporação na rotina

**Dia 15-17: Workflow Otimizado**
- Criar rotina semanal com ChatGPT
- Integrar com outras ferramentas (Google, Canva)
- Automatizar tarefas repetitivas

**Dia 18-20: Compartilhamento**
- Ensinar 2 colegas o básico
- Criar guia rápido personalizado
- Participar de comunidade online

**Dia 21: Planejamento Futuro**
- Definir metas para próximo mês
- Identificar áreas para aprofundar
- Planejar upgrade para versão Plus (se necessário)

### Semana 4: Maestria (7 dias)
**Objetivo:** Uso avançado e autônomo

**Dia 22-24: Técnicas Avançadas**
- Prompts em cadeia (sequência lógica)
- Refinamento iterativo de respostas
- Combinação de múltiplas abordagens

**Dia 25-27: Criação de Recursos**
- Desenvolver material exclusivo
- Criar sequência didática completa
- Documentar melhores práticas pessoais

**Dia 28: Avaliação e Celebração**
- Medir progresso: antes vs depois
- Calcular tempo economizado
- Planejar próximos desafios

## 10. Recursos e Referências

### 📚 Leituras Complementares

#### Livros Essenciais
- **"The AI Classroom"** - Dan Fitzpatrick
- **"Teaching AI"** - Michelle Zimmerman
- **"Artificial Intelligence for People in a Hurry"** - Neil Reddy

#### Artigos Acadêmicos Brasileiros
- **"IA na Educação Brasileira"** - Revista Brasileira de Informática na Educação
- **"ChatGPT e Ensino"** - CBIE 2023
- **"Prompts Pedagógicos"** - SBC Educação

### 🌐 Comunidades Online

#### Grupos Facebook Brasil
- **"Professores e IA"** (12.000 membros)
- **"ChatGPT para Educadores BR"** (8.500 membros)
- **"IA na Escola"** (6.200 membros)

#### Canais YouTube
- **"Prof. IA Brasil"** - Tutoriais práticos
- **"Educação 4.0"** - Casos de sucesso
- **"Tecnologia na Escola"** - Reviews de ferramentas

### 🔧 Ferramentas Complementares

#### Para Organização
- **Notion** - Banco de prompts
- **Trello** - Planejamento de aulas
- **Google Keep** - Ideias rápidas

#### Para Criação
- **Canva** - Visuais baseados em texto do ChatGPT
- **Loom** - Gravar explicações
- **Padlet** - Colaboração com alunos

### 📞 Suporte e Ajuda

#### Suporte Oficial OpenAI
- **Help Center**: help.openai.com
- **Community Forum**: community.openai.com
- **Status Page**: status.openai.com

#### Suporte Educacional Brasileiro
- **WhatsApp**: Grupo TEACH Platform
- **Email**: suporte.educacional@exemplo.com
- **Discord**: Servidor Educadores IA Brasil

## Conclusão: Sua Nova Superpotência Pedagógica

Parabéns! Você acabou de dar o primeiro passo para dominar a ferramenta que está revolucionando a educação mundial. O **ChatGPT** não é apenas mais uma tecnologia - é sua **nova superpotência pedagógica**.

### O que Você Conquistou
✅ **Conhecimento Técnico** - Sabe criar conta, navegar e usar efetivamente
✅ **Habilidade de Prompting** - Domina a arte de fazer perguntas certas
✅ **Casos Práticos** - Tem exemplos reais para sua disciplina
✅ **Ética Digital** - Usa IA de forma responsável e transparente
✅ **Visão de Futuro** - Compreende o potencial transformador

### Sua Jornada Continua
Este é apenas o **primeiro passo** de uma jornada transformadora. Nas próximas aulas do módulo Starter, você vai:

- **Aula 5**: Dominar prompts avançados para resultados espetaculares
- **Aula 6**: Criar seu primeiro projeto completo com IA

E depois, nos módulos **Survivor, Explorer e Expert**, você se tornará um verdadeiro **mestre da IA educacional**.

### Compromisso com a Transformação
A educação brasileira precisa de professores como você - **corajosos, inovadores e comprometidos** com a excelência. Ao dominar o ChatGPT, você não está apenas melhorando suas aulas; está contribuindo para formar a geração que construirá o futuro do Brasil.

**Sua missão agora:**
1. **Pratique** pelo menos 15 minutos por dia
2. **Experimente** um prompt novo a cada aula
3. **Compartilhe** descobertas com colegas
4. **Documente** seus sucessos e aprendizados

**Lembre-se:** Cada prompt que você domina é uma habilidade que multiplicará seu impacto educacional pelos próximos 20 anos de carreira.

**O futuro da educação começou. E você está liderando essa revolução!** 🚀✨

*"A melhor forma de prever o futuro é criá-lo. E você está criando o futuro da educação brasileira."*
      `,
      aiTools: [
        {
          name: 'ChatGPT Free',
          description: 'Versão gratuita com conversas ilimitadas',
          url: 'https://chat.openai.com',
          useCase: 'Primeiros passos e uso diário básico'
        },
        {
          name: 'ChatGPT Plus',
          description: 'Versão premium com GPT-4 e recursos avançados',
          url: 'https://chat.openai.com/plus',
          useCase: 'Uso profissional e respostas mais precisas'
        },
        {
          name: 'OpenAI Playground',
          description: 'Interface avançada para experimentação',
          url: 'https://platform.openai.com/playground',
          useCase: 'Testes de prompts e configurações avançadas'
        },
        {
          name: 'ChatGPT Mobile App',
          description: 'Aplicativo oficial para iOS e Android',
          url: 'https://openai.com/chatgpt/app',
          useCase: 'Acesso móvel e conveniência'
        },
        {
          name: 'Prompt Templates (Notion)',
          description: 'Biblioteca de templates de prompts educacionais',
          url: 'https://notion.so',
          useCase: 'Organização de prompts favoritos'
        },
        {
          name: 'ChatGPT Community Forum',
          description: 'Fórum oficial para compartilhar experiências',
          url: 'https://community.openai.com',
          useCase: 'Suporte e dicas da comunidade'
        }
      ]
    },
    quiz: [
      {
        question: 'Qual é a estrutura recomendada para prompts eficazes?',
        options: [
          'Pergunta direta simples',
          'PAPEL-CONTEXTO-TAREFA-FORMATO',
          'Apenas o contexto da situação',
          'Somente a tarefa desejada'
        ],
        correct: 1
      },
      {
        question: 'Para criar exercícios específicos, qual elemento é essencial no prompt?',
        options: [
          'Apenas o conteúdo a ser abordado',
          'Contexto detalhado da turma e situação',
          'Somente a quantidade de questões',
          'Apenas o nível de dificuldade'
        ],
        correct: 1
      },
      {
        question: 'Qual cuidado ético é fundamental ao usar ChatGPT na educação?',
        options: [
          'Nunca revisar o conteúdo gerado',
          'Sempre confiar 100% nas respostas',
          'Sempre revisar e adaptar o conteúdo antes de usar',
          'Usar dados pessoais dos alunos para personalização'
        ],
        correct: 2
      },
      {
        question: 'Qual é a principal limitação do ChatGPT gratuito?',
        options: [
          'Não funciona em português',
          'Conhecimento com data de corte (abril 2023)',
          'Limite de 10 perguntas por dia',
          'Não pode criar conteúdo educacional'
        ],
        correct: 1
      },
      {
        question: 'Para resolver o problema de respostas muito genéricas, você deve:',
        options: [
          'Usar prompts mais vagos',
          'Fazer perguntas mais curtas',
          'Adicionar contexto específico e detalhado',
          'Evitar mencionar sua disciplina'
        ],
        correct: 2
      }
    ],
    assignment: {
      title: 'Projeto: Meus Primeiros Prompts Educacionais',
      description: 'Domine o ChatGPT criando e testando prompts para sua realidade educacional',
      requirements: [
        'Criar conta no ChatGPT e completar configuração inicial',
        'Desenvolver 5 prompts usando a estrutura PAPEL-CONTEXTO-TAREFA-FORMATO',
        'Testar cada prompt e documentar resultados obtidos',
        'Aplicar pelo menos 1 material gerado com seus alunos',
        'Criar seu banco pessoal de prompts favoritos',
        'Identificar 3 melhorias nos seus prompts após os testes',
        'Elaborar guia rápido personalizado para uso futuro'
      ],
      submission: 'Portfolio com: prints das conversas + materiais gerados + relatório de teste em sala + banco de prompts personalizado'
    },
    maestroInfo: {
      topic: 'Workshop Prático: Dominando o ChatGPT',
      duration: '90 min',
      agenda: [
        'Criação de conta ao vivo e configuração otimizada',
        'Demonstração: prompts básicos vs prompts avançados',
        'Hands-on: criando prompts para sua disciplina',
        'Troubleshooting: resolvendo problemas comuns ao vivo',
        'Q&A: dúvidas específicas e casos práticos'
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
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Prático
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
            <TabsTrigger value="video">💬 Vídeo</TabsTrigger>
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
                    Tutorial Completo
                  </CardTitle>
                  <CardDescription>
                    Do zero ao domínio: criando conta e primeiros prompts
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
                      {videoCompleted ? 'Concluído' : 'Começar Tutorial'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Live Session with AI MAESTRO */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Workshop Prático
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
                      <p className="text-sm text-gray-600">Especialista ChatGPT</p>
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
                    <h4 className="font-medium text-sm">Agenda Hands-on:</h4>
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
                        Vagas limitadas - Prática individual garantida!
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
                <CardTitle>Guia Completo: ChatGPT do Zero ao Domínio</CardTitle>
                <CardDescription>
                  Manual passo a passo: conta, interface, prompts e aplicações práticas
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
                    <Settings className="w-4 h-4 mr-2" />
                    Templates de Prompt
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
                  Quiz: Domínio do ChatGPT
                  <Badge variant="outline">
                    {currentQuestion + 1} de {lesson.quiz.length}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Teste seu conhecimento sobre uso eficaz do ChatGPT
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
                      {quizScore / lesson.quiz.length >= 0.7 ? '🤖' : '📚'}
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
                          🎯 Perfeito! Você domina os fundamentos do ChatGPT
                        </Badge>
                        <p className="text-sm text-gray-600">
                          Pronto para criar prompts eficazes na próxima aula!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Badge variant="destructive" className="px-4 py-2">
                          📖 Revise - Foque na estrutura de prompts
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
                  <h4 className="font-medium text-gray-900 mb-3">Desafios do Projeto:</h4>
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
                  <h4 className="font-medium text-green-900 mb-2">Portfolio Final:</h4>
                  <p className="text-sm text-green-800">{lesson.assignment.submission}</p>
                </div>
                
                <div className="flex space-x-4">
                  <Button className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Enviar Portfolio
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Ver Exemplos
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