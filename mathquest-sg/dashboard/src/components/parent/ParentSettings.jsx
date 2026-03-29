import { useState, useCallback, useEffect } from 'react'
import { usePolling } from '../../hooks'
import { getParentSettings, updateParentSettings } from '../../api'
import {
  Loader2,
  Save,
  Clock,
  Bell,
  Target,
  CheckCircle2,
} from 'lucide-react'

const ALL_TOPICS = [
  { id: 'integers', name: 'Integers' },
  { id: 'fractions-decimals-percentages', name: 'Fractions, Decimals & Percentages' },
  { id: 'ratio-proportion', name: 'Ratio & Proportion' },
  { id: 'algebraic-expressions', name: 'Algebraic Expressions' },
  { id: 'linear-equations', name: 'Linear Equations' },
  { id: 'linear-inequalities', name: 'Linear Inequalities' },
  { id: 'functions-linear-graphs', name: 'Functions & Linear Graphs' },
  { id: 'number-patterns', name: 'Number Patterns' },
  { id: 'angles-triangles-polygons', name: 'Angles, Triangles & Polygons' },
  { id: 'geometrical-constructions', name: 'Geometrical Constructions' },
  { id: 'perimeter-area-volume', name: 'Perimeter, Area & Volume' },
  { id: 'data-handling', name: 'Data Handling' },
  { id: 'averages', name: 'Averages' },
  { id: 'probability', name: 'Probability' },
]

function Toggle({ label, description, checked, onChange }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer py-2">
      <div className="relative mt-0.5 shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-10 h-6 bg-gray-200 dark:bg-slate-600 rounded-full peer-checked:bg-indigo-500 transition-colors" />
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 dark:text-slate-200">{label}</p>
        {description && (
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{description}</p>
        )}
      </div>
    </label>
  )
}

export default function ParentSettings() {
  const fetchSettings = useCallback(() => getParentSettings(), [])
  const { data, error, loading } = usePolling(fetchSettings, 60000)

  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState(null)

  // Initialize form from fetched data
  useEffect(() => {
    if (data && !form) {
      setForm({
        dailyTimeLimitMin: data.dailyTimeLimitMin ?? 60,
        notifyOnComplete: data.notifyOnComplete ?? true,
        notifyOnAchievement: data.notifyOnAchievement ?? true,
        weeklySummary: data.weeklySummary ?? true,
        focusTopicIds: data.focusTopicIds || [],
      })
    }
  }, [data, form])

  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const toggleTopic = (topicId) => {
    setForm(prev => {
      const current = prev.focusTopicIds || []
      const next = current.includes(topicId)
        ? current.filter(id => id !== topicId)
        : [...current, topicId]
      return { ...prev, focusTopicIds: next }
    })
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setSaveError(null)
    try {
      await updateParentSettings(form)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      setSaveError(e.message || 'Failed to save settings')
    } finally {
      setSaving(false)
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
        Failed to load settings: {error}
      </div>
    )
  }

  if (!form) return null

  const timeLimit = form.dailyTimeLimitMin
  const timeLimitLabel = timeLimit >= 60
    ? `${Math.floor(timeLimit / 60)}h ${timeLimit % 60 > 0 ? `${timeLimit % 60}m` : ''}`
    : `${timeLimit} min`

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Daily Time Limit */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={18} className="text-indigo-500" />
          <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300">
            Daily Time Limit
          </h3>
        </div>
        <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">
          Set a daily practice time limit for your child. They will be reminded when time is up.
        </p>
        <div className="space-y-2">
          <input
            type="range"
            min={15}
            max={120}
            step={15}
            value={timeLimit}
            onChange={e => updateField('dailyTimeLimitMin', Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 dark:text-slate-500">
            <span>15 min</span>
            <span className="font-semibold text-gray-700 dark:text-slate-300 text-sm">
              {timeLimitLabel}
            </span>
            <span>2 hours</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Bell size={18} className="text-indigo-500" />
          <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300">
            Notifications
          </h3>
        </div>
        <div className="space-y-1">
          <Toggle
            label="Notify when daily practice is complete"
            description="Get a notification when your child finishes their daily practice session"
            checked={form.notifyOnComplete}
            onChange={v => updateField('notifyOnComplete', v)}
          />
          <Toggle
            label="Notify on achievement unlocked"
            description="Be notified when your child earns badges, levels up, or hits milestones"
            checked={form.notifyOnAchievement}
            onChange={v => updateField('notifyOnAchievement', v)}
          />
          <Toggle
            label="Weekly progress summary"
            description="Receive a weekly report summarising your child's practice and progress"
            checked={form.weeklySummary}
            onChange={v => updateField('weeklySummary', v)}
          />
        </div>
      </div>

      {/* Topic Focus */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Target size={18} className="text-indigo-500" />
          <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300">
            Topic Focus
          </h3>
        </div>
        <p className="text-xs text-gray-500 dark:text-slate-400 mb-4">
          Select topics you'd like your child to focus on. The tutor will prioritise these areas.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ALL_TOPICS.map(topic => {
            const checked = (form.focusTopicIds || []).includes(topic.id)
            return (
              <label
                key={topic.id}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                  checked
                    ? 'border-indigo-300 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleTopic(topic.id)}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700 dark:text-slate-300">{topic.name}</span>
              </label>
            )
          })}
        </div>
      </div>

      {/* Save */}
      {saveError && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg p-3 text-sm">
          {saveError}
        </div>
      )}

      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="inline-flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 size={16} /> Settings saved
          </span>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
        >
          {saving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          Save Settings
        </button>
      </div>
    </div>
  )
}
