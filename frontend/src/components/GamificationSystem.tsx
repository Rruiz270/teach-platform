'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Trophy, 
  Star, 
  Medal, 
  Award, 
  Target,
  Flame,
  Crown,
  Zap,
  Users,
  Calendar,
  CheckCircle,
  TrendingUp,
  Gift,
  Sparkles,
  MapPin,
  Clock,
  Brain,
  BookOpen,
  MessageSquare,
  Share2,
  Coins,
  HeartHandshake
} from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: 'learning' | 'social' | 'creativity' | 'consistency' | 'mastery'
  points: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  progress: number
  maxProgress: number
  unlocked: boolean
  unlockedAt?: Date
  requirements: string[]
}

interface Challenge {
  id: string
  title: string
  description: string
  type: 'daily' | 'weekly' | 'monthly' | 'special'
  duration: string
  reward: {
    points: number
    badges?: string[]
    title?: string
  }
  progress: number
  maxProgress: number
  deadline: Date
  participants: number
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
}

interface UserStats {
  level: number
  experience: number
  experienceToNextLevel: number
  totalPoints: number
  rank: string
  streak: {
    current: number
    longest: number
    lastActivity: Date
  }
  achievements: Achievement[]
  completedChallenges: number
  leaderboardPosition: number
  studyTime: number // minutes this week
  lessonsCompleted: number
}

interface LeaderboardEntry {
  rank: number
  name: string
  points: number
  level: number
  school?: string
  region?: string
  avatar?: string
  change: number // position change from last week
}

interface GamificationSystemProps {
  user: {
    id: string
    name: string
    school?: string
    region?: string
  }
}

