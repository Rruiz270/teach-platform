'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Crown, 
  Check, 
  Sparkles, 
  Users, 
  Building, 
  Star,
  Zap,
  Trophy,
  Target,
  ArrowRight,
  Gift,
  Clock
} from 'lucide-react'

interface SubscriptionPlan {
  id: string
  name: string
  price: number
  period: string
  description: string
  features: string[]
  limits: {
    textTokens: number
    imageGenerations: number
    videoMinutes: number
  }
  badge?: string
  popular?: boolean
  target: string
}

interface SubscriptionUpgradeProps {
  userType: 'course-graduate' | 'free-user' | 'current-subscriber'
  currentPlan?: string
  onSubscribe: (planId: string) => void
  onContinueFree?: () => void
}

export default function SubscriptionUpgrade({ 
  userType, 
  currentPlan, 
  onSubscribe, 
  onContinueFree 
}: SubscriptionUpgradeProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Gratuito',
      price: 0,
      period: 'para sempre',
      description: 'Acesso limitado para experimentar a plataforma',
      features: [
        'Acesso ao curso completo de IA',
        'Exercícios práticos básicos',
        'Fórum da comunidade',
        'Certificado de conclusão'
      ],
      limits: {
        textTokens: 10000,
        imageGenerations: 3,
        videoMinutes: 0
      },
      target: 'Professores iniciantes'
    },
    {
      id: 'individual',
      name: 'Individual',
      price: 29.90,
      period: 'mês',
      description: 'Ideal para professores que querem usar IA no dia a dia',
      features: [
        'Todas as ferramentas de IA',
        'Criação ilimitada de aulas',
        'Geração de imagens educacionais',
        'Assessments personalizados',
        'Suporte prioritário',
        'Biblioteca de templates'
      ],
      limits: {
        textTokens: 100000,
        imageGenerations: 50,
        videoMinutes: 5
      },
      popular: true,
      target: 'Professor individual'
    },
    {
      id: 'school',
      name: 'Escola',
      price: 199.90,
      period: 'mês',
      description: 'Para equipes e instituições educacionais',
      features: [
        'Até 20 professores',
        'Ferramentas colaborativas',
        'Dashboard administrativo',
        'Relatórios de uso',
        'Treinamento da equipe',
        'API para integração',
        'Suporte dedicado'
      ],
      limits: {
        textTokens: 500000,
        imageGenerations: 200,
        videoMinutes: 30
      },
      badge: 'Mais Popular',
      target: 'Escolas e coordenadores'
    },
    {
      id: 'government',
      name: 'Governo',
      price: 999.90,
      period: 'mês',
      description: 'Solução escalável para redes públicas de ensino',
      features: [
        'Usuários ilimitados',
        'Implementação personalizada',
        'Conformidade LGPD',
        'Relatórios executivos',
        'Treinamento especializado',
        'Suporte 24/7',
        'Consultoria pedagógica'
      ],
      limits: {
        textTokens: 0, // unlimited
        imageGenerations: 0, // unlimited
        videoMinutes: 0 // unlimited
      },
      target: 'Secretarias de Educação'
    }
  ]

  const handleSubscribe = async (planId: string) => {
    setIsProcessing(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      onSubscribe(planId)
    } catch (error) {
      console.error('Erro ao processar assinatura:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const getHeaderContent = () => {
    switch (userType) {
      case 'course-graduate':
        return {
          title: '🎓 Parabéns! Você concluiu o curso!',
          subtitle: 'Agora você pode continuar usando nossa plataforma para criar conteúdo incrível com IA',
          highlight: 'Escolha seu plano para continuar criando com IA'
        }
      case 'free-user':
        return {
          title: '🚀 Desbloqueie todo o poder da IA na educação',
          subtitle: 'Upgrade para criar conteúdo ilimitado e transformar suas aulas',
          highlight: 'Planos flexíveis para cada necessidade'
        }
      case 'current-subscriber':
        return {
          title: '⚡ Upgrade seu plano atual',
          subtitle: 'Acelere ainda mais sua produtividade com mais recursos',
          highlight: 'Planos avançados para maior produtividade'
        }
      default:
        return {
          title: 'Escolha seu plano',
          subtitle: 'Acesso completo às ferramentas de IA educacional',
          highlight: 'Planos para todos os perfis'
        }
    }
  }

  const headerContent = getHeaderContent()

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {headerContent.title}
        </h1>
        <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
          {headerContent.subtitle}
        </p>
        
        {userType === 'course-graduate' && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Trophy className="w-6 h-6 text-yellow-600" />
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                GRADUADO
              </Badge>
            </div>
            <p className="text-yellow-800 font-medium mb-2">
              🎉 Você dominou os fundamentos da IA na educação!
            </p>
            <p className="text-yellow-700 text-sm">
              Agora é hora de colocar em prática tudo que aprendeu. Continue sua jornada criando 
              conteúdo real para suas aulas com nossa plataforma profissional.
            </p>
          </div>
        )}
        
        <Badge variant="outline" className="text-lg px-4 py-2">
          {headerContent.highlight}
        </Badge>
      </div>

      {/* Special Offer for Course Graduates */}
      {userType === 'course-graduate' && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gift className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-bold text-green-900">Oferta Especial de Graduação!</h3>
            </div>
            <div className="text-center">
              <p className="text-green-800 text-lg mb-4">
                <strong>50% OFF</strong> no primeiro mês de qualquer plano pago
              </p>
              <div className="flex items-center justify-center gap-2 text-green-700">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Oferta válida por 7 dias após a conclusão do curso</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {subscriptionPlans.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative transition-all duration-200 ${
              plan.popular ? 'ring-2 ring-blue-500 shadow-lg scale-105' : 'hover:shadow-lg'
            } ${selectedPlan === plan.id ? 'ring-2 ring-purple-500' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white px-3 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Mais Popular
                </Badge>
              </div>
            )}
            
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 px-3 py-1">
                  {plan.badge}
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <div className="mb-4">
                {plan.id === 'free' && <Sparkles className="w-12 h-12 text-gray-500 mx-auto" />}
                {plan.id === 'individual' && <Zap className="w-12 h-12 text-blue-500 mx-auto" />}
                {plan.id === 'school' && <Users className="w-12 h-12 text-purple-500 mx-auto" />}
                {plan.id === 'government' && <Building className="w-12 h-12 text-green-500 mx-auto" />}
              </div>
              
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <div className="text-sm text-gray-600 mb-4">{plan.target}</div>
              
              <div className="text-center">
                <span className="text-4xl font-bold text-gray-900">
                  R$ {plan.price === 0 ? '0' : plan.price.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-gray-600">/{plan.period}</span>
              </div>
              
              {userType === 'course-graduate' && plan.id !== 'free' && (
                <div className="text-sm text-green-600 font-medium">
                  <s>R$ {(plan.price * 2).toFixed(2).replace('.', ',')}</s> 50% OFF primeiro mês
                </div>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              <CardDescription className="text-center">
                {plan.description}
              </CardDescription>

              {/* Usage Limits */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Limites Mensais:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Tokens de Texto:</span>
                    <span className="font-medium">
                      {plan.limits.textTokens === 0 ? 'Ilimitado' : plan.limits.textTokens.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Imagens IA:</span>
                    <span className="font-medium">
                      {plan.limits.imageGenerations === 0 ? 'Ilimitado' : plan.limits.imageGenerations}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vídeos IA:</span>
                    <span className="font-medium">
                      {plan.limits.videoMinutes === 0 ? 'Ilimitado' : `${plan.limits.videoMinutes} min`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Incluso:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <Button
                className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                variant={plan.id === 'free' ? 'outline' : 'default'}
                disabled={isProcessing || currentPlan === plan.id}
                onClick={() => {
                  if (plan.id === 'free' && onContinueFree) {
                    onContinueFree()
                  } else {
                    handleSubscribe(plan.id)
                  }
                }}
              >
                {isProcessing ? (
                  'Processando...'
                ) : currentPlan === plan.id ? (
                  'Plano Atual'
                ) : plan.id === 'free' ? (
                  'Continuar Gratuito'
                ) : (
                  <>
                    Escolher {plan.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Benefits Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Por que escolher a plataforma TEACH?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Focado na Educação</h4>
              <p className="text-gray-600 text-sm">
                Todas as ferramentas são otimizadas especificamente para o contexto educacional brasileiro
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Tudo Integrado</h4>
              <p className="text-gray-600 text-sm">
                Não pule entre diferentes aplicativos. Tudo que você precisa em uma única plataforma
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Suporte Completo</h4>
              <p className="text-gray-600 text-sm">
                Da aprendizagem inicial até o domínio avançado, estamos com você em cada passo
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ or Additional Info */}
      <div className="text-center mt-8 text-sm text-gray-600">
        <p>✅ Cancele a qualquer momento • 🔒 Pagamento seguro • 📞 Suporte em português</p>
      </div>
    </div>
  )
}