import { useCallback } from 'react'
import { usePolling } from '../../hooks'
import { getParentSummary } from '../../api'
import StatsCard from '../shared/StatsCard'
import {
  Loader2,
  Trophy,
  Flame,
  Clock,
  Star,
  BookOpen,
  CheckCircle2,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

function getStreakMessage(streak) {
  if (!streak || streak === 0) return { text: "Let's get started! Every journey begins with a single step.", emoji: '🚀' }
  if (streak === 1) return { text: 'Great start! 1 day of practice done.', emoji: '🌱' }
  if (streak < 3) return { text: `Nice! ${streak}-day streak going. Keep it up!`, emoji: '💪' }
  if (streak < 7) return { text: `Amazing! ${streak}-day streak! Your child is building great habits.`, emoji: '🔥' }
  return { text: `Incredible! ${streak}-day streak! Consistency is the key to mastery.`, emoji: '🏆' }
}

function formatTime(minutes) {
  if (!minutes || minutes === 0) return '0 min'
  const hrs = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hrs === 0) return `${mins} min`
  if (mins === 0) return `${hrs}h`
  return `${hrs}h ${mins}m`
}

function formatShortDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-SG', { weekday: 'short' })
}

export default function ParentDashboard() {
  const fetchSummary = useCallback(() => getParentSummary(), [])
  const { data, error, loading } = usePolling(fetchSummary, 15000)

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
        Failed to load dashboard: {error}
      </div>
    )
  }

  const s = data || {}
  const mastery = Math.round((s.overallMastery || 0) * 100)
  const xpPercent = s.xpToNextLevel ? Math.round(((s.totalXp || 0) / ((s.totalXp || 0) + s.xpToNextLevel)) * 100) : 0
  const streakMsg = getStreakMessage(s.streakDays)
  const weeklyData = (s.weeklyActivity || []).map(d => ({
    ...d,
    day: formatShortDate(d.date),
  }))

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold shrink-0">
            {(s.studentName || '?')[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold">{s.studentName || 'Your Child'}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 bg-white/20 rounded-full px-3 py-0.5 text-sm font-medium">
                <Star size={14} /> Level {s.level || 1}
              </span>
              <span className="text-sm text-white/80">{s.totalXp || 0} XP</span>
            </div>
            {/* XP Progress Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-white/70 mb-1">
                <span>XP Progress</span>
                <span>{s.xpToNextLevel || 0} XP to next level</span>
              </div>
              <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          label="Overall Mastery"
          value={`${mastery}%`}
          icon={Trophy}
          color={mastery >= 60 ? 'success' : mastery >= 30 ? 'warning' : 'danger'}
        />
        <StatsCard
          label="Current Streak"
          value={`${s.streakDays || 0} days`}
          icon={Flame}
          color={s.streakDays >= 3 ? 'success' : 'warning'}
        />
        <StatsCard
          label="Time This Week"
          value={formatTime(s.timeThisWeekMinutes)}
          icon={Clock}
          color="accent"
        />
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-4">
          Weekly Activity
        </h3>
        {weeklyData.length > 0 ? (
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="colorQuestions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  fontSize: '13px',
                }}
                formatter={(val) => [`${val} questions`, 'Attempted']}
              />
              <Area
                type="monotone"
                dataKey="questions"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#colorQuestions)"
                dot={{ fill: '#6366f1', r: 3 }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-40 flex items-center justify-center text-gray-400 dark:text-slate-500 text-sm">
            No activity data yet this week
          </div>
        )}
      </div>

      {/* Motivational + Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Motivation */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
          <div className="flex items-start gap-3">
            <span className="text-3xl">{streakMsg.emoji}</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">
                Motivation
              </h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                {streakMsg.text}
              </p>
            </div>
          </div>
        </div>

        {/* Summary for Parents */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3">
            Quick Summary
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-slate-400">
            <li className="flex items-center gap-2">
              <BookOpen size={15} className="text-indigo-500 shrink-0" />
              <span>{s.topicsStarted || 0} topics started, {s.topicsCompleted || 0} completed</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
              <span>Overall mastery at {mastery}% &mdash; {mastery >= 60 ? 'doing well!' : mastery >= 30 ? 'making progress' : 'just getting started'}</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={15} className="text-cyan-500 shrink-0" />
              <span>Practised {formatTime(s.timeThisWeekMinutes)} this week</span>
            </li>
            <li className="flex items-center gap-2">
              <Flame size={15} className="text-orange-500 shrink-0" />
              <span>{s.streakDays || 0}-day practice streak</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
