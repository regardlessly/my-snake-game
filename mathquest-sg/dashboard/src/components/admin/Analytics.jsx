import { useState, useEffect } from 'react'
import { getUsageAnalytics, getPopularTopics } from '../../api'
import StatsCard from '../shared/StatsCard'
import { Loader2, Zap, Users, HelpCircle } from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const rangeBtns = [
  { key: 7, label: '7d' },
  { key: 14, label: '14d' },
  { key: 30, label: '30d' },
]

const topicColors = ['#6366f1', '#06b6d4', '#22c55e', '#f59e0b', '#ef4444']

export default function Analytics() {
  const [days, setDays] = useState(7)
  const [usage, setUsage] = useState(null)
  const [topics, setTopics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const [usageRes, topicsRes] = await Promise.all([
          getUsageAnalytics(days),
          getPopularTopics(),
        ])
        setUsage(usageRes)
        setTopics(topicsRes)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [days])

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
        Failed to load analytics: {error}
      </div>
    )
  }

  const dailyTokens = usage?.daily_tokens || []
  const dailyStudents = usage?.daily_students || []
  const popularTopics = (topics?.topics || []).slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Date Range Selector */}
      <div className="flex gap-1 bg-gray-100 dark:bg-slate-800 rounded-lg p-1 w-fit">
        {rangeBtns.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setDays(key)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
              days === key
                ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          label="Total Tokens"
          value={usage?.total_tokens?.toLocaleString() ?? 0}
          icon={Zap}
          color="primary"
        />
        <StatsCard
          label="Avg Daily Students"
          value={usage?.avg_daily_students ?? 0}
          icon={Users}
          color="accent"
        />
        <StatsCard
          label="Total Questions"
          value={usage?.total_questions ?? 0}
          icon={HelpCircle}
          color="success"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Token Usage */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-4">
            Daily Token Usage
          </h3>
          {dailyTokens.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={dailyTokens}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="tokens"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={{ fill: '#6366f1', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-60 flex items-center justify-center text-gray-400 dark:text-slate-500 text-sm">
              No token data yet
            </div>
          )}
        </div>

        {/* Daily Active Students */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-4">
            Daily Active Students
          </h3>
          {dailyStudents.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={dailyStudents}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  }}
                />
                <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-60 flex items-center justify-center text-gray-400 dark:text-slate-500 text-sm">
              No student data yet
            </div>
          )}
        </div>
      </div>

      {/* Popular Topics - Horizontal Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-4">
          Popular Topics (Top 5)
        </h3>
        {popularTopics.length > 0 ? (
          <ResponsiveContainer width="100%" height={Math.max(200, popularTopics.length * 50)}>
            <BarChart data={popularTopics} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fontSize: 12 }}
                stroke="#94a3b8"
                width={140}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {popularTopics.map((_, i) => (
                  <Cell key={i} fill={topicColors[i % topicColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-48 flex items-center justify-center text-gray-400 dark:text-slate-500 text-sm">
            No topic data yet
          </div>
        )}
      </div>
    </div>
  )
}
