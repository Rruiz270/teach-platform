'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Video, 
  Plus,
  ChevronLeft,
  ChevronRight,
  Eye,
  UserPlus,
  UserMinus,
  Settings,
  Download,
  Share2,
  BookOpen,
  Brain
} from 'lucide-react'

interface Event {
  id: string
  title: string
  description?: string
  startDate: string
  endDate: string
  type: 'LIVE_CLASS' | 'WORKSHOP' | 'WEBINAR' | 'MENTORING' | 'Q_AND_A' | 'CONFERENCE'
  location?: string
  meetingUrl?: string
  maxParticipants?: number
  currentParticipants: number
  isPublished: boolean
  instructor?: {
    id: string
    profile?: {
      name: string
      photoUrl?: string
    }
  }
  module?: {
    id: string
    title: string
    type: string
  }
  registrations?: Array<{
    id: string
    status: string
    registeredAt: string
  }>
  isRegistered?: boolean
}

interface CalendarProps {
  userRole?: 'TEACHER' | 'ADMIN' | 'AI_MAESTRO' | 'SUPER_ADMIN'
}

export default function Calendar({ userRole = 'TEACHER' }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeView, setActiveView] = useState<'month' | 'week' | 'list'>('month')
  const [filters, setFilters] = useState({
    type: 'all',
    instructor: 'all',
    module: 'all'
  })

  // Mock data - in production this would come from API
  useEffect(() => {
    const mockEvents: Event[] = [
      {
        id: '1',
        title: 'Aula Ao Vivo com AI MAESTRO',
        description: 'Aula inaugural sobre IA na educação com o AI MAESTRO',
        startDate: '2024-12-14T19:00:00Z',
        endDate: '2024-12-14T20:30:00Z',
        type: 'LIVE_CLASS',
        meetingUrl: 'https://meet.google.com/abc-defg-hij',
        maxParticipants: 50,
        currentParticipants: 23,
        isPublished: true,
        instructor: {
          id: 'maestro1',
          profile: {
            name: 'AI MAESTRO',
            photoUrl: undefined
          }
        },
        module: {
          id: 'starter',
          title: 'Starter - Fundamentos de IA',
          type: 'STARTER'
        },
        isRegistered: true
      },
      {
        id: '2',
        title: 'Workshop: Criando Prompts Eficazes',
        description: 'Workshop prático sobre criação de prompts para ChatGPT na educação',
        startDate: '2024-12-16T20:00:00Z',
        endDate: '2024-12-16T21:30:00Z',
        type: 'WORKSHOP',
        meetingUrl: 'https://meet.google.com/xyz-defg-hij',
        maxParticipants: 30,
        currentParticipants: 18,
        isPublished: true,
        instructor: {
          id: 'maestro2',
          profile: {
            name: 'Dr. Ana Silva',
            photoUrl: undefined
          }
        },
        module: {
          id: 'survivor',
          title: 'Survivor - IA na Prática',
          type: 'SURVIVOR'
        },
        isRegistered: false
      },
      {
        id: '3',
        title: 'Mentoria Individual: IA na Avaliação',
        description: 'Sessão de mentoria personalizada sobre uso de IA em avaliação',
        startDate: '2024-12-18T15:00:00Z',
        endDate: '2024-12-18T16:00:00Z',
        type: 'MENTORING',
        meetingUrl: 'https://meet.google.com/men-toria-123',
        maxParticipants: 1,
        currentParticipants: 0,
        isPublished: true,
        instructor: {
          id: 'maestro3',
          profile: {
            name: 'Prof. Carlos Santos',
            photoUrl: undefined
          }
        },
        isRegistered: false
      }
    ]

    setEvents(mockEvents)
    setFilteredEvents(mockEvents)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    let filtered = events

    if (filters.type !== 'all') {
      filtered = filtered.filter(event => event.type === filters.type)
    }

    if (filters.instructor !== 'all') {
      filtered = filtered.filter(event => event.instructor?.id === filters.instructor)
    }

    if (filters.module !== 'all') {
      filtered = filtered.filter(event => event.module?.id === filters.module)
    }

    setFilteredEvents(filtered)
  }, [events, filters])

  const getEventTypeColor = (type: Event['type']) => {
    const colors = {
      LIVE_CLASS: 'bg-blue-100 text-blue-800 border-blue-200',
      WORKSHOP: 'bg-green-100 text-green-800 border-green-200',
      WEBINAR: 'bg-purple-100 text-purple-800 border-purple-200',
      MENTORING: 'bg-orange-100 text-orange-800 border-orange-200',
      Q_AND_A: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      CONFERENCE: 'bg-red-100 text-red-800 border-red-200'
    }
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const getEventTypeLabel = (type: Event['type']) => {
    const labels = {
      LIVE_CLASS: 'Aula Ao Vivo',
      WORKSHOP: 'Workshop',
      WEBINAR: 'Webinar',
      MENTORING: 'Mentoria',
      Q_AND_A: 'Q&A',
      CONFERENCE: 'Conferência'
    }
    return labels[type] || type
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const handleRegister = (eventId: string) => {
    // In production, this would make an API call
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { 
            ...event, 
            isRegistered: true, 
            currentParticipants: event.currentParticipants + 1 
          }
        : event
    ))
  }

  const handleUnregister = (eventId: string) => {
    // In production, this would make an API call
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { 
            ...event, 
            isRegistered: false, 
            currentParticipants: Math.max(0, event.currentParticipants - 1) 
          }
        : event
    ))
  }

  const canCreateEvents = ['ADMIN', 'AI_MAESTRO', 'SUPER_ADMIN'].includes(userRole)

  const upcomingEvents = filteredEvents
    .filter(event => new Date(event.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 5)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendário de Eventos</h1>
          <p className="text-gray-600">Aulas ao vivo, workshops e mentorias</p>
        </div>
        
        {canCreateEvents && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Criar Evento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Criar Novo Evento</DialogTitle>
                <DialogDescription>
                  Crie uma nova aula ao vivo, workshop ou sessão de mentoria
                </DialogDescription>
              </DialogHeader>
              <CreateEventForm onClose={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="type-filter">Tipo</Label>
              <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="LIVE_CLASS">Aula Ao Vivo</SelectItem>
                  <SelectItem value="WORKSHOP">Workshop</SelectItem>
                  <SelectItem value="WEBINAR">Webinar</SelectItem>
                  <SelectItem value="MENTORING">Mentoria</SelectItem>
                  <SelectItem value="Q_AND_A">Q&A</SelectItem>
                  <SelectItem value="CONFERENCE">Conferência</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Views */}
      <Tabs value={activeView} onValueChange={(value: any) => setActiveView(value)}>
        <TabsList>
          <TabsTrigger value="month">Mês</TabsTrigger>
          <TabsTrigger value="week">Semana</TabsTrigger>
          <TabsTrigger value="list">Lista</TabsTrigger>
        </TabsList>

        <TabsContent value="month" className="space-y-4">
          <MonthView events={filteredEvents} onEventClick={setSelectedEvent} />
        </TabsContent>

        <TabsContent value="week" className="space-y-4">
          <WeekView events={filteredEvents} onEventClick={setSelectedEvent} />
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <div className="grid gap-4">
            {filteredEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onRegister={handleRegister}
                onUnregister={handleUnregister}
                onViewDetails={setSelectedEvent}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Upcoming Events Sidebar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Próximos Eventos</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingEvents.map((event) => (
            <div 
              key={event.id} 
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type).split(' ')[0]}`} />
              <div className="flex-1">
                <p className="font-medium text-sm">{event.title}</p>
                <p className="text-xs text-gray-600">{formatDate(event.startDate)}</p>
              </div>
              {event.isRegistered && (
                <Badge variant="secondary" className="text-xs">Inscrito</Badge>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetailsModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)}
          onRegister={handleRegister}
          onUnregister={handleUnregister}
        />
      )}
    </div>
  )
}

// Event Card Component
function EventCard({ 
  event, 
  onRegister, 
  onUnregister, 
  onViewDetails 
}: { 
  event: Event
  onRegister: (id: string) => void
  onUnregister: (id: string) => void
  onViewDetails: (event: Event) => void
}) {
  const isEventFull = event.maxParticipants ? event.currentParticipants >= event.maxParticipants : false
  const isPastEvent = new Date(event.endDate) < new Date()

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className={getEventTypeColor(event.type)}>
                {getEventTypeLabel(event.type)}
              </Badge>
              {event.module && (
                <Badge variant="outline">
                  {event.module.title}
                </Badge>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
            {event.description && (
              <p className="text-gray-600 mt-1">{event.description}</p>
            )}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{formatDate(event.startDate)} - {formatDate(event.endDate)}</span>
          </div>
          
          {event.instructor && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Brain className="h-4 w-4" />
              <span>{event.instructor.profile?.name}</span>
            </div>
          )}

          {event.maxParticipants && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>{event.currentParticipants}/{event.maxParticipants} participantes</span>
            </div>
          )}

          {event.meetingUrl && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Video className="h-4 w-4" />
              <span>Online</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewDetails(event)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Ver Detalhes
          </Button>

          {!isPastEvent && (
            <>
              {event.isRegistered ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onUnregister(event.id)}
                >
                  <UserMinus className="h-4 w-4 mr-2" />
                  Cancelar Inscrição
                </Button>
              ) : (
                <Button 
                  size="sm"
                  disabled={isEventFull}
                  onClick={() => onRegister(event.id)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  {isEventFull ? 'Lotado' : 'Inscrever-se'}
                </Button>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Month View Component (simplified)
function MonthView({ events, onEventClick }: { events: Event[], onEventClick: (event: Event) => void }) {
  return (
    <div className="grid grid-cols-7 gap-1 bg-white border rounded-lg p-4">
      {/* Days of week headers */}
      {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
        <div key={day} className="p-2 text-center font-medium text-gray-600 border-b">
          {day}
        </div>
      ))}
      
      {/* Calendar days - simplified for demo */}
      {Array.from({ length: 35 }, (_, i) => (
        <div key={i} className="h-24 p-1 border border-gray-100">
          <div className="text-sm text-gray-600">{((i % 30) + 1)}</div>
          {/* Events would be rendered here based on date */}
        </div>
      ))}
    </div>
  )
}

// Week View Component (simplified)
function WeekView({ events, onEventClick }: { events: Event[], onEventClick: (event: Event) => void }) {
  return (
    <div className="space-y-4">
      <p className="text-gray-600">Vista semanal em desenvolvimento</p>
      <div className="grid gap-4">
        {events.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            onRegister={() => {}}
            onUnregister={() => {}}
            onViewDetails={onEventClick}
          />
        ))}
      </div>
    </div>
  )
}

// Create Event Form Component
function CreateEventForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input id="title" placeholder="Ex: Aula sobre IA na Educação" />
        </div>
        <div>
          <Label htmlFor="type">Tipo</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LIVE_CLASS">Aula Ao Vivo</SelectItem>
              <SelectItem value="WORKSHOP">Workshop</SelectItem>
              <SelectItem value="WEBINAR">Webinar</SelectItem>
              <SelectItem value="MENTORING">Mentoria</SelectItem>
              <SelectItem value="Q_AND_A">Q&A</SelectItem>
              <SelectItem value="CONFERENCE">Conferência</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea id="description" placeholder="Descreva o evento..." />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Data/Hora Início</Label>
          <Input id="startDate" type="datetime-local" />
        </div>
        <div>
          <Label htmlFor="endDate">Data/Hora Fim</Label>
          <Input id="endDate" type="datetime-local" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="meetingUrl">URL da Reunião</Label>
          <Input id="meetingUrl" placeholder="https://meet.google.com/..." />
        </div>
        <div>
          <Label htmlFor="maxParticipants">Máximo de Participantes</Label>
          <Input id="maxParticipants" type="number" placeholder="50" />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={onClose}>
          Criar Evento
        </Button>
      </div>
    </div>
  )
}

// Event Details Modal Component
function EventDetailsModal({ 
  event, 
  onClose, 
  onRegister, 
  onUnregister 
}: { 
  event: Event
  onClose: () => void
  onRegister: (id: string) => void
  onUnregister: (id: string) => void
}) {
  const isEventFull = event.maxParticipants ? event.currentParticipants >= event.maxParticipants : false
  const isPastEvent = new Date(event.endDate) < new Date()

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <Badge className={getEventTypeColor(event.type)}>
              {getEventTypeLabel(event.type)}
            </Badge>
            {event.module && (
              <Badge variant="outline">
                {event.module.title}
              </Badge>
            )}
          </div>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>
            {event.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-medium">Data e Hora</p>
                  <p className="text-gray-600">{formatDate(event.startDate)}</p>
                  <p className="text-gray-600">até {formatDate(event.endDate)}</p>
                </div>
              </div>

              {event.instructor && (
                <div className="flex items-center space-x-2 text-sm">
                  <Brain className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">Instrutor</p>
                    <p className="text-gray-600">{event.instructor.profile?.name}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {event.maxParticipants && (
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">Participantes</p>
                    <p className="text-gray-600">{event.currentParticipants}/{event.maxParticipants}</p>
                  </div>
                </div>
              )}

              {event.meetingUrl && (
                <div className="flex items-center space-x-2 text-sm">
                  <Video className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">Local</p>
                    <p className="text-gray-600">Online</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {event.meetingUrl && event.isRegistered && !isPastEvent && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <p className="text-sm text-blue-800 mb-2">Link da reunião (disponível para inscritos):</p>
                <a 
                  href={event.meetingUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  {event.meetingUrl}
                </a>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>

            {!isPastEvent && (
              <>
                {event.isRegistered ? (
                  <div className="space-x-2">
                    {event.meetingUrl && (
                      <Button 
                        variant="outline"
                        onClick={() => window.open(event.meetingUrl, '_blank')}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Entrar na Reunião
                      </Button>
                    )}
                    <Button 
                      variant="outline"
                      onClick={() => onUnregister(event.id)}
                    >
                      <UserMinus className="h-4 w-4 mr-2" />
                      Cancelar Inscrição
                    </Button>
                  </div>
                ) : (
                  <Button 
                    disabled={isEventFull}
                    onClick={() => onRegister(event.id)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    {isEventFull ? 'Evento Lotado' : 'Inscrever-se'}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function getEventTypeColor(type: Event['type']) {
  const colors = {
    LIVE_CLASS: 'bg-blue-100 text-blue-800 border-blue-200',
    WORKSHOP: 'bg-green-100 text-green-800 border-green-200',
    WEBINAR: 'bg-purple-100 text-purple-800 border-purple-200',
    MENTORING: 'bg-orange-100 text-orange-800 border-orange-200',
    Q_AND_A: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    CONFERENCE: 'bg-red-100 text-red-800 border-red-200'
  }
  return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200'
}

function getEventTypeLabel(type: Event['type']) {
  const labels = {
    LIVE_CLASS: 'Aula Ao Vivo',
    WORKSHOP: 'Workshop',
    WEBINAR: 'Webinar',
    MENTORING: 'Mentoria',
    Q_AND_A: 'Q&A',
    CONFERENCE: 'Conferência'
  }
  return labels[type] || type
}