// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, _setToken] = useState(() => localStorage.getItem('idToken'))
  const [user, setUser] = useState(null)
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(!!token)

  const setToken = (t) => {
    _setToken(t)
    if (t) localStorage.setItem('idToken', t)
    else  localStorage.removeItem('idToken')
  }

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }
    try {
      const decoded = jwtDecode(token)
      setUser({ sub: decoded.sub, email: decoded.email })
      setRoles(decoded.roles || [])
    } catch {
      setToken(null)
    } finally {
      setLoading(false)
    }
  }, [token])

  const login = () => {
    const domain   = 'dev-3criexz3kwytajyv.eu.auth0.com'
    const clientId = 'dVW1l0L5o3ozs5XCHuevsbX5DfkUoWDD'
    const redirect = encodeURIComponent('http://localhost:3000/callback')
    const audience = encodeURIComponent('https://room-booking-api')
    const scope    = encodeURIComponent('openid profile email')
    window.location.href =
      `https://${domain}/authorize?` +
      `response_type=code&` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirect}&` +
      `audience=${audience}&` +
      `scope=${scope}`
  }

  const logout = () => {
    setToken(null)
    const domain   = 'dev-3criexz3kwytajyv.eu.auth0.com'
    const returnTo = encodeURIComponent('http://localhost:3000/')
    window.location.href =
      `https://${domain}/v2/logout?client_id=` +
      `dVW1l0L5o3ozs5XCHuevsbX5DfkUoWDD&returnTo=${returnTo}`
  }

  return (
    <AuthContext.Provider value={{ token, user, roles, loading, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
