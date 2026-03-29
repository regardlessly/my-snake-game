import { useState, useEffect } from 'react'
import { getConversationLogs, getGuardrailLogs } from '../../api'
import {
  Loader2,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ShieldAlert,
  AlertTriangle,
} from 'lucide-react'

const tabs = [
  { key: 'conversations', label: 'Conversations', icon: MessageSquare },
  { key: 'guardrails', label: 'Guardrails', icon: ShieldAlert },
  { key: 'errors', label: 'Errors', icon: AlertTriangle },
]

const levelBadge = {
  error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
}

function Pagination({ page, totalPages, onChange }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-slate-700">
      <span className="text-xs text-gray-500 dark:text-slate-400">
        Page {page} of {totalPages || 1}
      </span>
      <div className="flex gap-1">
        <button
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
          className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-30 cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          disabled={page >= (totalPages || 1)}
          onClick={() => onChange(page + 1)}
          className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-30 cursor-pointer"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

function ConversationRow({ conv }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <tr
        onClick={() => setExpanded(!expanded)}
        className="border-b border-gray-50 dark:border-slate-700/50 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/30"
      >
        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
          {conv.student_name}
        </td>
        <td className="px-4 py-3 text-sm text-gray-600 dark:text-slate-300">{conv.topic}</td>
        <td className="px-4 py-3 text-sm text-gray-600 dark:text-slate-300">
          {conv.message_count}
        </td>
        <td className="px-4 py-3 text-sm text-gray-500 dark:text-slate-400">
          {conv.last_updated}
        </td>
        <td className="px-4 py-2 text-gray-400 dark:text-slate-500">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </td>
      </tr>
      {expanded && conv.messages && (
        <tr>
          <td colSpan={5} className="px-4 py-3 bg-gray-50 dark:bg-slate-800/50">
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {conv.messages.map((m, i) => (
                <div
                  key={i}
                  className={`text-sm p-2 rounded-lg ${
                    m.role === 'assistant'
                      ? 'bg-primary/5 dark:bg-primary/10 text-gray-800 dark:text-slate-200'
                      : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-300'
                  }`}
                >
                  <span className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase mr-2">
                    {m.role}
                  </span>
                  {m.content}
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

export default function Logs() {
  const [tab, setTab] = useState('conversations')
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setPage(1)
  }, [tab])

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        let res
        if (tab === 'conversations') {
          res = await getConversationLogs(page)
        } else if (tab === 'guardrails') {
          res = await getGuardrailLogs(page)
        } else {
          // Errors - reuse guardrail endpoint with error filter or separate endpoint
          res = await getGuardrailLogs(page)
          // Transform to error format if needed
          res = { ...res, items: res.errors || res.items || [] }
        }
        setData(res)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [tab, page])

  // Filter items by search
  const filterItems = (items) => {
    if (!search.trim() || !items) return items || []
    const q = search.toLowerCase()
    return items.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(q)
    )
  }

  return (
    <div className="space-y-4">
      {/* Tab Buttons */}
      <div className="flex gap-1 bg-gray-100 dark:bg-slate-800 rounded-lg p-1 w-fit">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
              tab === key
                ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative w-full max-w-xs">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search logs..."
          className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
        />
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 size={28} className="animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="p-6 text-red-500 dark:text-red-400">{error}</div>
        ) : tab === 'conversations' ? (
          <>
            {filterItems(data?.conversations).length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-gray-400 dark:text-slate-500">
                <MessageSquare size={32} className="mb-2" />
                <p className="text-sm">No conversations yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                        Topic
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                        Messages
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                        Last Updated
                      </th>
                      <th className="w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterItems(data?.conversations).map((conv, i) => (
                      <ConversationRow key={conv.id || i} conv={conv} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <Pagination
              page={page}
              totalPages={data?.total_pages || 1}
              onChange={setPage}
            />
          </>
        ) : tab === 'guardrails' ? (
          <>
            {filterItems(data?.items || data?.guardrails).length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-gray-400 dark:text-slate-500">
                <ShieldAlert size={32} className="mb-2" />
                <p className="text-sm">No guardrail events</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                        Message
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                        Reason
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterItems(data?.items || data?.guardrails).map((item, i) => (
                      <tr
                        key={item.id || i}
                        className="border-b border-gray-50 dark:border-slate-700/50 last:border-0"
                      >
                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-slate-400 whitespace-nowrap">
                          {item.timestamp}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                          {item.student_name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-slate-300 max-w-xs truncate">
                          {item.message}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                            {item.reason}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <Pagination
              page={page}
              totalPages={data?.total_pages || 1}
              onChange={setPage}
            />
          </>
        ) : (
          /* Errors Tab */
          <>
            {filterItems(data?.items || data?.errors).length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-gray-400 dark:text-slate-500">
                <AlertTriangle size={32} className="mb-2" />
                <p className="text-sm">No errors logged</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                        Level
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                        Message
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterItems(data?.items || data?.errors).map((item, i) => (
                      <tr
                        key={item.id || i}
                        className="border-b border-gray-50 dark:border-slate-700/50 last:border-0"
                      >
                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-slate-400 whitespace-nowrap">
                          {item.timestamp}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full capitalize ${
                              levelBadge[item.level] || levelBadge.info
                            }`}
                          >
                            {item.level}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-slate-300">
                          {item.message}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <Pagination
              page={page}
              totalPages={data?.total_pages || 1}
              onChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  )
}
