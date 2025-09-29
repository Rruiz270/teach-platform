'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ArrowLeft, MessageCircle, ThumbsUp, Clock, Users, Plus } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function ForumPage() {
  const { user, isAuthenticated, logout, isLoading } = useAuth()
  const router = useRouter()

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

  const forumPosts = [
    {
      id: 1,
      title: 'Como usar ChatGPT para criar planos de aula?',
      excerpt: 'Gostaria de compartilhar algumas estratégias que tenho usado...',
      author: 'Maria Silva',
      replies: 12,
      likes: 8,
      timeAgo: '2 horas atrás',
      category: 'Dicas e Estratégias'
    },
    {
      id: 2,
      title: 'Integração de IA no ensino de matemática',
      excerpt: 'Alguém já testou ferramentas de IA para ensinar equações?',
      author: 'João Santos',
      replies: 7,
      likes: 5,
      timeAgo: '4 horas atrás',
      category: 'Matemática'
    },
    {
      id: 3,
      title: 'IA para correção automática de redações',
      excerpt: 'Descobri uma ferramenta incrível para feedback de texto...',
      author: 'Ana Costa',
      replies: 15,
      likes: 12,
      timeAgo: '1 dia atrás',
      category: 'Português'
    },
    {
      id: 4,
      title: 'Criando exercícios personalizados com IA',
      excerpt: 'Como adaptar o conteúdo para diferentes níveis de aprendizado',
      author: 'Carlos Oliveira',
      replies: 9,
      likes: 6,
      timeAgo: '2 dias atrás',
      category: 'Personalização'
    }
  ]

  const categories = [
    'Todas as Categorias',
    'Dicas e Estratégias',
    'Matemática',
    'Português',
    'Ciências',
    'História',
    'Geografia',
    'Personalização'
  ]

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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Fórum da Comunidade</h2>
            <p className="text-lg text-gray-600">
              Conecte-se com outros educadores e compartilhe experiências sobre IA
            </p>
          </div>
          <Button className="teach-gradient text-white">
            <Plus className="mr-2 h-4 w-4" />
            Nova Discussão
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Categorias
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? "default" : "ghost"}
                    className="w-full justify-start text-sm"
                    size="sm"
                  >
                    {category}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Membros Ativos</span>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Discussões</span>
                  <span className="font-semibold">342</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Respostas</span>
                  <span className="font-semibold">2,156</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Forum Posts */}
          <div className="lg:col-span-3 space-y-4">
            {forumPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarFallback>
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {post.timeAgo}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {post.replies} respostas
                          </span>
                          <span className="flex items-center">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            {post.likes} curtidas
                          </span>
                        </div>
                        
                        <span className="text-sm font-medium text-gray-700">
                          {post.author}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Load More */}
            <div className="text-center pt-6">
              <Button variant="outline" className="px-8">
                Carregar Mais Discussões
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}