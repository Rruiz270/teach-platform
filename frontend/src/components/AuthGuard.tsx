'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  allowedRoles?: string[]
  fallbackPath?: string
}

const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email'
]

export function AuthGuard({ 
  children, 
  requireAuth = true, 
  allowedRoles,
  fallbackPath = '/login' 
}: AuthGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [shouldRender, setShouldRender] = useState(false)
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false)

  useEffect(() => {
    // Don't do anything while loading
    if (isLoading) {
      setShouldRender(false)
      setHasCheckedAuth(false)
      return
    }

    // Mark that we've completed the auth check
    setHasCheckedAuth(true)

    // Check if this is a public route
    const isPublicRoute = publicRoutes.some(route => {
      if (route === '/') return pathname === '/'
      return pathname.startsWith(route)
    })

    // Handle public routes
    if (isPublicRoute && !requireAuth) {
      setShouldRender(true)
      return
    }

    // Handle authentication requirements
    if (requireAuth && !isAuthenticated) {
      console.log('AuthGuard: Not authenticated, redirecting to', fallbackPath)
      setShouldRender(false)
      router.replace(fallbackPath)
      return
    }

    // Handle role-based access
    if (allowedRoles && user) {
      if (!allowedRoles.includes(user.role)) {
        setShouldRender(false)
        router.replace('/dashboard') // Default fallback for wrong role
        return
      }
    }

    // If we get here, user should see the content
    console.log('AuthGuard: Auth check passed, rendering content for', pathname)
    setShouldRender(true)
  }, [isLoading, isAuthenticated, user, pathname, requireAuth, allowedRoles, fallbackPath, router])

  // Show loading spinner while determining auth state OR if auth check hasn't completed
  if (isLoading || !hasCheckedAuth || (requireAuth && !shouldRender)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  // Only render children if we should AND auth check is complete
  return shouldRender && hasCheckedAuth ? <>{children}</> : null
}