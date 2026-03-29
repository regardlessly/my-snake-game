const getHeaders = () => {
  const token = localStorage.getItem('mq_token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }
}

// Auth
export const loginAdmin = (pin) => fetch('/dashboard/auth/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pin }) }).then(r => r.json())
export const loginParent = (code) => fetch('/dashboard/auth/parent', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }) }).then(r => r.json())

// Admin
export const getOverview = () => fetch('/dashboard/admin/overview', { headers: getHeaders() }).then(r => r.json())
export const getWhatsAppStatus = () => fetch('/dashboard/admin/whatsapp/status', { headers: getHeaders() }).then(r => r.json())
export const reconnectWhatsApp = () => fetch('/dashboard/admin/whatsapp/reconnect', { method: 'POST', headers: getHeaders() }).then(r => r.json())
export const getStudents = (status = 'all') => fetch(`/dashboard/admin/students?status=${status}`, { headers: getHeaders() }).then(r => r.json())
export const approveStudent = (id) => fetch(`/dashboard/admin/students/${id}/approve`, { method: 'PUT', headers: getHeaders() }).then(r => r.json())
export const denyStudent = (id) => fetch(`/dashboard/admin/students/${id}/deny`, { method: 'PUT', headers: getHeaders() }).then(r => r.json())
export const deleteStudent = (id) => fetch(`/dashboard/admin/students/${id}`, { method: 'DELETE', headers: getHeaders() }).then(r => r.json())
export const linkStudent = (id, userId) => fetch(`/dashboard/admin/students/${id}/link`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify({ userId }) }).then(r => r.json())
export const getLLMConfig = () => fetch('/dashboard/admin/llm-config', { headers: getHeaders() }).then(r => r.json())
export const updateLLMConfig = (config) => fetch('/dashboard/admin/llm-config', { method: 'PUT', headers: getHeaders(), body: JSON.stringify(config) }).then(r => r.json())
export const getContentTopics = () => fetch('/dashboard/admin/content/topics', { headers: getHeaders() }).then(r => r.json())
export const getTopicQuestions = (topicId, params = '') => fetch(`/dashboard/admin/content/topics/${topicId}/questions?${params}`, { headers: getHeaders() }).then(r => r.json())
export const getConversationLogs = (page = 1) => fetch(`/dashboard/admin/logs/conversations?page=${page}`, { headers: getHeaders() }).then(r => r.json())
export const getGuardrailLogs = (page = 1) => fetch(`/dashboard/admin/logs/guardrails?page=${page}`, { headers: getHeaders() }).then(r => r.json())
export const getUsageAnalytics = (days = 7) => fetch(`/dashboard/admin/analytics/usage?days=${days}`, { headers: getHeaders() }).then(r => r.json())
export const getPopularTopics = () => fetch('/dashboard/admin/analytics/popular-topics', { headers: getHeaders() }).then(r => r.json())

// Parent
export const getParentSummary = () => fetch('/dashboard/parent/summary', { headers: getHeaders() }).then(r => r.json())
export const getParentTopics = () => fetch('/dashboard/parent/topics', { headers: getHeaders() }).then(r => r.json())
export const getParentActivity = (page = 1) => fetch(`/dashboard/parent/activity?page=${page}`, { headers: getHeaders() }).then(r => r.json())
export const getParentConversations = (page = 1) => fetch(`/dashboard/parent/conversations?page=${page}`, { headers: getHeaders() }).then(r => r.json())
export const getParentConversation = (id) => fetch(`/dashboard/parent/conversations/${id}`, { headers: getHeaders() }).then(r => r.json())
export const getParentSettings = () => fetch('/dashboard/parent/settings', { headers: getHeaders() }).then(r => r.json())
export const updateParentSettings = (s) => fetch('/dashboard/parent/settings', { method: 'PUT', headers: getHeaders(), body: JSON.stringify(s) }).then(r => r.json())
