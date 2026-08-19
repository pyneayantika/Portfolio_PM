import { createClient } from '@supabase/supabase-js'
import fallbackProjects from '@/data/projects.json'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project')
)

// Browser client (using public anon key)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Server client (using service role key when available)
export const getServiceSupabase = () => {
  if (isSupabaseConfigured && (supabaseServiceKey || supabaseAnonKey)) {
    return createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey)
  }
  return null
}

// In-memory / localStorage storage simulation for fallback mode
const LOCAL_STORAGE_KEY = 'ayantika_portfolio_works_v1'

export async function fetchPublishedWorks() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('works')
        .select('*')
        .in('status', ['published', 'coming_soon'])
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })

      if (!error && data && data.length > 0) {
        return data
      }
    } catch (err) {
      console.warn('Supabase fetch error, falling back to local dataset:', err)
    }
  }

  // Fallback to localStorage or bundled JSON
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        return parsed.filter(w => w.status === 'published' || w.status === 'coming_soon')
      } catch (e) {}
    }
  }
  return fallbackProjects.filter(w => w.status === 'published' || w.status === 'coming_soon')
}

export async function fetchAllWorksForAdmin() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('works')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })

      if (!error && data) {
        return data
      }
    } catch (err) {
      console.warn('Supabase admin fetch error, falling back to local store:', err)
    }
  }

  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {}
    }
    // Initialize with fallback
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fallbackProjects))
  }
  return fallbackProjects
}

export async function saveWork(workData) {
  if (isSupabaseConfigured && supabase) {
    if (workData.id && workData.id.length > 10) {
      const { data, error } = await supabase
        .from('works')
        .update(workData)
        .eq('id', workData.id)
        .select()
      if (!error) return data?.[0]
    } else {
      const { data, error } = await supabase
        .from('works')
        .insert([workData])
        .select()
      if (!error) return data?.[0]
    }
  }

  // Fallback save in localStorage
  if (typeof window !== 'undefined') {
    const current = await fetchAllWorksForAdmin()
    let updated
    if (workData.id) {
      updated = current.map(item => item.id === workData.id ? { ...item, ...workData, updated_at: new Date().toISOString() } : item)
    } else {
      const newWork = {
        ...workData,
        id: crypto.randomUUID ? crypto.randomUUID() : `work_${Date.now()}`,
        view_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      updated = [newWork, ...current]
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
    return workData
  }
  return workData
}

export async function deleteWork(workId) {
  if (isSupabaseConfigured && supabase) {
    await supabase.from('works').delete().eq('id', workId)
  }
  if (typeof window !== 'undefined') {
    const current = await fetchAllWorksForAdmin()
    const updated = current.filter(w => w.id !== workId)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
  }
}
