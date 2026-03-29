import { useState, useCallback } from 'react'
import { usePolling } from '../../hooks'
import { getWhatsAppStatus, reconnectWhatsApp } from '../../api'
import {
  Loader2,
  Wifi,
  WifiOff,
  RefreshCw,
  Phone,
  Clock,
  ExternalLink,
} from 'lucide-react'

function formatUptime(seconds) {
  if (!seconds) return '--'
  const d = Math.floor(seconds / 86400)
  const h = Math.floor((seconds % 86400) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const parts = []
  if (d > 0) parts.push(`${d}d`)
  if (h > 0) parts.push(`${h}h`)
  parts.push(`${m}m`)
  return parts.join(' ')
}

export default function WhatsAppConnection() {
  const fetchStatus = useCallback(() => getWhatsAppStatus(), [])
  const { data, error, loading, refresh } = usePolling(fetchStatus, 3000)
  const [reconnecting, setReconnecting] = useState(false)

  const handleReconnect = async () => {
    setReconnecting(true)
    try {
      await reconnectWhatsApp()
      await refresh()
    } catch {
      // error will be caught by next poll
    } finally {
      setReconnecting(false)
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
        Failed to load WhatsApp status: {error}
      </div>
    )
  }

  const status = data || {}
  const connected = status.connected === true

  return (
    <div className="space-y-6">
      {/* Main Status Card */}
      <div
        className={`rounded-xl shadow-sm border p-6 ${
          connected
            ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`p-4 rounded-full ${
              connected
                ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400'
                : 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400'
            }`}
          >
            {connected ? <Wifi size={32} /> : <WifiOff size={32} />}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {connected ? 'Connected' : 'Disconnected'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
              WhatsApp Bridge Status
            </p>
          </div>
        </div>
      </div>

      {/* QR Code */}
      {!connected && (status.qrCode || status.qr_code) && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 text-center">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-4">
            Scan QR Code to Connect
          </h3>
          <div className="inline-block p-4 bg-white rounded-xl">
            <img
              src={(() => {
                const qr = status.qrCode || status.qr_code
                return qr.startsWith('data:') ? qr : `data:image/png;base64,${qr}`
              })()}
              alt="WhatsApp QR Code"
              className="w-64 h-64"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-4">
            Open WhatsApp on your phone &gt; Settings &gt; Linked Devices &gt; Link a Device
          </p>
        </div>
      )}

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Phone Number */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
          <div className="flex items-center gap-3 mb-2">
            <Phone size={18} className="text-gray-400 dark:text-slate-500" />
            <span className="text-sm text-gray-500 dark:text-slate-400">Phone Number</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {status.phoneNumber || status.phone_number || 'Not linked'}
          </p>
        </div>

        {/* Uptime */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
          <div className="flex items-center gap-3 mb-2">
            <Clock size={18} className="text-gray-400 dark:text-slate-500" />
            <span className="text-sm text-gray-500 dark:text-slate-400">Uptime</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatUptime(status.uptime || status.uptime_seconds)}
          </p>
        </div>

        {/* Bridge URL */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
          <div className="flex items-center gap-3 mb-2">
            <ExternalLink size={18} className="text-gray-400 dark:text-slate-500" />
            <span className="text-sm text-gray-500 dark:text-slate-400">Bridge URL</span>
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {status.bridge_url || 'N/A'}
          </p>
        </div>
      </div>

      {/* Reconnect Button */}
      <div>
        <button
          onClick={handleReconnect}
          disabled={reconnecting}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw size={16} className={reconnecting ? 'animate-spin' : ''} />
          {reconnecting ? 'Reconnecting...' : 'Reconnect Bridge'}
        </button>
      </div>
    </div>
  )
}
