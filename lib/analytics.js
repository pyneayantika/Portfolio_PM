import { supabase, isSupabaseConfigured } from './supabase'

let visitorId = null

function getVisitorId() {
  if (visitorId) return visitorId
  if (typeof window === 'undefined') return 'server'
  
  try {
    visitorId = sessionStorage.getItem('visitor_id')
    if (!visitorId) {
      visitorId = crypto.randomUUID ? crypto.randomUUID() : `visitor_${Date.now()}`
      sessionStorage.setItem('visitor_id', visitorId)
    }
  } catch (e) {
    visitorId = `visitor_${Date.now()}`
  }
  return visitorId
}

export function trackEvent(eventType, data = {}, section = null) {
  if (typeof window === 'undefined') return

  const payload = {
    event_type: eventType,
    event_data: data,
    page_section: section,
    visitor_id: getVisitorId(),
    created_at: new Date().toISOString()
  }

  // Fire-and-forget: Supabase RPC or insert if available
  if (isSupabaseConfigured && supabase) {
    supabase
      .from('visitor_events')
      .insert([payload])
      .then(() => {})
      .catch(() => {})
  }

  // Also record locally for the admin analytics tab preview
  try {
    const key = 'ayantika_visitor_events_log'
    const existing = JSON.parse(sessionStorage.getItem(key) || '[]')
    existing.push(payload)
    if (existing.length > 50) existing.shift()
    sessionStorage.setItem(key, JSON.stringify(existing))
  } catch (e) {}
}
