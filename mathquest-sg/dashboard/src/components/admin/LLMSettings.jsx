import { useState, useEffect } from 'react'
import { getLLMConfig, updateLLMConfig } from '../../api'
import { Loader2, Save, CheckCircle2, Cpu } from 'lucide-react'

const models = [
  'amazon.nova-lite-v1:0',
  'amazon.nova-pro-v1:0',
  'anthropic.claude-3-haiku',
  'anthropic.claude-3-sonnet',
]

const regions = ['us-east-1', 'us-west-2', 'ap-southeast-1']

export default function LLMSettings() {
  const [config, setConfig] = useState({
    model_id: models[0],
    region: regions[0],
    temperature: 0.3,
    max_tokens: 1024,
    guardrail_enabled: true,
    system_prompt_override: '',
  })
  const [activeConfig, setActiveConfig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getLLMConfig()
        if (res.error) throw new Error(res.error)
        const c = res.config || res
        setConfig({
          model_id: c.model_id || models[0],
          region: c.region || regions[0],
          temperature: c.temperature ?? 0.3,
          max_tokens: c.max_tokens ?? 1024,
          guardrail_enabled: c.guardrail_enabled !== false,
          system_prompt_override: c.system_prompt_override || '',
        })
        setActiveConfig(c)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    try {
      const res = await updateLLMConfig(config)
      if (res.error) throw new Error(res.error)
      setActiveConfig({ ...config })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      setError(e.message)
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Form */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-6">
          LLM Configuration
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="space-y-5">
          {/* Model */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
              Model
            </label>
            <select
              value={config.model_id}
              onChange={(e) => setConfig({ ...config, model_id: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
            >
              {models.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Region */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
              Region
            </label>
            <select
              value={config.region}
              onChange={(e) => setConfig({ ...config, region: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
            >
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Temperature */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
              Temperature:{' '}
              <span className="text-primary font-semibold">{config.temperature.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={config.temperature}
              onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-400 dark:text-slate-500 mt-1">
              <span>0.0 (Precise)</span>
              <span>1.0 (Creative)</span>
            </div>
          </div>

          {/* Max Tokens */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
              Max Tokens
            </label>
            <input
              type="number"
              min={256}
              max={4096}
              step={256}
              value={config.max_tokens}
              onChange={(e) =>
                setConfig({
                  ...config,
                  max_tokens: Math.min(4096, Math.max(256, parseInt(e.target.value) || 256)),
                })
              }
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
            />
            <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">Range: 256 - 4096</p>
          </div>

          {/* Guardrail Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-slate-300">
                Guardrail Enabled
              </label>
              <p className="text-xs text-gray-400 dark:text-slate-500">
                Block off-topic or inappropriate content
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setConfig({ ...config, guardrail_enabled: !config.guardrail_enabled })
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                config.guardrail_enabled ? 'bg-primary' : 'bg-gray-300 dark:bg-slate-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                  config.guardrail_enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* System Prompt Override */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
              System Prompt Override{' '}
              <span className="text-xs text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              rows={4}
              value={config.system_prompt_override}
              onChange={(e) =>
                setConfig({ ...config, system_prompt_override: e.target.value })
              }
              placeholder="Leave empty to use the default system prompt..."
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm resize-none"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : saved ? (
              <CheckCircle2 size={16} />
            ) : (
              <Save size={16} />
            )}
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Configuration'}
          </button>
        </div>
      </div>

      {/* Active Configuration */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 h-fit">
        <div className="flex items-center gap-2 mb-4">
          <Cpu size={18} className="text-primary" />
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Active Configuration
          </h3>
        </div>

        {activeConfig ? (
          <dl className="space-y-3">
            {[
              ['Model', activeConfig.model_id],
              ['Region', activeConfig.region],
              ['Temperature', activeConfig.temperature?.toFixed?.(1) ?? activeConfig.temperature],
              ['Max Tokens', activeConfig.max_tokens],
              ['Guardrail', activeConfig.guardrail_enabled !== false ? 'Enabled' : 'Disabled'],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-gray-400 dark:text-slate-500">{label}</dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white mt-0.5">
                  {value}
                </dd>
              </div>
            ))}
            {activeConfig.system_prompt_override && (
              <div>
                <dt className="text-xs text-gray-400 dark:text-slate-500">Prompt Override</dt>
                <dd className="text-sm text-gray-700 dark:text-slate-300 mt-0.5 line-clamp-3">
                  {activeConfig.system_prompt_override}
                </dd>
              </div>
            )}
          </dl>
        ) : (
          <p className="text-sm text-gray-400 dark:text-slate-500">No configuration loaded</p>
        )}
      </div>
    </div>
  )
}
