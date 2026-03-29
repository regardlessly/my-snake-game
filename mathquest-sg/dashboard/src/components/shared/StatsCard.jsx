import { TrendingUp, TrendingDown } from 'lucide-react'

const colorMap = {
  primary: 'bg-primary/10 text-primary dark:bg-primary/20',
  success: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  warning: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  danger: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  accent: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400',
}

export default function StatsCard({ label, value, icon: Icon, trend, color = 'primary' }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value ?? '--'}</p>
          {trend !== undefined && trend !== null && (
            <div className="flex items-center gap-1 mt-2">
              {trend >= 0 ? (
                <TrendingUp size={14} className="text-emerald-500" />
              ) : (
                <TrendingDown size={14} className="text-red-500" />
              )}
              <span
                className={`text-xs font-medium ${
                  trend >= 0 ? 'text-emerald-500' : 'text-red-500'
                }`}
              >
                {trend >= 0 ? '+' : ''}
                {trend}%
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-lg ${colorMap[color] || colorMap.primary}`}>
            <Icon size={22} />
          </div>
        )}
      </div>
    </div>
  )
}
