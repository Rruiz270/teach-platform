import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Cookies from 'js-cookie'
import { User } from './api'

interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: User) => void
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void
  logout: () => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user: User) => {
        set({ user, isAuthenticated: true })
      },

      setTokens: (tokens: { accessToken: string; refreshToken: string }) => {
        // Store tokens in cookies
        Cookies.set('token', tokens.accessToken, { expires: 30 })
        Cookies.set('refreshToken', tokens.refreshToken, { expires: 90 })
        
        set({
          token: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          isAuthenticated: true,
        })
      },

      logout: () => {
        // Clear cookies
        Cookies.remove('token')
        Cookies.remove('refreshToken')
        
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        })
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },
    }),
    {
      name: 'teach-auth-store',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

interface UIState {
  sidebarOpen: boolean
  currentModule: string | null
  currentLesson: string | null
  theme: 'light' | 'dark'
  setSidebarOpen: (open: boolean) => void
  setCurrentModule: (moduleId: string | null) => void
  setCurrentLesson: (lessonId: string | null) => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      currentModule: null,
      currentLesson: null,
      theme: 'light',

      setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
      setCurrentModule: (moduleId: string | null) => set({ currentModule: moduleId }),
      setCurrentLesson: (lessonId: string | null) => set({ currentLesson: lessonId }),
      setTheme: (theme: 'light' | 'dark') => set({ theme }),
    }),
    {
      name: 'teach-ui-store',
    }
  )
)

interface LearningState {
  completedLessons: string[]
  currentProgress: Record<string, number>
  badges: Array<{
    id: string
    name: string
    earnedAt: string
  }>
  bookmarkedLessons: string[]
  notes: Record<string, string>
  
  addCompletedLesson: (lessonId: string) => void
  updateProgress: (moduleId: string, progress: number) => void
  addBadge: (badge: { id: string; name: string; earnedAt: string }) => void
  toggleBookmark: (lessonId: string) => void
  updateNote: (lessonId: string, note: string) => void
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      currentProgress: {},
      badges: [],
      bookmarkedLessons: [],
      notes: {},

      addCompletedLesson: (lessonId: string) => {
        const { completedLessons } = get()
        if (!completedLessons.includes(lessonId)) {
          set({ completedLessons: [...completedLessons, lessonId] })
        }
      },

      updateProgress: (moduleId: string, progress: number) => {
        const { currentProgress } = get()
        set({
          currentProgress: {
            ...currentProgress,
            [moduleId]: progress,
          },
        })
      },

      addBadge: (badge: { id: string; name: string; earnedAt: string }) => {
        const { badges } = get()
        const exists = badges.find(b => b.id === badge.id)
        if (!exists) {
          set({ badges: [...badges, badge] })
        }
      },

      toggleBookmark: (lessonId: string) => {
        const { bookmarkedLessons } = get()
        const isBookmarked = bookmarkedLessons.includes(lessonId)
        
        if (isBookmarked) {
          set({ bookmarkedLessons: bookmarkedLessons.filter(id => id !== lessonId) })
        } else {
          set({ bookmarkedLessons: [...bookmarkedLessons, lessonId] })
        }
      },

      updateNote: (lessonId: string, note: string) => {
        const { notes } = get()
        set({
          notes: {
            ...notes,
            [lessonId]: note,
          },
        })
      },
    }),
    {
      name: 'teach-learning-store',
    }
  )
)