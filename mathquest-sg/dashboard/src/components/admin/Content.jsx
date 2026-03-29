import { useState, useEffect } from 'react'
import { getContentTopics, getTopicQuestions } from '../../api'
import { Loader2, BookOpen, ChevronDown, ChevronUp, Star } from 'lucide-react'

const strandColors = {
  NUMBER_ALGEBRA: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  GEOMETRY: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  STATISTICS: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
}

function DifficultyStars({ level }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={
            i < level
              ? 'fill-amber-400 text-amber-400'
              : 'text-gray-300 dark:text-slate-600'
          }
        />
      ))}
    </span>
  )
}

function TopicCard({ topic }) {
  const [expanded, setExpanded] = useState(false)
  const [questions, setQuestions] = useState(null)
  const [loadingQ, setLoadingQ] = useState(false)

  const handleExpand = async () => {
    if (expanded) {
      setExpanded(false)
      return
    }
    setExpanded(true)
    if (!questions) {
      setLoadingQ(true)
      try {
        const res = await getTopicQuestions(topic.id)
        setQuestions(res.questions || [])
      } catch {
        setQuestions([])
      } finally {
        setLoadingQ(false)
      }
    }
  }

  const strandClass =
    strandColors[topic.strand] || 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'

  // Group questions by skill
  const groupedBySkill = (questions || []).reduce((acc, q) => {
    const skill = q.skill || 'General'
    if (!acc[skill]) acc[skill] = []
    acc[skill].push(q)
    return acc
  }, {})

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
      <button
        onClick={handleExpand}
        className="w-full p-4 text-left cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {topic.name}
            </h4>
            <span
              className={`inline-block mt-1.5 px-2 py-0.5 text-xs font-medium rounded-full ${strandClass}`}
            >
              {(topic.strand || '').replace('_', ' ')}
            </span>
          </div>
          <div className="flex items-center gap-1 ml-2 text-gray-400 dark:text-slate-500">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>
        <div className="flex gap-4 mt-3 text-xs text-gray-500 dark:text-slate-400">
          <span>{topic.skill_count ?? 0} skills</span>
          <span>{topic.question_count ?? 0} questions</span>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-100 dark:border-slate-700 px-4 py-3">
          {loadingQ ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 size={20} className="animate-spin text-primary" />
            </div>
          ) : Object.keys(groupedBySkill).length === 0 ? (
            <p className="text-sm text-gray-400 dark:text-slate-500 py-3 text-center">
              No questions yet
            </p>
          ) : (
            <div className="space-y-4">
              {Object.entries(groupedBySkill).map(([skill, qs]) => (
                <div key={skill}>
                  <h5 className="text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                    {skill}
                  </h5>
                  <ul className="space-y-1.5">
                    {qs.map((q, i) => (
                      <li
                        key={q.id || i}
                        className="flex items-center justify-between text-sm py-1"
                      >
                        <span className="text-gray-700 dark:text-slate-300 truncate flex-1 mr-3">
                          {q.text || q.question_text || `Question ${i + 1}`}
                        </span>
                        <DifficultyStars level={q.difficulty || 1} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Content() {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getContentTopics()
        setTopics(res.topics || [])
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

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
        Failed to load content: {error}
      </div>
    )
  }

  if (topics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-slate-500">
        <BookOpen size={40} className="mb-3" />
        <p className="text-sm">No topics available yet</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {topics.map((t) => (
        <TopicCard key={t.id} topic={t} />
      ))}
    </div>
  )
}
