import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { adminPath } from '../utils/adminPath'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="login-page">
        <p className="muted">Loading…</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to={adminPath('login')} state={{ from: location }} replace />
  }

  return <>{children}</>
}
