import { useState, useEffect, useCallback } from 'react'
import { getStudents, approveStudent, denyStudent, deleteStudent } from '../../api'
import {
  Loader2,
  Check,
  X,
  Trash2,
  Users,
  Copy,
  CheckCircle2,
} from 'lucide-react'

const statusFilters = ['all', 'pending', 'approved', 'denied']

const statusBadge = {
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  denied: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

export default function Students() {
  const [filter, setFilter] = useState('all')
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState(null)
  const [actionLoading, setActionLoading] = useState(null)

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true)
      const res = await getStudents(filter)
      setStudents(res.students || [])
      setError(null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleApprove = async (id) => {
    setActionLoading(id)
    try {
      const res = await approveStudent(id)
      if (res.error) throw new Error(res.error)
      showToast(`Approved! Parent code: ${res.parent_code || 'generated'}`)
      await fetchStudents()
    } catch (e) {
      showToast(`Error: ${e.message}`)
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeny = async (id) => {
    setActionLoading(id)
    try {
      const res = await denyStudent(id)
      if (res.error) throw new Error(res.error)
      showToast('Student denied')
      await fetchStudents()
    } catch (e) {
      showToast(`Error: ${e.message}`)
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student? This cannot be undone.')) return
    setActionLoading(id)
    try {
      const res = await deleteStudent(id)
      if (res.error) throw new Error(res.error)
      showToast('Student deleted')
      await fetchStudents()
    } catch (e) {
      showToast(`Error: ${e.message}`)
    } finally {
      setActionLoading(null)
    }
  }

  const copyCode = (code) => {
    navigator.clipboard.writeText(code)
    showToast('Parent code copied!')
  }

  return (
    <div className="space-y-4">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-slate-800 dark:bg-slate-700 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span className="text-sm">{toast}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-slate-800 rounded-lg p-1 w-fit">
        {statusFilters.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors capitalize cursor-pointer ${
              filter === s
                ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 size={28} className="animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="p-6 text-red-500 dark:text-red-400">{error}</div>
        ) : students.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400 dark:text-slate-500">
            <Users size={36} className="mb-2" />
            <p className="text-sm">No students found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    Parent Code
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    Linked
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-gray-50 dark:border-slate-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-700/30"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      {s.display_name || s.name}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full capitalize ${
                          statusBadge[s.status] || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {s.parent_code ? (
                        <button
                          onClick={() => copyCode(s.parent_code)}
                          className="flex items-center gap-1.5 text-sm font-mono text-primary hover:text-primary-dark cursor-pointer"
                        >
                          {s.parent_code}
                          <Copy size={12} />
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 dark:text-slate-500">--</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-slate-300">
                      {s.user_display_name || s.linked_user || (
                        <span className="text-xs text-gray-400 dark:text-slate-500">--</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {s.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(s.id)}
                              disabled={actionLoading === s.id}
                              title="Approve"
                              className="p-1.5 rounded-md text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors disabled:opacity-50 cursor-pointer"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => handleDeny(s.id)}
                              disabled={actionLoading === s.id}
                              title="Deny"
                              className="p-1.5 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50 cursor-pointer"
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(s.id)}
                          disabled={actionLoading === s.id}
                          title="Delete"
                          className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
