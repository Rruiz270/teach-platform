'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Calendar, Clock, Users, MapPin, Video, BookOpen, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
// Simplified date formatting - will enhance after dependency is installed
const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

const isDatePast = (dateString: string) => {
  try {
    return new Date(dateString) < new Date()
  } catch {
    return false
  }
}

interface LessonDate {
  id: string
  date: string
  startTime: string
  endTime: string
  maxParticipants: number
  currentParticipants: number
  availableSeats: number
  meetingUrl?: string
  location?: string
  instructorName: string
}

interface LessonSchedulingCalendarProps {
  isOpen: boolean
  onClose: () => void
  lessonTitle: string
  lessonDescription?: string
  availableDates: LessonDate[]
  userRegistrations: string[] // Array of eventIds user is registered for
  onSchedule: (dateId: string) => void
  onUnregister: (dateId: string) => void
  hasCompletedLesson: boolean
}

export default function LessonSchedulingCalendar({
  isOpen,
  onClose,
  lessonTitle,
  lessonDescription,
  availableDates,
  userRegistrations,
  onSchedule,
  onUnregister,
  hasCompletedLesson
}: LessonSchedulingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<LessonDate | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSchedule = async (dateId: string) => {
    setIsLoading(true)
    try {
      await onSchedule(dateId)
      // Close dialog after successful scheduling
      setTimeout(() => {
        onClose()
      }, 1000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnregister = async (dateId: string) => {
    setIsLoading(true)
    try {
      await onUnregister(dateId)
    } finally {
      setIsLoading(false)
    }
  }

  const getDateStatus = (date: LessonDate) => {
    const isRegistered = userRegistrations.includes(date.id)
    const isFull = date.availableSeats === 0
    const isPastDate = isDatePast(date.date)
    
    if (isPastDate) return 'past'
    if (isRegistered) return 'registered'
    if (isFull) return 'full'
    return 'available'
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'registered':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Inscrito</Badge>
      case 'full':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Lotado</Badge>
      case 'past':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Expirado</Badge>
      default:
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Disponível</Badge>
    }
  }

  // Group dates by month for better organization (simplified)
  const groupedDates = availableDates.reduce((groups, date) => {
    try {
      const month = new Date(date.date).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
      const key = `Aulas em ${month}`
      if (!groups[key]) {
        groups[key] = []
      }
      groups[key].push(date)
      return groups
    } catch {
      const key = 'Próximas Aulas'
      if (!groups[key]) {
        groups[key] = []
      }
      groups[key].push(date)
      return groups
    }
  }, {} as Record<string, LessonDate[]>)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span>Agendar Aula: {lessonTitle}</span>
            {hasCompletedLesson && (
              <Badge className="bg-green-100 text-green-800 border-green-200 ml-2">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Aula Concluída
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            {lessonDescription && (
              <p className="text-gray-600 mb-4">{lessonDescription}</p>
            )}
            Escolha uma data e horário disponível para participar desta aula ao vivo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {Object.keys(groupedDates).length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhuma data disponível
                </h3>
                <p className="text-gray-600">
                  Não há datas programadas para esta aula no momento. Verifique novamente em breve.
                </p>
              </CardContent>
            </Card>
          ) : (
            Object.entries(groupedDates).map(([week, dates]) => (
              <div key={week}>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 capitalize">
                  {week}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dates.map((date) => {
                    const status = getDateStatus(date)
                    const isRegistered = status === 'registered'
                    const canRegister = status === 'available'
                    const isFull = status === 'full'
                    const isPast = status === 'past'

                    return (
                      <Card key={date.id} className={`transition-all hover:shadow-md ${
                        isRegistered ? 'border-green-200 bg-green-50' : 
                        isFull ? 'border-red-200 bg-red-50' :
                        isPast ? 'border-gray-200 bg-gray-50' :
                        'border-blue-200 hover:border-blue-300'
                      }`}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {formatDate(date.date)}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {date.startTime} - {date.endTime}
                              </p>
                            </div>
                            {getStatusBadge(status)}
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span>{date.startTime} - {date.endTime}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Users className="h-4 w-4" />
                              <span>
                                {date.availableSeats} vagas disponíveis de {date.maxParticipants}
                              </span>
                            </div>

                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <BookOpen className="h-4 w-4" />
                              <span>Instrutor: {date.instructorName}</span>
                            </div>

                            {date.meetingUrl && (
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Video className="h-4 w-4" />
                                <span>Aula online</span>
                              </div>
                            )}

                            {date.location && (
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <MapPin className="h-4 w-4" />
                                <span>{date.location}</span>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-2">
                            {isRegistered ? (
                              <>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleUnregister(date.id)}
                                  disabled={isLoading || isPast}
                                  className="flex-1"
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Cancelar Inscrição
                                </Button>
                                {date.meetingUrl && !isPast && (
                                  <Button 
                                    size="sm" 
                                    onClick={() => window.open(date.meetingUrl, '_blank')}
                                    className="flex-1"
                                  >
                                    <Video className="h-4 w-4 mr-1" />
                                    Entrar na Aula
                                  </Button>
                                )}
                              </>
                            ) : (
                              <Button 
                                size="sm" 
                                onClick={() => handleSchedule(date.id)}
                                disabled={isLoading || !canRegister || isPast}
                                className="flex-1"
                              >
                                {isFull ? (
                                  <>
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Lotado
                                  </>
                                ) : isPast ? (
                                  <>
                                    <Clock className="h-4 w-4 mr-1" />
                                    Expirado
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle2 className="h-4 w-4 mr-1" />
                                    Inscrever-se
                                  </>
                                )}
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}