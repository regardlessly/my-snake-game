import { useState } from 'react'
import { loginAdmin, loginParent } from '../../api'
import { Loader2, GraduationCap } from 'lucide-react'

export default function LoginScreen({ onLogin }) {
  const [tab, setTab] = useState('admin')
  const [pin, setPin] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (tab === 'admin') {
        const res = await loginAdmin(pin)
        if (res.error) throw new Error(res.error)
        onLogin(res.token, 'admin', null)
      } else {
        const res = await loginParent(code)
        if (res.error) throw new Error(res.error)
        onLogin(res.token, 'parent', res.student_name)
      }
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
      <div className="w-full max-w-sm">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white mb-4">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">MathQuest SG</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            AI Math Tutor Dashboard
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100 dark:border-slate-700">
            {['admin', 'parent'].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t)
                  setError(null)
                }}
                className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer ${
                  tab === t
                    ? 'text-primary border-b-2 border-primary bg-primary/5'
                    : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'
                }`}
              >
                {t === 'admin' ? 'Admin' : 'Parent'}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {tab === 'admin' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                  Admin PIN
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="4-digit PIN"
                  className="w-full px-3 py-2.5 text-center text-lg tracking-widest rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                  Parent Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 6))}
                  placeholder="6-character code"
                  className="w-full px-3 py-2.5 text-center text-lg tracking-widest rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none uppercase"
                  required
                />
              </div>
            )}

            {error && (
              <p className="text-sm text-red-500 dark:text-red-400 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || (tab === 'admin' ? pin.length < 4 : code.length < 6)}
              className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
