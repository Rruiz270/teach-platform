'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Search, BookOpen, Download, ExternalLink, Star, Filter } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function LibraryPage() {
  const { user, isAuthenticated, logout, isLoading } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

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

  // AI Tools available in platform
  const aiTools = [
    {
      id: 'chatgpt-edu',
      name: 'ChatGPT Educacional',
      description: 'IA especializada em conteúdo educacional brasileiro',
      provider: 'OpenAI',
      subjects: ['Todas as matérias'],
      features: ['Criação de aulas', 'Exercícios personalizados', 'Explicações didáticas'],
      color: 'from-green-500 to-emerald-600',
      icon: '🤖',
      available: true
    },
    {
      id: 'claude-teacher',
      name: 'Claude Professor',
      description: 'Assistente pedagógico para planejamento e avaliação',
      provider: 'Anthropic',
      subjects: ['Português', 'História', 'Geografia'],
      features: ['Análise de textos', 'Criação de provas', 'Feedback detalhado'],
      color: 'from-blue-500 to-cyan-600',
      icon: '📚',
      available: true
    },
    {
      id: 'dalle-edu',
      name: 'DALL-E Educacional',
      description: 'Geração de imagens e ilustrações para aulas',
      provider: 'OpenAI',
      subjects: ['Ciências', 'Arte', 'História'],
      features: ['Ilustrações didáticas', 'Infográficos', 'Material visual'],
      color: 'from-purple-500 to-pink-600',
      icon: '🎨',
      available: true
    },
    {
      id: 'gemini-math',
      name: 'Gemini Matemática',
      description: 'Especialista em resolução e ensino de matemática',
      provider: 'Google',
      subjects: ['Matemática', 'Física', 'Química'],
      features: ['Resolução passo-a-passo', 'Gráficos', 'Exercícios graduais'],
      color: 'from-orange-500 to-red-600',
      icon: '🔢',
      available: true
    }
  ]

  const resources = [
    {
      id: 1,
      title: 'Guia Completo: ChatGPT para Professores',
      description: 'Manual prático com 50+ prompts testados em sala de aula',
      type: 'PDF',
      category: 'Guias',
      rating: 4.8,
      downloads: 1247,
      size: '2.3 MB',
      featured: true
    },
    {
      id: 2,
      title: 'Templates de Planos de Aula com IA',
      description: 'Modelos prontos para diferentes disciplinas e níveis',
      type: 'ZIP',
      category: 'Templates',
      rating: 4.9,
      downloads: 892,
      size: '1.8 MB',
      featured: true
    },
    {
      id: 3,
      title: 'Prompts para Criação de Exercícios',
      description: 'Coleção de prompts para gerar exercícios personalizados',
      type: 'PDF',
      category: 'Prompts',
      rating: 4.7,
      downloads: 654,
      size: '1.2 MB',
      featured: false
    },
    {
      id: 4,
      title: 'IA para Avaliação Formativa',
      description: 'Estratégias para usar IA na avaliação contínua',
      type: 'PDF',
      category: 'Estratégias',
      rating: 4.6,
      downloads: 445,
      size: '1.9 MB',
      featured: false
    },
    {
      id: 5,
      title: 'Ferramentas de IA Gratuitas',
      description: 'Lista curada de 30+ ferramentas gratuitas para educação',
      type: 'Link',
      category: 'Ferramentas',
      rating: 4.8,
      downloads: 1123,
      size: 'Online',
      featured: true
    },
    {
      id: 6,
      title: 'Ética em IA na Educação',
      description: 'Diretrizes e boas práticas para uso responsável',
      type: 'PDF',
      category: 'Ética',
      rating: 4.5,
      downloads: 334,
      size: '2.1 MB',
      featured: false
    },
    {
      id: 7,
      title: 'IA para Educação Inclusiva',
      description: 'Como adaptar conteúdo para necessidades especiais',
      type: 'PDF',
      category: 'Inclusão',
      rating: 4.7,
      downloads: 567,
      size: '1.6 MB',
      featured: false
    },
    {
      id: 8,
      title: 'Projeto Final: Implementação de IA',
      description: 'Roteiro completo para implementar IA na sua escola',
      type: 'ZIP',
      category: 'Projetos',
      rating: 4.9,
      downloads: 289,
      size: '3.2 MB',
      featured: true
    }
  ]

  const categories = [
    'Todos',
    'Guias',
    'Templates',
    'Prompts',
    'Estratégias',
    'Ferramentas',
    'Ética',
    'Inclusão',
    'Projetos'
  ]

  // Filter resources by search term and category
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Handler functions
  const handleDownload = (resourceId: number, resourceTitle: string) => {
    // Simulate download
    alert(`Iniciando download: ${resourceTitle}`)
    // In a real app, this would trigger an actual download
  }

  const handleAccess = (resourceId: number, resourceTitle: string) => {
    // Simulate external link access
    alert(`Abrindo recurso: ${resourceTitle}`)
    // In a real app, this would open an external link
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Biblioteca de Recursos</h2>
          <p className="text-lg text-gray-600">
            Materiais exclusivos para potencializar seu uso de IA na educação
          </p>
        </div>

        {/* AI Tools Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            🤖 Ferramentas de IA Integradas
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">USAR AGORA</Badge>
          </h3>
          <p className="text-gray-600 mb-6">
            Acesse diretamente as IAs especializadas para educação - sem sair da plataforma
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiTools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{tool.icon}</span>
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                      Ativo
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-1">Matérias:</p>
                    <div className="flex flex-wrap gap-1">
                      {tool.subjects.slice(0, 2).map((subject, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {tool.subjects.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{tool.subjects.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-1">Recursos:</p>
                    <ul className="text-xs text-gray-600 space-y-0.5">
                      {tool.features.slice(0, 2).map((feature, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <span className="text-green-500">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className={`w-full bg-gradient-to-r ${tool.color} text-white hover:scale-105 transition-transform`}
                    onClick={() => router.push('/workspace')}
                  >
                    Usar {tool.icon}
                  </Button>
                  
                  <p className="text-xs text-center text-gray-500">
                    Powered by {tool.provider}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar recursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              variant="outline" 
              className="md:w-auto"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Resources */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recursos em Destaque</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.filter(r => r.featured).map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {resource.category}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-500 mr-1" />
                      <span className="text-xs">{resource.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-base leading-tight">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {resource.description}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{resource.type}</span>
                    <span>{resource.size}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{resource.downloads} downloads</span>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => resource.type === 'Link' ? handleAccess(resource.id, resource.title) : handleDownload(resource.id, resource.title)}
                  >
                    {resource.type === 'Link' ? (
                      <><ExternalLink className="mr-2 h-3 w-3" /> Acessar</>
                    ) : (
                      <><Download className="mr-2 h-3 w-3" /> Baixar</>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Resources */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Todos os Recursos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {resource.category}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{resource.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {resource.type}
                    </span>
                    <span>{resource.size}</span>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    {resource.downloads} downloads
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => resource.type === 'Link' ? handleAccess(resource.id, resource.title) : handleDownload(resource.id, resource.title)}
                  >
                    {resource.type === 'Link' ? (
                      <><ExternalLink className="mr-2 h-4 w-4" /> Acessar Recurso</>
                    ) : (
                      <><Download className="mr-2 h-4 w-4" /> Baixar Recurso</>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}