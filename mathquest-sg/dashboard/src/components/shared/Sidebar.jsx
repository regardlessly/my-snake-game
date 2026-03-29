import {
  LayoutDashboard,
  MessageCircle,
  Users,
  Settings,
  BookOpen,
  ScrollText,
  BarChart3,
  Activity,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const adminNav = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { key: 'students', label: 'Students', icon: Users },
  { key: 'llm', label: 'LLM Settings', icon: Settings },
  { key: 'content', label: 'Content', icon: BookOpen },
  { key: 'logs', label: 'Logs', icon: ScrollText },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
]

const parentNav = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'topics', label: 'Topics', icon: BookOpen },
  { key: 'activity', label: 'Activity', icon: Activity },
  { key: 'conversations', label: 'Conversations', icon: MessageSquare },
  { key: 'settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ screen, setScreen, role, collapsed, setCollapsed }) {
  const items = role === 'admin' ? adminNav : parentNav

  return (
    <aside
      className="fixed left-0 top-0 h-screen bg-slate-900 text-white flex flex-col transition-all duration-200 z-30"
      style={{ width: collapsed ? 64 : 220 }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-14 px-3 border-b border-slate-700 shrink-0">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
            MQ
          </div>
          {!collapsed && (
            <span className="text-sm font-semibold whitespace-nowrap">MathQuest SG</span>
          )}
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {items.map(({ key, label, icon: Icon }) => {
          const active = screen === key
          return (
            <button
              key={key}
              onClick={() => setScreen(key)}
              title={collapsed ? label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors cursor-pointer ${
                active
                  ? 'bg-primary text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} className="shrink-0" />
              {!collapsed && <span className="whitespace-nowrap">{label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="h-10 flex items-center justify-center border-t border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </aside>
  )
}