export default function GamificationSystem({ user }: GamificationSystemProps) {
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [celebrationVisible, setCelebrationVisible] = useState(false)
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null)

  useEffect(() => {
    loadUserStats()
    loadChallenges()
    loadLeaderboard()
  }, [user.id])

  const loadUserStats = () => {
    // Mock user stats - in production this would come from API
    const mockStats: UserStats = {
      level: 7,
      experience: 2350,
      experienceToNextLevel: 650,
      totalPoints: 4780,
      rank: 'AI Educator',
      streak: {
        current: 12,
        longest: 28,
        lastActivity: new Date()
      },
      achievements: generateMockAchievements(),
      completedChallenges: 15,
      leaderboardPosition: 23,
      studyTime: 185,
      lessonsCompleted: 24
    }
    setUserStats(mockStats)
  }

  const generateMockAchievements = (): Achievement[] => [
    {
      id: '1',
      title: 'Primeiro Passo',
      description: 'Complete sua primeira aula sobre IA',
      icon: '🎯',
      category: 'learning',
      points: 50,
      rarity: 'common',
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      unlockedAt: new Date('2024-12-01'),
      requirements: ['Complete 1 aula']
    },
    {
      id: '2',
      title: 'Streaker',
      description: 'Mantenha uma sequência de 7 dias consecutivos',
      icon: '🔥',
      category: 'consistency',
      points: 200,
      rarity: 'rare',
      progress: 7,
      maxProgress: 7,
      unlocked: true,
      unlockedAt: new Date('2024-12-08'),
      requirements: ['7 dias consecutivos de atividade']
    },
    {
      id: '3',
      title: 'Mestre do ChatGPT',
      description: 'Domine todas as lições sobre ChatGPT',
      icon: '🤖',
      category: 'mastery',
      points: 500,
      rarity: 'epic',
      progress: 5,
      maxProgress: 6,
      unlocked: false,
      requirements: ['Complete módulo ChatGPT']
    },
    {
      id: '4',
      title: 'Colaborador',
      description: 'Ajude 10 colegas no fórum',
      icon: '🤝',
      category: 'social',
      points: 300,
      rarity: 'rare',
      progress: 6,
      maxProgress: 10,
      unlocked: false,
      requirements: ['Responda 10 perguntas no fórum']
    },
    {
      id: '5',
      title: 'Criativo IA',
      description: 'Crie 5 atividades únicas usando IA',
      icon: '🎨',
      category: 'creativity',
      points: 400,
      rarity: 'epic',
      progress: 3,
      maxProgress: 5,
      unlocked: false,
      requirements: ['Crie 5 atividades com IA']
    },
    {
      id: '6',
      title: 'Velocista',
      description: 'Complete 3 aulas em um dia',
      icon: '⚡',
      category: 'learning',
      points: 150,
      rarity: 'common',
      progress: 2,
      maxProgress: 3,
      unlocked: false,
      requirements: ['3 aulas em 24h']
    }
  ]

  const loadChallenges = () => {
    const mockChallenges: Challenge[] = [
      {
        id: '1',
        title: 'Desafio do Prompt Perfeito',
        description: 'Crie 3 prompts que gerem respostas úteis para suas aulas',
        type: 'weekly',
        duration: '7 dias',
        reward: {
          points: 300,
          badges: ['Prompt Master'],
          title: 'Especialista em Prompts'
        },
        progress: 1,
        maxProgress: 3,
        deadline: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        participants: 127,
        difficulty: 'medium',
        category: 'Criatividade'
      },
      {
        id: '2',
        title: 'Maratona de Aprendizagem',
        description: 'Complete 2 lições hoje',
        type: 'daily',
        duration: '24 horas',
        reward: {
          points: 100
        },
        progress: 0,
        maxProgress: 2,
        deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
        participants: 89,
        difficulty: 'easy',
        category: 'Consistência'
      },
      {
        id: '3',
        title: 'Impacto na Sala de Aula',
        description: 'Aplique IA em suas aulas e compartilhe os resultados',
        type: 'monthly',
        duration: '30 dias',
        reward: {
          points: 1000,
          badges: ['Innovator', 'Real Impact'],
          title: 'Inovador Educacional'
        },
        progress: 2,
        maxProgress: 5,
        deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        participants: 234,
        difficulty: 'hard',
        category: 'Aplicação Prática'
      },
      {
        id: '4',
        title: 'Compartilhe Conhecimento',
        description: 'Responda 3 dúvidas de colegas no fórum',
        type: 'weekly',
        duration: '7 dias',
        reward: {
          points: 200,
          badges: ['Helper']
        },
        progress: 1,
        maxProgress: 3,
        deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        participants: 156,
        difficulty: 'easy',
        category: 'Comunidade'
      }
    ]
    setChallenges(mockChallenges)
  }

  const loadLeaderboard = () => {
    const mockLeaderboard: LeaderboardEntry[] = [
      { rank: 1, name: 'Prof. Ana Silva', points: 8920, level: 12, school: 'E.E. Dom Pedro II', region: 'São Paulo', change: 0 },
      { rank: 2, name: 'Prof. Carlos Lima', points: 8450, level: 11, school: 'Col. São José', region: 'Rio de Janeiro', change: 1 },
      { rank: 3, name: 'Prof. Maria Santos', points: 7890, level: 10, school: 'E.M. Flores', region: 'Minas Gerais', change: -1 },
      { rank: 4, name: 'Prof. João Costa', points: 7234, level: 10, school: 'E.E. Machado', region: 'Bahia', change: 2 },
      { rank: 5, name: 'Prof. Lucia Oliveira', points: 6890, level: 9, school: 'Col. Brasil', region: 'Paraná', change: 0 },
      // ... user's position
      { rank: 23, name: user.name, points: 4780, level: 7, school: user.school, region: user.region, change: 3 }
    ]
    setLeaderboard(mockLeaderboard)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-300'
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getLevelTitle = (level: number) => {
    if (level >= 20) return 'Lenda da IA'
    if (level >= 15) return 'Mestre IA'
    if (level >= 10) return 'Expert IA'
    if (level >= 5) return 'Educador IA'
    return 'Aprendiz IA'
  }

  const calculateProgress = (challenge: Challenge) => {
    return (challenge.progress / challenge.maxProgress) * 100
  }

  const joinChallenge = (challengeId: string) => {
    setChallenges(prev =>
      prev.map(challenge =>
        challenge.id === challengeId
          ? { ...challenge, participants: challenge.participants + 1 }
          : challenge
      )
    )
  }

  const simulateAchievementUnlock = () => {
    const lockedAchievements = userStats?.achievements.filter(a => !a.unlocked) || []
    if (lockedAchievements.length > 0) {
      const achievement = lockedAchievements[0]
      achievement.unlocked = true
      achievement.unlockedAt = new Date()
      
      setNewAchievement(achievement)
      setCelebrationVisible(true)
      
      setTimeout(() => {
        setCelebrationVisible(false)
        setNewAchievement(null)
      }, 5000)
    }
  }

  if (!userStats) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Carregando seus dados de gamificação...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Celebration Modal */}
      {celebrationVisible && newAchievement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <Card className="max-w-md mx-4 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">{newAchievement.icon}</div>
              <h2 className="text-2xl font-bold text-yellow-800 mb-2">🎉 Parabéns!</h2>
              <h3 className="text-xl font-semibold mb-2">{newAchievement.title}</h3>
              <p className="text-gray-700 mb-4">{newAchievement.description}</p>
              <Badge className={`${getRarityColor(newAchievement.rarity)} mb-4`}>
                +{newAchievement.points} pontos
              </Badge>
              <Button onClick={() => setCelebrationVisible(false)}>
                Continuar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* User Stats Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Crown className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-blue-100">Nível {userStats.level} • {getLevelTitle(userStats.level)}</p>
                <p className="text-blue-100">#{userStats.leaderboardPosition} no ranking</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{userStats.totalPoints.toLocaleString()}</div>
              <p className="text-blue-100">pontos totais</p>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progresso para próximo nível</span>
              <span>{userStats.experience}/{userStats.experience + userStats.experienceToNextLevel} XP</span>
            </div>
            <Progress 
              value={(userStats.experience / (userStats.experience + userStats.experienceToNextLevel)) * 100} 
              className="h-3"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{userStats.streak.current}</div>
            <p className="text-sm text-gray-600">Dias seguidos</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{userStats.achievements.filter(a => a.unlocked).length}</div>
            <p className="text-sm text-gray-600">Conquistas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{userStats.completedChallenges}</div>
            <p className="text-sm text-gray-600">Desafios</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{Math.round(userStats.studyTime / 60)}h</div>
            <p className="text-sm text-gray-600">Esta semana</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="achievements">Conquistas</TabsTrigger>
          <TabsTrigger value="challenges">Desafios</TabsTrigger>
          <TabsTrigger value="leaderboard">Ranking</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Progress This Week */}
          <Card>
            <CardHeader>
              <CardTitle>Progresso desta Semana</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Aulas Completadas</span>
                    <span className="font-semibold">{userStats.lessonsCompleted}/30</span>
                  </div>
                  <Progress value={(userStats.lessonsCompleted / 30) * 100} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Tempo de Estudo</span>
                    <span className="font-semibold">{userStats.studyTime}/300 min</span>
                  </div>
                  <Progress value={(userStats.studyTime / 300) * 100} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Participação no Fórum</span>
                    <span className="font-semibold">8/15 posts</span>
                  </div>
                  <Progress value={(8 / 15) * 100} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Conquistas Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userStats.achievements
                  .filter(a => a.unlocked)
                  .slice(0, 4)
                  .map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <Badge className={getRarityColor(achievement.rarity)} size="sm">
                        +{achievement.points} pts
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Challenges */}
          <Card>
            <CardHeader>
              <CardTitle>Desafios Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {challenges.slice(0, 3).map((challenge) => (
                  <div key={challenge.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{challenge.title}</h4>
                        <p className="text-sm text-gray-600">{challenge.description}</p>
                      </div>
                      <Badge variant={
                        challenge.difficulty === 'easy' ? 'secondary' :
                        challenge.difficulty === 'medium' ? 'default' : 'destructive'
                      }>
                        {challenge.difficulty === 'easy' ? 'Fácil' :
                         challenge.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                      </Badge>
                    </div>
                    <Progress value={calculateProgress(challenge)} className="mb-2" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{challenge.progress}/{challenge.maxProgress} completo</span>
                      <span>+{challenge.reward.points} pontos</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Test Achievement Button */}
          <Card>
            <CardContent className="p-4 text-center">
              <Button onClick={simulateAchievementUnlock}>
                <Sparkles className="h-4 w-4 mr-2" />
                Testar Nova Conquista
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userStats.achievements.map((achievement) => (
              <Card key={achievement.id} className={`${achievement.unlocked ? 'bg-gradient-to-br from-yellow-50 to-orange-50' : 'opacity-60'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={`text-4xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <Badge className={getRarityColor(achievement.rarity)}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      
                      {!achievement.unlocked && (
                        <div className="space-y-2">
                          <Progress value={(achievement.progress / achievement.maxProgress) * 100} />
                          <p className="text-xs text-gray-500">
                            {achievement.progress}/{achievement.maxProgress}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-medium text-blue-600">
                          {achievement.points} pontos
                        </span>
                        {achievement.unlocked && achievement.unlockedAt && (
                          <span className="text-xs text-gray-500">
                            {achievement.unlockedAt.toLocaleDateString('pt-BR')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <Card key={challenge.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold">{challenge.title}</h3>
                        <Badge variant={
                          challenge.type === 'daily' ? 'default' :
                          challenge.type === 'weekly' ? 'secondary' :
                          challenge.type === 'monthly' ? 'destructive' : 'outline'
                        }>
                          {challenge.type === 'daily' ? 'Diário' :
                           challenge.type === 'weekly' ? 'Semanal' :
                           challenge.type === 'monthly' ? 'Mensal' : 'Especial'}
                        </Badge>
                        <Badge variant="outline">{challenge.category}</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{challenge.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>Prazo: {challenge.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>{challenge.participants} participantes</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Coins className="h-4 w-4 text-gray-500" />
                          <span>{challenge.reward.points} pontos</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge className={
                        challenge.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {challenge.difficulty === 'easy' ? 'Fácil' :
                         challenge.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progresso</span>
                        <span>{challenge.progress}/{challenge.maxProgress}</span>
                      </div>
                      <Progress value={calculateProgress(challenge)} />
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        Termina em: {challenge.deadline.toLocaleDateString('pt-BR')}
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => joinChallenge(challenge.id)}
                        disabled={challenge.progress > 0}
                      >
                        {challenge.progress > 0 ? 'Participando' : 'Participar'}
                      </Button>
                    </div>

                    {challenge.reward.badges && (
                      <div className="border-t pt-3">
                        <p className="text-sm font-medium mb-2">Recompensas:</p>
                        <div className="flex flex-wrap gap-2">
                          {challenge.reward.badges.map((badge, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                          {challenge.reward.title && (
                            <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">
                              Título: {challenge.reward.title}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ranking Nacional</CardTitle>
                <CardDescription>Top professores do Brasil</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.slice(0, 10).map((entry) => (
                    <div key={entry.rank} className={`flex items-center space-x-3 p-3 rounded-lg ${
                      entry.name === user.name ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        entry.rank === 1 ? 'bg-yellow-500 text-white' :
                        entry.rank === 2 ? 'bg-gray-400 text-white' :
                        entry.rank === 3 ? 'bg-orange-500 text-white' :
                        'bg-gray-200 text-gray-700'
                      }`}>
                        {entry.rank <= 3 ? (
                          entry.rank === 1 ? '👑' : entry.rank === 2 ? '🥈' : '🥉'
                        ) : entry.rank}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{entry.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-semibold">{entry.points.toLocaleString()}</span>
                            <div className={`flex items-center text-xs ${
                              entry.change > 0 ? 'text-green-600' :
                              entry.change < 0 ? 'text-red-600' : 'text-gray-500'
                            }`}>
                              {entry.change > 0 && '↗'}
                              {entry.change < 0 && '↘'}
                              {entry.change === 0 && '—'}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600">
                          {entry.school} • {entry.region} • Nível {entry.level}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sua Posição</CardTitle>
                <CardDescription>Acompanhe seu progresso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-blue-600">#{userStats.leaderboardPosition}</div>
                  <p className="text-gray-600">Posição atual no ranking</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600">+3</div>
                      <p className="text-gray-600">Posições esta semana</p>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-600">847</div>
                      <p className="text-gray-600">Pontos para próxima posição</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Para subir no ranking:</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Complete mais desafios semanais</li>
                      <li>• Mantenha sua sequência ativa</li>
                      <li>• Participe mais do fórum</li>
                      <li>• Aplique IA em suas aulas</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}