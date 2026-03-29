import { useState, useCallback } from 'react'
import { usePolling } from '../../hooks'
import { getParentTopics } from '../../api'
import {
  Loader2,
  ChevronDown,
  ChevronRight,
  Lock,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react'

const strandColors = {
  NUMBER_ALGEBRA: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-300', label: 'Number & Algebra' },
  GEOMETRY: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300', label: 'Geometry' },
  STATISTICS: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', label: 'Statistics' },
}

function MasteryBar({ mastery, size = 'md' }) {
  const pct = Math.round((mastery || 0) * 100)
  const color = pct >= 60 ? 'bg-emerald-500' : pct >= 30 ? 'bg-amber-500' : 'bg-rose-500'
  const textColor = pct >= 60 ? 'text-emerald-600 dark:text-emerald-400' : pct >= 30 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'
  const h = size === 'sm' ? 'h-1.5' : 'h-2.5'

  return (
    <div className="flex items-center gap-2 flex-1 min-w-0">
      <div className={`flex-1 ${h} bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden`}>
        <div
          className={`${h} ${color} rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`text-xs font-semibold ${textColor} w-10 text-right shrink-0`}>
        {pct}%
      </span>
    </div>
  )
}

function SkillRow({ skill }) {
  const pct = Math.round((skill.mastery || 0) * 100)
  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 dark:text-slate-300 truncate">
            {skill.skillName}
          </span>
          {skill.weak && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 px-2 py-0.5 rounded-full shrink-0">
              <AlertTriangle size={11} /> Needs practice
            </span>
          )}
          {pct >= 80 && (
            <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
          )}
        </div>
        <div className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">
          {skill.correct}/{skill.attempts} correct
        </div>
      </div>
      <div className="w-32 sm:w-48">
        <MasteryBar mastery={skill.mastery} size="sm" />
      </div>
    </div>
  )
}

function TopicRow({ topic }) {
  const [expanded, setExpanded] = useState(false)
  const strand = strandColors[topic.strand] || strandColors.NUMBER_ALGEBRA
  const weakSkills = (topic.skills || []).filter(s => s.weak)

  if (topic.locked) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-4 opacity-60">
        <div className="flex items-center gap-3">
          <Lock size={18} className="text-gray-400 dark:text-slate-500 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-500 dark:text-slate-400">
                {topic.topicName}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${strand.bg} ${strand.text}`}>
                {strand.label}
              </span>
            </div>
            <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
              Complete prerequisite topics to unlock
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center gap-3 text-left cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors"
      >
        <div className="text-gray-400 dark:text-slate-500 shrink-0">
          {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="text-sm font-semibold text-gray-800 dark:text-slate-200">
              {topic.topicName}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${strand.bg} ${strand.text}`}>
              {strand.label}
            </span>
            {weakSkills.length > 0 && (
              <span className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                {weakSkills.length} weak area{weakSkills.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <MasteryBar mastery={topic.mastery} />
            </div>
            <span className="text-xs text-gray-400 dark:text-slate-500 shrink-0 hidden sm:inline">
              {topic.questionsCorrect}/{topic.questionsAttempted} correct
            </span>
          </div>
        </div>
      </button>

      {expanded && topic.skills && topic.skills.length > 0 && (
        <div className="border-t border-gray-100 dark:border-slate-700 px-4 py-2 space-y-0.5">
          <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider px-3 py-1">
            Skills
          </p>
          {topic.skills.map(skill => (
            <SkillRow key={skill.skillId} skill={skill} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function TopicProgress() {
  const fetchTopics = useCallback(() => getParentTopics(), [])
  const { data, error, loading } = usePolling(fetchTopics, 30000)

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
        Failed to load topics: {error}
      </div>
    )
  }

  const topics = data || []

  if (topics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-slate-500">
        <p className="text-sm">No topic data available yet.</p>
        <p className="text-xs mt-1">Topics will appear once your child starts practising.</p>
      </div>
    )
  }

  const unlockedTopics = topics.filter(t => !t.locked)
  const lockedTopics = topics.filter(t => t.locked)

  return (
    <div className="space-y-4">
      {/* Summary Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-4">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-slate-400">
          <span>
            <strong className="text-gray-800 dark:text-slate-200">{unlockedTopics.length}</strong> topics unlocked
          </span>
          <span>
            <strong className="text-gray-800 dark:text-slate-200">{lockedTopics.length}</strong> locked
          </span>
          <span>
            <strong className="text-gray-800 dark:text-slate-200">
              {topics.filter(t => !t.locked && t.skills?.some(s => s.weak)).length}
            </strong> with weak areas
          </span>
        </div>
      </div>

      {/* Topic List */}
      {unlockedTopics.map(topic => (
        <TopicRow key={topic.topicId} topic={topic} />
      ))}

      {lockedTopics.length > 0 && (
        <>
          <h3 className="text-xs font-medium text-gray-400 dark:text-slate-500 uppercase tracking-wider mt-6 px-1">
            Locked Topics
          </h3>
          {lockedTopics.map(topic => (
            <TopicRow key={topic.topicId} topic={topic} />
          ))}
        </>
      )}
    </div>
  )
}
