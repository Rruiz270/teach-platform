import { NextRequest, NextResponse } from 'next/server'

interface LessonRequest {
  topic: string
  grade: string
  duration?: number
  objectives: string
}

export async function POST(request: NextRequest) {
  try {
    const body: LessonRequest = await request.json()
    const { topic, grade, objectives, duration = 45 } = body

    if (!topic && !objectives) {
      return NextResponse.json(
        { error: 'Tópico ou objetivos são obrigatórios' },
        { status: 400 }
      )
    }

    const apiKey = process.env.CLAUDE_API_KEY
    if (!apiKey) {
      console.warn('Claude API key not found, using fallback')
      
      // Fallback response when API key is not available
      return NextResponse.json({
        success: true,
        content: {
          title: `Aula: ${topic || 'Tópico extraído dos objetivos'}`,
          outline: generateFallbackOutline(topic, grade, objectives),
          slides: generateFallbackSlides(topic, grade),
          activities: generateFallbackActivities(topic, grade),
          assessment: generateFallbackAssessment(topic, grade),
          provider: 'Claude (Fallback)',
          duration: duration
        }
      })
    }

    // Call Claude API
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: `Você é um especialista em educação brasileira. Crie uma aula completa em português seguindo o currículo brasileiro.

DADOS DA AULA:
- Tópico: ${topic}
- Série/Ano: ${grade}
- Duração: ${duration} minutos
- Objetivos/Descrição: ${objectives}

RESPONDA EM FORMATO JSON com esta estrutura exata:
{
  "title": "Título da aula",
  "outline": "Roteiro detalhado da aula com cronograma",
  "slides": ["Slide 1: Introdução", "Slide 2: Conceitos principais", "..."],
  "activities": ["Atividade 1: Descrição", "Atividade 2: Descrição", "..."],
  "assessment": ["Questão 1", "Questão 2", "..."],
  "duration": ${duration}
}

Certifique-se de que o conteúdo seja apropriado para a idade dos alunos e siga as diretrizes pedagógicas brasileiras.`
          }
        ]
      })
    })

    if (!claudeResponse.ok) {
      throw new Error(`Claude API error: ${claudeResponse.status}`)
    }

    const claudeData = await claudeResponse.json()
    const content = claudeData.content[0].text

    try {
      const parsedContent = JSON.parse(content)
      return NextResponse.json({
        success: true,
        content: {
          ...parsedContent,
          provider: 'Claude (Anthropic)'
        }
      })
    } catch (parseError) {
      console.error('Failed to parse Claude response as JSON:', parseError)
      
      // Return a structured response even if Claude didn't return JSON
      return NextResponse.json({
        success: true,
        content: {
          title: `Aula: ${topic}`,
          outline: content,
          slides: extractSlides(content),
          activities: extractActivities(content),
          assessment: extractAssessment(content),
          provider: 'Claude (Anthropic - Text)',
          duration: duration
        }
      })
    }

  } catch (error) {
    console.error('Error generating lesson:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// Fallback generators when API is not available
function generateFallbackOutline(topic: string, grade: string, objectives: string): string {
  return `Roteiro da Aula: ${topic}

**Público-alvo:** ${grade}
**Duração:** 45 minutos

**1. Introdução (10 min)**
- Apresentação do tema
- Ativação de conhecimentos prévios
- Objetivos da aula

**2. Desenvolvimento (25 min)**
- Explicação dos conceitos principais
- Exemplos práticos
- Discussão interativa

**3. Consolidação (10 min)**
- Síntese dos pontos principais
- Esclarecimento de dúvidas
- Atividade de fixação

**Objetivos de Aprendizagem:**
${objectives}

**Recursos Necessários:**
- Quadro/projetor
- Material didático
- Atividades impressas`
}

function generateFallbackSlides(topic: string, grade: string): string[] {
  return [
    `Slide 1: Título - ${topic}`,
    `Slide 2: Objetivos da Aula`,
    `Slide 3: O que vocês já sabem sobre ${topic}?`,
    `Slide 4: Conceitos Principais`,
    `Slide 5: Exemplos Práticos`,
    `Slide 6: Vamos Praticar!`,
    `Slide 7: Resumo e Conclusões`,
    `Slide 8: Próximos Passos`
  ]
}

function generateFallbackActivities(topic: string, grade: string): string[] {
  return [
    `Atividade 1: Discussão em grupo sobre ${topic}`,
    `Atividade 2: Exercício prático relacionado ao tema`,
    `Atividade 3: Jogo educativo ou dinâmica`,
    `Atividade 4: Criação de mapa mental ou resumo`,
    `Atividade 5: Apresentação dos resultados`
  ]
}

function generateFallbackAssessment(topic: string, grade: string): string[] {
  return [
    `1. O que você aprendeu sobre ${topic} na aula de hoje?`,
    `2. Cite dois exemplos práticos relacionados ao tema.`,
    `3. Qual foi a parte mais interessante da aula?`,
    `4. Como você aplicaria esse conhecimento no dia a dia?`,
    `5. Que dúvidas você ainda tem sobre o assunto?`
  ]
}

// Text extraction functions for non-JSON responses
function extractSlides(text: string): string[] {
  const slides = []
  const lines = text.split('\n')
  let slideCount = 1
  
  for (const line of lines) {
    if (line.includes('slide') || line.includes('Slide')) {
      slides.push(line.trim())
    }
  }
  
  if (slides.length === 0) {
    return generateFallbackSlides('', '')
  }
  
  return slides
}

function extractActivities(text: string): string[] {
  const activities = []
  const lines = text.split('\n')
  
  for (const line of lines) {
    if (line.includes('atividade') || line.includes('Atividade') || line.includes('exercício')) {
      activities.push(line.trim())
    }
  }
  
  if (activities.length === 0) {
    return generateFallbackActivities('', '')
  }
  
  return activities
}

function extractAssessment(text: string): string[] {
  const questions = []
  const lines = text.split('\n')
  
  for (const line of lines) {
    if (line.match(/^\d+\./) || line.includes('questão') || line.includes('pergunta')) {
      questions.push(line.trim())
    }
  }
  
  if (questions.length === 0) {
    return generateFallbackAssessment('', '')
  }
  
  return questions
}