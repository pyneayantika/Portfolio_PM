import { NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabase'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')

    const adminPassword = process.env.ADMIN_PASSWORD || 'AyantikaPortfolio2026!'

    if (key !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = getServiceSupabase()
    if (!supabase) {
      return NextResponse.json({
        total_messages: 2,
        total_sessions: 1,
        sessions: {
          'demo-session-1': [
            { id: '1', role: 'user', content: 'Tell me about RAGBench', created_at: new Date().toISOString(), flagged: false },
            { id: '2', role: 'assistant', content: 'RAGBench benchmarks 36 RAG configurations...', created_at: new Date().toISOString(), flagged: false }
          ]
        }
      })
    }

    const since = searchParams.get('since') || new Date(Date.now() - 7 * 86400000).toISOString()

    const { data, error } = await supabase
      .from('chat_logs')
      .select('*')
      .gte('created_at', since)
      .order('created_at', { ascending: false })
      .limit(200)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Group logs by session_id
    const sessions = {}
    data?.forEach((log) => {
      if (!sessions[log.session_id]) sessions[log.session_id] = []
      sessions[log.session_id].push(log)
    })

    return NextResponse.json({
      total_messages: data?.length || 0,
      total_sessions: Object.keys(sessions).length,
      sessions,
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
