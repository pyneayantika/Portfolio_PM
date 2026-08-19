import { NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    const { workId } = await request.json()
    if (!workId) {
      return NextResponse.json({ error: 'Missing workId' }, { status: 400 })
    }

    const supabase = getServiceSupabase()
    if (supabase) {
      try {
        await supabase.rpc('increment_view', { work_id: workId })
      } catch (err) {
        // Fallback standard increment
        await supabase
          .from('works')
          .update({ view_count: supabase.raw ? supabase.raw('view_count + 1') : 1 })
          .eq('id', workId)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
