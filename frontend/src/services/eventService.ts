import Cookies from 'js-cookie'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

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
  instructorId?: string
  moduleId?: string
  lessonId?: string
  tags: string[]
  requirements?: string
  materials: string[]
}

interface CreateEventRequest {
  title: string
  description?: string
  startDate: string
  endDate: string
  type: Event['type']
  location?: string
  meetingUrl?: string
  maxParticipants?: number
  instructorId?: string
  moduleId?: string
  lessonId?: string
  tags?: string[]
  requirements?: string
  materials?: string[]
  isPublished?: boolean
}

interface EventsResponse {
  success: boolean
  data: {
    events: Event[]
    pagination: {
      page: number
      limit: number
      total: number
      pages: number
    }
  }
}

interface EventResponse {
  success: boolean
  data: Event
}

interface EventFilters {
  type?: string
  startDate?: string
  endDate?: string
  instructor?: string
  module?: string
  published?: boolean
  page?: number
  limit?: number
}

class EventService {
  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = Cookies.get('accessToken')
    
    // Handle both cases: API_BASE_URL with or without /api/v1
    const baseUrl = API_BASE_URL.endsWith('/api/v1') ? API_BASE_URL : `${API_BASE_URL}/api/v1`
    
    const response = await fetch(`${baseUrl}/events${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      }
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }))
      throw new Error(error.message || 'Event service request failed')
    }

    return response.json()
  }

  async getEvents(filters: EventFilters = {}): Promise<EventsResponse> {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString())
      }
    })

    const queryString = params.toString()
    const endpoint = queryString ? `?${queryString}` : ''
    
    return this.makeRequest<EventsResponse>(endpoint)
  }

  async getEvent(id: string): Promise<EventResponse> {
    return this.makeRequest<EventResponse>(`/${id}`)
  }

  async createEvent(event: CreateEventRequest): Promise<EventResponse> {
    return this.makeRequest<EventResponse>('', {
      method: 'POST',
      body: JSON.stringify(event)
    })
  }

  async updateEvent(id: string, event: Partial<CreateEventRequest>): Promise<EventResponse> {
    return this.makeRequest<EventResponse>(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(event)
    })
  }

  async deleteEvent(id: string): Promise<{ success: boolean }> {
    return this.makeRequest<{ success: boolean }>(`/${id}`, {
      method: 'DELETE'
    })
  }

  async registerForEvent(eventId: string): Promise<{ success: boolean; data: any }> {
    return this.makeRequest<{ success: boolean; data: any }>(`/${eventId}/register`, {
      method: 'POST'
    })
  }

  async unregisterFromEvent(eventId: string): Promise<{ success: boolean }> {
    return this.makeRequest<{ success: boolean }>(`/${eventId}/register`, {
      method: 'DELETE'
    })
  }

  async getMyRegistrations(filters: { status?: string; upcoming?: boolean } = {}): Promise<{
    success: boolean
    data: Array<{
      id: string
      status: string
      registeredAt: string
      event: Event
    }>
  }> {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString())
      }
    })

    const queryString = params.toString()
    const endpoint = `/my/registrations${queryString ? `?${queryString}` : ''}`
    
    return this.makeRequest<{
      success: boolean
      data: Array<{
        id: string
        status: string
        registeredAt: string
        event: Event
      }>
    }>(endpoint)
  }

  // Helper methods for formatting and validation
  formatEventForDisplay(event: Event) {
    return {
      ...event,
      formattedStartDate: new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(event.startDate)),
      formattedEndDate: new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(event.endDate)),
      isUpcoming: new Date(event.startDate) > new Date(),
      isPastEvent: new Date(event.endDate) < new Date(),
      isEventFull: event.maxParticipants ? event.currentParticipants >= event.maxParticipants : false
    }
  }

  validateEventData(event: CreateEventRequest): string[] {
    const errors: string[] = []
    
    if (!event.title?.trim()) {
      errors.push('Título é obrigatório')
    }
    
    if (!event.startDate) {
      errors.push('Data de início é obrigatória')
    }
    
    if (!event.endDate) {
      errors.push('Data de fim é obrigatória')
    }
    
    if (event.startDate && event.endDate) {
      const start = new Date(event.startDate)
      const end = new Date(event.endDate)
      
      if (start >= end) {
        errors.push('Data de fim deve ser posterior à data de início')
      }
      
      if (start < new Date()) {
        errors.push('Data de início deve ser no futuro')
      }
    }
    
    if (event.maxParticipants && event.maxParticipants < 1) {
      errors.push('Número máximo de participantes deve ser positivo')
    }
    
    if (event.meetingUrl && !this.isValidUrl(event.meetingUrl)) {
      errors.push('URL da reunião deve ser válida')
    }
    
    return errors
  }
  
  private isValidUrl(string: string): boolean {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  getEventTypeOptions() {
    return [
      { value: 'LIVE_CLASS', label: 'Aula Ao Vivo' },
      { value: 'WORKSHOP', label: 'Workshop' },
      { value: 'WEBINAR', label: 'Webinar' },
      { value: 'MENTORING', label: 'Mentoria' },
      { value: 'Q_AND_A', label: 'Q&A' },
      { value: 'CONFERENCE', label: 'Conferência' }
    ]
  }

  getEventTypeColor(type: Event['type']) {
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
}

export const eventService = new EventService()
export type { Event, CreateEventRequest, EventFilters, EventsResponse, EventResponse }