import { useState } from 'react'
import { useAuth, useDarkMode } from './hooks'
import LoginScreen from './components/shared/LoginScreen'
import Sidebar from './components/shared/Sidebar'
import Header from './components/shared/Header'
import Overview from './components/admin/Overview'
import WhatsAppConnection from './components/admin/WhatsAppConnection'
import Students from './components/admin/Students'
import LLMSettings from './components/admin/LLMSettings'
import Content from './components/admin/Content'
import Logs from './components/admin/Logs'
import Analytics from './components/admin/Analytics'
import ParentDashboard from './components/parent/ParentDashboard'
import TopicProgress from './components/parent/TopicProgress'
import ActivityFeed from './components/parent/ActivityFeed'
import ConversationHistory from './components/parent/ConversationHistory'
import ParentSettings from './components/parent/ParentSettings'

const screenTitles = {
  overview: 'Overview',
  whatsapp: 'WhatsApp Connection',
  students: 'Student Management',
  llm: 'LLM Settings',
  content: 'Content Management',
  logs: 'Logs',
  analytics: 'Analytics',
  dashboard: 'Dashboard',
  topics: 'Topics',
  activity: 'Activity',
  conversations: 'Conversations',
  settings: 'Settings',
}

const adminScreens = {
  overview: Overview,
  whatsapp: WhatsAppConnection,
  students: Students,
  llm: LLMSettings,
  content: Content,
  logs: Logs,
  analytics: Analytics,
}

const parentScreens = {
  dashboard: ParentDashboard,
  topics: TopicProgress,
  activity: ActivityFeed,
  conversations: ConversationHistory,
  settings: ParentSettings,
}

export default function App() {
  const { auth, login, logout } = useAuth()
  const [darkMode, setDarkMode] = useDarkMode()
  const [screen, setScreen] = useState('overview')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  if (!auth) {
    return <LoginScreen onLogin={login} />
  }

  const isAdmin = auth.role === 'admin'
  const screens = isAdmin ? adminScreens : parentScreens
  const defaultScreen = isAdmin ? 'overview' : 'dashboard'
  const activeScreen = screens[screen] ? screen : defaultScreen
  const ScreenComponent = screens[activeScreen] || null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex">
      <Sidebar
        screen={screen}
        setScreen={setScreen}
        role={auth.role}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div
        className="flex-1 flex flex-col min-h-screen transition-all duration-200"
        style={{ marginLeft: sidebarCollapsed ? 64 : 220 }}
      >
        <Header
          title={screenTitles[activeScreen] || activeScreen}
          auth={auth}
          onLogout={logout}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <main className="flex-1 p-6 overflow-auto">
          {ScreenComponent ? (
            <ScreenComponent />
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400 dark:text-slate-500">
              <p className="text-sm">This section is coming soon.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
