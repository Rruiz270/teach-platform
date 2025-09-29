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
import { ArrowLeft, Play, CheckCircle, Clock, BookOpen, Video, Users, Award, Download, ExternalLink, Calendar, Brain, Rocket, Trophy, Lightbulb, FileText, Zap } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function StarterLesson6Page() {
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
    title: 'Projeto Prático: Primeiro Plano de Aula',
    module: 'Starter - Fundamentos de IA',
    duration: '90 min',
    description: 'Projeto capstone: crie seu primeiro plano de aula completo usando IA, aplicando todos os conceitos aprendidos',
    ageGroup: 'Todos os Níveis',
    level: 'Projeto Final',
    objectives: [
      'Criar plano de aula completo usando IA de forma estratégica',
      'Aplicar todas as técnicas de prompting aprendidas',
      'Integrar múltiplas ferramentas de IA em workflow coeso',
      'Testar e refinar o plano com feedback real de alunos'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    liveSession: {
      date: '2024-12-20',
      time: '19:00',
      instructor: 'AI MAESTRO',
      duration: '150 min',
      registered: false,
      description: 'Projeto final ao vivo: criando juntos o plano perfeito'
    },
    content: {
      theory: `
# Projeto Prático: Seu Primeiro Plano de Aula com IA

## 1. Visão Geral do Projeto Capstone

### O Momento Decisivo
Chegou a hora de **colocar em prática** tudo que você aprendeu no módulo Starter. Este não é apenas mais um exercício - é o momento em que você se torna oficialmente um **Professor Potencializado por IA**.

### Objetivo Transformador
Ao final deste projeto, você terá:
- ✅ **Um plano de aula completo** criado estrategicamente com IA
- ✅ **Domínio prático** de todo workflow de criação
- ✅ **Evidência concreta** da transformação na sua prática
- ✅ **Template pessoal** replicável para futuras aulas
- ✅ **Confiança total** para usar IA autonomamente

### Por que Este Projeto Muda Tudo?
**Antes do TEACH:** Você gastava 3-4 horas para criar um plano de aula de qualidade
**Depois do TEACH:** Você criará planos melhores em 30-45 minutos

**Multiplicação do Impacto:**
- **10x mais eficiente** na preparação
- **5x mais criativo** nas atividades
- **3x melhor** qualidade dos materiais
- **100% alinhado** com BNCC e sua realidade

## 2. Metodologia do Projeto: Framework T.E.A.C.H

### **T** - Tematização Estratégica
Escolha tema que:
- **Conecta** com interesse dos alunos
- **Desafia** metodologias tradicionais
- **Permite** criatividade e inovação
- **Alinha** perfeitamente com BNCC

### **E** - Estruturação com IA
Use IA para:
- **Brainstorming** de ideias criativas
- **Sequenciação** lógica do conteúdo
- **Diferenciação** para múltiplos níveis
- **Avaliação** formativa integrada

### **A** - Aplicação Ferramentas
Integre múltiplas IAs:
- **ChatGPT** - Estrutura e conteúdo
- **Canva** - Visuais impactantes
- **Loom** - Explicações gravadas
- **Forms** - Avaliações automáticas

### **C** - Criação de Materiais
Produza conjunto completo:
- **Plano detalhado** passo a passo
- **Atividades diferenciadas** por nível
- **Recursos visuais** profissionais
- **Instrumentos** de avaliação

### **H** - Humanização Final
Adicione toque pessoal:
- **Conexões** com sua experiência
- **Adaptações** para sua turma específica
- **Elementos** da sua personalidade
- **Cuidado** com relacionamentos

## 3. Fase 1: Planejamento Estratégico (15 minutos)

### Definindo Seu Projeto

#### Escolha do Tópico
Use este prompt para brainstorming:

\`\`\`
Você é um especialista em engajamento estudantil e inovação pedagógica.

CONTEXTO: Sou professor(a) de [SUA DISCIPLINA] para [SÉRIE/ANO] em [TIPO DE ESCOLA] em [SUA CIDADE]. Quero criar uma aula memorável que os alunos nunca esqueçam.

PERFIL DA TURMA:
- Idade média: [X] anos
- Características: [descreva - agitados, tímidos, tecnológicos, etc.]
- Interesses: [o que gostam - jogos, música, esportes, etc.]
- Desafios: [principais dificuldades na disciplina]

RESTRIÇÕES:
- Tempo: [X] minutos de aula
- Recursos: [o que tem disponível]
- Período: [manhã/tarde, antes/depois do recreio]

TAREFA: Sugira 5 tópicos do currículo de [SUA DISCIPLINA] que eu poderia transformar em aulas inovadoras e engajantes usando IA. Para cada tópico, explique por que seria impactante e como a IA potencializaria o aprendizado.

CRITÉRIOS:
- Alinhamento com BNCC
- Alto potencial de engajamento
- Viabilidade prática
- Oportunidade de usar IA criativamente
- Relevância para a vida dos alunos
\`\`\`

#### Definindo Objetivos
Após escolher o tópico, use este template:

\`\`\`
PROJETO: Plano de aula sobre [TÓPICO ESCOLHIDO]

OBJETIVO GERAL (em 1 frase):
[O que os alunos devem ser capazes de fazer ao final]

OBJETIVOS ESPECÍFICOS (3-4 itens):
1. [Habilidade cognitiva específica]
2. [Aplicação prática]
3. [Conexão interdisciplinar]
4. [Competência socioemocional]

HABILIDADE BNCC PRINCIPAL:
[Código e descrição]

COMPETÊNCIAS GERAIS BNCC (1-3):
[Quais das 10 competências serão desenvolvidas]

RESULTADOS ESPERADOS:
- Conhecimento: [o que saberão]
- Habilidades: [o que conseguirão fazer]
- Atitudes: [como se comportarão]
\`\`\`

### Análise do Contexto

#### Mapeamento da Turma
\`\`\`
DIAGNÓSTICO DA TURMA:

PERFIL ACADÊMICO:
- Alunos acima do esperado: [%] - Características:
- Alunos no nível adequado: [%] - Características:
- Alunos com dificuldades: [%] - Características:

PERFIL SOCIAL:
- Dinâmica da turma: [colaborativa/competitiva/individual]
- Liderança: [quem são os influenciadores]
- Relacionamentos: [como se organizam]

PERFIL MOTIVACIONAL:
- O que os motiva: [listar 3-5 elementos]
- O que os desmotiva: [listar 3-5 elementos]
- Estilo preferido: [visual/auditivo/cinestésico]

RECURSOS DISPONÍVEIS:
- Tecnológicos: [listar]
- Físicos: [espaço, materiais]
- Temporais: [duração, frequência]
- Humanos: [apoio, parcerias]
\`\`\`

## 4. Fase 2: Criação com IA (30 minutos)

### Estruturação do Plano

#### Prompt Master para Plano Completo
\`\`\`
Você é um pedagogo renomado especialista em metodologias ativas e uso estratégico de tecnologia na educação.

PROJETO: Aula sobre [SEU TÓPICO] para [SUA TURMA]

CONTEXTO DETALHADO:
[Cole aqui todo o contexto que mapeou na Fase 1]

METODOLOGIA OBRIGATÓRIA: Metodologia ativa com rotação por estações

TAREFA: Crie um plano de aula completo de [X] minutos seguindo esta estrutura:

**1. ABERTURA IMPACTANTE (5-8 min)**
- Gancho que conecta com interesse dos alunos
- Apresentação dos objetivos de forma motivadora
- Ativação de conhecimentos prévios

**2. DESENVOLVIMENTO EM ESTAÇÕES (30-35 min)**
Estação 1: [Conceitual] - Construção do conhecimento
Estação 2: [Prática] - Aplicação hands-on
Estação 3: [Criativa] - Produção original
Estação 4: [Colaborativa] - Discussão e síntese

**3. SÍNTESE COLETIVA (8-10 min)**
- Apresentação das descobertas
- Conexões entre estações
- Sistematização do aprendizado

**4. FECHAMENTO E AVALIAÇÃO (5-7 min)**
- Autoavaliação dos alunos
- Feedback do professor
- Preparação para próxima aula

PARA CADA SEÇÃO, FORNEÇA:
- Objetivos específicos
- Instruções detalhadas passo a passo
- Materiais necessários
- Tempo estimado
- Critérios de avaliação
- Adaptações para diferentes níveis
- Possíveis dificuldades e soluções

DIFERENCIAIS OBRIGATÓRIOS:
- Uso estratégico de tecnologia/IA
- Gamificação natural
- Conexão com realidade dos alunos
- Momentos de metacognição
- Avaliação formativa contínua
\`\`\`

### Criação de Atividades Diferenciadas

#### Prompt para Múltiplos Níveis
\`\`\`
Agora, para a atividade principal da Estação 2 [Prática], crie 3 versões diferenciadas:

**VERSÃO BÁSICA** (para alunos com mais dificuldade):
- Estrutura mais guiada
- Passos menores e claros
- Suporte visual abundante
- Possibilidade de trabalho em duplas
- Critérios de sucesso simplificados

**VERSÃO PADRÃO** (para maioria da turma):
- Autonomia moderada
- Desafios equilibrados
- Suporte disponível quando solicitado
- Trabalho individual ou em grupos
- Critérios claros de qualidade

**VERSÃO AVANÇADA** (para alunos que dominam o conteúdo):
- Alta autonomia
- Desafios complexos ou adicionais
- Papel de mentor para colegas
- Projetos de extensão
- Critérios de excelência elevados

IMPORTANTE: Todas as versões devem:
- Ter mesmo objetivo de aprendizagem
- Ser visualmente similares (sem constrangimento)
- Permitir transição entre níveis
- Levar ao mesmo produto final (adaptado)
\`\`\`

### Materiais Visuais com Canva

#### Criando Visuais Profissionais
\`\`\`
MATERIAIS VISUAIS NECESSÁRIOS:

1. **SLIDE DE ABERTURA**
   - Título impactante da aula
   - Objetivo em linguagem dos alunos
   - Visual que desperta curiosidade

2. **INFOGRÁFICO DAS ESTAÇÕES**
   - Mapa visual do roteiro
   - Ícones para cada estação
   - Tempo estimado por atividade

3. **CARDS DE INSTRUÇÕES**
   - Um card por estação
   - Instruções claras e visuais
   - QR codes para recursos digitais

4. **TEMPLATE DE AVALIAÇÃO**
   - Rubrica visual simples
   - Autoavaliação para alunos
   - Espaço para feedback do professor
\`\`\`

**Prompt para Canva Magic Design:**
\`\`\`
Crie slide de abertura para aula de [DISCIPLINA] sobre [TÓPICO] para alunos de [IDADE]. 

Elementos obrigatórios:
- Título: [SEU TÍTULO CRIATIVO]
- Subtítulo: [OBJETIVO EM LINGUAGEM JOVEM]
- Visual: [IMAGEM QUE CONECTA COM O TEMA]
- Cores: [PALETA ENERGÉTICA MAS PROFISSIONAL]
- Estilo: Moderno, educacional, engajante

Tom: Entusiasmado mas sério, jovem mas respeitoso
\`\`\`

## 5. Fase 3: Refinamento e Humanização (20 minutos)

### Adicionando Sua Marca Pessoal

#### Checklist de Humanização
\`\`\`
✅ CONEXÃO PESSOAL:
- [ ] Inclui exemplo da minha experiência pessoal
- [ ] Menciona referência que os alunos conhecem
- [ ] Usa linguagem que costumo usar naturalmente
- [ ] Incorpora "bordões" ou expressões minhas

✅ ADAPTAÇÃO À TURMA:
- [ ] Considera personalidades específicas dos alunos
- [ ] Antecipa reações da turma
- [ ] Inclui estratégias para alunos específicos
- [ ] Ajusta exemplos para interesse real da turma

✅ CONTEXTO ESCOLAR:
- [ ] Considera limitações reais da escola
- [ ] Usa recursos que realmente tenho
- [ ] Adapta aos tempos reais da instituição
- [ ] Alinha com projetos em andamento

✅ TOQUE CRIATIVO:
- [ ] Adiciona elemento surpresa
- [ ] Inclui momentos de humor apropriado
- [ ] Cria conexões inesperadas
- [ ] Personaliza para meu estilo de ensino
\`\`\`

### Prompt de Refinamento Final
\`\`\`
Agora vou compartilhar o plano que criei com IA. Por favor, ajude-me a refiná-lo considerando estas informações adicionais sobre mim e minha turma:

SOBRE MIM COMO PROFESSOR:
[Descreva seu estilo, experiências marcantes, bordões, jeito de ser]

SOBRE MINHA TURMA ESPECÍFICA:
[Nomes de alunos-chave, dinâmicas particulares, acontecimentos recentes]

CONTEXTO ESCOLAR REAL:
[Limitações, oportunidades, recursos exatos, projetos em andamento]

PLANO ATUAL:
[Cole seu plano criado com IA]

TAREFA: Refine este plano adicionando:
1. Toque pessoal que reflita meu estilo
2. Adaptações específicas para minha turma
3. Ajustes para recursos reais disponíveis
4. Elementos que tornem a aula uniquely minha
5. Estratégias para casos específicos que antecipo

Mantenha a estrutura sólida, mas humanize completamente.
\`\`\`

## 6. Fase 4: Criação de Instrumentos de Avaliação (15 minutos)

### Avaliação Formativa Integrada

#### Rubrica Visual Simplificada
\`\`\`
Crie rubrica de avaliação para minha aula sobre [TÓPICO] seguindo este formato:

**CRITÉRIO 1: [CONHECIMENTO]**
😊 EXCELENTE: [Descrição em linguagem do aluno]
🙂 BOM: [Descrição clara]
😐 PRECISA MELHORAR: [Descrição motivadora]

**CRITÉRIO 2: [APLICAÇÃO]**
😊 EXCELENTE: [O que demonstra domínio]
🙂 BOM: [O que mostra compreensão]
😐 PRECISA MELHORAR: [O que indica necessidade de apoio]

**CRITÉRIO 3: [COLABORAÇÃO]**
😊 EXCELENTE: [Comportamentos de excelência]
🙂 BOM: [Participação adequada]
😐 PRECISA MELHORAR: [Pontos de crescimento]

**CRITÉRIO 4: [CRIATIVIDADE]**
😊 EXCELENTE: [Inovação e originalidade]
🙂 BOM: [Boas ideias]
😐 PRECISA MELHORAR: [Encorajamento para arriscar]

FORMATO: Visual, colorido, linguagem positiva, foco no crescimento
\`\`\`

#### Autoavaliação dos Alunos
\`\`\`
**MEU APRENDIZADO HOJE**

🎯 OBJETIVO: Eu entendo [OBJETIVO DA AULA]?
💯 Totalmente  |  ✅ Bastante  |  🤔 Mais ou menos  |  ❓ Preciso de ajuda

🧠 NOVO CONHECIMENTO: O que aprendi de mais importante?
[Espaço para resposta livre]

💪 APLICAÇÃO: Como vou usar isso na vida real?
[Espaço para resposta livre]

🤝 COLABORAÇÃO: Como foi trabalhar em equipe hoje?
😊 Muito bem  |  🙂 Bem  |  😐 Mais ou menos  |  😞 Preciso melhorar

⭐ DESTAQUE: Qual foi o melhor momento da aula?
[Espaço para resposta livre]

🚀 PRÓXIMOS PASSOS: O que quero aprender mais?
[Espaço para resposta livre]

💌 RECADO PARA O PROFESSOR:
[Espaço livre para feedback]
\`\`\`

### Google Forms Automatizado

#### Prompt para Formulário de Feedback
\`\`\`
Crie questionário no Google Forms para coletar feedback da minha aula sobre [TÓPICO]:

**SEÇÃO 1: AUTOAVALIAÇÃO DO APRENDIZADO**
- Escala Likert 1-5 para cada objetivo
- Pergunta aberta: principal aprendizado
- Pergunta aberta: maior dificuldade

**SEÇÃO 2: AVALIAÇÃO DA METODOLOGIA**
- Qual estação você mais gostou? (múltipla escolha)
- O que funcionou bem? (resposta curta)
- O que poderia melhorar? (resposta curta)

**SEÇÃO 3: ENGAJAMENTO**
- Como se sentiu durante a aula? (emoji)
- Recomendaria esta aula para um amigo? (sim/não + justificativa)
- Que nota daria para a aula? (1-10)

**SEÇÃO 4: PRÓXIMOS PASSOS**
- Que assunto gostaria de estudar na próxima aula?
- Sugestões para o professor

CONFIGURAÇÕES:
- Respostas anônimas
- Obrigatório apenas perguntas essenciais
- Design colorido e amigável
- Tempo estimado: 3-5 minutos
\`\`\`

## 7. Fase 5: Implementação e Teste (10 minutos de preparação)

### Checklist Pré-Aplicação

#### Preparação Técnica
\`\`\`
✅ RECURSOS DIGITAIS:
- [ ] Slides carregados e testados
- [ ] Vídeos funcionando
- [ ] QR codes testados
- [ ] Backup offline preparado
- [ ] Formulários configurados

✅ MATERIAIS FÍSICOS:
- [ ] Impressões organizadas por estação
- [ ] Materiais de apoio separados
- [ ] Cronômetro configurado
- [ ] Espaço físico organizado
- [ ] Plano B para imprevistos

✅ PREPARAÇÃO PESSOAL:
- [ ] Objetivos memorizados
- [ ] Transições ensaiadas
- [ ] Instruções claras
- [ ] Energia positiva
- [ ] Flexibilidade mental
\`\`\`

#### Estratégias de Implementação
\`\`\`
**ANTES DA AULA:**
- Chegar 10 minutos antes
- Testar todos os equipamentos
- Organizar materiais por estação
- Mentalizar o fluxo da aula
- Preparar-se emocionalmente

**DURANTE A AULA:**
- Começar com alta energia
- Monitorar tempo constantemente
- Circular entre todas as estações
- Fazer micro-ajustes conforme necessário
- Manter foco nos objetivos

**APÓS A AULA:**
- Aplicar formulário de feedback imediatamente
- Fazer anotações enquanto está fresco na memória
- Coletar materiais produzidos pelos alunos
- Refletir sobre sucessos e desafios
- Planejar ajustes para próxima aplicação
\`\`\`

## 8. Fase 6: Análise e Refinamento

### Coletando Evidências de Sucesso

#### Métricas Quantitativas
\`\`\`
DADOS OBJETIVOS:

ENGAJAMENTO:
- % de alunos que participaram ativamente: ___/___
- Número de perguntas espontâneas: ___
- Tempo que levaram para se engajar: ___ min
- Estação com maior engajamento: ___

APRENDIZAGEM:
- % que atingiram objetivo principal: ___
- Média de autoavaliação (1-10): ___
- Número de conexões corretas feitas: ___
- Qualidade dos produtos finais (1-10): ___

GESTÃO:
- Tempo real vs planejado: +/- ___ min
- Número de interrupções/dúvidas: ___
- Transições (suaves/atrapalhadas): ___
- Uso efetivo do tempo: ___%
\`\`\`

#### Métricas Qualitativas
\`\`\`
OBSERVAÇÕES COMPORTAMENTAIS:

MOMENTOS DE SUCESSO:
- Quando os alunos demonstraram "aha!"
- Discussões espontâneas de qualidade
- Colaboração genuína entre alunos
- Aplicações criativas inesperadas

PONTOS DE ATENÇÃO:
- Momentos de confusão ou dispersão
- Instruções que precisaram ser repetidas
- Atividades que duraram mais/menos que previsto
- Diferenças entre grupos/indivíduos

FEEDBACK DOS ALUNOS:
- Comentários espontâneos positivos
- Sugestões de melhoria
- Pedidos de repetição/continuação
- Expressões não-verbais
\`\`\`

### Prompt de Análise Crítica
\`\`\`
Análise minha primeira experiência com plano de aula criado com IA:

CONTEXTO:
[Descreva brevemente a aula aplicada]

DADOS COLETADOS:
[Cole métricas quantitativas e qualitativas]

FEEDBACK DOS ALUNOS:
[Principais pontos do formulário]

MINHA REFLEXÃO PESSOAL:
[Como se sentiu, o que funcionou, o que não funcionou]

TAREFA: Como especialista em análise pedagógica, forneça:

1. **SUCESSOS IDENTIFICADOS**
   - O que funcionou excepcionalmente bem
   - Por que funcionou (análise)
   - Como manter/potencializar

2. **OPORTUNIDADES DE MELHORIA**
   - Pontos específicos para ajustar
   - Sugestões práticas de refinamento
   - Priorização de mudanças

3. **LIÇÕES APRENDIDAS**
   - Insights sobre uso de IA na educação
   - Descobertas sobre minha turma
   - Evolução do meu processo

4. **PRÓXIMOS PASSOS**
   - Ajustes imediatos para próxima aplicação
   - Habilidades a desenvolver
   - Experimentos a tentar

5. **TEMPLATE OTIMIZADO**
   - Versão melhorada do plano original
   - Ajustes baseados na experiência real
   - Checklist personalizado
\`\`\`

## 9. Criando Seu Template Pessoal Definitivo

### Sistematizando o Aprendizado

Com base na experiência real, agora você criará seu **Template Master** pessoal:

#### Estrutura do Template Personalizado
\`\`\`
# MEU TEMPLATE MASTER: PLANOS COM IA

## FASE 1: ANÁLISE DE CONTEXTO (5 min)
**Prompt padrão:** [Seu prompt testado e refinado]
**Adaptações necessárias:** [Checklist específico]

## FASE 2: CRIAÇÃO DO PLANO (15 min)
**Prompt principal:** [Versão otimizada baseada na experiência]
**Elementos obrigatórios:** [Lista personalizada]

## FASE 3: MATERIAIS VISUAIS (10 min)
**Canva workflow:** [Sequência que funciona para você]
**Templates favoritos:** [Links salvos]

## FASE 4: INSTRUMENTOS DE AVALIAÇÃO (5 min)
**Rubrica padrão:** [Adaptada ao seu estilo]
**Forms template:** [Link do formulário modelo]

## FASE 5: HUMANIZAÇÃO (10 min)
**Minha marca pessoal:** [Elementos que sempre inclui]
**Adaptações típicas:** [Ajustes que sempre faz]

## TOTAL: 45 MINUTOS PARA PLANO COMPLETO

CHECKLIST PRÉ-APLICAÇÃO:
- [ ] [Item específico 1]
- [ ] [Item específico 2]
- [ ] [Etc...]

MÉTRICAS DE SUCESSO:
- [KPIs que importam para você]
- [Como medir eficácia]

BANCO DE RECURSOS:
- [Links de ferramentas favoritas]
- [Prompts salvos]
- [Templates visuais]
\`\`\`

## 10. Celebrando Sua Transformação

### Antes vs Depois: Sua Jornada

#### O Que Você Conquistou
**🎯 HABILIDADES TÉCNICAS:**
- ✅ Domínio completo do ChatGPT
- ✅ Criação de prompts eficazes
- ✅ Integração de múltiplas ferramentas de IA
- ✅ Workflow otimizado de criação

**🚀 GANHOS DE PRODUTIVIDADE:**
- ✅ 10x mais rápido na criação de planos
- ✅ 5x mais criativo nas atividades
- ✅ 3x melhor qualidade dos materiais
- ✅ 100% alinhado com BNCC

**💡 MUDANÇA DE MINDSET:**
- ✅ IA como parceira, não ameaça
- ✅ Foco no que é únicamente humano
- ✅ Confiança para experimentar
- ✅ Visão de futuro da educação

**👥 IMPACTO NOS ALUNOS:**
- ✅ Aulas mais engajantes
- ✅ Materiais personalizados
- ✅ Avaliação mais eficaz
- ✅ Experiências memoráveis

### Seu Certificado de Transformação

\`\`\`
🏆 CERTIFICADO DE CONCLUSÃO 🏆

TEACH PLATFORM - MÓDULO STARTER

[SEU NOME] concluiu com sucesso o módulo
"FUNDAMENTOS DE IA PARA EDUCADORES"

Demonstrando domínio em:
✓ Conceitos fundamentais de IA na educação
✓ Panorama global e brasileiro da IA educacional
✓ Domínio prático das principais ferramentas
✓ Uso eficaz do ChatGPT para educação
✓ Criação de prompts de alta eficácia
✓ Projeto prático aplicado com sucesso

Data de conclusão: [DATA]
Carga horária: 6 aulas (8 horas)
Projeto final: Plano de aula com IA ✅

"Transformando a educação brasileira,
um professor por vez."

AI MAESTRO
Especialista em IA Educacional
TEACH Platform
\`\`\`

### Próximos Passos na Sua Jornada

#### Níveis Avançados Aguardam
**MÓDULO SURVIVOR (Intermediário):**
- Automação de processos educacionais
- Criação de sistemas adaptativos
- IA para avaliação em larga escala
- Personalização avançada do ensino

**MÓDULO EXPLORER (Avançado):**
- Desenvolvimento de soluções personalizadas
- Integração de múltiplas IAs
- Análise preditiva de aprendizagem
- Liderança em transformação digital

**MÓDULO EXPERT (Especialista):**
- Criação de ferramentas próprias
- Consultoria em IA educacional
- Formação de outros professores
- Pesquisa e desenvolvimento

#### Sua Comunidade de Prática
- **Fórum TEACH** - Compartilhe experiências
- **Grupos de WhatsApp** - Suporte contínuo
- **Lives mensais** - Novidades e dicas
- **Encontros regionais** - Networking presencial

## Reflexão Final: O Professor que Você Se Tornou

Pare um momento e reflita sobre sua jornada:

**ANTES do TEACH:** Como você se sentia em relação à IA?
**AGORA:** Qual é sua visão sobre IA na educação?

**ANTES:** Quanto tempo gastava criando materiais?
**AGORA:** Como será sua nova rotina de preparação?

**ANTES:** Que limitações sentia na sua prática?
**AGORA:** Que novas possibilidades se abriram?

**ANTES:** Como via o futuro da educação?
**AGORA:** Qual papel você quer ter nessa transformação?

### Seu Compromisso com a Transformação

Como **Professor Potencializado por IA**, você agora tem a responsabilidade de:

1. **CONTINUAR PRATICANDO** - Use IA pelo menos 3x por semana
2. **COMPARTILHAR CONHECIMENTO** - Ensine pelo menos 2 colegas
3. **MANTER CURIOSIDADE** - Explore 1 nova ferramenta por mês
4. **DOCUMENTAR IMPACTO** - Registre sucessos e aprendizados
5. **LIDERAR MUDANÇA** - Seja referência na sua escola

### A Revolução Continua

Você não é mais apenas um professor que usa tecnologia.
**Você é um agente de transformação da educação brasileira.**

Cada aula que você criar com IA não beneficia apenas seus alunos hoje, mas contribui para formar a geração que construirá o futuro do nosso país.

**Sua missão está clara:**
**Use sua nova superpotência para multiplicar seu impacto e transformar vidas através da educação.**

**O futuro da educação brasileira começa agora - e você está liderando essa revolução!** 🚀✨

---

*"O professor do futuro não é aquele que compete com a IA, mas aquele que dança com ela para criar experiências de aprendizagem impossíveis antes da nossa era."*

**Bem-vindo ao futuro da educação. Bem-vindo à sua nova realidade como Professor Potencializado por IA!**
      `,
      aiTools: [
        {
          name: 'Workflow Templates (Notion)',
          description: 'Templates pré-configurados para projeto completo',
          url: 'https://notion.so',
          useCase: 'Organização e gestão do projeto capstone'
        },
        {
          name: 'Canva for Education',
          description: 'Versão educacional com templates específicos',
          url: 'https://canva.com/education',
          useCase: 'Criação de todos os materiais visuais'
        },
        {
          name: 'Google Workspace for Education',
          description: 'Suite completa para criação e colaboração',
          url: 'https://workspace.google.com/education',
          useCase: 'Forms, Docs, Slides integrados'
        },
        {
          name: 'Loom',
          description: 'Gravação de telas e vídeos explicativos',
          url: 'https://loom.com',
          useCase: 'Documentação do processo e tutoriais'
        },
        {
          name: 'ChatGPT Team',
          description: 'Versão colaborativa para projetos',
          url: 'https://openai.com/chatgpt/team',
          useCase: 'Colaboração e compartilhamento de prompts'
        },
        {
          name: 'Padlet',
          description: 'Mural colaborativo para brainstorming',
          url: 'https://padlet.com',
          useCase: 'Organização de ideias e feedback'
        }
      ]
    },
    quiz: [
      {
        question: 'Qual é o objetivo principal do Projeto Capstone?',
        options: [
          'Testar apenas o ChatGPT',
          'Criar um plano de aula completo integrando todas as técnicas aprendidas',
          'Fazer uma apresentação sobre IA',
          'Comparar IA com métodos tradicionais'
        ],
        correct: 1
      },
      {
        question: 'O framework T.E.A.C.H para o projeto significa:',
        options: [
          'Tecnologia, Educação, Arte, Ciência, História',
          'Tematização, Estruturação, Aplicação, Criação, Humanização',
          'Teoria, Ensino, Avaliação, Criatividade, Habilidades',
          'Tempo, Energia, Atenção, Cuidado, Harmonia'
        ],
        correct: 1
      },
      {
        question: 'Na fase de humanização, o mais importante é:',
        options: [
          'Usar apenas tecnologia avançada',
          'Copiar exatamente o que a IA criou',
          'Adicionar toque pessoal e adaptar para sua realidade específica',
          'Eliminar todos os elementos tecnológicos'
        ],
        correct: 2
      },
      {
        question: 'A avaliação do projeto deve incluir:',
        options: [
          'Apenas notas numéricas',
          'Somente feedback dos alunos',
          'Métricas quantitativas e qualitativas + autoavaliação',
          'Apenas observação informal'
        ],
        correct: 2
      },
      {
        question: 'Após concluir o projeto, o próximo passo é:',
        options: [
          'Parar de usar IA',
          'Usar apenas métodos tradicionais',
          'Criar template pessoal e continuar refinando',
          'Ensinar apenas o que já sabe'
        ],
        correct: 2
      }
    ],
    assignment: {
      title: 'Projeto Capstone: Meu Primeiro Plano de Aula com IA',
      description: 'Projeto final que integra todos os conceitos aprendidos no módulo Starter',
      requirements: [
        'Escolher tópico relevante e desafiador da sua disciplina',
        'Criar plano de aula completo usando framework T.E.A.C.H',
        'Aplicar técnicas avançadas de prompting aprendidas',
        'Integrar múltiplas ferramentas de IA no workflow',
        'Produzir materiais visuais profissionais com Canva',
        'Criar instrumentos de avaliação formativa eficazes',
        'Aplicar o plano com alunos reais e coletar evidências',
        'Analisar resultados e refinar baseado no feedback',
        'Documentar todo o processo e aprendizados',
        'Criar template pessoal reutilizável'
      ],
      submission: 'Portfolio completo: plano final + materiais criados + evidências de aplicação + análise crítica + template personalizado + vídeo reflexivo (5 min)'
    },
    maestroInfo: {
      topic: 'Projeto Final Ao Vivo: Criando Juntos o Plano Perfeito',
      duration: '150 min',
      agenda: [
        'Abertura: Revisão de todos os conceitos do módulo (15 min)',
        'Workshop parte 1: Planejamento estratégico colaborativo (30 min)',
        'Workshop parte 2: Criação com IA em tempo real (45 min)',
        'Workshop parte 3: Refinamento e humanização (30 min)',
        'Apresentações dos projetos e feedback coletivo (30 min)',
        'Celebração e certificação ao vivo (20 min)'
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
                  <Badge variant="default">{lesson.level}</Badge>
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
                    <Rocket className="w-4 h-4 mr-1" />
                    Capstone
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-2">Objetivos do Projeto:</h4>
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
            <TabsTrigger value="video">🚀 Vídeo</TabsTrigger>
            <TabsTrigger value="content">📚 Conteúdo</TabsTrigger>
            <TabsTrigger value="tools">🛠️ Ferramentas</TabsTrigger>
            <TabsTrigger value="quiz">❓ Quiz</TabsTrigger>
            <TabsTrigger value="assignment">🏆 Projeto</TabsTrigger>
          </TabsList>

          {/* Video Content with AI MAESTRO */}
          <TabsContent value="video" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Async Video */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Video className="mr-2 h-5 w-5" />
                    Projeto Capstone Completo
                  </CardTitle>
                  <CardDescription>
                    Guia definitivo: do planejamento à aplicação do seu primeiro plano com IA
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
                      {videoCompleted ? 'Concluído' : 'Iniciar Projeto'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Live Session with AI MAESTRO */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Projeto Final Ao Vivo
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
                      <p className="text-sm text-gray-600">Mentor de Projetos IA</p>
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
                    <h4 className="font-medium text-sm">Agenda do Projeto Final:</h4>
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
                        Inscrever-se no Projeto Final
                      </Button>
                      <p className="text-xs text-gray-500 text-center">
                        Experiência única - Criação colaborativa ao vivo!
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
                <CardTitle>Guia Completo: Projeto Capstone do Módulo Starter</CardTitle>
                <CardDescription>
                  Manual detalhado para criação do seu primeiro plano de aula com IA - do conceito à aplicação
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
                    <FileText className="w-4 h-4 mr-2" />
                    Templates T.E.A.C.H
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
                      <Badge variant="secondary" className="text-xs">
                        {tool.name.includes('Workspace') ? 'Suite' : 
                         tool.name.includes('Team') ? 'Pro' : 'Ferramenta'}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        <strong>Papel no projeto:</strong> {tool.useCase}
                      </p>
                      <div className="flex space-x-2">
                        <Button asChild size="sm" className="flex-1">
                          <a href={tool.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Usar no Projeto
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
                  Quiz: Preparação para o Projeto
                  <Badge variant="outline">
                    {currentQuestion + 1} de {lesson.quiz.length}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Verifique se está pronto para o projeto final do módulo Starter
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
                      {quizScore / lesson.quiz.length >= 0.7 ? '🏆' : '📚'}
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
                          🚀 Perfeito! Você está pronto para o projeto capstone
                        </Badge>
                        <p className="text-sm text-gray-600">
                          Hora de criar seu primeiro plano de aula com IA!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Badge variant="destructive" className="px-4 py-2">
                          📖 Revise o framework T.E.A.C.H antes do projeto
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
                  <Trophy className="mr-2 h-5 w-5" />
                  {lesson.assignment.title}
                </CardTitle>
                <CardDescription>{lesson.assignment.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Etapas do Projeto Capstone:</h4>
                  <ul className="space-y-2">
                    {lesson.assignment.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Portfolio Final Completo:</h4>
                  <p className="text-sm text-blue-800">{lesson.assignment.submission}</p>
                </div>
                
                <div className="flex space-x-4">
                  <Button className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Enviar Projeto Capstone
                  </Button>
                  <Button variant="outline">
                    <Lightbulb className="w-4 h-4 mr-2" />
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