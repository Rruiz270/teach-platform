'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface AITool {
  id: string
  name: string
  icon: string
  description: string
  idealFor: string
  color: string
  context?: string
}

interface ContextualAIToolsSuggestionsProps {
  lessonTitle: string
  lessonContent?: string
  moduleType?: 'starter' | 'survivor' | 'explorer' | 'expert'
}

export default function ContextualAIToolsSuggestions({ 
  lessonTitle, 
  lessonContent = '', 
  moduleType = 'starter' 
}: ContextualAIToolsSuggestionsProps) {
  const router = useRouter()

  // Smart AI tool selection based on lesson content
  const getRelevantAITools = (): AITool[] => {
    const allTools: AITool[] = [
      {
        id: 'chatgpt-basic',
        name: 'ChatGPT Educacional',
        icon: '🤖',
        description: 'Crie explicações simples e exemplos práticos',
        idealFor: 'Conceitos básicos e exemplos',
        color: 'bg-green-600 hover:bg-green-700',
        context: 'Estados Unidos, Reino Unido'
      },
      {
        id: 'claude-teacher',
        name: 'Claude Professor',
        icon: '📚',
        description: 'Análise pedagógica e feedback detalhado',
        idealFor: 'Análise e planejamento',
        color: 'bg-blue-600 hover:bg-blue-700',
        context: 'Singapura, Finlândia'
      },
      {
        id: 'dalle-visual',
        name: 'DALL-E Educacional',
        icon: '🎨',
        description: 'Crie infográficos e ilustrações didáticas',
        idealFor: 'Material visual',
        color: 'bg-purple-600 hover:bg-purple-700',
        context: 'França, Canadá'
      },
      {
        id: 'gemini-research',
        name: 'Gemini Pesquisa',
        icon: '🔍',
        description: 'Pesquise dados e tendências educacionais',
        idealFor: 'Pesquisa e comparação',
        color: 'bg-orange-600 hover:bg-orange-700',
        context: 'Coreia do Sul, Japão'
      },
      {
        id: 'chatgpt-prompts',
        name: 'ChatGPT Prompts',
        icon: '✍️',
        description: 'Aprenda a criar prompts eficazes',
        idealFor: 'Desenvolvimento de prompts',
        color: 'bg-indigo-600 hover:bg-indigo-700',
        context: 'Todos os países'
      },
      {
        id: 'claude-assessment',
        name: 'Claude Avaliação',
        icon: '📝',
        description: 'Crie avaliações e exercícios personalizados',
        idealFor: 'Avaliações e exercícios',
        color: 'bg-teal-600 hover:bg-teal-700',
        context: 'Alemanha, Holanda'
      }
    ]

    // Smart selection based on lesson title and content
    const lowerTitle = lessonTitle.toLowerCase()
    const lowerContent = lessonContent.toLowerCase()

    // Rule-based selection
    if (lowerTitle.includes('inteligência artificial') || lowerTitle.includes('o que é')) {
      return [allTools[0], allTools[1], allTools[2]] // Basic explanation tools
    }
    
    if (lowerTitle.includes('educação') || lowerTitle.includes('panorama')) {
      return [allTools[0], allTools[3], allTools[1]] // Global education tools
    }
    
    if (lowerTitle.includes('ferramentas') || lowerTitle.includes('principais')) {
      return [allTools[0], allTools[2], allTools[3]] // Tool exploration
    }
    
    if (lowerTitle.includes('chatgpt') || lowerTitle.includes('primeiros passos')) {
      return [allTools[0], allTools[4], allTools[1]] // ChatGPT focused
    }
    
    if (lowerTitle.includes('prompts') || lowerTitle.includes('eficazes')) {
      return [allTools[4], allTools[0], allTools[1]] // Prompt creation
    }
    
    if (lowerTitle.includes('projeto') || lowerTitle.includes('prático')) {
      return [allTools[1], allTools[5], allTools[2]] // Project work
    }

    // Default selection
    return [allTools[0], allTools[1], allTools[2]]
  }

  const getTheme = () => {
    const lowerTitle = lessonTitle.toLowerCase()
    
    if (lowerTitle.includes('educação') || lowerTitle.includes('global') || lowerTitle.includes('panorama')) {
      return {
        gradient: 'from-emerald-50 to-cyan-50',
        border: 'border-emerald-200',
        titleColor: 'text-emerald-900',
        badgeColor: 'bg-emerald-100 text-emerald-800',
        descColor: 'text-emerald-700',
        tipColor: 'text-emerald-700',
        icon: '🌍',
        title: 'IAs para Educação Global',
        tip: 'Explore: Veja como diferentes países usam IA na educação e adapte para sua realidade!'
      }
    }
    
    if (lowerTitle.includes('prompts') || lowerTitle.includes('eficazes')) {
      return {
        gradient: 'from-indigo-50 to-purple-50',
        border: 'border-indigo-200',
        titleColor: 'text-indigo-900',
        badgeColor: 'bg-indigo-100 text-indigo-800',
        descColor: 'text-indigo-700',
        tipColor: 'text-indigo-700',
        icon: '✍️',
        title: 'IAs para Criação de Prompts',
        tip: 'Dica: Pratique diferentes técnicas de prompt engineering com essas ferramentas!'
      }
    }
    
    if (lowerTitle.includes('projeto') || lowerTitle.includes('prático')) {
      return {
        gradient: 'from-orange-50 to-red-50',
        border: 'border-orange-200',
        titleColor: 'text-orange-900',
        badgeColor: 'bg-orange-100 text-orange-800',
        descColor: 'text-orange-700',
        tipColor: 'text-orange-700',
        icon: '🚀',
        title: 'IAs para Projetos Práticos',
        tip: 'Projeto: Use essas ferramentas para implementar IA em sua escola!'
      }
    }

    // Default theme
    return {
      gradient: 'from-purple-50 to-blue-50',
      border: 'border-purple-200',
      titleColor: 'text-purple-900',
      badgeColor: 'bg-purple-100 text-purple-800',
      descColor: 'text-purple-700',
      tipColor: 'text-purple-700',
      icon: '🤖',
      title: 'IAs Recomendadas para Esta Aula',
      tip: 'Dica: Todas as ferramentas estão integradas na plataforma. Use-as para criar material sobre os conceitos desta aula!'
    }
  }

  const relevantTools = getRelevantAITools()
  const theme = getTheme()

  return (
    <Card className={`bg-gradient-to-r ${theme.gradient} ${theme.border}`}>
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${theme.titleColor}`}>
          {theme.icon} {theme.title}
          <Badge variant="secondary" className={theme.badgeColor}>INTEGRADO</Badge>
        </CardTitle>
        <CardDescription className={theme.descColor}>
          Ferramentas de IA especializadas para praticar os conceitos desta aula
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relevantTools.map((tool, index) => (
            <Card key={tool.id} className="hover:shadow-md transition-all cursor-pointer" onClick={() => router.push('/workspace')}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{tool.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-900">{tool.name}</h4>
                    {tool.context && (
                      <p className="text-xs text-gray-600">Usado em: {tool.context}</p>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  {tool.description}
                </p>
                <Button size="sm" className={`w-full ${tool.color}`}>
                  Usar Agora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-white/50 rounded-lg">
          <p className={`text-xs ${theme.tipColor} text-center`}>
            💡 <strong>{theme.tip.split(':')[0]}:</strong> {theme.tip.split(':')[1]}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}