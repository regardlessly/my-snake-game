import { useCallback } from 'react'
import { usePolling } from '../../hooks'
import { getOverview } from '../../api'
import StatsCard from '../shared/StatsCard'
import { Users, Database, MessageCircle, Activity, Loader2 } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function Overview() {
  const fetchOverview = useCallback(() => getOverview(), [])
  const { data, error, loading } = usePolling(fetchOverview, 10000)

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
        Failed to load overview: {error}
      </div>
    )
  }

  const stats = data || {}
  const dailyData = stats.daily_questions || []

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Total Students"
          value={stats.total_students ?? 0}
          icon={Users}
          color="primary"
          trend={stats.student_trend}
        />
        <StatsCard
          label="Questions in DB"
          value={stats.total_questions ?? 0}
          icon={Database}
          color="accent"
        />
        <StatsCard
          label="WhatsApp Status"
          value={stats.whatsapp_connected ? 'Connected' : 'Disconnected'}
          icon={MessageCircle}
          color={stats.whatsapp_connected ? 'success' : 'danger'}
        />
        <StatsCard
          label="Today's Activity"
          value={stats.today_questions ?? 0}
          icon={Activity}
          color="warning"
          trend={stats.activity_trend}
        />
      </div>

      {/* Daily Questions Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-4">
          Questions Answered (Last 7 Days)
        </h3>
        {dailyData.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ fill: '#6366f1', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-400 dark:text-slate-500">
            No activity data yet
          </div>
        )}
      </div>

      {/* Recent Activity */}
      {stats.recent_activity && stats.recent_activity.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-4">
            Recent Activity
          </h3>
          <ul className="space-y-3">
            {stats.recent_activity.map((item, i) => (
              <li
                key={i}
                className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-slate-700 last:border-0"
              >
                <div>
                  <span className="text-sm font-medium text-gray-800 dark:text-slate-200">
                    {item.student_name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-slate-400 ml-2">
                    {item.topic}
                  </span>
                </div>
                <span className="text-xs text-gray-400 dark:text-slate-500">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
