import { useState, useCallback, useEffect, useRef } from 'react'
import { usePolling } from '../../hooks'
import { getParentConversations, getParentConversation } from '../../api'
import {
  Loader2,
  MessageSquare,
  Globe,
  MessageCircle,
  ArrowLeft,
  Inbox,
} from 'lucide-react'

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-SG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString('en-SG', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

function SourceBadge({ source }) {
  if (source === 'whatsapp') {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
        <MessageCircle size={11} /> WhatsApp
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full">
      <Globe size={11} /> Web Chat
    </span>
  )
}

function ConversationList({ conversations, selectedId, onSelect, loading }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 size={24} className="animate-spin text-primary" />
      </div>
    )
  }

  if (!conversations || conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-gray-400 dark:text-slate-500 px-4">
        <Inbox size={32} className="mb-2 opacity-50" />
        <p className="text-sm text-center">No conversations yet</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-100 dark:divide-slate-700">
      {conversations.map(conv => (
        <button
          key={conv.id}
          onClick={() => onSelect(conv.id)}
          className={`w-full text-left px-4 py-3 transition-colors cursor-pointer ${
            selectedId === conv.id
              ? 'bg-indigo-50 dark:bg-indigo-900/20 border-l-2 border-indigo-500'
              : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 border-l-2 border-transparent'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-800 dark:text-slate-200 truncate">
              {conv.topicName}
            </span>
            <SourceBadge source={conv.source} />
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400 truncate mb-1">
            {conv.lastMessage}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-400 dark:text-slate-500">
            <span>{formatDate(conv.createdAt)}</span>
            <span>{conv.messageCount} messages</span>
          </div>
        </button>
      ))}
    </div>
  )
}

function ChatBubble({ message }) {
  const isStudent = message.role === 'student'
  return (
    <div className={`flex ${isStudent ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
          isStudent
            ? 'bg-indigo-500 text-white rounded-br-md'
            : 'bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-200 rounded-bl-md'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
        <p
          className={`text-xs mt-1 ${
            isStudent ? 'text-indigo-200' : 'text-gray-400 dark:text-slate-500'
          }`}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  )
}

function ChatView({ conversationId, onBack }) {
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (!conversationId) return
    setLoading(true)
    setError(null)
    getParentConversation(conversationId)
      .then(data => {
        setDetail(data)
        setLoading(false)
      })
      .catch(e => {
        setError(e.message)
        setLoading(false)
      })
  }, [conversationId])

  useEffect(() => {
    if (detail?.messages) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [detail])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={24} className="animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg p-4 m-4">
        Failed to load conversation: {error}
      </div>
    )
  }

  if (!detail) return null

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700 flex items-center gap-3 bg-gray-50 dark:bg-slate-700/50 shrink-0">
        {onBack && (
          <button
            onClick={onBack}
            className="md:hidden text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-slate-200 truncate">
            {detail.topicName}
          </h3>
          <SourceBadge source={detail.source} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {(detail.messages || []).map((msg, i) => (
          <ChatBubble key={i} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Read-only notice */}
      <div className="px-4 py-2.5 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/30 shrink-0">
        <p className="text-xs text-gray-400 dark:text-slate-500 text-center">
          This is a read-only view of your child's tutoring conversation
        </p>
      </div>
    </div>
  )
}

export default function ConversationHistory() {
  const [selectedId, setSelectedId] = useState(null)
  const [page, setPage] = useState(1)

  const fetchConversations = useCallback(() => getParentConversations(page), [page])
  const { data, error, loading } = usePolling(fetchConversations, 30000)

  const conversations = data?.items || []
  const totalPages = data?.pages || 1

  // On mobile, show either list or chat
  const showingChat = selectedId !== null

  if (error && !loading) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg p-4">
        Failed to load conversations: {error}
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden"
      style={{ height: 'calc(100vh - 160px)', minHeight: '500px' }}
    >
      <div className="flex h-full">
        {/* Conversation List - hidden on mobile when chat is open */}
        <div
          className={`${
            showingChat ? 'hidden md:flex' : 'flex'
          } flex-col w-full md:w-80 lg:w-96 border-r border-gray-100 dark:border-slate-700 shrink-0`}
        >
          <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50 shrink-0">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300 flex items-center gap-2">
              <MessageSquare size={16} /> Conversations
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ConversationList
              conversations={conversations}
              selectedId={selectedId}
              onSelect={setSelectedId}
              loading={loading}
            />
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/30 shrink-0">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="text-xs text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 disabled:opacity-40 cursor-pointer"
              >
                Previous
              </button>
              <span className="text-xs text-gray-400 dark:text-slate-500">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="text-xs text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 disabled:opacity-40 cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Chat View */}
        <div className={`${showingChat ? 'flex' : 'hidden md:flex'} flex-col flex-1 min-w-0`}>
          {selectedId ? (
            <ChatView
              conversationId={selectedId}
              onBack={() => setSelectedId(null)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-slate-500">
              <MessageSquare size={40} className="mb-3 opacity-30" />
              <p className="text-sm">Select a conversation to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
