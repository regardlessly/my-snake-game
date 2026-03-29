import { Sun, Moon, LogOut } from 'lucide-react'

export default function Header({ title, auth, onLogout, darkMode, setDarkMode }) {
  return (
    <header className="h-14 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between px-6 shrink-0">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h1>

      <div className="flex items-center gap-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500 dark:text-slate-400 transition-colors cursor-pointer"
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Role Badge */}
        {auth && (
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light capitalize">
            {auth.role}
            {auth.studentName ? ` - ${auth.studentName}` : ''}
          </span>
        )}

        {/* Logout */}
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 dark:text-slate-300 hover:text-danger dark:hover:text-danger rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  )
}
