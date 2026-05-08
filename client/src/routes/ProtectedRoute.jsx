import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getMe } from '../services/authService'

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    getMe()
      .then(() => {
        setAuthenticated(true)
        setLoading(false)
      })
      .catch(() => {
        setAuthenticated(false)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>
  
  if (!authenticated) return <Navigate to="/login" replace />

  return children
}

export default ProtectedRoute
