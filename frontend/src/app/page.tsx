import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Users, Award, ArrowRight, Play, Star, Globe } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold teach-gradient bg-clip-text text-transparent">
                TEACH
              </div>
              <span className="text-sm text-muted-foreground hidden sm:block">
                Technology Education for Advanced Classroom Help
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link href="/register">
                <Button>Começar Agora</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
              <Star className="w-4 h-4 mr-1" />
              Primeira plataforma de IA para educadores no Brasil
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
            Transforme a educação com{' '}
            <span className="teach-gradient bg-clip-text text-transparent">
              Inteligência Artificial
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Capacite 2,3 milhões de professores brasileiros com ferramentas de IA. 
            Torne-se um facilitador de aprendizagem e prepare seus alunos para o futuro.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-6">
                <Play className="w-5 h-5 mr-2" />
                Começar Jornada Gratuita
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <BookOpen className="w-5 h-5 mr-2" />
                Ver Demonstração
              </Button>
            </Link>
          </div>

          <div className="mt-12 text-sm text-gray-500">
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                1000+ professores na versão beta
              </div>
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-1" />
                Disponível em todo Brasil
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-1" />
                Certificação oficial
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              4 Módulos Progressivos de Aprendizagem
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Da iniciação ao domínio completo: uma jornada estruturada para transformar sua prática educacional
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Starter</CardTitle>
                <CardDescription>
                  Fundamentos de IA e primeiras ferramentas essenciais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-gray-600">
                  <li>• ChatGPT e Claude</li>
                  <li>• Prompting básico</li>
                  <li>• Ética em IA</li>
                  <li>• Seu novo papel</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Survivor</CardTitle>
                <CardDescription>
                  Ferramentas específicas por matéria e faixa etária
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-gray-600">
                  <li>• Ferramentas por disciplina</li>
                  <li>• Criação de conteúdo</li>
                  <li>• Adaptação por idade</li>
                  <li>• Projetos práticos</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Explorer</CardTitle>
                <CardDescription>
                  Automação avançada e construção de comunidades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-gray-600">
                  <li>• Automação com IA</li>
                  <li>• Plataformas avançadas</li>
                  <li>• Avaliação personalizada</li>
                  <li>• Liderança educacional</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="text-xl">Expert</CardTitle>
                <CardDescription>
                  Criação de apps e liderança em transformação
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-gray-600">
                  <li>• Desenvolvimento de apps</li>
                  <li>• Design curricular</li>
                  <li>• Formação de professores</li>
                  <li>• Inovação educacional</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Lidere a Revolução Educacional no Brasil
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se aos primeiros 1.000 professores que irão transformar a educação brasileira. 
            Início do programa piloto: Dezembro 2025.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Inscrever-se Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600">
                Saiba Mais
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">TEACH</div>
              <p className="text-gray-400 text-sm">
                Transformando a educação brasileira através da inteligência artificial.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Plataforma</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/modules" className="hover:text-white">Módulos</Link></li>
                <li><Link href="/tools" className="hover:text-white">Ferramentas IA</Link></li>
                <li><Link href="/community" className="hover:text-white">Comunidade</Link></li>
                <li><Link href="/certificates" className="hover:text-white">Certificações</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/help" className="hover:text-white">Central de Ajuda</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contato</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/webinars" className="hover:text-white">Webinars</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacidade</Link></li>
                <li><Link href="/terms" className="hover:text-white">Termos de Uso</Link></li>
                <li><Link href="/cookies" className="hover:text-white">Cookies</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 TEACH Platform. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
