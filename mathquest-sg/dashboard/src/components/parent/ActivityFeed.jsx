import { useState, useCallback } from 'react'
import { usePolling } from '../../hooks'
import { getParentActivity } from '../../api'
import {
  Loader2,
  Clock,
  ChevronDown,
  Globe,
  MessageCircle,
  Inbox,
} from 'lucide-react'

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString('en-SG', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

function formatGroupDate(dateStr) {
  const date = new Date(dateStr)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const diffDays = Math.round((today - target) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  return date.toLocaleDateString('en-SG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function groupByDate(items) {
  const groups = {}
  for (const item of items) {
    const dateKey = new Date(item.timestamp).toISOString().split('T')[0]
    if (!groups[dateKey]) groups[dateKey] = []
    groups[dateKey].push(item)
  }
  return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]))
}

function ScoreBadge({ attempted, correct }) {
  if (!attempted) return null
  const pct = Math.round((correct / attempted) * 100)
  const color = pct >= 80
    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
    : pct >= 60
    ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20'
    : 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20'

  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${color}`}>
      {pct}%
    </span>
  )
}

function SourceBadge({ source }) {
  if (source === 'whatsapp') {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
        <MessageCircle size={12} /> WhatsApp
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
      <Globe size={12} /> Web
    </span>
  )
}

function ActivityItem({ item }) {
  const pct = item.questionsAttempted
    ? Math.round((item.questionsCorrect / item.questionsAttempted) * 100)
    : 0
  const dotColor = pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-500' : 'bg-rose-500'

  return (
    <div className="flex items-start gap-3 py-3 px-4 hover:bg-gray-50 dark:hover:bg-slate-700/30 rounded-lg transition-colors">
      {/* Time and dot */}
      <div className="flex flex-col items-center shrink-0 pt-0.5">
        <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-800 dark:text-slate-200">
            {item.topicName}
          </span>
          <ScoreBadge attempted={item.questionsAttempted} correct={item.questionsCorrect} />
        </div>
        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-slate-400 flex-wrap">
          <span>{item.questionsCorrect}/{item.questionsAttempted} correct</span>
          <span className="flex items-center gap-1">
            <Clock size={11} /> {item.durationMinutes} min
          </span>
          <SourceBadge source={item.source} />
        </div>
      </div>

      {/* Time */}
      <span className="text-xs text-gray-400 dark:text-slate-500 shrink-0 whitespace-nowrap">
        {formatTime(item.timestamp)}
      </span>
    </div>
  )
}

export default function ActivityFeed() {
  const [page, setPage] = useState(1)
  const [allItems, setAllItems] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)

  const fetchActivity = useCallback(() => getParentActivity(1), [])
  const { data, error, loading } = usePolling(fetchActivity, 30000)

  // Sync first page from polling
  const items = page === 1 ? (data?.items || []) : allItems
  const pages = page === 1 ? (data?.pages || 1) : totalPages
  const total = data?.total || 0

  const handleLoadMore = async () => {
    setLoadingMore(true)
    try {
      const nextPage = page + 1
      const result = await getParentActivity(nextPage)
      setAllItems([...items, ...(result.items || [])])
      setTotalPages(result.pages)
      setPage(nextPage)
    } catch (e) {
      // Silently fail, user can retry
    } finally {
      setLoadingMore(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg p-4">
        Failed to load activity: {error}
      </div>
    )
  }

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-slate-500">
        <Inbox size={40} className="mb-3 opacity-50" />
        <p className="text-sm font-medium">No activity yet</p>
        <p className="text-xs mt-1">Encourage your child to start practising!</p>
      </div>
    )
  }

  const grouped = groupByDate(items)

  return (
    <div className="space-y-4">
      {/* Total count */}
      <div className="text-sm text-gray-500 dark:text-slate-400">
        {total} practice session{total !== 1 ? 's' : ''} total
      </div>

      {/* Grouped activity */}
      {grouped.map(([dateKey, dayItems]) => (
        <div key={dateKey} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div className="px-4 py-2.5 bg-gray-50 dark:bg-slate-700/50 border-b border-gray-100 dark:border-slate-700">
            <h3 className="text-xs font-semibold text-gray-600 dark:text-slate-300 uppercase tracking-wider">
              {formatGroupDate(dateKey)}
            </h3>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-slate-700/50">
            {dayItems.map(item => (
              <ActivityItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}

      {/* Load More */}
      {page < pages && (
        <div className="flex justify-center pt-2">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loadingMore ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <ChevronDown size={14} />
            )}
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
