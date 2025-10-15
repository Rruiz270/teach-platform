import Cookies from 'js-cookie'

// Utility to ensure professor token when accessing from super admin
export function ensureProfessorToken(user: any) {
  if (!user) return false
  
  const currentToken = Cookies.get('token')
  
  // If no token exists but user is authenticated (super admin case)
  if (!currentToken && user.role) {
    // Create a temporary token for API access
    // In production, this should request a proper token from backend
    const tempToken = btoa(JSON.stringify({
      userId: user.id,
      role: user.role,
      timestamp: Date.now()
    }))
    
    Cookies.set('token', tempToken, { expires: 1 })
    return true
  }
  
  return !!currentToken
}