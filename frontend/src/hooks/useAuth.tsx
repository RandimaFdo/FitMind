import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

interface TokenPayload {
  sub: string
  exp: number
}

interface AuthContextValue {
  token: string | null
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('fitmind_token'))

  useEffect(() => {
    const handleStorage = () => setToken(localStorage.getItem('fitmind_token'))
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const isAuthenticated = useMemo(() => {
    if (!token) return false
    try {
      const decoded = jwtDecode<TokenPayload>(token)
      return decoded.exp * 1000 > Date.now()
    } catch (error) {
      console.error(error)
      return false
    }
  }, [token])

  const login = (nextToken: string) => {
    localStorage.setItem('fitmind_token', nextToken)
    setToken(nextToken)
  }

  const logout = () => {
    localStorage.removeItem('fitmind_token')
    setToken(null)
  }

  const value = useMemo(() => ({ token, isAuthenticated, login, logout }), [token, isAuthenticated])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
