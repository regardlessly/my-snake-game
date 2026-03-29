import { useState, useEffect, useCallback } from 'react'

export function usePolling(fn, interval = 5000) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const result = await fn()
      setData(result)
      setError(null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [fn])

  useEffect(() => {
    refresh()
    const id = setInterval(refresh, interval)
    return () => clearInterval(id)
  }, [refresh, interval])

  return { data, error, loading, refresh }
}

export function useDarkMode() {
  const [dark, setDark] = useState(() => localStorage.getItem('mq_dark') === 'true')
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('mq_dark', dark)
  }, [dark])
  return [dark, setDark]
}

export function useAuth() {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('mq_token')
    const role = localStorage.getItem('mq_role')
    const studentName = localStorage.getItem('mq_student_name')
    return token ? { token, role, studentName } : null
  })

  const login = (token, role, studentName) => {
    localStorage.setItem('mq_token', token)
    localStorage.setItem('mq_role', role)
    if (studentName) localStorage.setItem('mq_student_name', studentName)
    setAuth({ token, role, studentName })
  }

  const logout = () => {
    localStorage.removeItem('mq_token')
    localStorage.removeItem('mq_role')
    localStorage.removeItem('mq_student_name')
    setAuth(null)
  }

  return { auth, login, logout }
}
